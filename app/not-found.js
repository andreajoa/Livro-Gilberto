export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',background:'#0a1628',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
      <h1 style={{color:'#fff',fontFamily:'serif',fontSize:32}}>404</h1>
      <p style={{color:'#8A9BBF'}}>Página não encontrada</p>
      <a href="/" style={{color:'#00C4D4'}}>Voltar ao início</a>
    </div>
  )
}
