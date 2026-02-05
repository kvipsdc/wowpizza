import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function DisclosureContent() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl font-black text-white mb-4">Responsible Disclosure</h1>
                        <p className="text-zinc-400 text-lg">Security vulnerability reporting</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 space-y-6"
                    >
                        <p className="text-zinc-300 leading-relaxed">
                            At Wow Pizza, we take security seriously. If you believe you've found a security vulnerability
                            in our systems, we encourage you to report it to us responsibly.
                        </p>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Reporting a Vulnerability</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Please email security@wowpizza.in with details of the vulnerability.
                                Include steps to reproduce, potential impact, and any proof-of-concept code if applicable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Our Commitment</h2>
                            <ul className="space-y-2 text-zinc-400">
                                <li>• We will acknowledge your report within 48 hours</li>
                                <li>• We will investigate and keep you updated on progress</li>
                                <li>• We will credit you for responsible disclosure (if you wish)</li>
                                <li>• We will not take legal action against good-faith security research</li>
                            </ul>
                        </section>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Disclosure() {
    return (
        <CartProvider>
            <DisclosureContent />
        </CartProvider>
    );
}
