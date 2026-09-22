/**
 * Production Client Bundle
 * Abhay Singh — Creative Portfolio
 * Fully compatible with file:// local opening (no CORS restrictions) and HTTP servers.
 */

(function () {
  'use strict';

  // --- Site Config ---
  const siteConfig = {
    author: {
      name: 'Abhay Singh',
      shortName: 'ABHAY',
      primaryRole: 'VIDEO EDITOR',
      secondaryRoles: ['Writer', 'Cinematographer'],
      tagline: 'I turn raw footage into stories.',
      year: '2026',
      email: 'abhaysingh.films@gmail.com',
      socials: {
        instagram: 'https://www.instagram.com/yours.abhayyy?stkn=MW05b3RvbWNpejZvcA==',
        linkedin: 'https://www.linkedin.com/in/abhay-singh-412205427?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        email: 'mailto:abhaysingh.films@gmail.com'
      }
    }
  };

  // --- Projects Data ---
  const projects = [
    {
      id: 'project-01',
      number: '01 / 01',
      title: 'THE FIRST FRAME',
      year: '2026',
      category: 'VIDEO EDITING / VISUAL STORYTELLING',
      roles: ['EDITING', 'VISUAL STORYTELLING', 'CINEMATOGRAPHY', 'PERSONAL FILM'],
      toolsUsed: ['ADOBE PREMIERE PRO', 'ADOBE AFTER EFFECTS'],
      videoSrc: 'assets/video/project-1.mp4',
      posterSrc: 'assets/images/abhay-poster.jpg',
      aspectRatio: '16:9',
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
      isFeatured: true
    }
  ];

  // --- Custom Cursor ---
  function initCustomCursor() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    const cursor = document.getElementById('custom-cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    const cursorText = document.getElementById('cursor-text');

    if (!cursor || !cursorFollower) return;

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    function render() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    const interactiveElements = document.querySelectorAll('a, button, .interactive-target, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-hover-link'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-hover-link'));
    });

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
        if (cursorText) cursorText.textContent = '';
      });
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });
  }

  // --- Navigation ---
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
      if (window.scrollY > 40) {
        header?.classList.add('header-scrolled');
      } else {
        header?.classList.remove('header-scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (menuToggle && mobileNav) {
      const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !mobileNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileNav.setAttribute('aria-hidden', String(!isOpen));
        
        if (isOpen) {
          mobileNav.classList.add('active');
          menuToggle.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          mobileNav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      };

      menuToggle.addEventListener('click', () => toggleMenu());
      mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
          toggleMenu(false);
        }
      });
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // --- Cinematic Video Player ---
  function initVideoPlayer() {
    const video = document.getElementById('featured-video');
    const canvasFallback = document.getElementById('canvas-preview-fallback');
    const playButton = document.getElementById('video-play-btn');
    const playOverlay = document.getElementById('video-play-overlay');
    const muteButton = document.getElementById('video-mute-btn');
    const fullscreenButton = document.getElementById('video-fullscreen-btn');
    const timecodeDisplay = document.getElementById('player-timecode');
    const progressBar = document.getElementById('video-progress-bar');
    const progressContainer = document.getElementById('video-progress-container');
    const container = document.querySelector('.project-media-container');

    if (!container) return;

    let isPlaying = false;
    let animationFrameId = null;
    let fallbackTime = 0;

    function formatTimecode(seconds) {
      if (isNaN(seconds) || seconds < 0) seconds = 0;
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      const frames = Math.floor((seconds % 1) * 24);
      const pad = (n) => String(n).padStart(2, '0');
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
    }

    function initCanvasFallback() {
      if (!canvasFallback) return null;
      const ctx = canvasFallback.getContext('2d');
      if (!ctx) return null;

      function resizeCanvas() {
        canvasFallback.width = canvasFallback.clientWidth || 1280;
        canvasFallback.height = canvasFallback.clientHeight || 720;
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      function drawCinematicLoop() {
        if (!isPlaying) return;
        fallbackTime += 1 / 60;
        const w = canvasFallback.width;
        const h = canvasFallback.height;

        ctx.fillStyle = '#0B0C10';
        ctx.fillRect(0, 0, w, h);

        const grad = ctx.createRadialGradient(
          w / 2 + Math.sin(fallbackTime * 0.4) * 80,
          h / 2,
          20,
          w / 2,
          h / 2,
          w * 0.65
        );
        grad.addColorStop(0, 'rgba(58, 96, 115, 0.28)');
        grad.addColorStop(0.5, 'rgba(20, 24, 32, 0.6)');
        grad.addColorStop(1, '#08090C');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const streakY = h * 0.45 + Math.sin(fallbackTime * 0.5) * 15;
        const streakGrad = ctx.createLinearGradient(0, streakY, w, streakY);
        streakGrad.addColorStop(0, 'rgba(0,0,0,0)');
        streakGrad.addColorStop(0.4, 'rgba(80, 160, 180, 0.1)');
        streakGrad.addColorStop(0.5, 'rgba(220, 245, 255, 0.35)');
        streakGrad.addColorStop(0.6, 'rgba(80, 160, 180, 0.1)');
        streakGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = streakGrad;
        ctx.fillRect(0, streakY - 2, w, 4);

        ctx.strokeStyle = 'rgba(242, 242, 242, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < w; x += 6) {
          const freq1 = Math.sin(x * 0.02 + fallbackTime * 3);
          const freq2 = Math.cos(x * 0.04 - fallbackTime * 2);
          const amp = (freq1 + freq2) * 14;
          const y = h * 0.88 + amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (timecodeDisplay) {
          timecodeDisplay.textContent = formatTimecode(fallbackTime);
        }

        if (progressBar) {
          const loopDuration = 90;
          const pct = ((fallbackTime % loopDuration) / loopDuration) * 100;
          progressBar.style.width = `${pct}%`;
        }

        animationFrameId = requestAnimationFrame(drawCinematicLoop);
      }

      return {
        start: () => {
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(drawCinematicLoop);
          }
        },
        stop: () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      };
    }

    const canvasController = initCanvasFallback();

    let hasRealVideo = false;

    function updatePlayStateUI(playing) {
      isPlaying = playing;
      if (playing) {
        container.classList.add('is-playing');
        if (playButton) {
          playButton.innerHTML = '<span>PAUSE</span>';
          playButton.setAttribute('aria-label', 'Pause Project Video');
        }
        if (playOverlay) {
          playOverlay.setAttribute('aria-label', 'Pause Project Video');
        }
      } else {
        container.classList.remove('is-playing');
        if (playButton) {
          playButton.innerHTML = '<span>PLAY</span>';
          playButton.setAttribute('aria-label', 'Play Project Video');
        }
        if (playOverlay) {
          playOverlay.setAttribute('aria-label', 'Play Project Video');
        }
      }
    }

    if (video) {
      if (video.readyState >= 1) {
        hasRealVideo = true;
      }

      video.addEventListener('loadedmetadata', () => {
        hasRealVideo = true;
      });

      video.addEventListener('loadeddata', () => {
        hasRealVideo = true;
      });

      video.addEventListener('canplay', () => {
        hasRealVideo = true;
      });

      video.addEventListener('error', () => {
        hasRealVideo = false;
        if (canvasFallback) canvasFallback.style.display = 'block';
      });

      // Synchronize with native video state events
      video.addEventListener('play', () => {
        hasRealVideo = true;
        if (canvasFallback) canvasFallback.style.display = 'none';
        updatePlayStateUI(true);
      });

      video.addEventListener('pause', () => {
        updatePlayStateUI(false);
      });

      video.addEventListener('ended', () => {
        updatePlayStateUI(false);
        if (progressBar) progressBar.style.width = '0%';
        if (timecodeDisplay) timecodeDisplay.textContent = '00:00:00:00';
      });

      video.addEventListener('timeupdate', () => {
        if (timecodeDisplay) {
          timecodeDisplay.textContent = formatTimecode(video.currentTime);
        }
        if (progressBar && video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          progressBar.style.width = `${pct}%`;
        }
      });
    }

    function togglePlay(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (video) {
        if (video.paused || video.ended) {
          // Hide canvas IMMEDIATELY before play() — critical for Android Chrome
          // where the canvas hardware layer can block the video surface
          if (canvasFallback) canvasFallback.style.display = 'none';

          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              hasRealVideo = true;
              updatePlayStateUI(true);
            }).catch(() => {
              // Retry muted if iOS/Android blocks unmuted autoplay
              video.muted = true;
              if (muteButton) muteButton.textContent = 'UNMUTE';
              video.play().then(() => {
                hasRealVideo = true;
                updatePlayStateUI(true);
              }).catch(() => {
                // Only show canvas fallback if video truly cannot play
                if (canvasFallback) canvasFallback.style.display = 'block';
                canvasController?.start();
                updatePlayStateUI(true);
              });
            });
          }
        } else {
          video.pause();
          updatePlayStateUI(false);
        }
      } else {
        const nextState = !isPlaying;
        updatePlayStateUI(nextState);
        if (nextState) {
          canvasController?.start();
        } else {
          canvasController?.stop();
        }
      }
    }

    // Direct click handlers
    playButton?.addEventListener('click', togglePlay);
    playOverlay?.addEventListener('click', togglePlay);

    // Clicking anywhere on the video player area (outside the controls bar) toggles play/pause
    container.addEventListener('click', (e) => {
      // Don't toggle if clicking on interactive controls
      if (e.target.closest('.player-controls-bar')) return;
      togglePlay(e);
    });

    // Keyboard support: Space or K key to play/pause when player is focused
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlay(e);
      }
    });

    // Stop propagation inside controls bar so child clicks don't double trigger
    const controlsBar = container.querySelector('.player-controls-bar');
    controlsBar?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    if (progressContainer) {
      progressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = progressContainer.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (hasRealVideo && video && video.duration) {
          video.currentTime = pos * video.duration;
          if (progressBar) progressBar.style.width = `${pos * 100}%`;
        } else {
          fallbackTime = pos * 90;
          if (timecodeDisplay) timecodeDisplay.textContent = formatTimecode(fallbackTime);
          if (progressBar) progressBar.style.width = `${pos * 100}%`;
        }
      });
    }

    if (muteButton && video) {
      muteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        muteButton.textContent = video.muted ? 'UNMUTE' : 'MUTE';
      });
    }

    if (fullscreenButton) {
      fullscreenButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          container.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      });
    }
  }

  // --- Tools Interaction ---
  function initToolsInteraction() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card) => {
      card.setAttribute('tabindex', '0');

      const handleEnter = () => {
        toolCards.forEach((c) => {
          if (c !== card) c.classList.add('tool-card-dimmed');
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

  // --- Scroll Reveal ---
  function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // --- Project Modal ---
  function initProjectModal() {
    const modal = document.getElementById('project-detail-modal');
    const openButtons = document.querySelectorAll('[data-open-project]');
    const closeButton = document.getElementById('close-project-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (!modal) return;

    function populateModal(projectId) {
      const project = projects.find((p) => p.id === projectId) || projects[0];
      if (!project) return;

      const modalNumber = modal.querySelector('#modal-project-number');
      const modalTitle = modal.querySelector('#modal-project-title');
      const modalRoles = modal.querySelector('#modal-project-roles');
      const modalTools = modal.querySelector('#modal-project-tools');
      const modalDesc = modal.querySelector('#modal-project-desc');
      const modalProcess = modal.querySelector('#modal-project-process');

      if (modalNumber) modalNumber.textContent = project.number || '01 / 01';
      if (modalTitle) modalTitle.textContent = project.title;
      if (modalDesc) modalDesc.textContent = project.shortDescription;

      if (modalRoles) {
        modalRoles.innerHTML = project.roles
          .map((r) => `<span class="detail-badge">${r}</span>`)
          .join('');
      }

      if (modalTools) {
        modalTools.innerHTML = project.toolsUsed
          .map((t) => `<span class="detail-badge detail-badge-tool">${t}</span>`)
          .join('');
      }

      if (modalProcess && project.processNotes) {
        modalProcess.innerHTML = project.processNotes
          .map(
            (p) => `
            <div class="process-note-card">
              <h4 class="process-note-title">${p.aspect}</h4>
              <p class="process-note-text">${p.note}</p>
            </div>
          `
          )
          .join('');
      }
    }

    function openModal(projectId) {
      populateModal(projectId);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeButton?.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-project-id') || 'project-01';
        openModal(id);
      });
    });

    closeButton?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // --- Document Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initVideoPlayer();
    initToolsInteraction();
    initScrollReveal();
    initProjectModal();

    // Quick Copy Email
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
          window.location.href = `mailto:${email}`;
        }
      });
    }

    // Smooth scroll for hash anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
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

    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
})();
