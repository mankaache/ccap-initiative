"use client";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-primary border-b-secondary border-l-transparent border-r-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-lg font-medium text-primary animate-pulse">
        Loading, please wait...
      </p>

      {/* Optional subtle animated background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse-slow"></div>
      </div>
    </div>
  );
}
