/**
 * Main Script for Club Hub Home Page
 * Fetches clubs from Azure API and displays them with search functionality
 */

import { getClubs } from './apiService.js';

let allClubs = [];

/**
 * Initialize the page
 */
async function init() {
  try {
    // Show loading state
    showLoading();
    
    // Fetch clubs from API
    const response = await getClubs();
    allClubs = response;
    
    // Display clubs
    displayClubs(allClubs);
    
    // Set up search functionality
    setupSearch();
  } catch (error) {
    showError('Failed to load clubs. Please try again later.');
    console.error('Initialization error:', error);
  }
}

/**
 * Display clubs in the society list
 */
function displayClubs(clubs) {
  const societyList = document.querySelector('.society-list');
  
  if (!clubs || clubs.length === 0) {
    societyList.innerHTML = '<p class="no-results">No clubs found.</p>';
    return;
  }
  
  societyList.innerHTML = clubs.map(club => {
    const description = club.description || 'No description available.';
    const truncatedDesc = description.length > 150 
      ? description.substring(0, 150) + '...' 
      : description;
    
    return `
      <article class="society-card">
        <h3>${escapeHtml(club.name)}</h3>
        <p>${escapeHtml(truncatedDesc)}</p>
        ${club.meeting_time ? `<p class="meeting-info">📅 ${escapeHtml(club.meeting_time)}</p>` : ''}
        ${club.meeting_location ? `<p class="meeting-info">📍 ${escapeHtml(club.meeting_location)}</p>` : ''}
      </article>
    `;
  }).join('');
}

/**
 * Set up search functionality
 */
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (!searchInput) return;
  
  let debounceTimer;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    
    const query = e.target.value.trim().toLowerCase();
    
    debounceTimer = setTimeout(() => {
      if (query === '') {
        displayClubs(allClubs);
      } else {
        // Client-side filtering
        const filtered = allClubs.filter(club => 
          club.name.toLowerCase().includes(query) ||
          (club.description && club.description.toLowerCase().includes(query))
        );
        displayClubs(filtered);
      }
    }, 300); // Debounce delay
  });
}

/**
 * Show loading state
 */
function showLoading() {
  const societyList = document.querySelector('.society-list');
  societyList.innerHTML = '<p class="loading">Loading clubs...</p>';
}

/**
 * Show error message
 */
function showError(message) {
  const societyList = document.querySelector('.society-list');
  societyList.innerHTML = `<p class="error">${escapeHtml(message)}</p>`;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
