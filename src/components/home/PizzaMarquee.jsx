import React from 'react';
import { motion } from 'framer-motion';

const pizzaImages = [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=200&h=200&fit=crop',
];

export default function PizzaMarquee() {
    return (
        <section className="py-12 bg-zinc-950 overflow-hidden border-y border-zinc-800">
            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

                {/* Marquee Track */}
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    className="flex gap-8"
                >
                    {[...pizzaImages, ...pizzaImages, ...pizzaImages].map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900"
                        >
                            <img
                                src={src}
                                alt=""
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
