function Header({ name, title, theme, onToggleTheme }) {
  const links = [
    { href: '#about', label: 'Про мене' },
    { href: '#education', label: 'Освіта' },
    { href: '#skills', label: 'Навички' },
    { href: '#experience', label: 'Досвід' },
    { href: '#reviews', label: 'Відгуки' },
    { href: '#contacts', label: 'Контакти' },
  ];

  const isDark = theme === 'dark';

  return (
    <header className="border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-sm tracking-widest text-brand-400">
            &gt; whoami
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {name}
          </h1>
          <p className="mt-3 text-lg text-slate-400">{title}</p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            className="w-fit rounded-full border border-brand-500 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-300 transition hover:bg-brand-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            {isDark ? '☀️ Світла тема' : '🌙 Темна тема'}
          </button>

          <nav>
            <ul className="flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-full border border-slate-700 px-4 py-1.5 text-sm text-slate-300 transition hover:border-brand-500 hover:bg-brand-500/10 hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
