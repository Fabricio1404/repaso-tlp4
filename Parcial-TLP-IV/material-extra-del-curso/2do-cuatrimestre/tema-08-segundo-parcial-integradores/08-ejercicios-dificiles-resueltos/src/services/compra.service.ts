import { FabricaCupones } from '../cupones/cupones';
import type { ObservadorCompra } from '../auditoria/auditoria';
import type { Compra, NuevaCompra } from '../dominio/compra';
import { NoEncontradoError, ValidacionError } from '../dominio/errores';
import type { CompraRepository } from '../repositories/compra.repository';

export class CompraService {
  private repo: CompraRepository;
  private observadores: ObservadorCompra[];

  constructor(repo: CompraRepository, observadores: ObservadorCompra[] = []) {
    this.repo = repo;
    this.observadores = observadores;
  }

  /** R1 a R6 */
  registrar(datos: NuevaCompra): Compra {
    if (typeof datos?.cliente !== 'string' || datos.cliente.trim() === '') {
      throw new ValidacionError('El cliente es obligatorio');
    }
    if (!Number.isFinite(datos.monto) || datos.monto <= 0) {
      throw new ValidacionError('El monto debe ser mayor a 0');
    }
    const total = FabricaCupones.crear(datos.cupon).aplicar(datos.monto);
    const compra = this.repo.guardar({
      cliente: datos.cliente.trim(),
      monto: datos.monto,
      cupon: datos.cupon?.trim().toUpperCase() || null,
      total,
    });
    for (const o of this.observadores) o.compraRegistrada(compra);
    return compra;
  }

  obtener(id: number): Compra {
    const c = this.repo.buscar(id);
    if (c === undefined) throw new NoEncontradoError('Compra no encontrada');
    return c;
  }

  listar(): Compra[] {
    return this.repo.listar();
  }

  // 📌 [TDD - R8] Escrito después de ver fallar los tests de GET /compras/total
  totalVendido(): number {
    return this.repo.listar().reduce((acc, c) => acc + c.total, 0);
  }
}
