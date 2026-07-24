# EMAIL INTELLIGENCE — LIVRO GILBERTO

Sistema de mensuração e inteligência dos emails do projeto Livro Gilberto.

## Idiomas monitorados

- Português brasileiro
- Inglês
- Espanhol

## O que é registrado

- Email enviado
- Email entregue
- Entrega atrasada
- Falha de envio
- Rejeição permanente
- Abertura estimada
- Clique total
- Clique único
- Link específico acessado
- Clique na Amazon
- Clique na Barnes & Noble
- Clique no site próprio
- Clique para checkout
- Cancelamento
- Reclamação de spam
- Compra concluída no site próprio
- Receita por idioma, produto e moeda

## Arquivos centrais

- `src/lib/email/emailIntelligenceSchema.js`
- `src/lib/email/emailTracking.js`
- `app/api/webhooks/resend/route.js`
- `app/api/email-intelligence/init/route.js`
- `app/api/email-intelligence/report/route.js`
- `scripts/email-intelligence-report.js`

## Banco de dados

Os eventos são preservados no Cloudflare D1 na tabela:

- `email_webhook_events`

Cada evento pode ser associado a:

- projeto;
- idioma;
- sequência;
- número do email;
- assunto;
- versão do template;
- identificador do envio no Resend;
- canal clicado.

## Segurança

As rotas administrativas aceitam:

- `CRON_SECRET` por Bearer Token; ou
- `EMAIL_CRON_TOKEN` por parâmetro protegido.

O webhook do Resend exige:

- `RESEND_WEBHOOK_SECRET`;
- assinatura Svix válida;
- corpo bruto da requisição.

Eventos repetidos são deduplicados pelo `svix-id`.

## Comando padrão

Últimos 30 dias, todos os idiomas:

    EMAIL_CRON_TOKEN="TOKEN" \
    node scripts/email-intelligence-report.js 30

Somente português:

    EMAIL_CRON_TOKEN="TOKEN" \
    node scripts/email-intelligence-report.js 30 pt

Somente inglês:

    EMAIL_CRON_TOKEN="TOKEN" \
    node scripts/email-intelligence-report.js 30 en

Somente espanhol:

    EMAIL_CRON_TOKEN="TOKEN" \
    node scripts/email-intelligence-report.js 30 es

## Como interpretar

### Entrega baixa

Investigar:

- reputação do domínio;
- endereços inválidos;
- bloqueios;
- configuração do remetente;
- volume de envio.

### Boa entrega e pouca abertura

Revisar:

- assunto;
- texto de prévia;
- nome do remetente;
- horário;
- frequência;
- promessa inicial.

Abertura é uma estimativa, pois alguns provedores bloqueiam ou antecipam o carregamento de imagens.

### Boa abertura e pouco clique

Revisar:

- argumento central;
- clareza da oferta;
- benefícios;
- prova;
- CTA;
- posição dos links;
- coerência entre assunto e conteúdo.

### Muito clique no site e pouca compra

Revisar:

- página de venda;
- preço;
- checkout;
- confiança;
- prova;
- garantia;
- velocidade;
- compatibilidade móvel.

### Muito clique na Amazon ou Barnes

Indica interesse pelo livro físico ou maior confiança no varejista.

O sistema mede o clique externo. A compra externa somente poderá ser confirmada com relatório da Amazon, Barnes & Noble, afiliado ou distribuidor.

### Reclamação de spam ou rejeição

Os próximos emails pendentes para o endereço são interrompidos automaticamente.

## Procedimento para análise por IA

Quando solicitado a analisar os emails:

1. Ler este arquivo.
2. Executar o relatório do período solicitado.
3. Priorizar entrega, cliques e compras.
4. Tratar abertura como estimativa.
5. Comparar idiomas, sequências, assuntos e números dos emails.
6. Identificar o ponto de perda do funil.
7. Propor uma hipótese por vez.
8. Preparar variante mensurável.
9. Não publicar alteração sem validação e commit explícitos.

## Objetivo

O objetivo principal não é maximizar abertura isoladamente.

O objetivo é aumentar:

- intenção real;
- cliques qualificados;
- início de checkout;
- compra no site;
- intenção de compra na Amazon;
- intenção de compra na Barnes & Noble.
