import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { base44 } from '@/api/base44Client';

function AddressBookContent() {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        label: 'home',
        street: '',
        city: '',
        pincode: '',
        landmark: ''
    });

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const user = await base44.auth.me();
            setAddresses(user.saved_addresses || []);
        } catch (error) {
            console.error('Failed to load addresses');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await base44.auth.me();
            const updatedAddresses = editingAddress
                ? addresses.map(addr => addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr)
                : [...addresses, { ...formData, id: Date.now() }];

            await base44.auth.updateMe({ saved_addresses: updatedAddresses });
            setAddresses(updatedAddresses);
            toast.success(editingAddress ? 'Address updated!' : 'Address added!');
            setShowForm(false);
            setEditingAddress(null);
            setFormData({ label: 'home', street: '', city: '', pincode: '', landmark: '' });
        } catch (error) {
            toast.error('Failed to save address');
        }
    };

    const handleDelete = async (addressId) => {
        try {
            const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
            await base44.auth.updateMe({ saved_addresses: updatedAddresses });
            setAddresses(updatedAddresses);
            toast.success('Address deleted');
        } catch (error) {
            toast.error('Failed to delete address');
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setFormData(address);
        setShowForm(true);
    };

    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-black text-white mb-2">Address Book</h1>
                            <p className="text-zinc-400">Manage your delivery addresses</p>
                        </div>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Address
                        </Button>
                    </motion.div>

                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-6"
                            >
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, label: 'home' })}
                                            className={`flex-1 p-3 rounded-xl border transition-all ${formData.label === 'home'
                                                    ? 'border-red-500 bg-red-500/10'
                                                    : 'border-zinc-700 bg-zinc-800'
                                                }`}
                                        >
                                            <Home className="w-5 h-5 mx-auto mb-1 text-white" />
                                            <span className="text-white text-sm">Home</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, label: 'work' })}
                                            className={`flex-1 p-3 rounded-xl border transition-all ${formData.label === 'work'
                                                    ? 'border-red-500 bg-red-500/10'
                                                    : 'border-zinc-700 bg-zinc-800'
                                                }`}
                                        >
                                            <Briefcase className="w-5 h-5 mx-auto mb-1 text-white" />
                                            <span className="text-white text-sm">Work</span>
                                        </button>
                                    </div>

                                    <div>
                                        <Label className="text-zinc-300">Street Address *</Label>
                                        <Input
                                            value={formData.street}
                                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                            required
                                            className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            placeholder="House/Flat No, Street"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-zinc-300">City *</Label>
                                            <Input
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                required
                                                className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-zinc-300">Pincode *</Label>
                                            <Input
                                                value={formData.pincode}
                                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                required
                                                maxLength={6}
                                                className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-zinc-300">Landmark</Label>
                                        <Input
                                            value={formData.landmark}
                                            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            placeholder="e.g., Near Mall"
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="submit" className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl">
                                            {editingAddress ? 'Update' : 'Save'} Address
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditingAddress(null);
                                                setFormData({ label: 'home', street: '', city: '', pincode: '', landmark: '' });
                                            }}
                                            className="border-zinc-700 text-white hover:bg-zinc-800 rounded-xl"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {addresses.length === 0 ? (
                        <div className="bg-zinc-900 rounded-2xl p-12 border border-zinc-800 text-center">
                            <MapPin className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">No saved addresses</h3>
                            <p className="text-zinc-400">Add an address to make ordering faster</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((address, index) => (
                                <motion.div
                                    key={address.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            {address.label === 'home' ? (
                                                <Home className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <Briefcase className="w-5 h-5 text-blue-500" />
                                            )}
                                            <span className="text-white font-semibold capitalize">{address.label}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(address)}
                                                className="text-zinc-400 hover:text-white transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(address.id)}
                                                className="text-zinc-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {address.street}<br />
                                        {address.landmark && `${address.landmark}, `}
                                        {address.city} - {address.pincode}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function AddressBook() {
    return (
        <CartProvider>
            <AddressBookContent />
        </CartProvider>
    );
}
