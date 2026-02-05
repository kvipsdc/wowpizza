import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function TermsContent() {
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
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white">Terms & Conditions</h1>
                                <p className="text-zinc-400">Effective from February 2026</p>
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
                            <h2 className="text-white font-bold text-xl mb-3">Ordering & Payment</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                All orders are subject to availability and confirmation of the order price.
                                Prices are subject to change without notice. Payment must be made at the time of ordering.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Special Offers</h2>
                            <p className="text-zinc-400 leading-relaxed mb-3">
                                The ₹39 Pizza offer is limited to one per customer per device per day, valid between 11:00 AM - 11:00 PM only.
                                No customizations allowed on this special offer item.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                Discount codes cannot be combined with other offers unless explicitly stated.
                                Bulk order discounts (20% off on orders above ₹2000) override individual promo codes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Delivery Policy</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We strive to deliver within 30 minutes of order confirmation. Delivery times may vary based on
                                location and traffic conditions. Delivery charges apply as per the area.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-xl mb-3">Cancellation & Refunds</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Orders can be cancelled within 2 minutes of placement. Refunds are processed within 5-7 business days.
                                For any issues with your order, please contact our customer support immediately.
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

export default function Terms() {
    return (
        <CartProvider>
            <TermsContent />
        </CartProvider>
    );
}
