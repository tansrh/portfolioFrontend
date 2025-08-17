export default function PublicAchievementsSection({ achievements }: { achievements: any[] }) {
  if (!achievements?.length) return null;
  return (
    <section id="achievements" className="py-8 md:py-10">
      <h2 className="text-3xl font-bold mb-8 text-left">Achievements</h2>
      <ul className="space-y-8">
        {achievements.map((ach, idx) => (
          <li key={idx} className="flex flex-col bg-white dark:bg-black rounded-lg dark:shadow-[0_4px_32px_0_rgba(255,255,255,0.16)] shadow p-6 text-left transition-transform duration-200 hover:scale-[1.03]">
            <div className="text-lg font-semibold mb-1">{ach.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {ach.date && new Date(ach.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </div>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: ach.description || "" }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}