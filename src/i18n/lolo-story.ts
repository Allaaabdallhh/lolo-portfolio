import type { LoloLocale } from "./lolo"
import type { EducationChapterId } from "@/data/education"
import type { LoloSectionId } from "@/config/lolo-sections"

type ChapterCopy = {
  stage: string
  chapter: string
  institution: string
  description?: string
  alt: string
}

type StoryCopy = {
  index: Record<
    Exclude<LoloSectionId, "skills" | "projects" | "focus" | "graduation">,
    string
  >
  heroLink: string
  contact: { title: string; intro: string; portrait: string }
  about: {
    title: string
    lead: string
    bio: string
    practice: string
    portrait: string
    graduate: string
    academy: string
    projectFocus: string
  }
  stats: {
    title: string
    age: string
    lived: string
    birthday: string
    celebration: string
    credentials: string
    note: string
  }
  education: {
    title: string
    nav: string
    intro: string
    graphicNote: string
    openPhoto: string
    quotePending: string
    chapters: Record<EducationChapterId, ChapterCopy>
  }
}

export const storyCopy = {
  en: {
    index: {
      top: "Intro",
      about: "The story",
      education: "Education",
      certificates: "Certificates",
      contact: "Contact",
      footer: "Closing",
    },
    heroLink: "Read my story",
    contact: {
      title: "Let’s talk.",
      intro: "Have a project in mind or a question about my work?",
      portrait: "Alaa in a burgundy dress beside candlelit steps",
    },
    about: {
      title: "Beyond the degree.",
      lead: "The story behind the engineer",
      bio: "Alaa Abdallah Mohammed Muslim graduated in Computer and Communications Engineering from El Shorouk Academy in 2025. Her studies brought together programming, networks and hardware, alongside an interest in AI.",
      practice:
        "For Automatic Warehouse Logistics, she worked on the movement of a robotic arm and the control of its motors.",
      portrait: "Alaa in a brown dress beside candlelit steps",
      graduate: "Engineering graduate",
      academy: "El Shorouk Academy",
      projectFocus: "Robotic-arm control",
    },
    stats: {
      title: "Milestones",
      age: "Age",
      lived: "Days lived",
      birthday: "Days until next birthday",
      celebration: "Happy birthday, Alaa!",
      credentials: "Completed certificates",
      note: "Calendar dates use Cairo local time.",
    },
    education: {
      title: "Four chapters, one journey.",
      nav: "Education",
      intro:
        "From primary school in Suez to engineering at El Shorouk Academy.",
      graphicNote: "Academy reference graphic · Information Systems Center",
      openPhoto: "View photograph",
      quotePending:
        "Development TODO: Add the original Contact quotation and its attribution once supplied.",
      chapters: {
        primary: {
          stage: "Primary",
          chapter: "The beginning",
          institution: "Al-Qanah Mixed Primary School",
          alt: "Sign for Al-Qanah Mixed Primary School",
        },
        preparatory: {
          stage: "Preparatory",
          chapter: "Curiosity grows",
          institution: "Suez Modern Girls Preparatory School",
          alt: "Gate and sign of Suez Modern Girls Preparatory School",
        },
        secondary: {
          stage: "Secondary",
          chapter: "Finding direction",
          institution: "Suez Girls Secondary School",
          alt: "Entrance of Suez Girls Secondary School",
        },
        academy: {
          stage: "Higher education",
          chapter: "Becoming an engineer",
          institution: "El Shorouk Academy",
          description: "Computer and communications engineering.",
          alt: "El Shorouk Academy reference graphic supplied for the education timeline",
        },
      },
    },
  },
  de: {
    index: {
      top: "Einstieg",
      about: "Mein Weg",
      education: "Ausbildung",
      certificates: "Zertifikate",
      contact: "Kontakt",
      footer: "Abschluss",
    },
    heroLink: "Mehr über mich",
    contact: {
      title: "Schreiben Sie mir.",
      intro: "Haben Sie ein Projekt im Sinn oder eine Frage zu meiner Arbeit?",
      portrait:
        "Alaa in einem bordeauxroten Kleid an einer Treppe im Kerzenlicht",
    },
    about: {
      title: "Mehr als ein Abschluss.",
      lead: "Der Weg zur Ingenieurin",
      bio: "Alaa Abdallah Mohammed Muslim schloss 2025 ihr Studium der Computer- und Kommunikationstechnik an der El Shorouk Academy ab. Ihr Studium verband Programmierung, Netzwerke und Hardware mit ihrem Interesse an KI.",
      practice:
        "Im Projekt zur automatisierten Lagerlogistik arbeitete sie an der Bewegung eines Roboterarms und der Steuerung seiner Motoren.",
      portrait: "Alaa in einem braunen Kleid an einer Treppe im Kerzenlicht",
      graduate: "Ingenieurabsolventin",
      academy: "El Shorouk Academy",
      projectFocus: "Roboterarmsteuerung",
    },
    stats: {
      title: "Meilensteine",
      age: "Alter",
      lived: "Gelebte Tage",
      birthday: "Tage bis zum nächsten Geburtstag",
      celebration: "Alles Gute zum Geburtstag, Alaa!",
      credentials: "Abgeschlossene Zertifikate",
      note: "Kalenderdaten richten sich nach der Ortszeit in Kairo.",
    },
    education: {
      title: "Vier Kapitel, ein Weg.",
      nav: "Ausbildung",
      intro:
        "Von der Grundschule in Suez bis zum Ingenieurstudium an der El Shorouk Academy.",
      graphicNote: "Abbildung der Akademie · Zentrum für Informationssysteme",
      openPhoto: "Foto ansehen",
      quotePending:
        "Entwicklungsnotiz: Originalzitat und Quellenangabe ergänzen, sobald sie vorliegen.",
      chapters: {
        primary: {
          stage: "Grundschule",
          chapter: "Die ersten Schritte",
          institution: "Gemischte Al-Qanah-Grundschule",
          alt: "Schild der gemischten Al-Qanah-Grundschule",
        },
        preparatory: {
          stage: "Mittelstufe",
          chapter: "Neues entdecken",
          institution: "Moderne Mädchen-Mittelschule Suez",
          alt: "Tor und Schild der Modernen Mädchen-Mittelschule in Suez",
        },
        secondary: {
          stage: "Oberstufe",
          chapter: "Orientierung finden",
          institution: "Mädchen-Oberschule Suez",
          alt: "Eingang der Mädchen-Oberschule in Suez",
        },
        academy: {
          stage: "Hochschule",
          chapter: "Ingenieurin werden",
          institution: "El Shorouk Academy",
          description: "Computer- und Kommunikationstechnik.",
          alt: "Bereitgestellte Abbildung der El Shorouk Academy für den Bildungsweg",
        },
      },
    },
  },
} satisfies Record<LoloLocale, StoryCopy>
