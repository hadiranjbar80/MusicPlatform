import React, { useState } from 'react';
import { Music, Mail, Lock, Eye, EyeOff, User, UserPlus, LogIn } from 'lucide-react';
import { validateEmail, validatePassword, generateAvatar } from '../utils/helpers';
import { useToast } from './Toast';

export default function Auth({ onLogin }) {
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) {
      toast.error('نام خود را وارد کنید');
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error('ایمیل خود را وارد کنید');
      return false;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('ایمیل وارد شده معتبر نیست');
      return false;
    }
    
    if (!formData.password) {
      toast.error('رمز عبور را وارد کنید');
      return false;
    }
    
    if (!validatePassword(formData.password)) {
      toast.error('رمز عبور باید حداقل ۶ کاراکتر باشد');
      return false;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('رمز عبور و تکرار آن مطابقت ندارند');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login/register
    const user = {
      id: 1,
      name: formData.name || 'کاربر',
      email: formData.email,
      avatar: generateAvatar(formData.email),
      joinDate: 'آذر ۱۴۰۳',
      bio: 'عاشق موسیقی 🎵'
    };
    
    setIsLoading(false);
    onLogin(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl pulse-bg" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pulse-bg" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
        
        {/* Floating Music Notes */}
        <div className="absolute top-1/4 right-1/4 floating">
          <Music className="w-12 h-12 text-violet-500/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 floating-delay">
          <Music className="w-8 h-8 text-pink-500/30" />
        </div>
        <div className="absolute top-1/3 left-1/3 floating" style={{ animationDelay: '-3s' }}>
          <Music className="w-10 h-10 text-violet-400/20" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-violet-500/30">
            <Music className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">موزیکا</h1>
          <p className="text-zinc-500 mt-2">دنیای موسیقی در دستان شما</p>
        </div>

        {/* Auth Card */}
        <div className="glass rounded-3xl p-6 md:p-8">
          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6 md:mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 md:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm md:text-base ${
                isLogin 
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              ورود
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 md:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm md:text-base ${
                !isLogin 
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              ثبت نام
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="fade-in">
                <label className="block text-sm text-zinc-400 mb-2">نام</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="نام خود را وارد کنید"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 input-glow transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 input-glow transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-12 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 input-glow transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div className="fade-in">
                <label className="block text-sm text-zinc-400 mb-2">تکرار رمز عبور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 input-glow transition-all"
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-left">
                <button 
                  type="button" 
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  onClick={() => toast.info('لینک بازیابی رمز عبور ارسال شد')}
                >
                  رمز عبور را فراموش کردید؟
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 md:py-4 bg-gradient-to-l from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-xl font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spin-slow" />
                  لطفاً صبر کنید...
                </>
              ) : (
                <>
                  {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {isLogin ? 'ورود به حساب' : 'ایجاد حساب کاربری'}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5 md:my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-zinc-500 text-sm">یا</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button 
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-2"
              onClick={() => toast.info('به زودی...')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm text-zinc-300">گوگل</span>
            </button>
            <button 
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-2"
              onClick={() => toast.info('به زودی...')}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-sm text-zinc-300">گیت‌هاب</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-xs md:text-sm mt-6">
          با {isLogin ? 'ورود' : 'ثبت نام'}، شرایط استفاده و حریم خصوصی را می‌پذیرید
        </p>
      </div>
    </div>
  );
}
