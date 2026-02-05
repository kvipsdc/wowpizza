import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    preparing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    ready: 'bg-green-500/20 text-green-400 border-green-500/30',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const statusIcons = {
    pending: Clock,
    confirmed: CheckCircle,
    preparing: Package,
    ready: CheckCircle,
    delivered: CheckCircle,
    cancelled: XCircle
};

function OrdersHistoryContent() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () => base44.entities.Order.filter({ created_by: user?.email }, '-created_date'),
        enabled: !!user,
        initialData: []
    });

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
                        <h1 className="text-3xl font-black text-white mb-2">Orders History</h1>
                        <p className="text-zinc-400">Track your past orders</p>
                    </motion.div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-zinc-700 border-t-red-500 rounded-full animate-spin" />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-zinc-900 rounded-2xl p-12 border border-zinc-800 text-center">
                            <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">No orders yet</h3>
                            <p className="text-zinc-400">Your order history will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order, index) => {
                                const StatusIcon = statusIcons[order.status] || Package;
                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 hover:border-zinc-700 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-white font-bold">Order #{order.id.slice(-8)}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
                                                        <StatusIcon className="w-3 h-3 inline mr-1" />
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-500 text-sm">
                                                    {new Date(order.created_date).toLocaleDateString('en-IN', {
                                                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold text-xl">₹{order.total}</p>
                                                <p className="text-zinc-500 text-sm capitalize">{order.order_type}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-zinc-800 pt-4">
                                            <p className="text-zinc-400 text-sm mb-2">Items:</p>
                                            <div className="space-y-1">
                                                {order.items?.slice(0, 3).map((item, idx) => (
                                                    <p key={idx} className="text-zinc-300 text-sm">
                                                        {item.quantity}x {item.name}
                                                    </p>
                                                ))}
                                                {order.items?.length > 3 && (
                                                    <p className="text-zinc-500 text-xs">+{order.items.length - 3} more items</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function OrdersHistory() {
    return (
        <CartProvider>
            <OrdersHistoryContent />
        </CartProvider>
    );
}
