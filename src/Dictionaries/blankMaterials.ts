export const Material = {
  Steel: 'steel',
  CastIron: 'castIron',
  Aluminum: 'aluminum',
  Copper: 'copper',
} as const;

export type Material = (typeof Material)[keyof typeof Material];

export interface BlankMaterial {
  id: Material;
  label: string;
}

export const blankMaterials: BlankMaterial[] = [
  { id: Material.Steel, label: 'Сталь' },
  { id: Material.CastIron, label: 'Чугун' },
  { id: Material.Aluminum, label: 'Алюминий' },
  { id: Material.Copper, label: 'Медь' },
];