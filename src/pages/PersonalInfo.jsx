import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { base44 } from '@/api/base44Client';

function PersonalInfoContent() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ full_name: '', phone: '' });

    useEffect(() => {
        base44.auth.me().then(userData => {
            setUser(userData);
            setFormData({
                full_name: userData.full_name || '',
                phone: userData.phone || ''
            });
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await base44.auth.updateMe({ full_name: formData.full_name, phone: formData.phone });
            toast.success('Personal information updated successfully!');
        } catch (error) {
            toast.error('Failed to update information');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-zinc-700 border-t-red-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-black text-white mb-2">Personal Information</h1>
                        <p className="text-zinc-400">Manage your account details</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label className="text-zinc-300 flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </Label>
                                <Input
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <Label className="text-zinc-300 flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </Label>
                                <Input
                                    value={user.email}
                                    disabled
                                    className="bg-zinc-800 border-zinc-700 text-zinc-500"
                                />
                                <p className="text-zinc-600 text-xs mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <Label className="text-zinc-300 flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </Label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="Enter your phone number"
                                    type="tel"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
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

export default function PersonalInfo() {
    return (
        <CartProvider>
            <PersonalInfoContent />
        </CartProvider>
    );
}
