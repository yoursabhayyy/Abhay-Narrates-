/**
 * Tools & Creative Pipeline Data
 * Abhay Singh — Creative Portfolio
 * 
 * NOTE: As per Master Specification V2, no arbitrary percentage skill bars are used.
 * Each tool communicates its genuine, concrete role in the editorial pipeline.
 */

export const toolsData = [
  {
    id: 'premiere-pro',
    name: 'PREMIERE PRO',
    fullName: 'Adobe Premiere Pro',
    category: 'EDITING',
    badge: 'Primary Tool',
    icon: 'assets/icons/pr.svg',
    accentColor: '#9999FF',
    primaryPurpose: 'Primary editing tool.',
    workflowDetail: 'Long-form and short-form assembly, scene construction, dialogue cutting, pacing calibration, and multi-track audio soundbed synchronization.'
  },
  {
    id: 'after-effects',
    name: 'AFTER EFFECTS',
    fullName: 'Adobe After Effects',
    category: 'MOTION / VFX',
    badge: 'Compositing',
    icon: 'assets/icons/ae.svg',
    accentColor: '#D291FF',
    primaryPurpose: 'Motion graphics, compositing and visual effects.',
    workflowDetail: 'Cinematic title sequences, motion design, screen replacements, camera tracking, and atmospheric optical cleanup that support the narrative.'
  },
  {
    id: 'illustrator',
    name: 'ILLUSTRATOR',
    fullName: 'Adobe Illustrator',
    category: 'GRAPHIC DESIGN',
    badge: 'Visual Development',
    icon: 'assets/icons/ai.svg',
    accentColor: '#FF9A00',
    primaryPurpose: 'Graphic elements, design assets and visual development.',
    workflowDetail: 'Vector graphic design, typographic treatment, bespoke title identity, and visual layout assets prepared for motion graphics integration.'
  }
];
