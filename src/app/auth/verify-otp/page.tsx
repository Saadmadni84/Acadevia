<<<<<<< HEAD
=======
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    const phoneNumber = searchParams.get('phone');
    const userType = searchParams.get('type');

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();

        // Timer countdown
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all digits are entered
        if (newOtp.every(digit => digit !== '') && index === 5) {
            handleVerifyOTP(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (otpValue?: string) => {
        const otpCode = otpValue || otp.join('');

        if (otpCode.length !== 6) {
            toast.error('Please enter complete OTP');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber,
                    otp: otpCode,
                    userType,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                localStorage.setItem('token', data.token);
                localStorage.setItem('userType', userType || 'student');

                if (userType === 'admin') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/student/dashboard');
                }
            } else {
                toast.error(data.message || 'Invalid OTP');
            }
        } catch (error) {
            toast.error('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (timer > 0) return;

        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber,
                    userType,
                }),
            });

            if (response.ok) {
                toast.success('OTP resent successfully!');
                setTimer(30);
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            } else {
                toast.error('Failed to resend OTP');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="backdrop-blur-lg bg-white/90 shadow-2xl border-0">
                    <div className="p-8">
                        {/* Back Button */}
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back
                        </Link>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.1 }}
                                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                            >
                                <span className="text-2xl">🔐</span>
                            </motion.div>
                            <h2 className="text-2xl font-bold text-gray-800">Verify Your Number</h2>
                            <p className="text-gray-600 mt-2">
                                We've sent a code to +91 {phoneNumber}
                            </p>
                        </div>

                        {/* OTP Input */}
                        {/* OTP Input */}
<div className="flex justify-center gap-2 mb-8">
  {otp.map((digit, index) => (
    <motion.input
      key={index}
      ref={(el) => {
        if (inputRefs.current) {
          inputRefs.current[index] = el;
        }
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.05 }}
      type="text"
      inputMode="numeric"
      // ... rest of your input props
    />
  ))}
</div>

                        {/* Verify Button */}
                        <Button
                            onClick={() => handleVerifyOTP()}
                            disabled={loading || otp.some(digit => !digit)}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transform transition-all hover:scale-105"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify OTP'
                            )}
                        </Button>

                        {/* Resend OTP */}
                        <div className="text-center mt-6">
                            {timer > 0 ? (
                                <p className="text-sm text-gray-600">
                                    Resend code in{' '}
                                    <span className="font-semibold text-purple-600">{timer}s</span>
                                </p>
                            ) : (
                                <button
                                    onClick={handleResendOTP}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
>>>>>>> 5bca1c1 ("fixes")
