import { useEffect, useState } from 'react';

function Footer() {
  const year = new Date().getFullYear();
  const [storageInfo, setStorageInfo] = useState({});

  // 1) читаємо дані про ОС і браузер, 2) зберігаємо в localStorage, 3) читаємо назад для показу
  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      language: navigator.language,
      languages: (navigator.languages || []).join(', '),
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory ?? 'н/д',
      screen: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    Object.entries(info).forEach(([key, value]) => localStorage.setItem(key, String(value)));

    const stored = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      stored[key] = localStorage.getItem(key);
    }
    setStorageInfo(stored);
  }, []);

  const contacts = [
    { label: 'Email', value: 'svidryk.dmytro@gmail.com', href: 'mailto:svidryk.dmytro@gmail.com' },
    { label: 'GitHub', value: 'github.com/svidrykdmytro-code', href: 'https://github.com/svidrykdmytro-code' },
    { label: 'Місто', value: 'Львів, Україна' },
  ];

  return (
    <footer id="contacts" className="border-t border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-xl font-bold text-white">
          <span className="font-mono text-brand-400">06.</span> Контакти
        </h2>
        <address className="not-italic">
          <ul className="grid gap-4 sm:grid-cols-3">
            {contacts.map((c) => (
              <li
                key={c.label}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-brand-500"
              >
                <p className="text-xs uppercase tracking-widest text-slate-500">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-brand-300 underline-offset-4 hover:text-brand-400 hover:underline"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 text-slate-200">{c.value}</p>
                )}
              </li>
            ))}
          </ul>
        </address>

        <details className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4" open>
          <summary className="cursor-pointer text-sm font-semibold text-slate-300">
            Системна інформація (localStorage)
          </summary>
          <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 font-mono text-xs sm:grid-cols-[max-content_1fr]">
            {Object.entries(storageInfo).map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-brand-300">{key}</dt>
                <dd className="break-all text-slate-400">{value}</dd>
              </div>
            ))}
          </dl>
        </details>

        <p className="mt-8 text-center font-mono text-xs text-slate-600">
          <small>&copy; {year} Свідрик Дмитро</small>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
