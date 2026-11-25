function Education() {
  const subjects = [
    'Вища математика',
    'Програмування мовою C# та ООП',
    'Аудит інформаційної безпеки',
    'Вебтехнології',
  ];

  return (
    <section
      id="education"
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/30"
    >
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <span className="font-mono text-brand-400">02.</span> Освіта
      </h2>
      <article className="border-l-2 border-brand-500 pl-4">
        <h3 className="text-lg font-semibold text-white">
          Національний університет «Львівська політехніка»
        </h3>
        <p className="text-slate-300">Спеціальність 125 «Кібербезпека», група КБ-202</p>
        <p className="mt-1 font-mono text-sm text-slate-500">
          <time dateTime="2025">2025</time> — теперішній час
        </p>

        <h4 className="mt-5 mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Основні дисципліни
        </h4>
        <ul className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <li
              key={subject}
              className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-slate-300 transition hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
            >
              {subject}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default Education;
