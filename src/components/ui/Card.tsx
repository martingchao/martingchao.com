import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white border border-gray-100 shadow-sm ${
        hover
          ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
