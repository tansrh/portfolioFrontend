import Link from "next/link";

export default function PublicContactSection({ contact }: { contact: any }) {
  if (!contact) return null;
  return (
    <section id="contact" className="py-8 md:py-10 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-left">Contact</h2>
      <div className="flex flex-col gap-3 text-lg">
        {contact.email && (
          <div>
            <strong>Email:</strong>{" "}
            <Link href={`mailto:${contact.email}`} className="underline">
              {contact.email}
            </Link>
          </div>
        )}
        {contact.linkedin && (
          <div>
            <strong>Linkedin:</strong>{" "}
            <Link href={contact.linkedin} className="underline">
              {contact.linkedin}
            </Link>
          </div>
        )}
        {contact.other && (
          <div>
            <strong>Other:</strong>{" "}
            <Link href={contact.other} target="_blank" rel="noopener noreferrer" className="underline">
              {contact.other}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}