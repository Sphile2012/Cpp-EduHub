import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function ClearCacheButton() {
  const handleClearCache = async () => {
    try {
      // Clear service worker cache
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      
      // Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error clearing cache:', error);
      // Force reload anyway
      window.location.reload();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClearCache}
      className="fixed bottom-4 right-4 z-50 shadow-lg"
      title="Clear cache and reload"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      Clear Cache
    </Button>
  );
}
