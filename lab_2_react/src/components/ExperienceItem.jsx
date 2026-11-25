function ExperienceItem({ position, period, duties }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition duration-300 hover:scale-[1.02] hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-lg font-semibold text-white">{position}</h3>
        <span className="shrink-0 rounded-full bg-brand-500/15 px-3 py-0.5 font-mono text-xs text-brand-300">
          {period}
        </span>
      </div>
      <ul className="mt-4 list-inside list-disc space-y-1.5 text-slate-300 marker:text-brand-500">
        {duties.map((duty) => (
          <li key={duty}>{duty}</li>
        ))}
      </ul>
    </article>
  );
}

export default ExperienceItem;
