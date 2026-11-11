import { createContext, useContext, useState, type ReactNode } from 'react';
import { toolTypes as initialTools, type Tool } from '../Dictionaries/tools';
import { type BlankMaterial } from '../Dictionaries/blankMaterials';

interface CalculationResult {
  V: number;
  S: number;
  n: number;
  Pz: number;
  N: number;
  To: number;
}

interface ToolContextType {
  tools: Tool[];
  selectedToolType: Tool | null;
  setSelectedToolType: (tool: Tool | null) => void;
  addTool: (tool: Tool) => void;
  updateTool: (tool: Tool) => void;
  deleteTool: (id: string) => void;

  diameter: number;
  setDiameter: (v: number) => void;
  teeth: number;
  setTeeth: (v: number) => void;
  material: string;
  setMaterial: (v: string) => void;

  blankMaterial: BlankMaterial | null;
  setBlankMaterial: (v: BlankMaterial | null) => void;
  hardness: number;
  setHardness: (v: number) => void;
  strength: number;
  setStrength: (v: number) => void;
  length: number;
  setLength: (v: number) => void;
  coolant: boolean;
  setCoolant: (v: boolean) => void;
  depth: number;
  setDepth: (v: number) => void;

  result: CalculationResult | null;
  calculate: () => void;
  saveCalculation: () => void;
  loadCalculation: () => void;
  resetAll: () => void;
}

const ToolContext = createContext<ToolContextType | null>(null);

export const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [selectedToolType, setSelectedToolType] = useState<Tool | null>(null);

  const [diameter, setDiameter] = useState(25);
  const [teeth, setTeeth] = useState(4);
  const [material, setMaterial] = useState('Р6М5');

  const [blankMaterial, setBlankMaterial] = useState<BlankMaterial | null>(null);
  const [hardness, setHardness] = useState(180);
  const [strength, setStrength] = useState(600);
  const [length, setLength] = useState(30);
  const [coolant, setCoolant] = useState(true);
  const [depth, setDepth] = useState(1.5);

  const [result, setResult] = useState<CalculationResult | null>(null);

const calculate = () => {
  const errors: string[] = [];

  if (!blankMaterial) errors.push('Материал заготовки');
  if (!hardness || hardness <= 0) errors.push('Твёрдость HB');
  if (!strength || strength <= 0) errors.push('Предел прочности σв');
  if (!length || length <= 0) errors.push('Длина обработки');
  if (!diameter || diameter <= 0) errors.push('Диаметр зенкера');
  if (!teeth || teeth <= 0) errors.push('Число зубьев');
  if (!depth || depth <= 0) errors.push('Глубина резания');

  if (errors.length > 0) {
    alert('Заполните обязательные поля:\n\n• ' + errors.join('\n• '));
    return;
  }

  // ----- Coefficients -----
  // (keep the rest of the calculate function exactly as it was)

    // ----- Coefficients -----

    // 1. Material of the blank
    let Kmaterial = 1.0;
    const mat = blankMaterial?.label?.toLowerCase() || '';
    if (mat.includes('сталь')) Kmaterial = 1.0;
    else if (mat.includes('чугун')) Kmaterial = 1.25;
    else if (mat.includes('алюмин')) Kmaterial = 2.0;
    else if (mat.includes('медь')) Kmaterial = 1.6;

    // 2. Tool material
    let Ktool = 1.0;
    if (material.includes('Т15К6') || material.includes('ВК')) {
      Ktool = 1.4; // carbide
    } else {
      Ktool = 1.0; // HSS (Р6М5)
    }

    // 3. Coolant
    const Kcoolant = coolant ? 1.0 : 0.75;

    // 4. Hardness influence
    const Khard = Math.pow(200 / Math.max(hardness, 100), 0.35);

    // 5. Number of teeth influence on feed
    const Kteeth = teeth >= 4 ? 1.0 : 0.85;

    // ----- Calculations -----

    // Cutting speed V (m/min)
    let V = 18.5 * Kmaterial * Ktool * Kcoolant * Khard;
    V = Number(V.toFixed(1));

    // Feed S (mm/rev)
    let S = (0.12 + diameter * 0.007) * Kteeth;
    if (hardness > 200) S *= 0.85;
    if (mat.includes('чугун')) S *= 1.15;
    S = Number(Math.max(S, 0.08).toFixed(2));

    // Spindle speed n (rpm)
    const n = Math.round((1000 * V) / (Math.PI * diameter));

    // Cutting force Pz (N)
    const Pz = Number((0.65 * strength * depth * S * (teeth / 4) * 12).toFixed(0));

    // Required power N (kW)
    const N = Number(((Pz * V) / (1000 * 60 * 0.80)).toFixed(2));

    // Main time To (min)
    const L = length + depth * 0.5 + 2;
    const To = Number((L / (n * S)).toFixed(3));

    setResult({ V, S, n, Pz, N, To });
  };

  const saveCalculation = () => {
    const data = {
      date: new Date().toLocaleString('ru-RU'),
      blankMaterial: blankMaterial?.label,
      hardness,
      strength,
      length,
      coolant,
      diameter,
      teeth,
      material,
      depth,
      selectedTool: selectedToolType?.label,
      result,
    };

    localStorage.setItem('zenkerCalculation', JSON.stringify(data));

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raschet-zenker-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    alert('Расчёт сохранён!');
  };

  const loadCalculation = () => {
    const saved = localStorage.getItem('zenkerCalculation');
    if (!saved) {
      alert('Нет сохранённого расчёта');
      return;
    }
    const data = JSON.parse(saved);
    setHardness(data.hardness ?? 180);
    setStrength(data.strength ?? 600);
    setLength(data.length ?? 30);
    setCoolant(data.coolant ?? true);
    setDiameter(data.diameter ?? 25);
    setTeeth(data.teeth ?? 4);
    setMaterial(data.material ?? 'Р6М5');
    setDepth(data.depth ?? 1.5);
    if (data.result) setResult(data.result);
    alert(`Загружен расчёт от ${data.date}`);
  };

  const resetAll = () => {
    setSelectedToolType(null);
    setDiameter(25);
    setTeeth(4);
    setMaterial('Р6М5');
    setBlankMaterial(null);
    setHardness(180);
    setStrength(600);
    setLength(30);
    setCoolant(true);
    setDepth(1.5);
    setResult(null);
  };

  const addTool = (tool: Tool) => setTools((prev) => [...prev, tool]);
  const updateTool = (updated: Tool) =>
    setTools((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  const deleteTool = (id: string) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
    if (selectedToolType?.id === id) setSelectedToolType(null);
  };

  return (
    <ToolContext.Provider
      value={{
        tools,
        selectedToolType,
        setSelectedToolType,
        addTool,
        updateTool,
        deleteTool,
        diameter,
        setDiameter,
        teeth,
        setTeeth,
        material,
        setMaterial,
        blankMaterial,
        setBlankMaterial,
        hardness,
        setHardness,
        strength,
        setStrength,
        length,
        setLength,
        coolant,
        setCoolant,
        depth,
        setDepth,
        result,
        calculate,
        saveCalculation,
        loadCalculation,
        resetAll,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) throw new Error('useTool must be used within ToolProvider');
  return context;
};