import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CallToAction } from "@/ui/components/home/CallToAction";
import { FAQ } from "@/ui/components/home/FAQ";
import { Hero } from "@/ui/components/home/Hero";
import { Pricing } from "@/ui/components/home/Pricing";
import { Testimonials } from "@/ui/components/home/Testimonials";
import { TopicHighlights } from "@/ui/components/home/TopicHighlights";
import { TrustedBy } from "@/ui/components/home/TrustedBy";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// Mock Data for Trusted Students and Testimonials
const MOCK_TRUSTED_STUDENTS = [
  { id: "1", name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", verified: true },
  { id: "2", name: "Sarah Jones", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", verified: true },
  { id: "3", name: "Michael Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", verified: true },
  { id: "4", name: "Emily Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", verified: true },
  { id: "5", name: "David Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", verified: true },
  { id: "6", name: "Jessica Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica", verified: false }, // Unverified, should not show
];

const MOCK_TESTIMONIALS = [
  {
    id: "t1",
    name: "James Wilson",
    role: "Software Engineer at Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    content: "This platform single-handedly helped me crack my Google interview. The visualizations are a game-changer for understanding complex DP problems.",
    rating: 5,
    verified: true
  },
  {
    id: "t2",
    name: "Anita Patel",
    role: "CS Student @ Stanford",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    content: "I used to struggle with Graph algorithms until I found this course. The interactive playground made concepts stick instantly.",
    rating: 5,
    verified: true
  },
  {
    id: "t3",
    name: "Robert Fox",
    role: "Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    content: "Great content, but I wish there were more Vue.js examples.",
    rating: 4,
    verified: false // Unverified, should not show
  },
  {
    id: "t4",
    name: "Maria Garcia",
    role: "Junior Dev at Amazon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    content: "The instructor explains things so clearly. From zero to hero in Data Structures!",
    rating: 5,
    verified: true
  }
];

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();

  // Calculate verified count for the badge
  const verifiedCount = MOCK_TRUSTED_STUDENTS.filter(s => s.verified).length + 1200; // Adding base number for "social proof"

  const verifiedStudents = MOCK_TRUSTED_STUDENTS.filter(s => s.verified);
  const verifiedTestimonials = MOCK_TESTIMONIALS.filter(t => t.verified);

  return (
    <>
      <Hero locale={locale} verifiedCount={verifiedCount} />

      <TrustedBy students={verifiedStudents} />

      {/* <PlatformBenefits /> */}

      <TopicHighlights locale={locale} />

      <Pricing locale={locale} />

      <Testimonials testimonials={verifiedTestimonials} />

      <FAQ />

      <CallToAction locale={locale} />
    </>
  );
}
