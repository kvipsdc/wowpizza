import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const positions = [
    { title: 'Delivery Partner', location: 'Multiple Locations', type: 'Full-time' },
    { title: 'Kitchen Staff', location: 'Mumbai, Delhi, Bangalore', type: 'Full-time' },
    { title: 'Store Manager', location: 'Pan India', type: 'Full-time' },
    { title: 'Customer Support', location: 'Remote', type: 'Full-time/Part-time' }
];

function CareerContent() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-black text-white mb-4">Join Our Team</h1>
                        <p className="text-zinc-400 text-lg">Build your career with Wow Pizza</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: Users, title: 'Great Team', desc: 'Work with passionate people' },
                            { icon: TrendingUp, title: 'Growth', desc: 'Clear career progression paths' },
                            { icon: Heart, title: 'Benefits', desc: 'Competitive salary & perks' }
                        ].map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-zinc-400 text-sm">{benefit.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <h2 className="text-white font-bold text-xl mb-6">Open Positions</h2>
                        <div className="space-y-4">
                            {positions.map((position, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:border-zinc-600 transition-colors"
                                >
                                    <div>
                                        <h3 className="text-white font-semibold">{position.title}</h3>
                                        <p className="text-zinc-400 text-sm">{position.location} • {position.type}</p>
                                    </div>
                                    <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                                        Apply
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Career() {
    return (
        <CartProvider>
            <CareerContent />
        </CartProvider>
    );
}
