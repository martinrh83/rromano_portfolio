import { Hero } from "./components/Hero";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-screen">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main>
        <Hero />
        {/* Future sections: About, Projects, Contact, etc. */}
      </main>
    </div>
  );
}

export default App;
