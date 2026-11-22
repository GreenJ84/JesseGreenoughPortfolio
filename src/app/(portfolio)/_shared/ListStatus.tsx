export default function ListStatus({ pending, error, retry }: { pending: boolean; error: string | null; retry: () => void }) {
  return <>
    {pending && <p role="status">Loading…</p>}
    {error && <p role="alert">{error} <button type="button" onClick={retry} disabled={pending}>Retry</button></p>}
  </>;
}
