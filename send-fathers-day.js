const fs = require('fs');
const { Resend } = require('resend');

// Carregar variáveis de ambiente do .env.local
try {
  const env = fs.readFileSync('.env.local', 'utf8');
  env.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key) process.env[key.trim()] = value.join('=').trim();
  });
} catch(e) {
  console.log("Aviso: .env.local não encontrado.");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const htmlContent = fs.readFileSync('email-fathers-day.html', 'utf8');

const FILE_ALL_CONTACTS = 'master_emails.csv'; 
const FILE_SENT_1 = 'email1.csv';
const FILE_SENT_2 = 'email2.csv';

function extractEmails(text) {
  const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;
  const matches = text.match(regex);
  return matches ? matches : [];
}

const allContacts = extractEmails(fs.readFileSync(FILE_ALL_CONTACTS, 'utf8'));
const sent1 = extractEmails(fs.readFileSync(FILE_SENT_1, 'utf8'));
const sent2 = extractEmails(fs.readFileSync(FILE_SENT_2, 'utf8'));

// Juntar os já enviados para filtrar
const sentContacts = [...new Set([...sent1, ...sent2])];

const toSend = allContacts.filter(email => !sentContacts.includes(email));

console.log(`📊 Total na lista master: ${allContacts.length}`);
console.log(`✅ Já enviados (email1 + email2): ${sentContacts.length}`);
console.log(`🚀 Faltando enviar: ${toSend.length}`);

const fromEmail = process.env.EMAIL_FROM || "Gilberto de Souza <contato@gilberto-souza.com>";
const subject = "A Father's Day Gift That Could Change a Life";

async function sendBatch(batch, batchNumber) {
  const emails = batch.map(email => ({
    from: fromEmail,
    to: email,
    subject: subject,
    html: htmlContent
  }));

  try {
    const response = await resend.batch.send(emails);
    if(response.data) {
        console.log(`✔️ Lote ${batchNumber} enviado com sucesso!`);
        fs.appendFileSync(FILE_SENT_2, batch.join('\n') + '\n');
    } else {
        console.error(`❌ Erro no Lote ${batchNumber}:`, response.error);
    }
  } catch (error) {
    console.error(`❌ Erro no Lote ${batchNumber}:`, error.message);
  }
}

async function run() {
  const batchSize = 50;
  let batchNumber = 1;
  
  for (let i = 0; i < toSend.length; i += batchSize) {
    const batch = toSend.slice(i, i + batchSize);
    console.log(`Enviando Lote ${batchNumber} (${batch.length} emails)...`);
    await sendBatch(batch, batchNumber);
    batchNumber++;
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log("🎉 Disparo concluído!");
}

run();
