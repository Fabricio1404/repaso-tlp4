import type { Medicamento, NuevoMedicamento } from '../models/medicamento';

// Puerto: la capa de servicio depende de esta interfaz, no de una implementación concreta.
export interface MedicamentoRepository {
  listar(): Medicamento[];
  buscarPorId(id: number): Medicamento | undefined;
  guardar(datos: NuevoMedicamento): Medicamento;
  actualizar(medicamento: Medicamento): void;
}

export class MedicamentoRepositoryEnMemoria implements MedicamentoRepository {
  private medicamentos: Medicamento[];
  private proximoId: number;

  constructor(iniciales: Medicamento[] = []) {
    this.medicamentos = iniciales.map((m) => ({ ...m }));
    this.proximoId = Math.max(0, ...this.medicamentos.map((m) => m.id)) + 1;
  }

  listar(): Medicamento[] {
    return this.medicamentos.map((m) => ({ ...m }));
  }

  buscarPorId(id: number): Medicamento | undefined {
    const m = this.medicamentos.find((x) => x.id === id);
    return m ? { ...m } : undefined;
  }

  guardar(datos: NuevoMedicamento): Medicamento {
    const nuevo: Medicamento = { id: this.proximoId++, ...datos };
    this.medicamentos.push(nuevo);
    return { ...nuevo };
  }

  actualizar(medicamento: Medicamento): void {
    const i = this.medicamentos.findIndex((m) => m.id === medicamento.id);
    if (i !== -1) this.medicamentos[i] = { ...medicamento };
  }
}
