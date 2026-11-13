import { NoEncontradoError, StockInsuficienteError, ValidacionError } from '../errors';
import type { Medicamento, NuevoMedicamento } from '../models/medicamento';
import type { MedicamentoRepository } from '../repositories/medicamento.repository';
import { calcularDescuento } from './descuentos';
import { validarNuevoMedicamento } from './validaciones';

export class MedicamentoService {
  constructor(private readonly repo: MedicamentoRepository) {}

  listar(): Medicamento[] {
    return this.repo.listar();
  }

  obtener(id: number): Medicamento {
    const m = this.repo.buscarPorId(id);
    if (!m) {
      // 📌 [EJ3b · CORRECCIÓN - R8] Antes: new Error(...) genérico → el middleware no lo reconocía → 500
      throw new NoEncontradoError('Medicamento no encontrado');
    }
    return m;
  }

  registrar(datos: NuevoMedicamento): Medicamento {
    validarNuevoMedicamento(datos);
    return this.repo.guardar({ ...datos, nombre: datos.nombre.trim(), laboratorio: datos.laboratorio.trim() });
  }

  descuento(edad: number, monto: number): number {
    return calcularDescuento(edad, monto);
  }

  vender(id: number, cantidad: number): Medicamento {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new ValidacionError('La cantidad debe ser un número entero mayor a 0');
    }
    const m = this.obtener(id);
    if (cantidad > m.stock) {
      throw new StockInsuficienteError(`Hay ${m.stock} unidades y se pidieron ${cantidad}`);
    }
    const actualizado: Medicamento = { ...m, stock: m.stock - cantidad };
    this.repo.actualizar(actualizado);
    return actualizado;
  }
}
