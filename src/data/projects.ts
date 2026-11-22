export const projects = [
  {
    id: "warehouse",
    title: "Automatic Warehouse Logistics",
    tools: ["servo", "drivers"],
    illustration: {
      src: "/images/projects/warehouse-concept.svg",
      width: 900,
      height: 640,
    },
  },
] as const

export type ProjectId = (typeof projects)[number]["id"]
