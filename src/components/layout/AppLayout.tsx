import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, ChevronDown, Command, LayoutDashboard, Settings2, Users, CreditCard, QrCode, ClipboardCheck, Utensils, ChartNoAxesCombined, UserRoundCog, FileSpreadsheet } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace.ts';

const navigation = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Events', path: '/events', icon: CalendarDays },
  { label: 'Team', path: '/team', icon: UserRoundCog },
  { label: 'Registrations', path: '/registrations', icon: FileSpreadsheet },
  { label: 'Participants', path: '/participants', icon: Users },
  { label: 'Payments', path: '/payments', icon: CreditCard },
  { label: 'Gates', path: '/gates', icon: QrCode },
  { label: 'Attendance', path: '/attendance', icon: ClipboardCheck },
  { label: 'Activities', path: '/activities', icon: Utensils },
  { label: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
];

export const AppLayout: React.FC = () => {
  const { currentWorkspace, workspaces, switchWorkspace, currentUser } = useWorkspace();
  return (
    <div className="ef-app-shell">
      <header className="ef-masthead">
        <div className="ef-masthead__inner">
          <Link to="/dashboard" className="ef-wordmark" aria-label="EventFlow home">EventFlow<span>®</span></Link>
          <div className="ef-masthead__right">
            <label className="ef-workspace-select">
              <span className="ef-workspace-select__mark">{currentWorkspace?.name?.slice(0, 2).toUpperCase() ?? 'EF'}</span>
              <select aria-label="Switch workspace" value={currentWorkspace?.id ?? ''} onChange={(event) => switchWorkspace(event.target.value)}>
                {workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.name}</option>)}
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </label>
            <div className="ef-user-chip" title={currentUser?.email ?? 'Preview account'}>
              <span className="ef-user-chip__avatar">{(currentUser?.fullName ?? 'EventFlow').slice(0, 1).toUpperCase()}</span>
              <span className="ef-user-chip__name">{currentUser?.fullName ?? 'Preview account'}</span>
            </div>
            <Link to="/login" className="ef-signout-link">Sign in <ArrowUpRight size={14}/></Link>
          </div>
        </div>
      </header>
      <div className="ef-nav-wrap">
        <nav className="ef-primary-nav" aria-label="Main navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/dashboard'} className={({ isActive }) => 'ef-primary-nav__link' + (isActive ? ' is-active' : '')}>
              <Icon size={15} strokeWidth={1.9}/><span>{label}</span>
            </NavLink>
          ))}
          <NavLink to="/settings" className={({ isActive }) => 'ef-primary-nav__link ef-primary-nav__settings' + (isActive ? ' is-active' : '')}>
            <Settings2 size={15}/><span>Settings</span>
          </NavLink>
        </nav>
      </div>
      <main className="ef-main-content"><div className="ef-content-container"><Outlet /></div></main>
      <footer className="ef-app-footer">
        <span>EVENTFLOW · EVENT OPERATIONS, IN ONE PLACE</span>
        <span><Command size={12}/> MULTI-WORKSPACE PREVIEW</span>
      </footer>
      <div className="ef-scallops" aria-hidden="true"/>
      <style>{`
        .ef-app-shell{min-height:100vh;display:flex;flex-direction:column;background:var(--color-background);color:var(--color-text)}
        .ef-masthead{position:relative;z-index:5;background:var(--color-background);border-bottom:1px solid var(--color-border)}
        .ef-masthead__inner{max-width:1180px;margin:auto;padding:17px 28px;min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:24px}
        .ef-wordmark{font:700 34px/.95 var(--font-display);letter-spacing:-.035em;color:var(--color-primary);text-decoration:none}
        .ef-wordmark span{font:500 10px var(--font-sans);vertical-align:top;margin-left:3px}
        .ef-masthead__right{display:flex;align-items:center;gap:18px}
        .ef-workspace-select{display:flex;align-items:center;gap:9px;padding:7px 10px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;color:var(--color-text);position:relative}
        .ef-workspace-select select{appearance:none;border:0;outline:0;background:transparent;color:inherit;font:600 13px var(--font-sans);padding-right:18px;max-width:180px;cursor:pointer}
        .ef-workspace-select option{color:#1a43b4;background:#fbf8f7}
        .ef-workspace-select>svg{position:absolute;right:9px;pointer-events:none}
        .ef-workspace-select__mark,.ef-user-chip__avatar{display:grid;place-items:center;width:28px;height:28px;background:var(--color-primary);color:#fff;font:700 13px var(--font-display);border-radius:5px}
        .ef-user-chip{display:flex;align-items:center;gap:8px;font:600 12px var(--font-sans);color:var(--color-text)}
        .ef-user-chip__avatar{background:var(--color-pink);color:#fff;border-radius:50%;width:30px;height:30px}
        .ef-signout-link{display:flex;align-items:center;gap:5px;font:600 13px var(--font-sans);color:var(--color-text-secondary);text-decoration:none}
        .ef-signout-link:hover{color:var(--color-pink-ink)}
        .ef-nav-wrap{border-bottom:1px solid var(--color-border);background:var(--color-paper-hi)}
        .ef-primary-nav{max-width:1180px;margin:auto;padding:0 28px;display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none}
        .ef-primary-nav::-webkit-scrollbar{display:none}
        .ef-primary-nav__link{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;padding:15px 11px 13px;border-bottom:3px solid transparent;color:var(--color-blue-soft);font:600 13px var(--font-sans);text-decoration:none;transition:color .18s,border-color .18s}
        .ef-primary-nav__link:hover{color:var(--color-primary)}
        .ef-primary-nav__link.is-active{color:var(--color-primary);border-bottom-color:var(--color-pink);background:rgba(255,47,162,.055)}
        .ef-primary-nav__settings{margin-left:auto}
        .ef-main-content{width:100%;flex:1;padding:34px 28px 54px;min-width:0}
        .ef-content-container{max-width:1124px;margin:0 auto}
        .ef-app-footer{display:flex;justify-content:space-between;gap:12px;max-width:1124px;width:calc(100% - 56px);margin:0 auto;padding:20px 0 26px;border-top:1px dotted var(--color-pink);font:600 10px var(--font-display);letter-spacing:.13em;color:var(--color-text-muted)}
        .ef-app-footer span:last-child{display:flex;align-items:center;gap:6px}
        .ef-scallops{height:13px;background:radial-gradient(circle at 50% 0,var(--color-pink) 0 7px,transparent 7.5px) 0 0/22px 13px repeat-x}
        @media(max-width:720px){.ef-masthead__inner{padding:13px 16px;min-height:66px}.ef-wordmark{font-size:30px}.ef-user-chip__name,.ef-signout-link{display:none}.ef-masthead__right{gap:8px}.ef-workspace-select{padding:5px 8px}.ef-workspace-select select{max-width:125px;font-size:11px}.ef-primary-nav{padding:0 12px}.ef-primary-nav__link{padding:13px 10px 11px;font-size:12px}.ef-main-content{padding:24px 16px 42px}.ef-app-footer{width:calc(100% - 32px);font-size:9px;flex-wrap:wrap}}
      `}</style>
    </div>
  );
};
