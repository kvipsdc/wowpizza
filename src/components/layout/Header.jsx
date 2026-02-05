import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Sparkles, User, ChevronDown, Package, CreditCard, MapPin, Info, History, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '../cart/CartContext';
import { base44 } from '@/api/base44Client';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { cart, setIsCartOpen, orderCount } = useCart();
    const location = useLocation();

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: 'Home' },
        { name: 'Menu', path: 'Menu' },
    ];

    const accountSections = [
        {
            title: 'Orders & Credits',
            icon: Package,
            links: [
                { label: 'Orders History', path: 'OrdersHistory', icon: History },
                { label: 'Customer Care', path: 'CustomerCare', icon: HelpCircle }
            ]
        },
        {
            title: 'Profile',
            icon: User,
            links: [
                { label: 'Personal Information', path: 'PersonalInfo', icon: Info },
                { label: 'Address Book', path: 'AddressBook', icon: MapPin },
                { label: 'Saved Payment Cards', path: 'PaymentCards', icon: CreditCard }
            ]
        }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
            {/* Promo Bar */}
            {orderCount === 0 && (
                <div className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4">
                    <div className="flex items-center justify-center gap-2 text-white text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>New user? Get ₹200 OFF! Use code: <strong>FIRSTWOW</strong></span>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={createPageUrl('Home')}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">
                                🍕
                            </div>
                            <span className="text-xl font-black text-white">
                                Wow<span className="text-red-500">Pizza</span>
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={createPageUrl(link.path)}
                                className={`text-sm font-medium transition-colors ${location.pathname.includes(link.path.toLowerCase())
                                        ? 'text-white'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* My Account Dropdown */}
                        {user && (
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                    className="flex items-center gap-2 px-4 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                >
                                    <User className="w-4 h-4 text-white" />
                                    <span className="text-white text-sm font-medium">My Account</span>
                                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {accountMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setAccountMenuOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 top-12 w-64 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden z-50"
                                            >
                                                <div className="p-3 border-b border-zinc-800">
                                                    <p className="text-white font-semibold text-sm">{user.full_name || user.email}</p>
                                                    <p className="text-zinc-500 text-xs">{user.email}</p>
                                                </div>

                                                {accountSections.map((section, idx) => (
                                                    <div key={idx} className="p-2">
                                                        <div className="flex items-center gap-2 px-3 py-2 text-zinc-500 text-xs font-semibold uppercase">
                                                            <section.icon className="w-3 h-3" />
                                                            {section.title}
                                                        </div>
                                                        {section.links.map((link) => {
                                                            const Icon = link.icon;
                                                            return (
                                                                <Link
                                                                    key={link.path}
                                                                    to={createPageUrl(link.path)}
                                                                    onClick={() => setAccountMenuOpen(false)}
                                                                    className="flex items-center gap-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                                                                >
                                                                    <Icon className="w-4 h-4 text-zinc-500" />
                                                                    <span className="text-sm">{link.label}</span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                ))}

                                                <div className="p-2 border-t border-zinc-800">
                                                    <button
                                                        onClick={() => {
                                                            base44.auth.logout();
                                                            setAccountMenuOpen(false);
                                                        }}
                                                        className="w-full px-3 py-2 text-left text-red-400 hover:bg-zinc-800 rounded-lg transition-colors text-sm"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Cart Button */}
                        <Button
                            onClick={() => setIsCartOpen(true)}
                            variant="ghost"
                            className="relative h-10 w-10 rounded-xl bg-zinc-800 hover:bg-zinc-700"
                        >
                            <ShoppingCart className="w-5 h-5 text-white" />
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            className="md:hidden h-10 w-10 rounded-xl bg-zinc-800 hover:bg-zinc-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-white" />
                            ) : (
                                <Menu className="w-5 h-5 text-white" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden py-4 border-t border-zinc-800"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={createPageUrl(link.path)}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname.includes(link.path.toLowerCase())
                                            ? 'bg-zinc-800 text-white'
                                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </div>
        </header>
    );
}
