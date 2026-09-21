/**
 * Cinematic Video Player Module
 * Supports HTML5 video playback, timecode counters, custom controls,
 * and fallback ambient film reel animation if local mp4 is pending.
 */

export function initVideoPlayer() {
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

  // Format seconds into SMPTE-style timecode: HH:MM:SS:FF (24fps)
  function formatTimecode(seconds) {
    if (isNaN(seconds) || seconds < 0) seconds = 0;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24);

    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
  }

  // Fallback Canvas Cinematic Loop (active when video file is not yet provided)
  function initCanvasFallback() {
    if (!canvasFallback) return;
    const ctx = canvasFallback.getContext('2d');
    if (!ctx) return;

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

      // Dark cinematic base
      ctx.fillStyle = '#0B0C10';
      ctx.fillRect(0, 0, w, h);

      // Ambient horizon glow
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

      // Subtle shifting anamorphic light streak
      const streakY = h * 0.45 + Math.sin(fallbackTime * 0.5) * 15;
      const streakGrad = ctx.createLinearGradient(0, streakY, w, streakY);
      streakGrad.addColorStop(0, 'rgba(0,0,0,0)');
      streakGrad.addColorStop(0.4, 'rgba(80, 160, 180, 0.1)');
      streakGrad.addColorStop(0.5, 'rgba(220, 245, 255, 0.35)');
      streakGrad.addColorStop(0.6, 'rgba(80, 160, 180, 0.1)');
      streakGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(0, streakY - 2, w, 4);

      // Moving audio soundbed waveform visualization at bottom
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

      // Film timecode update
      if (timecodeDisplay) {
        timecodeDisplay.textContent = formatTimecode(fallbackTime);
      }

      // Progress simulation (loop every 90s)
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
      if (canvasFallback) canvasFallback.style.display = 'none';
    }

    video.addEventListener('loadedmetadata', () => {
      hasRealVideo = true;
      if (canvasFallback) canvasFallback.style.display = 'none';
    });

    video.addEventListener('loadeddata', () => {
      hasRealVideo = true;
      if (canvasFallback) canvasFallback.style.display = 'none';
    });

    video.addEventListener('canplay', () => {
      hasRealVideo = true;
      if (canvasFallback) canvasFallback.style.display = 'none';
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
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            hasRealVideo = true;
            if (canvasFallback) canvasFallback.style.display = 'none';
            updatePlayStateUI(true);
          }).catch(() => {
            // Retry muted if iOS blocks unmuted playback
            video.muted = true;
            if (muteButton) muteButton.textContent = 'UNMUTE';
            video.play().then(() => {
              hasRealVideo = true;
              if (canvasFallback) canvasFallback.style.display = 'none';
              updatePlayStateUI(true);
            }).catch(() => {
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
      muteButton.setAttribute('aria-pressed', String(!video.muted));
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
