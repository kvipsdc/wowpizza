import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Drumstick, GlassWater, Cake } from 'lucide-react';

const tabs = [
    { id: 'pizza', label: 'Pizzas', icon: Pizza },
    { id: 'sides', label: 'Sides', icon: Drumstick },
    { id: 'drinks', label: 'Drinks', icon: GlassWater },
    { id: 'desserts', label: 'Desserts', icon: Cake },
];

export default function MenuTabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${isActive
                                ? 'text-white'
                                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/50'
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
