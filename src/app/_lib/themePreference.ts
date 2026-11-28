export type Theme = 'dark' | 'light';
export function savedTheme(value: string | null): Theme | null {
  try { const parsed: unknown = value === null ? null : JSON.parse(value); return parsed === 'dark' || parsed === 'light' ? parsed : null; }
  catch { return null; }
}
interface ThemeStorage { getItem(key: string): string | null; setItem(key: string, value: string): void }

export class ThemePreference {
  private theme: Theme = 'dark';
  private explicit = false;
  private storage?: ThemeStorage;
  private readonly listeners = new Set<() => void>();
  getSnapshot = () => this.theme;
  // Hydration starts with the same value used by server-rendered markup.
  getServerSnapshot = (): Theme => 'dark';
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private publish(theme: Theme) { if (theme !== this.theme) { this.theme = theme; this.listeners.forEach(listener => listener()); } }
  initialise(storage: ThemeStorage | undefined, prefersDark: boolean) {
    this.storage = storage;
    let selected: Theme | null = null;
    try { selected = savedTheme(storage?.getItem('theme') ?? null); } catch { /* Storage can be unavailable in private/restricted contexts. */ }
    this.explicit = selected !== null;
    this.publish(selected ?? (prefersDark ? 'dark' : 'light'));
  }
  systemChanged(prefersDark: boolean) { if (!this.explicit) this.publish(prefersDark ? 'dark' : 'light'); }
  toggle = () => {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.explicit = true;
    try { this.storage?.setItem('theme', JSON.stringify(next)); } catch { /* Keep the current session usable even when persistence is blocked. */ }
    this.publish(next);
  };
}
