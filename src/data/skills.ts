export const skills = {
  programming: [
    { id: "python", label: "Python", logo: "python" },
    { id: "java", label: "Java" },
    { id: "cpp", label: "C++", logo: "cplusplus" },
    { id: "csharp", label: "C#", logo: "csharp" },
  ],
  tools: [
    { id: "arduino", label: "Arduino®" },
    { id: "git", label: "Git", logo: "git" },
    { id: "servo" },
    { id: "drivers" },
  ],
  systems: [{ id: "networks" }, { id: "communications" }],
  engineering: [{ id: "control" }, { id: "electrical" }, { id: "ai" }],
} as const satisfies Record<
  string,
  readonly { id: string; label?: string; logo?: string }[]
>

export type Skill = (typeof skills)[keyof typeof skills][number]
export type SkillGroup = keyof typeof skills
