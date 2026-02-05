import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 'pizza',
        title: 'Pizzas',
        description: 'Classic to gourmet, we have it all',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
        count: '15+ Options',
        gradient: 'from-red-500 to-orange-500'
    },
    {
        id: 'sides',
        title: 'Sides',
        description: 'Perfect companions for your pizza',
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop',
        count: '10+ Options',
        gradient: 'from-amber-500 to-yellow-500'
    },
    {
        id: 'drinks',
        title: 'Beverages',
        description: 'Refresh your taste buds',
        image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop',
        count: '8+ Options',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'desserts',
        title: 'Desserts',
        description: 'Sweet endings for every meal',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        count: '6+ Options',
        gradient: 'from-pink-500 to-rose-500'
    }
];

export default function CategorySection() {
    return (
        <section className="py-20 px-4 bg-zinc-950">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Explore Our Menu
                    </h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">
                        From classic favorites to innovative creations, discover flavors that'll make you say "Wow!"
                    </p>
                </motion.div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`${createPageUrl('Menu')}?category=${category.id}`}>
                                <div className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer">
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <span className="text-xs font-medium text-white/80 mb-1">{category.count}</span>
                                        <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                                        <p className="text-sm text-white/70 mb-4">{category.description}</p>

                                        <div className="flex items-center gap-2 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>Explore</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
