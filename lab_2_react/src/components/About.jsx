function About() {
  return (
    <section
      id="about"
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/30"
    >
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <span className="font-mono text-brand-400">01.</span> Про мене
      </h2>
      <p className="leading-relaxed text-slate-300">
        Я студент <strong className="font-semibold text-brand-300">НУ «Львівська політехніка»</strong>, вивчаю кібербезпеку.
        Цікавлюся захистом інформації, аудитом безпеки, програмуванням та вбудованими системами.
        Шукаю можливість отримати практичний досвід у сфері IT та інформаційної безпеки.
      </p>
    </section>
  );
}

export default About;
