import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Tag, Sparkles, Bike, MapPin } from 'lucide-react';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import OrderTypeSelector from '../checkout/OrderTypeSelector';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CartDrawer() {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        checkout,
        applyPromoCode,
        appliedPromo,
        orderCount,
        orderType,
        setOrderType,
        deliveryLocation
    } = useCart();

    const [promoInput, setPromoInput] = useState('');
    const { subtotal, discount, discountType, deliveryFee, total } = calculateTotal();

    const handleApplyPromo = () => {
        const result = applyPromoCode(promoInput);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
        setPromoInput('');
    };

    const handleQuantityChange = (cartId, newQty) => {
        const result = updateQuantity(cartId, newQty);
        if (result && !result.success) {
            toast.error(result.message);
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }
        if (orderType === 'delivery' && !deliveryLocation) {
            toast.error('Please set your delivery location first!');
            return;
        }
        checkout();
        toast.success(`Order placed successfully! ${orderType === 'delivery' ? 'Delivery in 30 mins' : 'Ready for pickup in 20 mins'} 🍕`);
        setIsCartOpen(false);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900 z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                                    <p className="text-sm text-zinc-400">{cart.length} items</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>

                        {/* Discount Banner */}
                        {orderCount < 3 && (
                            <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {orderCount === 0 && "New here? Get ₹200 OFF your first order!"}
                                        {orderCount === 1 && "2nd order bonus: ₹150 OFF applied!"}
                                        {orderCount === 2 && "3rd order bonus: ₹100 OFF applied!"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-12 h-12 text-zinc-600" />
                                    </div>
                                    <p className="text-zinc-400 text-lg">Your cart is empty</p>
                                    <p className="text-zinc-500 text-sm mt-1">Add some delicious pizzas!</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        key={item.cartId}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl">
                                                🍕
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                                        {item.isOfferPizza && (
                                                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                                                                Special Offer
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.cartId)}
                                                        className="text-zinc-500 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-2 bg-zinc-900 rounded-lg p-1">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                                                            className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                                                            disabled={item.isOfferPizza}
                                                        >
                                                            <Minus className="w-3 h-3 text-zinc-400" />
                                                        </button>
                                                        <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                                                            className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                                                            disabled={item.isOfferPizza}
                                                        >
                                                            <Plus className="w-3 h-3 text-zinc-400" />
                                                        </button>
                                                    </div>
                                                    <span className="text-lg font-bold text-white">₹{item.price * item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Promo Code */}
                        {cart.length > 0 && !appliedPromo && orderCount === 0 && (
                            <div className="px-4 pb-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <Input
                                            value={promoInput}
                                            onChange={(e) => setPromoInput(e.target.value)}
                                            placeholder="Enter promo code"
                                            className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                        />
                                    </div>
                                    <Button onClick={handleApplyPromo} variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                                        Apply
                                    </Button>
                                </div>
                                <p className="text-xs text-zinc-500 mt-2">Try: FIRSTWOW for ₹200 off</p>
                            </div>
                        )}

                        {/* Order Type Selection */}
                        {cart.length > 0 && (
                            <div className="px-4 pb-4 border-t border-zinc-800">
                                <div className="pt-4">
                                    <OrderTypeSelector
                                        orderType={orderType}
                                        setOrderType={setOrderType}
                                        deliveryFee={49}
                                    />
                                </div>

                                {/* Delivery Location Display */}
                                {orderType === 'delivery' && (
                                    <div className="mt-4 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700">
                                        {deliveryLocation ? (
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-xs text-zinc-400 mb-1">Delivering to</p>
                                                    <p className="text-white text-sm">{deliveryLocation.address}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={createPageUrl('Home')}>
                                                <div className="flex items-center gap-2 text-amber-400 text-sm">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>Set delivery location to continue</span>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Price Breakdown */}
                        {cart.length > 0 && (
                            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 space-y-3">
                                <div className="flex justify-between text-zinc-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span className="flex items-center gap-1">
                                            <Sparkles className="w-4 h-4" />
                                            {discountType}
                                        </span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                {orderType === 'delivery' && deliveryFee > 0 && (
                                    <div className="flex justify-between text-zinc-400">
                                        <span className="flex items-center gap-1">
                                            <Bike className="w-4 h-4" />
                                            Delivery Fee
                                        </span>
                                        <span>₹{deliveryFee}</span>
                                    </div>
                                )}
                                {orderType === 'takeaway' && (
                                    <div className="flex justify-between text-green-400 text-sm">
                                        <span>Takeaway (No delivery fee!)</span>
                                        <span>₹0</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-zinc-800">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    disabled={orderType === 'delivery' && !deliveryLocation}
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl mt-4 disabled:opacity-50"
                                >
                                    {orderType === 'delivery' && !deliveryLocation ? 'Set Location to Continue' : `Place Order • ₹${total}`}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
