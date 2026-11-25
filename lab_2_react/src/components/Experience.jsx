import ExperienceItem from './ExperienceItem';

function Experience() {
  const jobs = [
    {
      id: 1,
      position: 'Власний малий бізнес — продаж костюмів і спортивного одягу',
      period: '2025 — теперішній час',
      duties: [
        'Ведення онлайн-продажів і спілкування з клієнтами',
        'Створення маркетингового контенту за допомогою інструментів ШІ',
        'Автоматизація рутинних процесів',
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/30"
    >
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <span className="font-mono text-brand-400">04.</span> Досвід роботи
      </h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <ExperienceItem
            key={job.id}
            position={job.position}
            period={job.period}
            duties={job.duties}
          />
        ))}
      </div>
    </section>
  );
}

export default Experience;
