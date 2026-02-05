import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

function FeedbackContent() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !feedback.message) {
            toast.error('Please provide a rating and feedback message');
            return;
        }
        toast.success('Thank you for your feedback! We appreciate it. 🙏');
        setRating(0);
        setFeedback({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-zinc-950">
            <Header />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">Share Your Feedback</h1>
                        <p className="text-zinc-400 text-lg">Help us serve you better</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Rating */}
                            <div>
                                <Label className="text-white mb-3 block">How was your experience?</Label>
                                <div className="flex gap-2 justify-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-10 h-10 ${star <= rating
                                                        ? 'fill-amber-400 text-amber-400'
                                                        : 'text-zinc-700 hover:text-zinc-600'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-zinc-300">Name</Label>
                                <Input
                                    value={feedback.name}
                                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                                    placeholder="Your name"
                                    className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                />
                            </div>

                            <div>
                                <Label className="text-zinc-300">Email</Label>
                                <Input
                                    type="email"
                                    value={feedback.email}
                                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                                    placeholder="your.email@example.com"
                                    className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                />
                            </div>

                            <div>
                                <Label className="text-zinc-300">Your Feedback *</Label>
                                <Textarea
                                    value={feedback.message}
                                    onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                                    placeholder="Tell us about your experience..."
                                    className="bg-zinc-800 border-zinc-700 text-white mt-2"
                                    rows={5}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold"
                            >
                                Submit Feedback
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    );
}

export default function Feedback() {
    return (
        <CartProvider>
            <FeedbackContent />
        </CartProvider>
    );
}
