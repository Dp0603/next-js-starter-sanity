import React from 'react';
import { Globe, Award, Users, Factory, Leaf, ShieldCheck, CircleHelp, PenTool, Truck } from 'lucide-react';

const iconMap: Record<string, any> = {
    Globe,
    Award,
    Users,
    Factory,
    Leaf,
    ShieldCheck,
    PenTool,
    Truck,
};

interface IconMapperProps {
    name: string;
    className?: string;
    size?: number;
}

const IconMapper: React.FC<IconMapperProps> = ({ name, className, size }) => {
    const IconComponent = iconMap[name] || CircleHelp; // Default to '?' if icon not found
    return <IconComponent className={className} size={size} />;
};

export default IconMapper;