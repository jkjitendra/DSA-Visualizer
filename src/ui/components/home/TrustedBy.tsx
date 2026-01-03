import Image from "next/image";

interface TrustedStudent {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

interface TrustedByProps {
  students?: TrustedStudent[];
}

export function TrustedBy({ students = [] }: TrustedByProps) {
  // Constraint: Only show if we have verfied students
  const verifiedStudents = students.filter((s) => s.verified);

  if (verifiedStudents.length === 0) {
    return null;
  }

  return (
    <div className="py-8 border-y border-[var(--border-primary)] bg-[var(--bg-secondary)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-[var(--text-secondary)] mb-6 uppercase tracking-wider">
          Trusted by top learners and developers
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
          {verifiedStudents.map((student) => (
            <div key={student.id} className="flex items-center gap-3">
              <div className="relative h-10 w-10 text-xs overflow-hidden rounded-full border border-[var(--border-primary)]">
                <Image
                  src={student.avatar}
                  alt={student.name}
                  fill
                  sizes="40px"
                  unoptimized // Avatars are SVGs from DiceBear, optimization often fails or is unnecessary
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-[var(--text-primary)]">{student.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
