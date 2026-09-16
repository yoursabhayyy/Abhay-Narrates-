/**
 * Main Application Orchestrator
 * Abhay Singh — Creative Portfolio
 */

import { siteConfig } from './data/siteConfig.js';
import { projects } from './data/projects.js';
import { initCustomCursor } from './modules/cursor.js';
import { initNavigation } from './modules/navigation.js';
import { initVideoPlayer } from './modules/videoPlayer.js';
import { initToolsInteraction } from './modules/toolsInteraction.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initProjectModal } from './modules/projectModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  initCustomCursor();
  initNavigation();
  initVideoPlayer();
  initToolsInteraction();
  initScrollReveal();
  initProjectModal();

  // Quick-Copy Email Feature in Contact section
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      const email = siteConfig.author.email;
      try {
        await navigator.clipboard.writeText(email);
        copyFeedback.textContent = 'EMAIL COPIED';
        copyFeedback.classList.add('active');
        setTimeout(() => {
          copyFeedback.classList.remove('active');
          copyFeedback.textContent = '';
        }, 2500);
      } catch (err) {
        // Fallback for browsers without clipboard permissions
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Smooth scroll for all hash anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Current year display in footer
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
