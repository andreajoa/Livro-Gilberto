import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AddToCartButton from '../components/AddToCartButton';
import ShippingCalculator from '../components/ShippingCalculator';

import bannerWide      from '../assets/banners/banner-autor-cta.png';
import bookCover       from '../assets/book/capa-livro.png';
import livroWhiskey    from '../assets/lifestyle/livro-mesa-whiskey.png';
import bannerTransform from '../assets/banners/banner-antes-depois.png';
import authorPointing  from '../assets/author/gilberto-livro-apontando.png';
import livroPresente   from '../assets/lifestyle/livro-embrulhado-presente.png';
import livroStack      from '../assets/lifestyle/livro-stack-marble.png';

const faqItems = [
  { q: 'Como funciona o envio?', a: 'Após confirmação do pedido, o livro é embalado e postado pelos Correios de Santana de Parnaíba — SP. Você recebe o código de rastreamento por email.' },
  { q: 'Qual o prazo de entrega?', a: 'PAC: 5 a 15 dias úteis dependendo da sua região. SEDEX: 1 a 7 dias úteis.' },
  { q: 'Posso devolver o livro?', a: 'Sim. Você tem 7 dias corridos após o recebimento para solicitar devolução, conforme o Código de Defesa do Consumidor.' },
  { q: 'Como acompanho meu pedido?', a: 'Enviamos o código de rastreamento por email logo após a postagem. Acompanhe em rastreamento.correios.com.br.' },
  { q: 'O livro está disponível em versão digital?', a: 'Por enquanto apenas na versão física. O livro foi pensado para ser lido com as mãos.' },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen">

      {/* BLOCO 1 — HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <img src={bannerWide} alt="Como Vencer a Dor de Ser Trocado Por Outro — Gilberto de Souza"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 40% 30%, transparent 60%, rgba(13,27,62,0.75) 100%)', height:'150%' }} />
        <div style={{ position:'relative', zIndex:2, padding:'0 8vw', maxWidth:600 }}>
          <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8 }}>
            <span style={{ display:'inline-block', background:'rgba(0,196,212,0.15)', border:'1px solid rgba(0,196,212,0.3)', color:'#00C4D4', fontSize:11, fontWeight:700, letterSpacing:3, padding:'6px 14px', borderRadius:2, marginBottom:28, textTransform:'uppercase' }}>
              📖 Lançamento 2026
            </span>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(40px,5.5vw,72px)', lineHeight:1.05, color:'#fff', marginBottom:20 }}>
              Como Vencer<br />
              <span style={{ color:'#00C4D4' }}>A Dor de Ser<br />Trocado Por Outro</span>
            </h1>
            <p style={{ fontFamily:"'Cormorant Garant', serif", fontStyle:'italic', fontSize:'clamp(18px,2vw,24px)', color:'#8A9BBF', marginBottom:36 }}>
              Você não está sozinho
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:14 }}>
              <AddToCartButton label="Quero Este Livro" />
              <a href="#historia" style={{ border:'1px solid rgba(255,255,255,0.2)', color:'#fff', padding:'15px 28px', borderRadius:3, textDecoration:'none', fontSize:14, fontWeight:500 }}>
                Conheça a História ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOCO 2 — O LIVRO fade-in */}
      <section style={{ background:'#0D1B3E', padding:'120px 8vw' }}>
        <motion.div
          initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.9 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:80, alignItems:'center', maxWidth:1100, margin:'0 auto' }}
        >
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <motion.img src={bookCover} alt="Capa do livro"
              animate={{ y:[0,-14,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{ width:'min(300px,80%)', borderRadius:4, boxShadow:'24px 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,196,212,0.12)', display:'block' }} />
            <div style={{ width:'55%', height:18, background:'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)', borderRadius:'50%', marginTop:14 }} />
          </div>
          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:16 }}>MANUAL</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3.5vw,46px)', lineHeight:1.15, color:'#fff', marginBottom:12 }}>
              Como Vencer a Dor<br />de Ser Trocado Por Outro
            </h2>
            <p style={{ fontSize:14, color:'#8A9BBF', marginBottom:24 }}>por <strong style={{ color:'#fff' }}>Gilberto de Souza</strong></p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
              {['📚 Livro Físico','🇧🇷 Português','ISBN 978-658462205-0','🗓 2026'].map(m => (
                <span key={m} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'6px 12px', borderRadius:2, fontSize:11, color:'#8A9BBF' }}>{m}</span>
              ))}
            </div>
            <p style={{ fontFamily:"'Cormorant Garant', serif", fontStyle:'italic', fontSize:17, lineHeight:1.8, color:'#B8C8E0', borderLeft:'2px solid #00C4D4', paddingLeft:20, marginBottom:36 }}>
              "A história de um homem que dedicou anos de sua vida a uma mulher, apenas para ser trocado quando ela estava em seu melhor momento. Entre a dor da rejeição, a dúvida sobre seu próprio valor e o medo de nunca encontrar alguém novamente, ele descobre a força da superação."
            </p>
            <AddToCartButton label="Quero Este Livro — R$ 49,90" />
          </div>
        </motion.div>
      </section>

      {/* BLOCO 3 — DOR / livro + whiskey + agenda */}
      <section id="historia" style={{ position:'relative', padding:'120px 8vw', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${livroWhiskey})`, backgroundSize:'cover', backgroundPosition:'center', filter:'saturate(0.5)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(9,20,34,0.9) 0%, rgba(13,27,62,0.88) 100%)' }} />
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:1 }} viewport={{ once:true }}
          style={{ position:'relative', zIndex:2, maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
          <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:24 }}>Você se reconhece aqui?</span>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,4vw,52px)', lineHeight:1.3, color:'#fff', marginBottom:16 }}>
            Aquelas noites longas.<br />O copo vazio na mesa.<br />
            <span style={{ color:'#00C4D4', fontStyle:'italic' }}>A pergunta que não sai da cabeça.</span>
          </h2>
          <p style={{ fontFamily:"'Cormorant Garant', serif", fontSize:22, fontStyle:'italic', color:'#8A9BBF', marginBottom:64 }}>
            "Por que eu não fui suficiente?"
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:4, overflow:'hidden', textAlign:'left' }}>
            {[
              { icon:'💔', title:'A rejeição que paralisa', text:'Você deu tudo e foi substituído. Essa dor tem nome — e tem saída.' },
              { icon:'🌀', title:'O loop que não para', text:'Reviver a situação centenas de vezes por dia sem encontrar resposta.' },
              { icon:'😔', title:'O medo do recomeço', text:'Será que vai amar de novo? Será que vai confiar novamente?' },
              { icon:'🪞', title:'A dúvida sobre seu valor', text:'O que ela viu nele que não viu em mim? Essa pergunta corrói tudo.' },
            ].map((c,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.12, duration:0.6 }} viewport={{ once:true }}
                style={{ background:'rgba(13,27,62,0.75)', padding:'36px 28px', backdropFilter:'blur(8px)' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(0,196,212,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(13,27,62,0.75)'}>
                <span style={{ fontSize:28, display:'block', marginBottom:14 }}>{c.icon}</span>
                <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:17, color:'#fff', marginBottom:10 }}>{c.title}</h3>
                <p style={{ fontSize:13, color:'#8A9BBF', lineHeight:1.7 }}>{c.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BLOCO 4 — BANNER SUPERAÇÃO */}
      <section style={{ position:'relative', overflow:'hidden' }}>
        <motion.img src={bannerTransform} alt="Da dor à transformação"
          initial={{ opacity:0, scale:1.04 }} whileInView={{ opacity:1, scale:1 }}
          transition={{ duration:1.2 }} viewport={{ once:true }}
          style={{ width:'100%', height:'min(600px,70vh)', objectFit:'cover', objectPosition:'center', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(13,27,62,0.42)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 8vw', zIndex:2 }}>
          <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', marginBottom:20 }}>A jornada que este livro conta</span>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,4.5vw,60px)', color:'#fff', lineHeight:1.25, textShadow:'0 2px 20px rgba(0,0,0,0.5)' }}>
            Existe uma saída.<br /><span style={{ color:'#00C4D4' }}>Gilberto encontrou.</span><br />Você também pode.
          </h2>
        </div>
      </section>

      {/* BLOCO 5 — SOBRE O AUTOR */}
      <section style={{ background:'#152347', padding:'120px 8vw' }}>
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:80, alignItems:'center', maxWidth:1100, margin:'0 auto' }}>
          <div style={{ position:'relative' }}>
            <img src={authorPointing} alt="Gilberto de Souza"
              style={{ width:'100%', maxWidth:420, borderRadius:4, position:'relative', zIndex:2, display:'block' }} />
            <div style={{ position:'absolute', inset:'-14px -14px 14px 14px', border:'2px solid rgba(0,196,212,0.3)', borderRadius:4, zIndex:1 }} />
          </div>
          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>Sobre o Autor</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(36px,4vw,56px)', lineHeight:1, color:'#fff', marginBottom:24 }}>
              Gilberto<br /><span style={{ color:'#00C4D4' }}>de Souza</span>
            </h2>
            <p style={{ fontSize:15, color:'#B8C8E0', lineHeight:1.8, marginBottom:20 }}>
              45 anos. Empresário. Mora nos Estados Unidos há 23 anos. Passou por traição, início de depressão — e escolheu se reconstruir.
            </p>
            <p style={{ fontSize:15, color:'#B8C8E0', lineHeight:1.8, marginBottom:28 }}>
              Hoje dedica sua vida a ajudar homens e mulheres que enfrentam a mesma dor que ele viveu.
            </p>
            <blockquote style={{ fontFamily:"'Cormorant Garant', serif", fontStyle:'italic', fontSize:19, color:'#fff', borderLeft:'3px solid #00C4D4', paddingLeft:20, margin:'0 0 32px', lineHeight:1.6 }}>
              "Escrevi este livro porque queria que alguém tivesse escrito isso para mim quando eu mais precisei."
            </blockquote>
            <RouterLink to="/sobre" style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(0,196,212,0.4)', color:'#00C4D4', padding:'14px 28px', borderRadius:3, fontSize:14, fontWeight:600, textDecoration:'none' }}>
              Conheça a história completa <ArrowRight size={16} />
            </RouterLink>
          </div>
        </motion.div>
      </section>

      {/* BLOCO 6 — ENTREGA / livro embrulhado */}
      <section style={{ background:'#F5F0E8', padding:'120px 8vw' }}>
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:80, alignItems:'center', maxWidth:1100, margin:'0 auto' }}>
          <img src={livroPresente} alt="Livro embalado com cuidado"
            style={{ width:'100%', maxWidth:460, borderRadius:8, boxShadow:'0 20px 60px rgba(0,0,0,0.15)', display:'block' }} />
          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>Envio pelos Correios</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3.5vw,44px)', lineHeight:1.2, color:'#0D1B3E', marginBottom:20 }}>
              Seu livro chega<br />embalado com cuidado
            </h2>
            <p style={{ fontSize:15, color:'#3A4A6B', lineHeight:1.8, marginBottom:28 }}>
              Cada pedido é preparado com cuidado e enviado pelos Correios para qualquer endereço do Brasil.
            </p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 32px' }}>
              {['📦 Embalagem protetora kraft','🔍 Código de rastreamento por email','⏱ PAC: 5–15 dias úteis por região','⚡ SEDEX disponível para entrega expressa','↩️ 7 dias para devolução (CDC)'].map(item => (
                <li key={item} style={{ fontSize:14, color:'#3A4A6B', padding:'10px 0', borderBottom:'1px solid rgba(13,27,62,0.08)' }}>{item}</li>
              ))}
            </ul>
            <RouterLink to="/entrega" style={{ display:'inline-block', border:'1px solid rgba(13,27,62,0.3)', color:'#0D1B3E', padding:'14px 28px', borderRadius:3, fontSize:14, fontWeight:600, textDecoration:'none' }}>
              Ver política de entrega →
            </RouterLink>
          </div>
        </motion.div>
      </section>

      {/* BLOCO 7 — COMPRA + FRETE + STRIPE */}
      <section id="comprar" style={{ background:'linear-gradient(180deg, #091422 0%, #0D1B3E 100%)', padding:'120px 8vw' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:80, alignItems:'center', maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:1.6 }} viewport={{ once:true }}>
            <img src={livroStack} alt="Livro Como Vencer a Dor de Ser Trocado Por Outro"
              style={{ width:'100%', maxWidth:460, borderRadius:6, display:'block' }} />
            <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:6 }}>
              <span style={{ fontSize:10, color:'#8A9BBF', letterSpacing:2 }}>ISBN 978-658462205-0</span>
              <svg viewBox="0 0 120 28" style={{ width:130, height:24 }} fill="none">
                {[2,4,7,9,12,14,17,20,22,25,27,30,33,35,38,40,43,46,48,51,53,56,58,61,64,66,69,72,74,77,79,82,85,87,90,92,95,98,100,103,106,108,111,113,116,118].map((x,i) => (
                  <rect key={i} x={x} y="0" width={i%3===0?2:1} height="28" fill="#00C4D4" opacity="0.5" />
                ))}
              </svg>
            </div>
          </motion.div>

          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>Receba em Casa</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3.5vw,44px)', color:'#fff', marginBottom:20 }}>Peça o Seu Agora</h2>
            <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:32 }}>
              <span style={{ fontSize:42, fontWeight:800, color:'#00C4D4' }}>R$ 49,90</span>
              <span style={{ fontSize:13, color:'#8A9BBF' }}>+ frete pelo CEP</span>
            </div>

            {/* Calculadora de frete — já calcula ao digitar CEP */}
            <ShippingCalculator />

            <div style={{ marginTop:28 }}>
              <AddToCartButton label="Adicionar ao Carrinho" />
            </div>

            {/* Stripe — placeholder pronto para ativar */}
            <div style={{ marginTop:20, padding:'16px 20px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4 }}>
              <p style={{ fontSize:12, color:'#8A9BBF', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                <span>🔒</span> Pagamento seguro processado pela Stripe
              </p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['Visa','Mastercard','Amex','Pix'].map(b => (
                  <span key={b} style={{ fontSize:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', padding:'4px 10px', borderRadius:2, color:'#8A9BBF' }}>{b}</span>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:16, fontSize:12, color:'#8A9BBF' }}>
              <span>📦 Enviado pelos Correios</span>
              <span>↩️ 7 dias para devolução</span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 8 — FAQ */}
      <section style={{ background:'#152347', padding:'100px 8vw' }}>
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.7 }} viewport={{ once:true }}
          style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3.5vw,44px)', color:'#fff', textAlign:'center', marginBottom:12 }}>
            Perguntas Frequentes
          </h2>
          <div style={{ width:48, height:2, background:'#00C4D4', margin:'0 auto 56px' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {faqItems.map((item,i) => (
              <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.08 }} viewport={{ once:true }}
                style={{ background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:4, overflow:'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  style={{ width:'100%', padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', color:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', textAlign:'left', gap:16 }}>
                  {item.q}
                  <span style={{ color:'#00C4D4', fontSize:22, flexShrink:0, transition:'transform 0.3s', transform:openFaq===i?'rotate(45deg)':'rotate(0)' }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:'0 24px 18px', fontSize:14, color:'#8A9BBF', lineHeight:1.75 }}>{item.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
