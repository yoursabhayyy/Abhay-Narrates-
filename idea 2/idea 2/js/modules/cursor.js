/**
 * Custom Cinematic Cursor Module
 * Desktop only — disabled on touch and reduced-motion
 */

export function initCustomCursor() {
  // Respect user preferences and touch devices
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReducedMotion) {
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  const cursorText = document.getElementById('cursor-text');

  if (!cursor || !cursorFollower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isHovering = false;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  // Smooth follower interpolation loop
  function render() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Link & Button hover states
  const interactiveElements = document.querySelectorAll('a, button, .interactive-target, [role="button"]');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('cursor-hover-link');
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('cursor-hover-link');
    });
  });

  // Project / Video hover state: "PLAY ▶"
  const mediaElements = document.querySelectorAll('.project-media-container, [data-cursor="play"]');
  mediaElements.forEach((el) => {
    const updateCursorMediaText = () => {
      if (!cursorText) return;
      if (el.classList.contains('is-playing')) {
        cursorText.textContent = 'PAUSE ❚❚';
      } else {
        cursorText.textContent = 'PLAY ▶';
      }
    };

    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('cursor-hover-media');
      updateCursorMediaText();
    });
    el.addEventListener('mousemove', () => {
      updateCursorMediaText();
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('cursor-hover-media');
      if (cursorText) {
        cursorText.textContent = '';
      }
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}
