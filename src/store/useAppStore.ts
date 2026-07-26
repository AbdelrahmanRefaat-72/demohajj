import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trip, Booking, Language, Theme, BookingStatus } from '../types';
import { INITIAL_TRIPS, INITIAL_BOOKINGS } from '../data/mockData';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppStore {
  // Appearance & Language
  language: Language;
  theme: Theme;
  desktopViewMode: 'phone' | 'fullscreen';
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setDesktopViewMode: (mode: 'phone' | 'fullscreen') => void;

  // Admin Auth State
  isAdminAuthenticated: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string) => void;
  logoutAdmin: () => void;

  // Trips State & Actions
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (id: string, updatedTrip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;

  // Bookings State & Actions
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;

  // Notification Toast State
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      language: 'ar',
      theme: 'dark', // Default dark theme for luxury look
      desktopViewMode: 'phone', // Default phone frame for customer website on desktop

      setLanguage: (language: Language) => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        set({ language });
      },

      setTheme: (theme: Theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      setDesktopViewMode: (desktopViewMode) => set({ desktopViewMode }),

      // Admin Auth
      isAdminAuthenticated: false,
      adminEmail: null,
      loginAdmin: (email) => set({ isAdminAuthenticated: true, adminEmail: email }),
      logoutAdmin: () => set({ isAdminAuthenticated: false, adminEmail: null }),

      // Trips CRUD
      trips: INITIAL_TRIPS,

      addTrip: (newTripData) => {
        const newTrip: Trip = {
          ...newTripData,
          id: `trip-${Date.now()}`,
        };
        set((state) => ({ trips: [newTrip, ...state.trips] }));
        get().showToast(get().language === 'ar' ? 'تم إضافة الرحلة بنجاح' : 'Trip added successfully', 'success');
      },

      updateTrip: (id, updatedFields) => {
        set((state) => ({
          trips: state.trips.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
        }));
        get().showToast(get().language === 'ar' ? 'تم تحديث بيانات الرحلة' : 'Trip updated successfully', 'success');
      },

      deleteTrip: (id) => {
        set((state) => ({
          trips: state.trips.filter((t) => t.id !== id),
        }));
        get().showToast(get().language === 'ar' ? 'تم حذف الرحلة' : 'Trip deleted', 'info');
      },

      // Bookings CRUD
      bookings: INITIAL_BOOKINGS,

      addBooking: (bookingData) => {
        const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
          now.getDate()
        ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newBooking: Booking = {
          ...bookingData,
          id: bookingId,
          status: 'pending',
          createdAt: formattedDate,
        };

        set((state) => ({ bookings: [newBooking, ...state.bookings] }));
        return bookingId;
      },

      updateBookingStatus: (id, status) => {
        set((state) => ({
          bookings: state.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        }));
        const statusText =
          status === 'approved'
            ? get().language === 'ar' ? 'تمت الموافقة على الحجز' : 'Booking Approved'
            : status === 'rejected'
            ? get().language === 'ar' ? 'تم رفض الحجز' : 'Booking Rejected'
            : get().language === 'ar' ? 'الحجز قيد الانتظار' : 'Booking Pending';
        get().showToast(statusText, 'success');
      },

      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        }));
        get().showToast(get().language === 'ar' ? 'تم حذف الحجز' : 'Booking deleted', 'info');
      },

      // Toast Notifications
      toast: null,
      showToast: (message, type = 'success') => {
        set({ toast: { message, type } });
        setTimeout(() => {
          set({ toast: null });
        }, 3500);
      },
      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'al-safa-hajj-umrah-storage',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        trips: state.trips,
        bookings: state.bookings,
        isAdminAuthenticated: state.isAdminAuthenticated,
        adminEmail: state.adminEmail,
      }),
    }
  )
);
