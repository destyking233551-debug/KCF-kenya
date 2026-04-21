import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Phone, Search } from "lucide-react";

const MOCK_STORES = [
  {
    id: 1,
    name: "KFC Kilimani",
    address: "Wood Avenue Plaza, Argwings Kodhek Rd",
    distance: "1.2 km",
    status: "Open",
    hours: "09:00 AM - 11:00 PM",
    features: ["Delivery", "Collection", "Drive Thru"]
  },
  {
    id: 2,
    name: "KFC Westlands",
    address: "Woodvale Grove, Westlands",
    distance: "3.5 km",
    status: "Open",
    hours: "10:00 AM - 11:00 PM",
    features: ["Delivery", "Collection"]
  },
  {
    id: 3,
    name: "KFC CBD Kimathi",
    address: "Kimathi Street, Next to Nation Centre",
    distance: "4.8 km",
    status: "Open",
    hours: "07:00 AM - 10:00 PM",
    features: ["Collection"]
  }
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStore, setActiveStore] = useState(MOCK_STORES[0]);
  
  return (
    <div className="min-h-screen bg-kfc-dark px-6 py-8 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar: Store List */}
      <div className="w-full md:w-[400px] shrink-0 flex flex-col h-[calc(100vh-80px)]">
        <h1 className="font-display font-black text-5xl uppercase italic text-white mb-6 tracking-tight">Find a Store</h1>
        
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search by city or neighborhood..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-kfc-red transition-all text-white placeholder:text-white/30"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        </div>
        
        <div className="flex gap-2 mb-6">
          <button className="flex-1 bg-white/10 hover:bg-white/20 transition-colors text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest border border-white/10">
            <Navigation size={14} /> Near Me
          </button>
        </div>
        
        <div className="overflow-y-auto pr-2 space-y-4 pb-32 no-scrollbar flex-1">
           {MOCK_STORES.map(store => (
             <div 
               key={store.id} 
               onClick={() => setActiveStore(store)}
               className={`p-5 rounded-2xl border cursor-pointer transition-all ${activeStore.id === store.id ? 'bg-white/10 border-kfc-red shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
             >
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-display font-black text-2xl uppercase text-white leading-none">{store.name}</h3>
                 <span className="text-xs font-bold text-kfc-gold uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{store.distance}</span>
               </div>
               <p className="text-white/50 text-sm mb-4 leading-relaxed">{store.address}</p>
               <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                 <span className="flex items-center gap-1 group-hover:text-white"><Clock size={12} /> {store.status}</span>
                 <span className="text-green-400">Open until 11PM</span>
               </div>
             </div>
           ))}
        </div>
      </div>
      
      {/* Main Area: Map & Details */}
      <div className="flex-1 rounded-[2rem] overflow-hidden border border-white/10 h-[50vh] md:h-[calc(100vh-100px)] relative group bg-[#111]">
        {/* Placeholder for maps */}
        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Nairobi,Kenya&zoom=13&size=800x800&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53&style=feature:landscape|element:geometry|color:0x08304b&style=feature:poi|element:geometry|color:0x0c4152&style=feature:road.highway|element:geometry.fill|color:0x000000&style=feature:road.highway|element:geometry.stroke|color:0x0b434f&style=feature:road.arterial|element:geometry.fill|color:0x000000&style=feature:road.arterial|element:geometry.stroke|color:0x0b3d51&style=feature:road.local|element:geometry|color:0x000000&style=feature:transit|element:geometry|color:0x146474&style=feature:water|element:geometry|color:0x021019')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        
        {/* Map UI Overlay */}
        <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-end">
           <div className="pointer-events-auto bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl max-w-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-kfc-red rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(200,16,46,0.5)]">
                 <MapPin className="text-white" size={20} />
               </div>
               <div>
                 <h3 className="font-display font-black text-2xl uppercase text-white leading-none">{activeStore.name}</h3>
                 <p className="text-kfc-gold font-bold text-xs tracking-widest uppercase mt-1">{activeStore.distance} away</p>
               </div>
             </div>
             
             <div className="space-y-3 mb-6">
               <div className="flex items-start gap-3 mt-4">
                 <Clock size={16} className="text-white/40 mt-0.5" />
                 <div>
                   <p className="text-white text-sm font-bold">{activeStore.status}</p>
                   <p className="text-white/50 text-xs">{activeStore.hours}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Phone size={16} className="text-white/40" />
                 <p className="text-white text-sm font-bold">+254 700 000 000</p>
               </div>
             </div>
             
             <div className="flex flex-wrap gap-2 mb-6">
                {activeStore.features.map(f => (
                  <span key={f} className="text-[10px] font-bold uppercase tracking-widest border border-white/20 bg-white/5 text-white/70 px-2 py-1 rounded">
                    {f}
                  </span>
                ))}
             </div>
             
             <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg text-sm">
               Order from Here
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
