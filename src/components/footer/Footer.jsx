import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Facebook, Instagram, Youtube, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
    const footerSections = [
        {
            title: 'Order Now',
            links: [
                { label: 'Deals', path: 'Deals' },
                { label: 'Pizza', path: 'Menu?category=pizza' },
                { label: 'Sides', path: 'Menu?category=sides' },
                { label: 'Drinks', path: 'Menu?category=drinks' },
                { label: 'Desserts', path: 'Menu?category=desserts' }
            ]
        },
        {
            title: 'About',
            links: [
                { label: 'About Us', path: 'AboutUs' },
                { label: 'Contactless Delivery', path: 'ContactlessDelivery' },
                { label: 'Nutrition', path: 'Nutrition' },
                { label: 'Career', path: 'Career' }
            ]
        },
        {
            title: 'Our Policies',
            links: [
                { label: 'Privacy', path: 'Privacy' },
                { label: 'Terms & Conditions', path: 'Terms' },
                { label: 'Responsible Disclosure', path: 'Disclosure' },
                { label: 'FAQs & Help', path: 'FAQ' }
            ]
        },
        {
            title: 'Visit Wow Pizza',
            links: [
                { label: 'Locate a Store', path: 'StoreLocator' },
                { label: 'Global Blog', path: 'Blog' },
                { label: 'Franchise / Work with Us', path: 'Franchise' }
            ]
        }
    ];

    return (
        <footer className="bg-zinc-950 border-t border-zinc-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-bold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={createPageUrl(link.path)}
                                            className="text-zinc-400 hover:text-white text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Help Section */}
                <div className="border-t border-zinc-800 pt-8 mb-8">
                    <h3 className="text-white font-bold mb-4">Help us in serving you better</h3>

                    {/* Social Media */}
                    <div className="mb-6">
                        <p className="text-zinc-400 text-sm mb-3">Follow us</p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                            >
                                <Facebook className="w-5 h-5 text-zinc-400" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-zinc-400" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                            >
                                <Youtube className="w-5 h-5 text-zinc-400" />
                            </a>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                            >
                                <MapPin className="w-5 h-5 text-zinc-400" />
                            </a>
                        </div>
                    </div>

                    {/* Feedback */}
                    <Link
                        to={createPageUrl('Feedback')}
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Give Feedback
                    </Link>
                </div>

                {/* Description */}
                <div className="border-t border-zinc-800 pt-8">
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
                        Order a delicious pizza on the go, anywhere, anytime. Wow Pizza is happy to assist you with your home delivery.
                        Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. *T&C Apply.
                        <br />
                        <strong className="text-white">Hurry up and place your order now!</strong>
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-zinc-500 text-sm">
                        © 2026 Wow Pizza India. All rights reserved. License Number: 10017***04220
                    </p>
                </div>
            </div>
        </footer>
    );
}
