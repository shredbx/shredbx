# /src/apps Directory

## Purpose and Application Strategy

This directory contains **complete, deployable applications** that represent user-facing
products. Each app is a standalone executable with its own deployment pipeline, but shares
packages and patterns from the monorepo ecosystem.

## Naming Conventions and Reasoning

### Core App Names

-
- **`
web/`**
  **`
mobile/`**
- Main Next.js application (shredbx.com)
- React Native app showcasing native functionality

### Why These Specific Names?

**`
web` (not `website`
,
`
`
app
`, or
main`)**

-
-
-
- **Reflects platform**
- clearly indicates web-based application
  **Matches deployment**
- corresponds to web deployment target
  **Industry standard**
- common convention in monorepo projects
  **Brevity**
- short name for frequent referencing
  **`mobile` (not `
`
  app
  `native`
  ,
  , or
  `ios-android`)**
-
-
-
- **Platform clarity**
  **Future-proof**
  **Parallel naming**
  **Scope indication**
- indicates mobile platform focus
- works for iOS, Android, or other mobile platforms
- matches
  `
web`
  naming pattern
- shows this is for mobile-specific features

### Future Application Naming

For any additional open source apps included in this monorepo:
**Next.js Applications**: Use
`
-web`
suffix

-
-
- `dashboard-web/`
- Admin dashboard application
  `docs-web/`
- Documentation website
  `blog-web/`
- Blog platform
  **Mobile Applications**: Use
  `-mobile`
  suffix
- `dashboard-mobile/`
- Mobile admin app
-
- `field-mobile/`
  `
pos-mobile/`
- Field service app
- Point of sale mobile app

### Why Suffixed Naming for Future Apps?

-
-
-
- **Clear platform indication**
  **Prevents conflicts**
- **Parallel development**
  **Deployment clarity**
- immediately know deployment target
  `dashboard`
  vs
  `dashboard-web`
  vs
  `dashboard-mobile
`
- can have web and mobile versions of same app
- CI/CD systems can target specific platforms

## Application Categories and Integration Strategy

### Internal Repository Apps (`/src/apps/web`)

**Purpose**: Applications that are part of the shredbx open source project
**Characteristics**:

- Full source code included in monorepo
- Shares all packages and utilities
- Uses internal patternbook documentation
- Deployed as part of monorepo CI/CD
  **Benefits**:
-
-
-
- **Immediate feedback**
  **Unified testing**
  **Shared tooling**
  **Pattern validation**
- changes to packages reflect instantly
- can run integration tests across entire system
- uses same build, test, and deploy processes
- proves packages work in real applications

### Symlinked External Apps

**Purpose**: Production applications from other repositories for development and pattern
extraction
**Process**: External apps symlinked to
`/src/apps/external-app-name/`

#### Why Symlink External Apps?

## **Scraping Workflow Benefits**:

-
-
- **Pattern extraction**
  **Real-world validation**
  **Knowledge capture**
  **Anti-pattern identification**
- identify reusable patterns from working code
- see how packages perform in production apps
- document successful implementations
- learn what doesn’t work
  **Development Workflow Benefits**:
-
-
-
- **Instant package updates**
- external apps reflect monorepo changes immediately
  **No publish cycle**
- test package changes without publishing to npm
  **Real context testing**
- validate changes in actual production scenarios
  **Faster iteration**
- skip the publish-install-test cycle
  **Deployment Separation**:
-
-
- **Development time**
  **Deployment time**
  **Clean separation**
- uses monorepo packages directly via symlinks
- automatically switches to published package versions
- production deployments don’t depend on monorepo state

## AI-Driven App Bootstrapping

### LLM-Powered App Creation

When creating new applications, LLM agents can access the complete patternbook to
understand:
**Technology Stack Decisions**:

-
-
-
- **Supabase**
  **Vercel**
  **shadcn/ui**
  **Localization**
- Database, authentication, and storage solutions
- Deployment, domain management, and environment variables
- Component library and design system
- i18n implementation patterns
  **Architecture Patterns**:
-
-
-
- **CMS integration**
  **Authentication flows**
  **Database patterns**
  **Deployment strategies**
- Content management with forms and listings
- Sign-up, sign-in, and user management
- Data modeling and API design
- Environment setup and CI/CD

### Why These Technology Choices?

## **Supabase Environment**:

-
-
-
- **Integrated backend**
- Database, auth, storage in one platform
  **Real-time features**
- Built-in subscriptions and live updates
  **Developer experience**
- Excellent TypeScript support and tooling
  **Scaling**
- Handles growth from prototype to production
  **Open source**
- Can self-host if needed
  **Vercel Deployment**:
-
-
-
-
- **One-click solutions**
- Deploy, domains, environments in single platform
  **Monorepo support**
- Native support for workspace deployments
  **Environment management**
- Easy configuration across environments
  **Performance**
- Global CDN and optimized builds
  **Integration**
- Works seamlessly with Next.js and React
  **shadcn/ui Components**:
-
-
-
-
- **Modern design**
- Contemporary UI patterns and accessibility
  **Customizable**
- Easy to adapt to specific brand requirements
  **TypeScript native**
- Excellent developer experience
  **Community**
- Large ecosystem and examples
  **Performance**
- Optimized components with minimal bundle size

### Bootstrapping Process

**Step 1: AI Analysis**

- LLM accesses patternbook via
  `patternbook.shredbx.com/mcp`
- Analyzes existing patterns and implementations
- Suggests appropriate technology stack
- Recommends project structure
  **Step 2: Template Generation**
- Creates application structure following established patterns
- Sets up build tools and configuration
- Configures deployment pipeline
- Adds initial documentation
  **Step 3: Integration Setup**
- Links to appropriate monorepo packages
- Configures database and authentication
- Sets up environment variables and deployment
- Creates initial test suite

## Build and Development Integration

### Turborepo Integration

```json
{
"pipeline": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**"
,
"
.next/**"]
},
"dev": {
"cache": false,
"persistent": true
},
"test": {
"dependsOn": ["build"]
}
}
}
```

### Package Consumption Strategy

**Development Time**:

- Import packages directly:
  `import { Component } from '@shredbx/ui-components'`
- Turbo handles dependency building automatically
- Changes reflect immediately without publish step
  **Production Deployment**:
- Uses published versions from npm registry
- Ensures stable, tested versions in production
- Allows for independent app deployments

### Patternbook Integration

**Automatic Index Updates**:

- Build process updates
  `
.patternbook/`
  with latest documentation
- App deployment triggers patternbook regeneration
- SEO and performance optimized static documentation pages
- Localized documentation available in multiple languages
  **AI Knowledge Access**:
- Apps can query patternbook index for documentation
- LLM agents access patterns via MCP server
- Real-time access to best practices and implementations
- Cost-effective development with simple models

## Deployment Strategy

### Main Web App (`/src/apps/web`)

-
-
-
- **Platform**: Vercel
  **Domain**: shredbx.com
  **Build**: Next.js static generation
  **Environment**: Production, staging, preview branches

### Mobile App (`/src/apps/mobile

## `)

-
-
- **Platform**: Expo/React Native
  **Distribution**: App stores and Expo Go
  **Build**: EAS Build service
  **Environment**: Development, staging, production

### Future Applications

-
-
- **Playground subdomain**:
  `playground.shredbx.com` for experimental features
  **Documentation site**: Integrated into main site or separate subdomain
  **Additional apps**: Independent deployment pipelines

## Technology Stack per Platform

### Next.js Applications (web,

- -web)

```json
{
  "framework": "Next.js 14+",
  "styling": "Tailwind CSS + shadcn/ui",
  "database": "Supabase PostgreSQL",
  "auth": "Supabase Auth",
  "deployment": "Vercel",
  "testing": "Jest + React Testing Library",
  "e2e": "Playwright"
}
```

### React Native Applications (mobile,

```json
*
-mobile)
{
"framework": "Expo + React Native"
,
"navigation": "Expo Router"
,
"styling": "NativeWind (Tailwind for RN)"
,
"state": "Zustand + React Query"
,
"deployment": "EAS Build + App Stores"
,
"testing": "Jest + React Native Testing Library"
}
```

## Future Application Ideas

### Planned Applications

-
-
-
-
- **Dashboard Web**
- Admin interface for content management
  **Documentation Web**
- Standalone documentation site
  **Playground Web**
- Interactive component testing environment
  **Field Mobile**
- Mobile app for service management
  **POS Mobile**
- Point of sale application

### Evaluation Criteria for New Apps

1.
1.
1.
1.
1. **Serves genuine user need**

- solves real problems
  **Benefits from monorepo**
- reuses existing packages significantly
  **Open source value**
- provides value to broader community
  **Maintenance viable**
- team can sustain development
  **Technical coherence**
- fits within established architecture

## External App Integration Examples

### Symlink Setup Process

```bash
# Link external production app for development
ln -s /path/to/external-app /src/apps/external-app
# App can now import monorepo packages directly
# import { Button } from '@shredbx/ui-components'
```

### Development Benefits

-
- **Instant feedback**
  **Pattern extraction**
- see package changes in real app immediately
- identify successful implementations to document
-
- **Integration testing**
  **Performance validation**
- verify packages work in production context
- ensure changes don’t break existing functionality
  This application strategy balances rapid development with production stability, while enabling
  both human developers and AI assistants to create new applications following established
  patterns and best practices.
