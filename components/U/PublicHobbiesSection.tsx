export default function PublicHobbiesSection({ hobbies }: { hobbies: any[] }) {
  if (!hobbies?.length) return null;
  return (
    <section id="hobbies" className="py-8 md:py-10">
      <h2 className="text-3xl font-bold mb-8 text-left">Hobbies</h2>
      <div className="flex flex-wrap gap-3">
        {hobbies.map((hobby, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-base font-medium"
          >
            {hobby}
          </span>
        ))}
      </div>
    </section>
  );
}