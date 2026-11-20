/**
 * EventFlow participant import utilities.
 *
 * Adapted from the GatePass import workflow:
 * - accepts CSV, TSV, semicolon-delimited text and pasted spreadsheet cells
 * - detects likely name and contact columns
 * - de-duplicates by normalized name + contact (not contact alone)
 *
 * This module is deliberately backend-agnostic. It prepares a preview only;
 * persistence and pass issuance belong to the later Supabase integration.
 */

export type ImportColumn = {
  index: number;
  label: string;
  emailMatchRate: number;
  phoneMatchRate: number;
};

export type ImportAnalysis = {
  hasHeader: boolean;
  columns: ImportColumn[];
  nameColumn: number;
  contactColumn: number;
  rows: string[][];
};

export type ImportedParticipant = {
  fullName: string;
  contact: string;
  sourceRow: number;
};

export type ImportPreview = {
  participants: ImportedParticipant[];
  blankRows: number;
  duplicateRows: number;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

const NAME_HEADER = /^(full\s*name|name|your\s*(full\s*)?name|student\s*name|participant('?s)?\s*name|attendee\s*name)$/i;
const NAME_ANY = /name/i;
const NAME_EXCLUSIONS = /college|club|team|institute|institution|school|university|event|father|mother|guardian|parent|username|file/i;
const EMAIL_HEADER = /e-?mail/i;
const PHONE_HEADER = /phone|mobile|whats\s*app|contact|number|cell/i;

export const isEmail = (value: string): boolean => EMAIL_PATTERN.test(value.trim());
export const isPhone = (value: string): boolean =>
  PHONE_PATTERN.test(value.trim()) && value.replace(/\D/g, '').length >= 7;

function detectDelimiter(firstLine: string): string {
  if (firstLine.includes('\t')) return '\t';
  const commas = (firstLine.match(/,/g) ?? []).length;
  const semicolons = (firstLine.match(/;/g) ?? []).length;
  return semicolons > commas ? ';' : ',';
}

/** Parse delimited text while respecting quoted delimiters and escaped quotes. */
export function parseDelimitedText(input: string): string[][] {
  const text = String(input ?? '').replace(/^\uFEFF/, '');
  if (!text.trim()) return [];

  const delimiter = detectDelimiter(text.split(/\r?\n/, 1)[0] ?? '');
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"' && cell.length === 0) {
      quoted = true;
    } else if (char === delimiter) {
      row.push(cell.trim());
      cell = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[index + 1] === '\n') index += 1;
      row.push(cell.trim());
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((value) => value.length > 0)) rows.push(row);
  }

  return rows;
}

function normalizedContact(value: string): string {
  const contact = value.trim().toLowerCase();
  if (isEmail(contact)) return contact;
  const digits = contact.replace(/\D/g, '');
  return digits.length >= 7 ? digits.slice(-10) : contact;
}

function participantKey(name: string, contact: string): string {
  return `${name.toLowerCase().replace(/\s+/g, ' ').trim()}|${normalizedContact(contact)}`;
}

/** Infer likely columns from a header row and a sample of participant rows. */
export function analyseImport(rows: string[][]): ImportAnalysis | null {
  if (rows.length === 0) return null;

  const header = rows[0] ?? [];
  const width = Math.max(...rows.slice(0, 50).map((row) => row.length), 0);
  const firstRowLooksLikeData = header.some((value) => isEmail(value) || isPhone(value));
  const hasHeader =
    !firstRowLooksLikeData &&
    header.some((value) => NAME_ANY.test(value) || EMAIL_HEADER.test(value) || PHONE_HEADER.test(value));
  const body = hasHeader ? rows.slice(1) : rows;
  const sample = body.slice(0, 200);

  const columns: ImportColumn[] = Array.from({ length: width }, (_, index) => {
    const values = sample.map((row) => row[index] ?? '').filter(Boolean);
    const rate = (test: (value: string) => boolean) =>
      values.length === 0 ? 0 : values.filter(test).length / values.length;

    return {
      index,
      label: hasHeader ? header[index] || `Column ${index + 1}` : `Column ${index + 1}`,
      emailMatchRate: rate(isEmail),
      phoneMatchRate: rate(isPhone),
    };
  });

  let nameColumn = hasHeader ? header.findIndex((value) => NAME_HEADER.test(value)) : -1;
  if (nameColumn < 0 && hasHeader) {
    nameColumn = header.findIndex((value) => NAME_ANY.test(value) && !NAME_EXCLUSIONS.test(value));
  }
  if (nameColumn < 0) {
    nameColumn = columns.find((column) => {
      const values = sample.map((row) => row[column.index] ?? '').filter(Boolean);
      return (
        column.emailMatchRate < 0.3 &&
        column.phoneMatchRate < 0.3 &&
        values.length > 0 &&
        values.filter((value) => /[A-Za-z\u0900-\u097F]/.test(value)).length / values.length > 0.7
      );
    })?.index ?? 0;
  }

  const findContactColumn = (kind: 'email' | 'phone'): number => {
    const key = kind === 'email' ? 'emailMatchRate' : 'phoneMatchRate';
    const headerPattern = kind === 'email' ? EMAIL_HEADER : PHONE_HEADER;
    const explicit = hasHeader
      ? header.findIndex((value, index) => index !== nameColumn && headerPattern.test(value) && (columns[index]?.[key] ?? 0) > 0.5)
      : -1;
    if (explicit >= 0) return explicit;

    return columns
      .filter((column) => column.index !== nameColumn && column[key] > 0.5)
      .sort((left, right) => right[key] - left[key])[0]?.index ?? -1;
  };

  const phoneColumn = findContactColumn('phone');
  const emailColumn = findContactColumn('email');

  return {
    hasHeader,
    columns,
    nameColumn,
    // Match GatePass's WhatsApp-first convention when a phone column exists.
    contactColumn: phoneColumn >= 0 ? phoneColumn : emailColumn,
    rows: body,
  };
}

/** Build a reviewable import preview; never silently merges two people sharing a phone. */
export function buildImportPreview(
  analysis: ImportAnalysis,
  nameColumn = analysis.nameColumn,
  contactColumn = analysis.contactColumn,
  existing: Array<Pick<ImportedParticipant, 'fullName' | 'contact'>> = [],
): ImportPreview {
  const seen = new Set(existing.map((participant) => participantKey(participant.fullName, participant.contact)));
  const participants: ImportedParticipant[] = [];
  let blankRows = 0;
  let duplicateRows = 0;

  analysis.rows.forEach((row, index) => {
    const fullName = (row[nameColumn] ?? '').replace(/\s+/g, ' ').trim().slice(0, 120);
    const contact = contactColumn >= 0
      ? (row[contactColumn] ?? '').replace(/\s+/g, ' ').trim().slice(0, 160)
      : '';

    if (!fullName) {
      blankRows += 1;
      return;
    }

    const key = participantKey(fullName, contact);
    if (seen.has(key)) {
      duplicateRows += 1;
      return;
    }

    seen.add(key);
    participants.push({ fullName, contact, sourceRow: index + (analysis.hasHeader ? 2 : 1) });
  });

  return { participants, blankRows, duplicateRows };
}

/** Escape cells so exported participant data remains valid CSV. */
export function toCsv(rows: Array<Array<string | number | null | undefined>>): string {
  return rows
    .map((row) =>
      row
        .map((value) => {
          const cell = String(value ?? '');
          return /[",\n\r]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
        })
        .join(','),
    )
    .join('\r\n') + '\r\n';
}
