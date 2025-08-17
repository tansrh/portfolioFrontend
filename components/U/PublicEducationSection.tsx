export default function PublicEducationSection({ education }: { education: any[] }) {
  if (!education?.length) return null;
  return (
    <section id="education" className="py-8 md:py-10">
      <h2 className="text-3xl font-bold mb-8 text-left">Education</h2>
      <ul className=" space-y-8">
        {education.map((edu, idx) => (
          <li key={idx} className="flex flex-col bg-white dark:bg-black rounded-lg shadow-lg dark:shadow-[0_4px_32px_0_rgba(255,255,255,0.16)] p-6 text-left transition-transform duration-200 hover:scale-[1.02]">
            <div className="text-lg font-semibold mb-1">{edu.degree}</div>
            <div className="text-base mb-1">{edu.institution}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {edu.from && edu.to
                ? `${new Date(edu.from).toLocaleDateString(undefined, { year: "numeric", month: "short" })} - ${new Date(edu.to).toLocaleDateString(undefined, { year: "numeric", month: "short" })}`
                : null}
            </div>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: edu.achievements || "" }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}