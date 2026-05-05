"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

interface FormErrors {
  name?: string;
  classLevel?: string;
  section?: string;
  rollNo?: string;
  activity?: string;
}

const ACTIVITIES = [
  { value: "poetry", label: "🎤 Poetry Recitation", desc: "Recite a poem by Rabindranath Tagore" },
  { value: "writing", label: "✍️ Decorative Poem Writing", desc: "Write and decorate a Tagore poem beautifully" },
];

export default function RegistrationForm({ onRegistered }: { onRegistered?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [section, setSection] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [activity, setActivity] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [atBottom, setAtBottom] = useState(false);
  const [fabVisible, setFabVisible] = useState(false);

  // Show FAB after scrolling past hero, switch to "Back to Top" near bottom
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    setFabVisible(scrollY > 300);
    setAtBottom(scrollY + windowH >= docH - 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Please enter a valid name (at least 2 characters).";
    if (!classLevel) e.classLevel = "Please select your class.";
    if (!section.trim()) e.section = "Please enter your section.";
    if (!rollNo.trim()) e.rollNo = "Please enter your roll number.";
    if (!activity) e.activity = "Please select an activity.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), class: classLevel, section: section.trim().toUpperCase(), rollNo: rollNo.trim(), activity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed.");
      setSuccess(true);
      onRegistered?.();
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setName(""); setClassLevel(""); setSection(""); setRollNo(""); setActivity("");
    setErrors({}); setSuccess(false); setServerError(""); setIsOpen(false);
  }

  function handleFabClick() {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsOpen(true);
    }
  }

  const selectedActivity = ACTIVITIES.find((a) => a.value === activity);
  const inputBase = "w-full px-4 py-3 bg-cream border-[1.5px] rounded-lg font-[family-name:var(--font-inter-var)] text-sm text-navy outline-none transition-all placeholder:text-gray-400 focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]";
  const labelBase = "block font-[family-name:var(--font-inter-var)] text-sm font-semibold text-navy mb-1.5";
  const errBase = "mt-1 font-[family-name:var(--font-inter-var)] text-xs text-error";

  return (
    <>
      {/* Participate section (no button — FAB handles it) */}
      <section id="register" className="relative py-16 px-6 md:py-20 lg:py-24 bg-gradient-to-b from-cream to-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">Participate</h2>
          <hr className="gold-divider mb-4" />
          <p className="font-[family-name:var(--font-inter-var)] text-base text-navy-light max-w-md mx-auto leading-relaxed">
            Step forward and be a part of this beautiful tribute to Tagore.
          </p>
        </div>
      </section>

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <div
        className={`fixed top-90 left-4 z-40 transition-all duration-500 ${
          fabVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        } ${!atBottom ? "animate-[bounce_2s_infinite]" : ""}`}
      >
        {/* Glow ring — only on participate mode */}
        {!atBottom && (
          <span className="absolute inset-0 rounded-full bg-gold/30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
        )}
        <button
          id="fab"
          onClick={handleFabClick}
          className={`relative overflow-hidden group px-8 py-4 rounded-full font-[family-name:var(--font-inter-var)] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y-0 ${
            atBottom
              ? "bg-navy text-white min-w-0 px-5 shadow-lg font-bold text-sm"
              : "bg-gradient-to-br from-[#7A2E3A] to-[#5E232C] text-white shadow-[0_8px_32px_rgba(122,46,58,0.5)] hover:shadow-[0_12px_45px_rgba(122,46,58,0.7)] border-2 border-[#C9A84C]"
          }`}
        >
          {/* Internal shine highlight effect */}
          {!atBottom && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2.5s_ease-in-out_infinite] pointer-events-none" />
          )}

          <span className="relative z-10 flex items-center justify-center gap-2.5">
            {atBottom ? (
              "↑"
            ) : (
              <>
                <span className="text-[13px] sm:text-sm font-black uppercase tracking-[0.15em] drop-shadow-md">
                  Register Now
                </span>
                <span className="text-lg leading-none drop-shadow-md">✍️</span>
              </>
            )}
          </span>
        </button>
      </div>

      {/* ===== MODAL ===== */}
      {isOpen && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget && !loading) setIsOpen(false); }}>
          <div className="modal-content relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {!loading && (
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-cream hover:bg-ivory text-navy-light hover:text-navy transition-colors cursor-pointer z-10" aria-label="Close">✕</button>
            )}

            {success ? (
              <div className="p-8 text-center animate-scale-in">
                <div className="text-5xl mb-4 animate-float">✅</div>
                <h3 className="font-[family-name:var(--font-playfair-display)] text-2xl font-bold text-success mb-3">Registration Successful</h3>
                <p className="font-[family-name:var(--font-inter-var)] text-base text-navy-light leading-relaxed mb-2">Welcome, <span className="font-semibold text-navy">{name}</span>!</p>
                <p className="font-[family-name:var(--font-inter-var)] text-sm text-navy-light leading-relaxed mb-6">You have been registered for <span className="font-semibold text-burgundy">{selectedActivity?.label || activity}</span>.</p>
                <button onClick={handleReset} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy/15 rounded-lg font-[family-name:var(--font-inter-var)] font-semibold text-navy hover:border-navy/30 hover:bg-cream/50 transition-all cursor-pointer">Register Another Participant</button>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-playfair-display)] text-xl font-bold text-navy mb-1 pr-8">Registration Form</h3>
                <p className="font-[family-name:var(--font-inter-var)] text-sm text-navy-light mb-6">Fill out your details to participate.</p>

                {serverError && <div className="mb-5 px-4 py-3 bg-error-light border border-error/15 rounded-lg font-[family-name:var(--font-inter-var)] text-sm text-error text-center">{serverError}</div>}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="reg-name" className={labelBase}>Full Name <span className="text-burgundy">*</span></label>
                    <input id="reg-name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }} className={`${inputBase} ${errors.name ? "border-error" : "border-gold/20"}`} />
                    {errors.name && <p className={errBase}>{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-class" className={labelBase}>Class <span className="text-burgundy">*</span></label>
                      <select id="reg-class" value={classLevel} onChange={(e) => { setClassLevel(e.target.value); if (errors.classLevel) setErrors((p) => ({ ...p, classLevel: undefined })); }} className={`${inputBase} ${errors.classLevel ? "border-error" : "border-gold/20"}`}>
                        <option value="">Select</option>
                        {Array.from({ length: 9 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>)}
                      </select>
                      {errors.classLevel && <p className={errBase}>{errors.classLevel}</p>}
                    </div>
                    <div>
                      <label htmlFor="reg-section" className={labelBase}>Section <span className="text-burgundy">*</span></label>
                      <select id="reg-section" value={section} onChange={(e) => { setSection(e.target.value); if (errors.section) setErrors((p) => ({ ...p, section: undefined })); }} className={`${inputBase} ${errors.section ? "border-error" : "border-gold/20"}`}>
                        <option value="">Select</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                      {errors.section && <p className={errBase}>{errors.section}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reg-roll" className={labelBase}>Roll Number <span className="text-burgundy">*</span></label>
                    <input id="reg-roll" type="text" placeholder="Enter your roll number" value={rollNo} onChange={(e) => { setRollNo(e.target.value); if (errors.rollNo) setErrors((p) => ({ ...p, rollNo: undefined })); }} className={`${inputBase} ${errors.rollNo ? "border-error" : "border-gold/20"}`} />
                    {errors.rollNo && <p className={errBase}>{errors.rollNo}</p>}
                  </div>

                  <div>
                    <label className="block font-[family-name:var(--font-inter-var)] text-sm font-semibold text-navy mb-3">Choose Your Activity <span className="text-burgundy">*</span></label>
                    <div className="space-y-2.5">
                      {ACTIVITIES.map((act) => (
                        <label key={act.value} className={`flex items-start gap-3 p-3.5 rounded-xl border-[1.5px] cursor-pointer transition-all ${activity === act.value ? "border-gold bg-gold/[0.06] shadow-[0_2px_8px_rgba(201,168,76,0.1)]" : "border-gold/15 bg-cream/50 hover:border-gold/30 hover:bg-cream"}`}>
                          <input type="radio" name="activity" value={act.value} checked={activity === act.value} onChange={(e) => { setActivity(e.target.value); if (errors.activity) setErrors((p) => ({ ...p, activity: undefined })); }} className="mt-1 accent-gold" />
                          <div>
                            <span className="font-[family-name:var(--font-inter-var)] text-sm font-semibold text-navy">{act.label}</span>
                            <p className="font-[family-name:var(--font-inter-var)] text-xs text-navy-light mt-0.5">{act.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.activity && <p className="mt-1.5 font-[family-name:var(--font-inter-var)] text-xs text-error">{errors.activity}</p>}
                  </div>

                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-navy to-navy-light text-white font-[family-name:var(--font-inter-var)] font-semibold text-base rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer">
                    {loading ? (<><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />Submitting…</>) : "Submit Registration"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
