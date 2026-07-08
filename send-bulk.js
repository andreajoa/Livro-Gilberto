const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const match = envContent.match(/RESEND_API_KEY=["']?([^"'\r\n]+)["']?/);
const apiKey = match ? match[1] : null;

if (!apiKey) {
  console.error('❌ Não encontrei a RESEND_API_KEY no seu arquivo .env.local');
  process.exit(1);
}

const htmlContent = fs.readFileSync('./promocao-livro-en.html', 'utf8');
const files = ['email1.csv', 'email2.csv', 'email3.csv'];
const allEmails = new Set();
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(emailRegex);
    if (matches) {
      matches.forEach(email => allEmails.add(email.toLowerCase()));
    }
  }
});

const uniqueEmails = Array.from(allEmails);
console.log(`📬 Encontrados ${uniqueEmails.length} emails válidos (sem duplicatas) para envio.`);

if (uniqueEmails.length === 0) {
  console.error('❌ Nenhum email encontrado nos arquivos CSV.');
  process.exit(1);
}

const chunkSize = 50;
const chunks = [];
for (let i = 0; i < uniqueEmails.length; i += chunkSize) {
  chunks.push(uniqueEmails.slice(i, i + chunkSize));
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendBatch() {
  for (let i = 0; i < chunks.length; i++) {
    const batch = chunks[i].map(email => ({
      from: 'Gilberto de Souza <contato@gilberto-souza.com>',
      to: [email],
      subject: "Why you can't stop thinking about her",
      html: htmlContent
    }));

    try {
      const response = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(batch)
      });
      const data = await response.json();
      if (data.data) {
        console.log(`✅ Lote ${i+1}/${chunks.length} enviado! (${chunks[i].length} emails)`);
      } else {
        console.error(`❌ Erro no Lote ${i+1}:`, JSON.stringify(data));
      }
    } catch (err) {
      console.error(`❌ Erro de conexão no Lote ${i+1}:`, err);
    }
    
    await sleep(2000); // Pausa de 2 segundos
  }
  console.log('🚀 Disparo em massa concluído com sucesso!');
}

sendBatch();
