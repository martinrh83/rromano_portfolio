import { useState } from "react";

export interface TerminalLine {
  type: "command" | "output" | "error";
  text: string;
}

interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

const contactInfo: ContactInfo = {
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
};

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      text: "Welcome to the contact terminal! Type 'help' to see available commands.",
    },
  ]);
  const [input, setInput] = useState("");

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add command to history
    setLines((prev) => [...prev, { type: "command", text: `$ ${cmd}` }]);

    // Execute command
    switch (trimmedCmd) {
      case "help":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `
Available commands:
  email      - Show email address
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  twitter    - Open Twitter/X profile
  all        - Show all contact methods
  ls         - List available files
  whoami     - Display information about me
  clear      - Clear terminal
  help       - Show this help message
            `.trim(),
          },
        ]);
        break;

      case "email":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `📧 Email: ${contactInfo.email}`,
          },
        ]);
        break;

      case "github":
        window.open(contactInfo.github, "_blank");
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `🔗 Opening GitHub profile... ${contactInfo.github}`,
          },
        ]);
        break;

      case "linkedin":
        window.open(contactInfo.linkedin, "_blank");
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `🔗 Opening LinkedIn profile... ${contactInfo.linkedin}`,
          },
        ]);
        break;

      case "twitter":
        if (contactInfo.twitter) {
          window.open(contactInfo.twitter, "_blank");
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              text: `🔗 Opening Twitter/X profile... ${contactInfo.twitter}`,
            },
          ]);
        } else {
          setLines((prev) => [
            ...prev,
            { type: "error", text: "Twitter profile not configured." },
          ]);
        }
        break;

      case "all":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `
📧 Email: ${contactInfo.email}
🔗 GitHub: ${contactInfo.github}
🔗 LinkedIn: ${contactInfo.linkedin}
${contactInfo.twitter ? `🔗 Twitter: ${contactInfo.twitter}` : ""}
            `.trim(),
          },
        ]);
        break;

      case "ls":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `
resume.pdf    portfolio/    projects/    skills.json
            `.trim(),
          },
        ]);
        break;

      case "whoami":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `Martin Romano - Full Stack Developer
Building scalable web applications with modern technologies.
Passionate about clean code and exceptional user experiences.`,
          },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "":
        // Do nothing for empty command
        break;

      default:
        setLines((prev) => [
          ...prev,
          {
            type: "error",
            text: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`,
          },
        ]);
    }

    // Clear input
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
    }
  };

  return {
    lines,
    input,
    setInput,
    handleSubmit,
    executeCommand,
  };
}
