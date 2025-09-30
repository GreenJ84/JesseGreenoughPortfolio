'use client'
import React, { useState, useTransition } from 'react';

import { loginAction } from '../../../_actions/auth';
import css from './Login.module.css';

const LoginPage = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await loginAction(formData)
        if (result && !result.success) {
          setError(result.message || 'Login failed')
        }
        // If successful, the redirect in the server action will happen
      } catch (err) {
        setError('An error occurred during login')
      }
    })
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
              required
              className={css.input}
            />
          </div>

          <button
            type="submit"
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