import React, { useState } from 'react';

interface AuthPageProps {
  onBackToHome: () => void;
  onLoginAsSuperAdmin: () => void;
  onLoginSuccess: (role: string, name: string) => void;
  mode?: 'login' | 'signup';
}

const MinimalInput = ({ label, type, value, onChange, required, placeholder }: any) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-950 mb-1.5 ml-1">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-slate-50/50 hover:bg-slate-50 transition-all text-[15px] text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
};

export const AuthPage: React.FC<AuthPageProps> = ({
  onBackToHome,
  onLoginAsSuperAdmin,
  onLoginSuccess,
  mode = 'login',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'SUPER_ADMIN' | 'DAYCARE_ADMIN' | 'TEACHER' | 'PARENT'>('SUPER_ADMIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'SUPER_ADMIN') {
      onLoginAsSuperAdmin();
    } else {
      onLoginSuccess(role, fullName || email.split('@')[0] || 'Member');
    }
  };

  const handleQuickDemoLogin = (selectedRole: 'SUPER_ADMIN' | 'DAYCARE_ADMIN' | 'TEACHER' | 'PARENT') => {
    if (selectedRole === 'SUPER_ADMIN') {
      onLoginAsSuperAdmin();
    } else if (selectedRole === 'DAYCARE_ADMIN') {
      onLoginSuccess('DAYCARE_ADMIN', 'Eng. Mahad (Campus Director)');
    } else if (selectedRole === 'TEACHER') {
      onLoginSuccess('TEACHER', 'Faduma Noor (Lead Educator)');
    } else {
      onLoginSuccess('PARENT', 'Maryam Ali (Parent)');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-[2.75rem] max-w-[480px] w-full shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)] max-h-[95vh] overflow-y-auto relative animate-[slideUp_0.4s_ease-out]">
        
        {/* Close/Back Button */}
        <button
          onClick={onBackToHome}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors z-20 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="p-6 sm:p-8">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-950 text-white mb-3 shadow-lg shadow-slate-950/20">
              <i className="fa-solid fa-shapes text-lg"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-950 font-display tracking-tight">
              {authMode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm">
              {authMode === 'login' ? 'Please enter your details to sign in.' : 'Enter your details to get started.'}
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer mb-5"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span className="text-sm font-semibold text-slate-700">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="bg-white px-2 text-slate-400 font-medium tracking-wide">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {authMode === 'signup' && (
              <MinimalInput
                label="Full Name"
                type="text"
                placeholder="Dr. Ahmed Hassan"
                value={fullName}
                onChange={(e: any) => setFullName(e.target.value)}
                required
              />
            )}

            <MinimalInput
              label="Email"
              type="email"
              placeholder="admin@abcdaycare.org"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />

            <MinimalInput
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />

            <div className="mb-5">
              <label className="block text-[13px] font-semibold text-slate-950 mb-1 ml-1">Access Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-slate-50/50 hover:bg-slate-50 transition-all text-sm text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="SUPER_ADMIN">Super Admin (Network Hub)</option>
                  <option value="DAYCARE_ADMIN">Daycare Admin (Campus Director)</option>
                  <option value="TEACHER">Teacher (Classroom Portal)</option>
                  <option value="PARENT">Parent (Family App)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-slate-950/20 hover:-translate-y-0.5"
            >
              {authMode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            {authMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="font-semibold text-slate-950 hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="font-semibold text-slate-950 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Quick Demo Access */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-center text-[10px] font-semibold text-slate-400 mb-3 uppercase tracking-widest">Quick Demo Access</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button
                onClick={() => handleQuickDemoLogin('SUPER_ADMIN')}
                className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                Super Admin
              </button>
              <button
                onClick={() => handleQuickDemoLogin('DAYCARE_ADMIN')}
                className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                Campus Dir.
              </button>
              <button
                onClick={() => handleQuickDemoLogin('TEACHER')}
                className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                Teacher
              </button>
              <button
                onClick={() => handleQuickDemoLogin('PARENT')}
                className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                Parent
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
