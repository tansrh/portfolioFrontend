import Image from "next/image";
import Link from "next/link";

export default function PublicPersonalDetails({ personalDetails }: { personalDetails: any }) {
  if (!personalDetails) return null;
  return (
    <section id="personal" className="flex flex-col gap-4 py-8 md:py-10">
      {/* Top row: Image and "Hi I am ..." */}
      <div className="flex  flex-col sm:flex-row items-start sm:items-center gap-6">
        {personalDetails.imageUrl && (
          <div className="flex items-center self-stretch">
            <Image
              src={personalDetails.imageUrl}
              alt={personalDetails.name}
              width={200}
              height={200}
              className="rounded-xl  object-cover shadow-lg border-2 border-black dark:border-white"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">
            Hi, I am {personalDetails.name}
          </h2>
        </div>
      </div>
      {/* Description below */}
      {personalDetails.about && (
        <div
          className="mt-2 text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-2xl"
          dangerouslySetInnerHTML={{ __html: personalDetails.about }}
        />
      )}
    </section>
  );
}