import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  verified: boolean;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials = [] }: TestimonialsProps) {
  // Constraint: Only show if we have verfied students
  const verifiedTestimonials = testimonials.filter((t) => t.verified);

  if (verifiedTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Join thousands of satisfied learners mastering algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verifiedTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
              </div>

              <blockquote className="text-[var(--text-primary)] mb-8 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    unoptimized // Avatars are SVGs, skip optimization
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                    {testimonial.name}
                    {testimonial.verified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
