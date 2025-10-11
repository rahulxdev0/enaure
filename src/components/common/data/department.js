import { Gem, Leaf, Zap } from "lucide-react";

export const departments = [
    { 
      name: 'Jewellery', 
      path: '/jewellery', 
      icon: Gem,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-600'
    },
    { 
      name: 'Organic', 
      path: '/organic', 
      icon: Leaf,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-600'
    },
    { 
      name: 'Green Energy', 
      path: '/green-energy', 
      icon: Zap,
      color: 'from-lime-500 to-green-600',
      bgColor: 'bg-lime-50',
      textColor: 'text-lime-600',
      borderColor: 'border-lime-600'
    },
  ];