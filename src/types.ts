// Types for conversion app

export type ConversionCategory = 'comprimento' | 'massa' | 'volume' | 'temperatura' | 'velocidade';

export interface ConversionRecord {
  id: number;
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  category: ConversionCategory;
  timestamp: Date;
}

export interface UnitInfo {
  name: string;
  symbol: string;
  icon: string;
}

// Unit definitions
export const UNITS: Record<ConversionCategory, UnitInfo[]> = {
  comprimento: [
    { name: 'Metro', symbol: 'm', icon: '📏' },
    { name: 'Quilômetro', symbol: 'km', icon: '🛣️' },
    { name: 'Centímetro', symbol: 'cm', icon: '📐' },
    { name: 'Polegada', symbol: 'in', icon: '📏' },
    { name: 'Jardas', symbol: 'yd', icon: '🏃' },
    { name: 'Pés', symbol: 'ft', icon: '👟' },
    { name: 'Milhas', symbol: 'mi', icon: '🛤️' },
    { name: 'Leguas', symbol: 'lea', icon: '🌄' },
  ],
  massa: [
    { name: 'Quilograma', symbol: 'kg', icon: '⚖️' },
    { name: 'Grama', symbol: 'g', icon: '🔬' },
    { name: 'Libra', symbol: 'lb', icon: '⚖️' },
  ],
  volume: [
    { name: 'Litro', symbol: 'L', icon: '🧪' },
    { name: 'Metro Cúbico', symbol: 'm³', icon: '📦' },
    { name: 'Mililitro', symbol: 'mL', icon: '💧' },
    { name: 'Galão', symbol: 'gal', icon: '🛢️' },
  ],
  temperatura: [
    { name: 'Kelvin', symbol: 'K', icon: '🌡️' },
    { name: 'Celsius', symbol: '°C', icon: '🌡️' },
    { name: 'Fahrenheit', symbol: '°F', icon: '🌡️' },
  ],
  velocidade: [
    { name: 'km/h', symbol: 'km/h', icon: '🚗' },
    { name: 'mph', symbol: 'mph', icon: '🏎️' },
    { name: 'Nós', symbol: 'kn', icon: '⛵' },
    { name: 'm/s', symbol: 'm/s', icon: '🏃' },
  ],
};

// Conversion functions
const toMeters: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  in: 0.0254,
  yd: 0.9144,
  ft: 0.3048,
  mi: 1609.344,
  lea: 4828.032,
};

const toKilograms: Record<string, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.453592,
};

const toLiters: Record<string, number> = {
  L: 1,
  'm³': 1000,
  mL: 0.001,
  gal: 3.78541,
};

const toKmh: Record<string, number> = {
  'km/h': 1,
  mph: 1.60934,
  kn: 1.852,
  'm/s': 3.6,
};

export function convertLength(value: number, from: string, to: string): number {
  const meters = value * (toMeters[from] || 1);
  return meters / (toMeters[to] || 1);
}

export function convertMass(value: number, from: string, to: string): number {
  const kg = value * (toKilograms[from] || 1);
  return kg / (toKilograms[to] || 1);
}

export function convertVolume(value: number, from: string, to: string): number {
  const liters = value * (toLiters[from] || 1);
  return liters / (toLiters[to] || 1);
}

export function convertTemperature(value: number, from: string, to: string): number {
  // First convert to Celsius
  let celsius: number;
  switch (from) {
    case 'K':
      celsius = value - 273.15;
      break;
    case '°C':
      celsius = value;
      break;
    case '°F':
      celsius = (value - 32) * 5 / 9;
      break;
    default:
      celsius = value;
  }
  
  // Then convert from Celsius to target
  switch (to) {
    case 'K':
      return celsius + 273.15;
    case '°C':
      return celsius;
    case '°F':
      return celsius * 9 / 5 + 32;
    default:
      return celsius;
  }
}

export function convertSpeed(value: number, from: string, to: string): number {
  const kmh = value * (toKmh[from] || 1);
  return kmh / (toKmh[to] || 1);
}

export function convert(category: ConversionCategory, value: number, from: string, to: string): number {
  switch (category) {
    case 'comprimento':
      return convertLength(value, from, to);
    case 'massa':
      return convertMass(value, from, to);
    case 'volume':
      return convertVolume(value, from, to);
    case 'temperatura':
      return convertTemperature(value, from, to);
    case 'velocidade':
      return convertSpeed(value, from, to);
    default:
      return value;
  }
}

export function formatResult(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(2).replace('.', ',');
}