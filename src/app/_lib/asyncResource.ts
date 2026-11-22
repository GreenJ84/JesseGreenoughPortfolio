export class AsyncResource<T> {
  private snapshot: { data: T; pending: boolean; error: string | null };
  private readonly initial;
  private generation = 0;
  private readonly listeners = new Set<() => void>();
  constructor(private readonly loader: () => Promise<T>, initial: T) {
    this.snapshot = { data: initial, pending: true, error: null };
    this.initial = this.snapshot;
  }
  getSnapshot = () => this.snapshot;
  getServerSnapshot = () => this.initial;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private publish(changes: Partial<typeof this.snapshot>) { this.snapshot = { ...this.snapshot, ...changes }; this.listeners.forEach(listener => listener()); }
  dispose = () => { this.generation++; };
  reload = async () => {
    const generation = ++this.generation;
    this.publish({ pending: true, error: null });
    try {
      const data = await this.loader();
      if (generation !== this.generation) return false;
      this.publish({ data, pending: false });
      return true;
    } catch {
      if (generation === this.generation) this.publish({ pending: false, error: 'The list could not be refreshed. Please try again.' });
      return false;
    }
  };
}
