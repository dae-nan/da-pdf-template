[README.md.md](https://github.com/user-attachments/files/25199260/README.md.md)
# Credit Authorities Delegation Letter PDF Template Specification

## 1. Scope and Intent
This specification defines an A4 portrait, print-ready PDF template for internal Credit Authorities delegation letters. It supports delegation flow from Board to Group Chief Risk Officer (GCRO), then via Credit Policy to CROs/staff across risk types and business lines.

The template is system-generated, electronically signed, and auditable.

## 2. Design System Mapping (Derived from Provided PNG)
Derived and extrapolated visual tokens to align with the Standard Chartered PDF design language shown in the reference:

- Primary brand navy: `#0A1F72`
- Action/section blue: `#005BBB`
- Accent green: `#38D200`
- Text primary: `#1F2530`
- Text secondary: `#566172`
- Border neutral: `#CFD6E1`
- Background neutral: `#F5F7FA`
- Restriction/status red: `#9F2B2F`

Typography (best-fit to reference style):
- Font family stack: `"Arial", "Helvetica Neue", Helvetica, sans-serif`
- Title: 12-14pt, semibold/bold
- Section header: 10-11pt, bold, uppercase
- Body: 9-10pt
- Footnote/meta: 7.5-8.5pt

Layout system:
- Page size: A4 portrait (`210mm x 297mm`)
- Content margins: `10mm` left/right, `8mm` top, `28mm` bottom (footer reserve)
- Header strip with top meta and thin brand rule
- Footer with legal disclaimer + audit stamp + page numbering
- Spacing scale: 2, 4, 8, 12, 16, 24px equivalents

## 3. Use Case 2.0 (Cockburn) - Primary Use Case + Extensions

### Use Case ID
UC-CA-001

### Use Case Name
Generate Credit Authority Delegation Letter PDF

### Level
User-goal

### Primary Actor
Credit Delegation Service (system user acting on behalf of Credit Policy)

### Supporting Actors
- Identity and Access source
- Credit policy rules service
- Market/entity configuration service
- E-signature service
- Audit/logging service

### Stakeholders and Interests
- Board/GCRO/CRO hierarchy: accurate, policy-compliant delegation chain
- Delegatee: clear authorities, limits, terms, and effective period
- Compliance/Audit: traceability, non-repudiation, supersession trail
- Operations: print-safe, consistent output across entities

### Preconditions
- Delegatee identity is valid and active.
- Role and market/entity assignments are current.
- Delegation ruleset version is published.
- Required source data for authorities exists.

### Trigger
A delegation letter generation event is requested (new grant, renewal, supersession, temporary grant, or role change).

### Main Success Scenario (Happy Path)
1. System receives request with delegatee, roles, market/entity scope, and effective dates.
2. System validates delegator authority chain (Board -> GCRO -> issuing authority).
3. System resolves applicable authority matrix by role, market/entity, risk type, and business line.
4. System separates permanent and temporary delegations and validates overlap rules.
5. System renders letter header with classification, programme, role routing, and effective date.
6. System renders narrative terms and conditions specific to market/role/policy constraints.
7. System renders authority tables with clear segmentation by:
   - Role
   - Market/entity
   - Delegation type (permanent/temporary)
   - Effective/expiry dates
8. System injects electronic signature metadata (grant/accept state and timestamp).
9. System injects audit metadata (document ID, policy version, generated timestamp, generator identity, timezone, page count).
10. System applies print-safe formatting and outputs PDF.
11. System stores immutable record and logs generation/audit events.

### Success Guarantees (Postconditions)
- Signed, auditable PDF is produced and stored.
- Delegation content is policy-versioned and traceable.
- Supersession linkage to prior letters is preserved.

### Minimal Guarantees
- On failure, no partial signed letter is distributed.
- Failure reason and correlation ID are logged.

### Extensions

#### 2a. Delegator chain invalid
2a1. System blocks generation.
2a2. System records control breach event.

#### 3a. Multiple active roles (dual-hat)
3a1. System creates separate role blocks within one letter.
3a2. System prevents accidental limit blending across roles.
3a3. System adds conflict-handling note (stricter rule precedence where required).

#### 4a. Temporary delegation present
4a1. System renders dedicated temporary section.
4a2. System includes start/end timestamps, reason code, and auto-expiry behavior.
4a3. System marks temporary rows with visual tag and expiry warning.

#### 7a. Market-specific override exists
7a1. System renders local market override note and currency behavior.
7a2. System adds local-policy references/footnotes.

#### 8a. E-signature pending
8a1. System renders status as `PENDING ACCEPTANCE`.
8a2. System withholds final-issued state until acceptance event.

#### 10a. Print overflow risk
10a1. System reflows table with repeating headers and controlled page breaks.
10a2. System keeps footer legal text untruncated.

### Special Requirements (Non-functional)
- Rendering fidelity: no clipping/truncation in A4 portrait at 100% scaling.
- Accessibility: semantic headings/tables in HTML source.
- Security: tamper-evident document hash and immutable audit record.
- Performance target: <= 3s generation for typical 4-page letter.
- Localization: date format, timezone stamp, market currency support.

## 4. Information Architecture for Template

### 4.1 Mandatory Header
- Classification label (e.g., INTERNAL)
- Programme/business line
- Delegation anchor (e.g., `DA: CCH, IN`)
- Effective date
- Letter/document ID
- Policy/ruleset version

### 4.2 Delegation Route Banner
- From role (delegator)
- To role (delegatee)
- Optional market flag/name

### 4.3 Narrative Body
- Salutation with recipient identity and employee ID
- Legal/policy basis
- Scope statement
- Supersession statement
- Sub-delegation constraints
- Currency/local market note

### 4.4 Authority Sections
For each role block:
- Role title and role ID
- Market/entity scope
- Permanent delegations table
- Temporary delegations table (if any)
- Effective/expiry columns in each relevant row
- Restriction markers (`RESTRICTED`, `NOT APPLICABLE`)

### 4.5 Terms & Conditions
- Scope of authority
- Reporting requirements
- Compliance obligations
- Review/revocation terms
- Market-specific clauses

### 4.6 Signature and Audit Block
- Granted by (name, role, timestamp, status)
- Accepted by (name, role, timestamp, status)
- Digital signature reference IDs
- System-generated disclaimer
- Downloaded by / downloaded on
- Page numbering (`Page X of Y`)

## 5. Best-Practice Additions Recommended
- Add `Document Hash` (SHA-256 truncated display) to footer meta.
- Add `Supersedes Document ID` and `Superseded On` fields.
- Add `Reason Code` for temporary delegations (coverage, leave, incident, transition).
- Add `Time Zone` explicitly to all timestamps (e.g., `GMT+05:30`).
- Add `Data Source Snapshot Timestamp` to aid audit replay.
- Add `No Further Sub-delegation` flag per row where applicable.

## 6. Print and Pagination Rules
- Use CSS `@page { size: A4 portrait; margin: 0; }` and internal safe margins.
- Keep header/footer fixed per page; body scroll area avoided in print mode.
- Apply `page-break-inside: avoid` on section containers and signature cards.
- Apply table header repetition (`thead { display: table-header-group; }`).
- Prevent orphaned headings and one-line widows.
- Enforce color fidelity with `print-color-adjust: exact`.

## 7. Output Artifacts
- HTML template (`delegation-template.html`)
- Stylesheet (`delegation-template.css`)
- Script (`delegation-template.js`)
- Generated PDF from browser print (`Save as PDF`) at 100% scale
