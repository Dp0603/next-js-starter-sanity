import React from "react";
import { LucideIcon } from "lucide-react";

type IconTextProps = {
  icon: LucideIcon;
  title?: string;
  text: string;
  iconSize?: number;
  className?: string;
};

const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  title,
  text,
  iconSize = 24,
  className = "",
}) => {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <Icon size={iconSize} className="text-accent-500 shrink-0" />
      <div>
        {title && (
          <h4 className="font-bold text-navy-900 mb-1 tracking-tight">
            {title}
          </h4>
        )}
        <p className="text-neutral-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default IconText;
