/**
 * Tools Showcase Interaction Module
 * Editorial hover states with subtle luminance reveals and purpose highlights
 */

export function initToolsInteraction() {
  const toolCards = document.querySelectorAll('.tool-card');

  toolCards.forEach((card) => {
    // Keyboard accessibility focus
    card.setAttribute('tabindex', '0');

    const handleEnter = () => {
      toolCards.forEach((c) => {
        if (c !== card) {
          c.classList.add('tool-card-dimmed');
        }
      });
      card.classList.add('tool-card-focused');
    };

    const handleLeave = () => {
      toolCards.forEach((c) => {
        c.classList.remove('tool-card-dimmed');
        c.classList.remove('tool-card-focused');
      });
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    card.addEventListener('focus', handleEnter);
    card.addEventListener('blur', handleLeave);
  });
}
