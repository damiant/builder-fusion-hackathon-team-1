import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StateSwitcher, MemberState } from "@/components/home/StateSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { StateUnauthenticated } from "@/components/home/StateUnauthenticated";
import { StateSignIn } from "@/components/home/StateSignIn";
import { StateJoin } from "@/components/home/StateJoin";
import { StateAuthenticated } from "@/components/home/StateAuthenticated";
import { StateWithBooking } from "@/components/home/StateWithBooking";
import { StateCheckIn } from "@/components/home/StateCheckIn";
import { StateActiveStay } from "@/components/home/StateActiveStay";
import { TierMilestoneModal, TierLevel } from "@/components/home/TierMilestoneModal";

// Background per state
const stateBackground: Record<MemberState, string> = {
  unauthenticated:   "linear-gradient(to bottom, #86080B, #6B0609, #200203)",
  signin:            "#FFFFFF",
  join:              "#FFFFFF",
  authenticated:     "#FFFFFF",
  booking:           "#FFFFFF",
  checkin:           "linear-gradient(to bottom, #86080B, #6B0609, #200203)",
  activestay:        "#FFFFFF",
  activestay_plans:  "#FFFFFF",
};

// Bottom nav only shown when authenticated or deeper
const navStates: MemberState[] = ["authenticated", "booking", "checkin", "activestay", "activestay_plans"];

export default function Index() {
  const [memberState, setMemberState] = useState<MemberState>("unauthenticated");
  const [preAuthDest, setPreAuthDest] = useState<"authenticated">("authenticated");
  const [milestone, setMilestone] = useState<TierLevel | null>(null);

  function go(state: MemberState) { setMemberState(state); }

  function handleAuthSuccess() {
    go("authenticated");
    // Show Gold milestone on first login/join (demo: always shows Gold)
    setMilestone("gold");
  }

  function renderState() {
    switch (memberState) {
      case "unauthenticated":
        return (
          <StateUnauthenticated
            onSignIn={() => go("signin")}
            onJoin={() => go("join")}
          />
        );
      case "signin":
        return (
          <StateSignIn
            onBack={() => go("unauthenticated")}
            onSuccess={handleAuthSuccess}
            onJoin={() => go("join")}
          />
        );
      case "join":
        return (
          <StateJoin
            onBack={() => go("unauthenticated")}
            onSuccess={handleAuthSuccess}
            onSignIn={() => go("signin")}
          />
        );
      case "authenticated":
        return <StateAuthenticated onBook={() => go("booking")} />;
      case "booking":
        return <StateWithBooking onCheckIn={() => go("checkin")} />;
      case "checkin":
        return <StateCheckIn onCheckIn={() => go("activestay")} />;
      case "activestay":
        return <StateActiveStay hasPlans={false} />;
      case "activestay_plans":
        return <StateActiveStay hasPlans={true} />;
    }
  }

  const showNav = navStates.includes(memberState);

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{ background: "#0a0a0a" }}
    >
      {/* Phone shell */}
      <div
        className="relative w-full max-w-sm mx-auto"
        style={{
          minHeight: "100svh",
          background: stateBackground[memberState],
          transition: "background 0.25s ease",
        }}
      >
        {/* Prototype state switcher */}
        <StateSwitcher state={memberState} onChange={go} />

        {/* Screen content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={memberState}
            initial={{ opacity: 0, x: memberState === "unauthenticated" ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: memberState === "unauthenticated" ? 12 : -12 }}
            transition={{ duration: 0.22, ease: [0.32, 0, 0.67, 0] }}
            className="relative min-h-screen"
          >
            {renderState()}
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav — only when authenticated */}
        {showNav && <BottomNav />}

        {/* Tier milestone overlay — shown after first login */}
        {milestone && (
          <TierMilestoneModal
            tier={milestone}
            onDismiss={() => setMilestone(null)}
          />
        )}

        {/* Accessibility: state change announcements */}
        <div aria-live="assertive" aria-atomic="true" className="sr-only">
          {memberState === "unauthenticated" && "Home screen: Guest view"}
          {memberState === "signin" && "Sign in screen"}
          {memberState === "join" && "Create account screen"}
          {memberState === "authenticated" && "Home screen: Member view"}
          {memberState === "booking" && "Home screen: Your booking"}
          {memberState === "checkin" && "Home screen: Check-in available"}
          {memberState === "activestay" && "Home screen: Active stay with digital key"}
          {memberState === "activestay_plans" && "Home screen: Active stay with plans"}
        </div>
      </div>
    </div>
  );
}
