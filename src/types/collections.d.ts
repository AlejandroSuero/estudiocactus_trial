export interface Points {
  id: string;
  name: string;
  coordX: number;
  coordY: number;
}

export interface Materials {
  id: string;
  name: string;
  points: string[];
  layers: Record<string, string>;
  materialPreview: string;
}
