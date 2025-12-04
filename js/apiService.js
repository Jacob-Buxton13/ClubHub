/**
 * API Service
 * Handles all API calls to the Azure backend
 */

import { API_BASE_URL } from './config.js';

/**
 * Fetch all clubs/societies
 * @returns {Promise<Array>} Array of club objects
 */
export async function getClubs() {
  try {
    const response = await fetch(`${API_BASE_URL}/clubs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data; // Handle different response formats
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
}

/**
 * Fetch clubs by category
 * @param {string} categoryName - Category name to filter by
 * @returns {Promise<Array>} Array of club objects
 */
export async function getClubsByCategory(categoryName) {
  try {
    const response = await fetch(`${API_BASE_URL}/clubs?category=${encodeURIComponent(categoryName)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching clubs by category:', error);
    throw error;
  }
}

/**
 * Get all categories
 * @returns {Promise<Array>} Array of category objects with club counts
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get clubs for a specific category
 * @param {number} categoryId - Category ID
 * @returns {Promise<Array>} Array of club objects
 */
export async function getClubsInCategory(categoryId) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/clubs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching clubs in category:', error);
    throw error;
  }
}

/**
 * Get a single club by ID or slug
 * @param {number|string} clubId - Club ID or slug
 * @returns {Promise<Object>} Club object
 */
export async function getClubById(clubId) {
  try {
    const response = await fetch(`${API_BASE_URL}/clubs/${clubId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching club details:', error);
    throw error;
  }
}
