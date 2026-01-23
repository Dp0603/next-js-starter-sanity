import React from "react";

type ImageCardProps = {
  image: string;
  title: string;
  description?: string;
  indexLabel?: string;
  footerTitle?: string;
  className?: string;
};

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  description,
  indexLabel,
  footerTitle,
  className = "",
}) => {
  return (
    <div
      className={`group relative overflow-hidden bg-neutral-100 ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
        {indexLabel && (
          <span className="text-accent-500 text-xs font-bold uppercase tracking-widest mb-2">
            {indexLabel}
          </span>
        )}
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-neutral-300 text-sm line-clamp-2 mb-4">
            {description}
          </p>
        )}
        <span className="text-white text-xs uppercase tracking-widest underline decoration-accent-500 underline-offset-4">
          View Details
        </span>
      </div>

      {/* Footer title (non-hover) */}
      {footerTitle && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-xl font-bold text-white">{footerTitle}</h3>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
