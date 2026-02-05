import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Heart, Users, Award } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function AboutUsContent() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About Wow Pizza</h1>
                        <p className="text-zinc-400 text-lg">Crafting happiness, one slice at a time</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-8"
                    >
                        <p className="text-zinc-300 leading-relaxed mb-6">
                            Welcome to <strong className="text-white">Wow Pizza</strong> – where passion meets perfection!
                            Since our inception, we've been committed to serving the freshest, most delicious pizzas
                            that make every meal memorable.
                        </p>
                        <p className="text-zinc-300 leading-relaxed">
                            Our secret? Premium ingredients, time-tested recipes, and a team that treats every
                            pizza like a work of art. Whether it's our legendary ₹39 special or gourmet creations,
                            we ensure quality in every bite.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {[
                            { icon: Pizza, title: 'Fresh Ingredients', desc: '100% authentic, locally sourced' },
                            { icon: Heart, title: 'Made with Love', desc: 'Every pizza crafted with care' },
                            { icon: Users, title: '10K+ Happy Customers', desc: 'Trusted across India' },
                            { icon: Award, title: 'Award Winning', desc: 'Best Pizza Chain 2025' }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm">{item.desc}</p>
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

export default function AboutUs() {
    return (
        <CartProvider>
            <AboutUsContent />
        </CartProvider>
    );
}
