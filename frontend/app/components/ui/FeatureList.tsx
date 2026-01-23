import React from "react";
import { Check } from "lucide-react";

type FeatureListProps = {
  items: string[];
  variant?: "line" | "check";
  className?: string;
};

const FeatureList: React.FC<FeatureListProps> = ({
  items,
  variant = "line",
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          {variant === "line" ? (
            <span className="w-12 h-px bg-accent-500" />
          ) : (
            <Check size={18} className="text-accent-500 shrink-0" />
          )}
          <span className="text-navy-900 font-bold uppercase tracking-wider text-xs">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
