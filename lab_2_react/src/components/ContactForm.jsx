import { useEffect, useRef, useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/myeeargn';
const DELAY_MS = 60000; // 1 хвилина
const CLOSED_KEY = 'contactFormClosed';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const firstFieldRef = useRef(null);

  // Показати модальне вікно через 1 хвилину (якщо його не закрили в цій сесії)
  useEffect(() => {
    if (sessionStorage.getItem(CLOSED_KEY) === '1') return;
    const timer = setTimeout(() => setIsOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Фокус на першому полі та закриття по Esc
  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
    sessionStorage.setItem(CLOSED_KEY, '1'); // більше не показувати в цій сесії
  }

  // Стандартна форма (action + method=POST), але без перезавантаження сторінки
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-md overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Закрити"
          className="absolute right-4 top-3 text-3xl leading-none text-slate-400 transition hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          ×
        </button>

        <h2 id="contact-title" className="mb-1 text-xl font-bold text-white">
          Зворотний зв'язок
        </h2>
        <p className="mb-5 text-sm text-slate-400">Залиште повідомлення, і я відповім на email.</p>

        {status === 'success' ? (
          <div role="status" className="space-y-4">
            <p className="rounded-lg bg-brand-500/15 p-4 text-brand-300">
              Дякую! Повідомлення надіслано.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg bg-brand-600 px-5 py-2 font-semibold text-white transition hover:bg-brand-500"
            >
              Закрити
            </button>
          </div>
        ) : (
          <form action={FORM_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300">
              Ім'я
              <input ref={firstFieldRef} type="text" name="name" required autoComplete="name" className={inputClass} />
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <input type="email" name="email" required autoComplete="email" className={inputClass} />
            </label>
            <label className="block text-sm text-slate-300">
              Номер телефону
              <input type="tel" name="phone" required autoComplete="tel" placeholder="+380…" className={inputClass} />
            </label>
            <label className="block text-sm text-slate-300">
              Повідомлення
              <textarea name="message" rows="4" required className={inputClass} />
            </label>

            {status === 'error' && (
              <p role="alert" className="text-sm text-red-400">
                Не вдалося надіслати. Спробуйте ще раз.
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-lg bg-brand-600 px-5 py-2 font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
              >
                {status === 'sending' ? 'Надсилання…' : 'Надіслати'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-slate-700 px-5 py-2 text-slate-300 transition hover:border-brand-500 hover:text-brand-300"
              >
                Закрити
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
