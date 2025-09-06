<<<<<<< HEAD
'use client'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from '@/store/store'
import { theme } from '@/theme/mui-theme'

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  )
}
=======
'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// ===== App Context Types =====
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  userType: 'student' | 'parent' | 'teacher';
  avatar?: string;
  level?: number;
  points?: number;
  badges?: string[];
  streak?: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// ===== Gamification Context Types =====
interface GamificationContextType {
  points: number;
  level: number;
  streak: number;
  badges: string[];
  achievements: any[];
  addPoints: (points: number) => void;
  unlockBadge: (badgeId: string) => void;
  updateStreak: () => void;
}

// ===== Learning Context Types =====
interface LearningContextType {
  currentCourse: any | null;
  setCurrentCourse: (course: any) => void;
  progress: number;
  updateProgress: (progress: number) => void;
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
}

// ===== Create Contexts =====
const AppContext = createContext<AppContextType | undefined>(undefined);
const GamificationContext = createContext<GamificationContextType | undefined>(undefined);
const LearningContext = createContext<LearningContextType | undefined>(undefined);

// ===== Props Interface =====
interface ProvidersProps {
  children: ReactNode;
  session?: any;
}

export function Providers({ children, session }: ProvidersProps) {
  // React Query Client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  }));

  // ===== App State =====
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ===== Gamification State =====
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  // ===== Learning State =====
  const [currentCourse, setCurrentCourse] = useState<any | null>(null);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // ===== Effects =====
  useEffect(() => {
    // Load user data from localStorage on mount
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setPoints(userData.points || 0);
          setLevel(userData.level || 1);
          setStreak(userData.streak || 0);
          setBadges(userData.badges || []);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // ===== Gamification Methods =====
  const addPoints = (newPoints: number) => {
    setPoints((prev) => {
      const updatedPoints = prev + newPoints;
      // Check for level up (every 1000 points = 1 level)
      const newLevel = Math.floor(updatedPoints / 1000) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        // You can trigger a level up notification here
      }
      return updatedPoints;
    });
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) => {
      if (!prev.includes(badgeId)) {
        return [...prev, badgeId];
      }
      return prev;
    });
  };

  const updateStreak = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    const today = new Date().toDateString();
    
    if (lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(1);
      }
      
      localStorage.setItem('lastActivity', today);
    }
  };

  // ===== Learning Methods =====
  const updateProgress = (newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)));
  };

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId];
      }
      return prev;
    });
  };

  // ===== Context Values =====
  const appContextValue: AppContextType = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    sidebarOpen,
    setSidebarOpen,
  };

  const gamificationContextValue: GamificationContextType = {
    points,
    level,
    streak,
    badges,
    achievements,
    addPoints,
    unlockBadge,
    updateStreak,
  };

  const learningContextValue: LearningContextType = {
    currentCourse,
    setCurrentCourse,
    progress,
    updateProgress,
    completedLessons,
    markLessonComplete,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <AppContext.Provider value={appContextValue}>
            <GamificationContext.Provider value={gamificationContextValue}>
              <LearningContext.Provider value={learningContextValue}>
                {children}
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      style: {
                        background: '#4ade80',
                      },
                    },
                    error: {
                      style: {
                        background: '#ef4444',
                      },
                    },
                  }}
                />
              </LearningContext.Provider>
            </GamificationContext.Provider>
          </AppContext.Provider>
        </ThemeProvider>
      </SessionProvider>
      {/* Show React Query Devtools only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

// ===== Custom Hooks =====
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within Providers');
  }
  return context;
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within Providers');
  }
  return context;
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within Providers');
  }
  return context;
};

// ===== Utility Hook for Auth =====
export const useAuth = () => {
  const { user, setUser, isLoading } = useApp();
  
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
};
>>>>>>> 5bca1c1 ("fixes")
