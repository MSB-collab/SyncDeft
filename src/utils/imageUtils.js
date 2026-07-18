// src/utils/imageUtils.js

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app';

const DEFAULT_BLOG_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23f9c349">TDC.USA</text></svg>`;

const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23cbd5e1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="24" fill="%23475569">User</text></svg>`;

const DEFAULT_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23475569">Logo</text></svg>`;

// Cache for image URLs to avoid recalculating
const imageCache = new Map();

// Get the base URL without /api for images
const getImageBaseUrl = () => {
  // Remove /api from the end if present
  let baseUrl = API_BASE_URL;
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  // Remove trailing slash if present
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return baseUrl;
};

export const getImageUrl = (imagePath) => {
  // Check cache first
  if (imageCache.has(imagePath)) {
    return imageCache.get(imagePath);
  }

  // Handle empty or null image path
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined' || imagePath === '') {
    const fallback = 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=No+Image';
    imageCache.set(imagePath || 'null', fallback);
    return fallback;
  }

  // If it's already a full URL or data URL, return as is
  if (imagePath.startsWith('http://') || 
      imagePath.startsWith('https://') || 
      imagePath.startsWith('data:')) {
    imageCache.set(imagePath, imagePath);
    return imagePath;
  }

  // Clean up the image path - remove duplicate slashes
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  
  // Remove any double slashes
  cleanPath = cleanPath.replace(/\/\//g, '/');

  // Get base URL and ensure it doesn't end with slash
  const baseUrl = getImageBaseUrl();
  
  // Construct full URL
  let fullUrl = `${baseUrl}/${cleanPath}`;
  
  // Remove any duplicate slashes in the full URL
  fullUrl = fullUrl.replace(/([^:]\/)\/+/g, '$1');
  
  // Cache the result
  imageCache.set(imagePath, fullUrl);
  
  return fullUrl;
};

// Preload image function to ensure images load
export const preloadImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    if (!imagePath) {
      resolve(null);
      return;
    }
    
    const url = getImageUrl(imagePath);
    if (!url || url.startsWith('data:')) {
      resolve(null);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

export const handleImageError = (e) => {
  e.target.onerror = null;
  
  // Try to get a clean URL without cache busting
  const currentSrc = e.target.src;
  
  // If it already has a retry parameter, use a permanent fallback
  if (currentSrc.includes('retry=')) {
    // Use a more reliable fallback
    const fallbacks = [
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="28" fill="%23E5B63E">Project</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2364748b">No Image Available</text></svg>',
      'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=Project'
    ];
    
    // Try different fallbacks
    for (let fallback of fallbacks) {
      if (e.target.src !== fallback) {
        e.target.src = fallback;
        return;
      }
    }
    return;
  }
  
  // First attempt: retry with cache busting
  const retryUrl = currentSrc.includes('?') 
    ? `${currentSrc}&retry=${Date.now()}`
    : `${currentSrc}?retry=${Date.now()}`;
  
  e.target.src = retryUrl;
};

export const getTestimonialImageUrl = (imagePath, isLogo = false) => {
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    return isLogo ? DEFAULT_LOGO : DEFAULT_AVATAR;
  }
  
  if (imagePath.startsWith('http://') || 
      imagePath.startsWith('https://') || 
      imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  const baseUrl = getImageBaseUrl();
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  cleanPath = cleanPath.replace(/\/\//g, '/');
  
  const fullUrl = `${baseUrl}/${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
  return fullUrl;
};

export const getCategoryIcon = (category) => {
  const catLower = category?.toLowerCase() || '';
  if (catLower.includes('web development') || catLower === 'web development') {
    return 'fa-solid fa-globe';
  }
  if (catLower.includes('mobile application') || catLower.includes('mobile app')) {
    return 'fa-solid fa-mobile-screen-button';
  }
  if (catLower.includes('saas platform') || catLower.includes('saas')) {
    return 'fa-solid fa-layer-group';
  }
  if (catLower.includes('ai solution') || catLower.includes('ai ') || catLower.includes('artificial intelligence')) {
    return 'fa-solid fa-brain';
  }
  if (catLower.includes('cloud solution') || catLower.includes('cloud')) {
    return 'fa-solid fa-cloud';
  }
  if (catLower.includes('e-commerce') || catLower.includes('ecommerce')) {
    return 'fa-solid fa-cart-shopping';
  }
  if (catLower.includes('healthcare') || catLower.includes('medical')) {
    return 'fa-solid fa-heart';
  }
  if (catLower.includes('fintech') || catLower.includes('finance') || catLower.includes('payment')) {
    return 'fa-solid fa-wallet';
  }
  return null;
};

// Export the base URL for use in other components
export { API_BASE_URL };