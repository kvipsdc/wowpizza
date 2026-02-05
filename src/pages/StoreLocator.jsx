import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const stores = [
    {
        name: 'Wow Pizza - Andheri',
        address: 'Shop 12, Link Road, Andheri West, Mumbai - 400053',
        phone: '+91 98765 43210',
        hours: '11:00 AM - 11:00 PM'
    },
    {
        name: 'Wow Pizza - Bandra',
        address: 'Unit 5, Linking Road, Bandra West, Mumbai - 400050',
        phone: '+91 98765 43211',
        hours: '11:00 AM - 11:00 PM'
    },
    {
        name: 'Wow Pizza - Powai',
        address: 'Ground Floor, Hiranandani Gardens, Powai, Mumbai - 400076',
        phone: '+91 98765 43212',
        hours: '11:00 AM - 11:00 PM'
    },
    {
        name: 'Wow Pizza - Thane',
        address: 'Shop 8, Viviana Mall, Thane West, Thane - 400601',
        phone: '+91 98765 43213',
        hours: '11:00 AM - 11:00 PM'
    }
];

function StoreLocatorContent() {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-black text-white mb-4">Find a Store Near You</h1>
                        <p className="text-zinc-400 text-lg">Visit us for takeaway or dine-in</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stores.map((store, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
                            >
                                <h3 className="text-white font-bold text-xl mb-4">{store.name}</h3>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-zinc-400 text-sm">{store.address}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <a href={`tel:${store.phone}`} className="text-zinc-400 text-sm hover:text-white transition-colors">
                                            {store.phone}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                        <p className="text-zinc-400 text-sm">{store.hours}</p>
                                    </div>
                                </div>

                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block mt-6 text-center py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors"
                                >
                                    Get Directions
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function StoreLocator() {
    return (
        <CartProvider>
            <StoreLocatorContent />
        </CartProvider>
    );
}
