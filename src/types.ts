// Types for conversion app

export type ConversionCategory =
  | 'comprimento'
  | 'massa'
  | 'volume'
  | 'temperatura'
  | 'velocidade'
  | 'astronomia'
  | 'peso-coreano'
  | 'volume-coreano'
  | 'distancia-coreana';

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
  astronomia: [
    { name: 'Unidade Astronômica', symbol: 'UA', icon: '🌌' },
    { name: 'Ano-luz', symbol: 'ly', icon: '⭐' },
    { name: 'Parsec', symbol: 'pc', icon: '🌠' },
  ],
  'peso-coreano': [
    { name: 'Pun', symbol: '푼', icon: '⚖️' },
    { name: 'Don', symbol: '돈', icon: '🪙' },
    { name: 'Nyang', symbol: '냥', icon: '⚖️' },
    { name: 'Geun (carne)', symbol: '근(고기)', icon: '🥩' },
    { name: 'Geun (vegetais)', symbol: '근(채소)', icon: '🥬' },
    { name: 'Gwan', symbol: '관', icon: '🧱' },
  ],
  'volume-coreano': [
    { name: 'Jak', symbol: '작', icon: '🥃' },
    { name: 'Hop', symbol: '홉', icon: '🍶' },
    { name: 'Doe', symbol: '되', icon: '🫙' },
    { name: 'Mal', symbol: '말', icon: '🪣' },
    { name: 'Seom', symbol: '섬', icon: '🛢️' },
  ],
  'distancia-coreana': [
    { name: 'Pun', symbol: '푼', icon: '📏' },
    { name: 'Chi', symbol: '치', icon: '📐' },
    { name: 'Ja', symbol: '자', icon: '🧵' },
    { name: 'Gan', symbol: '간', icon: '🚶' },
    { name: 'Jeong', symbol: '정', icon: '🏯' },
    { name: 'Ri', symbol: '리', icon: '🛣️' },
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

const toUA: Record<string, number> = {
  UA: 1,
  ly: 63241.077,
  pc: 206264.806,
};

const toGrams: Record<string, number> = {
  '푼': 0.375,
  '돈': 3.75,
  '냥': 37.5,
  '근(고기)': 600,
  '근(채소)': 375,
  '관': 3750,
};

const toKoreanLiters: Record<string, number> = {
  '작': 0.018039,
  '홉': 0.18039,
  '되': 1.8039,
  '말': 18.039,
  '섬': 180.39,
};

const toKoreanMeters: Record<string, number> = {
  '푼': 10 / 3300,
  '치': 10 / 330,
  '자': 10 / 33,
  '간': 20 / 11,
  '정': 3600 / 33,
  '리': 1296 * 10 / 33,
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

export function convertAstronomy(value: number, from: string, to: string): number {
  const ua = value * (toUA[from] || 1);
  return ua / (toUA[to] || 1);
}

export function convertKoreanWeight(value: number, from: string, to: string): number {
  const grams = value * (toGrams[from] || 1);
  return grams / (toGrams[to] || 1);
}

export function convertKoreanVolume(value: number, from: string, to: string): number {
  const liters = value * (toKoreanLiters[from] || 1);
  return liters / (toKoreanLiters[to] || 1);
}

export function convertKoreanLength(value: number, from: string, to: string): number {
  const meters = value * (toKoreanMeters[from] || 1);
  return meters / (toKoreanMeters[to] || 1);
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
    case 'astronomia':
      return convertAstronomy(value, from, to);
    case 'peso-coreano':
      return convertKoreanWeight(value, from, to);
    case 'volume-coreano':
      return convertKoreanVolume(value, from, to);
    case 'distancia-coreana':
      return convertKoreanLength(value, from, to);
    default:
      return value;
  }
}

export function formatResult(value: number): string {
  if (!isFinite(value)) return '0';
  if (value === 0 || Number.isInteger(value)) {
    return value.toString();
  }
  const abs = Math.abs(value);
  if (abs < 0.000001 || abs >= 1000000000000000) {
    return value.toExponential(4).replace('.', ',');
  }
  return Number(value.toPrecision(6)).toString().replace('.', ',');
}