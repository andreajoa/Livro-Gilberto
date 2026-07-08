const fs = require('fs');

// 1. Ler o arquivo de bounces que acabamos de criar
const bounceData = fs.readFileSync('bounces.csv', 'utf8');
const badEmails = new Set();

// 2. Extrair apenas os emails com status "bounced" ou "suppressed"
bounceData.split('\n').forEach(line => {
  const parts = line.split('|').map(p => p.trim());
  if (parts.length > 9) {
    const email = parts[5];
    const status = parts[9];
    if ((status === 'bounced' || status === 'suppressed') && email.includes('@')) {
      badEmails.add(email.toLowerCase());
    }
  }
});

console.log(`⚠️ Encontrados ${badEmails.size} emails com bounce/suppressed para remover.`);

// 3. Ler a lista master
if (!fs.existsSync('master_emails.csv')) {
  console.error('❌ Arquivo master_emails.csv não encontrado!');
  process.exit(1);
}
const masterData = fs.readFileSync('master_emails.csv', 'utf8');
const masterEmails = masterData.split('\n').map(e => e.trim().toLowerCase()).filter(e => e);

// 4. Filtrar a lista
const cleanEmails = masterEmails.filter(e => !badEmails.has(e));

// 5. Salvar a lista limpa
fs.writeFileSync('master_emails.csv', cleanEmails.join('\n') + '\n');

console.log(`✅ Lista limpa com sucesso!`);
console.log(`📉 Emails removidos da master: ${masterEmails.length - cleanEmails.length}`);
console.log(`📦 Total restante para envio: ${cleanEmails.length}`);
