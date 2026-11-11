export interface Tool {
  id: string;
  label: string;
  image: string;
}

export const toolTypes: Tool[] = [
  {
    id: 'cylindrical',
    label: 'Цилиндрический зенкер',
    image: '/images/tools/cylindrical.png',
  },
  {
    id: 'conical',
    label: 'Конический зенкер',
    image: '/images/tools/conical.png',
  },
  {
    id: 'face',
    label: 'Торцовый зенкер',
    image: '/images/tools/face.png',
  },
  {
    id: 'combined',
    label: 'Комбинированный зенкер',
    image: '/images/tools/combined.png',
  },
];

export const toolMaterials = [
  { id: 'hss', label: 'Быстрорежущая сталь (Р6М5)' },
  { id: 't15k6', label: 'Твёрдый сплав Т15К6' },
  { id: 'vk8', label: 'Твёрдый сплав ВК8' },
  { id: 'vk6', label: 'Твёрдый сплав ВК6' },
];