/// <reference types="jest" />
import { getUserCoordinates } from "../geo";

describe("getUserCoordinates", () => {
  const mockCoords: GeolocationCoordinates = {
    latitude: 49.4305219,
    longitude: 32.0544487,
    altitude: null,
    accuracy: 10,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    toJSON() {
      return this;
    },
  };

  const mockPosition: GeolocationPosition = {
    coords: mockCoords,
    timestamp: Date.now(),
    toJSON() {
      return this;
    },
  };

  const getCurrentPositionMock = jest.fn((success: PositionCallback) => {
    success(mockPosition);
  });

  beforeEach(() => {
    if (!("navigator" in globalThis)) {
      Object.defineProperty(globalThis, "navigator", {
        value: {},
        configurable: true,
      });
    }

    Object.defineProperty(globalThis.navigator, "geolocation", {
      value: {
        getCurrentPosition: getCurrentPositionMock,
        watchPosition: jest.fn(),
        clearWatch: jest.fn(),
      },
      configurable: true,
    });
  });

  it("resolves with user coordinates", async () => {
    const coords = await getUserCoordinates();
    expect(coords).toEqual(mockCoords);
  });

  it("rejects if geolocation is not available", async () => {
    Object.defineProperty(globalThis.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });

    await expect(getUserCoordinates()).rejects.toThrow(
      "Geolocation not supported",
    );
  });
});
