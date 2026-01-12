# Guia de Publicação - react-gcal

Este guia explica como publicar as versões do pacote `react-gcal` no npm.

## Versões Disponíveis

### Versão Padrão (Next.js 12+)
- **Versão**: `0.1.0` (ou superior)
- **Compatibilidade**: Next.js >= 12
- **Formato**: ESM + CJS
- **Build**: `npm run build`

### Versão LEGACY (Next.js 7-12)
- **Versão**: `0.1.0-legacy` (ou superior)
- **Compatibilidade**: Next.js >= 7 <= 12
- **Formato**: Apenas CJS (CommonJS)
- **Build**: `npm run build:legacy`

## Pré-requisitos

1. **Autenticação npm configurada** (na raiz do workspace):
   ```bash
   npm config set _authToken=SEU_TOKEN_AQUI
   npm config fix
   ```

2. **Versão atualizada** no `package.json` ou `package.legacy.json`

## Publicar Versão Padrão (Next.js 12+)

```bash
cd packages/react-gcal

# 1. Build da versão padrão
npm run build

# 2. Publicar
npm publish --access public
```

## Publicar Versão LEGACY (Next.js 7-12)

### Opção 1: Usando o script automatizado (Recomendado)

```bash
cd packages/react-gcal

# O script faz tudo automaticamente:
# 1. Build LEGACY
# 2. Substitui package.json pelo package.legacy.json
# 3. Publica
# 4. Restaura o package.json original
npm run publish:legacy
```

### Opção 2: Manual

```bash
cd packages/react-gcal

# 1. Build da versão LEGACY
npm run build:legacy

# 2. Backup do package.json atual
cp package.json package.json.backup

# 3. Substituir pelo package.legacy.json
cp package.legacy.json package.json

# 4. Publicar
npm publish --access public

# 5. Restaurar package.json original
mv package.json.backup package.json
```

## Gerenciamento de Versões

### Atualizar versão padrão:
```bash
cd packages/react-gcal
npm version patch  # ou minor, major
```

### Atualizar versão LEGACY:
Edite manualmente o `package.legacy.json`:
```json
{
  "version": "0.1.1-legacy"  // ou a versão desejada
}
```

## Notas Importantes

1. **Versões diferentes**: A versão LEGACY usa o sufixo `-legacy` (ex: `0.1.0-legacy`) para diferenciar da versão padrão.

2. **Build antes de publicar**: Sempre faça o build antes de publicar para garantir que os arquivos em `dist/` estão atualizados.

3. **Verificar antes de publicar**: 
   ```bash
   npm pack --dry-run  # Verifica o que será publicado sem publicar
   ```

4. **Tag no npm**: A versão LEGACY será publicada com a tag `latest` por padrão. Se quiser usar uma tag diferente:
   ```bash
   npm publish --access public --tag legacy
   ```

## Estrutura de Publicação

Ambas as versões publicam os mesmos arquivos:
- `dist/` - Arquivos compilados
- `README.md` - Documentação

A diferença está apenas na configuração do `package.json` (ESM vs CJS apenas).
