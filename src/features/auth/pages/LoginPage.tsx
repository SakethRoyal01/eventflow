import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail, ShieldCheck, Ticket, Users, Zap } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Email sign-in is designed for this screen. Sending links and verifying accounts will be enabled when Supabase Auth is connected.');
  }
  return (
    <main className="ef-login">
      <header className="ef-login__mast">
        <Link to="/login" className="ef-login__brand">EventFlow<span>®</span></Link>
        <span className="ef-login__edition">EVENT OPERATIONS PLATFORM</span>
      </header>
      <div className="ef-login__grid">
        <section className="ef-login__story">
          <div className="ef-login__poster grain">
            <span className="ef-login__poster-kicker">ONE WORKSPACE. EVERY MOMENT.</span>
            <h1>MAKE<br/>IT AN<br/><em>EVENT.</em></h1>
            <div className="ef-login__poster-bottom"><span>PLAN · REGISTER · CHECK IN</span><span>01 / 04</span></div>
            <div className="ef-login__poster-stamp">EF<br/>26</div>
          </div>
          <div className="ef-login__story-copy">
            <p className="ef-login__eyebrow">BUILT FOR THE PEOPLE BEHIND IT</p>
            <h2>From the first registration to the final scan.</h2>
            <p>Bring your events, people, payments and entry operations together. Keep every team on the same page, from one event to the next.</p>
          </div>
          <div className="ef-login__proof">
            <span><Ticket size={16}/> QR-ready entry</span><span><Users size={16}/> Team coordination</span><span><Zap size={16}/> Live operations</span>
          </div>
        </section>
        <section className="ef-login__form-side">
          <div className="ef-login__form-card">
            <span className="ef-login__form-kicker"><span/> ORGANISER ACCESS</span>
            <h2>Welcome back.</h2>
            <p className="ef-login__intro">Sign in to pick up where your team left off.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="login-email">Work email</label>
              <div className="ef-login__input-wrap"><Mail size={18}/><input id="login-email" type="email" autoComplete="email" placeholder="you@organisation.com" value={email} onChange={(event) => {setEmail(event.target.value);setNotice('');}} required /></div>
              <button className="ef-login__submit" type="submit">Continue with email <ArrowRight size={18}/></button>
            </form>
            {notice && <p className="ef-login__notice" role="status"><ShieldCheck size={17}/>{notice}</p>}
            <div className="ef-login__or"><span>OR</span></div>
            <button className="ef-login__secondary" type="button" onClick={() => navigate('/dashboard')}>Explore the frontend preview <ArrowUpRight size={16}/></button>
            <p className="ef-login__legal">By continuing, you agree to use EventFlow in accordance with your organisation's access policies.</p>
          </div>
          <div className="ef-login__security"><ShieldCheck size={17}/><span>Workspace access is designed around role-based permissions.</span></div>
        </section>
      </div>
      <footer className="ef-login__footer"><span>EVENTFLOW © 2026</span><span>MADE FOR BETTER GATHERINGS</span><Link to="/dashboard">Preview workspace <ArrowUpRight size={13}/></Link></footer>
      <div className="ef-login__scallops" aria-hidden="true"/>
      <style>{`
        .ef-login{min-height:100vh;background:var(--color-background);color:var(--color-text);padding:0 clamp(18px,5vw,72px);display:flex;flex-direction:column}
        .ef-login__mast{height:82px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--color-border)}
        .ef-login__brand{font:700 36px/.9 var(--font-display);letter-spacing:-.03em;color:var(--color-primary);text-decoration:none}
        .ef-login__brand span{font:500 10px var(--font-sans);vertical-align:top;margin-left:4px}
        .ef-login__edition,.ef-login__footer{font:600 10px var(--font-display);letter-spacing:.16em;color:var(--color-text-muted)}
        .ef-login__grid{width:100%;max-width:1120px;margin:auto;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(340px,.8fr);gap:clamp(42px,8vw,112px);align-items:center;padding:56px 0}
        .ef-login__story{max-width:540px}
        .ef-login__poster{position:relative;overflow:hidden;min-height:365px;aspect-ratio:1.42/1;background:var(--color-pink-tint);padding:clamp(22px,4vw,38px);display:flex;flex-direction:column;justify-content:space-between;color:var(--color-primary);border-radius:3px;box-shadow:8px 8px 0 rgba(26,67,180,.13)}
        .ef-login__poster:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 5px,rgba(26,67,180,.025) 6px 7px);pointer-events:none}
        .ef-login__poster-kicker,.ef-login__poster-bottom{position:relative;z-index:1;font:700 11px var(--font-display);letter-spacing:.15em}
        .ef-login__poster h1{position:relative;z-index:1;font:700 clamp(68px,9vw,112px)/.79 var(--font-display);letter-spacing:-.035em;color:var(--color-pink-display);margin:22px 0;text-transform:uppercase}
        .ef-login__poster h1 em{font-style:normal;color:var(--color-primary);text-shadow:3px 3px 0 rgba(255,47,162,.38)}
        .ef-login__poster-bottom{display:flex;justify-content:space-between;color:var(--color-primary)}
        .ef-login__poster-stamp{position:absolute;right:22px;top:22px;border:2px solid var(--color-primary);width:54px;height:54px;display:grid;place-content:center;text-align:center;transform:rotate(8deg);font:700 15px/.9 var(--font-display)}
        .ef-login__story-copy{padding:26px 2px 0}
        .ef-login__eyebrow{font:700 10px var(--font-display);letter-spacing:.17em;color:var(--color-pink-ink);margin:0 0 9px}
        .ef-login__story-copy h2{font:700 clamp(27px,3vw,36px)/1.04 var(--font-display);text-transform:uppercase;color:var(--color-primary);max-width:440px;margin:0 0 10px}
        .ef-login__story-copy>p:last-child{font:500 15px/1.6 var(--font-sans);color:var(--color-text-secondary);max-width:500px}
        .ef-login__proof{display:flex;gap:18px;flex-wrap:wrap;margin-top:22px}
        .ef-login__proof span{display:flex;align-items:center;gap:7px;font:600 12px var(--font-sans);color:var(--color-primary)}
        .ef-login__proof svg{color:var(--color-pink-ink)}
        .ef-login__form-side{width:100%;max-width:410px;justify-self:end}
        .ef-login__form-card{padding:clamp(24px,4vw,38px);background:var(--color-paper-hi);border:1px solid var(--color-border);box-shadow:0 18px 48px rgba(26,67,180,.08);border-radius:4px}
        .ef-login__form-kicker{display:flex;align-items:center;gap:8px;font:700 10px var(--font-display);letter-spacing:.15em;color:var(--color-pink-ink)}
        .ef-login__form-kicker span{width:7px;height:7px;border-radius:50%;background:var(--color-pink)}
        .ef-login__form-card h2{font:700 42px/.95 var(--font-display);text-transform:uppercase;color:var(--color-primary);margin:24px 0 8px}
        .ef-login__intro{font:500 14px/1.5 var(--font-sans);color:var(--color-text-secondary);margin:0 0 30px}
        .ef-login__form-card form{display:grid;gap:10px}
        .ef-login__form-card label{font:700 11px var(--font-display);letter-spacing:.12em;text-transform:uppercase;color:var(--color-primary)}
        .ef-login__input-wrap{display:flex;align-items:center;gap:10px;border:1.5px solid var(--color-blue-line);background:#fff;padding:0 14px;border-radius:8px;min-height:54px;color:var(--color-blue-soft)}
        .ef-login__input-wrap:focus-within{border-color:var(--color-primary);box-shadow:0 0 0 3px var(--color-pink-track)}
        .ef-login__input-wrap input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:var(--color-blue-deep);font:500 15px var(--font-sans)}
        .ef-login__input-wrap input::placeholder{color:#7981a6}
        .ef-login__submit{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:58px;padding:0 18px;margin-top:8px;border-radius:8px;background:var(--color-primary);color:white;font:600 18px var(--font-display);transition:transform .16s,background .16s}
        .ef-login__submit:hover{background:var(--color-blue-deep);transform:translateY(-1px)}
        .ef-login__notice{display:flex;gap:9px;align-items:flex-start;margin:14px 0 0;padding:12px;background:var(--color-pink-tint);color:var(--color-pink-ink);font:500 12px/1.45 var(--font-sans);border-left:3px solid var(--color-pink)}
        .ef-login__notice svg{flex:none}
        .ef-login__or{display:flex;align-items:center;gap:12px;margin:25px 0 18px;color:var(--color-text-muted);font:700 10px var(--font-display);letter-spacing:.15em}
        .ef-login__or:before,.ef-login__or:after{content:'';height:1px;flex:1;border-top:2px dotted var(--color-pink-track)}
        .ef-login__secondary{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;border:1.5px solid var(--color-primary);border-radius:8px;color:var(--color-primary);font:600 15px var(--font-display)}
        .ef-login__secondary:hover{background:rgba(26,67,180,.06)}
        .ef-login__legal{font:500 10px/1.55 var(--font-sans);color:var(--color-text-muted);margin:22px 0 0;text-align:center}
        .ef-login__security{display:flex;align-items:center;gap:9px;margin-top:16px;color:var(--color-blue-soft);font:500 11px var(--font-sans)}
        .ef-login__security svg{color:var(--color-go)}
        .ef-login__footer{max-width:1120px;width:100%;margin:0 auto;padding:20px 0 24px;border-top:1px dotted var(--color-pink);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .ef-login__footer a{display:flex;align-items:center;gap:4px;color:var(--color-primary);text-decoration:none}
        .ef-login__scallops{height:14px;margin:0 -5vw;background:radial-gradient(circle at 50% 0,var(--color-pink) 0 7px,transparent 7.5px) 0 0/22px 14px repeat-x}
        @media(max-width:850px){.ef-login__grid{grid-template-columns:1fr;max-width:560px;gap:36px;padding:34px 0}.ef-login__form-side{max-width:none}.ef-login__poster{min-height:280px}.ef-login__poster h1{font-size:clamp(65px,15vw,100px)}}
        @media(max-width:520px){.ef-login{padding:0 17px}.ef-login__mast{height:68px}.ef-login__brand{font-size:30px}.ef-login__edition{font-size:8px}.ef-login__grid{padding:24px 0}.ef-login__poster{min-height:240px}.ef-login__story-copy{padding-top:20px}.ef-login__proof{gap:12px}.ef-login__proof span{font-size:11px}.ef-login__form-card{padding:22px}.ef-login__form-card h2{font-size:36px}.ef-login__footer{font-size:8px}.ef-login__footer span:nth-child(2){display:none}}
      `}</style>
    </main>
  );
}
