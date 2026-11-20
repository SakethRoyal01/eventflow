/**
 * EventFlow Route Configuration
 * Defines all application routes, planned metadata, and backend dependencies
 */

export interface RouteMetadata {
  id: string;
  path: string;
  title: string;
  category: string;
  description: string;
  plannedFeatures: {
    title: string;
    description: string;
  }[];
  schemaTable?: string;
  edgeFunction?: string;
}

export const ROUTE_CONFIGS: Record<string, RouteMetadata> = {
  events: {
    id: 'events',
    path: '/events',
    title: 'Events Management',
    category: 'Core Operations',
    description: 'Create, schedule, configure, and monitor multi-day university conferences, summits, and hackathons.',
    plannedFeatures: [
      {
        title: 'Multi-Track Scheduling',
        description: 'Manage keynotes, workshop tracks, and concurrent sessions across venues.',
      },
      {
        title: 'Capacity & Tier Controls',
        description: 'Set granular ticket tiers, VIP allotments, and student discounted quotas.',
      },
      {
        title: 'Custom Registration Fields',
        description: 'Collect department IDs, dietary preferences, and t-shirt sizes with form validation.',
      },
      {
        title: 'Status Lifecycle',
        description: 'Automate transition between Draft, Published, Registration Open, In Progress, and Completed.',
      },
    ],
    schemaTable: 'events, event_tracks, ticket_tiers',
    edgeFunction: 'supabase/functions/publish-event',
  },
  team: {
    id: 'team',
    path: '/team',
    title: 'Team & Role Permissions',
    category: 'Access Control',
    description: 'Coordinate organizers, student volunteers, gate security staff, and data analysts with strict RLS permissions.',
    plannedFeatures: [
      {
        title: 'Granular Role Assignment',
        description: 'Assign roles: Owner, Organizer, Coordinator, Gate Staff, or Analyst.',
      },
      {
        title: 'Email Invitations',
        description: 'Secure tokenized invite links powered by Supabase Auth and Edge Functions.',
      },
      {
        title: 'Audit Logging',
        description: 'Track member permission changes, pass overrides, and event modifications.',
      },
      {
        title: 'Gate Station Pinning',
        description: 'Restrict gate staff access to designated physical entrances or time windows.',
      },
    ],
    schemaTable: 'workspace_members, role_permissions',
    edgeFunction: 'supabase/functions/invite-member',
  },
  registrations: {
    id: 'registrations',
    path: '/registrations',
    title: 'Registrations & Spreadsheet Import',
    category: 'Participant Operations',
    description: 'Bulk import participant lists from Excel / Google Sheets and oversee real-time participant registrations.',
    plannedFeatures: [
      {
        title: 'Excel / CSV Smart Parser',
        description: 'Auto-detect columns for Name, Email, Ticket Category, College, and Payment ID.',
      },
      {
        title: 'Validation & Duplicate Scrubbing',
        description: 'Real-time schema verification to prevent duplicate emails or invalid IDs.',
      },
      {
        title: 'Batch QR Pass Issuance',
        description: 'Generate high-res cryptographic QR passes with unique redemption tokens in batch.',
      },
      {
        title: 'Export Filtered Datasets',
        description: 'Download CSV and Excel reports segmented by department, status, or date.',
      },
    ],
    schemaTable: 'registrations, batch_imports',
    edgeFunction: 'supabase/functions/submit-registration',
  },
  participants: {
    id: 'participants',
    path: '/participants',
    title: 'Participant Registry',
    category: 'Participant Operations',
    description: 'Searchable master directory of registered attendees across all active and archived events.',
    plannedFeatures: [
      {
        title: 'Unified Attendee Directory',
        description: 'Search across 10,000+ attendees by name, email, roll number, or QR token.',
      },
      {
        title: 'Profile & Ticket Details',
        description: 'Inspect assigned ticket tiers, dietary preferences, and meal redemption status.',
      },
      {
        title: 'Resend Pass Credentials',
        description: 'One-click email/SMS pass credential reissuance for attendees at check-in.',
      },
      {
        title: 'Participation Certificates',
        description: 'Generate attendance-verified digital participation credentials post-event.',
      },
    ],
    schemaTable: 'participants, participant_profiles',
    edgeFunction: 'supabase/functions/sync-participant',
  },
  payments: {
    id: 'payments',
    path: '/payments',
    title: 'Payment Tracking & Verification',
    category: 'Financial Ledger',
    description: 'Verify bank transfers, UPI receipts, and Stripe/Razorpay transactions with reconciliation logs.',
    plannedFeatures: [
      {
        title: 'Receipt Verification Flow',
        description: 'Manual and automated review queue for wire transfer receipts and payment screenshots.',
      },
      {
        title: 'Payment Gateway Webhooks',
        description: 'Instant ticket issuance upon verified webhook confirmations from Stripe or Razorpay.',
      },
      {
        title: 'Refund & Discrepancy Manager',
        description: 'Issue refunds and mark invalid transaction IDs with automated attendee notices.',
      },
      {
        title: 'Financial Breakdown',
        description: 'Track net collections, processing fees, and tax deductions per event.',
      },
    ],
    schemaTable: 'payments, payment_transactions',
    edgeFunction: 'supabase/functions/verify-payment',
  },
  gates: {
    id: 'gates',
    path: '/gates',
    title: 'Gate Stations & QR Scanning',
    category: 'Check-In Security',
    description: 'High-speed camera QR scanner interface optimized for mobile devices and stationary kiosks.',
    plannedFeatures: [
      {
        title: 'Instant Camera QR Scanner',
        description: 'Sub-second optical QR code reader with haptic feedback and audio confirmation.',
      },
      {
        title: 'Multi-Gate Realtime Sync',
        description: 'Supabase Realtime prevents double-entry across multiple concurrent entrance gates.',
      },
      {
        title: 'Offline Pass Fallback',
        description: 'Local caching allowing gate check-ins even during temporary venue network drops.',
      },
      {
        title: 'Manual Token Lookup',
        description: 'Fallback search by attendee name or confirmation ID when phone screens are cracked.',
      },
    ],
    schemaTable: 'gate_stations, gate_logs, qr_passes',
    edgeFunction: 'supabase/functions/validate-pass',
  },
  attendance: {
    id: 'attendance',
    path: '/attendance',
    title: 'Attendance Tracking',
    category: 'Real-time Metrics',
    description: 'Live attendance curves, peak entrance hour heatmaps, and gate-by-gate throughput analysis.',
    plannedFeatures: [
      {
        title: 'Live Headcount Ticker',
        description: 'Real-time inside-venue count vs registered headcount with capacity warnings.',
      },
      {
        title: 'Hourly Peak Heatmaps',
        description: 'Visualize arrival surges to dynamically redeploy gate staff and security.',
      },
      {
        title: 'Gate Performance Comparison',
        description: 'Benchmark scan rates across North, South, VIP, and Media gates.',
      },
      {
        title: 'Export Compliance Logs',
        description: 'Certified timestamped audit logs for university fire and safety protocols.',
      },
    ],
    schemaTable: 'attendance_sessions, gate_logs',
    edgeFunction: 'supabase/functions/aggregate-attendance',
  },
  activities: {
    id: 'activities',
    path: '/activities',
    title: 'Activities, Food & Team Allocation',
    category: 'Venue Logistics',
    description: 'Manage meal coupon distribution, workshop attendance, breakout sessions, and volunteer duties.',
    plannedFeatures: [
      {
        title: 'Food Coupon QR Scanning',
        description: 'Scan passes for lunch, banquet, and beverage counters to prevent duplicate collections.',
      },
      {
        title: 'Breakout Session Allocation',
        description: 'Track seat availability and attendance for limited-capacity technical workshops.',
      },
      {
        title: 'Volunteer Roster Allocation',
        description: 'Assign coordinators to stage management, registration desks, and speaker logistics.',
      },
      {
        title: 'Swag & Kit Distribution',
        description: 'Digital tracking for delegate badges, event kits, and merchandise collection.',
      },
    ],
    schemaTable: 'event_activities, food_redemptions, volunteer_shifts',
    edgeFunction: 'supabase/functions/redeem-activity',
  },
  analytics: {
    id: 'analytics',
    path: '/analytics',
    title: 'Analytics & Reports',
    category: 'Intelligence',
    description: 'Comprehensive post-event intelligence, attendance conversion funnels, and revenue breakdowns.',
    plannedFeatures: [
      {
        title: 'Registration Conversion Funnels',
        description: 'Analyze drop-offs between page visit, registration form submission, and payment.',
      },
      {
        title: 'Demographics Breakdown',
        description: 'Charts by department, college, student year, and geographical distribution.',
      },
      {
        title: 'Automated PDF Summary',
        description: 'One-click executive board report generation with high-resolution charts.',
      },
      {
        title: 'Comparative Historical Reports',
        description: 'Compare current metrics against previous year or semester editions.',
      },
    ],
    schemaTable: 'analytics_daily_rollups',
    edgeFunction: 'supabase/functions/generate-report',
  },
  settings: {
    id: 'settings',
    path: '/settings',
    title: 'Workspace Settings',
    category: 'Administration',
    description: 'Configure workspace branding, custom domains, notification webhooks, and Supabase integrations.',
    plannedFeatures: [
      {
        title: 'Branding & Email White-labeling',
        description: 'Custom logos, email sender identities, and branded ticket passes.',
      },
      {
        title: 'Custom Domain & SSL',
        description: 'Connect events.yourcollege.edu to serve public registration portals.',
      },
      {
        title: 'Supabase & API Credentials',
        description: 'Manage API keys, Edge Function secrets, and database backup configurations.',
      },
      {
        title: 'Data Retention & GDPR Compliance',
        description: 'Configure participant data anonymization and export policies.',
      },
    ],
    schemaTable: 'workspaces, workspace_integrations',
    edgeFunction: 'supabase/functions/manage-workspace-settings',
  },
};
