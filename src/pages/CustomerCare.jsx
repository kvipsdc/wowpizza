import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const contactMethods = [
    {
        icon: Phone,
        title: 'Call Us',
        info: '1800-123-4567',
        description: 'Mon-Sun, 9:00 AM - 11:00 PM',
        action: 'tel:18001234567',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        icon: Mail,
        title: 'Email Us',
        info: 'support@wowpizza.in',
        description: 'We respond within 24 hours',
        action: 'mailto:support@wowpizza.in',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: MessageCircle,
        title: 'Live Chat',
        info: 'Chat with us now',
        description: 'Average response time: 2 mins',
        action: '#',
        gradient: 'from-purple-500 to-pink-500'
    }
];

function CustomerCareContent() {
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
                        <h1 className="text-4xl font-black text-white mb-4">Customer Care</h1>
                        <p className="text-zinc-400 text-lg">We're here to help you 24/7</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 text-center"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mx-auto mb-4`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{method.title}</h3>
                                    <p className="text-zinc-300 font-semibold mb-1">{method.info}</p>
                                    <p className="text-zinc-500 text-sm mb-4">{method.description}</p>
                                    <a href={method.action}>
                                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl">
                                            Contact
                                        </Button>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-xl mb-3">Operating Hours</h2>
                                <div className="space-y-2 text-zinc-300">
                                    <p>Monday - Sunday: 9:00 AM - 11:00 PM</p>
                                    <p className="text-zinc-500 text-sm">Our support team is available to assist you during these hours</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function CustomerCare() {
    return (
        <CartProvider>
            <CustomerCareContent />
        </CartProvider>
    );
}
