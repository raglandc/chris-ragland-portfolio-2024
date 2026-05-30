type RouterLike = { push: (href: string) => void }

export type Command = {
  name: string
  description: string
  action: () => string | null
}

export function createCommands(router: RouterLike): Command[] {
  const commands: Command[] = [
    {
      name: "whoami",
      description: "Learn about Chris",
      action: () =>
` ██████╗██╗  ██╗██████╗ ██╗███████╗
██╔════╝██║  ██║██╔══██╗██║██╔════╝
██║     ███████║██████╔╝██║███████╗
██║     ██╔══██║██╔══██╗██║╚════██║
╚██████╗██║  ██║██║  ██║██║███████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝

Software engineer passionate about systems, ML, and building things that matter.
Currently focused on Rust, TypeScript, and full-stack development.
Always learning — always building.`,
    },
    {
      name: "skills",
      description: "List tech stack",
      action: () =>
`Languages : Rust · Python · TypeScript · Java · C/C++ · SQL
Frontend  : React · Next.js · Tailwind CSS · Framer Motion
Backend   : Spring · Node.js · REST APIs
Infra     : Git · Linux · Docker · TensorFlow`,
    },
    {
      name: "go home",
      description: "Navigate to home page",
      action: () => { router.push("/"); return "Navigating to home..."; },
    },
    {
      name: "go about",
      description: "Navigate to about page",
      action: () => { router.push("/about"); return "Navigating to about..."; },
    },
    {
      name: "go projects",
      description: "Navigate to projects page",
      action: () => { router.push("/projects"); return "Navigating to projects..."; },
    },
    {
      name: "go blog",
      description: "Navigate to blog page",
      action: () => { router.push("/blogs"); return "Navigating to blog..."; },
    },
    {
      name: "github",
      description: "Open GitHub profile",
      action: () => { window.open("https://github.com/raglandc", "_blank"); return "Opening GitHub..."; },
    },
    {
      name: "contact",
      description: "Open contact modal",
      action: () => { window.dispatchEvent(new CustomEvent("open-contact")); return null; },
    },
    {
      name: "valentines",
      description: "??",
      action: () => { router.push("/valentines"); return "💝"; },
    },
    {
      name: "clear",
      description: "Clear terminal history",
      action: () => null,
    },
    {
      name: "help",
      description: "List all commands",
      action: () => "",
    },
  ]

  const helpCmd = commands.find((c) => c.name === "help")!
  helpCmd.action = () =>
    commands.map((c) => `${c.name.padEnd(14)} — ${c.description}`).join("\n")

  return commands
}
