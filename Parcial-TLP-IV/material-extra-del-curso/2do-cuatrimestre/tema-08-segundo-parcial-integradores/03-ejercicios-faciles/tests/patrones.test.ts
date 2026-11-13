import { describe, expect, it } from 'vitest';
import {
  BalanzaAdapter,
  calcularTotal,
  ConfiguracionTienda,
  DescuentoEstudiante,
  FabricaDescuentos,
  SinDescuento,
} from '../src/patrones';

describe('Singleton · ConfiguracionTienda', () => {
  it.todo('obtenerInstancia devuelve siempre el MISMO objeto');
  it.todo('expone envioGratisDesde = 50000 y costoEnvio = 3000');
});

describe('Factory · FabricaDescuentos', () => {
  // Ejemplo dado
  it('crea un DescuentoEstudiante para "estudiante"', () => {
    expect(FabricaDescuentos.crear('estudiante')).toBeInstanceOf(DescuentoEstudiante);
  });

  it.todo('crea la clase correcta para cada tipo (R1)');
  it.todo('cada descuento aplica su porcentaje (R1)');
});

describe('calcularTotal', () => {
  it.todo('suma el envío por debajo del mínimo (R3)');
  it.todo('casos límite del envío gratis (R3)');
  it.todo('casos inválidos (R4)');
});

describe('Adapter · BalanzaAdapter', () => {
  it.todo('convierte libras a kg redondeando a 2 decimales usando un STUB de la balanza vieja (R5)');
});

