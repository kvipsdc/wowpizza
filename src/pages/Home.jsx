import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import OfferBanner from '@/components/home/OfferBanner';
import PizzaMarquee from '@/components/home/PizzaMarquee';
import { CartProvider } from '@/components/cart/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import Header from '@/components/layout/Header';

export default function Home() {
    return (
        <CartProvider>
            <div className="min-h-screen bg-zinc-950">
                <Header />
                <main className="pt-16">
                    <HeroSection />
                    <PizzaMarquee />
                    <OfferBanner />
                    <CategorySection />

                    {/* Footer */}
                    <footer className="py-12 px-4 bg-zinc-950 border-t border-zinc-800">
                        <div className="max-w-6xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">
                                    🍕
                                </div>
                                <span className="text-xl font-black text-white">
                                    Wow<span className="text-red-500">Pizza</span>
                                </span>
                            </div>
                            <p className="text-zinc-500 text-sm mb-4">
                                Hot & Fresh Pizza, Delivered to Your Doorstep
                            </p>
                            <p className="text-zinc-600 text-xs">
                                © 2024 Wow Pizza. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </main>
                <CartDrawer />
            </div>
        </CartProvider>
    );
}
