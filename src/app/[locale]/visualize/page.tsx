import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { VisualizerClient } from "@/ui/visualizers/VisualizerClient";

interface VisualizePageProps {
  params: Promise<{ locale: string }>;
}

export default async function VisualizePage({ params }: VisualizePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VisualizeContent />;
}

function VisualizeContent() {
  const t = useTranslations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.visualize")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Select an algorithm and watch it come to life with step-by-step animations
        </p>
      </div>

      {/* Visualizer */}
      <VisualizerClient />
    </div>
  );
}

