import { useState, useEffect, FormEvent } from 'react';
import { Shield, ChevronRight, User as UserIcon, Key } from 'lucide-react';
import { User as UserType } from '../types';
import { ISLAMIC_QUOTES } from '../utils/constants';
import { LiveClock } from '../components/Shared/LiveClock';

interface LoginScreenProps {
  onLogin: (user: UserType) => void;
  users: UserType[];
}

export function LoginScreen({ onLogin, users }: LoginScreenProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showPass, setShowPass] = useState(false);

  const activeUsers = users.filter(u => u.enabled);

  // Auto rotate quotes dynamically based on translation text length to give proper gap
  useEffect(() => {
    const currentText = ISLAMIC_QUOTES[quoteIdx]?.malayalam || '';
    // Scaled gap: 90ms per character plus a baseline of 6 seconds (6000ms)
    const readDelay = Math.max(6000, currentText.length * 90);
    
    const timer = setTimeout(() => {
      setQuoteIdx(prev => (prev + 1) % ISLAMIC_QUOTES.length);
    }, readDelay);
    
    return () => clearTimeout(timer);
  }, [quoteIdx]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!selectedUser) {
      setError('Please select a profile to continue');
      return;
    }

    if (selectedUser.pass === password) {
      onLogin(selectedUser);
    } else {
      setError('Incorrect Password. Please check and try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-start items-center font-['Outfit'] bg-slate-900 text-slate-100">
      
      {/* Decorative colorful ambient blobs (Aurora effect) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/30 blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-500/20 blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-amber-500/20 blur-[100px]"></div>
      </div>

      {/* Top Header Banner */}
      <div className="w-full bg-white/5 backdrop-blur-3xl pt-8 pb-4 px-4 text-center border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] select-none">
        <div className="max-w-4xl mx-auto space-y-1 transition-all duration-500 animate-in fade-in">
          {/* Elegant Arabic verse, small size, matched color with Malaylam translation */}
          <h1 
            className="text-sm sm:text-base md:text-2xl text-slate-200/90 leading-relaxed font-normal tracking-wide text-center" 
            style={{ fontFamily: "'Scheherazade New', serif", direction: 'rtl' }}
          >
            {ISLAMIC_QUOTES[quoteIdx].arabic}
          </h1>
          
          {/* Malayalam meaning translation */}
          <p 
            className="text-[10px] sm:text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-normal font-light min-h-[28px] sm:min-h-[18px] flex items-center justify-center mt-3"
            style={{ fontFamily: "'Anek Malayalam', sans-serif" }}
          >
            {ISLAMIC_QUOTES[quoteIdx].malayalam}
          </p>
        </div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 md:p-10 z-10">
        
        {/* Main Login Card Wrapper (Glassmorphism) */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 max-w-5xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[450px] transition-all">
          
          {/* Left Column: Rich Gradient Brand Identity Block */}
          <div className="md:col-span-5 col-span-1 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 text-white p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-3xl">
            
            {/* Geometric wireframe layout graphics */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border border-white/20"></div>
              <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full border border-white/10"></div>
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full border border-white/10"></div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Profile icon badge */}
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 h-16 w-16 rounded-[22px] flex items-center justify-center shadow-2xl shadow-black/20">
                <Shield size={32} className="text-white" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-sm font-['Outfit']">
                  E-Office
                </h2>
                <div className="h-1 w-12 bg-white/50 rounded-full"></div>
                <p className="text-sm sm:text-base font-medium text-white/90 tracking-wider">
                  KM Shaji • Vengara Constituency
                </p>
              </div>
            </div>

            {/* Date-time element inside a pill near the bottom */}
            <div className="relative z-10 mt-12 mb-8">
              <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl font-medium text-sm text-white/95 shadow-xl w-full justify-center transition-all hover:bg-black/30">
                <LiveClock className="text-white flex items-center justify-center gap-2" />
              </div>
            </div>

            {/* Copyright badge at bottom */}
            <div className="relative z-10 text-[10px] font-bold uppercase text-white/60 tracking-[0.2em] border-t border-white/20 pt-5">
              <span>© 2026 SECURE SYSTEM</span>
            </div>

          </div>

          {/* Right Column */}
          <div className="md:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-white/5 backdrop-blur-xl">
            <div className="w-full max-w-md mx-auto">
              
              {/* Profile Cards Selection Grid */}
              {!selectedUser ? (
                <div className="space-y-8">
                  <div className="mb-8 text-left">
                    <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                      Sign In
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm">Select your profile to access the system</p>
                  </div>

                  {/* Profile Cards list - exact match with 2-column gap-2 spacing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeUsers.map(u => {
                      const isAdmin = u.role === 'admin';
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setSelectedUser(u);
                            setPassword('');
                            setError('');
                          }}
                          className={`w-full p-5 flex items-center gap-5 border rounded-[28px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer group ${
                            isAdmin 
                              ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 shadow-[0_4px_24px_0_rgba(0,0,0,0.1)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/15'
                          }`}
                        >
                          {/* Profile rounded icon area */}
                          <div className={`h-14 w-14 rounded-[20px] flex items-center justify-center shrink-0 shadow-inner transition-transform group-hover:scale-110 ${
                            isAdmin ? 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white' : 'bg-white/10 text-slate-300'
                          }`}>
                            {isAdmin ? <Shield size={24} /> : <UserIcon size={24} />}
                          </div>
                          
                          {/* Profile name and tag details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-lg font-semibold text-white tracking-tight whitespace-normal break-words leading-tight mb-1.5">
                              {u.name}
                            </p>
                            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-widest block">
                              {isAdmin ? 'Super Admin' : 'Officer Login'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Password Entrance Frame (Exact Match to Screens) */
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Pill Back Button */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUser(null);
                        setPassword('');
                        setError('');
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white transition-all px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer tracking-wide border border-white/10 backdrop-blur-sm shadow-sm"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Profile Indicator Card */}
                  <div className="bg-white/10 border border-white/20 p-5 rounded-[28px] flex items-center gap-5 shadow-lg backdrop-blur-md">
                    <div className="h-14 w-14 rounded-[20px] flex items-center justify-center shrink-0 bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-inner">
                      {selectedUser.role === 'admin' ? <Shield size={24} /> : <UserIcon size={24} />}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white text-lg leading-tight">
                        {selectedUser.name}
                      </h4>
                      <p className="text-sm font-medium text-slate-300 mt-1">
                        Enter passcode
                      </p>
                    </div>
                  </div>

                  {/* Error Notification Alert */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-2xl text-sm font-medium leading-normal backdrop-blur-sm shadow-lg">
                      {error}
                    </div>
                  )}

                  {/* Password Entry Area */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <input 
                        type={showPass ? 'text' : 'password'} 
                        placeholder="••••••••••••" 
                        value={password} 
                        onChange={e => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        autoFocus
                        className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-[24px] font-bold text-white outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 transition-all text-lg tracking-widest text-center sm:text-left shadow-inner placeholder:text-white/20 backdrop-blur-sm" 
                      />
                      
                      {password && (
                        <button 
                          type="button" 
                          onClick={() => setShowPass(!showPass)} 
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 outline-none cursor-pointer px-3 py-1 bg-cyan-950/40 rounded-lg"
                        >
                          {showPass ? 'Hide' : 'Show'}
                        </button>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.98] text-white font-bold py-5 px-6 rounded-[24px] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] cursor-pointer shadow-[0_8px_30px_rgb(6,182,212,0.3)] mt-8"
                    >
                      <span>Secure Login</span>
                      <ChevronRight size={18} className="text-cyan-100" />
                    </button>
                  </form>

                </div>
              )}

              {/* Spacing alignment */}
              <div className="pt-2"></div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

