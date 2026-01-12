# Guia de Publicação - react-gcal

Este guia explica como publicar o pacote `react-gcal` no npm.

## Pré-requisitos

1. **Autenticação npm configurada** (na raiz do workspace):
   ```bash
   npm config set _authToken=SEU_TOKEN_AQUI
   npm config fix
   ```

2. **Versão atualizada** no `package.json`

## Publicar

```bash
cd packages/react-gcal

# 1. Build
npm run build

# 2. Publicar
npm publish --access public
```

## Gerenciamento de Versões

### Atualizar versão:
```bash
cd packages/react-gcal
npm version patch  # ou minor, major
```

## Notas Importantes

1. **Build antes de publicar**: Sempre faça o build antes de publicar para garantir que os arquivos em `dist/` estão atualizados.

2. **Verificar antes de publicar**: 
   ```bash
   npm pack --dry-run  # Verifica o que será publicado sem publicar
   ```

3. **Tag no npm**: Por padrão, a versão será publicada com a tag `latest`. Se quiser usar uma tag diferente:
   ```bash
   npm publish --access public --tag beta
   ```

## Estrutura de Publicação

O pacote publica os seguintes arquivos:
- `dist/` - Arquivos compilados
- `README.md` - Documentação

> **Note**: npm requires Two-Factor Authentication (2FA) or a granular access token with bypass 2FA enabled to publish packages.
