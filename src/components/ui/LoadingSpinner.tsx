export interface LoadingSpinnerProps {
  message?: string;
  progress?: number;
}

export function LoadingSpinner({ message = "Processing...", progress }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-uw-purple/20 border-t-uw-purple rounded-full animate-spin mb-4" />

          {/* Message */}
          <p className="text-lg font-semibold text-gray-900 mb-2">{message}</p>

          {/* Progress Bar */}
          {progress !== undefined && (
            <div className="w-full mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-uw-purple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">{progress}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
