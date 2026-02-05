import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const benefits = [
    { icon: Store, title: 'Proven Brand', desc: 'Join a trusted name in pizza industry' },
    { icon: TrendingUp, title: 'High ROI', desc: 'Profitable business model' },
    { icon: Users, title: 'Full Support', desc: 'Training & operational guidance' },
    { icon: Award, title: 'Marketing', desc: 'National marketing campaigns' }
];

function FranchiseContent() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Application submitted! Our team will contact you soon.');
        setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    };

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
                        <h1 className="text-4xl font-black text-white mb-4">Franchise Opportunities</h1>
                        <p className="text-zinc-400 text-lg">Partner with Wow Pizza and grow together</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-zinc-400 text-sm">{benefit.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
                    >
                        <h2 className="text-white font-bold text-2xl mb-6">Apply for Franchise</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-zinc-300">Full Name *</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                    />
                                </div>
                                <div>
                                    <Label className="text-zinc-300">Email *</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-zinc-300">Phone *</Label>
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                    />
                                </div>
                                <div>
                                    <Label className="text-zinc-300">City *</Label>
                                    <Input
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                        className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-zinc-300">Tell us about yourself</Label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Business experience, investment capacity, etc."
                                    className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                    rows={4}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold"
                            >
                                Submit Application
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Franchise() {
    return (
        <CartProvider>
            <FranchiseContent />
        </CartProvider>
    );
}
