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
    title: 'ABHAY — THE BEGINNING',
    year: '2026',
    category: 'VIDEO EDITING',
    roles: ['VIDEO EDITING', 'VISUAL STORYTELLING', 'CINEMATOGRAPHY'],
    toolsUsed: ['Premiere Pro', 'After Effects', 'Self-Directed'],
    
    // Video and imagery sources
    videoSrc: 'assets/video/project-1.mp4',
    posterSrc: 'assets/images/featured-project-poster.svg',
    aspectRatio: '16:9',
    
    // Honest project narrative & breakdown
    shortDescription: "A cinematic introduction to my creative journey. A short visual piece introducing who I am, what I create, and where I'm headed — beginning with video editing and evolving toward filmmaking, cinematography, and storytelling. Built as the first frame of a long-term creative journey.",
    
    processNotes: [
      {
        aspect: 'Concept',
        note: 'Personal Introduction'
      },
      {
        aspect: 'Editing',
        note: 'Premiere Pro'
      },
      {
        aspect: 'Motion & VFX',
        note: 'After Effects'
      },
      {
        aspect: 'Visual Direction',
        note: 'Self-Directed'
      },
      {
        aspect: 'Purpose',
        note: 'Creative Introduction / Portfolio Piece'
      }
    ],

    // Metadata flags
    isFeatured: true
  }
];
