export interface Point {
  id: string;
  name: string;
  coordX: number;
  coordY: number;
}

export interface Material {
  id: string;
  name: string;
  points: string[];
  layers: Record<string, string>;
  materialPreview: string;
}

export type MaterialsByPoint = Record<string, Material[]>;
