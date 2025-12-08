/**
 * API Configuration
 * Update API_BASE_URL with your Azure Web App URL
 */

// Replace with your actual Azure Web App URL
const API_BASE_URL = 'https://clubhub-api-gbfvc9bpapd0ccag.canadacentral-01.azurewebsites.net/api';

// Alternative: Use environment-based configuration
// const API_BASE_URL = window.location.hostname === 'localhost' 
//   ? 'http://localhost:3000/api'
//   : 'https://clubhub-api-gbfvc9bpapd0ccag.canadacentral-01.azurewebsites.net/api';

export { API_BASE_URL };
