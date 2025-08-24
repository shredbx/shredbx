# Adding shadcn/ui to Specific App

## Overview

Set up shadcn/ui components directly in a specific app when components are not needed across the monorepo. This is useful for app-specific UI components that don't belong in the shared UI package.

## Prerequisites

- Target app exists in `src/apps/`
- Tailwind CSS 4 configured in the app
- Understanding when to use app-specific vs shared components

## When to Use This Approach

### Use App-Specific shadcn/ui When:

- Components are unique to this app
- App has specific design requirements
- Components won't be reused in other apps
- App needs different shadcn/ui configuration (theme, styling)

### Use Shared UI Instead When:

- Components will be used across multiple apps
- Need consistent design system
- Components are generic/reusable

## Step-by-Step Instructions

### 1. Install shadcn/ui Dependencies in App

**File**: `src/apps/your-app/package.json`

Add shadcn/ui dependencies:

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.8.0",
    "lucide-react": "^0.468.0"
  }
}
```

### 2. Create shadcn/ui Configuration

**File**: `src/apps/your-app/components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils",
    "ui": "src/components/ui",
    "lib": "src/lib",
    "hooks": "src/hooks"
  },
  "iconLibrary": "lucide"
}
```

### 3. Create Utility Functions

**File**: `src/apps/your-app/src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4. Update Tailwind Configuration

**File**: `src/apps/your-app/tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Include shared UI if also using it
    "../../packages/ui-web/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 5. Update Global CSS with CSS Variables

**File**: `src/apps/your-app/src/app/globals.css`

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

/* App-specific styles can go here */
```

### 6. Install Dependencies

```bash
cd src/apps/your-app
pnpm install
```

### 7. Add shadcn/ui Components

```bash
cd src/apps/your-app

# Add specific components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog

# Or add multiple at once
npx shadcn@latest add button card input dialog form
```

### 8. Create Component Index (Optional)

**File**: `src/apps/your-app/src/components/ui/index.ts`

```typescript
// Export all UI components for easier imports
export * from "./button";
export * from "./card";
export * from "./input";
export * from "./dialog";
// Add more as you install them
```

### 9. Use Components in App

**File**: `src/apps/your-app/src/app/page.tsx`

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>App-Specific Components</CardTitle>
          <CardDescription>
            These components are specific to this app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter something..." />
          <Button variant="default" size="lg">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Mixing App-Specific and Shared Components

### Import Both Sources

```typescript
// Shared components from ui-web package
import { SharedButton, SharedCard } from '@reactbook/ui-web'

// App-specific components
import { AppButton } from '@/components/ui/button'
import { AppCard } from '@/components/ui/card'

export default function MixedPage() {
  return (
    <div className="space-y-4">
      {/* Use shared components for consistency */}
      <SharedButton variant="primary">Shared Button</SharedButton>

      {/* Use app-specific components for unique needs */}
      <AppButton variant="outline" className="app-specific-styling">
        App-Specific Button
      </AppButton>
    </div>
  )
}
```

### Avoid Naming Conflicts

**File**: `src/apps/your-app/src/components/ui/index.ts`

```typescript
// Rename to avoid conflicts with shared components
export { Button as AppButton } from "./button";
export { Card as AppCard } from "./card";

// Or use namespacing
export * as AppUI from "./button";
export * as AppCard from "./card";
```

## Customizing App-Specific Components

### Custom Styling

**File**: `src/apps/your-app/src/components/ui/button.tsx` (after shadcn generation)

```typescript
// Customize the button variants for this app
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        // Add app-specific variants
        brand:
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
        special: "bg-amber-500 text-amber-950 hover:bg-amber-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        // Add app-specific sizes
        xl: "h-12 rounded-lg px-12 text-lg",
      },
    },
  }
);
```

### App-Specific Themes

**File**: `src/apps/your-app/src/app/globals.css` (add custom variables)

```css
@layer base {
  :root {
    /* Standard shadcn variables */
    --background: 0 0% 100%;
    /* ... other variables ... */

    /* App-specific variables */
    --app-brand: 220 90% 56%;
    --app-accent: 280 100% 70%;
  }
}
```

## Files Created/Modified

- `src/apps/your-app/package.json` - Add shadcn dependencies
- `src/apps/your-app/components.json` - shadcn configuration
- `src/apps/your-app/src/lib/utils.ts` - Utility functions
- `src/apps/your-app/tailwind.config.ts` - Extended config with shadcn colors
- `src/apps/your-app/src/app/globals.css` - CSS variables and base styles
- `src/apps/your-app/src/components/ui/*` - Generated shadcn components
- `src/apps/your-app/src/components/ui/index.ts` - Component exports (optional)

## Verification

### 1. Install and Build

```bash
cd src/apps/your-app
pnpm install
pnpm build
```

### 2. Start Development Server

```bash
pnpm dev
```

### 3. Test Components

- Import and use components in pages
- Verify styling works correctly
- Check dark mode (if implemented)
- Test responsive behavior

### 4. Verify No Conflicts

If also using shared UI:

- Ensure no naming conflicts
- Check that both component sets work together
- Verify CSS doesn't conflict

## Troubleshooting

### Components Not Styled

- Check that globals.css has the CSS variables
- Verify Tailwind config includes shadcn color definitions
- Ensure PostCSS is configured correctly

### Import Errors

- Check that utils.ts exists and exports cn function
- Verify component file paths match aliases in components.json
- Ensure all dependencies are installed

### Conflicts with Shared UI

- Use different component names or namespacing
- Check for CSS variable conflicts
- Consider if components should be in shared UI instead

### Build Errors

- Ensure TypeScript paths are configured correctly
- Check that all imports resolve
- Verify component props are properly typed

## Related Use Cases

- [Adding shadcn/ui to Shared UI](./add-shadcn-to-shared-ui.md)
- [Managing Tailwind Configuration](./manage-tailwind-config.md)
- [Adding Package to App](./add-package-to-app.md)
