import DeveloperScroll from './components/DeveloperScroll';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Bio } from './constants/constants';
import './index.css';

function App() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* Hero Section with Scroll Animation */}
      <DeveloperScroll />

      {/* Skills Section */}
      <Skills />

      {/* Experience Timeline */}
      <Experience />

      {/* Education Section */}
      <Education />

      {/* Projects Grid */}
      <Projects />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} {Bio.name}. Built with React & Framer Motion.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={Bio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
              >
                GitHub
              </a>
              <a
                href={Bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={Bio.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
