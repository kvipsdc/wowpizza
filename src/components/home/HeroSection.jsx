import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const floatingPizzas = [
    { x: '10%', y: '20%', delay: 0, size: 80, rotation: -15 },
    { x: '80%', y: '15%', delay: 0.5, size: 100, rotation: 20 },
    { x: '70%', y: '60%', delay: 1, size: 60, rotation: -10 },
    { x: '15%', y: '70%', delay: 1.5, size: 70, rotation: 25 },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            {/* Floating Pizzas */}
            {floatingPizzas.map((pizza, index) => (
                <motion.div
                    key={index}
                    className="absolute pointer-events-none"
                    style={{ left: pizza.x, top: pizza.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        y: [0, -20, 0],
                        rotate: [pizza.rotation, pizza.rotation + 10, pizza.rotation]
                    }}
                    transition={{
                        delay: pizza.delay,
                        duration: 4,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop"
                        alt=""
                        style={{ width: pizza.size, height: pizza.size }}
                        className="rounded-full object-cover opacity-60"
                    />
                </motion.div>
            ))}

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-4 py-2 rounded-full mb-8"
                >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">New: ₹39 Pizza Special!</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
                >
                    Hot & Fresh
                    <br />
                    <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                        Pizza Magic
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto"
                >
                    Handcrafted with love, delivered with speed.
                    Experience pizza perfection at your doorstep.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to={createPageUrl('Menu')}>
                        <Button
                            size="lg"
                            className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl shadow-lg shadow-red-500/25"
                        >
                            Order Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                    <Link to={createPageUrl('Menu')}>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-lg font-bold border-zinc-700 text-white hover:bg-zinc-800 rounded-2xl"
                        >
                            View Menu
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center gap-8 mt-16"
                >
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-2xl font-bold">30</span>
                        </div>
                        <span className="text-xs text-zinc-500">Min Delivery</span>
                    </div>
                    <div className="w-px h-12 bg-zinc-800" />
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                            <Zap className="w-4 h-4" />
                            <span className="text-2xl font-bold">₹39</span>
                        </div>
                        <span className="text-xs text-zinc-500">Starting Price</span>
                    </div>
                    <div className="w-px h-12 bg-zinc-800" />
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-2xl font-bold">₹200</span>
                        </div>
                        <span className="text-xs text-zinc-500">Off First Order</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-zinc-500 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
