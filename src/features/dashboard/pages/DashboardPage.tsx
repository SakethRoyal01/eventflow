/**
 * EventFlow Feature: DashboardPage
 * Master Dashboard View uniting Welcome section, Metrics, Upcoming events, Activities, and Quick actions
 */

import React, { useState } from 'react';
import { WelcomeBanner } from '../components/WelcomeBanner.tsx';
import { MetricsGrid } from '../components/MetricsGrid.tsx';
import { UpcomingEventsList } from '../components/UpcomingEventsList.tsx';
import { RecentActivityFeed } from '../components/RecentActivityFeed.tsx';
import { QuickActionsBar } from '../components/QuickActionsBar.tsx';
import { Modal } from '@/components/ui/Modal.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { Select } from '@/components/ui/Select.tsx';
import { useWorkspace } from '@/hooks/useWorkspace.ts';
import { useDashboard } from '../hooks/useDashboard.ts';

export const DashboardPage: React.FC = () => {
  const { currentWorkspace, currentUser } = useWorkspace();
  const { metrics, upcomingEvents, recentActivities } = useDashboard(
    currentWorkspace?.id
  );

  // Quick Action Dialog Modals
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Simple state for demo feedback
  const [newEventTitle, setNewEventTitle] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Event "${newEventTitle || 'New Conclave'}" drafted for ${currentWorkspace?.name}`);
    setIsCreateEventModalOpen(false);
    setNewEventTitle('');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Invitation sent to ${inviteEmail || 'colleague@apex.edu'}`);
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  return (
    <div className="ef-dashboard-page">
      {/* 1. Welcome Section */}
      <WelcomeBanner
        workspace={currentWorkspace}
        userName={currentUser?.fullName?.split(' ')[0] ?? 'Arthur'}
        onCreateEvent={() => setIsCreateEventModalOpen(true)}
      />

      {/* 2. Statistics Grid (Total events, Active events, Registrations, Attendance) */}
      <MetricsGrid metrics={metrics} />

      {/* 3. Quick Actions Bar */}
      <QuickActionsBar
        onCreateEvent={() => setIsCreateEventModalOpen(true)}
        onInviteMember={() => setIsInviteModalOpen(true)}
      />

      {/* 4. Split Grid: Upcoming Events & Recent Activity */}
      <div className="ef-dashboard-grid">
        <div className="ef-dashboard-grid__events">
          <UpcomingEventsList events={upcomingEvents} />
        </div>
        <div className="ef-dashboard-grid__activity">
          <RecentActivityFeed activities={recentActivities} />
        </div>
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        title="Create New Event"
        description="Establish an event in this workspace. Set schedule, venue, and ticketing parameters."
        maxWidth="md"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateEventModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateEventSubmit}
            >
              Create Draft
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateEventSubmit} className="ef-form-stack">
          <Input
            label="Event Title"
            placeholder="e.g. Annual Autonomous Systems Conclave"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            required
          />
          <div className="ef-form-row">
            <Input label="Start Date" type="date" required defaultValue="2026-04-10" />
            <Input label="End Date" type="date" required defaultValue="2026-04-12" />
          </div>
          <Input
            label="Primary Venue / Hall"
            placeholder="e.g. North Quad Auditorium"
            defaultValue="Main Auditorium & Hall B"
          />
          <Input
            label="Capacity Limit"
            type="number"
            defaultValue={500}
            min={1}
          />
        </form>
      </Modal>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member"
        description="Grant workspace roles with granular permissions (Owner, Organizer, Coordinator, Gate Staff, Analyst)."
        maxWidth="md"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleInviteSubmit}
            >
              Send Invitation
            </Button>
          </>
        }
      >
        <form onSubmit={handleInviteSubmit} className="ef-form-stack">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@university.edu"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />
          <Select
            label="Role & Access Level"
            options={[
              { value: 'coordinator', label: 'Coordinator — Event operations & scanner access' },
              { value: 'organizer', label: 'Organizer — Full event creation & team invites' },
              { value: 'gate_staff', label: 'Gate Staff — Pass scanning & attendee check-in' },
              { value: 'analyst', label: 'Analyst — Read-only analytics & reporting exports' },
              { value: 'owner', label: 'Owner — Full workspace authority' },
            ]}
          />
        </form>
      </Modal>

      <style>{`
        .ef-dashboard-page {
          display: flex;
          flex-direction: column;
        }

        .ef-dashboard-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: var(--space-6);
        }

        @media (max-width: 1024px) {
          .ef-dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .ef-form-stack {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .ef-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        @media (max-width: 600px) {
          .ef-form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
