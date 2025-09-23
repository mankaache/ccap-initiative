import { performScheduledCleanup } from "@/firebase/services/projectService";

/**
 * Setup automatic cleanup that runs daily
 * This function should be called when your app initializes
 */
export function initializeCleanupScheduler() {
  // Run cleanup immediately on app start (optional)
  performScheduledCleanup().catch(console.error);
  
  // Schedule cleanup to run every 24 hours (86400000 ms)
  setInterval(() => {
    performScheduledCleanup().catch(console.error);
  }, 24 * 60 * 60 * 1000); // 24 hours
  
  console.log("Cleanup scheduler initialized - will run every 24 hours");
}

/**
 * Manual cleanup trigger (for testing or admin use)
 */
export async function triggerManualCleanup(): Promise<void> {
  try {
    await performScheduledCleanup();
    console.log("Manual cleanup completed successfully");
  } catch (error) {
    console.error("Manual cleanup failed:", error);
    throw error;
  }
}
