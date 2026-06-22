import { useState, useEffect } from "react";
import type { AudienceConfig } from "../config/npo.config";
import { contact } from "../config/brand";
import { Icon, Check, Cross, ArrowLeft } from "./Icon";
import AudienceHeader from "./AudienceHeader";
import PlansModal from "./PlansModal";
import { useRegisterStore } from "../store/registerStore";

import heroImg from "../assets/hero.jpg";

/* Scroll-reveal — re-runs when step changes so new sections animate in */
function useReveal(step: string) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [step]);
}

export default function LandingPage({ config: c }: { config: AudienceConfig }) {
  const [step, setStep] = useState<"landing" | "form">("landing");
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const showPlans = () => {
    setIsPlansOpen(true);
  };

  const closePlans = () => {
    setIsPlansOpen(false);
  };
  useReveal(step);

  const showForm = () => {
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showLanding = () => {
    setStep("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "form") {
    return (
      <div className="min-h-screen font-body text-cf-ink antialiased">
        <AudienceHeader
          audienceLabel="CSR & NPOs"
          activePage="audience"
          onLogoClick={showLanding}
          onAboutClick={showLanding}
          onPlansClick={showPlans}
          onPartnerClick={showForm}
        />

        <div className="mx-auto max-w-[1180px] px-6 pt-6">
          <button
            type="button"
            onClick={showLanding}
            className="inline-flex items-center gap-2 rounded-full border border-cf-line px-4 py-2 font-display text-[.9rem] font-bold text-cf-navy transition-colors hover:border-cf-orange hover:text-cf-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to overview
          </button>
        </div>

        <RegisterSection config={c} onBack={showLanding} />

        <PlansModal isOpen={isPlansOpen} onClose={closePlans} />

        <SiteFooter config={c} onRegisterClick={showForm} />
      </div>
    );
  }

  return (
    <div className="font-body text-cf-ink antialiased">
      <AudienceHeader
        audienceLabel="CSR & NPOs"
        activePage="audience"
        onLogoClick={showLanding}
        onAboutClick={showLanding}
        onPlansClick={showPlans}
        onPartnerClick={showForm}
      />

      {/* HERO */}
      <section className="py-8 pb-20">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal-in">
              <span className="inline-flex items-center gap-2 bg-cf-orange/12 text-cf-orangeDk border border-cf-orange/30 px-3.5 py-2 rounded-full font-display font-bold text-[.74rem] tracking-[.12em] uppercase mb-[18px]">
                ★ {c.hero.eyebrow.replace("★ ", "")}
              </span>
              <h1 className="font-display font-extrabold text-cf-navy text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.1] tracking-tight mb-4">
                {c.hero.titleLead}
                <span className="text-cf-orange">{c.hero.titleAccent}</span>
              </h1>
              <p className="text-cf-muted text-[1.08rem] max-w-[32rem] mb-7">
                {c.hero.lead}
              </p>
              <div className="flex gap-4 flex-wrap mb-5">
                <button
                  onClick={showForm}
                  className="inline-flex items-center gap-2 bg-cf-orange text-white font-display font-bold text-[.95rem] px-7 py-4 rounded-full shadow-[0_12px_30px_-10px_rgba(242,104,42,.6)] hover:-translate-y-0.5 hover:bg-cf-orangeDk transition-all"
                >
                  {c.hero.primaryCta} →
                </button>
                <a
                  href={c.hero.secondaryHref}
                  className="inline-flex items-center gap-2 bg-white text-cf-navy font-display font-bold text-[.95rem] px-7 py-4 rounded-full border border-cf-line hover:border-cf-orange hover:text-cf-orange transition-colors"
                >
                  {c.hero.secondaryCta}
                </a>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["No obligation", "Custom proposals", "Pilot programmes"].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 bg-cf-bgSoft border border-cf-line px-3 py-1.5 rounded-full text-[.78rem] font-semibold"
                    >
                      <Check className="w-3.5 h-3.5 text-cf-orange" />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="relative reveal">
              <img
                src={heroImg}
                alt="South African learners walking and connecting"
                className="w-full rounded-[22px] shadow-[0_30px_70px_-25px_rgba(45,54,69,.45)] object-cover"
                style={{ aspectRatio: "1/1", objectPosition: "center 30%" }}
              />
              {/* white quote overlay card */}
              <div className="absolute left-[-22px] bottom-6 bg-white rounded-[16px] p-5 shadow-[0_18px_50px_-20px_rgba(45,54,69,.28)] max-w-[260px]">
                <div className="font-display font-bold text-cf-navy leading-[1.2]">
                  {c.hero.badgeBig}{" "}
                  <span className="text-cf-orange">{c.hero.badgeSmall}</span>
                </div>
                <small className="block text-cf-muted text-[.74rem] mt-1 font-semibold">
                  {c.hero.floatLabel}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS — dark navy strip */}
      <section
        className="bg-cf-navyInk border-y border-white/6"
        style={{ padding: 0 }}
      >
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {c.pillars.map((p, i) => (
              <div
                key={i}
                className="flex gap-3.5 items-start p-7 border-r border-white/8 last:border-r-0"
              >
                <div className="flex-none w-10 h-10 border border-cf-orange/50 rounded-full grid place-items-center text-cf-orange">
                  <Icon name={p.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-[.98rem] mb-1">
                    {p.title}
                  </h4>
                  <p className="text-[#9AA5B5] text-[.82rem] leading-[1.45]">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — optional, only render if config includes them */}
      {c.stats && (
        <section className="bg-cf-bgSoft border-b border-cf-line py-10">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="text-center mb-4 font-display font-bold text-cf-orange uppercase tracking-[.14em] text-[.74rem]">
              {c.stats.caption}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {c.stats.items.map((s, i) => (
                <div key={i} className="text-center reveal">
                  <div className="font-display font-extrabold text-[2.05rem] text-cf-navy">
                    {s.num}
                    <span className="text-cf-orange">{s.accent}</span>
                  </div>
                  <div className="text-cf-muted text-[.8rem] font-semibold uppercase tracking-wide mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY PARTNER */}
      <Section id="why">
        <SecHead
          kicker={c.why.kicker}
          heading={c.why.heading}
          intro={c.why.intro}
        />
        <div className="grid md:grid-cols-3 gap-[22px]">
          {c.why.features.map((f, i) => (
            <div
              key={i}
              className="reveal bg-white border border-cf-line rounded-[18px] p-[30px] transition hover:-translate-y-1.5 hover:shadow-cf hover:border-transparent"
            >
              <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-cf-orange/10 text-cf-orange mb-[18px]">
                <Icon name={f.icon} className="w-[26px] h-[26px]" />
              </div>
              <h3 className="font-display font-bold text-cf-navy text-[1.18rem] mb-2">
                {f.title}
              </h3>
              <p className="text-cf-muted text-[.95rem]">{f.body}</p>
              {f.pill && (
                <span className="inline-block mt-3 bg-cf-orange/10 text-cf-orangeDk text-[.74rem] font-display font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wide">
                  {f.pill}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* CUSTOM CONTENT — optional, sector-specific bundling section */}
      {c.customContent && (
        <section
          className="py-[84px]"
          style={{
            background: "linear-gradient(135deg,#FFF7ED 0%,#FFE6D5 100%)",
            borderTop: "1px solid rgba(242,104,42,.15)",
            borderBottom: "1px solid rgba(242,104,42,.15)",
          }}
        >
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="reveal text-center max-w-[42rem] mx-auto mb-[50px]">
              <div className="font-display font-bold text-cf-orange uppercase tracking-[.14em] text-[.78rem] mb-3">
                {c.customContent.kicker}
              </div>
              <h2 className="font-display font-extrabold leading-[1.1] tracking-tight text-[clamp(1.9rem,3.6vw,2.55rem)] text-cf-navy">
                {c.customContent.titleLead}
                <span className="text-cf-orange">
                  {c.customContent.titleAccent}
                </span>
              </h2>
              <p className="mt-3.5 text-[1.05rem] text-cf-muted">
                {c.customContent.intro}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-[22px]">
              {c.customContent.items.map((item, i) => (
                <div
                  key={i}
                  className="reveal bg-white border border-cf-orange/20 rounded-[18px] p-7 transition hover:-translate-y-1 hover:shadow-cf"
                >
                  <div className="w-[54px] h-[54px] rounded-[14px] grid place-items-center bg-cf-navy text-cf-orange mb-[18px]">
                    <Icon name={item.icon} className="w-[26px] h-[26px]" />
                  </div>
                  <div className="text-cf-orange font-display font-bold text-[.78rem] uppercase tracking-[.08em] mb-2">
                    {item.sector}
                  </div>
                  <h4 className="font-display font-bold text-cf-navy text-[1.05rem] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-cf-muted text-[.92rem]">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-9 font-display font-semibold text-cf-navy text-[1rem]">
              {c.customContent.foot}
            </div>
          </div>
        </section>
      )}

      {/* VIDEOS */}
      <Section id="videos" className="bg-cf-bgSoft">
        <SecHead
          kicker={c.videos.kicker}
          heading={c.videos.heading}
          intro={c.videos.intro}
        />
        <div className="grid md:grid-cols-2 gap-[22px]">
          {c.videos.items.map((v, i) => (
            <div
              key={i}
              className="reveal relative rounded-[18px] overflow-hidden cursor-pointer transition hover:-translate-y-1 hover:shadow-cf"
              style={{ aspectRatio: "16/9" }}
              onClick={() => {
                if (v.src) window.open(v.src, "_blank");
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    v.tagStyle === "primary"
                      ? "linear-gradient(135deg,#2D3645 0%,#1B222C 100%)"
                      : "linear-gradient(135deg,#3a4250 0%,#22303c 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-[22px] text-white">
                <span
                  className={`self-start px-2.5 py-1 rounded-full font-display font-bold text-[.66rem] tracking-[.12em] uppercase border ${v.tagStyle === "primary" ? "bg-cf-orange/20 text-[#FFB892] border-cf-orange/35" : "bg-white/10 text-white border-white/20"}`}
                >
                  {v.tag}
                </span>
                <div>
                  <div className="font-display font-bold text-white text-[1.05rem] leading-tight">
                    {v.title}
                  </div>
                  <small className="block text-[#9AA5B5] font-medium text-[.82rem] mt-1">
                    {v.sub}
                  </small>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cf-orange/90 grid place-items-center shadow-[0_12px_30px_-8px_rgba(242,104,42,.5)] transition hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        {c.videos.placeholderNote && (
          <p className="text-center mt-4 text-[.82rem] text-cf-muted italic">
            {c.videos.placeholderNote}
          </p>
        )}
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how">
        <SecHead
          kicker={c.how.kicker}
          heading={c.how.heading}
          intro={c.how.intro}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {c.how.steps.map((s, i) => (
            <div
              key={i}
              className="reveal relative bg-white border border-cf-line rounded-[18px] p-7"
            >
              <div className="w-11 h-11 rounded-[12px] bg-cf-navy text-white font-display font-extrabold grid place-items-center mb-4">
                {i + 1}
              </div>
              <div className="text-cf-orange mb-2.5">
                <Icon name={s.icon} className="w-[26px] h-[26px]" />
              </div>
              <h4 className="font-display font-bold text-cf-navy text-[1.08rem] mb-1.5">
                {s.title}
              </h4>
              <p className="text-cf-muted text-[.9rem]">{s.body}</p>
              {i < c.how.steps.length - 1 && (
                <span className="hidden lg:block absolute right-[-17px] top-[46px] text-cf-orange text-[1.4rem] font-bold z-10">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-[34px] font-display font-bold text-cf-navy text-[1.05rem]">
          {c.how.foot}
        </div>
      </Section>

      {/* SRC SPOTLIGHT — optional */}
      {c.srcSpotlight && (
        <section
          id="src"
          className="relative overflow-hidden text-white py-[78px]"
          style={{
            background: "linear-gradient(135deg,#2D3645 0%,#1B222C 100%)",
          }}
        >
          <div
            className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(242,104,42,.18) 0%, transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-[1180px] px-6 relative">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
              <div className="reveal">
                <span className="inline-flex items-center gap-2 bg-cf-orange/20 text-[#FFB892] border border-cf-orange/40 px-3.5 py-1.5 rounded-full font-display font-bold text-[.72rem] tracking-[.12em] uppercase">
                  {c.srcSpotlight.tag}
                </span>
                <h2 className="font-display font-extrabold text-white text-[clamp(1.9rem,3.6vw,2.5rem)] mt-4 mb-3.5 leading-[1.1]">
                  {c.srcSpotlight.titleLead}
                  <span className="text-cf-orange">
                    {c.srcSpotlight.titleAccent}
                  </span>
                </h2>
                <p className="text-[#C5CDDA] text-[1.05rem] max-w-[32rem] mb-6">
                  {c.srcSpotlight.lead}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-7">
                  {c.srcSpotlight.benefits.map((b, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-[14px] p-4 backdrop-blur-sm"
                    >
                      <h4 className="text-white font-display font-bold text-[.92rem] mb-1 flex items-center gap-2">
                        <Check className="text-cf-orange" /> {b.title}
                      </h4>
                      <p className="text-[#9AA5B5] text-[.84rem] leading-[1.5]">
                        {b.body}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href={c.srcSpotlight.ctaPrimary.href}
                  className="inline-flex items-center gap-2 bg-cf-orange text-white font-display font-bold px-7 py-4 rounded-full hover:bg-cf-orangeDk transition-colors"
                >
                  {c.srcSpotlight.ctaPrimary.label} →
                </a>
              </div>
              <div className="reveal bg-white/5 border border-white/12 rounded-[20px] p-8 backdrop-blur-md">
                <div className="font-display font-extrabold text-cf-orange text-[3.4rem] leading-none">
                  {c.srcSpotlight.bigStat}
                </div>
                <div className="text-white font-display font-bold text-[1.05rem] mt-1.5">
                  {c.srcSpotlight.bigStatSub}
                </div>
                <hr className="border-0 border-t border-white/10 my-5" />
                <ul className="list-none grid gap-3">
                  {c.srcSpotlight.bullets.map((bl, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 items-start text-[#E6EAF1] text-[.94rem] font-medium"
                    >
                      <Check className="text-cf-orange flex-none mt-0.5" /> {bl}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a
                    href={c.srcSpotlight.ctaSecondary.href}
                    className="inline-flex items-center gap-2 border border-white/30 text-white font-display font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {c.srcSpotlight.ctaSecondary.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODELS */}
      <Section id="models" className="bg-cf-navyDeep text-white">
        <SecHead
          kicker={c.models.kicker}
          heading={c.models.heading}
          intro={c.models.intro}
          dark
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.models.tiers.map((t, i) => (
            <div
              key={i}
              className="reveal relative bg-gradient-to-b from-[#333D4D] to-[#2A323F] border border-[#3C4555] rounded-[18px] p-[26px] overflow-hidden transition hover:-translate-y-1.5 hover:border-cf-orange"
            >
              <span className="absolute top-0 right-0 bg-cf-orange text-white font-display font-bold text-[.72rem] px-3.5 py-1.5 rounded-bl-[12px]">
                {t.tag}
              </span>
              <h3 className="font-display font-bold text-white text-[1.16rem] mt-1.5 mb-3">
                {t.title}
              </h3>
              <p className="text-[#AEB8C7] text-[.9rem] min-h-[84px]">
                {t.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-[#3C4555] font-display font-extrabold text-cf-orange text-[1.05rem]">
                {t.price}
                <small className="block text-[#8E99A9] font-semibold text-[.76rem] mt-1 font-body">
                  {t.sub}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PLANS — simplified Schools-style */}
      <Section id="plans" className="bg-cf-bgSoft">
        <SecHead
          kicker={c.plans.kicker}
          heading={c.plans.heading}
          intro={c.plans.intro}
        />
        {c.plans.pills && c.plans.subHeading ? (
          /* Full plans block (Tertiary style) */
          <div className="reveal relative bg-white border border-cf-line rounded-[22px] p-8 lg:p-[44px] shadow-cf overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[5px]"
              style={{ background: "linear-gradient(90deg,#F2682A,#2D3645)" }}
            />
            <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
              <div>
                <h3 className="font-display font-bold text-cf-navy text-[1.75rem] leading-tight">
                  {c.plans.subHeading}
                </h3>
                <p className="text-cf-muted mt-2.5 text-[1.02rem]">
                  {c.plans.subIntro}
                </p>
                <div className="flex gap-2.5 flex-wrap mt-[22px]">
                  {c.plans.pills.map((p, i) => (
                    <span
                      key={i}
                      className="bg-cf-bgSoft border border-cf-line px-[14px] py-2 rounded-full font-display font-bold text-[.82rem] text-cf-navy inline-flex items-center gap-1.5"
                    >
                      {p.group && <>{p.group}&nbsp;</>}
                      <em className="text-cf-orange not-italic">{p.name}</em>
                    </span>
                  ))}
                </div>
                <div className="mt-6 bg-[#FFF7ED] border border-[#FCD9B6] rounded-[14px] px-[18px] py-4 text-[.86rem] text-cf-navy leading-[1.5]">
                  {c.plans.disclaimer}
                </div>
              </div>
              <div className="text-center">
                <SimVisual />
                <button
                  type="button"
                  onClick={showPlans}
                  className="inline-flex items-center gap-2 bg-cf-navy px-7 py-4 font-display text-[.95rem] font-bold text-white rounded-full transition hover:-translate-y-0.5 hover:bg-cf-orange"
                >
                  {c.plans.catalogueLabel} →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Simplified plans (NPO style) — just visual + CTA + disclaimer */
          <div className="reveal relative bg-white border border-cf-line rounded-[22px] p-[44px] shadow-cf overflow-hidden text-center max-w-[760px] mx-auto">
            <div
              className="absolute top-0 left-0 right-0 h-[5px]"
              style={{ background: "linear-gradient(90deg,#F2682A,#2D3645)" }}
            />
            <SimVisual />
            <button
              type="button"
              onClick={showPlans}
              className="inline-flex items-center gap-2 bg-cf-navy px-7 py-4 font-display text-[.95rem] font-bold text-white rounded-full transition hover:-translate-y-0.5 hover:bg-cf-orange"
            >
              {c.plans.catalogueLabel} →
            </button>
            <p className="text-cf-muted text-[.82rem] mt-3">
              Opens the Connect+Funda plans page in a new tab
            </p>
            <div className="mt-7 bg-[#FFF7ED] border border-[#FCD9B6] rounded-[14px] px-[18px] py-4 text-[.86rem] text-cf-navy leading-[1.55] text-left">
              {c.plans.disclaimer}
            </div>
          </div>
        )}
      </Section>

      {/* QUOTE */}
      <section
        className="py-[88px] text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#2D3645,#1B222C)" }}
      >
        <div className="absolute left-1/2 top-1.5 -translate-x-1/2 font-display text-[11rem] leading-none text-cf-orange/15 select-none">
          "
        </div>
        <div className="mx-auto max-w-[1180px] px-6">
          <blockquote className="relative font-display font-bold text-[clamp(1.5rem,3.4vw,2.3rem)] leading-[1.25] max-w-[46rem] mx-auto">
            {c.quote.text}
          </blockquote>
          <div className="mt-5 text-[#9AA5B5] font-semibold text-[.9rem] tracking-wide">
            {c.quote.by}
          </div>
        </div>
      </section>

      {/* WHO CAN PARTNER */}
      <Section id="who">
        <SecHead kicker={c.who.kicker} heading={c.who.heading} />
        <div className="grid md:grid-cols-3 gap-[22px]">
          {c.who.items.map((w, i) => (
            <div
              key={i}
              className="reveal bg-white border border-cf-line rounded-[18px] p-[30px] transition hover:-translate-y-1.5 hover:shadow-cf"
            >
              <div className="w-[54px] h-[54px] rounded-full border border-cf-orange/40 grid place-items-center text-cf-orange mb-4">
                <Icon name={w.icon} className="w-[26px] h-[26px]" />
              </div>
              <h3 className="font-display font-bold text-cf-navy text-[1.16rem] mb-2">
                {w.title}
              </h3>
              <p className="text-cf-muted text-[.94rem]">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPARE */}
      <Section id="compare">
        <SecHead kicker={c.compare.kicker} heading={c.compare.heading} />
        <div className="reveal overflow-hidden border border-cf-line rounded-[18px] shadow-cf">
          <table className="w-full border-collapse text-[.95rem]">
            <thead>
              <tr>
                {["Feature", "Connect+Funda", "Generic Providers"].map(
                  (h, i) => (
                    <th
                      key={i}
                      className={`text-left px-6 py-[18px] font-display font-bold text-white bg-cf-navy ${i === 0 ? "w-[42%]" : ""}`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {c.compare.rows.map((r, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-cf-bgSoft" : ""}>
                  <td className="px-6 py-[15px] font-semibold text-cf-navy border-t border-cf-line">
                    {r.feature}
                  </td>
                  <td className="px-6 py-[15px] border-t border-cf-line bg-cf-orange/5">
                    <span className="inline-flex items-center gap-2 font-bold text-green-700">
                      <Check className="w-4 h-4" />
                      {r.cf}
                    </span>
                  </td>
                  <td className="px-6 py-[15px] border-t border-cf-line">
                    <span className="inline-flex items-center gap-2 text-cf-muted">
                      <Cross />
                      {r.generic}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* IMPACT */}
      <Section>
        <div
          className="reveal rounded-[24px] p-[54px] grid md:grid-cols-[1.2fr_.8fr] gap-10 items-center text-white"
          style={{
            background:
              "linear-gradient(120deg,rgba(45,54,69,.94),rgba(34,42,54,.86))",
          }}
        >
          <div>
            <h2 className="font-display font-extrabold text-white text-[2rem] leading-tight">
              {c.impact.heading}
            </h2>
            <p className="text-[#D2D9E4] mt-3.5">{c.impact.intro}</p>
            <ul className="list-none mt-5 grid gap-3">
              {c.impact.checks.map((ck, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 items-start text-[#E6EAF1] font-medium"
                >
                  <Check className="w-5 h-5 flex-none mt-0.5 text-cf-orange" />
                  {ck}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/8 border border-white/15 rounded-[18px] p-7 backdrop-blur">
            {c.impact.panel.map((row, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-white/10 last:border-b-0 text-[.92rem]"
              >
                <span>{row.k}</span>
                <b className="font-display text-white">{row.v}</b>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA BAND — triggers form view */}
      {c.ctaBand && (
        <section
          className="py-16 text-white text-center"
          style={{ background: "linear-gradient(135deg,#F2682A,#D9531A)" }}
        >
          <div className="mx-auto max-w-[1180px] px-6">
            <h2 className="font-display font-extrabold text-white text-[clamp(1.7rem,3.4vw,2.3rem)] mb-3.5">
              {c.ctaBand.heading}
            </h2>
            <p className="text-white/90 mb-6 text-[1.05rem]">
              {c.ctaBand.body}
            </p>
            <button
              onClick={showForm}
              className="inline-flex items-center gap-2 bg-white text-cf-orangeDk font-display font-bold text-[.95rem] px-7 py-4 rounded-full hover:bg-cf-navy hover:text-white transition-all"
            >
              {c.ctaBand.cta} →
            </button>
          </div>
        </section>
      )}

      {/* CLOSING DUAL — two side-by-side image cards */}
      {c.closingDual && (
        <section className="py-[84px] bg-cf-navyDeep">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="reveal text-center mb-9">
              <div className="font-display font-bold text-[#FFB892] uppercase tracking-[.14em] text-[.78rem] mb-3">
                {c.closingDual.kicker}
              </div>
              <h2 className="font-display font-extrabold text-white text-[clamp(1.9rem,3.6vw,2.55rem)]">
                {c.closingDual.heading}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {c.closingDual.cards.map((card, i) => (
                <div
                  key={i}
                  className="reveal flex flex-col rounded-[20px] overflow-hidden bg-cf-navyInk border border-white/8"
                  style={{ boxShadow: "0 24px 60px -30px rgba(0,0,0,.6)" }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover block"
                    />
                    <span
                      className="absolute top-[18px] left-[18px] text-[#FFB892] border border-cf-orange/50 px-3.5 py-1.5 rounded-full font-display font-bold text-[.7rem] uppercase tracking-[.12em] backdrop-blur-sm"
                      style={{ background: "rgba(27,34,44,.82)" }}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <div className="px-7 pt-[26px] pb-[30px]">
                    <h3 className="font-display font-extrabold text-white text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.18]">
                      {card.titleLead}
                      <span className="text-cf-orange">{card.titleAccent}</span>
                    </h3>
                    <p className="text-[#AEB8C7] mt-2.5 text-[.94rem] leading-[1.55]">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-9 font-display font-semibold text-[#AEB8C7] text-[.95rem]">
              {c.closingDual.foot}
            </div>
          </div>
        </section>
      )}

      {/* SINGLE CLOSING BANNER — used when closingDual is absent */}
      {c.closingBanner && !c.closingDual && (
        <section className="p-0 bg-cf-navyDeep">
          <div className="relative reveal">
            <img
              src={c.closingBanner.imageSrc}
              alt={c.closingBanner.imageAlt}
              className="w-full block max-h-[420px] object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div
              className="absolute inset-0 flex items-center px-8 lg:px-[60px] text-white"
              style={{
                background:
                  "linear-gradient(90deg,rgba(27,34,44,.78) 0%,rgba(27,34,44,.55) 40%,transparent 70%)",
              }}
            >
              <div className="max-w-[32rem]">
                <h3 className="font-display font-extrabold text-white text-[clamp(1.6rem,3vw,2.3rem)] leading-tight">
                  {c.closingBanner.titleLead}
                  <span className="text-cf-orange">
                    {c.closingBanner.titleAccent}
                  </span>
                </h3>
                <p className="text-[#D2D9E4] mt-2.5 text-base max-w-[24rem]">
                  {c.closingBanner.body}
                </p>
                <div className="mt-4 font-display font-bold text-cf-orange uppercase tracking-[.14em] text-[.76rem]">
                  {c.closingBanner.eyebrow}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter config={c} onRegisterClick={showForm} />
      <PlansModal isOpen={isPlansOpen} onClose={closePlans} />
    </div>
  );
}

/* ---- SIM visual ---- */
function SimVisual() {
  return (
    <div
      className="w-[140px] h-[140px] mx-auto mb-5 rounded-full grid place-items-center border-2 border-dashed border-cf-orange/35"
      style={{
        background:
          "radial-gradient(circle at 30% 30%,rgba(242,104,42,.16),transparent 60%),#F6F8FB",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-16 h-16 text-cf-orange"
      >
        <path d="M9 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6Z" />
        <path d="m9 3-3 3" />
        <rect x="9" y="11" width="6" height="6" rx="1" />
        <path d="M11 11v6M13 11v6" />
      </svg>
    </div>
  );
}

/* ---- Shared footer ---- */
function SiteFooter({
  config: c,
  onRegisterClick,
}: {
  config: AudienceConfig;
  onRegisterClick: () => void;
}) {
  return (
    <>
      {/* PARTNERS */}
      <div className="bg-white border-t border-cf-line py-10">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="text-center text-cf-muted font-display font-bold text-[.74rem] uppercase tracking-[.14em] mb-5">
            Powered by & partnered with
          </div>
          <div className="flex gap-8 items-center flex-wrap justify-center">
            {(
              c.partners ?? [
                "MVNX",
                "Cell C",
                "matific",
                "Readability",
                "FundaGuide AI Tutor",
              ]
            ).map((p) => (
              <span
                key={p}
                className="font-display font-bold text-cf-navy opacity-70 text-[1.02rem] hover:opacity-100 hover:text-cf-orange transition-all cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-cf-navyDeep text-[#AEB8C7] pt-14 pb-7">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 pb-[34px] border-b border-[#3A4250]">
            <div>
              <img
                src={logo}
                alt="Connect+Funda"
                className="h-[42px] mb-4 brightness-0 invert opacity-90"
              />
              <p className="max-w-[24rem]">
                South Africa's first MVNO dedicated exclusively to educational
                connectivity. Fuel your future. Live connected.
              </p>
            </div>
            <div>
              <h4 className="text-white font-display text-[.92rem] uppercase tracking-widest mb-4">
                Partnerships
              </h4>
              <a
                href="#why"
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange"
              >
                Why Partner
              </a>
              <a
                href="#how"
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange"
              >
                How It Works
              </a>
              <a
                href="#models"
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange"
              >
                Models
              </a>
              <button
                onClick={onRegisterClick}
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange text-left cursor-pointer"
              >
                Register Interest
              </button>
            </div>
            <div>
              <h4 className="text-white font-display text-[.92rem] uppercase tracking-widest mb-4">
                Contact
              </h4>
              <a
                href={`mailto:${contact.email}`}
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange"
              >
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange"
              >
                {contact.phone}
              </a>
              <a
                href={contact.webHref}
                target="_blank"
                className="block mb-2.5 text-[.92rem] hover:text-cf-orange"
              >
                {contact.web}
              </a>
            </div>
          </div>
          <div className="pt-6 flex justify-between flex-wrap gap-2.5 text-[.82rem] text-[#7B8698]">
            <span>
              © 2026 Connect+Funda Mobile (Enthucate Tech Pty Ltd). All rights
              reserved.
            </span>
            <span>{c.footerTag ?? "NPO, Foundation & CSR Partnerships"}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---- Register form ---- */
function RegisterSection({
  config: c,
}: {
  config: AudienceConfig;
  onBack?: () => void;
}) {
  const { values, submitted, setField, submit } = useRegisterStore();
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzKJW8bgTLs7y1XWjgeRordRywQpYpwtP-EIE0oZwFxM7hsTEGtiz8jmp6SvhieLAq-/exec";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = GOOGLE_SCRIPT_URL;
      form.target = "_blank";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "data";
      input.value = JSON.stringify(values);

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();

      submit();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="py-[60px] pb-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid md:grid-cols-[.9fr_1.1fr] gap-12 items-start">
          <div>
            <div className="font-display font-bold text-cf-orange uppercase tracking-[.14em] text-[.78rem] mb-3">
              {c.register.kicker}
            </div>
            <h1 className="font-display font-extrabold text-cf-navy text-[clamp(2rem,3.6vw,2.6rem)] leading-tight mb-3.5">
              {c.register.heading}
            </h1>
            <p className="text-cf-muted">{c.register.intro}</p>
            <div className="mt-7 grid gap-3.5">
              <a
                href={`mailto:${contact.email}`}
                className="flex gap-2.5 items-center text-cf-ink font-semibold hover:text-cf-orange transition-colors"
              >
                <span className="text-cf-orange">✉</span>
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="flex gap-2.5 items-center text-cf-ink font-semibold hover:text-cf-orange transition-colors"
              >
                <span className="text-cf-orange">📞</span>
                {contact.phone}
              </a>
              <a
                href={contact.webHref}
                target="_blank"
                className="flex gap-2.5 items-center text-cf-ink font-semibold hover:text-cf-orange transition-colors"
              >
                <span className="text-cf-orange">🌐</span>
                {contact.web}
              </a>
              <span className="flex gap-2.5 items-start text-cf-muted font-medium">
                <span className="text-cf-orange mt-0.5">📍</span>
                {contact.address}
              </span>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="bg-white border border-cf-line rounded-[20px] p-[34px] shadow-cf"
          >
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl font-semibold">
                {c.register.successMsg}
              </div>
            ) : (
              <>
                {c.register.fields.map((f, idx) => {
                  const inputClass =
                    "w-full px-4 py-3.5 border-[1.5px] border-cf-line rounded-[12px] font-body text-[.95rem] text-cf-ink bg-white focus:outline-none focus:border-cf-orange focus:shadow-[0_0_0_4px_rgba(242,104,42,.12)] transition-all";
                  const inner =
                    f.type === "select" ? (
                      <select
                        name={f.name}
                        required={f.required}
                        className={inputClass}
                        value={values[f.name] ?? ""}
                        onChange={(e) => setField(f.name, e.target.value)}
                      >
                        <option value="">Select…</option>
                        {(f.options ?? []).map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea
                        name={f.name}
                        rows={3}
                        placeholder={f.placeholder}
                        className={inputClass}
                        value={values[f.name] ?? ""}
                        onChange={(e) => setField(f.name, e.target.value)}
                      />
                    ) : (
                      <input
                        type={f.type ?? "text"}
                        name={f.name}
                        required={f.required}
                        placeholder={f.placeholder}
                        className={inputClass}
                        value={values[f.name] ?? ""}
                        onChange={(e) => setField(f.name, e.target.value)}
                      />
                    );
                  return (
                    <div
                      key={idx}
                      className={`mb-[18px] ${f.half ? "inline-block w-[calc(50%-7px)] align-top mr-[14px] odd:last:w-full" : ""}`}
                    >
                      <label className="block font-semibold text-[.86rem] text-cf-navy mb-1.5">
                        {f.label}
                        {f.required && " *"}
                      </label>
                      {inner}
                    </div>
                  );
                })}
                <button
                  type="submit"
                  className="w-full mt-1 bg-cf-orange text-white font-display font-bold text-[.95rem] py-4 rounded-full hover:bg-cf-orangeDk transition-colors"
                >
                  Register Interest →
                </button>
                <p className="text-center text-cf-muted text-[.78rem] mt-3">
                  We will only use your details to discuss a potential
                  partnership. POPIA-compliant.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---- small shared helpers ---- */
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-[88px] ${className}`}>
      <div className="mx-auto max-w-[1180px] px-6">{children}</div>
    </section>
  );
}
function SecHead({
  kicker,
  heading,
  intro,
  dark,
}: {
  kicker: string;
  heading: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal text-center max-w-[42rem] mx-auto mb-[50px]">
      <div className="font-display font-bold text-cf-orange uppercase tracking-[.14em] text-[.78rem] mb-3">
        {kicker}
      </div>
      <h2
        className={`font-display font-extrabold leading-[1.1] tracking-tight text-[clamp(1.9rem,3.6vw,2.55rem)] ${dark ? "text-white" : "text-cf-navy"}`}
      >
        {heading}
      </h2>
      {intro && (
        <p
          className={`mt-3.5 text-[1.05rem] ${dark ? "text-[#AEB8C7]" : "text-cf-muted"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
