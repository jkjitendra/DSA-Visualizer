import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Play, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.visualize")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Select an algorithm and watch it come to life with step-by-step animations
        </p>
      </div>

      {/* Visualizer Placeholder */}
      <div className="rounded-2xl border-2 border-dashed border-[var(--border-primary)] bg-[var(--bg-secondary)] p-12">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Placeholder icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center mb-6 opacity-50">
            <Play className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            Visualizer Coming Soon
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md">
            The interactive algorithm visualizer is being built. Soon you&apos;ll be able to
            step through algorithms with custom inputs and see them animate in real-time.
          </p>

          {/* Placeholder controls */}
          <div className="flex gap-3">
            <Button disabled className="gap-2">
              <Play className="w-4 h-4" />
              {t("player.play")}
            </Button>
            <Button variant="outline" disabled className="gap-2">
              <Settings className="w-4 h-4" />
              {t("common.settings")}
            </Button>
          </div>
        </div>
      </div>

      {/* Features preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Step-by-Step",
            description: "Control playback with play, pause, and step controls",
            icon: "⏯️",
          },
          {
            title: "Custom Inputs",
            description: "Enter your own data or generate random inputs",
            icon: "✏️",
          },
          {
            title: "Speed Control",
            description: "Adjust animation speed to match your learning pace",
            icon: "⚡",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]"
          >
            <span className="text-3xl mb-3 block">{feature.icon}</span>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
