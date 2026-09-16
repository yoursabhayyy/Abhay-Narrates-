/**
 * Reusable Project Detail Modal Module
 * Allows in-depth review of editorial decisions, tools, and roles
 * Supports 1 project today and scales to any number in future.
 */

import { projects } from '../data/projects.js';

export function initProjectModal() {
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
    const modalYear = modal.querySelector('#modal-project-year');
    const modalCategory = modal.querySelector('#modal-project-category');
    const modalRoles = modal.querySelector('#modal-project-roles');
    const modalTools = modal.querySelector('#modal-project-tools');
    const modalDesc = modal.querySelector('#modal-project-desc');
    const modalProcess = modal.querySelector('#modal-project-process');

    if (modalNumber) modalNumber.textContent = project.number || '01 / 01';
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalYear) modalYear.textContent = project.year;
    if (modalCategory) modalCategory.textContent = project.category;
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
