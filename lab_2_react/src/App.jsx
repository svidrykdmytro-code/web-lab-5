import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Світла тема: 07:00–21:00, темна — увесь інший час
function getThemeByTime() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState('dark');

  // Автоматичний вибір теми при початковому завантаженні
  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  // Застосування CSS-класу до <body> при зміні теми
  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="min-h-screen bg-slate-950 font-display text-slate-200 antialiased transition-colors duration-300">
      <Header
        name="Свідрик Дмитро"
        title="Студент спеціальності 125 «Кібербезпека»"
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="flex flex-col gap-6 md:col-span-2">
          <About />
          <Education />
          <Experience />
          <Reviews />
        </div>
        <aside className="md:col-span-1">
          <Skills />
        </aside>
      </main>
      <Footer />
      <ContactForm />
    </div>
  );
}

export default App;
