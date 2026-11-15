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

export const Sun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </Base>
);

export const Moon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12 5 5L20 6" />
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
