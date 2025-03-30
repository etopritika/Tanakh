// =================== GEO ===================

/**
 * Returns user's coordinates via browser geolocation API.
 * Falls back to error if denied or unavailable.
 * @returns Promise with GeolocationCoordinates
 */
export const getUserCoordinates = (): Promise<GeolocationCoordinates> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        reject,
      );
    }
  });
