import { describe, expect, it, vi } from 'vitest';
import type { ObservadorCompra } from '../src/auditoria/auditoria';
import { CuponPorcentaje, FabricaCupones } from '../src/cupones/cupones';
import type { CompraRepository } from '../src/repositories/compra.repository';
import { CompraService } from '../src/services/compra.service';

// Dobles dados
function repoFalso() {
  return {
    guardar: vi.fn((d: Parameters<CompraRepository['guardar']>[0]) => ({ id: 1, ...d })),
    buscar: vi.fn(() => undefined),
    listar: vi.fn(() => []),
  } satisfies CompraRepository;
}

describe('FabricaCupones (Factory)', () => {
  // Ejemplo dado
  it('DESC10 crea un CuponPorcentaje', () => {
    expect(FabricaCupones.crear('DESC10')).toBeInstanceOf(CuponPorcentaje);
  });

  it.todo('cada código (incluido "sin cupón") crea la estrategia correcta (R2)');
  it.todo('acepta códigos en minúsculas o con espacios (R3)');
  it.todo('código inexistente: CuponInvalidoError (R3)');
  it.todo('límites de MENOS2000 (R4)');
});

describe('CompraService (unitaria)', () => {
  it.todo('registra, guarda una vez y notifica a los observadores con la compra guardada (R5)');
  it.todo('datos inválidos o cupón inválido: error, no guarda ni notifica (R1, R6)');
});

