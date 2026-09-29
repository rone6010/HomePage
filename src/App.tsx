import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { personalInfo, skillCategories, projects, experiences } from './data/portfolioData';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-700 focus:text-white focus:font-semibold focus:shadow-lg"
      >
        跳至主要內容
      </a>
      <Navbar name={personalInfo.name} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero info={personalInfo} />
        <About info={personalInfo} categories={skillCategories} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact info={personalInfo} />
      </main>
      <Footer info={personalInfo} />
    </div>
  );
}
