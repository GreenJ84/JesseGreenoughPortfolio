export default function DataStatus({ loading, error, refresh }: { loading: boolean; error: string | null; refresh: () => Promise<boolean> }) {
  return <>
    {loading && <p role="status">Loading data…</p>}
    {error && <p role="alert">{error} <button type="button" onClick={() => { void refresh(); }} disabled={loading}>Retry</button></p>}
  </>;
}
