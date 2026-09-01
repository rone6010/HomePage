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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
      <Navbar name={personalInfo.name} />
      <main className="flex-1">
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

