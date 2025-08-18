import Image from "next/image";
import Link from "next/link";

export default function PublicProjectsSection({ projects }: { projects: any[] }) {
  if (!projects?.length) return null;
  return (
    <section id="projects" className="py-8 md:py-10">
      <h2 className="text-3xl font-bold mb-8 text-left">Projects</h2>
      <div className="overflow-x-auto rounded-lg">
        <div className="flex gap-6 p-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="min-w-[320px] max-w-xs flex-shrink-0 bg-white dark:bg-black rounded-lg shadow-lg dark:shadow-[0_4px_32px_0_rgba(255,255,255,0.16)] p-4 flex flex-col h-[420px] transition-transform duration-200 hover:scale-[1.02] overflow-y-auto"
            >
              {project.imageUrl && (
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 truncate" title={project.name}>{project.name}</h3>
                {project.link && (
                  <>
                    <span className="text-xs">See: </span>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm break-all block"
                    >
                      {project.link}
                    </Link>
                  </>
                )}
                <div
                  className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-snug overflow-y-auto h-30 rounded"
                  dangerouslySetInnerHTML={{ __html: project.description || "" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}