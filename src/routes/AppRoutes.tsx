import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

// Customer Components & Pages
import { PhoneFrame } from '../components/customer/PhoneFrame';
import { HeaderNav } from '../components/customer/HeaderNav';
import { BottomNav } from '../components/customer/BottomNav';
import { Toast } from '../components/common/Toast';
import { Home } from '../pages/customer/Home';
import { Trips } from '../pages/customer/Trips';
import { TripDetails } from '../pages/customer/TripDetails';
import { Booking } from '../pages/customer/Booking';
import { HowToBook } from '../pages/customer/HowToBook';
import { Contact } from '../pages/customer/Contact';
import { Settings } from '../pages/customer/Settings';

// Admin Components & Pages
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminTrips } from '../pages/admin/AdminTrips';
import { AdminTripForm } from '../pages/admin/AdminTripForm';
import { AdminBookings } from '../pages/admin/AdminBookings';

// Scroll To Top component on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Customer Layout Wrapper
const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col justify-between bg-warm-100 dark:bg-dark-bg transition-colors">
        <HeaderNav />
        <main className="flex-1">{children}</main>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
};

// Admin Layout Wrapper
const AdminLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  const isAdminAuthenticated = useAppStore((state) => state.isAdminAuthenticated);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex antialiased">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        <AdminHeader title={title} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);

  // Initialize html attrs
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  return (
    <>
      <ScrollToTop />
      <Toast />
      <Routes>
        {/* Customer Routes */}
        <Route
          path="/"
          element={
            <CustomerLayout>
              <Home />
            </CustomerLayout>
          }
        />
        <Route
          path="/trips"
          element={
            <CustomerLayout>
              <Trips />
            </CustomerLayout>
          }
        />
        <Route
          path="/trips/:id"
          element={
            <CustomerLayout>
              <TripDetails />
            </CustomerLayout>
          }
        />
        <Route
          path="/booking"
          element={
            <CustomerLayout>
              <Booking />
            </CustomerLayout>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <CustomerLayout>
              <Booking />
            </CustomerLayout>
          }
        />
        <Route
          path="/how-to-book"
          element={
            <CustomerLayout>
              <HowToBook />
            </CustomerLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerLayout>
              <Contact />
            </CustomerLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <CustomerLayout>
              <Settings />
            </CustomerLayout>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminLayout title="لوحة التحكم الرئيسية">
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout title="لوحة التحكم الرئيسية">
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/trips"
          element={
            <AdminLayout title="إدارة الرحلات">
              <AdminTrips />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/trips/new"
          element={
            <AdminLayout title="إضافة رحلة جديدة">
              <AdminTripForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/trips/:id/edit"
          element={
            <AdminLayout title="تعديل بيانات الرحلة">
              <AdminTripForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminLayout title="إدارة حجوزات العملاء">
              <AdminBookings />
            </AdminLayout>
          }
        />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
