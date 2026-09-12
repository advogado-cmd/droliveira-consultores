import type { SiteContent } from "./types";

const en: SiteContent = {
  meta: {
    title: "Dr Oliveira Consultores · Healthcare strategy in Brazil",
    description:
      "Strategy consulting for hospitals, medical, dental, veterinary and aesthetic clinics in Brazil: 360 due diligence, unlock plan and growth-cycle steering.",
    ogLocale: "en_US",
  },
  consultant: {
    eyebrow: "Who leads the work",
    title: "Carlos Fernando Lopes de Oliveira",
    intro: "A strategy consultant who brings two careers together: twenty years in the legal field advising companies, and the management of a hospital institution. That combination is what allows him to read the whole company — market, operations and regulation — and turn the reading into decisions.",
    legal: { label: "Legal field", items: ["Lawyer since 2006, practising in corporate, tax and healthcare law", "Master's in Legal Sciences and Economic Law — UFPB", "Author of company diligences covering five years of records and thousands of invoices per company"] },
    management: { label: "Hospital and business management", items: ["President of Hospital Novo Nascer", "Specialist in Hospital and Healthcare Management — FECS/Oswaldo Cruz", "Specialist in Business Management — CEDEPE"] },
    cta: "Meet the consultant",
  },
  people: {
    eyebrow: "People and organisation",
    title: "The structure is also made of people.",
    intro: "One part of the consultancy looks at how the organisation is designed and at the people who hold it up. A partner psychologist runs the assessments; the consultancy integrates the results into the plan.",
    items: [
      { title: "Systemic organisational assessment", text: "How the company really works: roles, decisions, communication, dependencies and points of tension between areas — read as a system, not as an org chart.", bullets: ["Map of roles and decisions", "Interviews and observation with management and teams", "Points of tension and overload by area"] },
      { title: "People assessment", text: "Psychological assessment of teams and leaders with validated instruments — resilience, occupational-stress and climate scales — applied by a licensed psychologist and returned as management decisions.", bullets: ["Resilience and occupational-stress scales", "Profile of leaders and key teams", "Individual feedback and management report"] },
      { title: "NR-1 compliance: psychosocial risks", text: "Since 26 May 2026 labour inspection in Brazil is no longer educational: the Risk Management Programme must inventory psychosocial risks and carry an action plan (MTE Ordinance 1,419/2024). We run the survey, the inventory, the plan and the documents inspectors ask for.", bullets: ["Psychosocial risk survey by job function", "Inventory in the PGR and action plan", "Documentation for inspection and follow-up evidence"] },
    ],
    note: "Psychological assessments are conducted by a psychologist registered with the CRP, under the Federal Council of Psychology's resolutions. [TO CONFIRM: professional's name and registration.]",
  },
  home: {
    heroTitle: "Your company is sound. The structure around it is what holds growth back.",
    heroSub:
      "Strategy consulting for hospitals, medical, dental, veterinary and aesthetic clinics in Brazil. We read the whole company — market, marketing, operations and regulation — find the knot that ties up the other areas, and steer the next growth cycle.",
    ctaPrimary: "Request a due diligence",
    ctaSecondary: "See how it works",
    lenses: [
      { title: "Market", text: "Where the company stands against everyone competing for the same client: competitors, pricing, demand, sector consolidation and what changes in the next 24 months." },
      { title: "Marketing and sales", text: "Reputation, digital presence, a client base that is active or idle, channels, and the commercial engine that exists — or is missing." },
      { title: "Regulation and structure", text: "Licences, professional councils, sanitary surveillance, data protection, corporate and tax set-up. Translated into business decisions, with cost and sequence." },
      { title: "People and organisation", text: "How the organisation really works and who holds it up: roles, decisions, leaders, team resilience and psychosocial risks — assessed with method and integrated into the plan." },
    ],
    moves: [
      { n: "1", title: "See", text: "A 360 due diligence built from documents, invoices, public registries and an on-site visit. No loose opinions: every finding has a source." },
      { n: "2", title: "Unlock", text: "A plan in numbered workstreams — what comes first, who does it, what it costs, when. Sequence matters: one workstream opens the next." },
      { n: "3", title: "Grow", text: "Monthly steering of the cycle, with indicators and accountability, until the new revenue level becomes routine." },
    ],
    forWhom:
      "Hospitals and day hospitals · Medical clinics and groups · Dental clinics · Veterinary clinics and hospitals · Aesthetic clinics · Laboratories and health-techs. Mid-sized companies, family-owned or run by operating partners, that have outgrown the structure around them and whose owners have decided to invest in improving the company — and international groups entering Brazil.",
    proof: {
      title: "Twenty years advising companies",
      text: "Master's in Legal Sciences and Economic Law (UFPB), specialist in Business Management (CEDEPE) and in Hospital and Healthcare Management (FECS/Oswaldo Cruz). Experience running a hospital institution. A method applied to diligences covering five-plus years of records and thousands of invoices per company.",
    },
    finalTitle: "A 45-minute conversation defines the scope of the due diligence.",
    finalSub: "For owners who have already decided to invest in improving their company: you leave with scope, timeline and proposal.",
    finalCta: "Book the conversation",
  },
  services: {
    metaTitle: "Services · Dr Oliveira Consultores",
    metaDescription: "Express and 360 Due Diligence, Unlock Plan, Growth Cycle Steering and Readiness for expansion, sale or investment.",
    title: "Seven services, one sequence",
    intro: "Each service answers one management question. The due diligence is the entry point; the others only make sense after it.",
    items: [
      { slug: "express-due-diligence", name: "Express Due Diligence", question: "Is there anything here that should stop me?", deliverable: "3–5 page report: red flags, what to investigate, budget for the full due diligence.", timeline: "1–3 days", detail: "Screening from certificates, registrations, articles of association, the last two balance sheets, digital presence and a public-registry licence checklist, plus five questions to management." },
      { slug: "360-due-diligence", name: "360 Due Diligence", question: "What is wrong, what does fixing it cost, and where do I start?", deliverable: "Interactive report with the 14-front matrix, analysis on real data, on-site visit, licence checklist and a plan in numbered workstreams.", timeline: "3–6 weeks", detail: "Multidisciplinary analysis — tax, accounting, trademark, contracts, data, regulatory, competitive and management — based on invoices, projections and a roadmap. The core product." },
      { slug: "unlock-plan", name: "Unlock Plan", question: "In what order, with whom, and with what cash?", deliverable: "90/180/365-day roadmap with owners, costs, month-by-month outlay and management decisions.", timeline: "2 weeks after the due diligence", detail: "Sequences the workstreams so that one opens the next, with market estimates for every cost and the first-year cash reading." },
      { slug: "growth-cycle-steering", name: "Growth Cycle Steering", question: "Who makes sure it happens?", deliverable: "Monthly follow-up: priorities, suppliers, indicators, accountability.", timeline: "12 months", detail: "The consultant runs the programme: chases suppliers, tracks indicators and reports to management every month." },
      { slug: "readiness", name: "Readiness for expansion, sale or investment", question: "What blocks or reprices this deal?", deliverable: "360 Due Diligence + transactional risk register, indicative valuation and closing checklist.", timeline: "4–8 weeks", detail: "For acquisitions, sales, new partners, franchising or investment: change-of-control clauses, consents, disclosure and what reprices the business." },
      { slug: "people-and-organisation", name: "Organisational and people assessment", question: "Does the human structure hold the plan up?", deliverable: "Systemic organisational assessment and psychological assessment of teams and leaders (resilience, stress and climate scales), with a management report.", timeline: "3–5 weeks", detail: "Run by a partner psychologist with validated instruments; results enter the unlock plan as the people workstream." },
      { slug: "nr-1-psychosocial-risks", name: "NR-1 compliance — psychosocial risks", question: "Is the company ready for mental-health inspection?", deliverable: "Survey by job function, psychosocial risk inventory in the PGR, action plan and documentation for inspection.", timeline: "4–6 weeks", detail: "MTE Ordinance 1,419/2024; punitive inspection since 26 May 2026. Integrates occupational health, HR and the people assessment." },
    ],
    faq: [],
  },
  sectors: {
    metaTitle: "Sectors · Dr Oliveira Consultores",
    metaDescription: "Hospitals and medical clinics, dental, veterinary, aesthetic clinics, laboratories and health-techs — what we analyse in each sector.",
    title: "Sectors",
    intro: "Each sector has its own set of rules, competitors and revenue models. The reading is the same; the points of attention change.",
    items: [
      { slug: "hospitals-and-medical-clinics", key: "hospitais", name: "Hospitals and medical clinics", short: "Claim denials, payers, new reimbursement models and licensing.", headline: "Record efficiency, shrinking margins: claim denials, payer delinquency and new reimbursement models.", analyse: ["Revenue mix and payer dependence", "Contracts, bundles and revenue cycle", "Licensing (RDC 50, 63 and 36) and municipal sanitary licence", "Specialist registration and medical advertising (CFM Res. 2,336/2023)", "Health-data protection and telemedicine", "Opportunities: clinical research and in-house plans"], outcome: "Front map, repricing and compliance plan, new revenue cycle.", metaTitle: "Consulting for hospitals and medical clinics in Brazil", metaDescription: "Due diligence and strategic positioning for hospitals, day hospitals and medical clinics: denials, payers, licensing and growth." },
      { slug: "dental-clinics", key: "odontologia", name: "Dental clinics", short: "Chains, franchises, orofacial harmonisation and growth without paid-traffic dependence.", headline: "Chains and franchises grow on outside capital. The independent clinic grows on method.", analyse: ["Positioning against chains", "Portfolio and pricing", "Orofacial harmonisation and the scope now under court dispute", "Activity codes, corporate purpose, sanitary and radiology licensing", "Data protection", "Reputation and patient acquisition"], outcome: "Clarity on what the clinic can safely offer and how to grow without becoming hostage to paid traffic.", metaTitle: "Consulting for dental clinics in Brazil", metaDescription: "Due diligence and strategy for dental clinics: positioning against chains, portfolio, licensing and patient acquisition." },
      { slug: "veterinary-clinics", key: "veterinaria", name: "Veterinary clinics and hospitals", short: "CFMV classification, service invoicing, sanitary licence and chain competition.", headline: "Petz and Cobasi combined 112 clinics and 15 hospitals. The neighbourhood clinic has decades of reputation — and a registration that does not recognise it.", analyse: ["Classification (CFMV Res. 1,275/2022): office, clinic, hospital", "Activity codes and invoicing of veterinary services", "Technical officer and council registration", "Sanitary licence and waste plan", "Advertising rules (CFMV Res. 1,649/2025)", "Reimbursement pet plans, idle owner base, chain competition and valuation"], outcome: "A compliant company, correct taxation and an active commercial engine.", metaTitle: "Consulting for veterinary clinics in Brazil", metaDescription: "Due diligence and strategy for veterinary clinics and hospitals: CFMV classification, licensing, taxation and growth." },
      { slug: "aesthetic-clinics", key: "estetica", name: "Aesthetic clinics", short: "Who may perform what changed. The business model has to follow.", headline: "Who may perform what changed in 2024, 2025 and 2026. The business model has to follow.", analyse: ["Technical staff and technical officer after the Supreme Court and federal appellate rulings", "Aesthetic vs. medical clinic classification", "Sanitary licence for injectables", "Advertising and before/after rules", "Franchise contracts", "Pricing and portfolio"], outcome: "A defensible portfolio, the right structure and growth without exposure.", metaTitle: "Consulting for aesthetic clinics in Brazil", metaDescription: "Due diligence and strategy for aesthetic clinics: technical officer, classification, licensing, franchising and portfolio." },
      { slug: "laboratories-and-health-techs", key: "laboratorios", name: "Laboratories and health-techs", short: "Payer dependence, RDC 786, sensitive data and software as a medical device.", headline: "A billion tests a year, with revenue in the payers' hands.", analyse: ["Network dependence", "RDC 786/2023", "Genetic data as sensitive data", "Software as a medical device (RDC 657/2022)", "Selling to hospitals and accreditation requirements", "Telemedicine"], outcome: "Positioning for consolidation or independence.", metaTitle: "Consulting for laboratories and health-techs in Brazil", metaDescription: "Due diligence and strategy for laboratories and health-techs: payers, RDC 786, sensitive data, SaMD and accreditation." },
    ],
  },
  method: {
    metaTitle: "Method · DRO 360 Matrix",
    metaDescription: "Four families, fourteen fronts, three moves: how we read a company and organise the plan.",
    title: "DRO 360 Matrix: four families, fourteen fronts, three moves.",
    intro: "Every company is read across the same fourteen fronts and each front is rated critical, high, medium or low. The output is not a list of problems: it is the order in which to solve them, because one front opens the next. With the map in hand, the plan is organised into numbered workstreams with owner, cost and deadline, and monthly steering measures what changes.",
    families: [
      { name: "Financial", fronts: ["Accounting", "Liquidity", "Tax"] },
      { name: "Strategic", fronts: ["Market", "Sales", "Brand and intellectual capital"] },
      { name: "Operational", fronts: ["Management and systems", "Key person", "Equipment and infrastructure", "Data and privacy"] },
      { name: "Structural and regulatory", fronts: ["Corporate", "Assets", "Labour", "Regulatory and licences"] },
    ],
    rules: ["Every finding has a documentary source.", "No cost enters without a market estimate.", "The decision stays with management — the consultant prepares the decision, never replaces it."],
    note: "Corporate, asset and labour fronts are mapped and prioritised; the resulting legal acts are carried out by independent counsel chosen by the client.",
  },
  about: {
    metaTitle: "About · Carlos Fernando Lopes de Oliveira",
    metaDescription: "Strategy consultant with twenty years advising companies and experience running a hospital institution.",
    title: "About",
    name: "Carlos Fernando Lopes de Oliveira",
    bio: [
      "Strategy consultant with twenty years advising companies and experience running a hospital institution. Developed the due-diligence method that reads a company through fourteen risk fronts and steers it through a new growth cycle.",
      "Based in São Paulo, Recife and Belém; serves international groups entering Brazil, in English and Spanish.",
    ],
    credentials: ["Master's in Legal Sciences and Economic Law — UFPB", "Specialist in Business Management — CEDEPE", "Specialist in Hospital and Healthcare Management — FECS/Oswaldo Cruz", "Hospital institution manager"],
    network: "A multidisciplinary partner network in accounting, clinical engineering, occupational health and marketing, engaged according to each company's plan.",
  },
  investors: {
    metaTitle: "For investors · Entering Brazil's healthcare market",
    metaDescription: "Readiness and strategic diligence for groups and investors buying, opening or expanding clinics and hospitals in Brazil.",
    title: "Enter Brazil's healthcare market without buying a problem.",
    intro: "Readiness and strategic diligence for groups and investors buying, opening or expanding clinics, hospitals, veterinary and aesthetic chains in Brazil.",
    points: ["Establishment classification and sanitary licensing", "Professional councils and technical officer", "Corporate and tax structure suited to the foreign investor", "Local market, competition and go-to-market", "Transactional risk register and closing checklist"],
    cta: "Discuss a deal",
  },
  contact: {
    metaTitle: "Contact · Dr Oliveira Consultores",
    metaDescription: "Request a due diligence or book a 45-minute conversation.",
    title: "Request a due diligence",
    intro: "In a few lines, tell us what the company needs. We reply within one business day with the next step.",
    cities: "São Paulo · Recife · Belém",
    sectorOptions: ["Hospital or medical clinic", "Dental clinic", "Veterinary clinic or hospital", "Aesthetic clinic", "Laboratory or health-tech", "Other"],
  },
  legal: {
    privacy: { title: "Privacy Policy", body: ["Dr Oliveira Consultores processes contact data (name, company, role, e-mail and phone) to answer enquiries received through the site and, when authorised, to send content on management and regulation in the sectors it serves. The legal basis is consent (art. 7, I, Law 13,709/2018) for content and legitimate interest (art. 7, IX) for handling commercial enquiries.", "Data is kept for up to 24 months after the last contact and can be accessed, corrected or deleted on request through the e-mail on the contact page. We do not sell or share data with third parties beyond the processors needed to run the site (hosting and e-mail delivery), all under processing agreements.", "[TO CONFIRM: data protection officer, privacy e-mail and company address.]"] },
    cookies: { title: "Cookie Policy", body: ["Necessary cookies keep the site working and remember your language; they need no consent. Audience-analytics cookies (Google Analytics 4) are only enabled with your consent, given in the notice shown on your first visit, and can be withdrawn at any time on this page.", "We do not use advertising cookies."] },
    terms: { title: "Terms of Use", body: ["The content of this site is informational and management-oriented. It is not legal, medical or veterinary advice, nor a guarantee of results. References to rules are dated and may have changed; confirm they are in force before any decision.", "Trademarks, texts and images belong to Dr Oliveira Consultores and may not be reproduced without permission."] },
  },
  faq: [
    { q: "Does the consultancy provide legal services?", a: "No. Dr Oliveira Consultores provides due diligence, planning and management steering. Legal acts arising from the plan are carried out by independent counsel chosen by the company." },
    { q: "How long does a 360 Due Diligence take?", a: "Three to six weeks, depending on size and available records. The Express Due Diligence takes one to three days." },
    { q: "Do I need to stop operations?", a: "No. The work uses documents, public registries and one on-site visit scheduled with management." },
    { q: "Do you guarantee results?", a: "No. We deliver a grounded reading, a plan with estimated costs and steering with indicators. Projected savings and revenue are estimates, not guarantees." },
    { q: "Do you work with companies outside Brazil?", a: "Yes — we serve international groups entering or operating in Brazil, in English and Spanish." },
  ],
};

export default en;
