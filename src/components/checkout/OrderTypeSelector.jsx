import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Store, Check } from 'lucide-react';

export default function OrderTypeSelector({ orderType, setOrderType, deliveryFee }) {
    const options = [
        {
            type: 'delivery',
            icon: Bike,
            title: 'Home Delivery',
            subtitle: `+₹${deliveryFee} delivery charge`,
            gradient: 'from-red-500 to-orange-500'
        },
        {
            type: 'takeaway',
            icon: Store,
            title: 'Takeaway',
            subtitle: 'Pick up from store',
            gradient: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm">Order Type</h3>
            <div className="grid grid-cols-2 gap-3">
                {options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = orderType === option.type;

                    return (
                        <button
                            key={option.type}
                            onClick={() => setOrderType(option.type)}
                            className="relative"
                        >
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-4 rounded-xl border-2 transition-all ${isSelected
                                        ? 'border-red-500 bg-red-500/10'
                                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                                    }`}
                            >
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
                                    >
                                        <Check className="w-4 h-4 text-white" />
                                    </motion.div>
                                )}

                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-3`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h4 className="text-white font-semibold mb-1">{option.title}</h4>
                                <p className="text-xs text-zinc-400">{option.subtitle}</p>
                            </motion.div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
