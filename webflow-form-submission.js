/**
 * Webflow Form Submission Script
 * Creates a new mobile app user via API
 * 
 * Instructions:
 * 1. Add this script to your Webflow page (before </body> tag)
 * 2. Replace YOUR_ADMIN_JWT_TOKEN with your actual JWT token
 * 3. Make sure your form has the ID "user-form"
 * 4. Ensure input fields have the correct IDs: #email, #temporary-password, #clientId
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiEndpoint: 'https://sitrixx-website-backend.vercel.app/api/admin/users',
    adminToken: 'YOUR_ADMIN_JWT_TOKEN', // Replace with your actual token
    formId: 'user-form',
    minPasswordLength: 8
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const form = document.getElementById(CONFIG.formId);
    
    if (!form) {
      console.error('Form not found. Make sure your form has id="user-form"');
      return;
    }

    // Prevent default Webflow form submission
    form.addEventListener('submit', handleFormSubmit);
    console.log('✅ Form submission handler initialized');
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('🚀 Form submission started...');

    // Clear any previous messages
    clearMessages();

    // Get form values
    const email = getInputValue('email');
    const temporaryPassword = getInputValue('temporary-password');
    const clientId = getInputValue('clientId');

    // Validate inputs
    const validationError = validateInputs(email, temporaryPassword, clientId);
    if (validationError) {
      showError(validationError);
      return;
    }

    // Prepare request payload
    const payload = {
      email: email.trim(),
      password: temporaryPassword,
      clientId: clientId.trim(),
      role: 'client_owner'
    };

    // Log payload for debugging (password hidden in production)
    console.log('📦 Request Payload:', {
      ...payload,
      password: '********' // Hide password in logs
    });

    // Show loading state
    showLoading();

    try {
      // Send POST request
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.adminToken}`
        },
        body: JSON.stringify(payload)
      });

      // Parse response
      const data = await response.json();

      // Handle response
      if (response.ok) {
        console.log('✅ User created successfully:', data);
        showSuccess('User created successfully! 🎉');
        resetForm();
      } else {
        // Extract error message from API response
        const errorMessage = data.message || data.error || 'Failed to create user';
        console.error('❌ API Error:', data);
        showError(errorMessage);
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      showError('Network error. Please check your connection and try again.');
    } finally {
      hideLoading();
    }
  }

  function getInputValue(id) {
    const input = document.getElementById(id);
    if (!input) {
      console.warn(`Input with id="${id}" not found`);
      return '';
    }
    return input.value || '';
  }

  function validateInputs(email, temporaryPassword, clientId) {
    // Check for empty fields
    if (!email || !email.trim()) {
      return 'Email is required';
    }

    if (!temporaryPassword) {
      return 'Temporary password is required';
    }

    if (!clientId || !clientId.trim()) {
      return 'Client ID is required';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }

    // Validate password length
    if (temporaryPassword.length < CONFIG.minPasswordLength) {
      return `Temporary password must be at least ${CONFIG.minPasswordLength} characters long`;
    }

    // All validations passed
    return null;
  }

  function showSuccess(message) {
    const messageDiv = createMessageElement(message, 'success');
    displayMessage(messageDiv);
  }

  function showError(message) {
    const messageDiv = createMessageElement(message, 'error');
    displayMessage(messageDiv);
  }

  function showLoading() {
    const form = document.getElementById(CONFIG.formId);
    const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('data-original-text', submitButton.value || submitButton.textContent);
      
      if (submitButton.tagName === 'INPUT') {
        submitButton.value = 'Creating user...';
      } else {
        submitButton.textContent = 'Creating user...';
      }
    }
  }

  function hideLoading() {
    const form = document.getElementById(CONFIG.formId);
    const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
    
    if (submitButton) {
      submitButton.disabled = false;
      const originalText = submitButton.getAttribute('data-original-text');
      
      if (originalText) {
        if (submitButton.tagName === 'INPUT') {
          submitButton.value = originalText;
        } else {
          submitButton.textContent = originalText;
        }
      }
    }
  }

  function createMessageElement(message, type) {
    const div = document.createElement('div');
    div.className = `form-message form-message--${type}`;
    div.textContent = message;
    div.setAttribute('role', 'alert');
    
    // Add inline styles for better visibility
    div.style.padding = '12px 16px';
    div.style.marginTop = '16px';
    div.style.borderRadius = '4px';
    div.style.fontSize = '14px';
    div.style.fontWeight = '500';
    
    if (type === 'success') {
      div.style.backgroundColor = '#d4edda';
      div.style.color = '#155724';
      div.style.border = '1px solid #c3e6cb';
    } else {
      div.style.backgroundColor = '#f8d7da';
      div.style.color = '#721c24';
      div.style.border = '1px solid #f5c6cb';
    }
    
    return div;
  }

  function displayMessage(messageElement) {
    const form = document.getElementById(CONFIG.formId);
    const existingMessage = form.querySelector('.form-message');
    
    if (existingMessage) {
      existingMessage.remove();
    }
    
    form.appendChild(messageElement);
    
    // Scroll message into view
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearMessages() {
    const form = document.getElementById(CONFIG.formId);
    const existingMessage = form.querySelector('.form-message');
    
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  function resetForm() {
    const form = document.getElementById(CONFIG.formId);
    
    if (form) {
      // Clear all input fields
      const inputs = ['email', 'temporary-password', 'clientId'];
      inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.value = '';
        }
      });
      
      // Optionally reset the entire form
      form.reset();
    }
  }

  // Expose utility function for testing
  window.testFormSubmission = function() {
    console.log('🧪 Testing form submission with dummy data...');
    const form = document.getElementById(CONFIG.formId);
    if (form) {
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('temporary-password').value = 'testpassword123';
      document.getElementById('clientId').value = 'test-client-id';
      form.dispatchEvent(new Event('submit'));
    }
  };

})();
