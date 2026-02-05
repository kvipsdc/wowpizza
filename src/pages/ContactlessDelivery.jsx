import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock, Package } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const steps = [
    { icon: Package, title: 'Sealed Packaging', desc: 'All orders are sealed and sanitized' },
    { icon: Shield, title: 'Zero Contact', desc: 'Our delivery partner maintains safe distance' },
    { icon: CheckCircle, title: 'Safety First', desc: 'Regular health checks for all staff' },
    { icon: Clock, title: 'Quick Delivery', desc: 'Hot and fresh in under 30 minutes' }
];

function ContactlessDeliveryContent() {
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
                        <h1 className="text-4xl font-black text-white mb-4">Contactless Delivery</h1>
                        <p className="text-zinc-400 text-lg">Your safety is our priority</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{step.title}</h3>
                                    <p className="text-zinc-400 text-sm">{step.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function ContactlessDelivery() {
    return (
        <CartProvider>
            <ContactlessDeliveryContent />
        </CartProvider>
    );
}
