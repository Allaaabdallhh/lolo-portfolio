import Image from "next/image"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { projects } from "@/data/projects"
import { lolo, type LoloLocale } from "@/i18n/lolo"
import { workCopy } from "@/i18n/lolo-work"
import { ProjectFrame } from "./ProjectFrame"
import { ProjectDetails } from "./ProjectDetails"

export function FeaturedProjects({ locale }: { locale: LoloLocale }) {
  const { projects: copy, tools, projectCopy } = workCopy[locale]
  return (
    <section
      id="projects"
      className="lolo-projects-section lolo-projects-signature"
      aria-labelledby="projects-heading"
    >
      <div className="lolo-wrap lolo-work-inner">
        <SectionIndex
          number={loloSectionOrder.projects}
          label={copy.index}
          headingId="projects-heading"
        />
        <header className="lolo-work-heading">
          <h2 id="projects-heading">{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>
        {projects.map((project, index) => {
          const item = projectCopy[project.id]
          const art = (
            <figure className="lolo-project-art">
              <Image
                {...project.illustration}
                alt={item.alt}
                unoptimized
                loading="eager"
                sizes="(max-width: 767px) 92vw, 620px"
              />
              <figcaption>{copy.concept}</figcaption>
            </figure>
          )
          return (
            <ProjectFrame key={project.id}>
              {art}
              <div className="lolo-project-copy">
                <p className="lolo-project-type">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.type}
                </p>
                <h3>{project.title}</h3>
                <p>{item.brief}</p>
                <p className="lolo-project-role-label">{copy.contribution}</p>
                <p>{item.role}</p>
                <ul aria-label={copy.tools}>
                  {project.tools.map((tool) => (
                    <li key={tool}>{tools[tool]}</li>
                  ))}
                </ul>
                <ProjectDetails
                  title={project.title}
                  brief={item.brief}
                  open={copy.details}
                  close={lolo[locale].close}
                >
                  <div className="lolo-project-dialog-layout">
                    {art}
                    <div>
                      <h3>{copy.contribution}</h3>
                      <p>{item.role}</p>
                      <p>{item.context}</p>
                    </div>
                  </div>
                </ProjectDetails>
              </div>
            </ProjectFrame>
          )
        })}
      </div>
    </section>
  )
}
