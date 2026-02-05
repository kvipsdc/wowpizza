import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function PaymentCardsContent() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-black text-white mb-2">Saved Payment Cards</h1>
                        <p className="text-zinc-400">Manage your payment methods</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-12 border border-zinc-800 text-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                            <CreditCard className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-white font-semibold text-xl mb-3">No Saved Cards</h3>
                        <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                            Save your cards during checkout for faster payments in the future.
                            All card details are encrypted and secure.
                        </p>
                        <p className="text-zinc-600 text-sm">
                            This feature will be available when you make your first payment
                        </p>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function PaymentCards() {
    return (
        <CartProvider>
            <PaymentCardsContent />
        </CartProvider>
    );
}
