import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      width={20}
      height={20}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const Bolt = (p: IconProps) => (
  <Base {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const Battery = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="7" width="15" height="10" />
    <path d="M18 10h2v4h-2M6 10v4M9 10v4" />
  </Base>
);

export const Cycle = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12a8 8 0 0 1 13-6l2 2M20 12a8 8 0 0 1-13 6l-2-2" />
    <path d="M19 3v5h-5M5 21v-5h5" />
  </Base>
);

export const Gauge = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 18a8 8 0 1 1 16 0" />
    <path d="M12 14 16 9" />
    <path d="M4 18h16" />
  </Base>
);

export const Cpu = (p: IconProps) => (
  <Base {...p}>
    <rect x="7" y="7" width="10" height="10" />
    <rect x="10" y="10" width="4" height="4" />
    <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
  </Base>
);

export const Thermometer = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4a2 2 0 0 1 2 2v8a4 4 0 1 1-4 0V6a2 2 0 0 1 2-2Z" />
  </Base>
);

export const Leaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z" />
    <path d="M9 15c3-3 6-4 8-5" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12 5 5L20 6" />
  </Base>
);

export const Plus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" />
    <path d="m3 6 9 7 9-7" />
  </Base>
);

export const MapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21c5-5 7-8 7-11a7 7 0 1 0-14 0c0 3 2 6 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </Base>
);

export const WhatsApp = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20l1.5-4A8 8 0 1 1 9 19l-5 1Z" />
    <path d="M9 9c0 3 3 6 6 6 1 0 1.5-1 1.5-1L14 12l-1 1c-1 0-2-1-2-2l1-1-2-2S9 8 9 9Z" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

/* ---- Category icons ---- */

export const Bike = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="17" r="3" />
    <circle cx="18" cy="17" r="3" />
    <path d="M6 17 10 8h4l3 9M9 8h5l2 4" />
  </Base>
);

export const Rickshaw = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 16V9a4 4 0 0 1 4-4h4l4 5h3v6" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M3 16h2M9 16h6" />
  </Base>
);

export const Home = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 10v9h12v-9" />
    <path d="M11 19v-5h2v5" />
  </Base>
);

export const Server = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="7" />
    <rect x="4" y="13" width="16" height="7" />
    <path d="M8 7.5h.01M8 16.5h.01" />
  </Base>
);

export const Factory = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 20V10l5 3V10l5 3V6l3 2h5v12H3Z" />
    <path d="M7 20v-4M12 20v-4M17 20v-4" />
  </Base>
);

export const iconForSlug: Record<string, (p: IconProps) => React.JSX.Element> = {
  "e-bike": Bike,
  "e-rickshaw": Rickshaw,
  inverter: Home,
  ups: Server,
  industrial: Factory,
};
