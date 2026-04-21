import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, MapPin, Apple, Play } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isMenu = location.pathname === '/menu';

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10 h-20 px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="font-display font-black text-5xl text-kfc-red tracking-tighter italic uppercase drop-shadow-[0_0_10px_rgba(200,16,46,0.5)]">KFC</Link>
        <div className="flex gap-4 md:gap-8 text-sm font-black tracking-widest uppercase items-center">
          <Link to="/menu" className="text-white hover:text-kfc-red transition-colors">Menu</Link>
          <Link to="/deals" className="text-white hover:text-kfc-red transition-colors">Deals</Link>
          <Link to="/stores" className="text-white/60 hover:text-white transition-colors hidden md:block">Stores</Link>
          <Link to="/order" className="bg-kfc-red text-white hover:bg-white hover:text-black transition-colors px-6 py-2.5 rounded-full shadow-[0_0_10px_rgba(200,16,46,0.3)]">Order</Link>
        </div>
      </nav>

      <main className="min-h-screen flex flex-col pt-0 pb-32">
        {children}
      </main>

      {/* Sleek Footer */}
      <footer className="bg-black text-white py-16 px-6 md:px-10 border-t border-white/10 pb-40 md:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-display font-black text-4xl italic uppercase text-kfc-red tracking-tighter mb-6">KFC</h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              We make Finger Lickin' Good fried chicken using the Colonel's Original Recipe of 11 herbs and spices. Always fresh, always original.
            </p>
            <div className="flex gap-4">
              <Link to="/stores" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-kfc-red transition-colors border border-white/10 px-4 py-2 rounded-full">
                <MapPin size={14} /> Find a Store
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-white/50">Our Menu</h4>
            <div className="flex flex-col gap-3 text-sm font-bold">
              <Link to="/menu" className="hover:text-kfc-red transition-colors">Chicken</Link>
              <Link to="/menu" className="hover:text-kfc-red transition-colors">Burgers</Link>
              <Link to="/menu" className="hover:text-kfc-red transition-colors">Sides & Desserts</Link>
              <Link to="/deals" className="hover:text-kfc-red transition-colors">Today's Deals</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-white/50">Colonel's Club</h4>
            <div className="flex flex-col gap-3 text-sm font-bold">
              <p className="hover:text-kfc-red transition-colors cursor-pointer">Join Now</p>
              <p className="hover:text-kfc-red transition-colors cursor-pointer">Rewards Info</p>
              <p className="hover:text-kfc-red transition-colors cursor-pointer">My Account</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-white/50">Get the App</h4>
            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <Apple size={24} className="text-white" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-white/50">Download on the</p>
                  <p className="font-black text-sm">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <Play size={24} className="text-white" fill="white" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-white/50">Get it on</p>
                  <p className="font-black text-sm">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} KFC Kenya. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
          </div>
        </div>
      </footer>

      {/* Global CRO Sticky CTA: Always visible on mobile */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#1a1a1a] text-white p-4 flex justify-between items-center z-50 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <p className="text-[10px] font-bold text-kfc-gold uppercase tracking-widest">Nearest Deal</p>
          <p className="font-black text-xl italic uppercase font-display text-white drop-shadow-md">KES 199 Streetwise</p>
        </div>
        <Link to="/menu" className="bg-kfc-red text-white px-8 py-3 rounded-full font-black uppercase text-sm tracking-wide shadow-[0_0_15px_rgba(200,16,46,0.3)] animate-pulse border border-red-500/50">
          Order Now
        </Link>
      </div>

      {/* Bottom Bar: CRO Dashboard */}
      <div className="hidden md:flex fixed bottom-0 left-0 w-full h-24 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-10 items-center justify-between z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex gap-12 items-center">
            <div>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1 shadow-sm">Colonel's Club</p>
              <div className="flex items-center gap-3">
                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
                  <div className="w-[75%] h-full bg-gradient-to-r from-kfc-gold to-yellow-300"></div>
                </div>
                <span className="text-xs font-bold text-white">185 / 250 pts</span>
              </div>
              <p className="text-[10px] text-kfc-gold font-bold mt-1 uppercase tracking-widest">65 pts to next FREE BUCKET</p>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Cart Summary</p>
              <p className="text-xl font-black italic uppercase font-display text-white">0 Items — KES 0.00</p>
            </div>
          </div>
          <Link to="/order" className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl transition-all shadow-lg">
            Checkout
          </Link>
        </div>
      </div>

      {/* Floating Colonel AI Chatbot */}
      <div className="fixed bottom-28 md:bottom-32 right-6 md:right-10 z-50 group">
        <button className="bg-gradient-to-tr from-kfc-red to-red-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(200,16,46,0.5)] cursor-pointer border-2 border-white/20 transition-transform group-hover:scale-110">
          <MessageCircle size={28} className="drop-shadow-md" />
        </button>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Chat with the Colonel
        </div>
      </div>
    </>
  );
}
