// Canopi Repository — client-side app. Hash-based routing so every screen
// has a real, shareable, refresh-safe URL on GitHub Pages.
(() => {
  'use strict';

  // auth.js holds the page until someone signs in; without it there is nothing to show.
  if (!window.CanopiAuth) return;
  const db = window.CanopiAuth.client;

  const NAV = [
    { key: 'home', label: 'Home' },
    { key: 'kb', label: 'Knowledge Base' },
    { key: 'projects', label: 'Projects' },
    { key: 'meetings', label: 'Meetings' },
    { key: 'resources', label: 'Resources' },
    { key: 'team-spaces', label: 'Team Spaces' },
    { key: 'tasks', label: 'Tasks' },
  ];

  const SOPS = [
    { title: 'Customer Escalation Handling SOP', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Expense Reimbursement SOP', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Hiring & Recruitment SOP', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-sop-hiring' },
    { title: 'Incident Response / Production Escalation SOP', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'IT/System Access Request SOP', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-sop-itaccess' },
    { title: 'New Hire Onboarding & Equipment Setup SOP', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-sop-onboarding' },
    { title: 'Offboarding SOP', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-sop-detail' },
    { title: 'Performance Review & Feedback Cycle SOP', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-sop-perfreview' },
    { title: 'PTO / Leave Request SOP', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-sop-pto' },
    { title: 'Vendor Onboarding & Contract Approval SOP', tag: 'Coming Soon', tagClass: 'tag-outline' },
  ];

  const POLICIES = [
    { title: 'Employee Handbook', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-policy-handbook' },
    { title: 'Code of Conduct', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-policy-detail' },
    { title: 'Equal Opportunity / Anti-Harassment Policy', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-policy-eeo' },
    { title: 'Remote Work / WFH Policy', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-policy-remotework' },
    { title: 'Confidentiality & NDA Policy', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-policy-nda' },
    { title: 'Acceptable Use Policy', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-policy-acceptableuse' },
    { title: 'Compensation & Benefits Overview', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Data Privacy & Security Policy', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Expense Reimbursement Policy', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'PTO & Holiday Policy', tag: 'Coming Soon', tagClass: 'tag-outline' },
  ];

  const FAQS = [
    { title: 'New Hire FAQ', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-faq-detail' },
    { title: 'IT & Equipment FAQ', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-faq-itequipment' },
  ];

  const PROCESS_DOCS = [
    'Bug Triage & Prioritization Process', 'Code Review Process and Approval Requirements',
    'Customer Feedback Intake and Routing Process', 'Design Review & Handoff Process',
    'Engineering Release/Deployment Process', 'Product Development Lifecycle',
    'QA / Testing Process Before Release', 'Sprint Planning & Sprint Review Process',
  ].map((title) => ({ title, tag: 'Coming Soon', tagClass: 'tag-outline' }));

  const BEST_PRACTICES = [
    { title: 'Design System Usage Guidelines', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Engineering Coding Standards & Style Guide', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Git Branching, Commit Message, and PR Conventions', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'Internal Documentation Writing Guidelines', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-bp-docwriting' },
    { title: 'Meeting Etiquette (Agendas, Note-Taking, Follow-Ups)', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-bp-meetingetiquette' },
    { title: 'Slack / Email Communication Norms', tag: 'Published v1', tagClass: 'tag-accent', route: 'kb-bp-slackemail' },
    { title: 'Writing Effective PRDs / Product Specs', tag: 'Coming Soon', tagClass: 'tag-outline' },
  ];

  const PROJECT_TEMPLATES = [
    { title: 'PRD (Product Requirements Doc) Template', file: 'PRD_Template.docx' },
    { title: 'Project Brief / Charter Template', file: 'Project_Brief_Charter_Template.docx' },
    { title: 'Retrospective Template', file: 'Retrospective_Template.docx' },
    { title: 'Risk Register Template', file: 'Risk_Register_Template.docx' },
    { title: 'Status Report Template', file: 'Status_Report_Template.docx' },
  ].map((t) => ({ title: t.title, tag: 'Published v1', tagClass: 'tag-accent', href: 'files/' + t.file }));

  const RESOURCE_TEMPLATES = [
    { title: 'Email templates (candidate outreach, client comms, etc.)', file: 'Email_Templates.docx' },
    { title: 'Standard Minutes Template', file: 'Standard_Minutes_Template.docx' },
    { title: 'Presentation / deck template', file: 'Canopi_Presentation_Template.pptx' },
    { title: 'Proposal template', file: 'Proposal_Template.docx' },
    { title: 'SOP / process doc template', file: 'SOP_Process_Doc_Template.docx' },
    { title: 'PPT Template (Standard)', file: 'PPT_Template_Standard.pptx' },
  ].map((t) => ({ title: t.title, tag: 'Published v1', tagClass: 'tag-accent', href: 'files/' + t.file }));

  const RESOURCE_FORMS = [
    { title: 'Equipment request form', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://forms.cloud.microsoft/r/F1nUn2DV3J' },
    { title: 'Exit interview form', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=JY8Tk0GgQkyr868YPlhikF4zfl_hpStNsG8_heHGk7ZUOFRUVEc2V09LUEE2MUZGNFAzTDJZRzNWQyQlQCN0PWcu' },
    { title: 'Expense reimbursement form', tag: 'Coming Soon', tagClass: 'tag-outline' },
    { title: 'IT support ticket form', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=JY8Tk0GgQkyr868YPlhikF4zfl_hpStNsG8_heHGk7ZUNTBIS0I3RFVWWlVLQVdBSUZBQkJGSkJJUCQlQCN0PWcu' },
    { title: 'New hire directory form', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=JY8Tk0GgQkyr868YPlhikF4zfl_hpStNsG8_heHGk7ZUMkJNU0lOM0Y1VzZEQ1ZYWVdNRFE5TERDOCQlQCN0PWcu' },
    { title: 'PTO request form', tag: 'Coming Soon', tagClass: 'tag-outline' },
  ];

  const RESOURCE_INVESTOR_DOCS = [
    { title: 'Investor Question Bank', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQAtylX5sBjiTJeXmHdzV5UaAbWP78omt8hgQf8bOlpW4W4?e=IbeVfA' },
    { title: 'Investor Roadmap Q3 2026', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQCIrfwE0BQ7RIP4r20hoIOCAWOHMyNYTGiB5x5FcwMa6v8?e=hlYLen' },
    { title: 'Diligence Package', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQCxGCsPmMfcQY1tyRHDhPrZAQgHJiWZRvZF0FFGMvZlaFw?e=mbXSUk' },
  ];
  const RESOURCE_INVESTOR_DECKS = [
    { title: '2026 Q2 Pitch Deck', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:p:/g/personal/angela_canopi_work/IQCc4vjhNSQhQ6lilq7PVdOJAVq9R8eFFPnzaROLRJOxGJM?e=KViBj0' },
  ];

  const TEAM_PRODUCT_SHARED = [
    { title: 'Canopi Roadmap Q3 V1', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/dixon_canopi_work/IQDn7t6ygqU9QYhvoBi8MsIbAf_ymwzGpX6DN7luR7-IUwk?e=KC5XGx' },
    { title: 'Canopi Roadmap Q3 V2', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/dixon_canopi_work/IQDwkMJPmZf2Tav1dEXnwygfAZ2fcqGQUcF_HYYi0nNUAW4?e=Raj7c0' },
    { title: 'Canopi Roadmap Q3 V3', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQDG2myTs8OHQaqZkTgEYpKDAUZNWtLI3afXJE_z5BP1XXo?e=jTVaju' },
  ];

  const PROJECTS_DOCUMENTATION_ADRS = [
    { title: 'ABi Blueprint V2', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/dixon_canopi_work/IQCc79PHA08sSa0f21nMqyQvARuioOakp--8T6dPJ4vZX50?e=FjTtaP' },
  ];
  const PROJECTS_DOCUMENTATION_STAKEHOLDER = [
    { title: 'ABi SaaS Model', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:x:/g/personal/dixon_canopi_work/IQDPZ4-NrlqLTZaLX3fN-XAbAaIcBJMuTmre9R8yEPaCdTk?e=XG1WsG' },
    { title: '2025 18-Month Consolidated Budget Report', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQBMJtIawrfPWVjucXylT8d9AZ468eI6a6mGjnvWDPDzchA?e=QovZGt' },
    { title: '2025 Business and Pricing Model', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQAQXOtkXHAbWteHzvTmtZoMAdHSBO-a0Ctef26d77gYPlQ?e=P0qTk4' },
  ];
  const PROJECTS_DOCUMENTATION_TECHDESIGN = [
    { title: 'Data Room Requirements Research', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQDxnKiddcNBVr_Y2EXbL2GAAUL5WDYW4C1ZUuWi79DKcN0?e=bWZJEg' },
  ];
  const TEAM_ENGINEERING_SHARED = [
    { title: 'Credential File References', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:f:/g/personal/angela_canopi_work/IgD5CmEP_GVdRrzjBN3Y-YuHAdEt5u5iyHiVZqjxOAtBwFs?e=D3Vhzs' },
    { title: 'Canopi Roadmap Q3 V3', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQDG2myTs8OHQaqZkTgEYpKDAUZNWtLI3afXJE_z5BP1XXo?e=jTVaju' },
  ];
  const PROJECTS_COMPLETED_MARKET_RESEARCH = [
    { title: 'Market Validation Research', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/r/personal/dixon_canopi_work/Documents/Dixon%20files%20to%20import/Canopi_Market_Validation_Research.docx?d=w8715d85a360748eeb5b1018850dbdd8c&csf=1&web=1&e=e8pGFS' },
  ];
  const MEETINGS_TEAM_WEEKLY = [
    { title: '26-09-17 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQDY2zd0m0mJTZeXebJDjC55AQx8W8YiIMSQqtGiTwndfXE?e=9QTGPE' },
    { title: '26-09-10 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQDD1e51vOxvQITDX3OGjtdRAWOqklXk-YUNTXOP8wET7e8?e=Ssz2Sm' },
    { title: '26-09-03 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQASXv5Z_D4MS4mibIJLlj8yAT6n7BW74o9GHEcbQEgqHW4?e=MKMXLk' },
    { title: '26-08-27 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQD-FNy8ZKmVRoilg1yVbGHuAbDnR_8DAVjPmxnlwxmhymE?e=bOk3t1' },
    { title: '26-08-20 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQAKwnPm_IFHQodWB0RApumjAf4nrcH-axPCoblltIWN0mg?e=aejEyI' },
    { title: '26-08-13 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQDnel_cOL2GTZ68gxfhM1qxAfwNjUj5SIC93Qh2NPmms2Y?e=8jYxga' },
    { title: '26-08-06 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQAbA1P-Z-T4R53_bKpgsqjkAUdpvZbvGe0-Nf3K3aeuC1M?e=6de7Sq' },
    { title: '26-07-30 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQAoUkCNAUD8TrHJYPNogBlXAepocAYNGahOgtXFUW7509c?e=WHdNbe' },
    { title: '26-07-23 Weekly Team Meeting Minutes', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:w:/g/personal/angela_canopi_work/IQBvGPkIfOIcTLvjdvtR24eqAfFmDPjsqMTUjwMnEVVSh-A?e=PIeAEs' },
  ];
  const PROJECTS_COMPLETED_ARCHIVE = [
    { title: 'Sales Deck 2025 Q4', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:p:/g/personal/angela_canopi_work/IQCKQX8fw_jIWyxUHQ8hV9UXAWgVurvgJ9SVtT7uZYgJS5A?e=Sen75U' },
    { title: 'Pitch Deck 2025 Q4 V1', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:p:/g/personal/angela_canopi_work/IQAQvAfx5-ztWIUQshIr7VNcAT91emyjVM6tyqnfN4N98Qo?e=IefG7a' },
    { title: 'Pitch Deck 2025 Q4 V2', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:p:/g/personal/angela_canopi_work/IQAz2Wip_-g2X_G9duS9O6hpATD_XASoAPd-aKFVe3bpAqo?e=z649d6' },
    { title: 'Pitch Deck 2026 Q2 V1', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:p:/g/personal/angela_canopi_work/IQALufnsL2qDXp9pXMZzeFj0AUUH8MtU3PnFdFstjChIofI?e=51JWbH' },
    { title: 'Pitch Deck 2026 Q2 V2', tag: 'Published v1', tagClass: 'tag-accent', href: 'https://canopi407-my.sharepoint.com/:p:/g/personal/angela_canopi_work/IQCRCy5Td0w7W8IJTJbInC1cAWGpmZ5I1J7C3U9_x9xkz3A?e=x7wo4p' },
  ];

  // ---------- SharePoint documents shown inside the site ----------
  // Word/Excel/PowerPoint/PDF share links from the lists above open on an
  // in-site viewer page (#doc-<key>) using SharePoint's embedded view, instead
  // of a new tab. Folder links still open SharePoint, since folders can't be embedded.
  const SHAREPOINT_DOC_KINDS = { w: 'Word', x: 'Excel', p: 'PowerPoint', b: 'PDF' };
  const DOC_PREFIX = 'doc-';
  const SHAREPOINT_DOCS = {}; // key -> { title, href, section, kind }
  const SHAREPOINT_KEY_BY_HREF = {};
  function sharePointKind(href) {
    const m = /^https:\/\/[\w-]+\.sharepoint\.com\/:(\w):\//.exec(href || '');
    if (m) return SHAREPOINT_DOC_KINDS[m[1]] || null;
    if (/^https:\/\/[\w-]+\.sharepoint\.com\/.*\.(docx?|xlsx?|pptx?|pdf)(\?|$)/i.test(href || '')) {
      const ext = /\.(\w+)(\?|$)/.exec(href.split('?')[0] + '?')[1].toLowerCase();
      return { doc: 'Word', docx: 'Word', xls: 'Excel', xlsx: 'Excel', ppt: 'PowerPoint', pptx: 'PowerPoint', pdf: 'PDF' }[ext];
    }
    return null;
  }
  function shortKey(text) {
    let h = 5381;
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  [
    [MEETINGS_TEAM_WEEKLY, 'meetings-team-weekly'],
    [RESOURCE_INVESTOR_DOCS, 'resources-investor'],
    [RESOURCE_INVESTOR_DECKS, 'resources-investor'],
    [TEAM_PRODUCT_SHARED, 'team-product-shared'],
    [TEAM_ENGINEERING_SHARED, 'team-engineering-shared'],
    [PROJECTS_DOCUMENTATION_ADRS, 'projects-documentation-adrs'],
    [PROJECTS_DOCUMENTATION_STAKEHOLDER, 'projects-documentation-raci'],
    [PROJECTS_DOCUMENTATION_TECHDESIGN, 'projects-documentation-techdesign'],
    [PROJECTS_COMPLETED_MARKET_RESEARCH, 'projects-completed-lessons'],
    [PROJECTS_COMPLETED_ARCHIVE, 'projects-completed-archive'],
  ].forEach(([list, section]) => list.forEach((item) => {
    const kind = sharePointKind(item.href);
    if (!kind) return;
    const key = shortKey(item.href);
    SHAREPOINT_DOCS[key] = { title: item.title, href: item.href, section, kind };
    SHAREPOINT_KEY_BY_HREF[item.href] = key;
  }));

  // Recurring 1:1 pairs — [display label (plain text), route slug]
  const RECURRING_1ON1_PAIRS = [
    ['Bionka<>Anj', 'bionka-anj'],
    ['Bionka<>Dixon', 'bionka-dixon'],
    ['Bionka<>Jagun', 'bionka-jagun'],
    ['Dixon<>Puja', 'dixon-puja'],
    ['Dixon<>Sebastian', 'dixon-sebastian'],
    ['Jagun<>John', 'jagun-john'],
    ['Jagun<>Alvin', 'jagun-alvin'],
  ];

  const ICON_DEFAULT = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6';
  const ICON_USERS = 'M16 3.13a4 4 0 0 1 0 7.75 M13 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M22.5 21v-2a4 4 0 0 0-3-3.87 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8';
  const ICON_CALENDAR = 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z';
  const ICON_FOLDER_OPEN = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3z M3 8v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9';
  const ICON_UPLOAD = 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12';
  const ICON_PLUS = 'M12 5v14 M5 12h14';
  const ICON_LINK = 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71';
  const ICONS = {
    'Active Projects': 'M22 12h-4l-3 9L9 3l-3 9H2',
    'Completed Projects': 'M21.801 10A10 10 0 1 1 17 3.335 M9 11l3 3L22 4',
    'Templates': 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
    'Documentation': ICON_DEFAULT + ' M16 13H8 M16 17H8 M10 9H8',
    'Team Meetings': ICON_USERS,
    'One-on-One Minutes': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'Forms': 'M9 12h6 M9 16h6 M9 8h1 M8 4h8a1 1 0 0 1 1 1v1H7V5a1 1 0 0 1 1-1z M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'Brand Assets': 'M3 3h18v18H3z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21',
    'Shared Documents': 'M10 13a5 5 0 0 0 7.54.54l1.72-1.72a5 5 0 0 0-7.07-7.07l-.94.94 M14 11a5 5 0 0 0-7.54-.54L4.74 12.18a5 5 0 0 0 7.07 7.07l.94-.94',
    'Investor Relations': 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    'Executive Team': 'M20 7h-3V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M8 7V5h8v2',
    'Product Team': 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12l8.73-5.04 M12 22.08V12',
    'Engineering Team': 'm18 16 4-4-4-4 M6 8l-4 4 4 4 M14.5 4l-5 16',
    'Project Archive': 'M21 8v13H3V8 M1 3h22v5H1z M10 12h4',
    'Retrospectives / Post-Mortems': 'M3 12a9 9 0 1 0 3-6.7L3 8 M3 3v5h5',
    'Market Research': 'M9 18h6 M10 22h4 M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 6.6 12.5c.79.76 1.23 1.53 1.41 2.5',
    'Case Studies': 'M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3',
    'Architecture Decision Records (ADRs)': 'M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9',
    'Technical Design Docs': ICON_DEFAULT + ' M16 13H8 M16 17H8 M10 9H8',
    "Stakeholder's Records": ICON_USERS,
    'Requirements Docs & Acceptance Criteria': 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    'Cross-Team (Product × Engineering) Sync Notes': ICON_USERS,
    'Weekly Team Meeting Notes': ICON_CALENDAR,
    'Meeting Notes': ICON_CALENDAR,
    'Shared Resources': ICON_FOLDER_OPEN,
    'Executive Team Shared Resources': ICON_FOLDER_OPEN,
    'Product Team Shared Resources': ICON_FOLDER_OPEN,
    'Engineering Team Shared Resources': ICON_FOLDER_OPEN,
    'All-Hands Meeting Notes': ICON_USERS,
    'Budget & Headcount Planning': 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    'Quarterly Planning / OKR Review': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    'Weekly Exec Sync': ICON_CALENDAR,
    'Product Team Sync Notes': ICON_USERS,
    'Engineering Standup / Sprint Planning & Retro Notes': 'm18 16 4-4-4-4 M6 8l-4 4 4 4 M14.5 4l-5 16',
    'SOPs': 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    'Process Documentation': ICON_DEFAULT + ' M16 13H8 M16 17H8 M10 9H8',
    'Policies': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'Best Practices': 'M9 18h6 M10 22h4 M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 6.6 12.5c.79.76 1.23 1.53 1.41 2.5',
    'FAQs': 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 17h.01',
  };

  const TITLES = {
    home: 'Home', kb: 'Knowledge Base', 'kb-sops': 'SOPs', 'kb-sop-detail': 'Offboarding SOP',
    'kb-policies': 'Policies', 'kb-policy-detail': 'Code of Conduct', 'kb-faqs': 'FAQs',
    'kb-faq-detail': 'New Hire FAQ', 'kb-process-docs': 'Process Documentation', 'kb-best-practices': 'Best Practices',
    'kb-sop-hiring': 'Hiring & Recruitment SOP', 'kb-sop-itaccess': 'IT/System Access Request SOP',
    'kb-sop-onboarding': 'New Hire Onboarding SOP', 'kb-sop-perfreview': 'Performance Review & Feedback Cycle SOP',
    'kb-sop-pto': 'PTO / Leave Request SOP',
    'kb-policy-handbook': 'Employee Handbook', 'kb-policy-eeo': 'Equal Opportunity / Anti-Harassment Policy',
    'kb-policy-remotework': 'Remote Work / WFH Policy', 'kb-policy-nda': 'Confidentiality & NDA Policy',
    'kb-policy-acceptableuse': 'Acceptable Use Policy', 'kb-faq-itequipment': 'IT & Equipment FAQ',
    'kb-bp-docwriting': 'Internal Documentation Writing Guidelines', 'kb-bp-meetingetiquette': 'Meeting Etiquette',
    'kb-bp-slackemail': 'Slack / Email Communication Norms',
    projects: 'Projects', 'projects-active': 'Active Projects',
    'project-detail': 'Example Project: Repository Site Rollout', meetings: 'Meetings',
    resources: 'Resources', 'team-spaces': 'Team Spaces', tasks: 'Tasks',
    'projects-completed': 'Completed Projects', 'projects-templates': 'Project Templates', 'projects-documentation': 'Documentation',
    'meetings-team': 'Team Meetings', 'meetings-1on1': 'One-on-One Minutes',
    'resources-templates': 'Templates', 'resources-forms': 'Forms', 'resources-shared': 'Shared Documents',
    'resources-investor': 'Investor Relations',
    'team-executive': 'Executive Team', 'team-product': 'Product Team', 'team-engineering': 'Engineering Team',
    'team-executive-notes': 'Executive Team Meeting Notes', 'team-product-notes': 'Product Team Meeting Notes', 'team-engineering-notes': 'Engineering Team Meeting Notes',
    'team-product-shared': 'Product Team Shared Resources',
    'projects-completed-lessons': 'Market Research',
    'projects-documentation-adrs': 'Architecture Decision Records (ADRs)',
    'projects-documentation-raci': "Stakeholder's Records",
    'meetings-1on1-recurring': 'Recurring 1:1 Notes',
    'meetings-team-weekly': 'Weekly Team Meeting Notes',
    'projects-completed-archive': 'Project Archive',
    'projects-documentation-techdesign': 'Technical Design Docs',
    'team-engineering-shared': 'Engineering Team Shared Resources',
  };

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function icon(d, size) {
    size = size || 20;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }
  function withIcon(c) { return Object.assign({}, c, { icon: ICONS[c.label] || ICON_DEFAULT }); }
  function crumb(items) {
    return '<div class="breadcrumb">' + items.map((it, idx) => {
      const piece = it.route ? '<a href="#' + it.route + '">' + it.label + '</a>' : '<span>' + it.label + '</span>';
      return piece + (idx < items.length - 1 ? ' &raquo; ' : '');
    }).join('') + '</div>';
  }
  function sectionCardHTML(c) {
    const iconHTML = icon(c.icon || ICON_DEFAULT);
    if (c.external) {
      return '<a href="' + c.href + '" target="_blank" rel="noopener" class="section-card">' + iconHTML + c.label +
        '<span class="section-card-external">SharePoint &#8599;</span></a>';
    }
    return '<a href="#' + c.route + '" class="section-card">' + iconHTML + c.label + '</a>';
  }
  function sectionIndexHTML(crumbItems, title, lead, cards) {
    return crumb(crumbItems) + '<h1>' + title + '</h1>' +
      '<p class="section-lead">' + lead + '</p>' +
      '<div class="section-cards">' + cards.map(sectionCardHTML).join('') + '</div>';
  }
  function docRowHTML(d) {
    let link;
    if (d.route) link = '<a href="#' + d.route + '"><span>' + d.title + '</span></a>';
    else if (d.hrefExternal && SHAREPOINT_KEY_BY_HREF[d.href]) {
      const key = SHAREPOINT_KEY_BY_HREF[d.href];
      const copy = uploadedCopyOf(SHAREPOINT_DOCS[key]);
      link = '<a href="#' + (copy ? VIEW_PREFIX + copy.id : DOC_PREFIX + key) + '"><span>' + d.title + '</span></a>';
    }
    else if (d.hrefExternal) link = '<a href="' + d.href + '" target="_blank" rel="noopener"><span>' + d.title + '</span></a>';
    else if (d.hrefDownload) link = '<a href="' + d.href + '" download><span>' + d.title + '</span></a>';
    else link = '<span class="plain">' + d.title + '</span>';
    const tag = d.tag ? '<span class="tag ' + d.tagClass + '">' + d.tag + '</span>' : '';
    return '<div class="doclist-row">' + link + tag + '</div>';
  }
  function docListHTML(crumbItems, title, lead, rows) {
    return crumb(crumbItems) + '<h1>' + title + '</h1>' +
      '<p class="section-lead">' + lead + '</p>' +
      '<div class="doclist">' + rows.map(docRowHTML).join('') + '</div>';
  }
  function docListSectionHTML(heading, rows) {
    return '<h2>' + heading + '</h2><div class="doclist">' + rows.map(docRowHTML).join('') + '</div>';
  }

  // 1:1 pair pages keep the intake form: uploads are visible to every member,
  // and those notes must stay private to the two people involved.
  const CONTRIBUTE_FORM_URL = 'https://forms.cloud.microsoft/r/8cPduYGSqV';
  function uploadButtonHTML(route, label) {
    return '<button type="button" class="btn btn-primary" data-upload="' + (route || '') + '">' + icon(ICON_UPLOAD, 16) + (label || 'Add a file or link') + '</button>';
  }
  function emptyStateHTML(crumbItems, title, uploadRoute) {
    const body = uploadRoute
      ? 'Nothing has been added here yet. Upload a document or add a link (Loom, YouTube, Notion, Google Docs&hellip;) and it&rsquo;ll show up here for the whole team.'
      : 'Nothing has been added here yet. If you have a document for this section, contribute it and it&rsquo;ll get added.';
    const action = uploadRoute
      ? uploadButtonHTML(uploadRoute)
      : '<a href="' + CONTRIBUTE_FORM_URL + '" target="_blank" rel="noopener" class="btn btn-primary">Contribute</a>';
    return crumb(crumbItems) + '<h1>' + title + '</h1>' +
      '<div class="empty-state">' +
        '<span class="empty-state-icon">' + icon(ICON_FOLDER_OPEN, 30) + '</span>' +
        '<p class="empty-state-title">No available data</p>' +
        '<p class="empty-state-body">' + body + '</p>' +
        action +
      '</div>';
  }

  // ---------- section index route table ----------
  const SECTION_INDEXES = {
    kb: () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Knowledge Base' }],
      'Knowledge Base', 'SOPs, process documentation, policies, best practices, and FAQs.',
      [
        { label: 'SOPs', route: 'kb-sops' },
        { label: 'Process Documentation', route: 'kb-process-docs' },
        { label: 'Policies', route: 'kb-policies' },
        { label: 'Best Practices', route: 'kb-best-practices' },
        { label: 'FAQs', route: 'kb-faqs' },
      ].map(withIcon)
    ),
    projects: () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects' }],
      'Projects', 'Active and completed projects, plus reusable templates and documentation.',
      [
        { label: 'Active Projects', route: 'projects-active' },
        { label: 'Completed Projects', route: 'projects-completed' },
        { label: 'Templates', route: 'projects-templates' },
        { label: 'Documentation', route: 'projects-documentation' },
      ].map(withIcon)
    ),
    meetings: () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Meetings' }],
      'Meetings', 'Team meetings not tied to a single team, plus 1:1 minutes. Leadership and team-specific notes live under each Team Space.',
      [
        { label: 'Team Meetings', route: 'meetings-team' },
        { label: 'One-on-One Minutes', route: 'meetings-1on1' },
      ].map(withIcon)
    ),
    resources: () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Resources' }],
      'Resources', 'Templates, forms, brand assets, shared documents, and investor relations.',
      [
        withIcon({ label: 'Templates', route: 'resources-templates' }),
        withIcon({ label: 'Forms', route: 'resources-forms' }),
        withIcon({ label: 'Brand Assets', href: 'https://canopi407-my.sharepoint.com/:f:/g/personal/angela_canopi_work/IgC3JSp0HpBOSLVFFR4ujSnPAfpYlcfj-HFJf6T4Uf-6QeU?e=FIoTGv', external: true }),
        withIcon({ label: 'Shared Documents', route: 'resources-shared' }),
        withIcon({ label: 'Investor Relations', route: 'resources-investor' }),
      ]
    ),
    'team-spaces': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces' }],
      'Team Spaces', 'Each team has its own documentation, meeting notes, decisions, and shared resources.',
      [
        { label: 'Executive Team', route: 'team-executive' },
        { label: 'Product Team', route: 'team-product' },
        { label: 'Engineering Team', route: 'team-engineering' },
      ].map(withIcon)
    ),
    'projects-completed': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Completed Projects' }],
      'Completed Projects', "Records from finished project work, gathered by category. Anything still empty has a Contribute button to submit a document.",
      [
        { label: 'Project Archive', route: 'projects-completed-archive' },
        { label: 'Retrospectives / Post-Mortems', route: 'projects-completed-retro' },
        { label: 'Market Research', route: 'projects-completed-lessons' },
        { label: 'Case Studies', route: 'projects-completed-casestudies' },
      ].map(withIcon)
    ),
    'projects-documentation': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Documentation' }],
      'Documentation', "Working documentation created by Product and Engineering as projects happen &mdash; ADRs, design docs, stakeholder records, requirements. Anything still empty has a Contribute button to submit a document.",
      [
        { label: 'Architecture Decision Records (ADRs)', route: 'projects-documentation-adrs' },
        { label: 'Technical Design Docs', route: 'projects-documentation-techdesign' },
        { label: "Stakeholder's Records", route: 'projects-documentation-raci' },
        { label: 'Requirements Docs & Acceptance Criteria', route: 'projects-documentation-requirements' },
      ].map(withIcon)
    ),
    'meetings-team': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Meetings', route: 'meetings' }, { label: 'Team Meetings' }],
      'Team Meetings', "Engineering Standup and Product Team Sync notes moved to their respective Team Spaces. What's left here doesn't belong to a single team, and nothing's been added yet.",
      [
        { label: 'Cross-Team (Product × Engineering) Sync Notes', route: 'meetings-team-crossteam' },
        { label: 'Weekly Team Meeting Notes', route: 'meetings-team-weekly' },
      ].map(withIcon)
    ),
    'team-executive': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team' }],
      'Executive Team', 'Meeting notes and shared resources for the executive team. Visible to every signed-in member.',
      [
        withIcon({ label: 'Meeting Notes', route: 'team-executive-notes' }),
        withIcon({ label: 'Shared Resources', route: 'team-executive-shared' }),
      ]
    ),
    'team-product': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Product Team' }],
      'Product Team', 'Documentation, meeting notes, decisions, and shared resources for the product team.',
      [
        withIcon({ label: 'Meeting Notes', route: 'team-product-notes' }),
        withIcon({ label: 'Shared Resources', route: 'team-product-shared' }),
      ]
    ),
    'team-engineering': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Engineering Team' }],
      'Engineering Team', 'Documentation, meeting notes, decisions, and shared resources for the engineering team.',
      [
        withIcon({ label: 'Meeting Notes', route: 'team-engineering-notes' }),
        withIcon({ label: 'Shared Resources', route: 'team-engineering-shared' }),
      ]
    ),
    'team-executive-notes': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team', route: 'team-executive' }, { label: 'Meeting Notes' }],
      'Executive Team Meeting Notes', "Nothing's been added yet for any of these &mdash; open one and use Contribute to submit a document.",
      [
        { label: 'All-Hands Meeting Notes', route: 'team-executive-notes-allhands' },
        { label: 'Budget & Headcount Planning', route: 'team-executive-notes-budget' },
        { label: 'Quarterly Planning / OKR Review', route: 'team-executive-notes-okr' },
        { label: 'Weekly Exec Sync', route: 'team-executive-notes-execsync' },
      ].map(withIcon)
    ),
    'team-product-notes': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Product Team', route: 'team-product' }, { label: 'Meeting Notes' }],
      'Product Team Meeting Notes', "Nothing's been added yet &mdash; open it and use Contribute to submit a document.",
      [
        { label: 'Product Team Sync Notes', route: 'team-product-notes-sync' },
      ].map(withIcon)
    ),
    'team-engineering-notes': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Engineering Team', route: 'team-engineering' }, { label: 'Meeting Notes' }],
      'Engineering Team Meeting Notes', "Nothing's been added yet &mdash; open it and use Contribute to submit a document.",
      [
        { label: 'Engineering Standup / Sprint Planning & Retro Notes', route: 'team-engineering-notes-standup' },
      ].map(withIcon)
    ),
    'resources-shared': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Resources', route: 'resources' }, { label: 'Shared Documents' }],
      'Shared Documents', "Each team's Shared Resources folder, gathered here for quick access.",
      [
        { label: 'Executive Team Shared Resources', route: 'team-executive-shared' },
        { label: 'Product Team Shared Resources', route: 'team-product-shared' },
        { label: 'Engineering Team Shared Resources', route: 'team-engineering-shared' },
      ].map(withIcon)
    ),
    'meetings-1on1-recurring': () => sectionIndexHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Meetings', route: 'meetings' }, { label: 'One-on-One Minutes', route: 'meetings-1on1' }, { label: 'Recurring 1:1 Notes' }],
      'Recurring 1:1 Notes', 'Each pair below has its own private folder, visible only to the two people involved. Use Contribute on a pair&rsquo;s page to add its notes folder link.',
      RECURRING_1ON1_PAIRS.map(([label, slug]) => ({ label: escapeHtml(label), route: 'meetings-1on1-recurring-' + slug, icon: ICON_USERS }))
    ),
  };

  // ---------- doc list route table ----------
  const DOC_LISTS = {
    'kb-process-docs': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Knowledge Base', route: 'kb' }, { label: 'Process Documentation' }],
      'Process Documentation', 'How Product and Engineering work actually happens, end to end.',
      PROCESS_DOCS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass }))
    ),
    'kb-best-practices': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Knowledge Base', route: 'kb' }, { label: 'Best Practices' }],
      'Best Practices', 'Guidelines for how the team works day to day.',
      BEST_PRACTICES.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, route: s.route }))
    ),
    'projects-templates': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Templates' }],
      'Project Templates', 'Reusable starting points for new projects. Click a template to download it.',
      PROJECT_TEMPLATES.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefDownload: true }))
    ),
    'resources-templates': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Resources', route: 'resources' }, { label: 'Templates' }],
      'Templates', 'Reusable document templates. Click a template to download it.',
      RESOURCE_TEMPLATES.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefDownload: true }))
    ),
    'resources-forms': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Resources', route: 'resources' }, { label: 'Forms' }],
      'Forms', 'Fillable forms for common requests.',
      RESOURCE_FORMS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'resources-investor': () =>
      crumb([{ label: 'Home', route: 'home' }, { label: 'Resources', route: 'resources' }, { label: 'Investor Relations' }]) +
      '<h1>Investor Relations</h1>' +
      '<p class="section-lead">Documents for current and prospective investors.</p>' +
      docListSectionHTML('Documents', RESOURCE_INVESTOR_DOCS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))) +
      docListSectionHTML('Presentations', RESOURCE_INVESTOR_DECKS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))),
    'team-product-shared': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Product Team', route: 'team-product' }, { label: 'Shared Resources' }],
      'Product Team Shared Resources', 'Shared documents for the product team.',
      TEAM_PRODUCT_SHARED.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'projects-completed-lessons': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Completed Projects', route: 'projects-completed' }, { label: 'Market Research' }],
      'Market Research', 'Market research conducted for Canopi.',
      PROJECTS_COMPLETED_MARKET_RESEARCH.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'projects-documentation-adrs': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Documentation', route: 'projects-documentation' }, { label: 'Architecture Decision Records (ADRs)' }],
      'Architecture Decision Records (ADRs)', 'Architecture decision records for Canopi projects.',
      PROJECTS_DOCUMENTATION_ADRS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'projects-documentation-raci': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Documentation', route: 'projects-documentation' }, { label: "Stakeholder's Records" }],
      "Stakeholder's Records", 'Stakeholder records for Canopi projects.',
      PROJECTS_DOCUMENTATION_STAKEHOLDER.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'meetings-team-weekly': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Meetings', route: 'meetings' }, { label: 'Team Meetings', route: 'meetings-team' }, { label: 'Weekly Team Meeting Notes' }],
      'Weekly Team Meeting Notes', 'Minutes from the weekly team meeting.',
      MEETINGS_TEAM_WEEKLY.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefDownload: !!s.download, hrefExternal: !s.download }))
    ),
    'projects-completed-archive': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Completed Projects', route: 'projects-completed' }, { label: 'Project Archive' }],
      'Project Archive', 'Archived sales and pitch decks.',
      PROJECTS_COMPLETED_ARCHIVE.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'projects-documentation-techdesign': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Documentation', route: 'projects-documentation' }, { label: 'Technical Design Docs' }],
      'Technical Design Docs', 'Technical design and research docs for Canopi projects.',
      PROJECTS_DOCUMENTATION_TECHDESIGN.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'team-engineering-shared': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Engineering Team', route: 'team-engineering' }, { label: 'Shared Resources' }],
      'Engineering Team Shared Resources', 'Shared documents for the engineering team.',
      TEAM_ENGINEERING_SHARED.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, href: s.href, hrefExternal: !!s.href }))
    ),
    'meetings-1on1': () =>
      crumb([{ label: 'Home', route: 'home' }, { label: 'Meetings', route: 'meetings' }, { label: 'One-on-One Minutes' }]) +
      '<h1>One-on-One Minutes</h1>' +
      '<p class="section-lead">The minutes template is downloadable here. Recurring notes are organized by pair, private to the two people involved.</p>' +
      '<div class="doclist">' + docRowHTML({ title: '1:1 Minutes Template', tag: 'Published v1', tagClass: 'tag-accent', href: 'files/Standard_Minutes_Template.docx', hrefDownload: true }) + '</div>' +
      '<p class="eyebrow" style="margin-top:var(--space-6)">Recurring notes</p>' +
      '<div class="section-cards">' + sectionCardHTML({ label: 'Recurring 1:1 Notes', route: 'meetings-1on1-recurring', icon: ICON_USERS }) + '</div>',
    'kb-sops': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Knowledge Base', route: 'kb' }, { label: 'SOPs' }],
      'SOPs', 'Standard operating procedures. Each one carries a version number and a status badge.',
      SOPS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, route: s.route }))
    ),
    'kb-policies': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Knowledge Base', route: 'kb' }, { label: 'Policies' }],
      'Policies', 'Company-wide policies covering conduct, compensation, data, and remote work.',
      POLICIES.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, route: s.route }))
    ),
    'kb-faqs': () => docListHTML(
      [{ label: 'Home', route: 'home' }, { label: 'Knowledge Base', route: 'kb' }, { label: 'FAQs' }],
      'FAQs', 'Quick answers for new hires and common IT/equipment questions.',
      FAQS.map((s) => ({ title: s.title, tag: s.tag, tagClass: s.tagClass, route: s.route }))
    ),
  };

  // ---------- search index: every real item on the site, not just section labels ----------
  // Built from the same data arrays that render the pages, so anything added to
  // SOPS/POLICIES/etc. is automatically searchable — nothing to keep in sync by hand.
  const SEARCH_INDEX = [];

  function indexFrom(list, meta, mapDest) {
    list.forEach((item) => {
      const dest = mapDest(item);
      const title = item.title || item.label;
      if (!dest) {
        SEARCH_INDEX.push({ title, meta, comingSoon: true });
        return;
      }
      SEARCH_INDEX.push(Object.assign({ title, meta }, dest));
    });
  }

  indexFrom(SOPS, 'Knowledge Base \u203a SOPs', (s) => s.route ? { route: s.route } : null);
  indexFrom(POLICIES, 'Knowledge Base \u203a Policies', (s) => s.route ? { route: s.route } : null);
  indexFrom(FAQS, 'Knowledge Base \u203a FAQs', (s) => s.route ? { route: s.route } : null);
  indexFrom(PROCESS_DOCS, 'Knowledge Base \u203a Process Documentation', () => null);
  indexFrom(BEST_PRACTICES, 'Knowledge Base \u203a Best Practices', (s) => s.route ? { route: s.route } : null);
  indexFrom(PROJECT_TEMPLATES, 'Projects \u203a Templates', (s) => ({ href: s.href, download: true }));
  indexFrom(RESOURCE_TEMPLATES, 'Resources \u203a Templates', (s) => ({ href: s.href, download: true }));
  indexFrom(RESOURCE_FORMS, 'Resources \u203a Forms', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(RESOURCE_INVESTOR_DOCS, 'Resources \u203a Investor Relations \u203a Documents', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(RESOURCE_INVESTOR_DECKS, 'Resources \u203a Investor Relations \u203a Presentations', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(TEAM_PRODUCT_SHARED, 'Team Spaces \u203a Product Team \u203a Shared Resources', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(PROJECTS_DOCUMENTATION_ADRS, 'Projects \u203a Documentation \u203a ADRs', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(PROJECTS_DOCUMENTATION_STAKEHOLDER, 'Projects \u203a Documentation \u203a Stakeholder\u2019s Records', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(PROJECTS_COMPLETED_MARKET_RESEARCH, 'Projects \u203a Completed Projects \u203a Market Research', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(MEETINGS_TEAM_WEEKLY, 'Meetings \u203a Team Meetings \u203a Weekly Team Meeting Notes', (s) => s.href ? (s.download ? { href: s.href, download: true } : { href: s.href, external: true }) : null);
  indexFrom(PROJECTS_COMPLETED_ARCHIVE, 'Projects \u203a Completed Projects \u203a Project Archive', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(PROJECTS_DOCUMENTATION_TECHDESIGN, 'Projects \u203a Documentation \u203a Technical Design Docs', (s) => s.href ? { href: s.href, external: true } : null);
  indexFrom(TEAM_ENGINEERING_SHARED, 'Team Spaces \u203a Engineering Team \u203a Shared Resources', (s) => s.href ? { href: s.href, external: true } : null);

  const EXTRA_SEARCH_ITEMS = [
    // section landing pages
    { title: 'Knowledge Base', meta: 'Home', route: 'kb', keywords: 'sop policy faq best practice process documentation' },
    { title: 'Projects', meta: 'Home', route: 'projects', keywords: 'active completed templates documentation' },
    { title: 'Meetings', meta: 'Home', route: 'meetings', keywords: 'team one-on-one 1:1 minutes' },
    { title: 'Resources', meta: 'Home', route: 'resources', keywords: 'templates forms brand assets shared documents' },
    { title: 'Team Spaces', meta: 'Home', route: 'team-spaces', keywords: 'executive product engineering' },
    { title: 'Active Projects', meta: 'Projects', route: 'projects-active', keywords: 'project tracker live excel status owner target date' },
    { title: 'Example Project: Repository Site Rollout', meta: 'Projects \u203a Active Projects', route: 'project-detail', keywords: 'example project repository site rollout charter roadmap risk' },
    // projects > completed (no data yet — contribute pages)
    { title: 'Project Archive', meta: 'Projects \u203a Completed Projects', route: 'projects-completed-archive' },
    { title: 'Retrospectives / Post-Mortems', meta: 'Projects \u203a Completed Projects', route: 'projects-completed-retro' },
    { title: 'Market Research', meta: 'Projects \u203a Completed Projects', route: 'projects-completed-lessons' },
    { title: 'Case Studies', meta: 'Projects \u203a Completed Projects', route: 'projects-completed-casestudies' },
    // projects > documentation (no data yet — contribute pages)
    { title: 'Architecture Decision Records (ADRs)', meta: 'Projects \u203a Documentation', route: 'projects-documentation-adrs' },
    { title: 'Technical Design Docs', meta: 'Projects \u203a Documentation', route: 'projects-documentation-techdesign' },
    { title: "Stakeholder's Records", meta: 'Projects \u203a Documentation', route: 'projects-documentation-raci' },
    { title: 'Requirements Docs & Acceptance Criteria', meta: 'Projects \u203a Documentation', route: 'projects-documentation-requirements' },
    // meetings
    { title: 'Cross-Team (Product \u00d7 Engineering) Sync Notes', meta: 'Meetings \u203a Team Meetings', route: 'meetings-team-crossteam' },
    { title: 'Weekly Team Meeting Notes', meta: 'Meetings \u203a Team Meetings', route: 'meetings-team-weekly' },
    { title: '1:1 Minutes Template', meta: 'Meetings \u203a One-on-One Minutes', href: 'files/Standard_Minutes_Template.docx', download: true },
    { title: 'Recurring 1:1 Notes', meta: 'Meetings \u203a One-on-One Minutes', route: 'meetings-1on1-recurring' },
    // resources
    { title: 'Brand Assets', meta: 'Resources', href: 'https://canopi407-my.sharepoint.com/:f:/g/personal/angela_canopi_work/IgC3JSp0HpBOSLVFFR4ujSnPAfpYlcfj-HFJf6T4Uf-6QeU?e=FIoTGv', external: true, keywords: 'logo design brand' },
    { title: 'Executive Team Shared Resources', meta: 'Resources \u203a Shared Documents', route: 'team-executive-shared' },
    { title: 'Product Team Shared Resources', meta: 'Resources \u203a Shared Documents', route: 'team-product-shared' },
    { title: 'Engineering Team Shared Resources', meta: 'Resources \u203a Shared Documents', route: 'team-engineering-shared' },
    // team spaces
    { title: 'Executive Team', meta: 'Team Spaces', route: 'team-executive' },
    { title: 'Product Team', meta: 'Team Spaces', route: 'team-product' },
    { title: 'Engineering Team', meta: 'Team Spaces', route: 'team-engineering' },
    { title: 'Executive Team Meeting Notes', meta: 'Team Spaces \u203a Executive Team', route: 'team-executive-notes' },
    { title: 'Product Team Meeting Notes', meta: 'Team Spaces \u203a Product Team', route: 'team-product-notes' },
    { title: 'Engineering Team Meeting Notes', meta: 'Team Spaces \u203a Engineering Team', route: 'team-engineering-notes' },
    { title: 'All-Hands Meeting Notes', meta: 'Team Spaces \u203a Executive Team', route: 'team-executive-notes-allhands' },
    { title: 'Budget & Headcount Planning', meta: 'Team Spaces \u203a Executive Team', route: 'team-executive-notes-budget' },
    { title: 'Quarterly Planning / OKR Review', meta: 'Team Spaces \u203a Executive Team', route: 'team-executive-notes-okr' },
    { title: 'Weekly Exec Sync', meta: 'Team Spaces \u203a Executive Team', route: 'team-executive-notes-execsync' },
    { title: 'Product Team Sync Notes', meta: 'Team Spaces \u203a Product Team', route: 'team-product-notes-sync' },
    { title: 'Engineering Standup / Sprint Planning & Retro Notes', meta: 'Team Spaces \u203a Engineering Team', route: 'team-engineering-notes-standup' },
  ];
  SEARCH_INDEX.push(...EXTRA_SEARCH_ITEMS);
  RECURRING_1ON1_PAIRS.forEach(([label, slug]) => {
    SEARCH_INDEX.push({ title: escapeHtml(label), keywords: label.toLowerCase(), meta: 'Meetings › One-on-One Minutes › Recurring 1:1 Notes', route: 'meetings-1on1-recurring-' + slug });
  });

  // ---------- detail pages (static content) ----------
  const DETAIL_PAGES = {
    'kb-sop-detail': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-sops">SOPs</a> &raquo; Offboarding SOP</div>
      <h1>Offboarding SOP <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Process Owner:</strong> Angela Tino, Executive Operations Lead &middot; <strong>Accountable Executive:</strong> Bionka Randolph, CEO/Founder</p>
      <p class="detail-meta"><strong>Last Updated:</strong> July 22, 2026 &middot; <strong>Review Cadence:</strong> Quarterly</p>
      <h2>Purpose</h2>
      <p>This SOP documents how Canopi handles an employee's departure &mdash; whether by resignation or involuntary termination &mdash; covering notice, exit interview, equipment and access revocation, and closing out company records, so every departure is handled consistently and securely.</p>
      <h2>Scope</h2>
      <p>Begins once Bionka Randolph confirms an employee's departure and their last day. Ends once all equipment and access is recovered, records are updated, and the exit interview is complete. Does not cover hiring or onboarding &mdash; see the Hiring &amp; Recruitment SOP and New Hire Onboarding SOP for those.</p>
      <h2>Team Reference</h2>
      <ul>
        <li>Executive Team: Bionka Randolph (CEO/Founder), Angela Tino (Executive Operations Lead)</li>
        <li>Engineering Team: Jagun Rimes (Head of Engineering), Alvin Chana (Software Engineer), John Dorlus (Senior Engineer)</li>
        <li>Product Team: Dixon Lin (Head of Product), Puja Khirodkar (Senior Product Manager), Sebastian Mesa (UI/UX Designer)</li>
      </ul>
      <h2>Process Flow (Summary)</h2>
      <ol>
        <li>Employee gives notice, or Bionka Randolph makes an involuntary termination decision</li>
        <li>Bionka confirms the last day and informs Angela, triggering offboarding</li>
        <li>Angela schedules an exit interview with the departing employee</li>
        <li>Bionka conducts the exit interview and documents notes</li>
        <li>Bionka collects equipment and revokes general access (Slack, email, tools)</li>
        <li>If Engineering: Jagun Rimes revokes repo / dev environment access</li>
        <li>If Product: Dixon Lin revokes Figma / design tool access</li>
        <li>Angela updates the directory, org chart, and meeting invites</li>
        <li>Bionka documents the employee's final vested equity status</li>
      </ol>
      <h2>RACI Matrix</h2>
      <table class="table"><thead><tr><th>Step</th><th>Responsible</th><th>Accountable</th><th>Informed</th></tr></thead>
      <tbody>
        <tr><td>Notice of departure</td><td>Employee / Bionka Randolph</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
        <tr><td>Schedule exit interview</td><td>Angela Tino</td><td>Bionka Randolph</td><td>Bionka Randolph</td></tr>
        <tr><td>Collect equipment &amp; revoke general access</td><td>Bionka Randolph</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
        <tr><td>Revoke engineering-specific access</td><td>Jagun Rimes</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
        <tr><td>Update directory &amp; org chart</td><td>Angela Tino</td><td>Angela Tino</td><td>&mdash;</td></tr>
        <tr><td>Document final equity status</td><td>Bionka Randolph</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
      </tbody></table>
      <h2>Exceptions and Edge Cases</h2>
      <table class="table"><thead><tr><th>Scenario</th><th>What to Do</th></tr></thead>
      <tbody>
        <tr><td>Involuntary termination</td><td>Access revocation and equipment collection happen immediately, rather than waiting out a notice period.</td></tr>
        <tr><td>Resignation with &lt;1 week's notice</td><td>Bionka assesses case-by-case whether remaining time is workable.</td></tr>
        <tr><td>Departing employee holds vested equity</td><td>Bionka documents vested equity as of last day; no final paycheck, as compensation is equity-only.</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul>
        <li>Hiring &amp; Recruitment SOP</li>
        <li>New Hire Onboarding &amp; Equipment Setup SOP</li>
        <li>Employee Handbook (notice period policy, if formalized)</li>
      </ul>
    `,
    'kb-sop-hiring': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-sops">SOPs</a> &raquo; Hiring &amp; Recruitment SOP</div>
      <h1>Hiring &amp; Recruitment SOP <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Process Owner:</strong> Angela Tino &middot; <strong>Accountable Executive:</strong> Bionka Randolph, CEO/Founder</p>
      <p class="detail-meta"><strong>Last Updated:</strong> July 22, 2026 &middot; <strong>Review Cadence:</strong> Quarterly, or upon company growth</p>
      <h2>Purpose</h2>
      <p>This SOP documents how Canopi identifies, screens, interviews, and hires new team members across Engineering, Product, and Executive. It exists to ensure a consistent, repeatable hiring process as the company grows.</p>
      <h2>Scope</h2>
      <p>Covers the full hiring lifecycle from job posting through offer and confirmed start date. Onboarding and equipment setup once a candidate accepts is covered separately in the <a href="#kb-sop-onboarding">New Hire Onboarding SOP</a>.</p>
      <h2>Process Flow (Summary)</h2>
      <ol>
        <li>Requesting Team Head identifies a hiring need and requests approval to hire</li>
        <li>Bionka or Angela posts the opening on LinkedIn</li>
        <li>Bionka or Angela screens incoming candidates; Angela shares a shortlist with Bionka</li>
        <li>Angela contacts qualified candidates and schedules a 1st round interview with Bionka</li>
        <li>Bionka conducts the 1st round; if approved, candidate moves to a 2nd round with the relevant Team Head or panel</li>
        <li>Team feedback is collected and shared with Bionka, who makes the final hiring decision</li>
        <li>Candidate is informed, documents are collected, and a start date is confirmed to Angela &mdash; triggering onboarding</li>
      </ol>
      <h2>RACI Matrix</h2>
      <table class="table"><thead><tr><th>Step</th><th>Responsible</th><th>Accountable</th><th>Informed</th></tr></thead>
      <tbody>
        <tr><td>Post job opening</td><td>Bionka / Angela</td><td>Bionka Randolph</td><td>Requesting Team Head</td></tr>
        <tr><td>1st round interview</td><td>Bionka Randolph</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
        <tr><td>2nd round interview / panel</td><td>Team Head or Panel</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
        <tr><td>Hiring decision</td><td>Bionka Randolph</td><td>Bionka Randolph</td><td>Interviewing Team Head(s)</td></tr>
        <tr><td>Offer &amp; document collection</td><td>Bionka / Angela</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
      </tbody></table>
      <h2>Exceptions and Edge Cases</h2>
      <table class="table"><thead><tr><th>Scenario</th><th>What to Do</th></tr></thead>
      <tbody>
        <tr><td>Panel vs. single interviewer for 2nd round</td><td>Judgment call by Bionka and/or the relevant Team Head; not yet formalized.</td></tr>
        <tr><td>Role outside Engineering or Product</td><td>Bionka handles both rounds directly, with Angela supporting screening and scheduling.</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul><li><a href="#kb-sop-onboarding">New Hire Onboarding &amp; Equipment Setup SOP</a></li></ul>
    `,
    'kb-sop-onboarding': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-sops">SOPs</a> &raquo; New Hire Onboarding SOP</div>
      <h1>New Hire Onboarding &amp; Equipment Setup SOP <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Process Owner:</strong> Angela Tino &middot; <strong>Accountable Executive:</strong> Bionka Randolph, CEO/Founder</p>
      <p class="detail-meta"><strong>Last Updated:</strong> July 22, 2026 &middot; <strong>Review Cadence:</strong> Quarterly, or as tooling changes</p>
      <h2>Purpose</h2>
      <p>Documents the steps taken once a candidate accepts an offer, from document collection through system access and first-week setup, so every new hire has a consistent, complete start experience.</p>
      <h2>Scope</h2>
      <p>Begins once Bionka confirms a candidate has accepted and a start date is set. Ends once the new hire has email, Slack, directory records, and recurring meeting access in place. Interview process itself is covered by the <a href="#kb-sop-hiring">Hiring &amp; Recruitment SOP</a>.</p>
      <div class="callout">Open gap: Engineering and Product team-specific equipment/software setup (dev environment access, design tool licenses) is not yet fully documented &mdash; confirm with Jagun Rimes and Dixon Lin.</div>
      <h2>Process Flow (Summary)</h2>
      <ol>
        <li>Bionka or Angela confirms candidate acceptance and requests required documents</li>
        <li>Bionka informs Angela of the confirmed start date</li>
        <li>Angela sets up the new hire's email signature and sends company directory forms</li>
        <li>Bionka sets up and sends Slack access</li>
        <li>Angela sends invitations to recurring weekly team meetings</li>
        <li>[Gap] Relevant Team Head sets up team-specific equipment/tool access</li>
      </ol>
      <h2>RACI Matrix</h2>
      <table class="table"><thead><tr><th>Step</th><th>Responsible</th><th>Accountable</th><th>Informed</th></tr></thead>
      <tbody>
        <tr><td>Set up email signature &amp; directory forms</td><td>Angela Tino</td><td>Angela Tino</td><td>New Hire</td></tr>
        <tr><td>Set up Slack access</td><td>Bionka Randolph</td><td>Bionka Randolph</td><td>New Hire, Angela Tino</td></tr>
        <tr><td>Team-specific equipment/tool setup</td><td>Relevant Team Head</td><td>Relevant Team Head</td><td>Angela Tino</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul><li><a href="#kb-sop-hiring">Hiring &amp; Recruitment SOP</a></li></ul>
    `,
    'kb-sop-itaccess': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-sops">SOPs</a> &raquo; IT/System Access Request SOP</div>
      <h1>IT / System Access Request SOP <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Process Owner:</strong> Angela Tino &middot; <strong>Accountable Executive:</strong> Bionka Randolph, CEO/Founder</p>
      <p class="detail-meta"><strong>Last Updated:</strong> July 22, 2026 &middot; <strong>Review Cadence:</strong> Quarterly, or as new tools are adopted</p>
      <h2>Purpose</h2>
      <p>Documents how employees request access to internal tools/systems outside of standard new-hire provisioning, who approves and grants that access, and how access is tracked.</p>
      <h2>Tool Category Reference</h2>
      <table class="table"><thead><tr><th>Category</th><th>Examples</th><th>Approver</th></tr></thead>
      <tbody>
        <tr><td>Company-wide / Admin / Financial</td><td>Slack, email &amp; calendar, LinkedIn Recruiter, billing</td><td>Bionka Randolph</td></tr>
        <tr><td>Engineering</td><td>Code repo, cloud/infra, CI/CD, dev environments</td><td>Jagun Rimes</td></tr>
        <tr><td>Product / Design</td><td>Figma, analytics tools, design licenses</td><td>Dixon Lin</td></tr>
      </tbody></table>
      <h2>Process Flow (Summary)</h2>
      <ol>
        <li>Employee posts a request in #access-requests naming the tool and reason</li>
        <li>Request is routed to the appropriate approver by tool category</li>
        <li>Approver reviews and approves in the Slack thread, then grants access directly in the tool</li>
        <li>Angela Tino logs the granted access in the central Access Tracker</li>
        <li>Requester is notified in the thread that access is ready</li>
      </ol>
      <h2>Exceptions and Edge Cases</h2>
      <table class="table"><thead><tr><th>Scenario</th><th>What to Do</th></tr></thead>
      <tbody>
        <tr><td>Tool doesn't fit an existing category</td><td>Default to Bionka Randolph as approver until added to the reference table.</td></tr>
        <tr><td>Primary approver unavailable</td><td>Bionka Randolph can act as fallback approver for any category.</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-sop-onboarding">New Hire Onboarding &amp; Equipment Setup SOP</a></li>
        <li><a href="#kb-sop-detail">Offboarding SOP</a></li>
      </ul>
    `,
    'kb-sop-perfreview': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-sops">SOPs</a> &raquo; Performance Review &amp; Feedback Cycle SOP</div>
      <h1>Performance Review &amp; Feedback Cycle SOP <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Process Owner:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026 &middot; <strong>Review Cadence:</strong> Quarterly</p>
      <h2>Purpose</h2>
      <p>Canopi's first formal performance review process: a quarterly, 360-style feedback cycle combining self-assessment, peer feedback, and manager review. The goal is growth and feedback, not a formal rating or a tie to compensation/promotion.</p>
      <h2>Process Flow (Summary)</h2>
      <ol>
        <li>Angela Tino kicks off the quarterly cycle and notifies all employees</li>
        <li>Each employee completes a self-assessment; peers submit feedback</li>
        <li>The employee's manager compiles self-assessment, peer feedback, and their own observations</li>
        <li>Manager delivers the review in a 1:1 conversation</li>
        <li>Manager or Angela documents summary notes for the record</li>
      </ol>
      <h2>Exceptions and Edge Cases</h2>
      <table class="table"><thead><tr><th>Scenario</th><th>What to Do</th></tr></thead>
      <tbody>
        <tr><td>Employee in role &lt;6 weeks at cycle start</td><td>Skip formal review; do a lightweight check-in instead, join full cycle next quarter.</td></tr>
        <tr><td>Reviewing a Team Head</td><td>Bionka Randolph acts as manager; peer feedback from the other Team Head and Angela Tino.</td></tr>
        <tr><td>Reviewing Bionka Randolph (CEO/Founder)</td><td>Self-reflection plus informal peer input from Jagun, Dixon, and Angela &mdash; not a formal manager-led review.</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul><li>Meetings &gt; One-on-One Agendas</li></ul>
    `,
    'kb-sop-pto': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-sops">SOPs</a> &raquo; PTO / Leave Request SOP</div>
      <h1>PTO / Leave Request SOP <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Process Owner:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <p class="detail-meta"><strong>Review Cadence:</strong> Revisit if/when Canopi moves to cash compensation</p>
      <h2>Purpose</h2>
      <p>Documents how employees communicate planned time away from work. Because compensation is currently equity-only with no cash salary, there is no PTO balance to accrue, request, or approve &mdash; this process exists purely so the team can anticipate someone's absence, not to seek permission.</p>
      <h2>Process Flow (Summary)</h2>
      <ol>
        <li>Employee decides to take time off &mdash; no approval required</li>
        <li>Employee informs Bionka Randolph of planned leave dates, with as much advance notice as possible</li>
        <li>Angela Tino logs the leave on the shared team calendar</li>
        <li>If needed, employee coordinates coverage with their Team Head</li>
      </ol>
      <h2>Exceptions and Edge Cases</h2>
      <table class="table"><thead><tr><th>Scenario</th><th>What to Do</th></tr></thead>
      <tbody>
        <tr><td>Extended leave (2+ weeks)</td><td>Give Bionka as much advance notice as possible and loop in the Team Head for coverage planning.</td></tr>
        <tr><td>Emergency / no advance notice possible</td><td>Inform Bionka as soon as able &mdash; this is a notification, not a request.</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul><li><a href="#kb-sop-detail">Offboarding SOP</a></li></ul>
    `,
    'kb-policy-detail': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-policies">Policies</a> &raquo; Code of Conduct</div>
      <h1>Code of Conduct <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino, Executive Operations Lead &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <p class="detail-meta"><strong>Applies To:</strong> All Canopi team members, regardless of role, team, or classification</p>
      <h2>1. Purpose</h2>
      <p>This Code of Conduct sets out how everyone at Canopi is expected to treat each other, our candidates, and anyone else we work with &mdash; not a list of rules for their own sake, but a way to keep Canopi a place where people can do good work without friction getting in the way.</p>
      <h2>2. Core Values</h2>
      <ul>
        <li>Respect &mdash; disagreement is normal and healthy; disrespect isn't.</li>
        <li>Ownership &mdash; do what you say you'll do, and own the outcome.</li>
        <li>Transparency &mdash; default to sharing context and reasoning, not gatekeeping it.</li>
        <li>Growth mindset &mdash; treat feedback and mistakes as information, not verdicts.</li>
        <li>Integrity &mdash; do the right thing even when no one's watching.</li>
      </ul>
      <h2>3. Unacceptable Behaviors</h2>
      <p>Harassment or discrimination of any kind; retaliation against anyone raising a concern in good faith; bullying or undermining a colleague's work; misuse or unauthorized disclosure of confidential information; dishonesty in company matters.</p>
      <h2>4. Remote Work Conduct</h2>
      <p>As a remote-first team, most interactions happen over Slack and video calls &mdash; the same standard of respect and professionalism applies there as anywhere else. Give colleagues the benefit of the doubt in text, and move to a call if something feels tense or unclear.</p>
      <h2>5. Reporting a Concern</h2>
      <p>Anyone who experiences or witnesses a violation is encouraged to report it. In most cases, raise it with Bionka Randolph or Angela Tino; if the concern involves one of them directly, raise it with the other, or with a Team Head not involved in the situation.</p>
      <h2>6. Enforcement</h2>
      <p>Responses will be proportionate to what happened, ranging from a direct conversation and coaching up to termination, depending on severity. Bionka Randolph is accountable for how violations are ultimately handled.</p>
      <h2>Related Documents</h2>
      <ul>
        <li>Employee Handbook (Equal Opportunity, Confidentiality &amp; IP, Acceptable Use)</li>
        <li><a href="#kb-sop-detail">Offboarding SOP</a></li>
      </ul>
    `,
    'kb-faq-detail': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-faqs">FAQs</a> &raquo; New Hire FAQ</div>
      <h1>New Hire FAQ <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino, Executive Operations Lead &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <p class="section-lead">Welcome to Canopi! This FAQ pulls together the questions you're most likely to have in your first few weeks.</p>
      <h2>Getting Started</h2>
      <p><strong>Q: What should I expect in my first week?</strong><br>A: Before your start date, Bionka sends required documents and sets up Slack access; Angela sets up your email signature, directory forms, and adds you to your team's recurring meetings.</p>
      <p><strong>Q: I need access to a tool that wasn't part of my initial setup?</strong><br>A: Post in #access-requests with the tool name and reason &mdash; see the IT/System Access Request SOP.</p>
      <h2>Compensation &amp; Equity</h2>
      <p><strong>Q: How am I compensated?</strong><br>A: Canopi's current compensation model is equity-only &mdash; there's no cash salary at this stage. Your specific terms are in your individual agreement.</p>
      <h2>Time Off</h2>
      <p><strong>Q: How do I request time off?</strong><br>A: No approval needed &mdash; since compensation is equity-only, there's no PTO balance to draw down. Give Bionka as much advance notice as you can.</p>
      <h2>Communication &amp; Working Hours</h2>
      <p><strong>Q: Do I need to be online at specific hours?</strong><br>A: No company-wide fixed schedule &mdash; agree reasonable working-hours overlap directly with your Team Head.</p>
      <h2>Who Do I Contact</h2>
      <table class="table"><thead><tr><th>For This...</th><th>Contact</th></tr></thead>
      <tbody>
        <tr><td>General questions, directory forms, meeting invites</td><td>Angela Tino</td></tr>
        <tr><td>Equipment, Slack/email access</td><td>Bionka Randolph</td></tr>
        <tr><td>Requesting access to a new tool</td><td>#access-requests</td></tr>
        <tr><td>Engineering-specific tools/access</td><td>Jagun Rimes</td></tr>
        <tr><td>Product/design-specific tools/access</td><td>Dixon Lin</td></tr>
      </tbody></table>
    `,
    'kb-policy-handbook': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-policies">Policies</a> &raquo; Employee Handbook</div>
      <h1>Employee Handbook <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <p class="detail-meta"><strong>Status:</strong> Starter draft, not yet in effect &mdash; not yet reviewed by an employment attorney</p>
      <h2>Welcome to Canopi</h2>
      <p>Canopi is a small, fast-moving SaaS company, and how we work together matters as much as what we build. This handbook gives everyone a shared understanding of expectations, policies, and resources &mdash; a living document that grows with the company.</p>
      <h2>Employment Classification &mdash; Open Item</h2>
      <p>A genuinely open question, not a policy decision: team members aren't yet formally classified (W-2, 1099, or co-founder/advisor under equity agreements), and compensation is currently equity-only. This affects Compensation &amp; Equity and the at-will language below.</p>
      <h2>Equal Opportunity</h2>
      <p>Canopi does not discriminate on the basis of race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability, veteran status, or any other protected status. Report concerns to Bionka Randolph or Angela Tino.</p>
      <h2>Work Arrangements</h2>
      <p>Canopi is remote-first with no fixed office-hours requirement; team members maintain reasonable working-hours overlap with their Team Head.</p>
      <h2>Compensation &amp; Equity</h2>
      <p>Current compensation is equity-only, with terms documented in each team member's individual agreement rather than in this handbook.</p>
      <h2>Time Off &amp; Leave</h2>
      <p>No formal PTO balance or accrual &mdash; team members take time as needed and give Bionka Randolph advance notice. See the <a href="#kb-sop-pto">PTO / Leave Request SOP</a>.</p>
      <h2>Confidentiality &amp; Intellectual Property</h2>
      <p>Team members protect confidential company, customer, and product information during and after their time at Canopi; work product belongs to Canopi per individual agreements.</p>
      <h2>Nature of Employment</h2>
      <p>Intended to be at-will for classified employees; contractors, co-founders, or advisors follow their individual agreement terms. To be finalized once the classification question is resolved.</p>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-policy-detail">Code of Conduct</a></li>
        <li><a href="#kb-sop-pto">PTO / Leave Request SOP</a></li>
      </ul>
    `,
    'kb-policy-eeo': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-policies">Policies</a> &raquo; Equal Opportunity / Anti-Harassment Policy</div>
      <h1>Equal Opportunity / Anti-Harassment Policy <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026 &middot; requires legal review before adoption</p>
      <h2>Purpose</h2>
      <p>States Canopi's commitment to equal opportunity and a workplace free from harassment and discrimination, and how concerns are raised, handled, and resolved.</p>
      <h2>Equal Opportunity Statement</h2>
      <p>Canopi provides equal opportunity across recruitment, hiring, promotion, compensation, evaluation, and termination, without discrimination on any protected status.</p>
      <h2>Reporting a Concern</h2>
      <p>Report to Bionka Randolph or Angela Tino; if the concern involves one of them directly, report to the other or to an uninvolved Team Head. No formal HR function or anonymous channel exists yet.</p>
      <h2>Non-Retaliation</h2>
      <p>Canopi will not tolerate retaliation against anyone who reports a concern in good faith or participates in an investigation.</p>
      <h2>Consequences</h2>
      <p>Violations result in a response proportionate to what happened, from a direct conversation up to termination. Bionka Randolph is accountable for how violations are resolved.</p>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-policy-handbook">Employee Handbook</a></li>
        <li><a href="#kb-policy-detail">Code of Conduct</a></li>
        <li><a href="#kb-sop-detail">Offboarding SOP</a></li>
      </ul>
    `,
    'kb-policy-remotework': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-policies">Policies</a> &raquo; Remote Work / WFH Policy</div>
      <h1>Remote Work / Work-From-Home Policy <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <h2>Purpose</h2>
      <p>Canopi is remote-first and distributed &mdash; this policy sets out what that means in practice: workspaces, hours, communication, and security expectations.</p>
      <h2>Work Location Expectations</h2>
      <p>Work from a reasonably quiet, private space with reliable internet. Working from outside the country you were hired in should be raised with Bionka Randolph first, given tax/legal implications.</p>
      <h2>Working Hours &amp; Availability</h2>
      <p>No company-wide fixed hours; maintain reasonable overlap with your Team Head and stay responsive during your own agreed hours.</p>
      <h2>Data Security</h2>
      <p>Keep devices locked when unattended, use secured Wi-Fi, and report a lost/stolen/compromised device or account to Bionka Randolph immediately.</p>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-policy-handbook">Employee Handbook</a></li>
        <li><a href="#kb-sop-onboarding">New Hire Onboarding &amp; Equipment Setup SOP</a></li>
        <li><a href="#kb-sop-itaccess">IT/System Access Request SOP</a></li>
        <li><a href="#kb-sop-pto">PTO / Leave Request SOP</a></li>
      </ul>
    `,
    'kb-policy-nda': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-policies">Policies</a> &raquo; Confidentiality &amp; NDA Policy</div>
      <h1>Confidentiality &amp; NDA Policy <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026 &middot; not a substitute for signed agreement language</p>
      <h2>Purpose</h2>
      <p>Sets out what counts as confidential at Canopi, what's expected of team members handling it, and how NDAs are used with external parties.</p>
      <h2>What Counts as Confidential</h2>
      <p>Source code and technical architecture; customer data; financial/fundraising/cap-table information; business strategy and roadmap; hiring and performance information.</p>
      <h2>Team Member Obligations</h2>
      <p>Protect confidential information during and after your time at Canopi; don't disclose it outside the company or use it for anything other than Canopi's business without Bionka's approval.</p>
      <h2>NDAs with External Parties</h2>
      <p>Bionka Randolph approves NDAs for candidates, vendors, and partners; Angela Tino coordinates the paperwork.</p>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-policy-handbook">Employee Handbook</a></li>
        <li><a href="#kb-policy-detail">Code of Conduct</a></li>
        <li><a href="#kb-sop-detail">Offboarding SOP</a></li>
      </ul>
    `,
    'kb-policy-acceptableuse': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-policies">Policies</a> &raquo; Acceptable Use Policy</div>
      <h1>Acceptable Use Policy <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <h2>Purpose</h2>
      <p>Sets out what's acceptable when using Canopi's devices, software, and accounts &mdash; including personal devices used to access company systems.</p>
      <h2>Company Devices &amp; Accounts</h2>
      <p>Devices are for Canopi work; don't install unauthorized software, share credentials, or use personal accounts for company work. Request new tool access through the IT/System Access Request SOP.</p>
      <h2>Prohibited Uses</h2>
      <p>Illegal activity, harassment or discrimination via company systems, accessing data beyond your role, pirated software, and personal commercial use of company resources.</p>
      <h2>Equipment Loss, Theft, or Compromise</h2>
      <p>Report a lost, stolen, or compromised device or account to Bionka Randolph immediately.</p>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-policy-remotework">Remote Work / Work-From-Home Policy</a></li>
        <li><a href="#kb-sop-itaccess">IT/System Access Request SOP</a></li>
        <li><a href="#kb-sop-onboarding">New Hire Onboarding &amp; Equipment Setup SOP</a></li>
        <li><a href="#kb-sop-detail">Offboarding SOP</a></li>
        <li><a href="#kb-policy-detail">Code of Conduct</a></li>
      </ul>
    `,
    'kb-faq-itequipment': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-faqs">FAQs</a> &raquo; IT &amp; Equipment FAQ</div>
      <h1>IT &amp; Equipment FAQ <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="section-lead">Quick answers to the IT and equipment questions that come up most.</p>
      <h2>Getting Equipment</h2>
      <p><strong>Q: What equipment do I get when I start?</strong><br>A: Standard equipment is provisioned via the <a href="#kb-sop-onboarding">New Hire Onboarding SOP</a>. Broken or replacement equipment goes to Bionka Randolph.</p>
      <h2>Getting Access to Tools</h2>
      <p><strong>Q: I need access to a tool I don't have?</strong><br>A: Post in #access-requests. Company-wide/admin/financial tools go through Bionka; engineering through Jagun Rimes; product/design through Dixon Lin. See the <a href="#kb-sop-itaccess">IT/System Access Request SOP</a>.</p>
      <h2>Security</h2>
      <p><strong>Q: Password manager / 2FA?</strong><br>A: Strongly recommended, though not mandatory yet. Use 2FA wherever available, especially for customer data, code, or financial systems.</p>
      <h2>Offboarding</h2>
      <p><strong>Q: What happens to my equipment and access when I leave?</strong><br>A: Equipment is returned and general access revoked by Bionka; Engineering/Product access is additionally revoked by Jagun or Dixon. See the <a href="#kb-sop-detail">Offboarding SOP</a>.</p>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-sop-itaccess">IT/System Access Request SOP</a></li>
        <li><a href="#kb-sop-onboarding">New Hire Onboarding &amp; Equipment Setup SOP</a></li>
        <li><a href="#kb-sop-detail">Offboarding SOP</a></li>
        <li><a href="#kb-policy-acceptableuse">Acceptable Use Policy</a></li>
        <li><a href="#kb-policy-remotework">Remote Work / Work-From-Home Policy</a></li>
      </ul>
    `,
    'kb-bp-docwriting': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-best-practices">Best Practices</a> &raquo; Internal Documentation Writing Guidelines</div>
      <h1>Internal Documentation Writing Guidelines <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <h2>Purpose</h2>
      <p>As the repository grows and more people contribute, pages written by different people should still feel like they belong to the same system.</p>
      <h2>General Principles</h2>
      <ul>
        <li>Write for someone with no context &mdash; a new hire should follow a page without asking someone to explain it.</li>
        <li>Be concrete: name the actual person or role rather than "the manager."</li>
        <li>Say what's unresolved instead of glossing over it.</li>
        <li>Keep pages evergreen so updating one fact doesn't require rewriting the page.</li>
      </ul>
      <h2>Document Types &amp; Standard Sections</h2>
      <p>Two structures cover almost everything: SOPs (step-by-step processes) and policies (standing rules). Defaults include Purpose, Scope, Team Reference, RACI Matrix, Process Flow, Detailed Steps, Exceptions and Edge Cases, Open Items to Finalize, and Related Documents.</p>
      <h2>Tone &amp; Voice</h2>
      <p>Plain language over formal-sounding language; short, direct sentences; it's fine for a page to have personality.</p>
      <h2>Related Documents</h2>
      <ul><li>SOP / Process Doc Template (Resources &gt; Templates)</li></ul>
    `,
    'kb-bp-meetingetiquette': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-best-practices">Best Practices</a> &raquo; Meeting Etiquette</div>
      <h1>Meeting Etiquette <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <h2>Before the Meeting: Agendas</h2>
      <p>Every recurring meeting should have an agenda shared in advance. An item should be a specific topic or decision, not "catch up." If it could be a Slack message instead, skip the meeting.</p>
      <h2>During the Meeting</h2>
      <p>Start and end on time; stick to the agenda; one conversation at a time; designate a note-taker at the start.</p>
      <h2>Meeting Types Quick Reference</h2>
      <table class="table"><thead><tr><th>Meeting Type</th><th>Agenda Owner</th><th>Note-Taker</th></tr></thead>
      <tbody>
        <tr><td>Leadership</td><td>Bionka Randolph</td><td>Angela Tino</td></tr>
        <tr><td>Team (standups, sync)</td><td>Relevant Team Head</td><td>Rotates</td></tr>
        <tr><td>One-on-Ones</td><td>Manager</td><td>Optional</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul>
        <li>Standard Minutes Template (Resources &gt; Templates)</li>
        <li><a href="#kb-bp-slackemail">Slack / Email Communication Norms</a></li>
      </ul>
    `,
    'kb-bp-slackemail': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#kb">Knowledge Base</a> &raquo; <a href="#kb-best-practices">Best Practices</a> &raquo; Slack / Email Communication Norms</div>
      <h1>Slack / Email Communication Norms <span class="tag tag-accent title-tag">Published v1</span></h1>
      <p class="detail-meta"><strong>Prepared By:</strong> Angela Tino &middot; <strong>Last Updated:</strong> July 22, 2026</p>
      <h2>Choosing the Right Channel</h2>
      <p>Slack for day-to-day team communication; email for external comms and lasting records; a call for anything sensitive or going back-and-forth without resolving.</p>
      <h2>Slack Norms</h2>
      <p>Use channels over DMs when useful to others; use threads to reply; set your status when away; messages don't need an immediate reply outside working hours.</p>
      <h2>Suggested Channel Structure</h2>
      <table class="table"><thead><tr><th>Channel</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td>#general</td><td>Company-wide announcements</td></tr>
        <tr><td>#access-requests</td><td>Requesting tool/system access</td></tr>
        <tr><td>#engineering</td><td>Engineering team discussion</td></tr>
        <tr><td>#product</td><td>Product team discussion</td></tr>
      </tbody></table>
      <h2>Related Documents</h2>
      <ul>
        <li><a href="#kb-bp-meetingetiquette">Meeting Etiquette</a></li>
        <li><a href="#kb-policy-remotework">Remote Work / Work-From-Home Policy</a></li>
        <li><a href="#kb-sop-itaccess">IT/System Access Request SOP</a></li>
      </ul>
    `,
    'projects-active': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#projects">Projects</a> &raquo; Active Projects</div>
      <h1>Active Projects</h1>
      <p class="section-lead">Every in-flight project at a glance. This table is live &mdash; it embeds the shared Excel tracker directly, so anyone with edit access to that spreadsheet can update it and see the change reflected here automatically, without touching this page.</p>
      <div class="embed-wrap">
        <iframe title="Project Tracker" width="1050" height="600" frameborder="0" scrolling="no"
          src="https://canopi407-my.sharepoint.com/personal/angela_canopi_work/_layouts/15/Doc.aspx?sourcedoc={bc97f609-beff-425e-8611-8f5856bbd65f}&amp;action=embedview&amp;wdAllowInteractivity=False&amp;Item='Project%20Tracker'!A1%3AJ28&amp;wdHideGridlines=True&amp;wdDownloadButton=True&amp;wdInConfigurator=True"></iframe>
      </div>
      <p><a href="https://canopi407-my.sharepoint.com/personal/angela_canopi_work/_layouts/15/Doc.aspx?sourcedoc={bc97f609-beff-425e-8611-8f5856bbd65f}&amp;action=default" target="_blank" rel="noopener" class="btn btn-primary">Update Tracker</a></p>
      <p class="detail-meta">To update: open the Project Tracker file in Excel (OneDrive) via the button above and edit directly &mdash; changes appear here automatically for everyone viewing this page, no site edits needed.</p>
    `,
    'project-detail': `
      <div class="breadcrumb"><a href="#home">Home</a> &raquo; <a href="#projects">Projects</a> &raquo; <a href="#projects-active">Active Projects</a> &raquo; Example Project</div>
      <h1>Example Project: Repository Site Rollout <span class="tag tag-accent title-tag">On Track</span></h1>
      <p class="detail-meta"><strong>Owner:</strong> Angela Tino &middot; <strong>Target Date:</strong> TBD</p>
      <p class="section-lead">This is a template page showing the expected structure for an active project. Replace each section with real content when adding an actual project.</p>
      <h2>Project Charter</h2>
      <p>A short summary of what this project is, why it exists, and what success looks like.</p>
      <p style="font-style:italic">"Build and launch an internal team repository site covering SOPs, policies, projects, and meeting notes, replacing scattered docs across personal drives."</p>
      <h2>Roadmap Items In Progress</h2>
      <ul>
        <li>Knowledge Base section &mdash; complete</li>
        <li>Projects section &mdash; in progress</li>
        <li>Meetings and Resources sections &mdash; not started</li>
      </ul>
      <h2>Active Sprint / Board</h2>
      <p>Link to the live sprint board (Jira, Linear, Trello, etc.) &mdash; point this at wherever day-to-day task tracking actually happens.</p>
      <h2>Risk &amp; Blocker Log</h2>
      <table class="table"><thead><tr><th>Risk / Blocker</th><th>Owner</th><th>Status</th><th>Mitigation</th></tr></thead>
      <tbody>
        <tr><td>Waiting on admin access to Power Platform</td><td>Angela Tino</td><td><span class="tag tag-outline">At Risk</span></td><td>Escalated to CEO for access grant</td></tr>
      </tbody></table>
    `,
  };

  // ---------- empty "no data yet, contribute" pages ----------
  // These used to link straight out to (empty) SharePoint folders. Now they're
  // real internal pages with a Contribute CTA to the intake form, so the site
  // never sends someone to a folder that turns out to have nothing in it.
  const CONTRIBUTE_PAGES = [
    { route: 'projects-completed-retro', title: 'Retrospectives / Post-Mortems', crumb: [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Completed Projects', route: 'projects-completed' }, { label: 'Retrospectives / Post-Mortems' }] },
    { route: 'projects-completed-casestudies', title: 'Case Studies', crumb: [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Completed Projects', route: 'projects-completed' }, { label: 'Case Studies' }] },
    { route: 'projects-documentation-requirements', title: 'Requirements Docs & Acceptance Criteria', crumb: [{ label: 'Home', route: 'home' }, { label: 'Projects', route: 'projects' }, { label: 'Documentation', route: 'projects-documentation' }, { label: 'Requirements Docs & Acceptance Criteria' }] },
    { route: 'meetings-team-crossteam', title: 'Cross-Team (Product × Engineering) Sync Notes', crumb: [{ label: 'Home', route: 'home' }, { label: 'Meetings', route: 'meetings' }, { label: 'Team Meetings', route: 'meetings-team' }, { label: 'Cross-Team Sync Notes' }] },
    { route: 'team-executive-shared', title: 'Executive Team Shared Resources', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team', route: 'team-executive' }, { label: 'Shared Resources' }] },
    { route: 'team-executive-notes-allhands', title: 'All-Hands Meeting Notes', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team', route: 'team-executive' }, { label: 'Meeting Notes', route: 'team-executive-notes' }, { label: 'All-Hands Meeting Notes' }] },
    { route: 'team-executive-notes-budget', title: 'Budget & Headcount Planning', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team', route: 'team-executive' }, { label: 'Meeting Notes', route: 'team-executive-notes' }, { label: 'Budget & Headcount Planning' }] },
    { route: 'team-executive-notes-okr', title: 'Quarterly Planning / OKR Review', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team', route: 'team-executive' }, { label: 'Meeting Notes', route: 'team-executive-notes' }, { label: 'Quarterly Planning / OKR Review' }] },
    { route: 'team-executive-notes-execsync', title: 'Weekly Exec Sync', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Executive Team', route: 'team-executive' }, { label: 'Meeting Notes', route: 'team-executive-notes' }, { label: 'Weekly Exec Sync' }] },
    { route: 'team-product-notes-sync', title: 'Product Team Sync Notes', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Product Team', route: 'team-product' }, { label: 'Meeting Notes', route: 'team-product-notes' }, { label: 'Product Team Sync Notes' }] },
    { route: 'team-engineering-notes-standup', title: 'Engineering Standup / Sprint Planning & Retro Notes', crumb: [{ label: 'Home', route: 'home' }, { label: 'Team Spaces', route: 'team-spaces' }, { label: 'Engineering Team', route: 'team-engineering' }, { label: 'Meeting Notes', route: 'team-engineering-notes' }, { label: 'Engineering Standup / Sprint Planning & Retro Notes' }] },
  ];
  RECURRING_1ON1_PAIRS.forEach(([label, slug]) => {
    const safeLabel = escapeHtml(label);
    CONTRIBUTE_PAGES.push({
      route: 'meetings-1on1-recurring-' + slug,
      title: safeLabel,
      plainTitle: label,
      crumb: [{ label: 'Home', route: 'home' }, { label: 'Meetings', route: 'meetings' }, { label: 'One-on-One Minutes', route: 'meetings-1on1' }, { label: 'Recurring 1:1 Notes', route: 'meetings-1on1-recurring' }, { label: safeLabel }],
    });
  });
  const isPrivateRoute = (route) => route.indexOf('meetings-1on1') === 0;
  // Pages that start empty: list what members have uploaded, or show the empty state.
  const UPLOAD_ONLY_PAGES = {};
  CONTRIBUTE_PAGES.forEach((p) => {
    TITLES[p.route] = p.plainTitle || p.title;
    if (isPrivateRoute(p.route)) {
      DETAIL_PAGES[p.route] = emptyStateHTML(p.crumb, p.title);
      return;
    }
    UPLOAD_ONLY_PAGES[p.route] = () => uploadsFor(p.route).length
      ? crumb(p.crumb) + '<h1>' + p.title + '</h1>' + uploadsSectionHTML(p.route, true)
      : emptyStateHTML(p.crumb, p.title, p.route);
  });

  // ---------- member uploads and links (Supabase) ----------
  // Files live in the private "documents" storage bucket; links (Loom, YouTube,
  // Notion, ...) are just a URL. Each one has a row in the documents table saying
  // which page (route) it belongs to, and opens in the viewer at #view-<id>.
  // Any doc-list page and any empty page accepts them, except the private 1:1 pages.
  const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // matches the bucket limit in supabase/schema.sql
  const VIEW_PREFIX = 'view-';
  const UPLOAD_ROUTES = Object.keys(DOC_LISTS).concat(Object.keys(UPLOAD_ONLY_PAGES)).filter((r) => !isPrivateRoute(r));
  const SECTION_PREFIXES = { kb: 'Knowledge Base', projects: 'Projects', meetings: 'Meetings', resources: 'Resources', team: 'Team Spaces' };
  const SECTION_ROOTS = { 'Knowledge Base': 'kb', Projects: 'projects', Meetings: 'meetings', Resources: 'resources', 'Team Spaces': 'team-spaces' };
  let UPLOADS = [];
  let CURRENT_USER = null;
  let IS_ADMIN = false;

  function sectionGroup(route) { return SECTION_PREFIXES[route.split('-')[0]] || 'Other'; }
  function sectionPath(route) { return sectionGroup(route) + ' › ' + (TITLES[route] || route); }
  function uploadsFor(route) { return UPLOADS.filter((d) => d.section === route); }
  function findUpload(id) { return UPLOADS.find((u) => u.id === id); }
  function canDelete(d) { return IS_ADMIN || (CURRENT_USER && d.uploaded_by === CURRENT_USER.id); }

  async function loadUploads() {
    const { data, error } = await db.from('documents').select('*').order('created_at', { ascending: false });
    if (error) { console.error('Could not load uploads', error); return; }
    UPLOADS = data;
  }
  async function loadIsAdmin() {
    const { data } = await db.rpc('is_admin');
    IS_ADMIN = data === true;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function formatSize(bytes) {
    if (!bytes && bytes !== 0) return '';
    return bytes < 1024 * 1024 ? Math.max(1, Math.round(bytes / 1024)) + ' KB' : (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }
  // Display name from a work email: "angela@canopi.work" -> "Angela", "john.d@canopi.work" -> "John D."
  function personName(email) {
    if (!email) return '';
    return email.split('@')[0].split(/[._-]+/).filter(Boolean)
      .map((part) => part.length === 1 ? part.toUpperCase() + '.' : part[0].toUpperCase() + part.slice(1))
      .join(' ');
  }
  function uploaderName(d) { return personName(d.uploader_email) || 'a member'; }

  // ---------- what a link or file looks like in the viewer ----------
  function parseUrl(s) {
    try { const u = new URL(s); return /^https?:$/.test(u.protocol) ? u : null; } catch (e) { return null; }
  }
  // Known sites get an embeddable player/preview URL; anything else is opened in a new tab.
  function linkEmbed(urlString) {
    const u = parseUrl(urlString);
    if (!u) return null;
    const host = u.hostname.replace(/^www\./, '');
    const parts = u.pathname.split('/').filter(Boolean);
    let m;
    if (host === 'youtu.be' && parts[0]) return { provider: 'YouTube', type: 'Video', src: 'https://www.youtube-nocookie.com/embed/' + parts[0], video: true };
    if (/(^|\.)youtube\.com$/.test(host)) {
      const id = u.searchParams.get('v') || (['shorts', 'embed', 'live'].indexOf(parts[0]) !== -1 ? parts[1] : null);
      return id ? { provider: 'YouTube', type: 'Video', src: 'https://www.youtube-nocookie.com/embed/' + id, video: true } : { provider: 'YouTube', type: 'Link' };
    }
    if (/(^|\.)loom\.com$/.test(host)) {
      return (parts[0] === 'share' || parts[0] === 'embed') && parts[1]
        ? { provider: 'Loom', type: 'Video', src: 'https://www.loom.com/embed/' + parts[1], video: true }
        : { provider: 'Loom', type: 'Link' };
    }
    if (host === 'vimeo.com' && /^\d+$/.test(parts[0] || '')) {
      return { provider: 'Vimeo', type: 'Video', src: 'https://player.vimeo.com/video/' + parts[0] + (parts[1] ? '?h=' + encodeURIComponent(parts[1]) : ''), video: true };
    }
    if (host === 'docs.google.com' && (m = u.pathname.match(/^\/(document|presentation|spreadsheets)\/d\/([\w-]+)/))) {
      const names = { document: 'Google Doc', presentation: 'Google Slides', spreadsheets: 'Google Sheet' };
      return { provider: 'Google', type: names[m[1]], src: 'https://docs.google.com/' + m[1] + '/d/' + m[2] + '/preview' };
    }
    if (host === 'drive.google.com' && (m = u.pathname.match(/^\/file\/d\/([\w-]+)/))) {
      return { provider: 'Google Drive', type: 'File', src: 'https://drive.google.com/file/d/' + m[1] + '/preview' };
    }
    if (/(^|\.)notion\.(site|so)$/.test(host)) {
      return { provider: 'Notion', type: 'Notion', src: u.href, note: 'Only Notion pages that are published to the web (Share › Publish) show here. Otherwise use Open in Notion.' };
    }
    if (/(^|\.)figma\.com$/.test(host) && /^(file|design|proto|board)$/.test(parts[0] || '')) {
      return { provider: 'Figma', type: 'Figma', src: 'https://www.figma.com/embed?embed_host=canopi&url=' + encodeURIComponent(u.href) };
    }
    if (/\.pdf$/i.test(u.pathname)) return { provider: host, type: 'PDF', src: u.href };
    return { provider: host, type: 'Link' };
  }
  function fileKind(d) {
    const name = (d.file_name || '').toLowerCase();
    const mime = d.mime_type || '';
    if (mime === 'application/pdf' || /\.pdf$/.test(name)) return 'PDF';
    if (/^image\//.test(mime)) return 'Image';
    if (/^video\//.test(mime)) return 'Video';
    if (/^audio\//.test(mime)) return 'Audio';
    if (/\.(docx?|rtf)$/.test(name)) return 'Word';
    if (/\.(xlsx?|csv)$/.test(name)) return 'Excel';
    if (/\.(pptx?)$/.test(name)) return 'PowerPoint';
    return 'File';
  }
  function itemType(d) { return d.url ? (linkEmbed(d.url) || { type: 'Link' }).type : fileKind(d); }

  function uploadRowHTML(d) {
    return '<div class="doclist-row upload-row">' +
      '<a href="#' + VIEW_PREFIX + d.id + '"><span>' + escapeHtml(d.title) + '</span></a>' +
      '<span class="upload-meta"><span class="tag tag-outline">' + escapeHtml(itemType(d)) + '</span>' +
        escapeHtml(uploaderName(d)) + ' &middot; ' + formatDate(d.created_at) +
        (d.size_bytes ? ' &middot; ' + formatSize(d.size_bytes) : '') +
        (canDelete(d) ? '<button type="button" class="link-button upload-delete" data-doc-delete="' + d.id + '">Delete</button>' : '') +
      '</span></div>';
  }
  function uploadsSectionHTML(route, standalone) {
    const copies = copyIdsOfSharePointDocs();
    const docs = uploadsFor(route).filter((d) => !copies[d.id]);
    const list = docs.length
      ? '<div class="doclist">' + docs.map(uploadRowHTML).join('') + '</div>'
      : '<p class="section-lead">Nothing added here yet.</p>';
    return (standalone ? '' : '<h2>Added by the team</h2>') + list +
      '<div class="upload-actions">' + uploadButtonHTML(route) + '</div>';
  }

  // ---------- viewer page (#view-<id>) ----------
  function frameHTML(src, video) {
    return '<div class="viewer-frame' + (video ? ' viewer-video' : '') + '"><iframe src="' + escapeHtml(src) + '"' +
      ' allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen' +
      ' referrerpolicy="strict-origin-when-cross-origin"></iframe></div>';
  }
  function noPreviewHTML(text) {
    return '<div class="empty-state viewer-empty"><span class="empty-state-icon">' + icon(ICON_DEFAULT, 30) + '</span>' +
      '<p class="empty-state-body">' + text + '</p></div>';
  }

  function viewerHTML(id) {
    const d = findUpload(id);
    if (!d) {
      return crumb([{ label: 'Home', route: 'home' }, { label: 'Not found' }]) + '<h1>Not found</h1>' +
        '<p class="section-lead">This item doesn&rsquo;t exist anymore, or it was deleted.</p>';
    }
    const group = sectionGroup(d.section);
    const embed = d.url ? linkEmbed(d.url) : null;
    const actions = d.url
      ? '<a class="btn btn-primary" href="' + escapeHtml(d.url) + '" target="_blank" rel="noopener">Open in ' + escapeHtml(embed.provider) + ' &#8599;</a>'
      : '<button type="button" class="btn btn-primary" data-doc-download="' + d.id + '">Download</button>';
    return crumb([
      { label: 'Home', route: 'home' },
      { label: group, route: SECTION_ROOTS[group] },
      { label: escapeHtml(TITLES[d.section] || d.section), route: d.section },
      { label: escapeHtml(d.title) },
    ]) +
      '<h1>' + escapeHtml(d.title) + '</h1>' +
      '<p class="detail-meta"><span class="tag tag-outline">' + escapeHtml(itemType(d)) + '</span> Added by ' + escapeHtml(uploaderName(d)) + ' on ' + formatDate(d.created_at) +
        (d.size_bytes ? ' &middot; ' + formatSize(d.size_bytes) : '') + '</p>' +
      '<div class="viewer-actions">' + actions +
        (canDelete(d) ? '<button type="button" class="btn btn-secondary" data-doc-delete="' + d.id + '">Delete</button>' : '') +
      '</div>' +
      '<div id="viewer">' + (d.url
        ? (embed.src ? frameHTML(embed.src, embed.video) + (embed.note ? '<p class="viewer-note">' + embed.note + '</p>' : '')
                     : noPreviewHTML('This link can&rsquo;t be previewed inside the site. Use the button above to open it.'))
        : '<p class="section-lead">Loading preview&hellip;</p>') +
      '</div>';
  }

  // SharePoint refuses to be shown inside other sites, so a SharePoint document is
  // viewed here once someone uploads a copy with the same title to the same section.
  function normTitle(t) { return String(t).toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function uploadedCopyOf(doc) {
    return UPLOADS.find((u) => u.section === doc.section && normTitle(u.title) === normTitle(doc.title));
  }
  function copyIdsOfSharePointDocs() {
    const ids = {};
    Object.keys(SHAREPOINT_DOCS).forEach((k) => { const c = uploadedCopyOf(SHAREPOINT_DOCS[k]); if (c) ids[c.id] = true; });
    return ids;
  }

  function sharePointViewerHTML(doc) {
    const group = sectionGroup(doc.section);
    return crumb([
      { label: 'Home', route: 'home' },
      { label: group, route: SECTION_ROOTS[group] },
      { label: escapeHtml(TITLES[doc.section] || doc.section), route: doc.section },
      { label: escapeHtml(doc.title) },
    ]) +
      '<h1>' + escapeHtml(doc.title) + '</h1>' +
      '<p class="detail-meta"><span class="tag tag-outline">' + doc.kind + '</span> Stored in SharePoint</p>' +
      '<div class="empty-state viewer-empty">' +
        '<span class="empty-state-icon">' + icon(ICON_UPLOAD, 30) + '</span>' +
        '<p class="empty-state-title">Not viewable here yet</p>' +
        '<p class="empty-state-body">SharePoint doesn&rsquo;t allow its documents to be shown inside other sites. ' +
          'Upload a PDF copy and it&rsquo;ll open right here for every signed-in member.</p>' +
        '<div class="viewer-actions viewer-actions-center">' +
          '<button type="button" class="btn btn-primary" data-upload="' + doc.section + '" data-upload-title="' + escapeHtml(doc.title) + '">' + icon(ICON_UPLOAD, 16) + 'Upload PDF copy</button>' +
          '<a class="btn btn-secondary" href="' + escapeHtml(doc.href) + '" target="_blank" rel="noopener">Open in SharePoint &#8599;</a>' +
        '</div>' +
        '<p class="viewer-note">To get a PDF: open it in SharePoint, then File &rsaquo; Save As (or Export) &rsaquo; Download as PDF.</p>' +
      '</div>';
  }

  // Uploaded files need a signed link before they can be shown; fill the preview in once we have it.
  async function fillFilePreview(id) {
    const d = findUpload(id);
    const el = document.getElementById('viewer');
    if (!d || d.url || !el) return;
    const kind = fileKind(d);
    const office = ['Word', 'Excel', 'PowerPoint'].indexOf(kind) !== -1;
    if (['PDF', 'Image', 'Video', 'Audio'].indexOf(kind) === -1 && !office) {
      el.innerHTML = noPreviewHTML('There&rsquo;s no preview for this file type. Use Download to open it.');
      return;
    }
    const { data, error } = await db.storage.from('documents').createSignedUrl(d.file_path, 60 * 60);
    if (!document.getElementById('viewer')) return; // navigated away meanwhile
    if (error) { el.innerHTML = noPreviewHTML('Couldn&rsquo;t load the preview: ' + escapeHtml(error.message)); return; }
    const src = data.signedUrl;
    if (kind === 'PDF') el.innerHTML = frameHTML(src);
    else if (kind === 'Image') el.innerHTML = '<img class="viewer-image" src="' + escapeHtml(src) + '" alt="' + escapeHtml(d.title) + '">';
    else if (kind === 'Video') el.innerHTML = '<video class="viewer-media" src="' + escapeHtml(src) + '" controls></video>';
    else if (kind === 'Audio') el.innerHTML = '<audio class="viewer-media" src="' + escapeHtml(src) + '" controls></audio>';
    // Word/Excel/PowerPoint: Microsoft's free web viewer, fed a link that expires in an hour.
    else el.innerHTML = frameHTML('https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(src));
  }

  async function downloadUpload(id) {
    const d = findUpload(id);
    if (!d || !d.file_path) return;
    const { data, error } = await db.storage.from('documents').createSignedUrl(d.file_path, 60, { download: d.file_name });
    if (error) { alert('Could not download that file: ' + error.message); return; }
    location.assign(data.signedUrl);
  }

  async function deleteUpload(id) {
    const d = findUpload(id);
    if (!d || !confirm('Delete “' + d.title + '”? This can’t be undone.')) return;
    const { error } = await db.from('documents').delete().eq('id', id);
    if (error) { alert('Could not delete: ' + error.message); return; }
    if (d.file_path) await db.storage.from('documents').remove([d.file_path]);
    await loadUploads();
    if (location.hash.slice(1) === VIEW_PREFIX + id) location.hash = d.section;
    else render();
  }

  async function uploadOne(file, section, title, owner) {
    const safeName = file.name.replace(/[^\w.\-]+/g, '_');
    const path = CURRENT_USER.id + '/' + crypto.randomUUID() + '/' + safeName;
    let error = (await db.storage.from('documents').upload(path, file, { contentType: file.type || 'application/octet-stream' })).error;
    if (!error) {
      error = (await db.from('documents').insert(Object.assign({
        section, title, file_path: path, file_name: file.name,
        mime_type: file.type || null, size_bytes: file.size,
      }, owner))).error;
      if (error) await db.storage.from('documents').remove([path]);
    }
    return error;
  }

  // ---------- add dialog: upload a file or add a link ----------
  const uploadDialog = document.createElement('dialog');
  uploadDialog.className = 'modal';
  document.body.appendChild(uploadDialog);

  function sectionOptionsHTML(selected) {
    const groups = {};
    UPLOAD_ROUTES.forEach((r) => { (groups[sectionGroup(r)] = groups[sectionGroup(r)] || []).push(r); });
    return Object.keys(groups).map((g) =>
      '<optgroup label="' + g + '">' +
      groups[g].sort((a, b) => TITLES[a].localeCompare(TITLES[b])).map((r) =>
        '<option value="' + r + '"' + (r === selected ? ' selected' : '') + '>' + escapeHtml(TITLES[r]) + '</option>'
      ).join('') + '</optgroup>'
    ).join('');
  }

  function openUploadDialog(route, presetTitle) {
    uploadDialog.innerHTML =
      '<form class="upload-form" id="upload-form">' +
        '<h2>Add to the repository</h2>' +
        '<div class="segmented" role="tablist">' +
          '<button type="button" role="tab" class="active" data-mode="file">' + icon(ICON_UPLOAD, 15) + 'Upload a file</button>' +
          '<button type="button" role="tab" data-mode="link">' + icon(ICON_LINK, 15) + 'Add a link</button>' +
        '</div>' +
        '<label class="field"><span>Section</span><select name="section" required>' +
          (route ? '' : '<option value="" selected disabled>Choose where it belongs&hellip;</option>') +
          sectionOptionsHTML(route) + '</select></label>' +
        '<label class="dropzone" id="upload-dropzone" data-for="file">' +
          '<input type="file" name="file" multiple required>' +
          icon(ICON_UPLOAD, 26) +
          '<span class="dropzone-label">Drop files here, or click to choose</span>' +
          '<span class="dropzone-hint">PDF, Word, Excel, PowerPoint, images, video &mdash; up to 50 MB</span>' +
        '</label>' +
        '<label class="field" data-for="link" hidden><span>Link</span><input type="url" name="url" placeholder="https://www.loom.com/share/&hellip;"></label>' +
        '<p class="field-hint" data-for="link" hidden>Plays or previews right in the site: Loom, YouTube, Vimeo, Google Docs/Slides/Sheets/Drive, published Notion pages, Figma, and PDF links. Anything else opens in a new tab.</p>' +
        '<label class="field" id="title-field"><span>Title</span><input type="text" name="title" maxlength="200" required placeholder="e.g. 26-10-01 Weekly Team Meeting Minutes" value="' + escapeHtml(presetTitle || '') + '"></label>' +
        '<p class="field-hint" id="multi-hint" hidden>Each file is titled with its file name. To replace a SharePoint document, name the file the same as it appears on the site.</p>' +
        '<p class="form-message" id="upload-message"></p>' +
        '<div class="modal-actions">' +
          '<button type="button" class="btn btn-secondary" data-upload-cancel>Cancel</button>' +
          '<button type="submit" class="btn btn-primary" id="upload-submit">Upload</button>' +
        '</div>' +
      '</form>';
    const form = uploadDialog.querySelector('form');
    const zone = uploadDialog.querySelector('#upload-dropzone');
    const label = zone.querySelector('.dropzone-label');
    const message = uploadDialog.querySelector('#upload-message');
    const submit = uploadDialog.querySelector('#upload-submit');
    let mode = 'file';

    uploadDialog.querySelectorAll('[data-mode]').forEach((tab) => tab.addEventListener('click', () => {
      mode = tab.getAttribute('data-mode');
      uploadDialog.querySelectorAll('[data-mode]').forEach((t) => t.classList.toggle('active', t === tab));
      uploadDialog.querySelectorAll('[data-for]').forEach((el) => { el.hidden = el.getAttribute('data-for') !== mode; });
      form.file.required = mode === 'file';
      form.url.required = mode === 'link';
      const many = mode === 'file' && form.file.files.length > 1;
      uploadDialog.querySelector('#title-field').hidden = many;
      uploadDialog.querySelector('#multi-hint').hidden = !many;
      form.title.required = !many;
      submit.textContent = mode === 'link' ? 'Add link' : many ? 'Upload ' + form.file.files.length + ' files' : 'Upload';
      message.textContent = '';
      (mode === 'file' ? zone : form.url).focus();
    }));

    function titleFromFileName(name) { return name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').trim(); }
    // One file: editable title. Several files: each is titled from its file name.
    function pickFiles(files) {
      if (!files.length) return;
      const many = files.length > 1;
      const total = Array.prototype.reduce.call(files, (n, f) => n + f.size, 0);
      label.textContent = many ? files.length + ' files selected (' + formatSize(total) + ')' : files[0].name + ' (' + formatSize(files[0].size) + ')';
      zone.classList.add('has-file');
      uploadDialog.querySelector('#title-field').hidden = many;
      uploadDialog.querySelector('#multi-hint').hidden = !many;
      form.title.required = !many;
      if (!many && !form.title.value.trim()) form.title.value = titleFromFileName(files[0].name);
      submit.textContent = many ? 'Upload ' + files.length + ' files' : 'Upload';
    }
    form.file.addEventListener('change', () => pickFiles(form.file.files));
    ['dragenter', 'dragover'].forEach((t) => zone.addEventListener(t, (e) => { e.preventDefault(); zone.classList.add('dragging'); }));
    ['dragleave', 'drop'].forEach((t) => zone.addEventListener(t, () => zone.classList.remove('dragging')));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!e.dataTransfer.files.length) return;
      form.file.files = e.dataTransfer.files;
      pickFiles(form.file.files);
    });
    // Suggest a title as soon as a link is pasted, but never overwrite one the member typed.
    let suggestedTitle = '';
    form.url.addEventListener('input', () => {
      const current = form.title.value.trim();
      if (current && current !== suggestedTitle) return;
      const embed = linkEmbed(form.url.value.trim());
      suggestedTitle = embed ? embed.provider + ' ' + embed.type.toLowerCase() : '';
      form.title.value = suggestedTitle;
    });
    uploadDialog.querySelector('[data-upload-cancel]').addEventListener('click', () => uploadDialog.close());

    function setDisabled(disabled) {
      form.querySelectorAll('button, input, select').forEach((el) => { el.disabled = disabled; });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const section = form.section.value;
      const title = form.title.value.trim();
      const owner = { uploaded_by: CURRENT_USER.id, uploader_email: CURRENT_USER.email };
      let error;

      if (mode === 'link') {
        const u = parseUrl(form.url.value.trim());
        if (!u) { message.textContent = 'Enter a full link starting with https://'; return; }
        setDisabled(true);
        message.textContent = 'Saving…';
        error = (await db.from('documents').insert(Object.assign({ section, title, url: u.href }, owner))).error;
      } else {
        const files = Array.prototype.slice.call(form.file.files);
        if (!files.length) { message.textContent = 'Choose a file to upload.'; return; }
        const tooBig = files.filter((f) => f.size > MAX_UPLOAD_BYTES);
        if (tooBig.length) { message.textContent = 'Over 50 MB: ' + tooBig.map((f) => f.name).join(', '); return; }
        setDisabled(true);
        const failed = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          message.textContent = files.length > 1 ? 'Uploading ' + (i + 1) + ' of ' + files.length + '\u2026' : 'Uploading\u2026';
          const fileError = await uploadOne(file, section, files.length > 1 ? titleFromFileName(file.name) : title, owner);
          if (fileError) failed.push(file.name + ' (' + fileError.message + ')');
        }
        if (failed.length) {
          await loadUploads();
          setDisabled(false);
          message.textContent = 'Couldn\u2019t upload: ' + failed.join('; ');
          return;
        }
      }
      if (error) {
        setDisabled(false);
        message.textContent = 'Couldn\u2019t add the link: ' + error.message;
        return;
      }
      uploadDialog.close();
      await loadUploads();
      const here = location.hash.slice(1);
      if (here === section || here.indexOf(DOC_PREFIX) === 0) render();
      else location.hash = section;
    });

    uploadDialog.showModal();
  }

  document.addEventListener('click', (e) => {
    const up = e.target.closest('[data-upload]');
    if (up) { e.preventDefault(); openUploadDialog(up.getAttribute('data-upload'), up.getAttribute('data-upload-title')); return; }
    const del = e.target.closest('[data-doc-delete]');
    if (del) { e.preventDefault(); deleteUpload(del.getAttribute('data-doc-delete')); return; }
    const dl = e.target.closest('[data-doc-download]');
    if (dl) { e.preventDefault(); downloadUpload(dl.getAttribute('data-doc-download')); }
  });

  function renderAccount() {
    document.getElementById('sidebar-account').innerHTML =
      uploadButtonHTML('', 'Add file or link') +
      '<div class="sidebar-user" title="' + escapeHtml(CURRENT_USER.email) + '">' + escapeHtml(CURRENT_USER.email) + '</div>' +
      '<button type="button" class="link-button sidebar-signout" id="change-password">Change password</button>' +
      '<button type="button" class="link-button sidebar-signout" id="sign-out">Sign out</button>';
    document.getElementById('change-password').addEventListener('click', openPasswordDialog);
    document.getElementById('sign-out').addEventListener('click', () => window.CanopiAuth.signOut());
  }

  // Members start with a temporary password from an admin and change it here.
  function openPasswordDialog() {
    uploadDialog.innerHTML =
      '<form class="upload-form">' +
        '<h2>Change password</h2>' +
        '<label class="field"><span>New password</span><input type="password" name="password" autocomplete="new-password" minlength="8" required></label>' +
        '<label class="field"><span>Confirm new password</span><input type="password" name="confirm" autocomplete="new-password" minlength="8" required></label>' +
        '<p class="form-message" id="password-message"></p>' +
        '<div class="modal-actions">' +
          '<button type="button" class="btn btn-secondary" data-upload-cancel>Cancel</button>' +
          '<button type="submit" class="btn btn-primary">Save password</button>' +
        '</div>' +
      '</form>';
    const form = uploadDialog.querySelector('form');
    const message = uploadDialog.querySelector('#password-message');
    uploadDialog.querySelector('[data-upload-cancel]').addEventListener('click', () => uploadDialog.close());
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.password.value !== form.confirm.value) { message.textContent = 'The two passwords don\u2019t match.'; return; }
      form.querySelectorAll('button, input').forEach((el) => { el.disabled = true; });
      const { error } = await db.auth.updateUser({ password: form.password.value });
      if (error) {
        form.querySelectorAll('button, input').forEach((el) => { el.disabled = false; });
        message.textContent = 'Couldn\u2019t change it: ' + error.message;
        return;
      }
      form.innerHTML = '<h2>Password changed</h2><p class="section-lead">Use your new password next time you sign in.</p>' +
        '<div class="modal-actions"><button type="button" class="btn btn-primary" data-upload-cancel>Done</button></div>';
      form.querySelector('[data-upload-cancel]').addEventListener('click', () => uploadDialog.close());
    });
    uploadDialog.showModal();
    form.password.focus();
  }

  // ---------- task board (#tasks) ----------
  // Cards live in the tasks table (supabase/schema.sql). Everyone sees every
  // card; only a card's owner can move, edit or delete it, which the database
  // enforces too. Due times are entered and shown in US Central Time, the same
  // clock the Slack alerts in supabase/slack_alerts.sql use.
  const TASK_COLUMNS = [
    { key: 'todo', label: 'To do' },
    { key: 'doing', label: 'In progress' },
    { key: 'done', label: 'Done' },
  ];
  const TASK_TZ = 'America/Chicago';
  const DEFAULT_DUE_TIME = '17:00';
  let TASKS = [];
  let MEMBERS = [];
  let tasksLoaded = false;
  let taskFilter = 'all'; // 'all', 'mine', 'overdue', or a member id
  let tasksChannel = null;

  async function loadTasks() {
    const { data, error } = await db.from('tasks').select('*')
      .order('due_at', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true });
    if (error) { console.error('Could not load tasks', error); return; }
    TASKS = data;
    tasksLoaded = true;
  }
  async function loadMembers() {
    const { data, error } = await db.rpc('list_members');
    if (!error && Array.isArray(data)) MEMBERS = data;
  }

  // Central Time wall clock <-> ISO timestamps, without a date library.
  function centralParts(date) {
    const parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: TASK_TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(date).forEach((p) => { parts[p.type] = p.value; });
    return parts;
  }
  function centralToISO(dateStr, timeStr) {
    const d = dateStr.split('-').map(Number);
    const t = (timeStr || DEFAULT_DUE_TIME).split(':').map(Number);
    const wanted = Date.UTC(d[0], d[1] - 1, d[2], t[0], t[1]);
    let guess = wanted;
    for (let i = 0; i < 2; i++) {
      const p = centralParts(new Date(guess));
      guess += wanted - Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
    }
    return new Date(guess).toISOString();
  }
  function centralInputValues(iso) {
    const p = centralParts(new Date(iso));
    return { date: p.year + '-' + p.month + '-' + p.day, time: p.hour + ':' + p.minute };
  }
  function formatDue(iso) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: TASK_TZ, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    }).format(new Date(iso)) + ' CT';
  }
  function dueState(t) {
    if (!t.due_at || t.status === 'done') return '';
    const ms = new Date(t.due_at).getTime() - Date.now();
    return ms <= 0 ? 'overdue' : ms <= 24 * 60 * 60 * 1000 ? 'soon' : '';
  }
  function memberName(email) { return personName(email) || 'someone'; }
  function isMine(t) { return !!CURRENT_USER && t.owner_id === CURRENT_USER.id; }
  function findTask(id) { return TASKS.find((t) => t.id === id); }

  function visibleTasks() {
    return TASKS.filter((t) =>
      taskFilter === 'all' ? true
        : taskFilter === 'mine' ? isMine(t)
        : taskFilter === 'overdue' ? dueState(t) === 'overdue'
        : t.owner_id === taskFilter);
  }

  function taskCardHTML(t) {
    const state = dueState(t);
    const mine = isMine(t);
    const name = memberName(t.owner_email);
    return '<div class="task-card' + (state ? ' task-' + state : '') + (mine ? ' task-mine' : '') + '" role="button" tabindex="0" data-task="' + t.id + '"' +
        (mine ? ' draggable="true"' : '') + '>' +
      '<span class="task-title">' + escapeHtml(t.title) + '</span>' +
      (t.notes ? '<span class="task-notes">' + escapeHtml(t.notes) + '</span>' : '') +
      '<span class="task-meta">' +
        '<span class="task-owner"><span class="task-avatar">' + escapeHtml(name[0].toUpperCase()) + '</span>' + escapeHtml(name) + '</span>' +
        (t.due_at ? '<span class="task-due">' + (state === 'overdue' ? 'Overdue &middot; ' : '') + formatDue(t.due_at) + '</span>' : '') +
      '</span>' +
    '</div>';
  }

  function boardHTML() {
    const tasks = visibleTasks();
    return TASK_COLUMNS.map((c) => {
      const cards = tasks.filter((t) => t.status === c.key);
      return '<section class="task-column" data-column="' + c.key + '">' +
        '<header class="task-column-head"><span>' + c.label + '</span><span class="task-count">' + cards.length + '</span></header>' +
        '<div class="task-list">' + (cards.length ? cards.map(taskCardHTML).join('') : '<p class="task-empty">Nothing here</p>') + '</div>' +
      '</section>';
    }).join('');
  }

  function taskFilterOptionsHTML() {
    const opt = (value, label) => '<option value="' + value + '"' + (taskFilter === value ? ' selected' : '') + '>' + label + '</option>';
    return opt('all', 'Everyone&rsquo;s tasks') + opt('mine', 'My tasks') + opt('overdue', 'Overdue') +
      '<optgroup label="By person">' + MEMBERS.map((m) => opt(m.id, escapeHtml(memberName(m.email)))).join('') + '</optgroup>';
  }

  function tasksPageHTML() {
    return crumb([{ label: 'Home', route: 'home' }, { label: 'Tasks' }]) +
      '<div class="tasks-head">' +
        '<div><h1>Tasks</h1><p class="section-lead">What everyone is working on. Anyone can add a task for anyone; only the person it&rsquo;s assigned to can move, edit or delete it. Times are Central Time.</p></div>' +
        '<button type="button" class="btn btn-primary" data-task-new>' + icon(ICON_PLUS, 16) + 'New task</button>' +
      '</div>' +
      '<div class="tasks-toolbar"><label class="field field-inline"><span>Show</span><select id="task-filter">' + taskFilterOptionsHTML() + '</select></label>' +
        '<span class="tasks-hint">Drag your own cards between columns, or click a card to open it.</span></div>' +
      '<div class="task-board" id="task-board">' + (tasksLoaded ? boardHTML() : '<p class="section-lead">Loading&hellip;</p>') + '</div>';
  }

  function renderBoard() {
    const board = document.getElementById('task-board');
    if (board) board.innerHTML = boardHTML();
    const filter = document.getElementById('task-filter');
    if (filter) filter.innerHTML = taskFilterOptionsHTML();
  }
  async function refreshTasks() {
    await Promise.all([loadTasks(), MEMBERS.length ? null : loadMembers()]);
    renderBoard();
  }

  // Everyone's board updates when anyone changes a task; the minute timer keeps
  // "overdue" badges current and covers browsers where live updates are blocked.
  function subscribeToTasks() {
    if (tasksChannel || typeof db.channel !== 'function') return;
    tasksChannel = db.channel('task-board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        if (location.hash.slice(1) === 'tasks') refreshTasks();
      })
      .subscribe();
  }
  setInterval(() => { if (!document.hidden && location.hash.slice(1) === 'tasks') refreshTasks(); }, 60 * 1000);

  async function moveTask(id, status) {
    const t = findTask(id);
    if (!t || !isMine(t) || t.status === status) return;
    const before = t.status;
    t.status = status;
    renderBoard();
    const { error } = await db.from('tasks').update({ status }).eq('id', id);
    if (error) { t.status = before; renderBoard(); alert('Couldn’t move that task: ' + error.message); }
  }

  function memberOptionsHTML(selectedId) {
    return MEMBERS.map((m) =>
      '<option value="' + m.id + '"' + (m.id === selectedId ? ' selected' : '') + '>' + escapeHtml(memberName(m.email)) + '</option>').join('');
  }
  function statusOptionsHTML(selected) {
    return TASK_COLUMNS.map((c) => '<option value="' + c.key + '"' + (c.key === selected ? ' selected' : '') + '>' + c.label + '</option>').join('');
  }

  function openTaskDialog(id) {
    const t = id ? findTask(id) : null;
    if (id && !t) return;
    if (t && !isMine(t)) {
      const state = dueState(t);
      uploadDialog.innerHTML =
        '<div class="upload-form task-view">' +
          '<h2>' + escapeHtml(t.title) + '</h2>' +
          '<dl class="task-facts">' +
            '<dt>Owner</dt><dd>' + escapeHtml(memberName(t.owner_email)) + '</dd>' +
            '<dt>Status</dt><dd>' + TASK_COLUMNS.filter((c) => c.key === t.status)[0].label + '</dd>' +
            '<dt>Due</dt><dd' + (state ? ' class="task-due-' + state + '"' : '') + '>' + (t.due_at ? formatDue(t.due_at) + (state === 'overdue' ? ' (overdue)' : '') : 'No due date') + '</dd>' +
            '<dt>Added by</dt><dd>' + escapeHtml(memberName(t.created_by_email)) + ' on ' + formatDate(t.created_at) + '</dd>' +
          '</dl>' +
          (t.notes ? '<p class="task-view-notes">' + escapeHtml(t.notes) + '</p>' : '') +
          '<p class="field-hint">Only ' + escapeHtml(memberName(t.owner_email)) + ' can change this task.</p>' +
          '<div class="modal-actions"><button type="button" class="btn btn-primary" data-upload-cancel>Close</button></div>' +
        '</div>';
      uploadDialog.querySelector('[data-upload-cancel]').addEventListener('click', () => uploadDialog.close());
      uploadDialog.showModal();
      return;
    }

    const due = t && t.due_at ? centralInputValues(t.due_at) : { date: '', time: DEFAULT_DUE_TIME };
    uploadDialog.innerHTML =
      '<form class="upload-form">' +
        '<h2>' + (t ? 'Edit task' : 'New task') + '</h2>' +
        '<label class="field"><span>Task</span><input type="text" name="title" maxlength="200" required placeholder="e.g. Send Q4 board deck to investors" value="' + (t ? escapeHtml(t.title) : '') + '"></label>' +
        '<label class="field"><span>Notes (optional)</span><textarea name="notes" rows="3" maxlength="5000">' + (t && t.notes ? escapeHtml(t.notes) : '') + '</textarea></label>' +
        '<div class="field-row">' +
          '<label class="field"><span>Owner</span><select name="owner" required>' + memberOptionsHTML(t ? t.owner_id : CURRENT_USER.id) + '</select></label>' +
          '<label class="field"><span>Status</span><select name="status">' + statusOptionsHTML(t ? t.status : 'todo') + '</select></label>' +
        '</div>' +
        '<div class="field-row">' +
          '<label class="field"><span>Due date (optional)</span><input type="date" name="due_date" value="' + due.date + '"></label>' +
          '<label class="field"><span>Time (CT)</span><input type="time" name="due_time" value="' + due.time + '"></label>' +
        '</div>' +
        '<p class="field-hint">#teamprogress on Slack gets a heads-up 24 hours before the due time and an alert if it&rsquo;s missed.</p>' +
        '<p class="form-message" id="task-message"></p>' +
        '<div class="modal-actions">' +
          (t ? '<button type="button" class="btn btn-secondary task-delete" data-task-delete>Delete</button>' : '') +
          '<button type="button" class="btn btn-secondary" data-upload-cancel>Cancel</button>' +
          '<button type="submit" class="btn btn-primary">' + (t ? 'Save' : 'Add task') + '</button>' +
        '</div>' +
      '</form>';
    const form = uploadDialog.querySelector('form');
    const message = uploadDialog.querySelector('#task-message');
    const setDisabled = (on) => form.querySelectorAll('button, input, select, textarea').forEach((el) => { el.disabled = on; });
    uploadDialog.querySelector('[data-upload-cancel]').addEventListener('click', () => uploadDialog.close());

    const del = uploadDialog.querySelector('[data-task-delete]');
    if (del) del.addEventListener('click', async () => {
      if (!confirm('Delete “' + t.title + '”?')) return;
      setDisabled(true);
      const { error } = await db.from('tasks').delete().eq('id', t.id);
      if (error) { setDisabled(false); message.textContent = 'Couldn’t delete: ' + error.message; return; }
      uploadDialog.close();
      refreshTasks();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const row = {
        title: form.title.value.trim(),
        notes: form.notes.value.trim() || null,
        owner_id: form.owner.value,
        status: form.status.value,
        due_at: form.due_date.value ? centralToISO(form.due_date.value, form.due_time.value) : null,
      };
      if (!row.title) { message.textContent = 'Give the task a name.'; return; }
      setDisabled(true);
      message.textContent = 'Saving…';
      const { error } = t
        ? await db.from('tasks').update(row).eq('id', t.id)
        : await db.from('tasks').insert(row);
      if (error) { setDisabled(false); message.textContent = 'Couldn’t save: ' + error.message; return; }
      uploadDialog.close();
      refreshTasks();
    });

    uploadDialog.showModal();
    form.title.focus();
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-task-new]')) { openTaskDialog(null); return; }
    const card = e.target.closest('[data-task]');
    if (card) openTaskDialog(card.getAttribute('data-task'));
  });
  document.addEventListener('keydown', (e) => {
    const card = e.target.closest && e.target.closest('[data-task]');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openTaskDialog(card.getAttribute('data-task')); }
  });
  document.addEventListener('change', (e) => {
    if (e.target.id === 'task-filter') { taskFilter = e.target.value; renderBoard(); }
  });

  // Drag and drop between columns (desktop). On phones, open the card and change Status.
  document.addEventListener('dragstart', (e) => {
    const card = e.target.closest && e.target.closest('.task-card[draggable="true"]');
    if (!card) return;
    e.dataTransfer.setData('text/plain', card.getAttribute('data-task'));
    e.dataTransfer.effectAllowed = 'move';
    card.classList.add('dragging');
  });
  document.addEventListener('dragend', (e) => {
    if (e.target.classList) e.target.classList.remove('dragging');
    document.querySelectorAll('.task-column.drop-target').forEach((c) => c.classList.remove('drop-target'));
  });
  document.addEventListener('dragover', (e) => {
    const col = e.target.closest && e.target.closest('.task-column');
    if (!col) return;
    e.preventDefault();
    document.querySelectorAll('.task-column.drop-target').forEach((c) => { if (c !== col) c.classList.remove('drop-target'); });
    col.classList.add('drop-target');
  });
  document.addEventListener('drop', (e) => {
    const col = e.target.closest && e.target.closest('.task-column');
    if (!col) return;
    e.preventDefault();
    col.classList.remove('drop-target');
    moveTask(e.dataTransfer.getData('text/plain'), col.getAttribute('data-column'));
  });

  // ---------- home ----------
  function greetingFor(date) {
    const hour = date.getHours();
    return hour < 12 ? 'Good morning.' : hour < 18 ? 'Good afternoon.' : 'Good evening.';
  }

  function recentlyViewedList() {
    try { return JSON.parse(localStorage.getItem('canopi_recently_viewed') || '[]'); }
    catch (e) { return []; }
  }
  function recordRecentlyViewed(route) {
    if (route === 'home' || !TITLES[route]) return;
    const title = TITLES[route];
    const items = [{ title, route }, ...recentlyViewedList().filter((i) => i.route !== route)].slice(0, 6);
    try { localStorage.setItem('canopi_recently_viewed', JSON.stringify(items)); } catch (e) {}
  }

  function timeAgo(iso) {
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + ' min ago';
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return days + ' days ago';
    return formatDate(iso);
  }

  // The five newest files and links anyone has added, newest first.
  function recentUpdatesHTML() {
    if (!UPLOADS.length) {
      return '<div class="panel"><div class="panel-empty">Nothing added yet. New files and links will show up here as soon as someone adds them.</div></div>';
    }
    return UPLOADS.slice(0, 5).map((d, i) => {
      const who = uploaderName(d);
      return '<a href="#' + VIEW_PREFIX + d.id + '" class="update-row' + (i === 0 ? ' featured' : '') + '">' +
        '<span class="update-avatar" title="' + escapeHtml(d.uploader_email || who) + '">' + escapeHtml(who[0].toUpperCase()) + '</span>' +
        '<span class="update-title">' + escapeHtml(d.title) +
          '<span class="update-sub">' + escapeHtml(who) + ' added to ' + escapeHtml(TITLES[d.section] || d.section) + '</span></span>' +
        '<span class="update-meta" title="' + escapeHtml(new Date(d.created_at).toLocaleString()) + '">' + timeAgo(d.created_at) + '</span></a>';
    }).join('');
  }

  // Pull the latest list so additions from other members appear without a reload.
  async function refreshRecentUpdates() {
    if (!document.getElementById('recent-updates')) return;
    await loadUploads();
    const el = document.getElementById('recent-updates');
    if (el) el.innerHTML = recentUpdatesHTML();
  }
  setInterval(() => { if (!document.hidden) refreshRecentUpdates(); }, 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshRecentUpdates(); });

  function homeHTML() {

    const viewed = recentlyViewedList();
    const viewedHTML = viewed.length
      ? viewed.map((v) => '<a href="#' + v.route + '" class="viewed-row">' + v.title + '</a>').join('')
      : '<div class="panel-empty">Nothing viewed yet</div>';

    return `
      <p style="font-family:var(--font-heading);font-size:26px;font-weight:600;margin:0 0 var(--space-6)">${greetingFor(new Date())}</p>
      <div class="search-wrap">
        <span class="search-icon">${icon('M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', 16)}</span>
        <input type="text" id="search-input" class="search-input" placeholder="Search SOPs, projects, meeting notes, resources...">
        <div id="search-results"></div>
      </div>
      <p class="eyebrow">Quick access</p>
      <div class="quick-grid">
        <a href="#kb" class="quick-tile quick-tile-kb">${icon('M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', 26)}Knowledge Base</a>
        <a href="#projects" class="quick-tile quick-tile-projects">${icon('M2 7h20v14H2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 26)}Projects</a>
        <a href="#meetings" class="quick-tile quick-tile-meetings">${icon('M3 4h18v18H3z M16 2v4M8 2v4M3 10h18', 24)}Meeting Notes</a>
        <a href="#team-spaces" class="quick-tile quick-tile-teamspaces">${icon(ICON_USERS, 24)}Team Spaces</a>
        <a href="#resources" class="quick-tile quick-tile-resources">${icon('M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z', 24)}Resources</a>
      </div>
      <div class="two-col">
        <div>
          <p class="eyebrow">Recent updates</p>
          <div class="update-list" id="recent-updates">${recentUpdatesHTML()}</div>
          <p class="eyebrow">Company announcements</p>
          <div class="panel"><div class="panel-empty">Add an announcement here</div></div>
        </div>
        <div>
          <p class="eyebrow">Recently viewed</p>
          <div class="panel">${viewedHTML}</div>
        </div>
      </div>
    `;
  }

  // ---------- router ----------
  const contentEl = document.getElementById('content');
  const navEl = document.getElementById('sidebar-nav');

  navEl.innerHTML = NAV.map((n) =>
    '<a href="#' + n.key + '" data-nav-key="' + n.key + '"><span class="dot"></span>' + n.label + '</a>'
  ).join('');

  function currentRoute() {
    const r = (location.hash || '#home').slice(1);
    return TITLES[r] !== undefined || r === 'home' || r.indexOf(VIEW_PREFIX) === 0 || SHAREPOINT_DOCS[r.slice(DOC_PREFIX.length)] && r.indexOf(DOC_PREFIX) === 0 ? r : 'home';
  }

  function setActiveNav(route) {
    if (route.indexOf(VIEW_PREFIX) === 0) {
      const d = findUpload(route.slice(VIEW_PREFIX.length));
      route = d ? d.section : 'home';
    } else if (route.indexOf(DOC_PREFIX) === 0) {
      route = SHAREPOINT_DOCS[route.slice(DOC_PREFIX.length)].section;
    }
    navEl.querySelectorAll('a').forEach((a) => {
      const key = a.getAttribute('data-nav-key');
      const active = key === 'home' ? route === 'home' : (route === key || route.indexOf(key + '-') === 0);
      a.classList.toggle('active', active);
    });
  }

  function render() {
    const route = currentRoute();
    let html;
    const spDoc = route.indexOf(DOC_PREFIX) === 0 ? SHAREPOINT_DOCS[route.slice(DOC_PREFIX.length)] : null;
    const spCopy = spDoc && uploadedCopyOf(spDoc);
    const viewId = route.indexOf(VIEW_PREFIX) === 0 ? route.slice(VIEW_PREFIX.length) : spCopy ? spCopy.id : null;
    if (viewId) html = viewerHTML(viewId);
    else if (spDoc) html = sharePointViewerHTML(spDoc);
    else if (route === 'home') html = homeHTML();
    else if (route === 'tasks') html = tasksPageHTML();
    else if (SECTION_INDEXES[route]) html = SECTION_INDEXES[route]();
    else if (DOC_LISTS[route]) html = DOC_LISTS[route]() + (UPLOAD_ROUTES.indexOf(route) !== -1 ? uploadsSectionHTML(route) : '');
    else if (UPLOAD_ONLY_PAGES[route]) html = UPLOAD_ONLY_PAGES[route]();
    else if (DETAIL_PAGES[route]) html = DETAIL_PAGES[route];
    else html = homeHTML();

    contentEl.innerHTML = html;
    const viewed = viewId && findUpload(viewId);
    document.title = route === 'home' ? 'Canopi Repository' : (viewed ? viewed.title : spDoc ? spDoc.title : TITLES[route] || 'Canopi Repository') + ' \u2014 Canopi Repository';
    setActiveNav(route);
    window.scrollTo(0, 0);
    recordRecentlyViewed(route);
    wireSearch();
    if (viewId) fillFilePreview(viewId);
    if (route === 'home') refreshRecentUpdates();
    if (route === 'tasks') refreshTasks();
  }

  function searchResultHTML(item) {
    if (item.external && SHAREPOINT_KEY_BY_HREF[item.href]) {
      item = Object.assign({}, item, { route: DOC_PREFIX + SHAREPOINT_KEY_BY_HREF[item.href], external: false });
    }
    const meta = (item.meta || '') + (item.comingSoon ? ' — Coming soon' : item.download ? ' — download' : item.external ? ' — opens SharePoint' : '');
    const inner = '<span class="search-result-title">' + item.title + '</span>' +
      (meta ? '<span class="search-result-meta">' + meta + '</span>' : '');
    if (item.comingSoon) return '<span class="search-result-row search-result-disabled">' + inner + '</span>';
    if (item.route) return '<a href="#' + item.route + '" class="search-result-row">' + inner + '</a>';
    if (item.download) return '<a href="' + item.href + '" download class="search-result-row">' + inner + '</a>';
    return '<a href="' + item.href + '" target="_blank" rel="noopener" class="search-result-row">' + inner + '</a>';
  }

  function wireSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    const resultsEl = document.getElementById('search-results');
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { resultsEl.innerHTML = ''; return; }
      const uploaded = UPLOADS.map((d) => ({ title: escapeHtml(d.title), meta: sectionPath(d.section) + ' \u203a ' + itemType(d), route: VIEW_PREFIX + d.id }));
      const matches = SEARCH_INDEX.concat(uploaded).filter((i) => (i.title + ' ' + (i.keywords || '') + ' ' + (i.meta || '')).toLowerCase().indexOf(q) !== -1).slice(0, 20);
      if (!matches.length) {
        resultsEl.innerHTML = '<div class="search-results"><div class="search-empty">No matches</div></div>';
        return;
      }
      resultsEl.innerHTML = '<div class="search-results">' + matches.map(searchResultHTML).join('') + '</div>';
    });
  }

  contentEl.innerHTML = '<p class="section-lead">Loading&hellip;</p>';
  window.CanopiAuth.onReady(async (session) => {
    CURRENT_USER = session.user;
    renderAccount();
    await Promise.all([loadUploads(), loadIsAdmin()]);
    subscribeToTasks();
    window.addEventListener('hashchange', render);
    render();
  });
})();
