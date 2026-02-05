import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Device fingerprint generator
const generateDeviceId = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('WowPizza', 2, 2);
    const canvasData = canvas.toDataURL();

    const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        canvasData.slice(-50)
    ].join('|');

    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'WP' + Math.abs(hash).toString(36);
};

// Check if offer is within time window (11 AM - 11 PM)
const isOfferTimeValid = () => {
    const hour = new Date().getHours();
    return hour >= 11 && hour < 23;
};

// Check if device already used offer today
const hasUsedOfferToday = (deviceId) => {
    const stored = localStorage.getItem('wow_offer_usage');
    if (!stored) return false;

    const usage = JSON.parse(stored);
    const today = new Date().toDateString();

    return usage.deviceId === deviceId && usage.date === today;
};

// Mark offer as used for device
const markOfferUsed = (deviceId) => {
    const today = new Date().toDateString();
    localStorage.setItem('wow_offer_usage', JSON.stringify({
        deviceId,
        date: today
    }));
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [orderCount, setOrderCount] = useState(0);
    const [deviceId, setDeviceId] = useState('');
    const [appliedPromo, setAppliedPromo] = useState('');
    const [orderType, setOrderType] = useState('delivery');
    const [deliveryLocation, setDeliveryLocation] = useState(null);

    useEffect(() => {
        const id = generateDeviceId();
        setDeviceId(id);

        // Load order count from localStorage for demo
        const storedCount = localStorage.getItem('wow_order_count');
        if (storedCount) setOrderCount(parseInt(storedCount));
    }, []);

    const validateOfferPizza = () => {
        // Check time window
        if (!isOfferTimeValid()) {
            return { valid: false, message: 'The ₹39 offer is only available between 11:00 AM and 11:00 PM.' };
        }

        // Check if already in cart
        if (cart.some(item => item.isOfferPizza)) {
            return { valid: false, message: 'Only one ₹39 pizza can be added per order.' };
        }

        // Check device usage
        if (hasUsedOfferToday(deviceId)) {
            return { valid: false, message: 'You have already used the ₹39 offer today. Come back tomorrow!' };
        }

        return { valid: true };
    };

    const addToCart = (item) => {
        if (item.isOfferPizza) {
            const validation = validateOfferPizza();
            if (!validation.valid) {
                return { success: false, message: validation.message };
            }
        }

        const existingIndex = cart.findIndex(
            cartItem => cartItem.id === item.id && !item.isOfferPizza
        );

        if (existingIndex > -1 && !item.isOfferPizza) {
            const newCart = [...cart];
            newCart[existingIndex].quantity += 1;
            setCart(newCart);
        } else {
            setCart([...cart, { ...item, quantity: 1, cartId: Date.now() }]);
        }

        return { success: true };
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(cartId);
            return;
        }

        const item = cart.find(i => i.cartId === cartId);
        if (item?.isOfferPizza && quantity > 1) {
            return { success: false, message: 'Only one ₹39 pizza allowed per order.' };
        }

        setCart(cart.map(item =>
            item.cartId === cartId ? { ...item, quantity } : item
        ));
        return { success: true };
    };

    const clearCart = () => setCart([]);

    const applyPromoCode = (code) => {
        if (code.toUpperCase() === 'FIRSTWOW' && orderCount === 0) {
            setAppliedPromo('FIRSTWOW');
            return { success: true, message: '₹200 discount applied!' };
        }
        return { success: false, message: 'Invalid promo code or not eligible.' };
    };

    const calculateTotal = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        let discountType = '';

        // Bulk order discount takes priority
        if (subtotal > 2000) {
            discount = subtotal * 0.20;
            discountType = 'Bulk Order (20% OFF)';
        } else if (appliedPromo === 'FIRSTWOW' && orderCount === 0) {
            discount = Math.min(200, subtotal);
            discountType = 'New User (FIRSTWOW)';
        } else if (orderCount === 0) {
            discount = Math.min(200, subtotal);
            discountType = 'New User Discount';
        } else if (orderCount === 1) {
            discount = Math.min(150, subtotal);
            discountType = '2nd Order Discount';
        } else if (orderCount === 2) {
            discount = Math.min(100, subtotal);
            discountType = '3rd Order Discount';
        }

        // Add delivery fee only for delivery orders
        const deliveryFee = orderType === 'delivery' ? 49 : 0;
        const totalAfterDiscount = Math.max(0, subtotal - discount);

        return {
            subtotal,
            discount: Math.round(discount),
            discountType,
            deliveryFee,
            total: totalAfterDiscount + deliveryFee
        };
    };

    const checkout = () => {
        const hasOffer = cart.some(item => item.isOfferPizza);
        if (hasOffer) {
            markOfferUsed(deviceId);
        }

        // Increment order count
        const newCount = orderCount + 1;
        setOrderCount(newCount);
        localStorage.setItem('wow_order_count', newCount.toString());

        clearCart();
        setAppliedPromo('');
    };

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            calculateTotal,
            checkout,
            orderCount,
            deviceId,
            applyPromoCode,
            appliedPromo,
            validateOfferPizza,
            isOfferTimeValid,
            orderType,
            setOrderType,
            deliveryLocation,
            setDeliveryLocation
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
