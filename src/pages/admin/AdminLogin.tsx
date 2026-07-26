import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Mail, Lock, KeyRound, ExternalLink } from 'lucide-react';
import { LanguageSwitch } from '../../components/common/LanguageSwitch';
import { ThemeSwitch } from '../../components/common/ThemeSwitch';

export const AdminLogin: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loginAdmin = useAppStore((state) => state.loginAdmin);
  const showToast = useAppStore((state) => state.showToast);

  const [email, setEmail] = useState('admin@alsafa.com');
  const [password, setPassword] = useState('Admin123@');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('يرجى كتابة البريد الإلكتروني وكلمة المرور', 'error');
      return;
    }
    loginAdmin(email);
    showToast('تم تسجيل الدخول بنجاح', 'success');
    navigate('/admin/dashboard');
  };

  const fillDemo = () => {
    setEmail('admin@alsafa.com');
    setPassword('Admin123@');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/50 flex flex-col justify-between p-4 sm:p-6 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            ص
          </div>
          <span className="font-extrabold text-sm text-white">{t('appName')}</span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <Card hoverEffect={false} className="p-8 space-y-6 shadow-2xl border-slate-800 bg-slate-900/90 backdrop-blur-xl">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white flex items-center justify-center shadow-glow-emerald">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">{t('admin.loginTitle')}</h2>
            <p className="text-xs text-slate-400">{t('admin.loginSubtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label={t('admin.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label={t('admin.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{t('admin.rememberMe')}</span>
              </label>

              <button
                type="button"
                onClick={fillDemo}
                className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>تعبئة بيانت التجربة</span>
              </button>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full font-bold shadow-glow-gold"
            >
              {t('admin.loginButton')}
            </Button>
          </form>

          {/* Demo Credentials Box */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1.5">
            <span className="font-bold text-amber-400 block">{t('admin.demoCredentials')}</span>
            <div className="flex justify-between text-slate-300">
              <span>{t('admin.email')}:</span>
              <span className="font-mono text-white">admin@alsafa.com</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>{t('admin.password')}:</span>
              <span className="font-mono text-white">Admin123@</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer link */}
      <div className="text-center pb-4">
        <Link to="/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5">
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          <span>العودة إلى موقع العملاء والتصفح</span>
        </Link>
      </div>
    </div>
  );
};
