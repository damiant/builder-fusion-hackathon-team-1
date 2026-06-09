import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ChevronDown, Eye, EyeOff, Check } from "lucide-react";
import { springs } from "@/lib/springTokens";
import { cn } from "@/lib/utils";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
  onSignIn: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  zip: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  terms: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Mexico"];
const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const fieldBase = "w-full bg-[#F2F2F2] rounded-xl px-4 text-[15px] text-[#121212] placeholder:text-[#999] outline-none h-[52px]";
const fieldError = "ring-2 ring-red-500";

export function StateJoin({ onBack, onSuccess, onSignIn }: Props) {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    zip: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.country) e.country = "Required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (!form.terms) e.terms = "Please accept the terms";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setIsLoading(false);
    onSuccess();
  }

  const transition = (delay = 0) =>
    prefersReducedMotion
      ? { duration: 0.15, ease: "linear" as const }
      : { ...springs.ListSlide, delay };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Back button */}
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
        className="flex flex-col px-6 pt-4 pb-10 gap-5 flex-1"
        noValidate
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0)}
          className="text-[32px] font-semibold text-[#121212] leading-[36px] tracking-[-1px]"
        >
          Join us
        </motion.h1>

        {/* Personal info fields */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.05)}
          className="flex flex-col gap-3"
        >
          {/* First name */}
          <div>
            <input
              type="text"
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              placeholder="First name"
              className={cn(fieldBase, errors.firstName && fieldError)}
            />
            {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
          </div>

          {/* Last name */}
          <div>
            <input
              type="text"
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              placeholder="Last name"
              className={cn(fieldBase, errors.lastName && fieldError)}
            />
            {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>}
          </div>

          {/* Country */}
          <div className="relative">
            <select
              value={form.country}
              onChange={(e) => setField("country", e.target.value)}
              className={cn(
                fieldBase,
                "appearance-none pr-10 cursor-pointer",
                !form.country && "text-[#999]",
                errors.country && fieldError
              )}
            >
              <option value="" disabled>Country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            {errors.country && <p className="text-[11px] text-red-500 mt-1">{errors.country}</p>}
          </div>

          {/* State + Zip */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <select
                value={form.state}
                onChange={(e) => setField("state", e.target.value)}
                className={cn(
                  fieldBase,
                  "appearance-none pr-8 cursor-pointer",
                  !form.state && "text-[#999]"
                )}
              >
                <option value="" disabled>State</option>
                {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={form.zip}
              onChange={(e) => setField("zip", e.target.value)}
              placeholder="Zip"
              maxLength={10}
              className={cn(fieldBase, "w-28 flex-none")}
            />
          </div>

          {/* Date of birth */}
          <input
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            value={form.dob}
            onChange={(e) => setField("dob", e.target.value)}
            placeholder="Date of birth DD/MM/YYYY"
            className={fieldBase}
          />

          {/* Phone */}
          <div className={cn("flex items-center bg-[#F2F2F2] rounded-xl h-[52px] overflow-hidden", errors.phone && fieldError)}>
            <div className="flex items-center gap-2 px-4 border-r border-[#E0E0E0] h-full shrink-0">
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="text-[15px] text-[#121212] font-medium">+1</span>
            </div>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="Phone number"
              className="flex-1 bg-transparent px-4 text-[15px] text-[#121212] placeholder:text-[#999] outline-none h-full"
            />
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[#F2F2F2]" />

        {/* Login details section */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.1)}
          className="flex flex-col gap-3"
        >
          <h2 className="text-[17px] font-semibold text-[#121212] leading-[22px]">
            Create your login details
          </h2>

          {/* Email */}
          <div>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="Email address"
              className={cn(fieldBase, errors.email && fieldError)}
            />
            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className={cn("flex items-center bg-[#F2F2F2] rounded-xl h-[52px] pr-4 overflow-hidden", errors.password && fieldError)}>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                placeholder="Create password"
                className="flex-1 bg-transparent px-4 text-[15px] text-[#121212] placeholder:text-[#999] outline-none h-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-[#999] hover:text-[#666] transition-colors shrink-0"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Terms */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={form.terms}
                onClick={() => setField("terms", !form.terms)}
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-md border-2 shrink-0 transition-colors",
                  form.terms
                    ? "bg-[#121212] border-[#121212]"
                    : errors.terms
                    ? "border-red-500"
                    : "border-[#D0D0D0]"
                )}
              >
                {form.terms && <Check size={14} strokeWidth={3} stroke="white" />}
              </button>
              <p className="text-[13px] text-[#666] leading-[20px]">
                Agree to{" "}
                <button type="button" className="text-[#121212] underline underline-offset-2">
                  Terms &amp; Conditions
                </button>
              </p>
            </div>
            {errors.terms && (
              <p className="text-[11px] text-red-500 leading-none pl-9">{errors.terms}</p>
            )}
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit */}
        <motion.button
          type="submit"
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
          transition={springs.LiquidGlassTap}
          disabled={isLoading}
          className="w-full h-[56px] flex items-center justify-center rounded-2xl bg-[#F2F2F2] text-[#999] text-[13px] font-bold tracking-[1.5px] uppercase disabled:opacity-60 transition-all"
          style={
            form.email && form.password && form.terms
              ? { background: "#121212", color: "#fff" }
              : {}
          }
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              Creating account…
            </span>
          ) : (
            "JOIN NOW"
          )}
        </motion.button>

        <p className="text-[13px] text-[#666] text-center leading-[18px]">
          Already a member?{" "}
          <button
            type="button"
            onClick={onSignIn}
            className="font-semibold text-[#121212] underline underline-offset-2"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
