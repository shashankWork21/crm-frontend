# CRM Frontend - Project Guide

## Project Overview

This is a Next.js 16 frontend application for a Customer Relationship Management (CRM) system called SmartAlgorhythm. The application provides comprehensive contact management, lead magnet functionality, team collaboration, and organization management capabilities.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **React**: v19.2.0
- **UI Components**: Radix UI primitives + shadcn/ui
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query) v5
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form (inferred from patterns)
- **Icons**: Lucide React
- **File Upload**: React Dropzone, AWS S3
- **Analytics**: Vercel Analytics
- **Date Handling**: date-fns, react-day-picker

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── about/             # About page
│   │   ├── pricing/           # Pricing page
│   │   ├── contact-us/        # Contact page
│   │   ├── login/             # Authentication
│   │   ├── register/          # Registration
│   │   ├── forgot-password/   # Password recovery
│   │   ├── reset-password/    # Password reset
│   │   ├── profile/           # User profile
│   │   ├── dashboard/         # Main dashboard
│   │   ├── contacts/          # Contact management
│   │   ├── lead-magnets/      # Lead magnet management
│   │   ├── organisation/      # Organization management
│   │   └── api/               # API routes (new)
│   │
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── auth/             # Authentication components
│   │   ├── contacts/         # Contact management components
│   │   ├── lead-magnet/      # Lead magnet components
│   │   ├── organisation/     # Organization components
│   │   ├── team/             # Team management components
│   │   ├── profile/          # Profile components
│   │   ├── country/          # Country selector
│   │   ├── state/            # State selector
│   │   ├── city/             # City selector
│   │   ├── sidebar/          # Navigation sidebar
│   │   ├── general/          # Shared components
│   │   └── views/            # Page view components
│   │
│   ├── actions/              # Server actions
│   │   ├── auth.ts          # Authentication actions
│   │   ├── contact.ts       # Contact CRUD operations
│   │   ├── lead-magnet.ts   # Lead magnet operations
│   │   ├── organisation.ts  # Organization operations
│   │   ├── user.ts          # User operations
│   │   ├── country.ts       # Country operations
│   │   ├── state.ts         # State operations
│   │   └── city.ts          # City operations
│   │
│   ├── db/                   # Database query functions
│   │   ├── contact.queries.ts
│   │   ├── lead-magnet.queries.ts
│   │   ├── organisation.queries.ts
│   │   ├── team.queries.ts
│   │   ├── tags.queries.ts
│   │   ├── country.queries.ts
│   │   ├── state.queries.ts
│   │   ├── city.queries.ts
│   │   └── activities.queries.ts
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── utils.ts         # General utilities
│   │   ├── types.ts         # TypeScript type definitions
│   │   ├── scopes.ts        # Permission scopes (new)
│   │   ├── tags.tsx         # Tag utilities
│   │   ├── cookies.ts       # Cookie management
│   │   ├── date.ts          # Date utilities
│   │   ├── paths/           # API path constants
│   │   ├── options/         # Form options
│   │   └── contact/         # Contact-specific utilities
│   │
│   └── hooks/               # Custom React hooks
│       └── use-create-lead-magnet.ts
│
├── next.config.ts           # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── tailwind.config.js      # Tailwind CSS configuration
```

## Key Features

### 1. Authentication & Authorization
- User registration and login
- Password reset functionality
- Protected routes
- Role-based access control (via scopes)
- Super admin registration

### 2. Contact Management
- Create, read, update, delete contacts
- Contact tables with filtering/sorting
- Organization-specific contact views
- Import contacts (Excel support via node-xlsx)
- Custom field schemas

### 3. Lead Magnets
- Create and manage lead magnets
- Multi-step lead magnet forms
- Lead magnet table views
- Instagram account integration paths
- Token-based access

### 4. Organization Management
- Multi-organization support
- Organization selection
- Organization-specific data isolation
- Organization details and settings

### 5. Team Collaboration
- Team member management
- Role assignment and changes
- Team member deletion
- Team activity tracking

### 6. Profile Management
- User profile editing
- Profile card display

### 7. File Management
- AWS S3 integration for file uploads
- Presigned URL generation
- Drag-and-drop file upload (React Dropzone)

## Development Guidelines

### Path Aliases
The project uses TypeScript path aliases:
- `@/*` maps to `./src/*`

Example: `import { Button } from '@/components/ui/button'`

### Component Patterns
1. **UI Components**: Located in `src/components/ui/`, based on shadcn/ui
2. **Feature Components**: Organized by feature (contacts, lead-magnet, etc.)
3. **View Components**: Higher-level page views in `src/components/views/`

### Data Fetching
- Uses TanStack Query for server state management
- Query functions in `src/db/*.queries.ts`
- Server actions in `src/actions/*.ts`

### Styling
- Tailwind CSS for styling
- Class variance authority (CVA) for component variants
- Tailwind merge (tw-merge) for conditional classes
- Custom animations via tw-animate-css

### Forms
- Form components in feature directories
- Date pickers, dropdowns, and custom inputs
- File upload with drag-and-drop support

### API Integration
- Axios for HTTP requests
- API paths defined in `src/lib/paths/`
- Centralized path management

## Running the Application

### Development
```bash
npm run dev
```
Runs with Turbopack for faster development builds.

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Lint
```bash
npm run lint
```

## Environment Variables
Ensure you have the necessary environment variables configured for:
- Backend API URL
- AWS S3 credentials
- Authentication tokens
- Any other service integrations

## Recent Changes
Based on git status, recent work includes:
- Lead magnet functionality expansion
- API routes addition
- Instagram account integration paths
- Token-based authentication paths
- Permission scopes implementation
- UI improvements (empty states)
- Organizational changes
- Profile and team management updates

## Pages & Routes

### Public Pages
- `/` - Landing page
- `/about` - About page
- `/pricing` - Pricing information
- `/contact-us` - Contact form
- `/privacy-policy` - Privacy policy
- `/terms-and-conditions` - Terms and conditions
- `/cancellation-refund-policy` - Cancellation and refund policy

### Authentication
- `/login` - User login
- `/register` - User registration
- `/register/super-admin` - Super admin registration
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset

### Application
- `/dashboard` - Main dashboard
- `/dashboard/team` - Team management
- `/dashboard/organisation` - Organization dashboard
- `/profile` - User profile
- `/organisation` - Organization selection/management
- `/contacts` - Contact list
- `/contacts/new` - Create new contact
- `/contacts/organisation` - Organization contacts
- `/contacts/organisation/[organisationId]` - Specific org contacts
- `/lead-magnets` - Lead magnet list
- `/lead-magnets/new` - Create lead magnet
- `/lead-magnets/[id]` - View/edit lead magnet

## Design System

### UI Components (shadcn/ui based)
- `alert` - Alert messages
- `badge` - Status badges
- `button` - Interactive buttons
- `calendar` - Date picker calendar
- `card` - Content containers
- `checkbox` - Checkbox inputs
- `command` - Command palette
- `dialog` - Modal dialogs
- `dropdown-menu` - Dropdown menus
- `input` - Text inputs
- `label` - Form labels
- `popover` - Popover containers
- `radio-group` - Radio button groups
- `select` - Select dropdowns
- `separator` - Visual separators
- `sheet` - Side panels
- `sidebar` - Navigation sidebar
- `skeleton` - Loading skeletons
- `spinner` - Loading spinner
- `switch` - Toggle switches
- `table` - Data tables
- `tabs` - Tab navigation
- `textarea` - Multi-line text inputs
- `tooltip` - Hover tooltips
- `empty` - Empty state component

## Best Practices

### When Adding Features
1. Follow the existing folder structure
2. Use TypeScript for all new files
3. Leverage TanStack Query for data fetching
4. Create reusable components in appropriate directories
5. Define API paths in `src/lib/paths/`
6. Add types to `src/lib/types.ts` when needed

### Code Style
- Use functional components with hooks
- Prefer server actions over client-side API calls
- Keep components small and focused
- Use proper TypeScript typing
- Follow the established naming conventions

### State Management
- Use TanStack Query for server state
- Use React hooks for local state
- Keep state as close to where it's used as possible

### Performance
- Utilize Next.js App Router features (Server Components, etc.)
- Lazy load components when appropriate
- Optimize images and assets
- Use proper caching strategies with TanStack Query

## Common Tasks

### Adding a New Page
1. Create page component in `src/app/[route]/page.tsx`
2. Add any required server actions in `src/actions/`
3. Create view component in `src/components/views/`
4. Update paths in `src/lib/paths/` if needed

### Adding a New Form
1. Create form component in appropriate feature folder
2. Define server action in `src/actions/`
3. Add API path in `src/lib/paths/`
4. Use existing UI components from `src/components/ui/`

### Adding Database Queries
1. Create or update query file in `src/db/`
2. Define server action wrapper in `src/actions/`
3. Use with TanStack Query in components

## Notes for AI Assistants

- This project uses the Next.js App Router (not Pages Router)
- Server actions are the preferred way to handle mutations
- All paths should use the `@/` alias
- Follow the existing patterns for consistency
- Check `src/lib/types.ts` for existing type definitions
- Consult `src/lib/scopes.ts` for permission-related features
- AWS S3 is used for file storage
- The application supports multi-organization/multi-tenant architecture
- Recent focus has been on lead magnet functionality and Instagram integration
