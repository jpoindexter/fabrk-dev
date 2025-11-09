import { SVGProps } from "react";

interface SimpleIconProps extends SVGProps<SVGSVGElement> {
  path: string;
  title?: string;
  size?: number;
}

export function SimpleIcon({ path, title, size = 24, className = "", ...props }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
}
