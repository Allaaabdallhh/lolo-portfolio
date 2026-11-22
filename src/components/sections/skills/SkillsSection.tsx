import Image from "next/image"
import {
  Activity,
  ChevronDown,
  CircuitBoard,
  GitBranch,
  Sparkles,
  Zap,
  CodeXml,
  Cpu,
  Network,
  Radio,
} from "lucide-react"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { skills, type Skill, type SkillGroup } from "@/data/skills"
import type { LoloLocale } from "@/i18n/lolo"
import { skillLabel, workCopy } from "@/i18n/lolo-work"
import { skillContext } from "@/i18n/lolo-skill-context"
import { ToolboxCard } from "./ToolboxCard"

const groups = ["programming", "tools", "systems", "engineering"] as const
const groupIcons = {
  programming: CodeXml,
  tools: Cpu,
  systems: Radio,
  engineering: CircuitBoard,
}
const conceptIcons = {
  java: CodeXml,
  arduino: CircuitBoard,
  servo: Activity,
  drivers: Cpu,
  networks: Network,
  communications: Radio,
  control: GitBranch,
  electrical: Zap,
  ai: Sparkles,
} as const

const evidence = {
  python: "cv",
  java: "cv",
  cpp: "cv",
  csharp: "owner",
  arduino: "coursework",
  git: "cv",
  servo: "project",
  drivers: "project",
  networks: "academic",
  communications: "academic",
  control: "project",
  electrical: "academic",
  ai: "coursework",
} as const satisfies Record<
  Skill["id"],
  keyof (typeof skillContext)["en"]["evidence"]
>

export function SkillsSection({ locale }: { locale: LoloLocale }) {
  const { skills: copy } = workCopy[locale]
  const details = skillContext[locale]
  return (
    <section
      id="skills"
      className="lolo-skills-section lolo-skill-library"
      aria-labelledby="skills-heading"
    >
      <div className="lolo-wrap lolo-work-inner">
        <SectionIndex
          number={loloSectionOrder.skills}
          label={copy.index}
          headingId="skills-heading"
        />
        <header className="lolo-work-heading">
          <h2 id="skills-heading">{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>
        <div className="lolo-skill-catalog">
          {groups.map((group: SkillGroup) => {
            const Icon = groupIcons[group]
            return (
              <section
                className="lolo-skill-category"
                data-group={group}
                aria-labelledby={`skills-${group}`}
                key={group}
              >
                <h3 id={`skills-${group}`}>
                  <Icon size={20} aria-hidden="true" />
                  {details.categories[group]}
                </h3>
                <div className="lolo-skill-tiles">
                  {skills[group].map((skill) => {
                    const Glyph = !("logo" in skill) && conceptIcons[skill.id]
                    return (
                      <ToolboxCard key={skill.id} id={skill.id}>
                        <summary>
                          <span className="lolo-skill-icon">
                            {"logo" in skill ? (
                              <Image
                                src={`/logos/tech/${skill.logo}.svg`}
                                alt=""
                                width={34}
                                height={34}
                                unoptimized
                              />
                            ) : (
                              Glyph && <Glyph size={29} aria-hidden="true" />
                            )}
                          </span>
                          <span className="lolo-skill-name">
                            <strong>{skillLabel(locale, skill)}</strong>
                            <small>
                              {details.evidence[evidence[skill.id]]}
                            </small>
                          </span>
                          <ChevronDown
                            className="lolo-skill-chevron"
                            size={18}
                            aria-hidden="true"
                          />
                        </summary>
                        <p>{details.context[skill.id]}</p>
                      </ToolboxCard>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
        <a className="lolo-toolbox-bridge" href="#projects">
          {copy.bridge}
        </a>
      </div>
    </section>
  )
}
