import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  centered?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = false, light = false }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <span className={`inline-block py-1 px-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 border-b ${
        light ? 'text-accent-400 border-accent-400' : 'text-accent-500 border-accent-500'
      }`}>
        {subtitle}
      </span>
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] ${
        light ? 'text-white' : 'text-navy-900'
      }`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;