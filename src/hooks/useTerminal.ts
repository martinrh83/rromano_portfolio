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
  email: "martinrh83@gmail.com",
  github: "https://github.com/martinrh83",
  linkedin: "https://linkedin.com/in/martin-romano-dev",
};

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      text: `
Available commands:
  email      - Show email address
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  all        - Show all contact methods
  clear      - Clear terminal
            `.trim(),
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
  all        - Show all contact methods
  clear      - Clear terminal
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

      case "clear":
        setLines(() => [
          {
            type: "output",
            text: `
Available commands:
  email      - Show email address
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  all        - Show all contact methods
  clear      - Clear terminal
            `.trim(),
          },
        ]);
        break;

      case "":
        // Do nothing for empty command
        break;

      default:
        setLines((prev) => [
          ...prev,
          {
            type: "error",
            text: `Command not found: ${trimmedCmd}.`,
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
