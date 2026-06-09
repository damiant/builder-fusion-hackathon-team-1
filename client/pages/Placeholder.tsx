import { useLocation } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";

const pageTitles: Record<string, string> = {
  "/book": "Book",
  "/discover": "Discover",
  "/rewards": "Rewards",
  "/account": "Account",
};

export default function Placeholder() {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "Page";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #86080B, #6B0609, #200203)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 pb-20">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <span className="text-white/40 text-2xl">✦</span>
        </div>
        <h1 className="text-white text-2xl font-bold text-center">{title}</h1>
        <p className="text-white/50 text-sm text-center max-w-xs">
          This section is coming soon. Continue prompting to build out the {title} experience.
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
