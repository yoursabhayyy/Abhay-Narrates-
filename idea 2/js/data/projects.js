/**
 * Portfolio Projects Data
 * 
 * IMPORTANT PORTFOLIO ARCHITECTURE:
 * Currently contains exactly ONE real completed project, presented as the centerpiece.
 * To add future projects (Project #2, #3, etc.), simply add a new object to this array.
 * The UI automatically adapts from a single centerpiece to a selected works catalog.
 */

export const projects = [
  {
    id: 'project-01',
    number: '01 / 01',
    title: 'CHRONICLES OF LIGHT',
    year: '2026',
    category: 'VIDEO EDITING',
    roles: ['EDITING', 'MOTION GRAPHICS', 'COLOR', 'SOUND'],
    toolsUsed: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Illustrator'],
    
    // Video and imagery sources
    videoSrc: 'assets/video/project-1.mp4',
    posterSrc: 'assets/images/featured-project-poster.svg',
    aspectRatio: '16:9',
    
    // Honest project narrative & breakdown
    shortDescription: 'A narrative-driven edit exploring isolation, tempo, and optical contrast. Constructed to examine how silence and micro-pacing shape viewer tension across a cinematic sequence.',
    
    processNotes: [
      {
        aspect: 'Pacing & Cadence',
        note: 'Held cuts on subject micro-reactions instead of immediate action responses, allowing ambient tension to accumulate naturally.'
      },
      {
        aspect: 'Audio Cohesion',
        note: 'Built a multi-layered atmospheric soundbed using Premiere Pro and Audition to give visual transitions physical weight.'
      },
      {
        aspect: 'Visual Polish & Titles',
        note: 'Designed typography and lower-thirds in Adobe Illustrator, brought into After Effects for subtle tracking and film grain integration.'
      }
    ],

    // Metadata flags
    isFeatured: true
  }
];
