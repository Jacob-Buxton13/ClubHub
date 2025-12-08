/**
 * Colleges Page Script
 * Fetches categories and clubs from Azure API and displays them grouped by college
 */

import { getCategories, getClubsInCategory } from './apiService.js';

let allCategories = [];

/**
 * Initialize the colleges page
 */
async function init() {
  try {
    showLoading();
    
    // Fetch all categories
    allCategories = await getCategories();
    
    // Filter to only show college-based categories
    const collegeCategories = allCategories.filter(cat => 
      cat.name && cat.name.toLowerCase().includes('college')
    );
    
    // Display categories with their clubs
    await displayColleges(collegeCategories);
    
    // Set up search functionality
    setupSearch();
  } catch (error) {
    showError('Failed to load colleges and clubs. Please try again later.');
    console.error('Initialization error:', error);
  }
}

/**
 * Display colleges and their clubs
 */
async function displayColleges(categories) {
  const container = document.querySelector('.colleges-container');
  
  if (!categories || categories.length === 0) {
    container.innerHTML = '<p class="no-results">No colleges found.</p>';
    return;
  }
  
  // Build HTML for each college category
  const collegesHTML = await Promise.all(categories.map(async (category) => {
    try {
      // Fetch clubs for this category
      const clubs = await getClubsInCategory(category.id);
      
      const clubsHTML = clubs && clubs.length > 0
        ? clubs.map(club => `
            <li class="society-link">
              <a href="society_profile.html?id=${club.id}">${escapeHtml(club.name)}</a>
            </li>
          `).join('')
        : '<li class="no-clubs">No clubs available</li>';
      
      return `
        <section class="college">
          <details name="current-details">
            <summary>${escapeHtml(category.name)} ${category.club_count ? `(${category.club_count})` : ''}</summary>
            <ul class="society-list">
              ${clubsHTML}
            </ul>
          </details>
        </section>
      `;
    } catch (error) {
      console.error(`Error loading clubs for ${category.name}:`, error);
      return `
        <section class="college">
          <details name="current-details">
            <summary>${escapeHtml(category.name)}</summary>
            <ul class="society-list">
              <li class="error">Failed to load clubs</li>
            </ul>
          </details>
        </section>
      `;
    }
  }));
  
  container.innerHTML = collegesHTML.join('');
}

/**
 * Set up search functionality
 */
function setupSearch() {
  const form = document.querySelector('.college-search-form');
  const searchInput = document.querySelector('.search-input');
  
  if (!form || !searchInput) return;
  
  // Live filtering
  searchInput.addEventListener('input', filterColleges);
  
  // Filter on submit
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    filterColleges();
  });
}

/**
 * Filter colleges based on search input
 */
function filterColleges() {
  const searchInput = document.querySelector('.search-input');
  const colleges = document.querySelectorAll('.college');
  const text = searchInput.value.toLowerCase();
  
  colleges.forEach(college => {
    const collegeName = college.querySelector('summary').textContent.toLowerCase();
    
    if (collegeName.includes(text)) {
      college.style.display = '';
    } else {
      college.style.display = 'none';
    }
  });
}

/**
 * Show loading state
 */
function showLoading() {
  const container = document.querySelector('.colleges-container');
  container.innerHTML = '<p class="loading">Loading colleges and clubs...</p>';
}

/**
 * Show error message
 */
function showError(message) {
  const container = document.querySelector('.colleges-container');
  container.innerHTML = `<p class="error">${escapeHtml(message)}</p>`;
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
