# Guia de Conversão Tailwind → SCSS Modules

## Estrutura Criada

```
src/
├── styles/
│   ├── _variables.scss    # CSS Variables (cores, espaçamentos, etc)
│   ├── _mixins.scss       # Mixins reutilizáveis
│   └── styles.scss        # Estilos globais
└── Calendar/
    └── Calendar.module.scss  # Exemplo de SCSS Module
```

## Padrão de Conversão

### 1. Classes Tailwind → SCSS Module

**Antes (Tailwind):**
```tsx
<div className="flex items-center gap-2 p-4 bg-background">
```

**Depois (SCSS Module):**
```tsx
// Component.module.scss
.container {
  @include flex(row, flex-start, center);
  gap: 0.5rem;
  padding: 1rem;
  background-color: hsl(var(--background));
}

// Component.tsx
import styles from './Component.module.scss';
<div className={styles.container}>
```

### 2. Classes Dinâmicas

**Antes:**
```tsx
className={`bg-event-${color} text-white`}
```

**Depois:**
```scss
// Usar classes específicas para cada cor
.eventTomato { background-color: hsl(var(--event-tomato)); }
.eventTangerine { background-color: hsl(var(--event-tangerine)); }
// ... etc
```

```tsx
const colorClassMap = {
  tomato: styles.eventTomato,
  tangerine: styles.eventTangerine,
  // ...
};
```

### 3. Função cn() Atualizada

A função `cn()` agora funciona com SCSS Modules:
```tsx
import { cn } from '../lib/utils';
import styles from './Component.module.scss';

<div className={cn(styles.base, isActive && styles.active, className)}>
```

## Próximos Passos

1. Converter cada componente do Calendar
2. Converter componentes UI (Button, Card, etc)
3. Atualizar build config para processar SCSS
4. Remover dependências do Tailwind
5. Criar tipos TypeScript para classes SCSS

## Componentes a Converter

- [x] Calendar.tsx
- [ ] CalendarHeader.tsx
- [ ] CalendarGrid.tsx
- [ ] WeekView.tsx
- [ ] DayView.tsx
- [ ] Sidebar.tsx
- [ ] EventModal.tsx
- [ ] ui/button.tsx
- [ ] ui/card.tsx
- [ ] ui/tabs.tsx
- [ ] ui/accordion.tsx
- [ ] ui/dialog.tsx
- [ ] ui/checkbox.tsx
- [ ] ui/input.tsx
- [ ] ui/textarea.tsx
- [ ] ui/calendar.tsx
