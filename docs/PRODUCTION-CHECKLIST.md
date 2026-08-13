# Checklist de produção — checkout, pedidos e dashboard

## 1. Variáveis privadas na hospedagem

Configure em Production, Preview e Development quando aplicável:

- `NEXT_PUBLIC_BASE_URL=https://www.gilberto-souza.com`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_WEBHOOK_SECRET`
- `EMAIL_FROM`
- `OWNER_EMAIL`
- `SUPPORT_EMAIL`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_D1_API_TOKEN`
- `DASHBOARD_PASSWORD` (senha forte e exclusiva)
- `DASHBOARD_SESSION_SECRET` (mínimo de 32 caracteres aleatórios)
- `INTERNAL_API_SECRET` (mínimo de 32 caracteres aleatórios)
- `EMAIL_UNSUBSCRIBE_SECRET` (mínimo de 32 caracteres aleatórios)
- `CRON_SECRET`
- `EMAIL_CRON_TOKEN`
- `SHIPPING_ORIGIN_CEP` (CEP privado de postagem; nunca usar variável `NEXT_PUBLIC_`)

Não grave valores reais em arquivos `.env` versionados, documentação, analytics ou código do cliente.

## 2. Stripe

1. Cadastre o webhook de produção apontando para `https://www.gilberto-souza.com/api/stripe/webhook`.
2. Ative, no mínimo, `payment_intent.succeeded`.
3. Copie o segredo de assinatura para `STRIPE_WEBHOOK_SECRET`.
4. Confirme os meios de pagamento habilitados na conta e a moeda BRL.
5. Faça uma compra controlada de valor real e depois reembolse-a no Stripe.
6. Confirme que apenas um pedido foi criado e que o valor do Payment Intent é igual ao total exibido.

## 3. Resend

1. Verifique o domínio `gilberto-souza.com` no Resend (SPF, DKIM e, quando disponível, DMARC).
2. Configure o webhook em `https://www.gilberto-souza.com/api/webhooks/resend`.
3. Ative eventos de enviado, entregue, atraso, falha, bounce, abertura, clique e reclamação.
4. Confirme que `OWNER_EMAIL` recebe o endereço e o WhatsApp do pedido pago.
5. Confirme que o comprador recebe a confirmação e, depois, o rastreio.

## 4. Banco e CRM

As tabelas de comércio, CRM, comportamento e e-mail são criadas automaticamente na primeira chamada autenticada. O token D1 deve ter acesso somente ao banco deste projeto.

Após o deploy:

1. Acesse `/dashboard` e faça login.
2. Verifique se as abas carregam sem erro.
3. Confirme que bounce, reclamação e descadastro interrompem os próximos e-mails.
4. Execute os crons de envio e avanço de sequências com autenticação.

## 5. Frete

O modo inicial usa uma tabela regional calculada no servidor. Ela não é uma cotação contratual dos Correios. A origem é uma variável privada e nunca é devolvida ao navegador.

Antes de vender, confirme preço e prazo praticáveis para todas as regiões. Para cotação oficial, será necessário cadastrar as credenciais contratuais, os serviços, peso e dimensões da embalagem em um provedor de frete homologado.

## 6. Teste ponta a ponta obrigatório

1. Abrir o site em aba anônima.
2. Conferir que o carrinho inicia vazio.
3. Adicionar o livro e confirmar a capa no carrinho.
4. Calcular dois CEPs de regiões diferentes.
5. Preencher nome, e-mail, WhatsApp, endereço, número e complemento.
6. Conferir que a URL do checkout contém somente o identificador `chk_...`.
7. Pagar com um método real controlado.
8. Verificar a confirmação do webhook e o registro em `/dashboard`.
9. Copiar os dados de expedição e abrir o WhatsApp pelo painel.
10. Marcar como preparando, informar rastreio, marcar como enviado e conferir o e-mail.
11. Marcar como entregue.
12. Validar eventos do funil, origem, cidade aproximada, cliques e tempo somente após consentimento.

O site só deve ser considerado pronto para vendas depois que todo esse percurso passar em produção.
