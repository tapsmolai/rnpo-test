import { useState } from "react";
import logo from "../assets/cf-logo.png";

//const PLANS_URL = "https://connect-and-funda.vercel.app/#plans";

type AudienceHeaderProps = {
  audienceLabel: string;
  activePage: "audience" | "about";
  onLogoClick: () => void;
  onAboutClick: () => void;
  onPlansClick: () => void;
  onPartnerClick: () => void;
};

export default function AudienceHeader({
  audienceLabel,
  activePage,
  onLogoClick,
  onAboutClick,
  onPlansClick,
  onPartnerClick,
}: AudienceHeaderProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  function handleLogoClick() {
    closeMenu();
    onLogoClick();
  }

  function handleAboutClick() {
    closeMenu();
    onAboutClick();
  }

  function handlePartnerClick() {
    closeMenu();
    onPartnerClick();
  }

  const activeNavClass =
    "font-display font-semibold text-[.92rem] transition-colors text-cf-orange";

  const inactiveNavClass =
    "font-display font-semibold text-[.92rem] text-cf-navy hover:text-cf-orange transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-cf-line">
      <div className="mx-auto max-w-[1180px] px-6 h-[74px] flex items-center justify-between">
        <button
          type="button"
          onClick={handleLogoClick}
          className="shrink-0"
          aria-label="Go to landing page"
        >
          <img src={logo} alt="Connect+Funda Mobile" className="h-[50px]" />
        </button>

        <nav className="hidden md:flex items-center gap-7">
          <button
            type="button"
            onClick={handleAboutClick}
            className={
              activePage === "about" ? activeNavClass : inactiveNavClass
            }
          >
            About
          </button>

          <button
            type="button"
            onClick={handleLogoClick}
            className={
              activePage === "audience" ? activeNavClass : inactiveNavClass
            }
          >
            {audienceLabel}
          </button>

          <button
            type="button"
            onClick={onPlansClick}
            className={inactiveNavClass}
          >
            Plans
          </button>
        </nav>

        <button
          type="button"
          onClick={handlePartnerClick}
          className="hidden md:inline-flex btn-primary !px-5 !py-2.5"
        >
          Partner with us
        </button>

        <button
          type="button"
          className="md:hidden p-2"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((current) => !current)}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2D3645"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cf-line bg-white px-6 py-4">
          <button
            type="button"
            onClick={handleAboutClick}
            className={`block w-full py-2.5 text-left font-display font-semibold transition-colors ${
              activePage === "about"
                ? "text-cf-orange"
                : "text-cf-navy hover:text-cf-orange"
            }`}
          >
            About
          </button>

          <button
            type="button"
            onClick={handleLogoClick}
            className={`block w-full py-2.5 text-left font-display font-semibold transition-colors ${
              activePage === "audience"
                ? "text-cf-orange"
                : "text-cf-navy hover:text-cf-orange"
            }`}
          >
            {audienceLabel}
          </button>

          <button
            type="button"
            onClick={() => {
              closeMenu();
              onPlansClick();
            }}
            className="block w-full py-2.5 text-left font-display font-semibold text-cf-navy transition-colors hover:text-cf-orange"
          >
            Plans
          </button>

          <button
            type="button"
            onClick={handlePartnerClick}
            className="btn-primary mt-3 w-full justify-center"
          >
            Partner with us
          </button>
        </div>
      )}
    </header>
  );
}
