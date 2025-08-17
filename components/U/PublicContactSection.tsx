import Link from "next/link";

export default function PublicContactSection({ contact }: { contact: any }) {
  if (!contact) return null;
  return (
    <section id="contact" className="py-8 md:py-10 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-left">Contact</h2>
      <div className="flex flex-col gap-3 text-lg">
        {Object.entries(contact).map(([key, value]) => (
          <div key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {typeof value === "string" && value.startsWith("http") ? (
              <Link href={value} target="_blank" rel="noopener noreferrer" className="underline">
                {String(value)}
              </Link>
            ) : key === "email" ? (
              <Link href={`mailto:${String(value)}`} className="underline">
                {String(value)}
              </Link>
            ) : (
              String(value)
            )}
          </div>
        ))}
      </div>
    </section>
  );
}