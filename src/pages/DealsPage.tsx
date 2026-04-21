import { Clock, Tag } from "lucide-react";

export default function DealsPage() {
  const deals = [
    {
      id: 1,
      title: "Streetwise 2 Bucket",
      discount: "20% OFF",
      description: "2 pieces of chicken and regular chips.",
      price: 350,
      originalPrice: 420,
      expiresIn: "02:15:30",
    },
    {
      id: 2,
      title: "Family Feast",
      discount: "Save KES 500",
      description: "10 pieces of chicken, 2 large chips, 1.5L Pepsi.",
      price: 2100,
      originalPrice: 2600,
      expiresIn: "05:45:00",
    },
  ];

  return (
    <div className="min-h-screen bg-kfc-dark px-6 py-8 w-full max-w-7xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display font-black text-6xl uppercase italic text-white mb-4 tracking-tight">Today's Deals</h1>
        <p className="text-white/60 font-medium text-lg max-w-2xl">
          Exclusive online offers generated just for you. Grab them before the timer runs out!
        </p>
      </div>

      {/* Featured Hero Deal */}
      <div className="bg-kfc-red rounded-[2rem] p-8 md:p-12 text-white mb-12 shadow-2xl shadow-kfc-red/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group border border-white/10">
        <div className="absolute inset-0 bg-black opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        <div className="relative z-10 md:max-w-xl">
          <span className="inline-block bg-black/30 text-white font-black tracking-widest text-xs px-4 py-2 rounded-full mb-6 uppercase shadow-md border border-white/20">
            Limited Time
          </span>
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase italic leading-none mb-4 drop-shadow-md">
            The Colonel's App Exclusive
          </h2>
          <p className="font-medium text-lg mb-8 text-white/90">
            Get 30% off any Zinger Meal when you order delivery today. Applies automatically at checkout.
          </p>
          <button className="bg-black text-white hover:bg-white hover:text-black font-display font-bold text-2xl uppercase px-10 py-4 rounded-full transition-all shadow-lg hover:scale-105 border border-white/10">
            Claim Deal
          </button>
        </div>
        <div className="relative z-10 shrink-0">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <span className="font-display font-black text-4xl italic uppercase transform -rotate-12 shadow-sm text-white">ZINGER DEAL</span>
          </div>
        </div>
      </div>

      {/* Grid Deals */}
      <h3 className="font-display font-black text-4xl uppercase italic mb-6 text-white tracking-tighter">More for you</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map(deal => (
          <div key={deal.id} className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-[2rem] border border-white/10 p-6 flex flex-col shadow-lg hover:shadow-2xl hover:border-white/20 transition-all relative overflow-hidden group">
             <div className="absolute top-0 right-0 bg-kfc-gold text-black font-black px-4 py-2 rounded-bl-2xl shadow-sm z-20">
               {deal.discount}
             </div>
             <div className="w-full h-40 bg-white/5 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                 <img src={"https://picsum.photos/seed/deal-" + deal.id + "/400/200?blur=1"} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-500" alt="Deal placeholder" referrerPolicy="no-referrer" />
                 <span className="relative z-10 text-white/60 font-display text-2xl font-black italic shadow-black/50 drop-shadow-md">DEAL IMAGE</span>
             </div>
             
             <h4 className="font-display font-black text-3xl uppercase text-white mb-2">{deal.title}</h4>
             <p className="text-white/50 font-medium mb-6 flex-1">{deal.description}</p>
             
             <div className="flex justify-between items-end mb-6">
               <div>
                 <span className="text-white/40 line-through font-bold block text-sm">KES {deal.originalPrice}</span>
                 <span className="text-white font-black text-3xl font-display block tracking-tight">KES {deal.price}</span>
               </div>
               <div className="flex items-center gap-2 text-kfc-gold bg-white/5 border border-white/10 px-3 py-1.5 rounded-md font-bold text-sm">
                 <Clock size={14} className="text-kfc-gold animate-pulse" />
                 {deal.expiresIn}
               </div>
             </div>
             
             <button className="w-full bg-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white hover:text-black transition-colors uppercase gap-2 flex items-center justify-center tracking-widest text-sm text-center">
               <Tag size={16} />
               Add to Order
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}
