import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Lock, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../cart/CartContext';
import { toast } from 'sonner';

export default function PizzaCard({ item, index }) {
    const { addToCart, validateOfferPizza, isOfferTimeValid } = useCart();

    const handleAddToCart = () => {
        const result = addToCart(item);
        if (result.success) {
            toast.success(`${item.name} added to cart!`);
        } else {
            toast.error(result.message);
        }
    };

    const isOfferAvailable = item.isOfferPizza ? isOfferTimeValid() : true;
    const offerValidation = item.isOfferPizza ? validateOfferPizza() : { valid: true };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300"
        >
            {/* Offer Badge */}
            {item.isOfferPizza && (
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        DAILY DEAL
                    </div>
                </div>
            )}

            {/* Veg/Non-Veg Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
            </div>

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-36 h-36 object-contain drop-shadow-2xl"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop';
                        }}
                    />
                </motion.div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{item.description}</p>

                {/* Time Restriction Notice for Offer Pizza */}
                {item.isOfferPizza && !isOfferAvailable && (
                    <div className="flex items-center gap-2 text-amber-400 text-xs mb-3 bg-amber-500/10 p-2 rounded-lg">
                        <Clock className="w-4 h-4" />
                        Available 11 AM - 11 PM only
                    </div>
                )}

                {/* No Customization Notice for Offer Pizza */}
                {item.isOfferPizza && (
                    <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
                        <Lock className="w-3 h-3" />
                        No customizations allowed
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">₹{item.price}</span>
                        {item.originalPrice && (
                            <span className="text-sm text-zinc-500 line-through">₹{item.originalPrice}</span>
                        )}
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        disabled={item.isOfferPizza && (!isOfferAvailable || !offerValidation.valid)}
                        className={`rounded-xl font-semibold transition-all ${item.isOfferPizza
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                                : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                            }`}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
