import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { springs, linear } from "@/lib/springTokens";
import { cn } from "@/lib/utils";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
  onJoin: () => void;
}

export function StateSignIn({ onBack, onSuccess, onJoin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setIsLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    onSuccess();
  }

  const transition = (delay = 0) =>
    prefersReducedMotion
      ? { duration: 0.15, ease: "linear" as const }
      : { ...springs.ListSlide, delay };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Back button row */}
      <div className="flex items-center px-6 pt-[60px] pb-2">
        <motion.button
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          transition={springs.LiquidGlassTap}
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F2F2F2] -ml-1"
        >
          <ArrowLeft size={20} strokeWidth={2} stroke="#121212" />
        </motion.button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-6 pt-6 pb-10 gap-6 flex-1"
        noValidate
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0)}
          className="flex flex-col gap-2"
        >
          <h1 className="text-[32px] font-semibold text-[#121212] leading-[36px] tracking-[-1px]">
            Sign in
          </h1>
          <p className="text-[15px] text-[#666] leading-[22px]">
            Welcome back. Enter your details to continue.
          </p>
        </motion.div>

        {/* Fields */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.067)}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#121212] leading-[18px]" htmlFor="signin-email">
              Email address
            </label>
            <div
              className={cn(
                "flex items-center rounded-2xl px-5 py-4 gap-3 bg-white transition-shadow",
                errors.email
                  ? "border-2 border-red-500"
                  : "border border-[#F2F2F2] shadow-[0_6px_20px_0_rgba(0,0,0,0.06)]"
              )}
            >
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-[15px] text-[#121212] placeholder:text-[#999] outline-none leading-[22px]"
              />
            </div>
            {errors.email && (
              <p className="text-[12px] text-red-500 leading-none">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#121212] leading-[18px]" htmlFor="signin-password">
              Password
            </label>
            <div
              className={cn(
                "flex items-center rounded-2xl px-5 py-4 gap-3 bg-white transition-shadow",
                errors.password
                  ? "border-2 border-red-500"
                  : "border border-[#F2F2F2] shadow-[0_6px_20px_0_rgba(0,0,0,0.06)]"
              )}
            >
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                placeholder="Your password"
                className="flex-1 bg-transparent text-[15px] text-[#121212] placeholder:text-[#999] outline-none leading-[22px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-[#999] hover:text-[#666] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[12px] text-red-500 leading-none">{errors.password}</p>
            )}
          </div>

          {/* Forgot password */}
          <button
            type="button"
            className="self-end text-[13px] font-semibold text-[#121212] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Forgot password?
          </button>
        </motion.div>

        {/* Divider + Social hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...linear.normal, delay: 0.13 }}
          className="flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-[#F2F2F2]" />
          <span className="text-[12px] text-[#999] font-medium">or continue with</span>
          <div className="flex-1 h-px bg-[#F2F2F2]" />
        </motion.div>

        {/* Apple / Google buttons */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.16)}
          className="flex gap-3"
        >
          {/* Apple */}
          <motion.button
            type="button"
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            transition={springs.LiquidGlassTap}
            className="flex-1 flex items-center justify-center gap-2 h-[52px] rounded-2xl border border-[#F2F2F2] bg-white shadow-[0_6px_20px_0_rgba(0,0,0,0.06)] text-[14px] font-semibold text-[#121212]"
          >
            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" aria-hidden="true">
              <path d="M14.0671 10.5814C14.0484 8.52001 14.9726 6.96992 16.8398 5.82617C15.7897 4.32422 14.2146 3.49023 12.1362 3.3252C10.1686 3.16309 8.02441 4.46191 7.23145 4.46191C6.39258 4.46191 4.49756 3.37793 2.99121 3.37793C0.0126953 3.42773 -2.86102e-06 7.7002 -2.86102e-06 7.7002C-2.86102e-06 7.7002 -0.224609 14.4648 3.12598 17.1436C4.42480 18.208 5.54590 18.8838 6.91699 18.8838C8.00000 18.8838 8.63379 18.2734 9.97363 18.2734C11.3135 18.2734 11.7920 18.8838 13.0332 18.8838C14.4043 18.8838 15.5498 18.1396 16.6943 17.1924C15.3857 15.4834 14.0671 12.6641 14.0671 10.5814Z" fill="#121212"/>
              <path d="M11.6475 2.23242C12.6416 1.02051 13.2324 -0.303711 13.0771 -1.74609C11.7529 -1.61426 10.2422 -0.720703 9.19238 0.543945C8.23730 1.68848 7.53809 3.05469 7.73242 4.40039C9.17480 4.50781 10.6543 3.4502 11.6475 2.23242Z" fill="#121212"/>
            </svg>
            Apple
          </motion.button>
          {/* Google */}
          <motion.button
            type="button"
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            transition={springs.LiquidGlassTap}
            className="flex-1 flex items-center justify-center gap-2 h-[52px] rounded-2xl border border-[#F2F2F2] bg-white shadow-[0_6px_20px_0_rgba(0,0,0,0.06)] text-[14px] font-semibold text-[#121212]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M17.64 9.2045C17.64 8.5664 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.2045Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.5932 3.68182 9C3.68182 8.4068 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1732 0 7.5477 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
              <path d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9259L15.0218 2.3445C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z" fill="#EA4335"/>
            </svg>
            Google
          </motion.button>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.2)}
          className="flex flex-col gap-4"
        >
          <motion.button
            type="submit"
            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            transition={springs.LiquidGlassTap}
            disabled={isLoading}
            className="w-full h-[56px] flex items-center justify-center rounded-2xl bg-[#121212] text-white text-[15px] font-bold tracking-wide disabled:opacity-60 transition-opacity"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              "SIGN IN"
            )}
          </motion.button>

          <p className="text-[13px] text-[#666] text-center leading-[18px]">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onJoin}
              className="font-semibold text-[#121212] underline underline-offset-2"
            >
              Join Us
            </button>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
