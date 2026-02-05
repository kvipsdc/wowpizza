import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function LocationModal({ isOpen, onClose, onLocationSet }) {
    const [step, setStep] = useState('permission');
    const [location, setLocation] = useState({ lat: null, lng: null, address: '' });
    const [manualAddress, setManualAddress] = useState({
        street: '',
        landmark: '',
        city: '',
        pincode: ''
    });

    const requestLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            setStep('manual');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: 'Fetching address...'
                });
                toast.success('Location detected!');
                setStep('confirm');
            },
            (error) => {
                toast.error('Unable to detect location');
                setStep('manual');
            }
        );
    };

    const handleManualSubmit = () => {
        if (!manualAddress.street || !manualAddress.city || !manualAddress.pincode) {
            toast.error('Please fill in all required fields');
            return;
        }

        const fullAddress = `${manualAddress.street}, ${manualAddress.landmark ? manualAddress.landmark + ', ' : ''}${manualAddress.city}, ${manualAddress.pincode}`;

        onLocationSet({
            ...location,
            address: fullAddress,
            manualAddress
        });

        localStorage.setItem('wow_delivery_address', fullAddress);
        toast.success('Location saved!');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl z-50 p-6 border border-zinc-800"
                    >
                        {/* Step 1: Permission Request */}
                        {step === 'permission' && (
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Enable Location Access</h2>
                                <p className="text-zinc-400 mb-8">
                                    We need your location to show nearby stores and calculate delivery charges accurately.
                                </p>
                                <div className="space-y-3">
                                    <Button
                                        onClick={requestLocation}
                                        className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold"
                                    >
                                        <Navigation className="w-5 h-5 mr-2" />
                                        Detect My Location
                                    </Button>
                                    <Button
                                        onClick={() => setStep('manual')}
                                        variant="outline"
                                        className="w-full h-12 border-zinc-700 text-white hover:bg-zinc-800 rounded-xl"
                                    >
                                        Enter Address Manually
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Manual Address Entry */}
                        {step === 'manual' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Enter Delivery Address</h2>
                                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-zinc-300">Street Address *</Label>
                                        <Input
                                            value={manualAddress.street}
                                            onChange={(e) => setManualAddress({ ...manualAddress, street: e.target.value })}
                                            placeholder="House/Flat No, Building Name, Street"
                                            className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-zinc-300">Landmark (Optional)</Label>
                                        <Input
                                            value={manualAddress.landmark}
                                            onChange={(e) => setManualAddress({ ...manualAddress, landmark: e.target.value })}
                                            placeholder="e.g., Near Central Mall"
                                            className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-zinc-300">City *</Label>
                                            <Input
                                                value={manualAddress.city}
                                                onChange={(e) => setManualAddress({ ...manualAddress, city: e.target.value })}
                                                placeholder="City"
                                                className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-zinc-300">Pincode *</Label>
                                            <Input
                                                value={manualAddress.pincode}
                                                onChange={(e) => setManualAddress({ ...manualAddress, pincode: e.target.value })}
                                                placeholder="400001"
                                                maxLength={6}
                                                className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleManualSubmit}
                                        className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold mt-6"
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        Confirm Location
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirm Auto-Detected Location */}
                        {step === 'confirm' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Confirm Location</h2>
                                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="bg-zinc-800 rounded-xl p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-red-500 mt-1" />
                                        <div>
                                            <p className="text-white font-medium mb-1">Detected Location</p>
                                            <p className="text-zinc-400 text-sm">
                                                {location.address || 'Location detected successfully'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-zinc-400 text-sm mb-6">
                                    Please enter your complete delivery address below:
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-zinc-300">Complete Address *</Label>
                                        <Textarea
                                            value={manualAddress.street}
                                            onChange={(e) => setManualAddress({ ...manualAddress, street: e.target.value })}
                                            placeholder="House/Flat No, Building Name, Street, Area"
                                            className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-zinc-300">City *</Label>
                                            <Input
                                                value={manualAddress.city}
                                                onChange={(e) => setManualAddress({ ...manualAddress, city: e.target.value })}
                                                placeholder="Mumbai"
                                                className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-zinc-300">Pincode *</Label>
                                            <Input
                                                value={manualAddress.pincode}
                                                onChange={(e) => setManualAddress({ ...manualAddress, pincode: e.target.value })}
                                                placeholder="400001"
                                                maxLength={6}
                                                className="bg-zinc-800 border-zinc-700 text-white mt-1"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleManualSubmit}
                                        className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold"
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        Confirm & Continue
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
