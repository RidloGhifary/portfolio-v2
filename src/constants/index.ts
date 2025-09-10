import { CommandType } from "@/types";

const projects = [
  {
    title: "Hacker Portfolio",
    description: "A terminal-style portfolio to show off my skills.",
    github: "https://github.com/you/hacker-portfolio",
    demo: "https://yourdomain.com/hacker-portfolio",
  },
  {
    title: "Meme Generator",
    description: "Make dank memes on the fly, no Photoshop needed.",
    github: "https://github.com/you/meme-generator",
    demo: "https://yourdomain.com/meme-generator",
  },
  {
    title: "Cool Web App",
    description: "A fun little project that solves a real problem.",
    github: "https://github.com/you/cool-web-app",
    demo: "https://yourdomain.com/cool-web-app",
  },
];

const commands: CommandType = {
  help: {
    description: "List available commands",
    response: `start a working area (see also: terminal help)
      about     Who tf is Ridlo?
      projects  Show some cool stuff I built
      contact   How to reach me
      clear     Clear the screen`,
  },
  about: {
    description: "Info about me",
    response: "Yo, I’m Ridlo. Fullstack dev & professional keyboard smasher.",
  },
  projects: {
    description: "List my projects",
    response: projects
      .map(
        (p, i) =>
          `${i + 1}. ${p.title}
   ${p.description}
   -
   GitHub: ${p.github}
   Demo:   ${p.demo}\n`
      )
      .join("\n"),
  },
  contact: {
    description: "How to reach me",
    response: `Let's connect!
      email         ridloghfry@gmail.com
      gitHub        github.com/RidloGhifary
      linkedIn      linkedin.com/in/ridlo-ghifary
      instagram     instagram.com/rdllghifary_`,
  },
  clear: {
    description: "Clear the terminal",
    response: "clear",
  },
  echo: {
    description: "Echo back your text",
    usage: "echo <text>",
    run: (args) => args.join(" "), // just glue back whatever user typed
  },
  date: {
    description: "Show current date and time",
    usage: "date",
    run: () => new Date().toString(),
  },
  whoami: {
    description: "Who am I?",
    response: "ridloghfry",
  },
  cowsay: {
    description: "Cow says what you type",
    usage: "cowsay <text>",
    run: (args) => {
      if (args.length === 0) return "usage: cowsay <text>";

      const msg = args.join(" ");
      const border = "-".repeat(msg.length + 2);

      return `
 ${border}
< ${msg} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;
    },
  },
  "fuck you": {
    description: "Fuck you too",
    response: "Fuck you too",
  },
  "sudo date": {
    description: "Sudo date",
    response: "Error: I’m not your Tinder",
  },
};

const fallbacks = [
  "wtf are you on about?",
  "try `help` bruh",
  "nah fam, that ain’t a command",
  "try typing `help` for more info",
  "huh?",
  "don't be silly",
  "seriously, try `help`",
  "command not found",
  "¯\\_(ツ)_/¯",
  "I'm not sure what you mean",
  "error 404: command not found",
  "you wish that was a command",
  "nope, try again",
  "that's not a thing",
  "invalid command",
  "are you lost?",
  "try `help` if you're confused",
  "I don't speak gibberish",
  "command unrecognized",
  "not in my terminal",
];

export { commands, fallbacks };
