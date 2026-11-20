import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDownToLine, CheckCircle2, Filter, Plus, Search, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader.tsx';
import { ROUTE_CONFIGS } from '@/app/route-config.ts';

type ModuleInfo = { kicker: string; description: string; action: string; stats: string[][]; columns: string[]; rows: Record<string,string>[] };
const modules: Record<string, ModuleInfo> = {
  events:{kicker:'EVENT PROGRAMME',description:'Create and coordinate every event in this workspace, from registration opening to the final check-out.',action:'Create event',stats:[['02','Upcoming events'],['01','In progress'],['04','Completed']],columns:['Event','Schedule','Venue','Registrations','Status'],rows:[{Event:'TechVista ’26',Schedule:'16–17 Nov 2026',Venue:'Main Campus',Registrations:'842 / 1,200',Status:'Published'},{Event:'Data Science Summit',Schedule:'04 Dec 2026',Venue:'Auditorium A',Registrations:'318 / 500',Status:'Registration open'},{Event:'CodeSprint Workshop',Schedule:'21 Oct 2026',Venue:'Lab Block',Registrations:'96 / 100',Status:'Completed'}]},
  team:{kicker:'PEOPLE & PERMISSIONS',description:'Keep organisers, coordinators and gate teams aligned with clear responsibilities across each event.',action:'Invite member',stats:[['12','Workspace members'],['08','Event coordinators'],['04','Gate staff']],columns:['Member','Email','Role','Assigned event','Status'],rows:[{Member:'Saketh Rayalu',Email:'saketh@example.com',Role:'Owner','Assigned event':'All events',Status:'Active'},{Member:'Aarav Kumar',Email:'aarav@example.com',Role:'Coordinator','Assigned event':'TechVista ’26',Status:'Active'},{Member:'Mira Shah',Email:'mira@example.com',Role:'Gate staff','Assigned event':'TechVista ’26',Status:'Invited'}]},
  participants:{kicker:'ATTENDEE DIRECTORY',description:'A unified view of people registered for your events. Search and review participant records.',action:'Add participant',stats:[['1,256','Total participants'],['842','TechVista ’26'],['96','Awaiting review']],columns:['Participant','Contact','Event','Pass ID','Status'],rows:[{Participant:'Aarav Kumar',Contact:'aarav@example.com',Event:'TechVista ’26','Pass ID':'EF-26-0012',Status:'Confirmed'},{Participant:'Mira Shah',Contact:'•••••3210',Event:'TechVista ’26','Pass ID':'EF-26-0013',Status:'Checked in'},{Participant:'Rohan Das',Contact:'rohan@example.com',Event:'Data Science Summit','Pass ID':'EF-26-0014',Status:'Pending'}]},
  payments:{kicker:'PAYMENT DESK',description:'Review payment status and keep a clear record of registration fees, confirmations and pending checks.',action:'Record payment',stats:[['₹4.82L','Collected'],['₹38,400','Pending review'],['18','Needs attention']],columns:['Participant','Event','Method','Reference','Amount','Status'],rows:[{Participant:'Aarav Kumar',Event:'TechVista ’26',Method:'UPI',Reference:'UPI•••8472',Amount:'₹499',Status:'Verified'},{Participant:'Mira Shah',Event:'TechVista ’26',Method:'Bank transfer',Reference:'TXN•••2189',Amount:'₹499',Status:'Pending'},{Participant:'Rohan Das',Event:'Data Science Summit',Method:'UPI',Reference:'UPI•••4921',Amount:'₹299',Status:'Review'}]},
  gates:{kicker:'ENTRY CONTROL',description:'Set up entry points and monitor gate teams. QR validation and cross-device duplicate protection will be connected in the backend phase.',action:'Add gate',stats:[['04','Gate stations'],['02','Currently staffed'],['842','Passes issued']],columns:['Gate','Event','Assigned staff','Last activity','Status'],rows:[{Gate:'North Entrance',Event:'TechVista ’26','Assigned staff':'Aarav Kumar','Last activity':'09:42 AM',Status:'Active'},{Gate:'Main Lobby',Event:'TechVista ’26','Assigned staff':'Mira Shah','Last activity':'09:38 AM',Status:'Active'},{Gate:'VIP Desk',Event:'TechVista ’26','Assigned staff':'Unassigned','Last activity':'—',Status:'Setup'}]},
  attendance:{kicker:'CHECK-IN REPORT',description:'Follow attendance progress and compare entry points. The numbers shown here are sample data, not live scan results.',action:'Export report',stats:[['612','Checked in'],['72.7%','Attendance rate'],['230','Yet to arrive']],columns:['Time','Gate','Accepted scans','Repeat attempts','Team'],rows:[{Time:'09:00–10:00',Gate:'North Entrance','Accepted scans':'284','Repeat attempts':'6',Team:'Aarav · Team A'},{Time:'09:00–10:00',Gate:'Main Lobby','Accepted scans':'198','Repeat attempts':'2',Team:'Mira · Team B'},{Time:'09:00–10:00',Gate:'VIP Desk','Accepted scans':'130','Repeat attempts':'0',Team:'Unassigned'}]},
  activities:{kicker:'ON-GROUND OPERATIONS',description:'Coordinate meal distribution, sessions, volunteer assignments and event-day logistics from one place.',action:'Add activity',stats:[['06','Activities'],['03','Food counters'],['24','Volunteers']],columns:['Activity','Event','Location','Assigned team','Status'],rows:[{Activity:'Lunch distribution',Event:'TechVista ’26',Location:'Food Court','Assigned team':'Team A',Status:'Ready'},{Activity:'AI workshop',Event:'TechVista ’26',Location:'Lab 3','Assigned team':'Team B',Status:'In progress'},{Activity:'Delegate kit pickup',Event:'TechVista ’26',Location:'Registration desk','Assigned team':'Team C',Status:'Ready'}]},
  analytics:{kicker:'EVENT INTELLIGENCE',description:'A quick read on registration, attendance and event operations. Metrics are illustrative until connected to live workspace data.',action:'Download summary',stats:[['1,256','Registrations'],['78.4%','Check-in conversion'],['₹4.82L','Gross collections']],columns:['Event','Registrations','Checked in','Conversion','Revenue'],rows:[{Event:'TechVista ’26',Registrations:'842','Checked in':'612',Conversion:'72.7%',Revenue:'₹4.20L'},{Event:'Data Science Summit',Registrations:'318','Checked in':'—',Conversion:'—',Revenue:'₹62,000'},{Event:'CodeSprint Workshop',Registrations:'96','Checked in':'96',Conversion:'100%',Revenue:'₹0'}]},
  settings:{kicker:'WORKSPACE SETTINGS',description:'Manage the workspace profile, default event preferences and the people who can access your operations.',action:'Save preferences',stats:[['01','Workspace'],['12','Members'],['03','Active events']],columns:['Preference','Current value','Scope','State'],rows:[{Preference:'Workspace name','Current value':'Campus Events',Scope:'Workspace',State:'Configured'},{Preference:'Default timezone','Current value':'Asia/Kolkata (IST)',Scope:'Workspace',State:'Configured'},{Preference:'Pass branding','Current value':'EventFlow standard',Scope:'Events',State:'Preview only'}]}
};

export function OperationsPage() {
  const location=useLocation();
  const key=location.pathname.split('/')[1] || 'events';
  const data=modules[key] || modules.events;
  const title=ROUTE_CONFIGS[key]?.title || 'Workspace';
  const [query,setQuery]=useState('');
  const [filter,setFilter]=useState('All');
  const [notice,setNotice]=useState('');
  const rows=useMemo(()=>data.rows.filter(row=>Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase()) && (filter==='All' || (row.Status || '').toLowerCase().includes(filter.toLowerCase()))),[data,query,filter]);
  return <div className="ef-ops-page">
    <PageHeader title={title} subtitle={data.description} breadcrumbs={[{label:'Overview',href:'/dashboard'},{label:title}]}/>
    <section className="ef-ops-intro"><div><p className="ef-ops-kicker">{data.kicker}</p><h2>{title}</h2><p>{data.description}</p></div><button type="button" className="ef-ops-primary" onClick={()=>setNotice(data.action+' is a frontend preview. Supabase persistence will be connected in the backend phase.')}><Plus size={17}/>{data.action}</button></section>
    <div className="ef-ops-stats">{data.stats.map(([value,label],index)=><div className={'ef-ops-stat tone-'+index} key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <section className="ef-ops-panel">
      <div className="ef-ops-panel__head"><div><p className="ef-ops-kicker">WORKSPACE RECORDS</p><h3>{key==='events'?'Your events':key==='participants'?'Participant records':key==='gates'?'Gate stations':'Recent records'}</h3></div><span className="ef-ops-count">{rows.length} shown</span></div>
      <div className="ef-ops-toolbar"><label className="ef-ops-search"><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search this workspace…"/></label><div className="ef-ops-filters"><Filter size={14}/>{['All','Active','Pending','Completed'].map(item=><button type="button" key={item} onClick={()=>setFilter(item)} className={filter===item?'is-active':''}>{item}</button>)}</div></div>
      <div className="ef-ops-table-wrap"><table className="ef-ops-table"><thead><tr>{data.columns.map(column=><th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={index}>{data.columns.map(column=><td key={column}>{column==='Status'?<span className={'ef-ops-status '+((row[column]||'').toLowerCase().match(/active|verified|checked|published|confirmed|completed/)?'is-good':(row[column]||'').toLowerCase().match(/pending|review|invited/)?'is-waiting':'')}>{row[column]}</span>:row[column]||'—'}</td>)}</tr>)}</tbody></table>{rows.length===0&&<p className="ef-ops-empty">No records match this search.</p>}</div>
      <div className="ef-ops-panel__foot"><span><Sparkles size={14}/> Sample workspace data for frontend review</span><button type="button" onClick={()=>setNotice('Exports will be generated from live workspace records after backend integration.')}><ArrowDownToLine size={15}/> Export</button></div>
    </section>
    {notice&&<p className="ef-ops-notice" role="status"><CheckCircle2 size={16}/>{notice}</p>}
    <p className="ef-ops-disclaimer">PREVIEW ENVIRONMENT <span>Actions are UI demonstrations. Records are not saved, QR passes are not issued and attendance is not verified by a server yet.</span></p>
    <style>{`
      .ef-ops-page{display:flex;flex-direction:column;gap:22px;color:var(--color-text)}
      .ef-ops-intro{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:25px 27px;background:var(--color-pink-tint);border-left:5px solid var(--color-pink);position:relative;overflow:hidden}
      .ef-ops-intro:after{content:'EF';position:absolute;right:20px;top:-32px;font:700 150px/.9 var(--font-display);color:rgba(26,67,180,.055);pointer-events:none}
      .ef-ops-kicker{font:700 10px var(--font-display);letter-spacing:.16em;color:var(--color-pink-ink);margin:0 0 8px}
      .ef-ops-intro h2{font:700 clamp(28px,4vw,42px)/.98 var(--font-display);text-transform:uppercase;color:var(--color-primary);margin:0 0 9px}
      .ef-ops-intro p:last-child{font:500 13px/1.55 var(--font-sans);color:var(--color-blue-soft);max-width:650px}
      .ef-ops-primary{position:relative;z-index:1;display:flex;align-items:center;gap:8px;white-space:nowrap;padding:13px 17px;background:var(--color-primary);color:white;border-radius:7px;font:600 15px var(--font-display)}
      .ef-ops-primary:hover{background:var(--color-blue-deep)}
      .ef-ops-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .ef-ops-stat{display:flex;flex-direction:column;gap:5px;padding:16px 19px;background:var(--color-paper-hi);border:1px solid var(--color-border);border-radius:4px}
      .ef-ops-stat strong{font:700 34px/1 var(--font-display);color:var(--color-primary)}
      .ef-ops-stat span{font:600 11px var(--font-sans);color:var(--color-blue-soft)}
      .ef-ops-stat.tone-0{border-top:3px solid var(--color-pink)}.ef-ops-stat.tone-1{border-top:3px solid var(--color-primary)}.ef-ops-stat.tone-2{border-top:3px solid var(--color-blue-line)}
      .ef-ops-panel{background:var(--color-paper-hi);border:1px solid var(--color-border);border-radius:4px;overflow:hidden}
      .ef-ops-panel__head{display:flex;align-items:center;justify-content:space-between;padding:22px 22px 15px}
      .ef-ops-panel__head h3{font:700 23px/1 var(--font-display);text-transform:uppercase;color:var(--color-primary)}
      .ef-ops-count{font:600 11px var(--font-sans);color:var(--color-blue-soft)}
      .ef-ops-toolbar{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:0 22px 16px;flex-wrap:wrap}
      .ef-ops-search{display:flex;align-items:center;gap:8px;min-width:220px;max-width:340px;flex:1;padding:10px 12px;border:1px solid var(--color-blue-line);background:#fff;border-radius:7px;color:var(--color-blue-soft)}
      .ef-ops-search input{width:100%;border:0;outline:0;background:transparent;color:var(--color-blue-deep);font:500 12px var(--font-sans)}
      .ef-ops-filters{display:flex;align-items:center;gap:5px;color:var(--color-blue-soft)}
      .ef-ops-filters button{padding:7px 9px;border-radius:5px;color:var(--color-blue-soft);font:600 11px var(--font-sans)}
      .ef-ops-filters button.is-active{background:var(--color-pink-tint);color:var(--color-pink-ink)}
      .ef-ops-table-wrap{overflow-x:auto}.ef-ops-table{width:100%;border-collapse:collapse;text-align:left;min-width:650px}
      .ef-ops-table th{padding:12px 16px;background:rgba(26,67,180,.045);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);font:700 10px var(--font-display);letter-spacing:.11em;text-transform:uppercase;color:var(--color-blue-soft);white-space:nowrap}
      .ef-ops-table td{padding:14px 16px;border-bottom:1px dotted var(--color-pink-track);font:500 12px/1.4 var(--font-sans);color:var(--color-blue-deep);white-space:nowrap}
      .ef-ops-table tbody tr:hover{background:rgba(248,213,228,.35)}.ef-ops-table td:first-child{font-weight:700;color:var(--color-primary)}
      .ef-ops-status{display:inline-flex;padding:5px 8px;border-radius:4px;background:var(--color-pink-tint);color:var(--color-pink-ink);font:700 10px var(--font-display)}
      .ef-ops-status.is-good{background:#d9f0e3;color:#0e6b3c}.ef-ops-status.is-waiting{background:#fff0d2;color:#80520b}
      .ef-ops-empty{padding:38px;text-align:center;color:var(--color-blue-soft);font:500 13px var(--font-sans)}
      .ef-ops-panel__foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 22px}
      .ef-ops-panel__foot span,.ef-ops-panel__foot button{display:flex;align-items:center;gap:7px;font:600 10px var(--font-sans);color:var(--color-blue-soft)}
      .ef-ops-panel__foot span svg{color:var(--color-pink-ink)}.ef-ops-panel__foot button{color:var(--color-primary)}
      .ef-ops-notice{display:flex;gap:8px;padding:12px 14px;background:var(--color-pink-tint);border-left:3px solid var(--color-pink);font:500 12px/1.5 var(--font-sans);color:var(--color-pink-ink)}
      .ef-ops-disclaimer{font:700 10px var(--font-display);letter-spacing:.13em;color:var(--color-pink-ink);display:flex;gap:10px;align-items:flex-start}
      .ef-ops-disclaimer span{font:500 11px/1.5 var(--font-sans);letter-spacing:0;color:var(--color-text-muted)}
      @media(max-width:640px){.ef-ops-intro{align-items:flex-start;flex-direction:column;padding:20px}.ef-ops-primary{width:100%;justify-content:center}.ef-ops-stats{gap:7px}.ef-ops-stat{padding:12px 10px}.ef-ops-stat strong{font-size:27px}.ef-ops-stat span{font-size:10px}.ef-ops-toolbar{padding:0 14px 14px}.ef-ops-panel__head{padding:18px 14px 14px}.ef-ops-panel__foot{padding:12px 14px;align-items:flex-start;flex-direction:column}.ef-ops-disclaimer{flex-direction:column;gap:4px}}
    `}</style>
  </div>;
}
