'use client';

import { useEffect, useState } from 'react';
import css from './DataPage.module.css';

type ImageOption = { publicId: string; url: string; width: number; height: number };
type MediaPage = { images: ImageOption[]; nextCursor?: string };
const maxBytes = 5 * 1024 * 1024;

export default function MediaPicker({ label, value, onChange, onBusyChange, required = false }: { label: string; value: string; onChange: (url: string) => void; onBusyChange?: (busy: boolean) => void; required?: boolean }) {
  const [images, setImages] = useState<ImageOption[]>([]);
  const [cursor, setCursor] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState('');

  async function load(next?: string, signal?: AbortSignal) {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/media${next ? `?cursor=${encodeURIComponent(next)}` : ''}`, { signal, cache: 'no-store' });
      const page = await response.json() as MediaPage & { error?: string };
      if (!response.ok || !Array.isArray(page.images)) throw new Error(page.error || 'Could not load images');
      setImages(current => next ? [...current, ...page.images] : page.images);
      setCursor(page.nextCursor);
      setError('');
    } catch (caught) {
      if (signal?.aborted) return;
      setError(caught instanceof Error ? caught.message : 'Could not load images');
    } finally { if (!signal?.aborted) setLoading(false); }
  }

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => { if (!controller.signal.aborted) void load(undefined, controller.signal); });
    return () => controller.abort();
  }, []);

  async function upload(file: File) {
    if (file.size > maxBytes || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Choose a JPEG, PNG, or WebP image smaller than 5 MB');
      return;
    }
    setUploading(true);
    onBusyChange?.(true);
    setError('');
    try {
      const form = new FormData();
      form.set('file', file);
      const response = await fetch('/api/admin/media', { method: 'POST', body: form });
      const result = await response.json() as { image?: ImageOption; error?: string };
      if (!response.ok || !result.image?.url) throw new Error(result.error || 'Upload failed');
      setImages(current => [result.image!, ...current.filter(image => image.url !== result.image!.url)]);
      onChange(result.image.url);
      setShowUpload(false);
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Upload failed'); }
    finally { setUploading(false); onBusyChange?.(false); }
  }

  return <fieldset className={css.formFieldset}>
    <legend className={css.formLegend}>{label}{required ? '*' : ''}</legend>
    <p className={css.mediaHint}>Choose an existing image, upload one, or enter a URL or local path.</p>
    <label className={css.formLabel}>Existing images
      <select className={css.formInput} value={images.some(image => image.url === value) ? value : ''} onChange={event => {
        if (event.target.value === '__upload') setShowUpload(true);
        else if (event.target.value) { onChange(event.target.value); setShowUpload(false); }
      }}>
        <option value="">Choose an image</option>
        {images.map(image => <option key={image.publicId} value={image.url}>{image.publicId}</option>)}
        <option value="__upload">Upload a new image…</option>
      </select>
    </label>
    {loading && <p className={css.mediaHint} role="status">Loading images…</p>}
    {cursor && <button type="button" className={css.addBtn} disabled={loading} onClick={() => { void load(cursor); }}>{loading ? 'Loading…' : 'Load more images'}</button>}
    {showUpload && <label className={css.formLabel}>Upload image
      <input className={css.formInput} type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void upload(file); }} />
    </label>}
    {uploading && <p className={css.mediaHint} role="status">Uploading image…</p>}
    {error && <div className={css.mediaError}><p className={css.formError} role="alert">{error}</p><button type="button" className={css.addBtn} disabled={loading} onClick={() => { void load(); }}>Retry library</button></div>}
    <label className={css.formLabel}>{label} URL or local path
      <input className={css.formInput} value={value} onChange={event => onChange(event.target.value)} required={required} placeholder="https://… or /assets/…" />
    </label>
    {value && <div className={css.mediaPreview}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={value} alt="Selected image preview" width={160} height={110} />
      <span>Selected image</span>
    </div>}
  </fieldset>;
}
