import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NoEncontradoError, StockInsuficienteError, ValidacionError } from '../src/errors';
import type { NuevoProducto, Producto } from '../src/models/producto';
import type { ProductoRepository } from '../src/repositories/producto.repository';
import { ProductoService } from '../src/services/producto.service';

// 📌 [DOBLE DE PRUEBA] Repositorio falso: cada método es una función espía (vi.fn) con una implementación stub
function crearRepositorioFalso(producto: Producto | undefined) {
  return {
    listar: vi.fn(() => (producto ? [producto] : [])),
    buscarPorId: vi.fn(() => (producto ? { ...producto } : undefined)),
    guardar: vi.fn((datos: NuevoProducto) => ({ id: 99, ...datos })),
    actualizar: vi.fn(),
    // 📌 [SATISFIES] Verifica que cumple la interfaz SIN perder el tipo de vi.fn (por eso después existe .mock)
  } satisfies ProductoRepository;
}

const cafe: Producto = { id: 2, nombre: 'Café', precio: 5000, stock: 2 };

describe('ProductoService.vender (unitaria, con repositorio falso)', () => {
  let repo: ReturnType<typeof crearRepositorioFalso>;
  let servicio: ProductoService;

  // 📌 [BEFOREEACH] Cada test arranca con dobles nuevos: los contadores de llamadas no se arrastran
  beforeEach(() => {
    repo = crearRepositorioFalso(cafe);
    servicio = new ProductoService(repo);
  });

  it('con stock suficiente llama a actualizar UNA vez con el stock descontado', () => {
    servicio.vender(2, 2);

    // 📌 [SPY - TOHAVEBEENCALLEDTIMES / WITH] Verifica CÓMO colaboró el servicio con el repositorio
    expect(repo.actualizar).toHaveBeenCalledTimes(1);
    expect(repo.actualizar).toHaveBeenCalledWith({ id: 2, nombre: 'Café', precio: 5000, stock: 0 });
    expect(repo.buscarPorId).toHaveBeenCalledWith(2);
  });

  it('con stock insuficiente lanza StockInsuficienteError y NO llama a actualizar', () => {
    expect(() => servicio.vender(2, 3)).toThrow(StockInsuficienteError);
    // 📌 [NOT.TOHAVEBEENCALLED] Prueba que el servicio valida ANTES de guardar
    expect(repo.actualizar).not.toHaveBeenCalled();
  });

  it('rechaza cantidades no enteras sin consultar el repositorio', () => {
    expect(() => servicio.vender(2, 1.5)).toThrow(ValidacionError);
    expect(repo.buscarPorId).not.toHaveBeenCalled();
  });

  it('si el producto no existe lanza NoEncontradoError', () => {
    // 📌 [MOCKRETURNVALUE] Cambia lo que devuelve el stub solo para este test
    repo.buscarPorId.mockReturnValue(undefined);
    expect(() => servicio.vender(99, 1)).toThrow(NoEncontradoError);
  });
});

describe('ProductoService.crear', () => {
  it('guarda el nombre sin espacios y devuelve lo que devuelve el repositorio', () => {
    const repo = crearRepositorioFalso(undefined);
    const servicio = new ProductoService(repo);

    const creado = servicio.crear({ nombre: '  Mate  ', precio: 900, stock: 5 });

    expect(repo.guardar).toHaveBeenCalledWith({ nombre: 'Mate', precio: 900, stock: 5 });
    // 📌 [TOMATCHOBJECT] Alcanza con que contenga esas propiedades
    expect(creado).toMatchObject({ id: 99, nombre: 'Mate' });
  });

  it('si los datos son inválidos no guarda nada', () => {
    const repo = crearRepositorioFalso(undefined);
    expect(() => new ProductoService(repo).crear({ nombre: '', precio: 1, stock: 1 })).toThrow(ValidacionError);
    expect(repo.guardar).not.toHaveBeenCalled();
  });
});
