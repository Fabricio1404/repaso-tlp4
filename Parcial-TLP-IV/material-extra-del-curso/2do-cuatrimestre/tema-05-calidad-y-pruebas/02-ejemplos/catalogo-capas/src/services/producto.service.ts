import { NoEncontradoError, StockInsuficienteError, ValidacionError } from '../errors';
import type { NuevoProducto, Producto } from '../models/producto';
import type { ProductoRepository } from '../repositories/producto.repository';
import { validarNuevoProducto } from './validaciones';

// 📌 [CAPA DE SERVICIO] Toda la lógica de negocio. No conoce Express (no recibe req ni res)
export class ProductoService {
  // 📌 [DIP + INYECCIÓN POR CONSTRUCTOR] Recibe la INTERFAZ: en producción el repo en memoria, en tests un falso con vi.fn()
  private readonly repo: ProductoRepository;

  constructor(repo: ProductoRepository) {
    this.repo = repo;
  }

  listar(): Producto[] {
    return this.repo.listar();
  }

  // 📌 [LANZA NOENCONTRADO] Si no existe, error de dominio (que el middleware traduce a 404)
  obtener(id: number): Producto {
    const p = this.repo.buscarPorId(id);
    if (p === undefined) {
      throw new NoEncontradoError('Producto no encontrado');
    }
    return p;
  }

  crear(datos: NuevoProducto): Producto {
    validarNuevoProducto(datos);
    return this.repo.guardar({ ...datos, nombre: datos.nombre.trim() });
  }

  vender(id: number, cantidad: number): Producto {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new ValidacionError('La cantidad debe ser un entero mayor a 0');
    }
    const p = this.obtener(id);
    // 📌 [VALIDAR ANTES DE GUARDAR] Si no alcanza, se lanza el error y repo.actualizar NUNCA se llama
    if (cantidad > p.stock) {
      throw new StockInsuficienteError(`Hay ${p.stock} unidades y se pidieron ${cantidad}`);
    }
    const actualizado: Producto = { ...p, stock: p.stock - cantidad };
    this.repo.actualizar(actualizado);
    return actualizado;
  }
}
