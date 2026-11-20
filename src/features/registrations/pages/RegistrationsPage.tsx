import { useMemo, useState, type ChangeEvent } from 'react';
import { AlertCircle, CheckCircle2, FileSpreadsheet, Upload, Users, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader.tsx';
import {
  analyseImport,
  buildImportPreview,
  parseDelimitedText,
  toCsv,
  type ImportAnalysis,
} from '@/features/imports/lib/participant-import.ts';

const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
const MAX_IMPORT_ROWS = 5000;

export function RegistrationsPage() {
  const [sourceText, setSourceText] = useState('');
  const [fileName, setFileName] = useState('');
  const [analysis, setAnalysis] = useState<ImportAnalysis | null>(null);
  const [nameColumn, setNameColumn] = useState(0);
  const [contactColumn, setContactColumn] = useState(-1);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const preview = useMemo(
    () => (analysis ? buildImportPreview(analysis, nameColumn, contactColumn) : null),
    [analysis, nameColumn, contactColumn],
  );

  function loadText(text: string, name = 'Pasted spreadsheet data') {
    setError('');
    setNotice('');
    if (!text.trim()) {
      setAnalysis(null);
      setSourceText('');
      setFileName('');
      setError('The selected file or pasted data is empty.');
      return;
    }

    const rows = parseDelimitedText(text);
    if (rows.length === 0) {
      setAnalysis(null);
      setError('No rows could be read. Use CSV, TSV, or paste cells from a spreadsheet.');
      return;
    }
    if (rows.length > MAX_IMPORT_ROWS + 1) {
      setAnalysis(null);
      setError(`This preview is limited to ${MAX_IMPORT_ROWS.toLocaleString()} rows.`);
      return;
    }

    const result = analyseImport(rows);
    if (!result || result.columns.length === 0) {
      setAnalysis(null);
      setError('We could not identify any columns in this data.');
      return;
    }

    setSourceText(text);
    setFileName(name);
    setAnalysis(result);
    setNameColumn(result.nameColumn);
    setContactColumn(result.contactColumn);
    setNotice(`${result.rows.length.toLocaleString()} data rows loaded. Review the detected columns before importing.`);
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) {
      setError('File is larger than 5 MB. Split the spreadsheet into smaller files and try again.');
      return;
    }
    try {
      loadText(await file.text(), file.name);
    } catch {
      setError('We could not read this file. Try exporting it as CSV or copying the cells from your spreadsheet.');
    }
  }

  function exportPreview() {
    if (!preview) return;
    const rows = [
      ['full_name', 'contact', 'source_row'],
      ...preview.participants.map((person) => [person.fullName, person.contact, person.sourceRow]),
    ];
    const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'eventflow-import-preview.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="ef-import-page">
      <PageHeader
        title="Registrations"
        subtitle="Prepare participant lists from CSV files or copied spreadsheet cells."
        breadcrumbs={[{ label: 'Overview', href: '/dashboard' }, { label: 'Registrations' }]}
      />

      <section className="ef-import-intro">
        <div className="ef-import-intro__icon"><FileSpreadsheet size={21} /></div>
        <div>
          <p className="ef-import-eyebrow">PARTICIPANT IMPORT</p>
          <h2>Bring your registration list together.</h2>
          <p>Upload a CSV or paste directly from Excel and Google Sheets. EventFlow will suggest the name and contact columns, then show duplicates and blank rows before you proceed.</p>
        </div>
      </section>

      <div className="ef-import-grid">
        <section className="ef-import-panel">
          <div className="ef-import-panel__heading">
            <div><h3>Import source</h3><p>CSV, TSV, semicolon-delimited text or spreadsheet paste</p></div>
            <span className="ef-import-limit">5 MB · 5,000 rows</span>
          </div>
          <label className="ef-import-drop">
            <input type="file" accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values" onChange={handleFile} />
            <span className="ef-import-drop__icon"><Upload size={20} /></span>
            <strong>Choose a CSV file</strong>
            <span>or drag a file here (file picker supported)</span>
          </label>
          <div className="ef-import-divider"><span>OR PASTE CELLS</span></div>
          <textarea
            className="ef-import-textarea"
            value={sourceText}
            onChange={(event) => { setSourceText(event.target.value); setAnalysis(null); setFileName(''); setError(''); setNotice(''); }}
            placeholder={'Full Name\tEmail\tPhone\nAarav Kumar\taarav@example.com\t9876543210'}
            rows={7}
            aria-label="Paste spreadsheet rows"
          />
          <div className="ef-import-actions">
            <button type="button" className="ef-import-button" onClick={() => loadText(sourceText)}>
              Analyse pasted data
            </button>
            {fileName && <span className="ef-import-filename">{fileName}</span>}
          </div>
          {error && <p className="ef-import-message ef-import-message--error"><AlertCircle size={16} />{error}</p>}
          {notice && <p className="ef-import-message ef-import-message--success"><CheckCircle2 size={16} />{notice}</p>}
        </section>

        <section className="ef-import-panel ef-import-guidance">
          <h3>Before you import</h3>
          <ul>
            <li>Keep one participant per row.</li>
            <li>Include a full name column whenever possible.</li>
            <li>Phone numbers are preferred as the contact channel when both phone and email are present.</li>
            <li>Two people sharing a phone number are not merged unless their names also match.</li>
            <li>Review the detected columns and duplicate count before using the export.</li>
          </ul>
          <div className="ef-import-notice">
            <AlertCircle size={17} />
            <p><strong>Preview mode only.</strong> This step does not save participants or issue passes. Database import, event-level permissions and pass creation will be connected in the Supabase phase.</p>
          </div>
        </section>
      </div>

      {analysis && preview && (
        <section className="ef-import-panel ef-import-results">
          <div className="ef-import-panel__heading">
            <div><h3>Review import</h3><p>Confirm the column mapping before exporting this preview.</p></div>
            <button type="button" className="ef-import-button" onClick={exportPreview} disabled={preview.participants.length === 0}>Export valid rows</button>
          </div>

          <div className="ef-import-metrics">
            <div><span>Valid participants</span><strong>{preview.participants.length.toLocaleString()}</strong></div>
            <div><span>Duplicate rows</span><strong>{preview.duplicateRows.toLocaleString()}</strong></div>
            <div><span>Blank-name rows</span><strong>{preview.blankRows.toLocaleString()}</strong></div>
            <div><span>Columns detected</span><strong>{analysis.columns.length}</strong></div>
          </div>

          <div className="ef-import-mapping">
            <label>Name column
              <select value={nameColumn} onChange={(event) => setNameColumn(Number(event.target.value))}>
                {analysis.columns.map((column) => <option key={column.index} value={column.index}>{column.label}</option>)}
              </select>
            </label>
            <label>Contact column
              <select value={contactColumn} onChange={(event) => setContactColumn(Number(event.target.value))}>
                <option value={-1}>No contact column</option>
                {analysis.columns.map((column) => <option key={column.index} value={column.index}>{column.label}</option>)}
              </select>
            </label>
          </div>

          <div className="ef-import-table-wrap">
            <table className="ef-import-table">
              <thead><tr><th>Source row</th><th>Participant</th><th>Contact</th><th>Review</th></tr></thead>
              <tbody>
                {preview.participants.slice(0, 12).map((person) => (
                  <tr key={person.sourceRow}>
                    <td>{person.sourceRow}</td><td>{person.fullName}</td><td>{person.contact || '—'}</td>
                    <td><span className="ef-import-valid"><CheckCircle2 size={14} /> Ready</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.participants.length > 12 && <p className="ef-import-table-note">Showing 12 of {preview.participants.length.toLocaleString()} valid rows. Export to review the complete preview.</p>}
            {preview.participants.length === 0 && <p className="ef-import-table-note"><XCircle size={15} /> No valid participants with the selected name column.</p>}
          </div>
          <p className="ef-import-footnote"><Users size={15} /> This browser preview is not a confirmed registration. Re-run duplicate and permission checks on the server when backend import is implemented.</p>
        </section>
      )}

      <style>{`
        .ef-import-page{display:flex;flex-direction:column;gap:24px;color:var(--color-text)}
        .ef-import-intro{display:flex;gap:16px;align-items:flex-start;padding:22px 24px;background:linear-gradient(110deg,rgba(131,77,251,.12),rgba(24,16,43,.55));border:1px solid var(--color-border);border-radius:var(--radius-lg)}
        .ef-import-intro__icon{width:44px;height:44px;display:grid;place-items:center;border-radius:12px;background:var(--color-primary-subtle);color:var(--color-primary);flex-shrink:0}
        .ef-import-eyebrow{font-size:10px;letter-spacing:.14em;font-weight:700;color:var(--color-primary);margin:0 0 7px}
        .ef-import-intro h2{font-size:20px;margin:0 0 6px;font-weight:650}
        .ef-import-intro p:last-child{margin:0;color:var(--color-text-secondary);font-size:13px;line-height:1.6;max-width:760px}
        .ef-import-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(260px,1fr);gap:18px}
        .ef-import-panel{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:22px;min-width:0}
        .ef-import-panel__heading{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:18px}
        .ef-import-panel h3{font-size:15px;margin:0 0 5px;font-weight:650}
        .ef-import-panel__heading p{font-size:12px;color:var(--color-text-muted);margin:0}
        .ef-import-limit{font-size:10px;color:var(--color-text-muted);white-space:nowrap}
        .ef-import-drop{min-height:142px;border:1px dashed var(--color-primary-border);border-radius:var(--radius-md);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;background:rgba(131,77,251,.035);cursor:pointer;text-align:center}
        .ef-import-drop input{position:absolute;width:1px;height:1px;opacity:0}
        .ef-import-drop:focus-within{outline:2px solid var(--color-primary);outline-offset:3px}
        .ef-import-drop__icon{color:var(--color-primary);margin-bottom:2px}
        .ef-import-drop strong{font-size:13px}.ef-import-drop span:last-child{font-size:11px;color:var(--color-text-muted)}
        .ef-import-divider{display:flex;align-items:center;gap:12px;margin:18px 0;color:var(--color-text-muted);font-size:9px;letter-spacing:.12em;font-weight:700}
        .ef-import-divider:before,.ef-import-divider:after{content:'';height:1px;background:var(--color-border);flex:1}
        .ef-import-textarea{width:100%;resize:vertical;background:var(--color-background);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:12px;color:var(--color-text);font:12px/1.6 var(--font-mono,monospace)}
        .ef-import-textarea:focus{outline:2px solid var(--color-focus-ring);border-color:var(--color-primary)}
        .ef-import-actions{display:flex;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap}
        .ef-import-button{border:0;border-radius:7px;padding:10px 14px;background:var(--color-primary);color:white;font-size:12px;font-weight:650;cursor:pointer}
        .ef-import-button:disabled{opacity:.45;cursor:not-allowed}
        .ef-import-filename{font-size:11px;color:var(--color-text-muted);overflow-wrap:anywhere}
        .ef-import-message{display:flex;gap:8px;align-items:flex-start;font-size:11px;margin:12px 0 0}
        .ef-import-message--error{color:var(--color-error-text)}.ef-import-message--success{color:var(--color-success-text)}
        .ef-import-guidance ul{padding-left:18px;margin:16px 0;display:grid;gap:12px;color:var(--color-text-secondary);font-size:12px;line-height:1.55}
        .ef-import-notice{display:flex;gap:9px;padding:12px;background:var(--color-accent-subtle);border:1px solid var(--color-accent-border);border-radius:8px;color:var(--color-accent-contrast)}
        .ef-import-notice svg{flex-shrink:0;margin-top:2px}.ef-import-notice p{font-size:11px;line-height:1.5;margin:0}
        .ef-import-results{display:flex;flex-direction:column;gap:18px}
        .ef-import-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
        .ef-import-metrics div{padding:13px;background:var(--color-background);border:1px solid var(--color-border-subtle);border-radius:8px}
        .ef-import-metrics span{display:block;font-size:10px;color:var(--color-text-muted);margin-bottom:6px}.ef-import-metrics strong{font-size:21px;font-variant-numeric:tabular-nums}
        .ef-import-mapping{display:flex;gap:14px;flex-wrap:wrap}
        .ef-import-mapping label{display:grid;gap:6px;font-size:11px;color:var(--color-text-secondary);min-width:190px}
        .ef-import-mapping select{background:var(--color-background);border:1px solid var(--color-border);border-radius:7px;padding:9px;color:var(--color-text);min-width:220px}
        .ef-import-table-wrap{overflow-x:auto}
        .ef-import-table{width:100%;border-collapse:collapse;font-size:12px;text-align:left}
        .ef-import-table th{color:var(--color-text-muted);font-size:10px;font-weight:650;padding:10px;border-bottom:1px solid var(--color-border);white-space:nowrap}
        .ef-import-table td{padding:12px 10px;border-bottom:1px solid var(--color-border-subtle);color:var(--color-text-secondary)}
        .ef-import-table td:nth-child(2){color:var(--color-text);font-weight:600}
        .ef-import-valid{display:inline-flex;align-items:center;gap:5px;color:var(--color-success-text);font-size:10px}
        .ef-import-table-note{display:flex;align-items:center;gap:7px;color:var(--color-text-muted);font-size:11px;padding:10px 0 0}
        .ef-import-footnote{display:flex;align-items:flex-start;gap:8px;color:var(--color-text-muted);font-size:10px;line-height:1.5;margin:0}
        @media(max-width:900px){.ef-import-grid{grid-template-columns:1fr}}
        @media(max-width:600px){.ef-import-panel{padding:16px}.ef-import-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.ef-import-intro{padding:16px}.ef-import-panel__heading{flex-direction:column}}
      `}</style>
    </div>
  );
}
