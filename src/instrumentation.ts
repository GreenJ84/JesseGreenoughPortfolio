export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'development') {
    const { migrateDevelopmentResources } = await import('./app/_utils/migrateDevelopment');
    await migrateDevelopmentResources();
  }
}
