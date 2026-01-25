import { motion } from 'framer-motion';
import { Phone, Instagram, Mail } from 'lucide-react';

const FloatingSocials = () => {
  const socials = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/254757700391",
      color: "bg-[#25D366]"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://instagram.com/krugerrbrendt", // Assuming handle
      color: "bg-[#E1306C]"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:info@krugerrbrendt.com",
      color: "bg-primary"
    }
  ];

  return (
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 p-2">
      {socials.map((social, idx) => (
        <motion.a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 + idx * 0.1, type: "spring" }}
          whileHover={{ x: -5, scale: 1.1 }}
          className={`${social.color} text-white p-3 rounded-l-lg shadow-lg flex items-center justify-center group relative overflow-hidden`}
          title={social.label}
        >
          {social.icon}
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {social.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingSocials;
