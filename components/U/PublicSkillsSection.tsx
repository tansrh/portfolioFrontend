export default function PublicSkillsSection({ skills }: { skills: any[] }) {
    if (!skills?.length) return null;
    return (
        <section id="skills" className="py-8 md:py-10">
            <h2 className="text-3xl font-bold mb-6 text-left">Skills</h2>

            {skills.map((skill, idx) => (

                <span
            key={idx}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-base font-medium"
          >
            {skill}
          </span>
            ))}

        </section>
    );
}