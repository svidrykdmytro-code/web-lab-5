function SkillList({ title, items }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-slate-300 transition hover:translate-x-1 hover:text-brand-300"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;
