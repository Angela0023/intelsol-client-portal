'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Building2 } from 'lucide-react';
import { getAllowedClients } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allowedClients = getAllowedClients(password);

    if (allowedClients.length === 0) {
      setError('Invalid password. Please try again.');
      setLoading(false);
      return;
    }

    // Store access in sessionStorage (in production, use proper auth)
    sessionStorage.setItem('clientAccess', JSON.stringify(allowedClients));

    // Redirect based on access level
    if (allowedClients.includes('admin')) {
      router.push('/admin');
    } else {
      // Redirect to first available client
      router.push(`/${allowedClients[0]}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a2647] rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a2647] mb-2">IntElsol</h1>
          <p className="text-slate-600">Client Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-600">
              Enter your password to access your client dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a2647] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2647] text-white py-3 rounded-lg font-medium hover:bg-[#2a3757] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Access Dashboard'}
            </button>
          </form>

          {/* Demo Credentials (remove in production) */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-700 mb-2">
              Demo Credentials:
            </p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Admin: <code className="bg-white px-2 py-1 rounded">intelsol2026</code></li>
              <li>• Xpose: <code className="bg-white px-2 py-1 rounded">xpose2026</code></li>
              <li>• TS Lab: <code className="bg-white px-2 py-1 rounded">tslab2026</code></li>
              <li>• BeeIt: <code className="bg-white px-2 py-1 rounded">beeit2026</code></li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Need help? Contact your account manager
        </p>
      </div>
    </div>
  );
}
