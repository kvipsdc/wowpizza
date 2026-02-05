import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const posts = [
    {
        title: 'The Secret Behind Our ₹39 Pizza Deal',
        excerpt: 'Discover how we bring you premium quality at an unbeatable price...',
        date: 'Feb 1, 2026',
        author: 'Wow Pizza Team',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop'
    },
    {
        title: '5 Pizza Toppings You Must Try This Season',
        excerpt: 'From classic pepperoni to exotic paneer tikka, explore flavors...',
        date: 'Jan 28, 2026',
        author: 'Chef Rahul',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop'
    },
    {
        title: 'Behind the Scenes: A Day at Wow Pizza Kitchen',
        excerpt: 'Join us on a virtual tour of our state-of-the-art kitchen...',
        date: 'Jan 25, 2026',
        author: 'Operations Team',
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=400&fit=crop'
    }
];

function BlogContent() {
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
                        <h1 className="text-4xl font-black text-white mb-4">Global Blog</h1>
                        <p className="text-zinc-400 text-lg">Stories, tips, and news from Wow Pizza</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all group cursor-pointer"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                                </div>

                                <div className="p-6">
                                    <h2 className="text-white font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-zinc-400 text-sm mb-4">{post.excerpt}</p>

                                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {post.author}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Blog() {
    return (
        <CartProvider>
            <BlogContent />
        </CartProvider>
    );
}
