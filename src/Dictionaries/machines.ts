export interface Machine {
  id: string;
  label: string;
  power: number; // кВт
  maxRpm: number; // об/мин
}

export const machines: Machine[] = [
  { id: '2n135', label: '2Н135', power: 4.5, maxRpm: 1400 },
  { id: '2n125', label: '2Н125', power: 2.8, maxRpm: 2000 },
  { id: '2a135', label: '2А135', power: 4.5, maxRpm: 1410 },
  { id: '2s132', label: '2С132', power: 4.0, maxRpm: 2000 },
];