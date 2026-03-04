import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WhatsAppButton = ({ phoneNumber = '55XXXXXXXXXXX' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
          <MessageCircle size={28} className="text-white" />
        </div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: showTooltip ? 1 : 0, x: showTooltip ? 0 : 10 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-navy px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg"
        >
          Dúvidas? Fale conosco
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white transform rotate-45" />
        </motion.div>
      </motion.div>
    </a>
  );
};

export default WhatsAppButton;
