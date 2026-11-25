import SkillList from './SkillList';

function Skills() {
  const technical = [
    'Мови програмування: C#, Python',
    "Об'єктно-орієнтоване програмування",
    'HTML, основи React',
    'Git та GitHub',
    'Основи аудиту ІБ, стандарт ISO/IEC 27001',
    'Робота з мікроконтролерами ESP32',
  ];

  const personal = [
    'Самостійність і відповідальність',
    'Швидке навчання',
    'Аналітичне мислення',
  ];

  const languages = [
    { name: 'Українська', level: 'рідна' },
    { name: 'Англійська', level: 'середній рівень (B1)' },
  ];

  return (
    <section
      id="skills"
      className="rounded-2xl border-t-4 border-brand-500 bg-slate-900 p-6 shadow-lg shadow-black/30 md:sticky md:top-6"
    >
      <h2 className="mb-5 text-xl font-bold text-white">
        <span className="font-mono text-brand-400">03.</span> Навички
      </h2>
      <SkillList title="Технічні" items={technical} />
      <SkillList title="Особисті" items={personal} />

      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Мови</h3>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        {languages.map((lang) => (
          <div key={lang.name} className="contents">
            <dt className="font-semibold text-white">{lang.name}</dt>
            <dd className="text-slate-400">{lang.level}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Skills;
