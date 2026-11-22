import type { LoloLocale } from "./lolo"
import type { FocusAreaId } from "@/data/focus"

type FocusCopy = {
  nav: string
  index: string
  title: string
  intro: string
  bridge: string
  items: Record<FocusAreaId, { title: string; desc: string; tags: string[] }>
}

type GraduationCopy = {
  nav: string
  index: string
  title: string
  milestone: string
  year: string
  summary: string
  path: string
  closing: string
  cta: string
}

export const focusCopy: Record<LoloLocale, FocusCopy> = {
  en: {
    nav: "Focus Areas",
    index: "What I Do",
    title: "Engineering Focus Areas",
    intro:
      "Core competencies and learning directions shaped by my Computer & Communications Engineering education at El Shorouk Academy and hands-on project experience.",
    bridge: "Explore my education journey",
    items: {
      programming: {
        title: "Programming Fundamentals",
        desc: "Alaa’s CV lists Python, Java and C++. C# was reported separately by the portfolio owner.",
        tags: ["Python", "Java", "C++", "C#"],
      },
      embedded: {
        title: "Embedded & Arduino Practice",
        desc: "Alaa’s CV records Arduino training and work with servo motors in her warehouse project.",
        tags: ["Arduino", "Servo motors"],
      },
      networks: {
        title: "Networks & Communications",
        desc: "Networking and communications were part of Alaa’s engineering studies.",
        tags: ["Networks", "Communications"],
      },
      control: {
        title: "Electrical & Control Foundations",
        desc: "Her warehouse project involved robotic-arm movement, motor drivers and servo control.",
        tags: ["Motor control", "Motor drivers", "Servo motors"],
      },
      "problem-solving": {
        title: "Problem Solving & Technical Thinking",
        desc: "Alaa’s warehouse project connects hands-on motor control with her engineering studies.",
        tags: ["Academic project", "Robotic-arm movement"],
      },
      "ai-interest": {
        title: "AI & Technology Interests",
        desc: "Growing interest in machine learning fundamentals and neural networks, documented through Huawei HCIA-AI coursework. Exploring practical applications of AI in engineering contexts.",
        tags: [
          "ML Fundamentals",
          "Neural Networks",
          "Huawei HCIA-AI",
          "Applied AI",
        ],
      },
    },
  },
  de: {
    nav: "Schwerpunkte",
    index: "Meine Schwerpunkte",
    title: "Ingenieurliche Schwerpunkte",
    intro:
      "Kernkompetenzen und Lernrichtungen, geprägt durch mein Studium der Computer- und Kommunikationstechnik an der El Shorouk Academy und praktische Projekterfahrung.",
    bridge: "Mein Bildungsweg",
    items: {
      programming: {
        title: "Programmiergrundlagen",
        desc: "Python, Java und C++ stehen in Alaas Lebenslauf. C# wurde vom Portfolioinhaber ergänzt.",
        tags: ["Python", "Java", "C++", "C#"],
      },
      embedded: {
        title: "Eingebettete Systeme & Arduino",
        desc: "Alaas Lebenslauf nennt einen Arduino-Kurs und die Arbeit mit Servomotoren im Lagerlogistikprojekt.",
        tags: ["Arduino", "Servomotoren"],
      },
      networks: {
        title: "Netzwerke & Kommunikation",
        desc: "Netzwerke und Kommunikationstechnik gehörten zu Alaas Ingenieurstudium.",
        tags: ["Netzwerke", "Kommunikation"],
      },
      control: {
        title: "Elektrotechnik & Regelungstechnik",
        desc: "Im Lagerlogistikprojekt arbeitete Alaa an der Bewegung und Motorsteuerung eines Roboterarms mit Servomotoren und Motortreibern.",
        tags: ["Motorsteuerung", "Motortreiber", "Servomotoren"],
      },
      "problem-solving": {
        title: "Problemlösung & Technisches Denken",
        desc: "Das Lagerlogistikprojekt verbindet praktische Motorsteuerung mit Alaas Ingenieurstudium.",
        tags: ["Studienprojekt", "Roboterarmbewegung"],
      },
      "ai-interest": {
        title: "KI & Technologische Interessen",
        desc: "Wachsendes Interesse an Machine-Learning-Grundlagen und neuronalen Netzen, dokumentiert durch Huawei HCIA-AI-Kurse. Erkundung praktischer KI-Anwendungen im Ingenieurkontext.",
        tags: [
          "ML-Grundlagen",
          "Neuronale Netze",
          "Huawei HCIA-AI",
          "Angewandte KI",
        ],
      },
    },
  },
}

export const graduationCopy: Record<LoloLocale, GraduationCopy> = {
  en: {
    nav: "Graduation",
    index: "Graduation story",
    title: "The journey was worth it",
    milestone: "Class of 2025",
    year: "2025",
    summary:
      "From classrooms in Suez to El Shorouk Academy, each stage led to Alaa’s graduation in Computer and Communications Engineering in 2025.",
    path: "Four stages of Alaa’s education",
    closing:
      "At El Shorouk, Alaa put engineering into practice by working on robotic-arm movement and motor control for Automatic Warehouse Logistics.",
    cta: "Explore the certificates",
  },
  de: {
    nav: "Abschluss",
    index: "Abschlussgeschichte",
    title: "Der Weg hat sich gelohnt",
    milestone: "Abschlussjahrgang 2025",
    year: "2025",
    summary:
      "Von der Schulzeit in Suez bis zur El Shorouk Academy führte Alaas Bildungsweg 2025 zum Abschluss in Computer- und Kommunikationstechnik.",
    path: "Vier Stationen in Alaas Bildungsweg",
    closing:
      "An der El Shorouk Academy setzte Alaa ihr Wissen praktisch ein: Im Projekt zur automatisierten Lagerlogistik arbeitete sie an der Bewegung und Motorsteuerung eines Roboterarms.",
    cta: "Zertifikate ansehen",
  },
}
