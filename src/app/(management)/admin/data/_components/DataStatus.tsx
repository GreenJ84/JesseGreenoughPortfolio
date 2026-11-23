import css from './DataPage.module.css';

export default function DataStatus({ loading, error, refresh }: { loading: boolean; error: string | null; refresh: () => Promise<boolean> }) {
  return <>
    {loading && <p className={css.dataStatus} role="status">Loading records…</p>}
    {error && <p className={css.dataStatus} role="alert">{error} <button type="button" onClick={() => { void refresh(); }} disabled={loading}>Retry</button></p>}
  </>;
}
