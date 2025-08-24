# Adding shadcn/ui to Shared UI Package

## Overview

Set up shadcn/ui components in the shared ui-web package to be used across multiple apps in the monorepo. This centralizes component management and ensures consistency.

## Prerequisites

- `@reactbook/ui-web` package exists
- Tailwind CSS 4 configured in the monorepo
- Understanding of shadcn/ui component system

## Step-by-Step Instructions

### 1. Install shadcn/ui Dependencies in Shared UI Package

**File**: `src/packages/ui-web/package.json`

Add shadcn/ui dependencies:

```json
{
  "dependencies": {
    "@reactbook/shared-ui-deps": "workspace:*",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.8.0"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

### 2. Create shadcn/ui Configuration

**File**: `src/packages/ui-web/components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components/ui",
    "utils": "src/lib/utils",
    "ui": "src/components/ui",
    "lib": "src/lib",
    "hooks": "src/hooks"
  },
  "iconLibrary": "lucide"
}
```

### 3. Create Utility Functions

**File**: `src/packages/ui-web/src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4. Create Base CSS with CSS Variables

**File**: `src/packages/ui-web/src/styles/globals.css`

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 5. Add First shadcn/ui Component (Button)

Run shadcn/ui CLI from the ui-web package:

```bash
cd src/packages/ui-web
npx shadcn@latest add button
```

This creates:
**File**: `src/packages/ui-web/src/components/ui/button.tsx`

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 6. Update Package Exports

**File**: `src/packages/ui-web/src/index.ts`

```typescript
// UI Components
export * from "./components/ui/button";

// Utilities
export * from "./lib/utils";

// Styles - apps need to import this
export { default as globals } from "./styles/globals.css";

// Re-export common types
export type { VariantProps } from "class-variance-authority";
```

### 7. Update Component Index

**File**: `src/packages/ui-web/src/components/index.ts`

```typescript
// Export all UI components
export * from "./ui/button";
// Add more components as they are added
```

### 8. Configure Build to Include CSS

**File**: `src/packages/ui-web/tsconfig.json`

```json
{
  "extends": "@reactbook/typescript-config/tsconfig.package.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*", "src/**/*.css"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### 9. Update Package Scripts

**File**: `src/packages/ui-web/package.json` (Update scripts)

```json
{
  "scripts": {
    "build": "tsc && cp -r src/styles dist/",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "shadcn": "npx shadcn@latest"
  }
}
```

## Files Created/Modified

- `src/packages/ui-web/package.json` - Add dependencies and scripts
- `src/packages/ui-web/components.json` - shadcn/ui configuration
- `src/packages/ui-web/src/lib/utils.ts` - Utility functions
- `src/packages/ui-web/src/styles/globals.css` - CSS variables and base styles
- `src/packages/ui-web/src/components/ui/button.tsx` - Button component
- `src/packages/ui-web/src/index.ts` - Updated exports
- `src/packages/ui-web/src/components/index.ts` - Component exports
- `src/packages/ui-web/tsconfig.json` - Include CSS files

## Using in Apps

### 1. Install Dependencies in App

**File**: `src/apps/your-app/package.json`

```json
{
  "dependencies": {
    "@reactbook/ui-web": "workspace:*"
  }
}
```

### 2. Import CSS in App

**File**: `src/apps/your-app/src/app/globals.css`

```css
@import "@reactbook/ui-web/dist/styles/globals.css";

/* App-specific styles */
```

### 3. Use Components in App

**File**: `src/apps/your-app/src/app/page.tsx`

```typescript
import { Button } from '@reactbook/ui-web'

export default function HomePage() {
  return (
    <div className="p-8">
      <Button variant="default" size="lg">
        Click me
      </Button>
      <Button variant="outline" size="sm">
        Outline button
      </Button>
    </div>
  )
}
```

## Adding More Components

### Using shadcn/ui CLI

```bash
cd src/packages/ui-web

# Add specific components
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog

# Add all components
npx shadcn@latest add --all
```

### Update Exports

After adding components, update exports:
**File**: `src/packages/ui-web/src/index.ts`

```typescript
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/input";
export * from "./components/ui/dialog";
// Add new components here
```

## Verification

### 1. Build Package

```bash
cd src/packages/ui-web
pnpm install
pnpm build
```

### 2. Check Build Output

```bash
ls dist/
# Should include: components/, lib/, styles/, index.js, index.d.ts
```

### 3. Test in App

```bash
cd src/apps/your-app
pnpm install
pnpm dev
# Import and use Button component
```

### 4. Verify Styling

- Components should have proper Tailwind styling
- CSS variables should apply correctly
- Dark mode should work if implemented

## Troubleshooting

### Components Not Styled

- Ensure globals.css is imported in the app
- Check Tailwind CSS is configured in the app
- Verify CSS variables are defined

### Import Errors

- Ensure package is built: `pnpm build`
- Check export paths in index.ts
- Verify workspace dependency is installed

### Type Errors

- Ensure all peer dependencies are satisfied
- Check TypeScript configuration
- Verify component props are properly typed

## Related Use Cases

- [Adding Package to App](./add-package-to-app.md)
- [Adding shadcn/ui to Specific App](./add-shadcn-to-app.md)
- [Managing Tailwind Configuration](./manage-tailwind-config.md)
