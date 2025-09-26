# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 starter template with TypeScript, Tailwind CSS, and shadcn/ui components. The project uses Turbopack for development and build processes, and includes Clerk for authentication and Prisma for database operations.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database (Prisma)
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio GUI
- `npx prisma migrate dev` - Run migrations in development

## Architecture

### Framework Stack
- **Next.js 15** with App Router (not Pages Router)
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library with "new-york" style
- **Clerk** for authentication
- **Prisma** as ORM

### Project Structure
```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with Navbar
├── page.tsx           # Home page
└── globals.css        # Global Tailwind styles

components/
├── ui/                # shadcn/ui components (auto-generated)
└── custom/            # Custom components (like Navbar)

lib/
└── utils.ts           # Utility functions (cn helper)
```

### Component Patterns
- Uses shadcn/ui component system with customizable variants
- Custom components go in `components/custom/`
- UI primitives from shadcn/ui go in `components/ui/`
- Aliases configured: `@/components`, `@/lib`, `@/hooks`, `@/ui`

### Styling Approach
- Tailwind CSS with CSS variables for theming
- Uses `cn()` utility from `lib/utils.ts` for conditional classes
- Component styling follows shadcn/ui patterns with class-variance-authority

### Key Dependencies
- **@clerk/nextjs** - Authentication
- **@prisma/client** - Database client
- **@radix-ui** - Headless UI primitives (via shadcn/ui)
- **lucide-react** - Icon library
- **class-variance-authority** - Component variants
- **tailwind-merge** & **clsx** - Utility class merging

## Development Notes

- Uses Turbopack for both development and production builds
- App Router architecture (not Pages Router)
- TypeScript strict mode enabled
- Component imports use `@/` alias for clean paths
- Authentication ready with Clerk integration
- Database ready with Prisma setup