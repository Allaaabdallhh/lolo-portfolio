export const focusAreas = [
  {
    id: "programming",
    titleKey: "focus.programming.title",
    descKey: "focus.programming.desc",
    icon: "code",
    tags: ["Python", "Java", "C++", "C#"],
  },
  {
    id: "embedded",
    titleKey: "focus.embedded.title",
    descKey: "focus.embedded.desc",
    icon: "cpu",
    tags: ["Arduino", "Microcontrollers", "Sensors", "Actuators"],
  },
  {
    id: "networks",
    titleKey: "focus.networks.title",
    descKey: "focus.networks.desc",
    icon: "network",
    tags: ["Network Protocols", "Communications", "Signal Processing", "IoT"],
  },
  {
    id: "control",
    titleKey: "focus.control.title",
    descKey: "focus.control.desc",
    icon: "settings",
    tags: ["Control Theory", "Circuits", "Motor Drivers", "Servo Systems"],
  },
  {
    id: "problem-solving",
    titleKey: "focus.problemSolving.title",
    descKey: "focus.problemSolving.desc",
    icon: "lightbulb",
    tags: ["Analytical Thinking", "System Design", "Debugging", "Optimization"],
  },
  {
    id: "ai-interest",
    titleKey: "focus.aiInterest.title",
    descKey: "focus.aiInterest.desc",
    icon: "brain",
    tags: [
      "ML Fundamentals",
      "Neural Networks",
      "Huawei HCIA-AI",
      "Applied AI",
    ],
  },
] as const

export type FocusAreaId = (typeof focusAreas)[number]["id"]
export type FocusArea = (typeof focusAreas)[number]
