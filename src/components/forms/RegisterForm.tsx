'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  Users, 
  BookOpen,
  Loader2,
  ChevronRight 
} from 'lucide-react';
import { authApi } from '@/app/api/auth';
// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  userType: z.enum(['student', 'parent', 'teacher']),
  grade: z.string().optional(),
  parentPhone: z.string().optional(),
  subject: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const userType = watch('userType');

  const userTypes = [
    { value: 'student', label: 'Student', icon: GraduationCap, color: 'purple' },
    { value: 'parent', label: 'Parent', icon: Users, color: 'blue' },
    { value: 'teacher', label: 'Teacher', icon: BookOpen, color: 'green' },
  ];

  const grades = [
    '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
    '11th Grade', '12th Grade',
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Computer Science', 'Physics', 'Chemistry', 'Biology', 'Literature',
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      
      // Register user
      await authApi.register(data);
      
      // Send OTP
      await authApi.sendOTP(data.phoneNumber, data.userType);
      
      toast.success('Registration successful! Please verify OTP');
      
      // Redirect to OTP verification with phone number
      router.push(`/auth/verify-otp?phone=${data.phoneNumber}&userType=${data.userType}`);
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedUserType) {
      toast.error('Please select user type');
      return;
    }
    setStep(step + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  i <= step
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-600"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: User Type Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-center mb-2">Join AcadeVela</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Select your role to get started
              </p>

              <div className="space-y-4">
                {userTypes.map((type) => (
                  <motion.button
                    key={type.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedUserType(type.value);
                      setValue('userType', type.value as any);
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedUserType === type.value
                        ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-${type.color}-100 dark:bg-${type.color}-900/40`}>
                        <type.icon className={`w-6 h-6 text-${type.color}-600`} />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold">{type.label}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {type.value === 'student' && 'Learn and earn rewards'}
                          {type.value === 'parent' && 'Track your child\'s progress'}
                          {type.value === 'teacher' && 'Create and manage courses'}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!selectedUserType}
                className="w-full mt-8 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Basic Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-center mb-2">Basic Information</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Tell us about yourself
              </p>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('phoneNumber')}
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Additional Information */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-center mb-2">Almost Done!</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Just a few more details
              </p>

              <div className="space-y-4">
                {/* Student specific fields */}
                {userType === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Grade</label>
                      <select
                        {...register('grade')}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select your grade</option>
                        {grades.map((grade) => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Parent's Phone <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        {...register('parentPhone')}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {/* Teacher specific fields */}
                {userType === 'teacher' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Subject</label>
                    <select
                      {...register('subject')}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select your subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <a href="/auth/login" className="text-purple-600 hover:text-purple-700 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </motion.div>
  );
}