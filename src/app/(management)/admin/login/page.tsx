'use client'
import { useRef, useState } from 'react';

import { loginAction } from '../../../_actions/auth';
import css from './Login.module.css';

const LoginPage = () => {
  const [isPending, setPending] = useState(false)
  const submitting = useRef(false);
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError(null);
    try {
      const result = await loginAction(formData);
      if (result && !result.success) setError(result.message);
    } catch {
      setError('Login unavailable. Please try again later.');
    } finally { submitting.current = false; setPending(false); }
  }

  return (
    <div className={css.loginContainer}>
      <div className={css.loginCard}>
        <div className={css.loginHeader}>
          <h1>Admin Login</h1>
          <p>Access your portfolio dashboard</p>
        </div>

        <form action={handleSubmit} className={css.loginForm}>
          <div className={css.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              maxLength={200}
              required
              className={css.input}
            />
          </div>

          <div className={css.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              maxLength={1024}
              required
              className={css.input}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={css.loginButton}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>

          {/* Show error message if login failed */}
          {error && (
            <div className="text-red-500">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;