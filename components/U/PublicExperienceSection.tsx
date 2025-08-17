export default function PublicExperienceSection({ experience }: { experience: any[] }) {
  if (!experience?.length) return null;
  return (
    <section id="experience" className="py-8 md:py-10 ">
      <h2 className="text-3xl font-bold mb-8 text-left">Experience</h2>
      <ul className="space-y-8">
        {experience.map((exp, idx) => (
          <li key={idx} className="flex flex-col bg-white dark:bg-black rounded-lg shadow-lg p-6 dark:shadow-[0_4px_32px_0_rgba(255,255,255,0.16)] text-left transition-transform duration-200 hover:scale-[1.02]">
            <div className="text-lg font-semibold mb-1">{exp.jobTitle}</div>
            <div className="text-base mb-1">{exp.company}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {exp.from && exp.to
                ? `${new Date(exp.from).toLocaleDateString(undefined, { year: "numeric", month: "short" })} - ${new Date(exp.to).toLocaleDateString(undefined, { year: "numeric", month: "short" })}`
                : null}
            </div>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: exp.description || "" }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}