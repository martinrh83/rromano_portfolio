import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ThemeToggle } from "./components/ThemeToggle";
import { WorkExperience } from "./components/WorkExperience";

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Fixed Theme Toggle */}
      <div className="fixed top-6 right-6 z-[150]">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main>
        <Hero />
        <WorkExperience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
