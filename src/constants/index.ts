import figlet from "figlet";
import Doom from "figlet/importable-fonts/Doom.js";
import { CommandType } from "@/types";
import { Clock9, Cloudy, Dock, File, FileDown, FolderUp } from "lucide-react";

figlet.parseFont("Doom", Doom);

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

const projects = [
  {
    title: "GymSync <rdllywternbbcgsytsfbsdv>",
    description:
      "GymSync is a fitness-oriented term that could be associated with activities related to synchronizing or coordinating workouts, exercise routines, or fitness tracking. It might involve t integration of technology, apps, or devices to streamline a optimize fitness experiences.",
    repository: "https://github.com/RidloGhifary/gymsync",
    demo: "https://gymsync.vercel.app",
  },
  {
    title: "Car Rental <rdllbvbxvchgqweytwyety>",
    description:
      "Car Rental is a service-oriented project that focuses on providing an efficient and user-friendly platform for renting vehicles. The system allows users to search, book, and manage car rentals, offering features such as real-time availability, various vehicle options.",
    repository: "https://github.com/RidloGhifary/code-challenge-front-end",
    demo: "https://landingcarental.netlify.app/",
  },
  {
    title: "Playlist Converter <rdllmnkozixuwrnewrbnbn>",
    description:
      "This project is a web application that allows you to convert a playlist from YouTube to Spotify.",
    repository: "https://github.com/RidloGhifary/youtube-playlist-converter",
    demo: "https://spotube.convert.ridloghfry.web.id",
  },
  {
    title: "Spotify Clone <rdllspitofydeltavxvbyb>",
    description:
      "A Spotify clone built with Next.js and Supabase database. It features user authentication, music playback, and playlist management.",
    repository: "https://github.com/RidloGhifary/spotify-clone",
    demo: "https://spitofy-delta.vercel.app/",
  },
  {
    title: "Betty <rdllbettyidvbfytsrbyb>",
    description:
      "Betty is a complete solution for your business needs! Betty helps with everything from transaction processing to detailed sales reporting. With enhanced features, Betty makes managing your business simpler and more efficient.",
    repository: "unavailable",
    demo: "https://betty.id/",
  },
];

const commands: CommandType = {
  help: {
    description: "List available commands",
    response: `Start a working area (see also: terminal help)
      about        Who tf is Ridlo?
      skills       List my skills
      projects     Show some cool stuff I built
      contact      How to reach me
      open         Open a link (e.g. open github)
      open project <repo|demo> <id>     Open project repo or demo by its ID


      echo         Echo back your text
      date         Show current date and time
      whoami       Who am I?
      cowsay       Cow says what you type
      banner       Show ASCII art banner (e.g. banner hello world)

      clear        Clear the screen`,
  },
  about: {
    description: "Info about me",
    response:
      "I'm Ridlo, a fullstack developer with a passion for building blazingly fast web applications. This is my portfolio, where I showcase my skills and projects I've worked on. I'm also a professional keyboard smasher.",
  },
  projects: {
    description: "List my projects",
    response: projects
      .map(
        (p, i) =>
          `${i + 1}. ${p.title}
   ${p.description}
   -
   Repository: ${p.repository}
   Demo:   ${p.demo}\n`,
      )
      .join("\n"),
  },
  contact: {
    description: "How to reach me",
    response: `Let's connect!
      email         ridloghfry@gmail.com
      gitHub        github.com/RidloGhifary
      linkedIn      linkedin.com/in/ridlo-ghifary
      medium        medium.com/@ridloghfry
      instagram     instagram.com/rdllghifary_`,
  },
  clear: {
    description: "Clear the terminal",
    response: "clear",
  },
  echo: {
    description: "Echo back your text",
    usage: "echo <text>",
    run: (args) => args.join(" "),
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
  skills: {
    description: "Show my tech skills",
    response: `My tech stack:

      Frontend
        • JavaScript / TypeScript
        • React, Next.js
        • HTML, CSS, TailwindCSS

      Backend
        • Node.js, Express
        • Golang (intermediate)
        • REST APIs

      Database
        • MySQL (advanced)
        • PostgreSQL (intermediate)
        • MongoDB (intermediate)
        • Firebase (intermediate)

      Tools
        • Git & GitHub
        • Docker
        • Testing (Jest, Playwright)

      Other
        • Linux / Ubuntu
        • Google Cloud Platform
        • Deployment & VPS stuff`,
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
  open: {
    description: "Open links (project repos, demos, profiles, etc.)",
    usage: `
      Usage:
        open project <repo|demo> <id>   Open project repo or demo by its ID
        open github                     Open my GitHub profile
        open linkedin                   Open my LinkedIn profile
        open instagram                  Open my Instagram
        open medium                     Open my Medium profile

      Examples:
        open project repo 1
        open project demo 2
        open github
    `,
    run: (args) => {
      if (args.length === 0) {
        return "Try 'open --help' for usage.";
      }

      if (args.length === 1 && args[0] === "project") {
        return "Usage: open project <repo|demo> <id>";
      }

      if (args[0] === "--help") {
        return `        Usage:
          open project <repo|demo> <id>   Open project repo or demo by its ID
          open github                     Open my GitHub profile
          open linkedin                   Open my LinkedIn profile
          open instagram                  Open my Instagram
          open medium                     Open my Medium profile

        Examples:
          open project repo 1
          open project demo 2
          open github`;
      }

      if (args[0] === "project") {
        const type = args[1]; // repo | demo
        const id = args[2];

        if (type !== "repo" && type !== "demo") {
          return `Unknown type "${type}". Use "repo" or "demo".`;
        }

        if (!type || !id) {
          return "Usage: open project <repo|demo> <id>";
        }

        const projects = [
          {
            id: "rdllywternbbcgsytsfbsdv",
            title: "GymSync",
            repo: "https://github.com/RidloGhifary/gymsync",
            demo: "https://gymsync.vercel.app",
          },
          {
            id: "rdllbvbxvchgqweytwyety",
            title: "Car Rental",
            repo: "https://github.com/RidloGhifary/code-challenge-front-end",
            demo: "https://landingcarental.netlify.app/",
          },
          {
            id: "rdllmnkozixuwrnewrbnbn",
            title: "Playlist Converter",
            repo: "https://github.com/RidloGhifary/youtube-playlist-converter",
            demo: "https://youtube-playlist-converter.vercel.app/",
          },
          {
            id: "rdllspitofydeltavxvbyb",
            title: "Spotify Clone",
            repo: "https://github.com/RidloGhifary/spotify-clone",
            demo: "https://spitofy-delta.vercel.app/",
          },
          {
            id: "rdllbettyidvbfytsrbyb",
            title: "Betty",
            repo: "unavailable",
            demo: "https://betty.id/",
          },
        ];

        const project = projects.find((p) => p.id === id);
        if (!project) return `Project with ID "${id}" not found.`;

        if (type === "repo") {
          if (!project.repo || project.repo === "unavailable")
            return "Sorry, this project’s repo is unavailable.";

          setTimeout(() => {
            window.open(project.repo, "_blank");
          }, 500);

          return `Opening repo: ${project.title}`;
        }
        if (type === "demo") {
          if (!project.demo || project.demo === "unavailable")
            return "Sorry, this project’s demo is unavailable.";

          setTimeout(() => {
            window.open(project.demo, "_blank");
          }, 500);
          return `Opening demo: ${project.title}`;
        }

        return "Invalid type. Use 'repo' or 'demo'.";
      }

      const shortcuts: Record<string, string> = {
        github: "https://github.com/RidloGhifary",
        linkedin: "https://linkedin.com/in/ridlo-ghifary",
        instagram: "https://instagram.com/rdllghifary_",
        medium: "https://medium.com/@ridloghfry",
        email: "mailto:ridloghfry@gmail.com",
      };

      let url = args[0];

      // if user types just "github", map to link
      if (shortcuts[url]) {
        url = shortcuts[url];
      } else {
        return "Unknown shortcut. Available: github, linkedin, instagram, medium, email";
      }

      // if user didn’t type protocol, add https://
      if (!url.startsWith("http") && !url.startsWith("mailto:")) {
        url = "https://" + url;
      }

      // open in new tab
      setTimeout(() => {
        window.open(url, "_blank");
      }, 500);

      return `Opening ${url} ...`;
    },
  },
  banner: {
    description: "Show ASCII art banner",
    run: (args) => {
      if (args.length === 0) {
        return figlet.textSync("Ridlo Achmad Ghifary", { font: "Doom" });
      } else {
        return figlet.textSync(args.join(" "), { font: "Doom" });
      }
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

export { commands, fallbacks };

// ==== Application IDs =====
export const appIdsEnum = {
  finder_1: "finder_1",
  terminal_1: "terminal_1",
};

// ==== Docks ====
export const docks = [
  {
    id: 2,
    app_id: appIdsEnum.finder_1,
    imageSrc: "/finder.png",
    alt: "finder",
  },
  {
    id: 1,
    app_id: appIdsEnum.terminal_1,
    imageSrc: "/terminal.webp",
    alt: "terminal",
  },
];

// ==== Window States ====
export type WindowState = "open" | "minimized" | "closed" | "maximized";

// ==== FINDER FAVORITES ====
export const finderFavorites = [
  {
    id: "recent_1",
    name: "Recent",
    icon: Clock9,
  },
  {
    id: "desktop_1",
    name: "Desktop",
    icon: Dock,
  },
  {
    id: "document_1",
    name: "Document",
    icon: File,
  },
  {
    id: "downloads_1",
    name: "Downloads",
    icon: FileDown,
  },
];

// ==== FINDER CLOUD ====
export const finderiCloud = [
  {
    id: "icloud_1",
    name: "iCloud",
    icon: Cloudy,
  },
  {
    id: "shared_1",
    name: "Shared",
    icon: FolderUp,
  },
];
