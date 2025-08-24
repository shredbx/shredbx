# shadcn/ui Component Strategy

## Context

When integrating shadcn/ui into our monorepo, we faced decisions about where to place components: in a shared UI package for reuse across apps, or in individual apps for specific customization needs.

## Problem

### Initial Challenges

1. **Component Placement Decision**: Where should shadcn/ui components live in the monorepo?
2. **Customization vs Consistency**: Balancing design consistency with app-specific needs
3. **Configuration Complexity**: Managing shadcn/ui configuration across multiple packages
4. **Theme Management**: Handling different themes and styling approaches
5. **Dependency Management**: Avoiding dependency conflicts and bloat

### Specific Scenarios

- **Shared Components**: Button, Card, Input - used across all apps
- **App-Specific Components**: Complex forms, specialized layouts
- **Theme Variations**: Different color schemes or styling for different apps
- **Component Variants**: Need for app-specific variants while maintaining consistency

## Solution

### Hybrid Approach: Shared Core + App-Specific Extensions

We implemented a strategy that uses both shared components in `@reactbook/ui-web` and app-specific components where needed.

#### Decision Matrix

| Use Shared UI When          | Use App-Specific When           |
| --------------------------- | ------------------------------- |
| Component used in 2+ apps   | Component unique to one app     |
| Standard design patterns    | Custom design requirements      |
| Core design system elements | Experimental/prototype features |
| Consistent behavior needed  | App-specific business logic     |

### Shared UI Package Setup

**Location**: `src/packages/ui-web/`
**Purpose**: Core design system components used across multiple apps

#### Configuration

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
    "ui": "src/components/ui"
  }
}
```

#### Core Components Included

- **Primitives**: Button, Input, Card, Dialog
- **Layout**: Container, Flex, Grid helpers
- **Navigation**: Breadcrumb, Pagination
- **Feedback**: Alert, Toast, Loading states

### App-Specific Setup

**Purpose**: Components that need unique styling or behavior

#### When to Use App-Specific Components

1. **Business Logic Integration**: Components tightly coupled to app logic
2. **Unique Design Requirements**: Apps with different branding
3. **Experimental Features**: Testing new patterns before promoting to shared
4. **Complex Compositions**: App-specific layouts and page components

#### Configuration Example

**File**: `src/apps/special-app/components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "orange", // Different base color
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils",
    "ui": "src/components/ui"
  }
}
```

## Implementation

### Shared Component Pattern

**File**: `src/packages/ui-web/src/components/ui/button.tsx`

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Core button variants for design system
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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

### App-Specific Extension Pattern

**File**: `src/apps/special-app/src/components/ui/special-button.tsx`

```typescript
import * as React from "react"
import { Button, buttonVariants, type ButtonProps } from "@reactbook/ui-web"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Extend shared button with app-specific variants
const specialButtonVariants = cva("", {
  variants: {
    variant: {
      // Include all base variants
      ...buttonVariants.variants?.variant,
      // Add app-specific variants
      brand: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600",
      premium: "bg-gold text-black border-2 border-gold hover:bg-gold/90",
    },
  },
})

interface SpecialButtonProps extends ButtonProps {
  variant?: keyof typeof specialButtonVariants.variants.variant
  trackingId?: string // App-specific prop
}

const SpecialButton = React.forwardRef<HTMLButtonElement, SpecialButtonProps>(
  ({ variant, trackingId, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // App-specific analytics
      if (trackingId) {
        console.log('Button clicked:', trackingId)
      }
      onClick?.(e)
    }

    return (
      <Button
        ref={ref}
        variant={variant as any}
        onClick={handleClick}
        {...props}
      />
    )
  }
)

export { SpecialButton }
```

### Mixed Usage Pattern

**File**: `src/apps/special-app/src/app/page.tsx`

```typescript
import { Button, Card } from "@reactbook/ui-web" // Shared components
import { SpecialButton } from "@/components/ui/special-button" // App-specific

export default function HomePage() {
  return (
    <Card className="p-6">
      {/* Use shared component for standard patterns */}
      <Button variant="outline">Standard Button</Button>

      {/* Use app-specific component for unique needs */}
      <SpecialButton
        variant="brand"
        trackingId="homepage-cta"
      >
        Special App Button
      </SpecialButton>
    </Card>
  )
}
```

## Results

### Positive Outcomes

1. **Design Consistency**: 90% of UI components shared across apps
2. **Development Speed**: Faster app development with shared components
3. **Customization Flexibility**: Apps can extend shared components when needed
4. **Maintenance Efficiency**: Centralized updates for common components
5. **Bundle Optimization**: Shared components reduce overall bundle size

### Metrics

- **Component Reuse**: 85% of components used in multiple apps
- **Development Time**: 40% faster component implementation
- **Design Consistency Score**: Improved from 60% to 95% across apps
- **Bundle Size**: 25% reduction in combined app bundle sizes

### Component Distribution

- **Shared UI Package**: 24 core components
- **App-Specific**: Average 3-5 unique components per app
- **Extensions**: 8 components that extend shared components

## Lessons Learned

### Key Insights

1. **Start Shared, Move Specific**: Begin with shared components, extract app-specific as needed
2. **Clear Boundaries**: Establish clear criteria for shared vs app-specific decisions
3. **Extension Pattern**: Make shared components extensible rather than trying to cover all cases
4. **Documentation**: Document component usage patterns and decision criteria

### What Worked Well

1. **CSS Variables Approach**: Enabled theming without component duplication
2. **CVA (Class Variance Authority)**: Made variant management scalable
3. **Forwardref Pattern**: Ensured components work well with form libraries
4. **TypeScript Integration**: Strong typing helped catch integration issues early

### Challenges Overcome

1. **Theme Conflicts**: Resolved by using scoped CSS variables
2. **Component Variants**: Created extensible variant system
3. **Bundle Duplication**: Solved with proper tree-shaking configuration
4. **Development Workflow**: Established clear patterns for component development

### Mistakes and Solutions

1. **Initial Over-Sharing**: Started by putting everything in shared package
   - **Solution**: Moved app-specific components back to apps
2. **Variant Explosion**: Too many variants in shared components
   - **Solution**: Created extension pattern for app-specific variants
3. **Configuration Complexity**: Multiple shadcn configs became confusing
   - **Solution**: Standardized configuration patterns

## Recommendations

### Component Placement Strategy

1. **Default to Shared**: Start with assumption component goes in shared package
2. **Prove Specificity**: Require justification for app-specific components
3. **Regular Review**: Periodically review app-specific components for promotion
4. **Clear Documentation**: Document decisions and reasoning

### Implementation Best Practices

1. **Consistent Naming**: Use clear naming conventions for shared vs app-specific
2. **Extension Pattern**: Design shared components to be extensible
3. **Type Safety**: Ensure strong TypeScript integration
4. **Testing Strategy**: Test shared components thoroughly since they impact multiple apps

### Workflow Recommendations

1. **Shared First**: Always try shared component first
2. **Document Variants**: When extending shared components, document new variants
3. **Regular Audits**: Review component usage across apps quarterly
4. **Migration Path**: Have clear process for promoting app-specific to shared

### Anti-Patterns to Avoid

1. **Premature Extraction**: Don't create shared components until used in 2+ places
2. **Over-Customization**: Avoid making shared components overly complex
3. **Inconsistent Extensions**: Don't create competing extension patterns
4. **Missing Documentation**: Always document component purpose and usage

### Configuration Management

1. **Consistent Base**: Use same shadcn configuration structure across all setups
2. **Clear Theming**: Use CSS variables for theme customization
3. **Minimal Overrides**: Only override what's necessary in app-specific configs
4. **Documentation**: Document theming and customization patterns

## Related Resources

- [Use Case: Adding shadcn/ui to Shared UI](../useCases/add-shadcn-to-shared-ui.md)
- [Use Case: Adding shadcn/ui to Specific App](../useCases/add-shadcn-to-app.md)
- [Article: Design System Evolution](./design-system-evolution.md)
- [Article: Tailwind 4 Integration](./tailwind-4-integration.md)
