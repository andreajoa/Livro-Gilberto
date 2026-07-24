# ADAPTADOR FUTURO — PROJETO SUPERAÇÃO

Este documento deixa encaminhada a reutilização futura da estrutura.

## Regra atual

Não modificar nenhum arquivo do projeto Superação durante a implementação do Livro Gilberto.

## Configuração prevista

- Projeto: Superação
- Idioma: português brasileiro
- Site próprio: sim
- Amazon: sim
- Barnes & Noble: sim
- Sequências próprias: sim
- Templates próprios: sim
- Banco histórico: sim
- Webhook Resend: sim
- Relatório de desempenho: sim

## Elementos reaproveitáveis

- tabela `email_webhook_events`;
- verificação de assinatura Svix;
- deduplicação pelo `svix-id`;
- eventos de entrega;
- eventos de abertura;
- eventos de clique;
- eventos de rejeição;
- eventos de spam;
- classificação de Amazon;
- classificação de Barnes & Noble;
- classificação do site próprio;
- relatório de compras;
- regras de diagnóstico.

## Alterações necessárias no futuro

- usar `project=superacao`;
- fixar `language=pt`;
- cadastrar os links do livro Superação;
- criar sequências próprias;
- criar assuntos próprios;
- criar templates próprios;
- definir uma versão editorial própria;
- conectar as compras do site do Superação;
- configurar Amazon e Barnes & Noble;
- configurar o webhook do ambiente correspondente.

## Resultado esperado

Quando o projeto Superação for iniciado, qualquer IA deverá localizar este documento e entender que a infraestrutura já foi planejada, mas ainda precisa ser adaptada e validada no projeto correto.
