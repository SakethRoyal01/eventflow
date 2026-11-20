# EventFlow — Multi-Event Management Platform

EventFlow is a reusable, multi-tenant event management platform engineered for universities, colleges, departments, and event organisers.

It enables institutions to orchestrate multi-track conferences, student hackathons, cultural festivals, and executive summits through a unified control plane.

---

## Architecture Overview

```
src/
├── app/                  # Application bootstrap, routing & providers
│   ├── App.tsx           # Root component mounting providers & router
│   ├── router.tsx        # React Router v7 configuration (11 active routes)
│   ├── providers.tsx     # TanStack Query & Context providers
│   └── route-config.ts   # Route metadata & planned capability definitions
│
├── assets/               # Static assets & textures
│   ├── images/           # Badges & covers
│   ├── icons/            # SVG glyphs
│   └── textures/         # Texture assets
│
├── components/           # Reusable component library
│   ├── ui/               # Atomic design system controls
│   │   ├── Button.tsx    # Variants: primary, secondary, accent, outline, ghost, danger
│   │   ├── Badge.tsx     # Status badges with dot indicator
│   │   ├── Avatar.tsx    # Profile avatar with fallback initials & status dot
│   │   ├── Input.tsx     # Form inputs with icon and error bindings
│   │   ├── Select.tsx    # Native styled select with custom chevron
│   │   ├── Modal.tsx     # Accessible modal dialog with Framer Motion transitions
│   │   ├── Dropdown.tsx  # Contextual popover menu with click-outside dismiss
│   │   ├── Tooltip.tsx   # Micro-hint tooltip
│   │   ├── Skeleton.tsx  # Loading shimmer placeholder
│   │   └── EmptyState.tsx# Refined empty state view
│   │
│   ├── layout/           # Application layout shell
│   │   ├── AppLayout.tsx # Layout orchestration & film grain layer
│   │   ├── Sidebar.tsx   # Fixed collapsible sidebar with workspace switcher
│   │   ├── Header.tsx    # Top bar with title, search (⌘K), & user profile
│   │   ├── MainContent.tsx # Centered responsive container
│   │   └── MobileNavigation.tsx # Drawer and mobile bottom dock
│   │
│   └── shared/           # Composed layout elements
│       ├── PageHeader.tsx # Route breadcrumbs and title banner
│       ├── StatCard.tsx  # Key metric cards with trend indicators
│       ├── SearchBar.tsx # Input with keyboard shortcut cues
│       ├── DataTable.tsx # Standard data table with status badges
│       ├── SectionHeading.tsx # Section headers with action slot
│       └── ModulePlaceholder.tsx # Intentional placeholder for future modules
│
├── features/             # Modular feature slices
│   ├── dashboard/        # Operational workspace overview (fully implemented)
│   ├── workspaces/       # Multi-tenant institution management
│   ├── events/           # Event schedules, ticketing & categories
│   ├── team/             # RBAC staff & coordinator management
│   ├── registrations/    # Public forms & bulk imports
│   ├── imports/          # Excel & CSV data parsing
│   ├── payments/         # Payment verification & ledger
│   ├── participants/     # Unified attendee registry
│   ├── passes/           # Cryptographic QR pass generation
│   ├── gates/            # Optical QR gate scanning stations
│   ├── attendance/       # Live attendance & entrance analytics
│   ├── activities/       # Workshops, breakout sessions & seating
│   ├── food/             # Meal coupon distribution & dietary tracking
│   ├── teams/            # Volunteer rosters & shift scheduling
│   └── analytics/        # Executive reports & conversion funnels
│
├── hooks/                # Custom hooks (useWorkspace, useDashboardData)
├── lib/                  # Utilities, constants & Zod validation schemas
├── services/             # Mock service layer & API contracts
├── types/                # Strict TypeScript interfaces (workspace, event, RBAC)
└── styles/               # Centralized token stylesheets
    ├── theme.css         # Brand colors, surfaces, status tokens & spacing
    ├── typography.css    # Editorial sans & monospace typographic scales
    ├── grain.css         # Subtle SVG noise pseudo-element
    └── globals.css       # Reset, scrollbars, and utility classes
```

---

## Design System & Color Tokens

The visual foundation uses a four-color palette on a dark neutral canvas:

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| **Electric Violet** | `#834DFB` | Primary actions, active navigation states, brand accents |
| **Turbo** | `#F0E100` | High-visibility status indicators, active tags, subtle badges |
| **Haiti** | `#18102B` | Elevated panels, sidebars, cards, modal surfaces |
| **Blue Chalk** | `#F5F3FF` | High-contrast readable typography and icons |
| **Neutral Background** | `#08070C` | Primary application canvas |

All styling references CSS variables defined centrally in `src/styles/theme.css`:
- `--color-primary`: `#834DFB`
- `--color-accent`: `#F0E100`
- `--color-surface`: `#18102B`
- `--color-text`: `#F5F3FF`
- `--color-background`: `#08070C`

### Subtle Film Grain Texture
Rendered via a lightweight, zero-dependency inline SVG fractalNoise filter (`src/styles/grain.css`):
- `opacity: 0.03`
- `pointer-events: none`
- `position: fixed; inset: 0;`
- Respects `@media (prefers-reduced-motion: reduce)`

---

## Active Application Routes

| Path | Module | Status |
| :--- | :--- | :--- |
| `/dashboard` | Workspace Overview | **Implemented** |
| `/events` | Events Management | Phase 2 Foundation |
| `/team` | Team & RBAC | Phase 2 Foundation |
| `/registrations` | Registrations & Import | Phase 2 Foundation |
| `/participants` | Attendee Directory | Phase 2 Foundation |
| `/payments` | Payment Verification | Phase 2 Foundation |
| `/gates` | Gate Stations & QR | Phase 2 Foundation |
| `/attendance` | Live Attendance Ticker | Phase 2 Foundation |
| `/activities` | Activities & Catering | Phase 2 Foundation |
| `/analytics` | Reports & Intelligence | Phase 2 Foundation |
| `/settings` | Workspace Configuration | Phase 2 Foundation |

---

## Supabase Backend Compatibility

The database foundation is established under `supabase/`:
- `supabase/migrations/20260101000000_initial_schema.sql`: Full PostgreSQL schema with Row-Level Security (RLS) policies and indexes.
- `supabase/functions/invite-member/`: Deno Edge Function for member invitations.
- `supabase/functions/submit-registration/`: Deno Edge Function for validating submissions and issuing QR pass tokens.
- `supabase/functions/validate-pass/`: Deno Edge Function for gate scanner verification.
- `supabase/seed.sql`: Realistic seed data matching the mock fixtures.
- `supabase/tests/schema_test.sql`: Verification script for tables and RLS constraints.

---

## Development

```bash
# Run local development server
npm run dev

# Run TypeScript verification & production build
npm run build
```
