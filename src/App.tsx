import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { WorkExperience } from "./components/WorkExperience";

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar (ThemeToggle lives inside) */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Skills />
        <WorkExperience />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
