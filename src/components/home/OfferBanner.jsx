import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '../cart/CartContext';

export default function OfferBanner() {
    const { isOfferTimeValid } = useCart();
    const isAvailable = isOfferTimeValid();

    return (
        <section className="py-16 px-4 bg-zinc-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
            >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-1">
                    <div className="relative bg-zinc-950 rounded-[22px] p-8 md:p-12 overflow-hidden">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-500/20 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-3xl" />

                        <div className="relative flex flex-col lg:flex-row items-center gap-8">
                            {/* Left Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full mb-6">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span className="text-amber-400 text-sm font-bold">LIMITED TIME OFFER</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    Get Your Pizza
                                    <br />
                                    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                        @ Just ₹39!
                                    </span>
                                </h2>

                                <p className="text-zinc-400 text-lg mb-6 max-w-md">
                                    Grab our classic Margherita at an unbelievable price.
                                    Limited to one per customer, per day.
                                </p>

                                {/* Rules */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-amber-400" />
                                        </div>
                                        <span>11 AM - 11 PM</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-amber-400" />
                                        </div>
                                        <span>1 per device/day</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-amber-400" />
                                        </div>
                                        <span>No customizations</span>
                                    </div>
                                </div>

                                <Link to={createPageUrl('Menu')}>
                                    <Button
                                        size="lg"
                                        disabled={!isAvailable}
                                        className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl disabled:opacity-50"
                                    >
                                        {isAvailable ? 'Claim Now' : 'Available 11 AM - 11 PM'}
                                    </Button>
                                </Link>
                            </div>

                            {/* Right - Pizza Image */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="relative"
                            >
                                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-30" />
                                    <img
                                        src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop"
                                        alt="₹39 Pizza"
                                        className="relative w-full h-full object-cover rounded-full shadow-2xl"
                                    />

                                    {/* Price Badge */}
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                        <div className="text-center">
                                            <span className="text-white text-2xl font-black">₹39</span>
                                            <p className="text-white/80 text-xs">Only</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
