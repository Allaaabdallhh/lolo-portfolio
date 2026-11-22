export function LetterReveal({
  lines,
  id,
}: {
  lines: readonly string[]
  id?: string
}) {
  return (
    <h1 id={id} className="lolo-title" aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span
          className="lolo-title-line"
          data-lolo-line={index}
          key={line}
          aria-hidden="true"
        >
          {Array.from(line).map((letter, letterIndex) => (
            <span data-lolo-letter key={letterIndex}>
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
