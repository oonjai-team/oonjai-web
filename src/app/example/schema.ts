// Matching DTO provided via class diagrams
export type ExampleItemDTO = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  price: number;
}

// Mock data to illustrate UI & State Focus (no backend yet)
export const mockData: ExampleItemDTO[] = [
  {
    id: '1',
    name: 'Oonjai Green Tea',
    description: 'Refreshing organic green tea from the mountains.',
    status: 'active',
    price: 45,
  },
  {
    id: '2',
    name: 'Oonjai Blue Flower',
    description: 'Butterfly pea flower tea with a hint of lemon.',
    status: 'active',
    price: 50,
  },
  {
    id: '3',
    name: 'Oonjai Yellow Honey',
    description: 'Pure wildflower honey with a golden glow.',
    status: 'inactive',
    price: 120,
  },
];
