export type LoloLocale = "en" | "de"

type LoloDictionary = {
  home: string
  navigation: string
  languages: string
  menu: string
  close: string
  skipContent: string
  skipIntro: string
  cv: string
  cvUnavailable: string
  greeting: Record<"morning" | "afternoon" | "evening", string>
  role: string
  year: string
  school: string
  location: string
  cairoTime: string
  socials: string
  portrait: string
  summary: string
  description: string
  about: {
    nav: string
    title: string
    lead: string
    bio: string
    tools: string
    project: string
  }
  footer: {
    title: string
    closing: string
    contact: string
    socials: string
    navigation: string
  }
  certificates: {
    title: string
    nav: string
    intro: string
    open: string
    close: string
    imageLabel: string
    missing: string
    issuer: string
    issued: string
    duration: string
    type: string
    course: string
    attendance: string
    courseNote: string
    attendanceNote: string
    zoom: string
    fit: string
    original: string
  }
}

export const lolo = {
  en: {
    home: "Home",
    navigation: "Main navigation",
    languages: "Language",
    menu: "Open menu",
    close: "Close menu",
    skipContent: "Skip to content",
    skipIntro: "Skip intro",
    cv: "View CV",
    cvUnavailable: "CV · Local preview",
    greeting: {
      morning: "Good morning, I’m",
      afternoon: "Hello, I’m",
      evening: "Good evening, I’m",
    },
    role: "Computer & Communications Engineering Graduate",
    year: "Class of 2025",
    school: "El Shorouk Academy",
    location: "Suez, Egypt",
    cairoTime: "Cairo time",
    socials: "Social profiles",
    portrait: "Alaa in a navy blue dress and headscarf",
    summary:
      "I’ve studied software, hardware, networks, and AI. I’m ready to put that foundation to work and keep learning.",
    description:
      "Alaa Abdallah Mohammed Muslim, Computer and Communications Engineering graduate from Suez, Egypt.",
    about: {
      nav: "About",
      title: "About me",
      lead: "I’m drawn to the point where software meets hardware.",
      bio: "My degree gave me a foundation in computing, communications, networks, and AI. I want to apply that knowledge to practical engineering problems and keep building my technical skills.",
      tools: "Engineering tools",
      project:
        "I worked on the robotic arm’s movement and motor control using servo motors and drivers.",
    },
    footer: {
      title: "Alaa Abdallah",
      closing:
        "From Suez, Egypt. Looking for a role where I can apply my engineering skills.",
      contact: "Contact",
      socials: "Contact and social profiles",
      navigation: "Footer navigation",
    },
    certificates: {
      title: "Professional certificates",
      nav: "Certificates",
      intro:
        "Training and coursework in artificial intelligence through Huawei’s learning and academy programs.",
      open: "View certificate",
      close: "Close certificate",
      imageLabel: "Certificate image",
      missing: "Document available in the local preview",
      issuer: "Issuer",
      issued: "Date of issue",
      duration: "Training dates",
      type: "Type",
      course: "Course certificate",
      attendance: "Certificate of attendance",
      courseNote:
        "The document records a passing grade in the course assessment. Huawei certification requires a separate credential.",
      attendanceNote:
        "The attendance certificate records completion of the Huawei HCIA-AI learning course.",
      zoom: "Zoom in",
      fit: "Fit image",
      original: "Open full image",
    },
  },
  de: {
    home: "Startseite",
    navigation: "Hauptnavigation",
    languages: "Sprache",
    menu: "Menü öffnen",
    close: "Menü schließen",
    skipContent: "Zum Inhalt springen",
    skipIntro: "Intro überspringen",
    cv: "Lebenslauf ansehen",
    cvUnavailable: "Lebenslauf · Lokale Vorschau",
    greeting: {
      morning: "Guten Morgen, ich bin",
      afternoon: "Hallo, ich bin",
      evening: "Guten Abend, ich bin",
    },
    role: "Ingenieurabsolventin für Computer- und Kommunikationstechnik",
    year: "Abschlussjahrgang 2025",
    school: "El Shorouk Academy",
    location: "Suez, Ägypten",
    cairoTime: "Ortszeit in Kairo",
    socials: "Profile in sozialen Medien",
    portrait: "Alaa in dunkelblauem Kleid und Kopftuch",
    summary:
      "Ich habe mich mit Software, Hardware, Netzwerken und KI beschäftigt. Jetzt möchte ich mein Wissen praktisch einsetzen und weiter vertiefen.",
    description:
      "Alaa Abdallah Mohammed Muslim aus Suez, Ägypten, hat Computer- und Kommunikationstechnik studiert.",
    about: {
      nav: "Über mich",
      title: "Über mich",
      lead: "Mich interessiert besonders, wie Software und Hardware zusammenarbeiten.",
      bio: "Mein Studium hat mir Grundlagen in Informatik, Kommunikationstechnik, Netzwerken und KI vermittelt. Ich möchte dieses Wissen praktisch anwenden und meine technischen Fähigkeiten weiterentwickeln.",
      tools: "Technische Werkzeuge",
      project:
        "In diesem Projekt war ich für die Bewegungen des Roboterarms und die Motorsteuerung mit Servomotoren und Treibern zuständig.",
    },
    footer: {
      title: "Alaa Abdallah",
      closing:
        "Aus Suez, Ägypten. Auf der Suche nach einer Stelle, in der ich mein technisches Wissen anwenden kann.",
      contact: "Kontakt",
      socials: "Kontakt und Profile in sozialen Medien",
      navigation: "Fußzeilennavigation",
    },
    certificates: {
      title: "Berufliche Zertifikate",
      nav: "Zertifikate",
      intro:
        "Kurse und Schulungen zu künstlicher Intelligenz in den Lern- und Akademieprogrammen von Huawei.",
      open: "Zertifikat ansehen",
      close: "Zertifikat schließen",
      imageLabel: "Zertifikatsbild",
      missing: "Dokument in der lokalen Vorschau verfügbar",
      issuer: "Aussteller",
      issued: "Ausstellungsdatum",
      duration: "Kurszeitraum",
      type: "Art",
      course: "Kursbescheinigung",
      attendance: "Teilnahmebescheinigung",
      courseNote:
        "Das Dokument bestätigt die bestandene Kursprüfung. Eine Huawei-Zertifizierung erfordert einen separaten Nachweis.",
      attendanceNote:
        "Die Teilnahmebescheinigung dokumentiert den Abschluss des Huawei HCIA-AI-Lernkurses.",
      zoom: "Vergrößern",
      fit: "Bild einpassen",
      original: "Vollbild öffnen",
    },
  },
} satisfies Record<LoloLocale, LoloDictionary>

export const localePaths = { en: "/", de: "/de" } satisfies Record<
  LoloLocale,
  string
>
