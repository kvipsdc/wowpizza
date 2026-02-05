import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function PrivacyContent() {
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
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
                                <p className="text-zinc-400">Last updated: February 2026</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 space-y-6"
                    >
                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Information We Collect</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We collect information you provide when placing orders, including name, phone number,
                                delivery address, and payment details. We also collect device information for fraud prevention
                                and to enable our special offer limitations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">How We Use Your Information</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Your information is used to process orders, improve our services, send order updates,
                                and occasionally share promotional offers. We never sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Data Security</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We implement industry-standard security measures to protect your personal information.
                                All payment transactions are encrypted and processed through secure gateways.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Your Rights</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                You have the right to access, correct, or delete your personal information at any time.
                                Contact our support team for assistance with data-related requests.
                            </p>
                        </section>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Privacy() {
    return (
        <CartProvider>
            <PrivacyContent />
        </CartProvider>
    );
}
