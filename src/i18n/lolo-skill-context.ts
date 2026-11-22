import type { Skill, SkillGroup } from "@/data/skills"
import type { LoloLocale } from "./lolo"

type SkillContext = {
  categories: Record<SkillGroup, string>
  context: Record<Skill["id"], string>
  evidence: {
    cv: string
    owner: string
    project: string
    academic: string
    coursework: string
  }
}

export const skillContext: Record<LoloLocale, SkillContext> = {
  en: {
    categories: {
      programming: "Programming languages",
      tools: "Hardware & tools",
      systems: "Networks & communications",
      engineering: "Engineering foundations",
    },
    evidence: {
      cv: "CV",
      owner: "Owner-reported",
      project: "Project",
      academic: "Academic",
      coursework: "Coursework",
    },
    context: {
      python: "Listed in Alaa’s CV among her programming languages.",
      java: "Listed in Alaa’s CV among her programming languages.",
      cpp: "Listed in Alaa’s CV among her programming languages.",
      csharp: "C# was reported by the portfolio owner.",
      arduino: "Alaa’s CV records Arduino training.",
      git: "Listed in Alaa’s CV as a software development tool.",
      servo:
        "Servos were used for movement in the Automatic Warehouse Logistics project.",
      drivers:
        "Motor drivers supported the robotic arm’s motor control in Automatic Warehouse Logistics.",
      networks: "Networking topics were part of Alaa’s engineering education.",
      communications:
        "Communications was part of Alaa’s computer and communications engineering studies.",
      control:
        "Alaa worked on controlling the motors and motion of a robotic arm.",
      electrical:
        "Alaa studied electrical and hardware foundations as part of her engineering education.",
      ai: "Two Huawei course records document Alaa’s AI learning.",
    },
  },
  de: {
    categories: {
      programming: "Programmiersprachen",
      tools: "Hardware und Werkzeuge",
      systems: "Netzwerke und Kommunikation",
      engineering: "Ingenieurwissenschaftliche Grundlagen",
    },
    evidence: {
      cv: "Lebenslauf",
      owner: "Ergänzende Angabe",
      project: "Projekt",
      academic: "Studium",
      coursework: "Kurse",
    },
    context: {
      python: "Python steht als Programmiersprache in Alaas Lebenslauf.",
      java: "Java steht als Programmiersprache in Alaas Lebenslauf.",
      cpp: "C++ steht als Programmiersprache in Alaas Lebenslauf.",
      csharp: "C# wurde vom Portfolioinhaber ergänzt.",
      arduino: "Alaas Lebenslauf nennt einen Arduino-Kurs.",
      git: "Git steht als Entwicklungswerkzeug in Alaas Lebenslauf.",
      servo:
        "Im Projekt zur automatisierten Lagerlogistik kamen Servomotoren zum Einsatz.",
      drivers:
        "Motortreiber gehörten zur Steuerung des Roboterarms im Lagerlogistikprojekt.",
      networks: "Netzwerkthemen waren Teil von Alaas Ingenieurstudium.",
      communications:
        "Kommunikationstechnik war Teil von Alaas Studium der Computer- und Kommunikationstechnik.",
      control:
        "Alaa arbeitete an der Motorsteuerung und Bewegung eines Roboterarms.",
      electrical:
        "Alaa befasste sich im Studium mit Elektrotechnik und Hardwaregrundlagen.",
      ai: "Zwei Huawei-Kursnachweise dokumentieren Alaas Beschäftigung mit KI.",
    },
  },
}
