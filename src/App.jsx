import DeveloperScroll from './components/DeveloperScroll';
import './index.css';

function App() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <DeveloperScroll />

      {/* Additional sections can be added below */}
      <section id="projects" className="min-h-screen px-6 py-24 flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-light text-white/90 mb-8">
            Featured Projects
          </h2>
          <p className="text-lg text-white/60">
            Coming soon — your projects will appear here.
          </p>
        </div>
      </section>

      <section id="contact" className="min-h-screen px-6 py-24 flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-light text-white/90 mb-8">
            Get in Touch
          </h2>
          <p className="text-lg text-white/60 mb-12">
            Ready to collaborate on something amazing?
          </p>
          <a
            href="mailto:hello@himanshuhaldar.com"
            className="cta-button-primary cta-button text-lg"
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Himanshu Haldar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/80 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/80 transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/80 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
