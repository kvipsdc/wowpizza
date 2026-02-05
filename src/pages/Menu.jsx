import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CartProvider } from '@/components/cart/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import MenuTabs from '@/components/menu/MenuTabs';
import PizzaCard from '@/components/menu/PizzaCard';

// Menu Data
const menuItems = {
    pizza: [
        {
            id: 'offer-39',
            name: 'Margherita Special',
            description: 'Classic cheese pizza with our signature tomato sauce',
            price: 39,
            originalPrice: 199,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop',
            isOfferPizza: true,
            isVeg: true
        },
        {
            id: 'pizza-1',
            name: 'Paneer Tikka Pizza',
            description: 'Spiced paneer cubes with onions and capsicum',
            price: 349,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'pizza-2',
            name: 'Veggie Paradise',
            description: 'Loaded with fresh vegetables and herbs',
            price: 299,
            image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'pizza-3',
            name: 'Chicken Dominator',
            description: 'Double chicken with extra cheese and BBQ sauce',
            price: 449,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: false
        },
        {
            id: 'pizza-4',
            name: 'Pepperoni Feast',
            description: 'Classic pepperoni with mozzarella cheese',
            price: 399,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: false
        },
        {
            id: 'pizza-5',
            name: 'BBQ Chicken',
            description: 'Grilled chicken with tangy BBQ sauce',
            price: 429,
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: false
        },
        {
            id: 'pizza-6',
            name: 'Farm Fresh',
            description: 'Baby corn, mushrooms, olives, and jalapenos',
            price: 329,
            image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'pizza-7',
            name: 'Cheese Burst',
            description: 'Extra cheesy with stuffed crust',
            price: 379,
            image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        }
    ],
    sides: [
        {
            id: 'side-1',
            name: 'Garlic Breadsticks',
            description: 'Crispy breadsticks with garlic butter',
            price: 149,
            image: 'https://images.unsplash.com/photo-1619531040576-f9416aeadcb3?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'side-2',
            name: 'Cheesy Fries',
            description: 'Crispy fries loaded with cheese sauce',
            price: 179,
            image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'side-3',
            name: 'Chicken Wings',
            description: 'Spicy buffalo wings with dip',
            price: 249,
            image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: false
        },
        {
            id: 'side-4',
            name: 'Stuffed Mushrooms',
            description: 'Mushrooms filled with cheese and herbs',
            price: 199,
            image: 'https://images.unsplash.com/photo-1604905549718-84c22e4e0e2c?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        }
    ],
    drinks: [
        {
            id: 'drink-1',
            name: 'Coca Cola',
            description: '330ml can',
            price: 60,
            image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'drink-2',
            name: 'Fresh Lime Soda',
            description: 'Refreshing lime with soda',
            price: 79,
            image: 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'drink-3',
            name: 'Cold Coffee',
            description: 'Creamy iced coffee',
            price: 129,
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'drink-4',
            name: 'Mango Shake',
            description: 'Fresh mango milkshake',
            price: 149,
            image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        }
    ],
    desserts: [
        {
            id: 'dessert-1',
            name: 'Choco Lava Cake',
            description: 'Warm chocolate cake with molten center',
            price: 149,
            image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'dessert-2',
            name: 'Brownie Sundae',
            description: 'Chocolate brownie with ice cream',
            price: 179,
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        },
        {
            id: 'dessert-3',
            name: 'Tiramisu',
            description: 'Classic Italian coffee dessert',
            price: 199,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop',
            isOfferPizza: false,
            isVeg: true
        }
    ]
};

function MenuContent() {
    const [activeTab, setActiveTab] = useState('pizza');
    const [searchQuery, setSearchQuery] = useState('');

    // Check URL params for category
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        if (category && menuItems[category]) {
            setActiveTab(category);
        }
    }, []);

    const filteredItems = menuItems[activeTab].filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort to put offer pizza first
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (a.isOfferPizza) return -1;
        if (b.isOfferPizza) return 1;
        return 0;
    });

    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-black text-white mb-2">Our Menu</h1>
                        <p className="text-zinc-400">Choose from our wide selection of delicious items</p>
                    </motion.div>

                    {/* Offer Highlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">₹39 Pizza Deal Active!</h3>
                                <p className="text-sm text-zinc-400">Limited to 1 per customer per day (11 AM - 11 PM)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search menu..."
                                className="pl-12 h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl"
                            />
                        </div>
                        <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedItems.map((item, index) => (
                            <PizzaCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {sortedItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-zinc-400 text-lg">No items found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Menu() {
    return (
        <CartProvider>
            <MenuContent />
        </CartProvider>
    );
}
