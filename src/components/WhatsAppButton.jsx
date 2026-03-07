export default function WhatsAppButton() {
  return (
    
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: 90, right: 24, zIndex: 999,
        width: 52, height: 52, borderRadius: 50,
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        textDecoration: 'none', fontSize: 26
      }}
    >
      💬
    </a>
  );
}
