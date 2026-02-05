import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const faqs = [
    {
        question: 'How does the ₹39 pizza offer work?',
        answer: 'The ₹39 pizza is a special daily deal available from 11:00 AM to 11:00 PM. You can order only one ₹39 pizza per device per day, and no customizations are allowed on this offer.'
    },
    {
        question: 'What are the delivery charges?',
        answer: 'Delivery charges are ₹49 for home delivery. Choose takeaway option to avoid delivery charges and save more!'
    },
    {
        question: 'How do I get the new user discount?',
        answer: 'First-time customers automatically get ₹200 off on their first order. You can also use the promo code FIRSTWOW at checkout.'
    },
    {
        question: 'What is the bulk order discount?',
        answer: 'Orders above ₹2000 automatically get a flat 20% discount, which overrides other promotional discounts for better savings.'
    },
    {
        question: 'How long does delivery take?',
        answer: 'We deliver hot and fresh pizzas within 30 minutes of order confirmation. Takeaway orders are ready for pickup in 20 minutes.'
    },
    {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order is confirmed, you will receive updates via SMS/Email at every stage - preparation, dispatch, and delivery.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery for most locations.'
    },
    {
        question: 'Do you have vegetarian options?',
        answer: 'Absolutely! We have a wide range of vegetarian pizzas and sides. Look for the green dot indicator on each menu item.'
    }
];

function FAQContent() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">FAQs & Help</h1>
                        <p className="text-zinc-400 text-lg">Find answers to common questions</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/50 transition-colors"
                                >
                                    <span className="text-white font-semibold pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-5 pb-5 pt-2 text-zinc-400 leading-relaxed border-t border-zinc-800">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center">
                        <h2 className="text-white font-bold text-xl mb-3">Still need help?</h2>
                        <p className="text-zinc-400 mb-6">Our customer support team is here for you</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:18001234567" className="text-red-500 hover:text-red-400 font-semibold">
                                📞 1800-123-4567
                            </a>
                            <span className="text-zinc-700 hidden sm:block">|</span>
                            <a href="mailto:support@wowpizza.in" className="text-red-500 hover:text-red-400 font-semibold">
                                ✉️ support@wowpizza.in
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function FAQ() {
    return (
        <CartProvider>
            <FAQContent />
        </CartProvider>
    );
}
