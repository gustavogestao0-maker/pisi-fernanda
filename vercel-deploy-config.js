/**
 * SCRIPT DE DEPLOY - FERNANDA PETRILLI
 * ======================================
 * Este script resolve o problema de "site branco" em deploys no Vercel
 * Coloque este arquivo na raiz do seu projeto antes de fazer deploy
 * 
 * INSTRUÇÕES:
 * 1. Adicione este arquivo ao seu projeto (raiz)
 * 2. Crie um arquivo 'vercel.json' (veja abaixo)
 * 3. Rode: npm run build (ou yarn build)
 * 4. Deploy: vercel (ou git push)
 */

// ============================================
// 1. PRÉ-DEPLOY: Verificar arquivos
// ============================================

const fs = require('fs');
const path = require('path');

const checkBuild = () => {
  console.log('🔍 Verificando arquivos de build...\n');
  
  const requiredFiles = [
    'dist/index.html',
    'dist/css',
    'dist/js',
    'dist/images'
  ];

  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} encontrado`);
    } else {
      console.warn(`⚠️  ${file} NÃO ENCONTRADO - Verifique seu build`);
    }
  });
};

// ============================================
// 2. VERCEL.JSON - Crie este arquivo
// ============================================

const vercelConfig = {
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, s-maxage=3600, must-revalidate"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
};

// ============================================
// 3. PRÓXIMO PASSO: package.json
// ============================================

// Adicione estas linhas no seu package.json (scripts):
// "build": "vite build",
// "preview": "vite preview",
// "deploy": "npm run build && vercel"

// ============================================
// 4. STEP-BY-STEP PARA DEPLOY
// ============================================

const deploySteps = `
╔════════════════════════════════════════════════════════════════╗
║         GUIA DE DEPLOY NO VERCEL (SEM SITE BRANCO)            ║
╚════════════════════════════════════════════════════════════════╝

📋 PASSO 1: Preparar o projeto
─────────────────────────────────
1. Abra terminal na raiz do projeto
2. Crie um arquivo chamado 'vercel.json' (cole o conteúdo abaixo)

📋 PASSO 2: Conteúdo do 'vercel.json'
─────────────────────────────────────
${JSON.stringify(vercelConfig, null, 2)}

📋 PASSO 3: Atualizar package.json
──────────────────────────────────
Certifique-se que o 'scripts' tem:
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod"
  }
}

📋 PASSO 4: Instalar Vercel CLI (se não tiver)
──────────────────────────────────────────────
npm install -g vercel

📋 PASSO 5: Fazer o Deploy
──────────────────────────
Opção A (Recomendado):
  npm run deploy

Opção B:
  npm run build
  vercel --prod

Opção C (Git):
  git add .
  git commit -m "Deploy Fernanda Petrilli"
  git push origin main
  (Vercel fará deploy automaticamente se conectado ao GitHub)

✅ RESULTADO:
─────────────
Seu site abrirá corretamente sem ficar branco!

🔧 SE AINDA FICAR BRANCO:
───────────────────────────
1. Verifique o console do navegador (F12 > Console)
2. Procure por erros de JavaScript
3. Certifique-se que dist/index.html foi criado
4. Verifique se css/ e js/ estão em dist/

💡 DICA EXTRA: .env.production (se usar variáveis)
───────────────────────────────────────────────────
Crie um arquivo '.env.production':
VITE_API_URL=https://seu-dominio.com
VITE_ENV=production

📲 APÓS DEPLOY:
──────────────
1. Aguarde 1-2 minutos
2. Abra seu link do Vercel
3. Teste em incógnito (Ctrl+Shift+Delete)
4. Limpe cache se necessário (Shift+F5)
`;

console.log(deploySteps);

// Exportar para uso em build scripts
module.exports = {
  checkBuild,
  vercelConfig,
  deploySteps
};

// Executar verificação se rodado diretamente
if (require.main === module) {
  checkBuild();
}
