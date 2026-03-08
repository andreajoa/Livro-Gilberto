import { Package } from 'lucide-react'

export default function BuyDigitalButton({ label, lang }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent(`force-checkout-${lang}`));
  };

  return (
    <button 
      onClick={handleClick}
      className="add-to-cart-btn"
      style={{ padding: '16px 32px', fontSize: 18, width: '100%', maxWidth: '350px', justifyContent: 'center' }}
    >
      <Package size={22} />
      {label}
    </button>
  );
}
