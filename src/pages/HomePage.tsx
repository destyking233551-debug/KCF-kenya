import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, TrendingUp, Sparkles, Search } from "lucide-react";
import { ai } from "../lib/gemini";

// Mock User Context
const mockContext = {
  profile: { isReturning: true, favoriteCategory: "Chicken", lastOrderDaysAgo: 5 },
  time: new Date().toLocaleTimeString('en-KE', { timeZone: 'Africa/Nairobi' }),
  dayOfWeek: new Date().toLocaleDateString('en-KE', { weekday: 'long' }),
  location: "Nairobi - Kilimani",
  waitTime: 12,
  promos: [{ id: 'p1', title: 'Streetwise 2 at KES 350' }]
};

export default function HomePage() {
  const [heroData, setHeroData] = useState({
    headline: "Lunch in Kilimani?",
    subCopy: "The Colonel suggests a Streetwise 2 to fuel your afternoon. Ready in 12 minutes.",
    ctaPrimary: "Order Now",
    ctaSecondary: "Full Menu",
    insightText: "243 people in Nairobi ordered in the last hour",
    recommendedItems: ["item1", "item2", "item3"],
    isLoading: true
  });

  useEffect(() => {
    async function fetchAiHero() {
      try {
        const prompt = `
          User profile: ${JSON.stringify(mockContext.profile)}
          Current time: ${mockContext.time}
          Day of week: ${mockContext.dayOfWeek}
          User location: ${mockContext.location}
          Nearest store wait time: ${mockContext.waitTime} minutes
          Active promotions: ${JSON.stringify(mockContext.promos)}
          
          Generate a JSON response with:
          - headline (max 8 words, punchy, personalized to time/location)
          - subCopy (max 20 words, include urgency or personalization)
          - ctaPrimary (3-4 words)
          - ctaSecondary (3-4 words)  
          - recommendedItems (array of 3 item IDs from menu: 'item1', 'item2', 'item3')
          - insightText (1 sentence, actionable, time/location aware)
          
          Brand voice: bold, warm, slightly cheeky. KFC Kenya tone. 
          Use Kenyan English / subtle Sheng flavor if appropriate for demographic (e.g., 'Nairobi').
          DO NOT wrap in a markdown block, just output the raw JSON object.
        `;
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          setHeroData({ ...parsed, isLoading: false });
        }
      } catch (err) {
        console.error("Gemini AI Hero generation failed:", err);
        setHeroData(prev => ({ ...prev, isLoading: false }));
      }
    }
    fetchAiHero();
  }, []);

  const headlineWords = heroData.headline.split(' ');
  const lastWord = headlineWords.pop();
  const restHeadline = headlineWords.join(' ');

  return (
    <div className="flex flex-col w-full relative">
      {/* Live Ticker */}
      <div className="bg-kfc-gold text-black py-2 px-6 md:px-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs font-black uppercase tracking-tighter">
        <span className="flex items-center gap-1 text-center">
          <span className="w-2 h-2 bg-kfc-red rounded-full animate-pulse"></span>
          LIVE: {heroData.insightText}
        </span>
        <span className="hidden md:inline opacity-30">|</span>
        <span className="text-center">FREE DELIVERY ON ORDERS ABOVE KES 1500</span>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row px-6 md:px-10 py-12 gap-12 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center max-w-2xl transition-opacity duration-500" style={{ opacity: heroData.isLoading ? 0.5 : 1 }}>
          <div className="inline-flex items-center gap-2 bg-kfc-red/10 border border-kfc-red/30 text-kfc-red px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-6 w-fit">
            <Sparkles size={12} />
            AI Personalized Deal for You
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-black italic uppercase leading-[0.85] tracking-tighter mb-6">
            {restHeadline} <br className="hidden sm:block"/><span className="text-kfc-red">{lastWord}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-medium max-w-lg mb-8 leading-relaxed">
            {heroData.subCopy}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/order" className="bg-kfc-red text-center text-white px-10 py-4 md:py-5 rounded-full font-display font-bold text-2xl uppercase italic tracking-wide shadow-lg shadow-kfc-red/30 border-b-4 border-red-900 transition-transform hover:translate-y-[2px] hover:border-b-2">
              {heroData.ctaPrimary}
            </Link>
            <Link to="/menu" className="bg-white/10 text-center backdrop-blur-md text-white px-10 py-4 md:py-5 rounded-full font-display font-bold text-2xl uppercase italic border border-white/20 hover:bg-white/20 transition-colors">
              {heroData.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Visual Product Column */}
        <div className="w-full md:w-[400px] flex flex-col gap-6">
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-kfc-red/20 blur-3xl group-hover:bg-kfc-red/30 transition-colors"></div>
            <div className="relative z-10">
              <p className="text-kfc-gold font-bold text-sm uppercase mb-1 tracking-widest">Hot Pick</p>
              <h3 className="text-3xl font-display font-black italic uppercase mb-4">Streetwise 2</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-black font-display tracking-tight">KES 350</span>
                <span className="text-white/40 line-through text-lg mb-1 font-bold">KES 420</span>
              </div>
              <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                <img src="https://picsum.photos/seed/kfc-hotpick/400/400?blur=1" alt="Streetwise 2" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" referrerPolicy="no-referrer" />
                <div className="text-white/40 font-display text-4xl font-black italic uppercase tracking-tighter z-10 rotate-[-10deg]">Crunch Box</div>
              </div>
              <button className="w-full bg-white hover:bg-gray-200 transition-colors text-black font-bold py-3 rounded-xl uppercase text-sm tracking-widest">
                Quick Add +
              </button>
            </div>
          </div>
          
          {/* AI Search Shortcut */}
          <Link to="/menu" className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors block">
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-3">Smart Search</p>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white/50 italic">
              <Search size={16} />
              "Something spicy under KES 500"
            </div>
          </Link>
        </div>
      </main>

      {/* Recommended for You Grid (styled sleek) */}
      <section className="py-12 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <h2 className="font-display font-black text-4xl uppercase italic mb-8 tracking-tighter">More for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {heroData.recommendedItems.map((itemId, idx) => (
             <div key={idx} className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
                <div className="w-40 h-40 bg-white/5 rounded-full mb-6 relative overflow-hidden flex items-center justify-center">
                  <img src={"https://picsum.photos/seed/kfc-sleek-" + idx + "/400/400?blur=1"} alt="Product" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" referrerPolicy="no-referrer" />
                  <span className="relative z-10 text-white/50 font-display text-2xl font-black italic shadow-black/50 drop-shadow-md">KFC ITEM</span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase mb-2 group-hover:text-kfc-red transition-colors italic">Streetwise {idx + 2}</h3>
                <p className="text-white/60 mb-6 font-bold text-lg">KES {350 + (idx * 150)}</p>
                <button className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm">
                  Add to Cart
                </button>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
