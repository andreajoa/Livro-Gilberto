import { createContext, useContext, useState, useEffect } from 'react';

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [lead, setLead] = useState(() => {
    try {
      const saved = localStorage.getItem('gs_lead');
      return saved ? JSON.parse(saved) : { email: '', phone: '', name: '', captured: false };
    } catch { return { email: '', phone: '', name: '', captured: false }; }
  });

  const [visitCount, setVisitCount] = useState(() => {
    try { return parseInt(localStorage.getItem('gs_visits') || '0'); } catch { return 0; }
  });

  const [cartAbandoned, setCartAbandoned] = useState(() => {
    try { return localStorage.getItem('gs_cart_abandoned') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('gs_lead', JSON.stringify(lead)); } catch {}
  }, [lead]);

  useEffect(() => {
    const count = visitCount + 1;
    setVisitCount(count);
    try { localStorage.setItem('gs_visits', count.toString()); } catch {}
  }, []);

  const saveLead = (data) => {
    setLead({ ...data, captured: true });
  };

  const markCartAbandoned = () => {
    setCartAbandoned(true);
    try { localStorage.setItem('gs_cart_abandoned', 'true'); } catch {}
  };

  const clearCartAbandoned = () => {
    setCartAbandoned(false);
    try { localStorage.removeItem('gs_cart_abandoned'); } catch {}
  };

  return (
    <LeadContext.Provider value={{ lead, saveLead, visitCount, cartAbandoned, markCartAbandoned, clearCartAbandoned }}>
      {children}
    </LeadContext.Provider>
  );
}

export const useLead = () => useContext(LeadContext);
