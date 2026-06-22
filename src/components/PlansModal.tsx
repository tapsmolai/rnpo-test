import { useEffect, useState } from "react";

const PLANS_URL = "https://connect-and-funda.vercel.app/#plans";

type Plan = {
  name: string;
  description: string;
  detail?: string;
  price: string;
  previousPrice?: string;
  badge?: string;
  featured?: boolean;
};

type PlanTab = {
  id: string;
  label: string;
  description: string;
  plans: Plan[];
};

const planTabs: PlanTab[] = [
  {
    id: "popular",
    label: "Most popular",
    description:
      "Our most popular plans for learning, work, streaming and everyday life.",
    plans: [
      {
        name: "Tertiary Connect",
        description: "5GB Anytime + 5GB Night-time Data",
        detail: "High-volume data for students",
        price: "R149",
        badge: "Best for students",
        featured: true,
      },
      {
        name: "The Vibe",
        description: "500MB/day · 15GB/month · 30 min voice",
        detail: "+ 1GB zero-rated data for educational sites",
        price: "R249",
        previousPrice: "Promo · R269/pm thereafter",
      },
      {
        name: "Surf Master",
        description: "15GB Anytime Data",
        detail: "Heavy research, study and streaming",
        price: "R199",
      },
    ],
  },
  {
    id: "always-connected",
    label: "Always connected",
    description:
      "Daily data, Free WhatsApp, voice minutes and parental controls.",
    plans: [
      {
        name: "The Plug",
        description: "250MB/day · 7.5GB/month · 20 min voice",
        detail: "+ 1GB zero-rated data for educational sites",
        price: "R149",
        previousPrice: "Promo · R169/pm thereafter",
      },
      {
        name: "The Vibe",
        description: "500MB/day · 15GB/month · 30 min voice",
        detail: "+ 1GB zero-rated data for educational sites",
        price: "R249",
        previousPrice: "Promo · R269/pm thereafter",
        badge: "Most popular",
        featured: true,
      },
      {
        name: "The Flex",
        description: "1GB/day · 30GB/month · 30 min voice",
        detail: "+ 1GB zero-rated data for educational sites",
        price: "R299",
        previousPrice: "Promo · R329/pm thereafter",
      },
    ],
  },
  {
    id: "data-only",
    label: "Data only",
    description:
      "Pure data bundles with Free WhatsApp and voice minutes included.",
    plans: [
      {
        name: "Basic Education",
        description: "1.2GB Anytime Data",
        detail: "Entry-level for primary learners",
        price: "R75",
      },
      {
        name: "Tertiary Connect",
        description: "5GB Anytime + 5GB Night-time Data",
        detail: "High-volume data for students",
        price: "R149",
        badge: "Best for students",
        featured: true,
      },
      {
        name: "Surf Master",
        description: "15GB Anytime Data",
        detail: "Heavy research and streaming",
        price: "R199",
      },
    ],
  },
  {
    id: "learning",
    label: "Learning add-ons",
    description:
      "Optional learning bundles and tools that sit alongside your plan.",
    plans: [
      {
        name: "Junior Maths",
        description: "Powered by Matific · Grade 4–9",
        price: "R105",
        previousPrice: "R120/pm thereafter",
      },
      {
        name: "Junior Reading",
        description: "Powered by Readability · Grade 0–6 · Up to 3 children",
        price: "R160",
        previousPrice: "R175/pm thereafter",
      },
      {
        name: "Junior Science",
        description: "Powered by Mystery Science · Grade 0–7 · Whole household",
        price: "R241",
        previousPrice: "R256/pm thereafter",
      },
      {
        name: "Accounting",
        description: "Powered by ACCX (ACCA) · High School",
        price: "R75",
        previousPrice: "Flat rate",
      },
      {
        name: "FundaGuide AI",
        description: "Better than ChatGPT for SA · Grade 8–12",
        price: "FREE",
        previousPrice: "Premium from R49/pm",
      },
    ],
  },
];

type PlansModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PlansModal({ isOpen, onClose }: PlansModalProps) {
  const [activeTab, setActiveTab] = useState("popular");

  const currentTab =
    planTabs.find((tab) => tab.id === activeTab) ?? planTabs[0];

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cf-navyDeep/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plans-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-[920px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_28px_90px_-25px_rgba(0,0,0,.6)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-cf-line px-6 py-8 sm:px-8">
          <div>
            <p className="font-display text-[.72rem] font-bold uppercase tracking-[.16em] text-cf-orange">
              Connect+Funda Mobile
            </p>

            <h2
              id="plans-modal-title"
              className="mt-1 font-display text-[1.6rem] font-extrabold text-cf-navy"
            >
              Find the plan that fits.
            </h2>

            <p className="mt-1 text-[.9rem] text-cf-muted">
              Promotional pricing applies to subscribers who sign up in the
              first 90 days.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cf-bgSoft text-cf-muted transition-colors hover:bg-cf-orange/10 hover:text-cf-orange"
            aria-label="Close plans"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="border-b border-cf-line px-6 sm:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {planTabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full px-4 py-2 font-display text-[.82rem] font-bold transition-colors ${
                    isActive
                      ? "bg-cf-orange text-white shadow-[0_8px_20px_-10px_rgba(242,104,42,.8)]"
                      : "bg-cf-bgSoft text-cf-navy hover:bg-cf-orange/10 hover:text-cf-orange"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mb-5 text-center">
            <h3 className="font-display text-[.82rem] font-bold uppercase tracking-[.14em] text-cf-orange">
              {currentTab.label}
            </h3>

            <p className="mx-auto mt-2 max-w-[620px] text-[.92rem] text-cf-muted">
              {currentTab.description}
            </p>
          </div>

          <div className="grid gap-3">
            {currentTab.plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative grid gap-4 rounded-[16px] border p-5 sm:grid-cols-[1fr_auto] sm:items-center ${
                  plan.featured
                    ? "border-cf-orange bg-[#FFF8F3] shadow-[0_16px_35px_-28px_rgba(242,104,42,.8)]"
                    : "border-cf-line bg-cf-bgSoft/60"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-display text-[1.05rem] font-extrabold text-cf-navy">
                      {plan.name}
                    </h4>

                    {plan.badge && (
                      <span className="rounded-full bg-cf-orange px-2.5 py-1 font-display text-[.65rem] font-bold uppercase tracking-[.08em] text-white">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-[.9rem] font-medium text-cf-navy">
                    {plan.description}
                  </p>

                  {plan.detail && (
                    <p className="mt-1 text-[.8rem] text-cf-muted">
                      {plan.detail}
                    </p>
                  )}
                </div>

                <div className="text-left sm:text-right">
                  <div className="font-display text-[1.35rem] font-extrabold text-cf-orange">
                    {plan.price}
                    {plan.price !== "FREE" && (
                      <span className="text-[.78rem]">/pm</span>
                    )}
                  </div>

                  {plan.previousPrice && (
                    <p className="mt-1 text-[.72rem] text-cf-muted">
                      {plan.previousPrice}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[16px] border border-[#BBD8FF] bg-[#F1F7FF] px-5 py-4 text-center">
            <p className="font-display text-[.78rem] font-bold uppercase tracking-[.08em] text-[#2147A6]">
              Automatic parental controls on all plans
            </p>

            <p className="mt-1.5 text-[.83rem] leading-relaxed text-[#3153A7]">
              Learners under 16 are automatically protected with age-appropriate
              controls, safer browsing and screen-time limits.
            </p>
          </div>
        </div>

        <div className="border-t border-cf-line bg-white px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[410px] text-[.78rem] leading-relaxed text-cf-muted">
              Need more options, plan details or terms? Explore the complete
              Connect+Funda plan suite.
            </p>

            <a
              href={PLANS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cf-navy px-5 py-3 font-display text-[.86rem] font-bold text-white transition-colors hover:bg-cf-orange"
            >
              View full plan suite →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
