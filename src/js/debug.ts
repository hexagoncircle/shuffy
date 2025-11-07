/**
 * Log a message to the console if the DEBUG_MODE environment variable is true.
 * @param message Message to log.
 * @param valueOrFn Value or function to log.
 */
export const debugLog = (message: string, valueOrFn: unknown = null) => {
  if (!(import.meta.env.VITE_DEBUG_MODE || import.meta.env.DEV)) return;

  if (valueOrFn === null) {
    console.log(message);
    return;
  }

  const value = typeof valueOrFn === "function" ? valueOrFn() : valueOrFn;

  console.log(message, value);
};
