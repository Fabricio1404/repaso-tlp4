export interface Medicamento {
  id: number;
  nombre: string;
  laboratorio: string;
  precio: number;
  stock: number;
}

export type NuevoMedicamento = Omit<Medicamento, 'id'>;
