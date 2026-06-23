import type { ReactNode } from "react";
import partnershipImg from "../assets/partnership.jpg";
import homeStudyImg from "../assets/home-study.jpg";

/**
 * AUDIENCE CONFIG SCAFFOLD
 * ------------------------------------------------------------------
 * Every landing page (Schools, NPO/CSR, Tertiary/SRC) is the SAME set of
 * shared components driven by one of these config objects.
 *
 * To launch the Tertiary / SRC page later:
 *   1. Copy `npoConfig`, rename to `tertiaryConfig`.
 *   2. Edit copy / stats / tiers / audience cards.
 *   3. Render <LandingPage config={tertiaryConfig} /> at route /tertiary.
 * No new components required.
 */

export type IconName =
  | "book"
  | "chart"
  | "shield"
  | "trophy"
  | "coin"
  | "gear"
  | "handshake"
  | "users"
  | "growth"
  | "heart"
  | "building"
  | "choose"
  | "sim"
  | "report"
  | "lock"
  | "bank"
  | "leaf"
  | "pickaxe";

export interface Pillar {
  icon: IconName;
  title: string;
  body: string;
}
export interface Feature {
  icon: IconName;
  title: string;
  body: ReactNode;
  pill?: string;
}
export interface Stat {
  num: string;
  accent?: string;
  label: string;
}
export interface Step {
  icon: IconName;
  title: string;
  body: string;
}
export interface Tier {
  tag: string;
  title: string;
  desc: string;
  price: string;
  sub: string;
}
export interface CompareRow {
  feature: string;
  cf: string;
  generic: string;
}
export interface Who {
  icon: IconName;
  title: string;
  body: string;
}
export interface ImpactRow {
  k: string;
  v: string;
}
export interface VideoCard {
  tag: string;
  tagStyle: "primary" | "partner";
  title: string;
  sub: string;
  src?: string; // URL — undefined => placeholder (click is a no-op)
  poster?: string; // optional poster image URL
}
export interface PlanPill {
  group: string;
  name: string;
}
export interface SrcBenefit {
  title: string;
  body: string;
}
export interface CustomContentItem {
  icon: IconName;
  sector: string;
  title: string;
  body: string;
}
export interface CustomContentSection {
  kicker: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  items: CustomContentItem[];
  foot: ReactNode;
}
export interface ClosingDualCard {
  imageSrc: string;
  imageAlt: string;
  tag: string;
  titleLead: string;
  titleAccent: string;
  body: string;
}
export interface ClosingDual {
  kicker: string;
  heading: string;
  cards: [ClosingDualCard, ClosingDualCard];
  foot: ReactNode;
}
export interface SrcSpotlight {
  tag: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  benefits: SrcBenefit[];
  bigStat: string;
  bigStatSub: string;
  bullets: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface RegisterField {
  name: string;
  label: string;
  type?: "text" | "email" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  half?: boolean;
}

export interface AudienceConfig {
  key: string;
  nav: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: ReactNode;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
    note: string;
    badgeBig: string;
    badgeSmall: string;
    floatLabel: string;
  };
  pillars: Pillar[];
  stats?: { caption: string; items: Stat[] }; // optional — omit if implied scale would feel like claims of achieved impact
  why: { kicker: string; heading: string; intro: string; features: Feature[] };
  customContent?: CustomContentSection; // optional — sector-specific custom bundling section
  videos: {
    kicker: string;
    heading: string;
    intro: string;
    items: VideoCard[];
    placeholderNote?: string;
  };
  how: {
    kicker: string;
    heading: string;
    intro: string;
    steps: Step[];
    foot: ReactNode;
  };
  srcSpotlight?: SrcSpotlight; // optional — rendered between How and Models when present
  models: { kicker: string; heading: string; intro: string; tiers: Tier[] };
  plans: {
    kicker: string;
    heading: string;
    intro?: string; // optional — when absent, only heading + visual + CTA + disclaimer render
    subHeading?: string; // optional — Schools-style simplified plans omits this
    subIntro?: string; // optional
    pills?: PlanPill[]; // optional — omit for simplified Schools-style plans block
    disclaimer: ReactNode;
    catalogueUrl: string;
    catalogueLabel: string;
  };
  quote: { text: ReactNode; by: string };
  who: { kicker: string; heading: string; items: Who[] };
  compare: { kicker: string; heading: string; rows: CompareRow[] };
  impact: {
    heading: string;
    intro: string;
    checks: string[];
    panel: ImpactRow[];
  };
  register: {
    kicker: string;
    heading: string;
    intro: string;
    fields: RegisterField[];
    successMsg: string;
  };
  closingBanner?: {
    // optional — when closingDual is used instead, omit this
    imageSrc: string;
    titleLead: string;
    titleAccent: string;
    body: string;
    eyebrow: string;
    imageAlt: string;
  };
  closingDual?: ClosingDual; // optional — two-image closing section, mutually exclusive with closingBanner
  ctaBand?: { heading: string; body: string; cta: string }; // optional — orange CTA band before footer
  partners?: string[];
  footerTag?: string;
}

/* ============================ NPO / CSR CONFIG ============================ */

export const npoConfig: AudienceConfig = {
  key: "npo",
  nav: [], // unused — landing page renders logo-only header (Schools style)
  hero: {
    eyebrow: "★ Partner with Connect+Funda",
    titleLead: "Together, we fund potential and unlock ",
    titleAccent: "brighter futures.",
    lead: (
      <>
        Through CSR partnerships, foundations and NPOs, Connect+Funda Mobile
        puts affordable connectivity, safe content and world-class learning
        tools in the hands of more learners —{" "}
        <strong className="text-cf-navy">
          adding value beyond the school gate.
        </strong>
      </>
    ),
    primaryCta: "Register Your Interest",
    secondaryCta: "How partnership works",
    secondaryHref: "#why",
    note: "🔒 No obligation · Custom proposals · Pilot programmes available",
    badgeBig: "When we partner,",
    badgeSmall: "we fund futures.",
    floatLabel: "The Connect+Funda partnership promise",
  },
  pillars: [
    {
      icon: "handshake",
      title: "Purpose-led partnerships",
      body: "Align your CSR goals with measurable social impact.",
    },
    {
      icon: "users",
      title: "Scalable & sustainable",
      body: "Flexible models that reach more learners, for longer.",
    },
    {
      icon: "growth",
      title: "Measurable impact",
      body: "Real-time reports on access, engagement & outcomes.",
    },
    {
      icon: "trophy",
      title: "Changing lives",
      body: "Empowering learners today, building leaders tomorrow.",
    },
  ],
  // NB: stats omitted intentionally — aspirational scale figures read like claimed achievements.
  why: {
    kicker: "Why Partner With Us",
    heading: "More than data. World-class learning, locked to your purpose.",
    intro:
      "Generic providers give airtime. Connect+Funda gives data plus integrated world-class learning content, customisable access controls, gamified motivation, and the reporting your funders and board expect.",
    features: [
      {
        icon: "book",
        title: "World-Class Learning Content",
        pill: "Customisable",
        body: (
          <>
            Native integrations with <strong>Matific (maths)</strong>,{" "}
            <strong>Readability (reading)</strong> and{" "}
            <strong>FundaGuide AI Tutor</strong> (CAPS-aligned 1-on-1 study
            guide). Further partners providing{" "}
            <strong>science and accounting</strong> content joining shortly.
          </>
        ),
      },
      {
        icon: "lock",
        title: "Data Locked to Learning",
        pill: "Restricted access",
        body: (
          <>
            Your funded data and learning bundle can be customised so that
            learner connectivity is restricted to{" "}
            <strong>only the educational content you choose</strong> — no
            leakage to social media or other apps.
          </>
        ),
      },
      {
        icon: "chart",
        title: "Impact Measurement",
        body: "A comprehensive analytics dashboard and quarterly impact reports purpose-built for funders, boards and CSR reporting.",
      },
      {
        icon: "shield",
        title: "SafeZone Controls",
        body: "Parental and institutional oversight plus content filtering keep learners safe online — protecting both children and your organisation’s reputation.",
      },
      {
        icon: "trophy",
        title: "Points+ Rewards",
        body: "A gamified learning system that rewards positive academic behaviour, driving engagement and measurable outcomes.",
      },
      {
        icon: "coin",
        title: "Cost-Effective",
        body: "20–30% savings versus traditional providers through bulk discounts — stretching every rand of your funding further.",
      },
    ],
  },
  customContent: {
    kicker: "Made For Your Cohort",
    titleLead: "Bundle your own content. ",
    titleAccent: "Build sector-relevant skills.",
    intro:
      "Beyond our standard learning partners, we can custom-bundle the digital content your organisation cares about — sector-specific learning that turns connectivity into a pathway to your industry. The examples below are illustrative of what is possible — they are not pre-built offerings, but content we can source and bundle to suit your cohort.",
    items: [
      {
        icon: "bank",
        sector: "Banks & Financial Services",
        title: "Financial literacy content",
        body: "Money management, savings, credit and entrepreneurship modules — bundled with the data plan so your funded learners build the financial skills your industry depends on.",
      },
      {
        icon: "pickaxe",
        sector: "Mining & Heavy Industry",
        title: "Mining studies & STEM",
        body: "Geology, engineering and safety content for learners in mining communities — building tomorrow’s technical workforce in the regions you operate.",
      },
      {
        icon: "leaf",
        sector: "Forestry, Paper & Agri",
        title: "Agriculture & environmental science",
        body: "Sustainable agriculture, forestry science, and environmental stewardship content — bundled into the data plans you fund for rural learners in your footprint.",
      },
    ],
    foot: (
      <>
        Tell us your sector.{" "}
        <span className="text-cf-orange">
          We will build the right learning bundle around it.
        </span>
      </>
    ),
  },
  videos: {
    kicker: "See It In Action",
    heading: "What partnership and learning look like",
    intro:
      "A short walkthrough of how Connect+Funda partnerships work — plus our e-learning content partners and FundaGuide AI Tutor.",
    items: [
      {
        tag: "Intro Video",
        tagStyle: "primary",
        title: "Intro to NPO & CSR Partnerships",
        sub: "Why funders choose Connect+Funda",
        src: "",

        // src: undefined /* TODO: Dropbox/Vimeo URL */,
      },
      {
        tag: "Demo / Mockup",
        tagStyle: "primary",
        title: "Product Demo & App Mockup",
        sub: "See the Connect+Funda experience in action",
        src: "/videos/quick-top-up.mp4",
      },
      {
        tag: "Partner",
        tagStyle: "partner",
        title: "Matific",
        sub: "Award-winning maths content (Gr R–9)",
        src: "https://vimeo.com/1192649823",
      },
      {
        tag: "Partner",
        tagStyle: "partner",
        title: "Readability",
        sub: "Reading fluency & comprehension (Gr 1–6)",
        src: "https://vimeo.com/667528969",
      },
      {
        tag: "AI Tutor",
        tagStyle: "partner",
        title: "FundaGuide AI Tutor",
        sub: "CAPS-aligned, 1-on-1 AI study guide",
        src: "https://vimeo.com/1202080167",
      },
    ],
    placeholderNote:
      "Video placeholders — click-through behaviour will be wired by your dev team. Video files will be hosted on the C+F CDN or via Vimeo/YouTube unlisted links.",
  },
  how: {
    kicker: "How Partnership Funding Works",
    heading: "You fund. We connect. They learn.",
    intro:
      "A simple, transparent path from your contribution to measurable learner outcomes.",
    steps: [
      {
        icon: "choose",
        title: "You choose the learners",
        body: "Support entire schools, grades, or learners from the communities you serve.",
      },
      {
        icon: "sim",
        title: "We connect & support",
        body: "We provide SIMs, data and access to zero-rated learning content — fully managed.",
      },
      {
        icon: "growth",
        title: "Learners learn & grow",
        body: "They improve academically with safe, curated digital tools and Points+ rewards.",
      },
      {
        icon: "report",
        title: "You see the impact",
        body: "Receive regular reports showing engagement, learning progress and success stories.",
      },
    ],
    foot: (
      <>
        Together, we are adding value{" "}
        <span className="text-cf-orange">beyond the school gate.</span>
      </>
    ),
  },
  models: {
    kicker: "Four Flexible Partnership Models",
    heading: "Choose the model that fits your funding",
    intro:
      "From bulk-funded programmes to zero-cost referral commissions, there is a path for every NPO, foundation and CSR budget.",
    tiers: [
      {
        tag: "Tier 1",
        title: "Bulk Discount Partnership",
        desc: "Purchase discounted connectivity packages in bulk for your beneficiaries. Ideal for organisations with direct funding budgets for learner connectivity programmes.",
        price: "From R68 / learner / month",
        sub: "10% bulk discount · scales with volume",
      },
      {
        tag: "Tier 2",
        title: "Customized Access Control",
        desc: "Tailored connectivity with specific website / app restrictions and content filtering. Perfect for organisations requiring controlled educational access.",
        price: "Custom Pricing",
        sub: "Full content control · bespoke filtering",
      },
      {
        tag: "Tier 3",
        title: "Subsidized Learner Programme",
        desc: "Co-fund learner connectivity with flexible subsidy amounts. Your organisation covers a portion (R30, R50 or custom), the family covers the balance.",
        price: "Flexible Subsidy",
        sub: "Shared responsibility model",
      },
      {
        tag: "Tier 4",
        title: "Referral Commission Partnership",
        desc: "Zero upfront costs. Refer learners to Connect+Funda and earn monthly commissions for sustainable, self-funding revenue generation.",
        price: "R25 / active learner",
        sub: "Zero upfront cost · recurring income",
      },
    ],
  },
  plans: {
    kicker: "Our Data Plans & Learning Bundles",
    heading: "Affordable connectivity, purpose-built for learning",
    // Simplified Schools-style: no intro/subHeading/pills — just heading, CTA, disclaimer
    disclaimer: (
      <>
        <strong className="text-cf-orangeDk">Important:</strong> retail prices
        are published on the Connect+Funda plans catalogue.{" "}
        <strong className="text-cf-orangeDk">
          Final partnership pricing is on application
        </strong>{" "}
        and depends on customisation requirements, content access controls, and
        the number of learners being supported. Promotional pricing applies to
        subscribers who sign up in the first 90 days. Terms &amp; conditions
        apply. SIM cards available to the public from mid-June 2026.
      </>
    ),
    catalogueUrl: "https://connect-and-funda.vercel.app/#plans",
    catalogueLabel: "View Full Plan Catalogue",
  },
  quote: {
    text: (
      <>
        When we partner, we do not just fund connections.{" "}
        <span className="text-cf-orange">We fund futures.</span>
      </>
    ),
    by: "— The Connect+Funda partnership promise",
  },
  who: {
    kicker: "Who Can Partner",
    heading: "Built for organisations that invest in people",
    items: [
      {
        icon: "building",
        title: "Corporate CSR Departments",
        body: "Invest in education and digital inclusion in your host communities — with B-BBEE-aligned, board-ready impact evidence.",
      },
      {
        icon: "heart",
        title: "Foundations",
        body: "Extend your impact by equipping more learners with the tools they need to succeed, sustainably and at scale.",
      },
      {
        icon: "users",
        title: "NPOs & Community Organisations",
        body: "Empower the communities you serve with affordable, safe and scalable digital education.",
      },
    ],
  },
  compare: {
    kicker: "The Difference",
    heading: "Connect+Funda vs. generic airtime providers",
    rows: [
      {
        feature: "Educational Content Integration",
        cf: "Matific, Readability, FundaGuide AI",
        generic: "Data only",
      },
      {
        feature: "Custom Sector Content",
        cf: "Built into your bundle",
        generic: "Not supported",
      },
      {
        feature: "Content-Locked Data",
        cf: "Yes — configurable",
        generic: "No",
      },
      {
        feature: "Impact Measurement & Reporting",
        cf: "Analytics dashboard",
        generic: "No reporting",
      },
      {
        feature: "Parental Controls & Safety",
        cf: "SafeZone filtering",
        generic: "No safety features",
      },
      {
        feature: "Learning Incentives",
        cf: "Points+ rewards",
        generic: "No incentives",
      },
      {
        feature: "CSR & B-BBEE Alignment",
        cf: "Measurable social impact",
        generic: "Limited CSR value",
      },
    ],
  },
  impact: {
    heading: "Turn your CSR spend into reportable, B-BBEE-aligned impact.",
    intro:
      "Every partnership comes with the support and evidence your stakeholders need — from onboarding to board-ready impact reviews.",
    checks: [
      "Comprehensive onboarding & technical training",
      "Dedicated account management",
      "Quarterly impact reviews & funder reports",
      "Co-branded marketing materials",
      "Pilot programmes & flexible timelines",
    ],
    panel: [
      { k: "B-BBEE Socio-Economic Development", v: "✓" },
      { k: "Measurable learner reach", v: "Per quarter" },
      { k: "Admin burden on your team", v: "Minimal" },
      { k: "Setup cost (Tier 4)", v: "R0" },
      { k: "Savings vs. generic data", v: "20–30%" },
    ],
  },
  register: {
    kicker: "Register Interest",
    heading: "Let us amplify your educational impact.",
    intro:
      "Tell us about your organisation and the learners you support. Our partnerships team will follow up with a customised proposal — no obligation.",
    successMsg:
      "Thank you! Your interest has been registered. Our partnerships team will be in touch shortly.",
    fields: [
      {
        name: "org",
        label: "Organisation name",
        required: true,
        placeholder: "e.g. Thuthuka Education Foundation",
      },
      {
        name: "name",
        label: "Contact name",
        required: true,
        placeholder: "Full name",
        half: true,
      },
      {
        name: "role",
        label: "Role / title",
        placeholder: "e.g. CSR Manager",
        half: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "you@org.org.za",
        half: true,
      },
      { name: "phone", label: "Phone", placeholder: "+27 ...", half: true },
      {
        name: "type",
        label: "Organisation type",
        type: "select",
        required: true,
        half: true,
        options: [
          "NPO / NGO",
          "Private / Family Foundation",
          "Corporate CSR / CSI",
          "Government / Public Entity",
          "Other",
        ],
      },
      {
        name: "model",
        label: "Preferred partnership model",
        type: "select",
        half: true,
        options: [
          "Tier 1 – Bulk Discount",
          "Tier 2 – Customized Access",
          "Tier 3 – Subsidized Programme",
          "Tier 4 – Referral Commission",
        ],
      },
      {
        name: "learners",
        label: "Approx. learners to support",
        placeholder: "e.g. 500",
        half: true,
      },
      {
        name: "province",
        label: "Province(s)",
        placeholder: "e.g. Gauteng",
        half: true,
      },
      {
        name: "sector",
        label: "Sector content of interest (optional)",
        placeholder: "e.g. financial literacy, mining studies, agri-science",
      },
      {
        name: "msg",
        label: "Tell us about your goals",
        type: "textarea",
        placeholder: "What outcomes are you hoping to fund?",
      },
    ],
  },
  // Dual closing — partnership presentation + home study, replaces single closingBanner
  closingDual: {
    kicker: "From handshake to home study",
    heading: "Every partnership becomes real learning",
    cards: [
      {
        imageSrc: partnershipImg,
        imageAlt:
          "NPO/CSR team and Connect+Funda team formally presenting the partnership and SIMs at a school",
        tag: "Partnership delivered",
        titleLead: "Stronger together. ",
        titleAccent: "Greater impact.",
        body: "We work with your team to formally launch the programme — SIMs and learning bundles handed over directly to the schools and learners you support.",
      },
      {
        imageSrc: homeStudyImg,
        imageAlt:
          "Three learners studying together at home using a tablet, with an Accounting textbook on the table",
        tag: "Learning continues at home",
        titleLead: "Beyond the school gate. ",
        titleAccent: "Right into the home.",
        body: "Funded learners keep working — tablets and phones loaded with curated content, AI tutoring, and the data to use them, after class and on weekends.",
      },
    ],
    foot: (
      <>
        Thank you for partnering with us{" "}
        <span className="text-cf-orange">— together we fund futures.</span>
      </>
    ),
  },
  ctaBand: {
    heading: "Ready to fund potential?",
    body: "Tell us about your organisation and the learners you support. We will follow up with a custom proposal — no obligation.",
    cta: "Register Your Interest",
  },
  partners: [
    "Cell C",
    "MVNX",
    "Matific",
    "Readability",
    "FundaGuide AI Tutor",
    "Ekurhuleni District — Gauteng Department of Education",
  ],
  footerTag: "NPO, Foundation & CSR Partnerships",
};
