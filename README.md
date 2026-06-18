# Projeto Voucher + WhatsApp + Supabase

Projeto simples em HTML, CSS e JavaScript para:

- Cadastrar solicitante
- Cadastrar portador do voucher
- Salvar dados no Supabase
- Gerar/registrar número do voucher
- Criar link direto para WhatsApp com a mensagem:
  `Olá NOME, segue seu voucher NUMERO`
- Mostrar ranking de solicitantes por quantidade de vouchers

## 1. Criar tabela no Supabase

No Supabase, vá em **SQL Editor** e execute o arquivo:

```sql
supabase/schema.sql
```

## 2. Configurar o projeto

Abra o arquivo:

```js
js/config.js
```

Troque pelos dados do seu Supabase:

```js
const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_PUBLIC";
```

Esses dados ficam em:

Supabase > Project Settings > API

Use a chave **anon public**.

## 3. Rodar no VS Code

Instale a extensão **Live Server** no VS Code.

Depois clique com botão direito em `index.html` e escolha:

**Open with Live Server**

## 4. Subir no GitHub

```bash
git init
git add index.html css js supabase README.md
git commit -m "primeira versão do sistema de vouchers"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## Observação importante

Não coloque CPF, telefone e dados pessoais em repositório público com dados reais.
O código pode ser público, mas o banco deve ter regras de segurança no Supabase.
