import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, CreditCard, CheckCircle2, ChevronRight, Check } from "lucide-react";

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const cart = [
    { id: 1, name: "Streetwise 2", price: 350, qty: 2 },
    { id: 101, name: "Pepsi 500ml", price: 120, qty: 1 } // UPSell item
  ];
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = orderType === 'delivery' ? 100 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate M-Pesa STK Push
    setTimeout(() => {
      setStep(4); // Success step
      setIsProcessing(false);
    }, 3000);
  };

  if (step === 4) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)] border border-green-500/30">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="font-display font-black text-5xl uppercase italic text-white mb-4">Order Confirmed!</h1>
        <p className="text-white/60 font-medium text-lg mb-8">
          Your order (#KFC-{Math.floor(Math.random() * 10000)}) has been received and is being prepared. It will be {orderType === 'delivery' ? 'delivered to your address' : 'ready for collection'}.
        </p>
        <div className="bg-white/5 border text-left border-white/10 rounded-3xl p-6 w-full mb-8 shadow-lg">
           <p className="font-bold text-white/40 uppercase text-xs tracking-widest mb-2">Order Total</p>
           <p className="font-display font-black text-4xl mb-4 text-white">KES {total}</p>
           <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
             <Check size={18} />
             Payment Successful
           </div>
        </div>
        <Link to="/" className="bg-white/10 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm w-full text-center border border-white/20">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kfc-dark px-6 py-8 w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Main Flow */}
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="font-display font-black text-6xl uppercase italic text-white mb-2 tracking-tight">Checkout</h1>
          <p className="text-white/50 font-medium font-bold">Fast, secure, Finger Lickin' Good.</p>
        </div>

        {/* Step 1: Order Type */}
        <div className="bg-[#1a1a1a] rounded-[2rem] p-6 md:p-8 shadow-lg border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
          <h2 className="font-display font-black text-3xl uppercase mb-6 flex items-center gap-3 relative z-10 text-white">
             <span className="bg-white/10 text-white border border-white/20 w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span>
             Receiving Method
          </h2>
          <div className="flex gap-4 mb-6 relative z-10">
            <button 
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-4 rounded-xl font-bold uppercase transition-all border-2 ${orderType === 'delivery' ? 'border-kfc-red bg-kfc-red/10 text-white shadow-[0_0_15px_rgba(200,16,46,0.2)]' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
            >
              Delivery
            </button>
            <button 
              onClick={() => setOrderType('collection')}
              className={`flex-1 py-4 rounded-xl font-bold uppercase transition-all border-2 ${orderType === 'collection' ? 'border-kfc-red bg-kfc-red/10 text-white shadow-[0_0_15px_rgba(200,16,46,0.2)]' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
            >
              Collection
            </button>
          </div>
          
          {orderType === 'delivery' ? (
             <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4 relative z-10">
               <MapPin className="text-kfc-red shrink-0 mt-1" />
               <div className="flex-1">
                 <p className="font-bold text-white">Home Address</p>
                 <p className="text-white/50 text-sm mt-1">Apt 4B, 123 Argwings Kodhek Rd, Kilimani, Nairobi</p>
               </div>
               <button className="text-kfc-red font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">Change</button>
             </div>
          ) : (
             <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4 relative z-10">
               <MapPin className="text-kfc-red shrink-0 mt-1" />
               <div className="flex-1">
                 <p className="font-bold text-white">KFC Kilimani</p>
                 <p className="text-white/50 text-sm mt-1">Wood Avenue Plaza, Kilimani</p>
                 <p className="text-kfc-gold font-bold text-xs mt-1 tracking-wider uppercase">Wait time: 12 mins</p>
               </div>
               <button className="text-kfc-red font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">Change Store</button>
             </div>
          )}
        </div>

        {/* Step 2: Payment */}
        <div className="bg-[#1a1a1a] rounded-[2rem] p-6 md:p-8 shadow-lg border border-white/10 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 blur-3xl rounded-full"></div>
          <h2 className="font-display font-black text-3xl uppercase mb-6 flex items-center gap-3 relative z-10 text-white">
             <span className="bg-white/10 text-white border border-white/20 w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span>
             Payment Method
          </h2>
          
          <div className="space-y-4 relative z-10">
             <label className={`block border-2 rounded-xl p-5 cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'border-white/10 hover:border-white/30 bg-white/5'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} className="w-5 h-5 text-green-500 focus:ring-green-500 bg-transparent border-white/20" />
                    <div>
                      <p className="font-bold text-white">M-Pesa STK Push</p>
                      <p className="text-sm text-white/50">Pay directly from your phone</p>
                    </div>
                  </div>
                  <Phone className={paymentMethod === 'mpesa' ? "text-green-400" : "text-white/30"} />
                </div>
                {paymentMethod === 'mpesa' && (
                  <div className="mt-5 pt-5 border-t border-green-500/20 animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-white/50 mb-2">M-Pesa Phone Number</label>
                    <input type="tel" defaultValue="0712 345 678" className="w-full border border-white/10 rounded-xl p-4 font-bold text-lg bg-black/50 text-white outline-none focus:border-green-500 transition-colors shadow-inner" />
                  </div>
                )}
             </label>

             <label className={`block border-2 rounded-xl p-5 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-white/10 hover:border-white/30 bg-white/5'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 bg-transparent border-white/20 text-white" />
                    <div>
                      <p className="font-bold text-white">Credit / Debit Card</p>
                      <p className="text-sm text-white/50">Visa, Mastercard</p>
                    </div>
                  </div>
                  <CreditCard className={paymentMethod === 'card' ? "text-white" : "text-white/30"} />
                </div>
             </label>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:w-[400px] w-full">
        <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-[2rem] p-8 shadow-2xl border border-white/10 sticky top-24">
          <h3 className="font-display font-black text-3xl uppercase border-b border-white/10 pb-4 mb-6 text-white">Your Cart</h3>
          
          <div className="space-y-6 mb-8">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <span className="font-black text-white bg-white/10 px-2 py-1 rounded text-sm shrink-0 border border-white/10">{item.qty}x</span>
                  <div>
                    <p className="font-bold text-white leading-tight mb-1">{item.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Edit</p>
                  </div>
                </div>
                <p className="font-black text-white shrink-0 mt-1">KES {item.price * item.qty}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-6 mb-8 space-y-3">
            <div className="flex justify-between text-white/60 font-medium">
              <span>Subtotal</span>
              <span className="text-white">KES {subtotal}</span>
            </div>
            <div className="flex justify-between text-white/60 font-medium">
              <span>Delivery Fee</span>
              <span className="text-white">KES {deliveryFee}</span>
            </div>
            <div className="flex justify-between font-display font-black text-4xl pt-4 text-kfc-red mt-4 border-t border-white/10">
              <span className="text-white">Total</span>
              <span>KES {total}</span>
            </div>
          </div>
          
          <button 
            disabled={!paymentMethod || isProcessing}
            onClick={handleCheckout}
            className="w-full bg-white text-black py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing...' : `Pay KES ${total}`}
            {!isProcessing && <ChevronRight size={18} />}
          </button>
          
          {isProcessing && paymentMethod === 'mpesa' && (
             <p className="text-xs tracking-wider text-center font-bold text-green-400 mt-6 animate-pulse uppercase">
               Please check your phone for the M-Pesa prompt.
             </p>
          )}
        </div>
      </div>
    </div>
  );
}
