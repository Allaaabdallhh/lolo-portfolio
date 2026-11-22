import type { ProjectId } from "@/data/projects"
import type { Skill } from "@/data/skills"
import type { LoloLocale } from "./lolo"

type WorkCopy = {
  skills: {
    nav: string
    index: string
    title: string
    intro: string
    bridge: string
  }
  projects: {
    nav: string
    index: string
    title: string
    intro: string
    details: string
    contribution: string
    tools: string
    concept: string
  }
  tools: Record<string, string>
  projectCopy: Record<
    ProjectId,
    { type: string; brief: string; role: string; context: string; alt: string }
  >
}

export const workCopy: Record<LoloLocale, WorkCopy> = {
  en: {
    skills: {
      nav: "Skills",
      index: "Skills",
      title: "Engineering Toolbox",
      intro:
        "Languages, hardware and engineering topics from Alaa’s education and project work.",
      bridge: "See the tools in action",
    },
    projects: {
      nav: "Projects",
      index: "Selected work",
      title: "Featured Projects",
      intro:
        "A closer look at Alaa’s contribution to an academic robotics project.",
      details: "Read case study",
      contribution: "Alaa’s contribution",
      tools: "Project hardware",
      concept: "Concept illustration · Not an actual project photograph",
    },
    tools: {
      servo: "Servo motors",
      drivers: "Motor drivers",
      control: "Circuits & control",
      networks: "Networks",
      communications: "Communications engineering",
      electrical: "Electrical foundations",
      ai: "AI fundamentals",
    },
    projectCopy: {
      warehouse: {
        type: "Academic engineering project",
        brief:
          "An academic project on automating material handling in a warehouse.",
        role: "Alaa worked on robotic-arm movement and motor control using servo motors and drivers.",
        context:
          "This project is listed in Alaa’s CV. The case study describes her documented contribution to the arm’s motion and motor control.",
        alt: "Concept drawing of an articulated robotic arm over a warehouse conveyor",
      },
    },
  },
  de: {
    skills: {
      nav: "Kenntnisse",
      index: "Kenntnisse",
      title: "Technischer Werkzeugkasten",
      intro:
        "Programmiersprachen, Hardware und technische Themen aus Alaas Ausbildung und Projektarbeit.",
      bridge: "Werkzeuge im Einsatz",
    },
    projects: {
      nav: "Projekte",
      index: "Projektauswahl",
      title: "Ausgewählte Projekte",
      intro:
        "Ein Einblick in Alaas Beitrag zu einem Robotikprojekt im Studium.",
      details: "Projektbeschreibung lesen",
      contribution: "Alaas Beitrag",
      tools: "Hardware im Projekt",
      concept: "Konzeptillustration · Kein Originalfoto des Projekts",
    },
    tools: {
      servo: "Servomotoren",
      drivers: "Motortreiber",
      control: "Schaltungen und Regelung",
      networks: "Netzwerke",
      communications: "Kommunikationstechnik",
      electrical: "Grundlagen der Elektrotechnik",
      ai: "KI-Grundlagen",
    },
    projectCopy: {
      warehouse: {
        type: "Ingenieurprojekt im Studium",
        brief:
          "Ein Studienprojekt zur Automatisierung des Materialtransports im Lager.",
        role: "Alaa arbeitete mit Servomotoren und Motortreibern an der Bewegung und Motorsteuerung des Roboterarms.",
        context:
          "Das Projekt ist in Alaas Lebenslauf aufgeführt. Die Beschreibung fasst ihren dort dokumentierten Beitrag zur Bewegung und Motorsteuerung des Roboterarms zusammen.",
        alt: "Konzeptzeichnung eines Gelenkroboters über einem Förderband im Lager",
      },
    },
  },
}

export function skillLabel(locale: LoloLocale, skill: Skill) {
  return "label" in skill ? skill.label : workCopy[locale].tools[skill.id]
}
