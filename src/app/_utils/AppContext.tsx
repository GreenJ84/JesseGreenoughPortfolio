'use client';
import { createContext, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { ThemePreference, type Theme } from '../_lib/themePreference';
import dynamic from 'next/dynamic';
const ContactModal = dynamic(() => import('../(portfolio)/_layout/ContactModal'), {
  ssr: false,
  loading: () => <p role="status">Loading contact form…</p>,
});

interface AppContextProps { theme: Theme; setTheme: () => void; toggleContactModal: () => void }
export const AppContext = createContext<AppContextProps>({ theme: 'dark', setTheme: () => {}, toggleContactModal: () => {} });
export function AppContextProvider({ children }: { children: ReactNode }) {
  const preference = useMemo(() => new ThemePreference(), []);
  const theme = useSyncExternalStore(preference.subscribe, preference.getSnapshot, preference.getServerSnapshot);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    let storage: Storage | undefined;
    try { storage = window.localStorage; } catch { /* Access itself may be blocked. */ }
    preference.initialise(storage, media?.matches ?? true);
    const changed = (event: MediaQueryListEvent) => preference.systemChanged(event.matches);
    media?.addEventListener?.('change', changed);
    return () => media?.removeEventListener?.('change', changed);
  }, [preference]);
  useEffect(() => { document.body.dataset.theme = theme; }, [theme]);
  const [contactModal, setContactModal] = useState(false);
  const toggleContactModal = useCallback(() => setContactModal(open => !open), []);
  const value = useMemo(() => ({ theme, setTheme: preference.toggle, toggleContactModal }), [theme, preference, toggleContactModal]);
  return <AppContext.Provider value={value}>
    {contactModal && <ContactModal />}
    {children}
  </AppContext.Provider>;
}
export default AppContextProvider;
