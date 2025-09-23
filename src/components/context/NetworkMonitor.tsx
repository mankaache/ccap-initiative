// utils/networkErrorHandler.js

import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';

class NetworkErrorHandler {
  constructor() {
    //@ts-ignore
    this.isOnline = navigator.onLine;
    this.init();
  }

  init() {
    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Monitor Firebase connection errors
    this.monitorFirebaseErrors();
  }

  handleOnline() {
    //@ts-ignore
    this.isOnline = true;
    console.log('Connection restored');
    // Re-enable Firestore network if needed
    enableNetwork(getFirestore());
  }

  handleOffline() {
    //@ts-ignore
    this.isOnline = false;
    console.log('Connection lost');
    // Optionally disable Firestore network to prevent errors
    disableNetwork(getFirestore());
  }

  monitorFirebaseErrors() {
    // Global error handler for Firebase operations
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        //@ts-ignore
      if (!this.isOnline) {
        throw new Error('No internet connection');
      }
      
      try {
        const response = await originalFetch(...args);
        return response;
      } catch (error) {
        if (this.isConnectionError(error)) {
          this.handleConnectionError(error);
        }
        throw error;
      }
    };
  }

  isConnectionError(error:any) {
    return (
      !navigator.onLine ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('Network Error') ||
      error.code === 'unavailable' ||
      error.code === 'auth/network-request-failed'
    );
  }

  handleConnectionError(error:any) {
    // Show global notification or update app state
    this.showGlobalError('Connection error. Please check your internet.');
  }

  showGlobalError(message:any) {
    // Simple notification - you can customize this
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 10000;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 5000);
  }
}

export const networkErrorHandler = new NetworkErrorHandler();