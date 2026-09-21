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
    title: 'THE FIRST FRAME',
    year: '2026',
    category: 'VIDEO EDITING / VISUAL STORYTELLING',
    roles: ['EDITING', 'VISUAL STORYTELLING', 'CINEMATOGRAPHY', 'PERSONAL FILM'],
    toolsUsed: ['ADOBE PREMIERE PRO', 'ADOBE AFTER EFFECTS'],
    
    // Video and imagery sources
    videoSrc: 'assets/video/project-1.mp4',
    posterSrc: 'assets/images/featured-project-poster.svg',
    aspectRatio: '16:9',
    
    // Honest project narrative & breakdown
    shortDescription: "A cinematic introduction to my journey from consuming stories to creating them. A personal visual essay about the gap between inspiration and action — and the decision to finally start creating. Shot and edited as the first step in my journey as a video editor, cinematographer, and filmmaker.",
    
    processNotes: [
      {
        aspect: 'Concept',
        note: 'Personal creator introduction built around the idea of moving from content consumption to content creation.'
      },
      {
        aspect: 'Editing',
        note: 'Narrative-driven montage with rhythmic cuts, screen inserts, environmental shots and deliberate pacing.'
      },
      {
        aspect: 'Visual Style',
        note: 'Dark, cinematic imagery with warm practical lighting contrasted against cool blue tones from screens and RGB lighting.'
      },
      {
        aspect: 'Color',
        note: 'A high-contrast, low-key grade with deep blacks, warm skin/practical tones and cool blue highlights.'
      },
      {
        aspect: 'Sound & Pacing',
        note: 'Built around controlled pacing and visual rhythm, using screen activity, environmental moments and pauses to create a sense of progression.'
      },
      {
        aspect: 'Direction',
        note: 'Self-directed and self-produced as a personal introduction to my creative identity.'
      }
    ],

    // Metadata flags
    isFeatured: true
  }
];
