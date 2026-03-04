import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Package, RotateCcw, Shield } from 'lucide-react';
import AddToCartButton from '../components/AddToCartButton';
import ShippingCalculator from '../components/ShippingCalculator';

import bannerAutor     from '../assets/banners/banner-autor-wide.png';
import bannerCTA       from '../assets/banners/banner-autor-cta.png';
import bannerTransform from '../assets/banners/banner-antes-depois.png';
import bookCover       from '../assets/book/capa-livro.png';
import livroMao        from '../assets/lifestyle/livro-mao-segurando.png';
import livroWhiskey    from '../assets/lifestyle/livro-mesa-whiskey.png';
import livroJanela     from '../assets/lifestyle/livro-janela-cidade.png';
import livroPresente   from '../assets/lifestyle/livro-embalagem-kraft.png';
import livroStack      from '../assets/lifestyle/livro-stack-marble.png';
import authorPose      from '../assets/author/gilberto-livro-pose.png';

const faq = [
  { q: 'Como funciona o envio?', a: 'O livro é embalado com cuidado e postado pelos Correios. Você recebe o código de rastreamento por email assim que for postado.' },
  { q: 'Qual o prazo de entrega?', a: 'PAC: 5 a 15 dias úteis dependendo da sua região. SEDEX: 1 a 7 dias úteis.' },
  { q: 'Posso devolver o livro?', a: 'Sim. Você tem 7 dias corridos após o recebimento para solicitar devolução, conforme o Código de Defesa do Consumidor.' },
  { q: 'Como acompanho meu pedido?', a: 'Enviamos o código de rastreamento por email logo após a postagem. Acompanhe em rastreamento.correios.com.br.' },
  { q: 'O livro está disponível em versão digital?', a: 'Por enquanto apenas na versão física. O livro foi pensado para ser lido com as mãos.' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>

      {/* ════════════════════════════════════════
          HERO — Gilberto em tela cheia
          Hook: frase que para qualquer homem
      ════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'100vh', minHeight:600, overflow:'hidden', display:'flex', alignItems:'center' }}>

        {/* Foto do autor tela cheia */}
        <img src={bannerAutor} alt="Gilberto de Souza"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />

        {/* Gradiente dramático da esquerda */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(6,12,24,0.97) 0%, rgba(6,12,24,0.88) 38%, rgba(6,12,24,0.4) 62%, rgba(6,12,24,0.05) 100%)' }} />
        {/* Gradiente inferior */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(6,12,24,0.9) 0%, transparent 40%)' }} />

        <div style={{ position:'relative', zIndex:3, padding:'0 6vw', maxWidth:'100%' }}>
          <motion.div
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:1, ease:'easeOut' }}
            style={{ maxWidth:640 }}
          >
            {/* Hook — frase de parada */}
            <p style={{
              fontFamily:"'Cormorant Garant', serif",
              fontStyle:'italic',
              fontSize:'clamp(16px,1.8vw,22px)',
              color:'#00C4D4',
              marginBottom:20,
              letterSpacing:1,
              display:'flex',
              alignItems:'center',
              gap:12
            }}>
              <span style={{ width:32, height:1, background:'#00C4D4', display:'inline-block', flexShrink:0 }} />
              Para todo homem que já se perguntou: "por que não fui suficiente?"
            </p>

            {/* Título grande e horizontal */}
            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontWeight:900,
              fontSize:'clamp(38px,5.5vw,80px)',
              lineHeight:1.0,
              color:'#fff',
              marginBottom:24,
              letterSpacing:-1
            }}>
              Como Vencer<br />
              <span style={{ color:'#00C4D4' }}>A Dor</span>{' '}
              <span style={{ fontSize:'0.65em', fontWeight:400, color:'rgba(255,255,255,0.75)', fontStyle:'italic' }}>de ser trocado por outro</span>
            </h1>

            {/* Prova social / credencial */}
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36, flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <img src={bookCover} alt="capa"
                  style={{ width:36, height:48, objectFit:'cover', borderRadius:2, boxShadow:'0 4px 12px rgba(0,0,0,0.5)' }} />
                <div>
                  <p style={{ fontSize:11, color:'#8A9BBF', margin:0, lineHeight:1.3 }}>Livro físico</p>
                  <p style={{ fontSize:11, color:'#fff', margin:0, fontWeight:600 }}>por Gilberto de Souza</p>
                </div>
              </div>
              <div style={{ width:1, height:36, background:'rgba(255,255,255,0.15)' }} />
              <p style={{ fontSize:12, color:'#8A9BBF', margin:0, maxWidth:220, lineHeight:1.5 }}>
                Uma história real de traição, reconstrução e liberdade emocional
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:14 }}>
              <AddToCartButton label="Quero Este Livro — R$ 49,90" />
              <a href="#historia" style={{
                border:'1px solid rgba(255,255,255,0.2)',
                color:'#fff',
                padding:'15px 28px',
                borderRadius:3,
                textDecoration:'none',
                fontSize:14,
                fontWeight:500,
                backdropFilter:'blur(8px)',
                background:'rgba(255,255,255,0.05)'
              }}>
                Ver a história ↓
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y:[0,10,0] }}
          transition={{ duration:2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}
        >
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:3, textTransform:'uppercase' }}>scroll</span>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, rgba(0,196,212,0.6), transparent)' }} />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          HOOK 2 — Frase de identificação
          Fundo: livro + whiskey (atmosfera noturna)
      ════════════════════════════════════════ */}
      <section id="historia" style={{ position:'relative', padding:'100px 6vw', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${livroWhiskey})`, backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.3) saturate(0.6)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(6,12,24,0.7) 0%, rgba(6,12,24,0.5) 50%, rgba(6,12,24,0.95) 100%)' }} />

        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:1.2 }} viewport={{ once:true }}
          style={{ position:'relative', zIndex:2, maxWidth:860, margin:'0 auto', textAlign:'center' }}
        >
          <h2 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'clamp(30px,4.5vw,64px)',
            lineHeight:1.2,
            color:'#fff',
            marginBottom:24,
            fontWeight:700
          }}>
            Você deu tudo.<br />
            E mesmo assim<br />
            <span style={{ color:'#00C4D4', fontStyle:'italic' }}>foi trocado.</span>
          </h2>

          <p style={{
            fontFamily:"'Cormorant Garant', serif",
            fontStyle:'italic',
            fontSize:'clamp(18px,2vw,26px)',
            color:'rgba(255,255,255,0.6)',
            marginBottom:64,
            lineHeight:1.7
          }}>
            Essa dor tem nome. E tem saída.
          </p>

          {/* 4 cards de dor */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:2 }}>
            {[
              { icon:'💔', title:'A rejeição que paralisa', text:'Você deu tudo e foi substituído quando menos esperava.' },
              { icon:'🌀', title:'O loop mental', text:'Reviver a cena centenas de vezes por dia sem achar resposta.' },
              { icon:'😔', title:'O medo do recomeço', text:'Vai conseguir amar de novo? Vai conseguir confiar?' },
              { icon:'🪞', title:'A dúvida sobre seu valor', text:'O que ele tem que você não tem? Essa pergunta corrói tudo.' },
            ].map((c,i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.1, duration:0.6 }}
                viewport={{ once:true }}
                style={{
                  background:'rgba(13,27,62,0.7)',
                  backdropFilter:'blur(12px)',
                  border:'1px solid rgba(0,196,212,0.1)',
                  padding:'32px 24px',
                  textAlign:'left',
                  transition:'border-color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(0,196,212,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(0,196,212,0.1)'}
              >
                <span style={{ fontSize:32, display:'block', marginBottom:16 }}>{c.icon}</span>
                <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:16, color:'#fff', marginBottom:10, fontWeight:700 }}>{c.title}</h3>
                <p style={{ fontSize:13, color:'#8A9BBF', lineHeight:1.7, margin:0 }}>{c.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          O LIVRO — mão segurando + info editorial
      ════════════════════════════════════════ */}
      <section style={{ background:'#0A1628', padding:'100px 6vw' }}>
        <motion.div
          initial={{ opacity:0, y:50 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.9 }}
          viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:72, alignItems:'center', maxWidth:1100, margin:'0 auto' }}
        >
          {/* Info editorial — esquerda */}
          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>O LIVRO</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(30px,3.5vw,50px)', lineHeight:1.1, color:'#fff', marginBottom:16, fontWeight:900 }}>
              Como Vencer a Dor<br />de Ser Trocado Por Outro
            </h2>
            <p style={{ fontSize:14, color:'#8A9BBF', marginBottom:28 }}>por <strong style={{ color:'#fff' }}>Gilberto de Souza</strong></p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 }}>
              {['📚 Livro Físico','🇧🇷 Português','ISBN 978-658462205-0','🗓 2026'].map(m => (
                <span key={m} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', padding:'6px 12px', borderRadius:2, fontSize:11, color:'#8A9BBF' }}>{m}</span>
              ))}
            </div>

            <blockquote style={{
              fontFamily:"'Cormorant Garant', serif",
              fontStyle:'italic',
              fontSize:18,
              lineHeight:1.85,
              color:'#B8C8E0',
              borderLeft:'3px solid #00C4D4',
              paddingLeft:20,
              margin:'0 0 36px'
            }}>
              "A história de um homem que dedicou anos a uma mulher — e foi trocado no seu melhor momento. Entre a dor da rejeição e o medo de nunca amar de novo, ele descobre que a maior traição seria abandonar a si mesmo."
            </blockquote>

            <AddToCartButton label="Quero Este Livro — R$ 49,90" />
          </div>

          {/* Livro na mão — direita */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <motion.img
              src={livroMao}
              alt="Livro Como Vencer a Dor de Ser Trocado Por Outro"
              animate={{ y:[0,-12,0] }}
              transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut' }}
              style={{
                width:'min(400px,100%)',
                display:'block',
                filter:'drop-shadow(0 30px 60px rgba(0,0,0,0.8))'
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          BANNER TRANSFORMAÇÃO — tela cheia
      ════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'min(560px,65vh)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.img src={bannerTransform} alt="Da dor à transformação"
          initial={{ scale:1.06 }} whileInView={{ scale:1 }}
          transition={{ duration:1.4, ease:'easeOut' }} viewport={{ once:true }}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(6,12,24,0.55)' }} />

        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.9 }} viewport={{ once:true }}
          style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 6vw' }}
        >
          <p style={{ fontSize:11, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', marginBottom:20 }}>A jornada que este livro conta</p>
          <h2 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'clamp(32px,5vw,68px)',
            color:'#fff',
            lineHeight:1.15,
            fontWeight:900,
            textShadow:'0 4px 30px rgba(0,0,0,0.5)'
          }}>
            Existe uma saída.<br />
            <span style={{ color:'#00C4D4' }}>Gilberto encontrou.</span><br />
            Você também pode.
          </h2>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          SOBRE O AUTOR — foto + story
      ════════════════════════════════════════ */}
      <section style={{ background:'#0D1B3E', padding:'100px 6vw' }}>
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.9 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:72, alignItems:'center', maxWidth:1100, margin:'0 auto' }}
        >
          <div style={{ position:'relative' }}>
            <img src={bannerCTA} alt="Gilberto de Souza"
              style={{ width:'100%', maxWidth:460, display:'block', borderRadius:4, filter:'drop-shadow(0 20px 50px rgba(0,0,0,0.7))' }} />
            <div style={{ position:'absolute', bottom:-16, right:-16, width:'70%', height:'70%', border:'2px solid rgba(0,196,212,0.2)', borderRadius:4, zIndex:-1 }} />
          </div>

          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>Sobre o Autor</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(36px,4vw,58px)', lineHeight:1, color:'#fff', marginBottom:28, fontWeight:900 }}>
              Gilberto<br /><span style={{ color:'#00C4D4' }}>de Souza</span>
            </h2>

            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:32 }}>
              {[
                { emoji:'🇧🇷', text:'Nasceu no Brasil. Mora nos Estados Unidos há 23 anos.' },
                { emoji:'💼', text:'Empresário, fundou sua própria empresa de construção.' },
                { emoji:'💔', text:'Passou por traição e início de depressão.' },
                { emoji:'💪', text:'Escolheu se reconstruir — e escreveu este livro.' },
              ].map((item,i) => (
                <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                  <span style={{ fontSize:20, flexShrink:0 }}>{item.emoji}</span>
                  <p style={{ fontSize:15, color:'#B8C8E0', margin:0, lineHeight:1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <blockquote style={{
              fontFamily:"'Cormorant Garant', serif",
              fontStyle:'italic',
              fontSize:20,
              color:'#fff',
              borderLeft:'3px solid #00C4D4',
              paddingLeft:20,
              margin:'0 0 32px',
              lineHeight:1.6
            }}>
              "Escrevi este livro porque queria que alguém tivesse escrito isso para mim quando eu mais precisei."
            </blockquote>

            <RouterLink to="/sobre" style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(0,196,212,0.35)', color:'#00C4D4', padding:'14px 28px', borderRadius:3, fontSize:14, fontWeight:600, textDecoration:'none' }}>
              Conheça a história completa <ArrowRight size={16} />
            </RouterLink>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          ENTREGA — livro janela cidade + info
      ════════════════════════════════════════ */}
      <section style={{ background:'#F5F0E8', padding:'100px 6vw' }}>
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.8 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:72, alignItems:'center', maxWidth:1100, margin:'0 auto' }}
        >
          <img src={livroPresente} alt="Livro embalado com cuidado"
            style={{ width:'100%', maxWidth:460, borderRadius:6, boxShadow:'0 24px 60px rgba(0,0,0,0.12)', display:'block' }} />

          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>Envio pelos Correios</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3vw,44px)', lineHeight:1.2, color:'#0D1B3E', marginBottom:20, fontWeight:900 }}>
              Seu livro chega<br />embalado com cuidado
            </h2>
            <p style={{ fontSize:15, color:'#3A4A6B', lineHeight:1.8, marginBottom:28 }}>
              Cada pedido é preparado com atenção e enviado pelos Correios para qualquer endereço do Brasil.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {[
                { icon:<Package size={14}/>, text:'Embalagem protetora kraft' },
                { icon:'🔍', text:'Código de rastreamento por email' },
                { icon:'⏱', text:'PAC: 5–15 dias úteis por região' },
                { icon:'⚡', text:'SEDEX disponível para entrega expressa' },
                { icon:<RotateCcw size={14}/>, text:'7 dias para devolução (CDC)' },
              ].map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid rgba(13,27,62,0.08)', fontSize:14, color:'#3A4A6B' }}>
                  <span style={{ color:'#00C4D4', flexShrink:0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          COMPRA — livro stack + calculadora frete
      ════════════════════════════════════════ */}
      <section id="comprar" style={{ background:'linear-gradient(180deg, #060C18 0%, #0D1B3E 100%)', padding:'100px 6vw' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:72, alignItems:'center', maxWidth:1100, margin:'0 auto' }}>

          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            transition={{ duration:1.4 }} viewport={{ once:true }}
            style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:16 }}
          >
            <img src={livroStack} alt="Livro empilhado"
              style={{ width:'min(420px,100%)', borderRadius:6, display:'block', filter:'drop-shadow(0 20px 50px rgba(0,0,0,0.7))' }} />
            <span style={{ fontSize:10, color:'#8A9BBF', letterSpacing:2 }}>ISBN 978-658462205-0</span>
            <svg viewBox="0 0 160 28" style={{ width:160, height:24 }} fill="none">
              {[0,3,5,8,12,14,18,22,24,28,31,33,37,41,43,47,51,53,57,60,62,66,70,72,76,80,82,86,90,92,96,99,101,105,109,111,115,118,120,124,128,130,134,137,139,143,147,149,153,157,159].map((x,i) => (
                <rect key={i} x={x} y="0" width={i%4===0?3:1} height="28" fill="#00C4D4" opacity="0.4" />
              ))}
            </svg>
          </motion.div>

          <div>
            <span style={{ fontSize:10, letterSpacing:5, color:'#00C4D4', fontWeight:700, textTransform:'uppercase', display:'block', marginBottom:20 }}>Receba em Casa</span>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3.5vw,46px)', color:'#fff', marginBottom:16, fontWeight:900 }}>
              Peça o Seu Agora
            </h2>
            <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:32 }}>
              <span style={{ fontSize:48, fontWeight:900, color:'#00C4D4', lineHeight:1 }}>R$ 49,90</span>
              <span style={{ fontSize:13, color:'#8A9BBF' }}>+ frete calculado pelo CEP</span>
            </div>

            <ShippingCalculator />

            <div style={{ marginTop:28 }}>
              <AddToCartButton label="Adicionar ao Carrinho" />
            </div>

            <div style={{ marginTop:20, padding:'18px 20px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:4 }}>
              <p style={{ fontSize:12, color:'#8A9BBF', marginBottom:10, display:'flex', alignItems:'center', gap:6 }}>
                <Shield size={13} style={{ color:'#00C4D4' }} /> Pagamento seguro processado pela Stripe
              </p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['Visa','Mastercard','Amex','Pix'].map(b => (
                  <span key={b} style={{ fontSize:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', padding:'4px 10px', borderRadius:2, color:'#8A9BBF' }}>{b}</span>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:16, fontSize:12, color:'#8A9BBF' }}>
              <span>📦 Enviado pelos Correios</span>
              <span>↩️ 7 dias para devolução</span>
              <span>🔒 Compra Segura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section style={{ background:'#0A1628', padding:'90px 6vw' }}>
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          transition={{ duration:0.7 }} viewport={{ once:true }}
          style={{ maxWidth:780, margin:'0 auto' }}
        >
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,3vw,44px)', color:'#fff', textAlign:'center', marginBottom:12, fontWeight:900 }}>
            Perguntas Frequentes
          </h2>
          <div style={{ width:48, height:2, background:'#00C4D4', margin:'0 auto 52px' }} />

          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {faq.map((item,i) => (
              <div key={i} style={{ background:'rgba(13,27,62,0.5)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:4, overflow:'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  style={{ width:'100%', padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', color:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', textAlign:'left', gap:16 }}>
                  {item.q}
                  <span style={{ color:'#00C4D4', fontSize:24, transition:'transform 0.3s', transform:openFaq===i?'rotate(45deg)':'none', flexShrink:0 }}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.div
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.3 }}
                      style={{ overflow:'hidden' }}
                    >
                      <div style={{ padding:'0 24px 20px', fontSize:14, color:'#8A9BBF', lineHeight:1.8 }}>{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{ background:'#091422', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 8vw 40px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:48, marginBottom:64 }}>

            <div>
              <div style={{ width:52, height:52, background:'#00C4D4', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:900, fontSize:20, color:'#0D1B3E' }}>G·S</span>
              </div>
              <p style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:16, color:'#fff', marginBottom:6 }}>Gilberto de Souza</p>
              <p style={{ fontSize:13, color:'#8A9BBF', marginBottom:20, fontStyle:'italic' }}>Você não está sozinho</p>
              <svg width="160" height="32" viewBox="0 0 160 32" style={{ opacity:0.2 }}>
                {[0,4,6,11,13,17,23,25,30,34,36,41,43,47,52,54,58,64,66,71,75,77,82,84,88,93,95,99,105,107,112,116,118,123,125,129,134,136,140,146,148,153,157,159].map((x,i) => (
                  <rect key={i} x={x} y="0" width={i%5===0?3:i%3===0?2:1} height="32" fill="white" />
                ))}
              </svg>
            </div>

            <div>
              <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#00C4D4', marginBottom:20 }}>Navegação</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[['Início','/'],['O Livro','/o-livro'],['Sobre','/sobre'],['Contato','/contato']].map(([name,to]) => (
                  <RouterLink key={name} to={to} style={{ color:'#8A9BBF', textDecoration:'none', fontSize:14 }}>{name}</RouterLink>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#00C4D4', marginBottom:20 }}>O Livro</h3>
              <img src={bookCover} alt="Capa do livro" style={{ width:80, borderRadius:3, marginBottom:16, boxShadow:'4px 6px 20px rgba(0,0,0,0.5)', display:'block' }} />
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[['📖','ISBN 978-658462205-0'],['📚','Autoajuda / Relacionamentos'],['🗓','2026 — 1ª Edição'],['📦','Formato físico']].map(([icon,text]) => (
                  <div key={text} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#8A9BBF' }}>
                    <span>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#00C4D4', marginBottom:20 }}>Legal</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[['Política de Privacidade','/privacidade'],['Termos de Uso','/termos'],['Política de Entrega','/entrega'],['Política de Devolução','/devolucao']].map(([name,to]) => (
                  <RouterLink key={name} to={to} style={{ color:'#8A9BBF', textDecoration:'none', fontSize:14 }}>{name}</RouterLink>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:32 }}>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:24 }}>
              <p style={{ fontSize:13, color:'#8A9BBF', margin:0 }}>© 2026 Gilberto de Souza · Todos os direitos reservados</p>
              <p style={{ fontSize:13, color:'#8A9BBF', margin:0 }}>📦 Enviado pelos Correios para todo o Brasil</p>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:32 }}>
              {[['🔒','Compra Segura'],['🛡️','LGPD Compliance'],['✅','Site Verificado']].map(([icon,text]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#8A9BBF' }}>
                  <span>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
