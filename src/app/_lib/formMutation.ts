export class FormMutation {
  private snapshot = { pending: false, completed: false, error: null as string | null };
  private readonly initial = this.snapshot;
  private readonly listeners = new Set<() => void>();
  getSnapshot = () => this.snapshot;
  getServerSnapshot = () => this.initial;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private publish(changes: Partial<typeof this.snapshot>) { this.snapshot = { ...this.snapshot, ...changes }; this.listeners.forEach(listener => listener()); }
  run = async (operation: 'save' | 'delete', action: () => Promise<unknown>, onSuccess: () => Promise<void>) => {
    if (this.snapshot.pending || this.snapshot.completed) return false;
    this.publish({ pending: true, error: null });
    try { await action(); }
    catch {
      this.publish({ pending: false, error: operation === 'save' ? 'The change could not be saved. Your draft has been kept. Please try again.' : 'The item could not be deleted. Please try again.' });
      return false;
    }
    // Once a write succeeds, a refresh failure must never invite a second create.
    this.publish({ completed: true });
    try { await onSuccess(); }
    catch { this.publish({ error: 'The change was saved, but the list could not refresh. Close this form and retry the list.' }); }
    this.publish({ pending: false });
    return true;
  };
}
