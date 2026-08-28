# 🚀 GUIA DE DEPLOY - FERNANDA PETRILLI

## ⚠️ PROBLEMA: Site fica branco no Vercel

Isso acontece quando:
- O JavaScript não consegue renderizar corretamente
- Faltam arquivos de CSS ou JS no build
- Cache do navegador está incorreto
- Configuração do Vercel está errada

---

## ✅ SOLUÇÃO PASSO A PASSO

### 📋 PASSO 1: Preparar os arquivos

Você recebeu 3 arquivos:

1. **vercel.json** ← Configuração oficial do Vercel
2. **fallback.html** ← Página de emergência (backup)
3. **DEPLOY_GUIA.md** ← Este arquivo

Coloque o `vercel.json` na **raiz do seu projeto** (mesma pasta do package.json).

---

### 📦 PASSO 2: Estrutura do projeto

Sua pasta deve estar assim:
```
seu-projeto/
├── vercel.json          ← Coloque aqui
├── package.json
├── index.html
├── src/
├── css/
├── js/
└── images/
```

---

### 🔧 PASSO 3: Instalar/Atualizar Node

Se não tiver Node.js instalado:
- Baixe em: https://nodejs.org/
- Versão recomendada: LTS (18.x ou 20.x)

Verifique se está instalado:
```bash
node --version
npm --version
```

---

### 🛠️ PASSO 4: Instalar dependências

No terminal, na pasta do projeto:
```bash
npm install
```

Isso vai criar a pasta `node_modules` e atualizar tudo.

---

### 🏗️ PASSO 5: Fazer o build

```bash
npm run build
```

Isso cria a pasta `dist/` com:
- `dist/index.html`
- `dist/css/`
- `dist/js/`
- `dist/images/`

**Se der erro neste passo, o deploy vai falhar!**

---

### 📤 PASSO 6: Instalar Vercel CLI

Se não tiver:
```bash
npm install -g vercel
```

---

### 🚀 PASSO 7: FAZER O DEPLOY

#### Opção A (Recomendado - Automático):
```bash
npm run build
vercel --prod
```

#### Opção B (Interactive):
```bash
vercel
```

Depois responda as perguntas (default é geralmente certo).

#### Opção C (Se tiver git conectado):
```bash
git add .
git commit -m "Deploy Fernanda Petrilli"
git push origin main
```

Vercel fará deploy automaticamente se estiver conectado ao GitHub.

---

## ✔️ VERIFICAR SE FUNCIONOU

Após o deploy:

1. **Aguarde 1-2 minutos** para Vercel processar
2. **Abra o link** que Vercel te deu
3. **Teste em incógnito** (Ctrl+Shift+Delete)
4. **Limpe o cache** do navegador (Shift+F5)

Se a página aparecer (mesmo que demore um pouco), funcionou! ✅

---

## 🔍 SE AINDA FICAR BRANCO

### Passo 1: Verificar o console
1. Abra o site no navegador
2. Aperte `F12` (ou Cmd+Option+I no Mac)
3. Vá para a aba "Console"
4. Procure por mensagens em vermelho

### Passo 2: Verificar o build
```bash
npm run build
# Verifique se criou a pasta 'dist' com index.html
ls -la dist/
```

### Passo 3: Testar local
```bash
npm run preview
```

Abre uma URL local (geralmente `http://localhost:4173`).
Se funcionar aí, o problema é no Vercel.

### Passo 4: Limpar cache do Vercel
1. Vá para: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá para "Settings" → "Build & Development"
4. Clique em "Redeploy"

---

## 📸 ADICIONAR A FOTO DA FERNANDA

Você recebeu uma foto nova da Fernanda: `fernanda-foto-atual.png`

Para usar no site:

1. **Copie o arquivo para pasta de imagens:**
   ```
   seu-projeto/images/fernanda-foto-atual.png
   ```

2. **Edite o HTML/componente** para usar:
   ```html
   <img src="images/fernanda-foto-atual.png" alt="Fernanda Petrilli">
   ```

3. **Faça novo build e deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

---

## 💡 DICAS DE OURO

### ✨ Cache do navegador
Se o site estava branco e agora está ok, mas parece desatualizado:

```bash
# Limpar cache local
rm -rf .vercel
npm run build
vercel --prod
```

### 🔐 Variáveis de ambiente (se usar)
Crie `.env.production`:
```
VITE_API_URL=https://seu-dominio.com
VITE_ENV=production
```

### 🎨 Customizar domínio
No Vercel Dashboard:
- Projeto → Settings → Domains
- Adicione seu domínio customizado

---

## 📞 SUPORTE RÁPIDO

**Erro: "Command failed with exit code 1"**
```bash
npm install
npm run build
```

**Erro: "Module not found"**
```bash
rm -rf node_modules
npm install
npm run build
```

**Site ainda branco?**
- Verificar console (F12)
- Fazer npm run preview (teste local)
- Limpar cache do Vercel (redeploy)

---

## 🎯 RESUMO RÁPIDO

```bash
# 1. Preparar
npm install

# 2. Testar local
npm run preview

# 3. Build
npm run build

# 4. Deploy
vercel --prod

# 5. Pronto! ✅
```

---

## 📧 Dúvidas?

Qualquer problema, verifique:
1. Console do navegador (F12)
2. Logs do Vercel (vercel.com/dashboard)
3. Arquivo `vercel.json` existe e está correto
4. Build local funciona (`npm run preview`)

Sucesso! 🎉
