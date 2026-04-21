import React, { useState } from "react";
import { Search, Flame, Leaf, Filter } from "lucide-react";
import { ai } from "../lib/gemini";
import UpsellModal from "../components/UpsellModal";

const MOCK_MENU = [
  { id: 1, name: "Zinger Burger", price: 650, cal: 550, spicy: true, veg: false, cat: "Burgers" },
  { id: 2, name: "21 Piece Bucket", price: 3200, cal: 4200, spicy: false, veg: false, cat: "Chicken" },
  { id: 3, name: "Streetwise 2", price: 350, cal: 850, spicy: false, veg: false, cat: "Combos" },
  { id: 4, name: "Spicy Chips", price: 200, cal: 350, spicy: true, veg: true, cat: "Sides" },
  { id: 5, name: "Colonel Burger", price: 550, cal: 480, spicy: false, veg: false, cat: "Burgers" },
  { id: 6, name: "Veggie Burger", price: 500, cal: 420, spicy: false, veg: true, cat: "Burgers" },
  { id: 7, name: "Pepsi 500ml", price: 150, cal: 200, spicy: false, veg: true, cat: "Drinks" }
];

const CATEGORIES = ["All", "Burgers", "Chicken", "Sides", "Drinks", "Combos", "Kids"];

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [displayedMenu, setDisplayedMenu] = useState(MOCK_MENU);
  const [upsellItem, setUpsellItem] = useState<{ id: number, name: string, price: number } | null>(null);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsAiLoading(true);
    try {
      const prompt = `
        User query: "${searchQuery}"
        Available Menu Items: ${JSON.stringify(MOCK_MENU)}
        
        Filter the menu items that best match the user's natural language request. Be smart about flavors, price constraints, and dietary needs.
        Return ONLY a JSON array of the matching item IDs. e.g. [1, 4]
      `;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      if (response.text) {
        const matchingIds = JSON.parse(response.text.trim());
        if (Array.isArray(matchingIds)) {
           setDisplayedMenu(MOCK_MENU.filter(item => matchingIds.includes(item.id)));
        }
      }
    } catch (err) {
      console.error(err);
      // Fallback: simple text search
      setDisplayedMenu(MOCK_MENU.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    setIsAiLoading(false);
  };

  const filteredMenu = activeCategory === "All" 
    ? displayedMenu 
    : displayedMenu.filter(item => item.cat === activeCategory);

  const handleAddToCart = (item: any) => {
    // Show upsell modal
    setUpsellItem(item);
  };

  return (
    <div className="min-h-screen bg-kfc-dark px-6 py-8 w-full max-w-7xl mx-auto">
      {upsellItem && (
        <UpsellModal 
           triggerItem={upsellItem} 
           onClose={() => setUpsellItem(null)} 
           onConfirm={() => { alert('Added to Cart!'); setUpsellItem(null); }}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="font-display font-black text-6xl uppercase italic text-white mb-2 tracking-tight">Our Menu</h1>
          <p className="text-white/60 font-medium text-lg">Freshly prepared. Always Original.</p>
        </div>
        
        {/* Gemini AI Search Bar */}
        <form onSubmit={handleAISearch} className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-kfc-red transition-colors">
            <Search size={22} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try 'something spicy under KES 400'..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-28 outline-none focus:border-kfc-red transition-all shadow-sm text-sm font-semibold text-white placeholder:italic placeholder:text-white/30"
          />
          <div className="absolute right-2 top-2 bottom-2">
            <button 
              type="submit" 
              disabled={isAiLoading}
              className="h-full bg-white text-black text-[10px] font-black px-6 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-70 flex items-center shadow-md uppercase tracking-widest"
            >
              {isAiLoading ? '...' : 'AI SEARCH'}
            </button>
          </div>
        </form>
      </div>

      {/* Category & Filter Chips */}
      <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar mb-8 border-b border-white/10">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 shadow-sm rounded-full text-sm font-bold shrink-0 hover:bg-white/10 transition-colors text-white">
          <Filter size={18} /> Filters
        </button>
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            onClick={() => { setActiveCategory(cat); setDisplayedMenu(MOCK_MENU); setSearchQuery(""); }}
            className={`px-7 py-2.5 rounded-full text-sm font-bold shrink-0 transition-all shadow-sm border ${
              cat === activeCategory ? 'bg-kfc-red text-white border-kfc-red' : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMenu.map((item) => (
          <div key={item.id} className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-[2rem] overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:border-white/20 transition-all hover:-translate-y-1 group flex flex-col cursor-pointer relative">
            <div className="h-56 bg-white/5 relative w-full flex items-center justify-center overflow-hidden">
               <img src={"https://picsum.photos/seed/kfc-" + item.id + "/400/400?blur=1"} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-overlay opacity-60" referrerPolicy="no-referrer" />
              
              {/* Dietary Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {item.spicy && <span className="bg-[#C8102E]/20 border border-[#C8102E]/30 text-[#C8102E] p-2 rounded-full shadow-lg"><Flame size={16} /></span>}
                {item.veg && <span className="bg-green-500/20 border border-green-500/30 text-green-400 p-2 rounded-full shadow-lg"><Leaf size={16} /></span>}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col z-10 relative">
              <div className="flex justify-between items-start mb-2 gap-4">
                <h3 className="font-display font-black text-2xl uppercase leading-tight text-white">{item.name}</h3>
                <span className="text-xs text-white/50 font-bold bg-white/5 border border-white/10 px-2 py-1 rounded-md shrink-0">{item.cal} cal</span>
              </div>
              <p className="text-white font-display font-black tracking-tight text-3xl mt-auto mb-6">KES {item.price}</p>
              
              <button 
                className="w-full py-3.5 rounded-xl bg-white/10 text-white font-bold hover:bg-white hover:text-black transition-colors uppercase text-sm tracking-widest"
                onClick={() => handleAddToCart(item)}
              >
                Quick Add +
              </button>
            </div>
          </div>
        ))}
        {filteredMenu.length === 0 && (
          <div className="col-span-full text-center py-24 text-white/40 font-medium text-lg">
            No items matched your search. Try asking the AI for something else!
          </div>
        )}
      </div>
    </div>
  );
}
