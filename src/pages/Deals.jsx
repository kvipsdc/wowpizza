import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Gift, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const deals = [
    {
        title: '₹39 Pizza Special',
        description: 'Get our classic Margherita pizza at just ₹39',
        discount: 'Limited Offer',
        conditions: ['1 per customer per day', 'Valid 11 AM - 11 PM', 'No customizations'],
        icon: Sparkles,
        gradient: 'from-red-500 to-orange-500'
    },
    {
        title: 'First Order Bonus',
        description: 'New to Wow Pizza? Get ₹200 off on your first order!',
        discount: '₹200 OFF',
        conditions: ['Use code: FIRSTWOW', 'For new customers only'],
        icon: Gift,
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Bulk Order Discount',
        description: 'Planning a party? Get flat 20% off on orders above ₹2000',
        discount: '20% OFF',
        conditions: ['Minimum order: ₹2000', 'All menu items included'],
        icon: Percent,
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        title: 'Loyalty Rewards',
        description: 'Keep ordering and keep saving!',
        discount: 'Up to ₹200',
        conditions: ['2nd order: ₹150 off', '3rd order: ₹100 off'],
        icon: Clock,
        gradient: 'from-blue-500 to-cyan-500'
    }
];

function DealsContent() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Amazing Deals & Offers
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Save more when you order from Wow Pizza
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {deals.map((deal, index) => {
                            const Icon = deal.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative bg-zinc-900 rounded-2xl p-6 border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent rounded-full blur-2xl" />

                                    <div className="relative">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${deal.gradient} flex items-center justify-center mb-4`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">{deal.title}</h3>
                                                <p className="text-zinc-400 text-sm">{deal.description}</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${deal.gradient} text-white text-xs font-bold whitespace-nowrap`}>
                                                {deal.discount}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            {deal.conditions.map((condition, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-zinc-500 text-sm">
                                                    <div className="w-1 h-1 rounded-full bg-zinc-600" />
                                                    {condition}
                                                </div>
                                            ))}
                                        </div>

                                        <Link to={createPageUrl('Menu')}>
                                            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl">
                                                Order Now
                                            </Button>
                                        </Link>
                                    </div>
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

export default function Deals() {
    return (
        <CartProvider>
            <DealsContent />
        </CartProvider>
    );
}
