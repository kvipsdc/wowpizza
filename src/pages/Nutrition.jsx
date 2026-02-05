import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Info } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function NutritionContent() {
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
                        <h1 className="text-4xl font-black text-white mb-4">Nutrition Information</h1>
                        <p className="text-zinc-400 text-lg">Making informed choices for a healthier you</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-8"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-xl mb-2">Our Commitment to Quality</h2>
                                <p className="text-zinc-400">
                                    We use only the finest ingredients and provide detailed nutritional information
                                    for all our menu items. Look for the veg/non-veg indicators on each product.
                                </p>
                            </div>
                        </div>

                        <div className="bg-zinc-800/50 rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-4">Key Points</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-zinc-300 text-sm">
                                    <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>All nutritional values are calculated per serving</span>
                                </li>
                                <li className="flex items-start gap-3 text-zinc-300 text-sm">
                                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <span>Allergen information available on request</span>
                                </li>
                                <li className="flex items-start gap-3 text-zinc-300 text-sm">
                                    <Leaf className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Clearly marked vegetarian and non-vegetarian options</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Nutrition() {
    return (
        <CartProvider>
            <NutritionContent />
        </CartProvider>
    );
}
