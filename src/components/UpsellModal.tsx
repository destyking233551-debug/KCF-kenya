import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { ai } from "../lib/gemini";

const MOCK_EXTRAS = [
  { id: 101, name: "Pepsi 500ml", price: 150 },
  { id: 102, name: "Spicy Chips", price: 200 },
  { id: 103, name: "Zinger Sauce", price: 50 },
  { id: 104, name: "Coleslaw", price: 180 }
];

interface UpsellModalProps {
  triggerItem: { id: number, name: string, price: number };
  onClose: () => void;
  onConfirm: () => void;
}

export default function UpsellModal({ triggerItem, onClose, onConfirm }: UpsellModalProps) {
  const [upsellData, setUpsellData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateUpsell() {
      try {
        const prompt = `
          The user just added "${triggerItem.name}" to their cart. 
          Available extras: ${JSON.stringify(MOCK_EXTRAS)}
          
          Suggest exactly 1 complementary item to add.
          Return JSON: { "itemId": number, "itemName": "string", "reason": "string (max 8 words)", "discountedPrice": number }
          Prioritize items that pair well. Give a slight discount (10-20% off) for the combo.
        `;
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });

        if (response.text) {
          setUpsellData(JSON.parse(response.text.trim()));
        }
      } catch (err) {
        console.error(err);
        // Fallback
        setUpsellData({
          itemId: 101,
          itemName: "Pepsi 500ml",
          reason: "Perfect to cool down the spice!",
          discountedPrice: 120
        });
      }
      setLoading(false);
    }
    
    generateUpsell();
  }, [triggerItem]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 rounded-[2rem] w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 shadow-kfc-red/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors bg-white/5 rounded-full p-2 z-20">
          <X size={20} />
        </button>

        <div className="h-40 bg-kfc-red/20 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-kfc-red/40 to-transparent"></div>
          <Sparkles className="absolute top-6 left-6 text-kfc-red" size={32} />
          <h2 className="relative z-10 font-display font-black text-5xl text-white uppercase italic tracking-tighter text-center px-6 leading-[0.85] drop-shadow-md">
            Complete the <span className="text-kfc-gold">Combo</span>
          </h2>
        </div>

        <div className="p-8 text-center relative">
          {loading ? (
            <div className="py-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-white/10 border-t-kfc-red rounded-full animate-spin mb-4"></div>
              <p className="font-bold text-white/40 uppercase tracking-widest text-xs text-center">Finding the perfect pairing...</p>
            </div>
          ) : (
            <div>
              <p className="text-kfc-gold font-bold mb-3 uppercase tracking-widest text-[10px]">AI Suggested Pairing</p>
              <h3 className="font-display font-black text-4xl uppercase text-white mb-2">{upsellData.itemName}</h3>
              <p className="text-white/60 font-bold text-sm mb-6 leading-relaxed">"{upsellData.reason}"</p>
              
              <div className="flex justify-center items-end gap-3 mb-8 bg-white/5 border border-white/10 p-4 rounded-xl w-fit mx-auto">
                <span className="text-white/40 line-through font-bold text-sm">KES {MOCK_EXTRAS.find(e => e.id === upsellData.itemId)?.price || 150}</span>
                <span className="text-4xl font-display font-black text-kfc-red tracking-tight">KES {upsellData.discountedPrice}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <button onClick={onConfirm} className="w-full bg-kfc-red text-white py-4 rounded-xl font-display font-bold text-2xl uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg shadow-kfc-red/30">
                  Add for KES {upsellData.discountedPrice}
                </button>
                <button onClick={onClose} className="w-full bg-transparent border border-white/10 text-white/50 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:text-white transition-colors">
                  No thanks, proceed to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
