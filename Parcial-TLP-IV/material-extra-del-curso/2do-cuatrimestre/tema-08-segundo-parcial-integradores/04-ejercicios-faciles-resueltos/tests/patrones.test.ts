import { describe, expect, it } from 'vitest';
import {
  BalanzaAdapter,
  calcularTotal,
  ConfiguracionTienda,
  DescuentoEstudiante,
  DescuentoJubilado,
  FabricaDescuentos,
  SinDescuento,
} from '../src/patrones';

describe('Singleton · ConfiguracionTienda', () => {
  // 📌 [TESTEAR SINGLETON] toBe compara REFERENCIAS: es exactamente "el mismo objeto"
  it('obtenerInstancia devuelve siempre el MISMO objeto', () => {
    expect(ConfiguracionTienda.obtenerInstancia()).toBe(ConfiguracionTienda.obtenerInstancia());
  });

  it('expone envioGratisDesde = 50000 y costoEnvio = 3000', () => {
    expect(ConfiguracionTienda.obtenerInstancia()).toMatchObject({ envioGratisDesde: 50000, costoEnvio: 3000 });
  });
});

describe('Factory · FabricaDescuentos', () => {
  it('crea un DescuentoEstudiante para "estudiante"', () => {
    expect(FabricaDescuentos.crear('estudiante')).toBeInstanceOf(DescuentoEstudiante);
  });

  // 📌 [TESTEAR FACTORY] El de "jubilado" reveló el DEFECTO 1
  it.each([
    ['ninguno', SinDescuento],
    ['estudiante', DescuentoEstudiante],
    ['jubilado', DescuentoJubilado],
  ] as const)('crea la clase correcta para "%s" (R1)', (tipo, clase) => {
    expect(FabricaDescuentos.crear(tipo)).toBeInstanceOf(clase);
  });

  it.each([
    ['ninguno', 10000],
    ['estudiante', 9000],
    ['jubilado', 8000],
  ] as const)('"%s" sobre 10000 pesos da %d (R1)', (tipo, esperado) => {
    expect(FabricaDescuentos.crear(tipo).aplicar(10000)).toBeCloseTo(esperado);
  });
});

describe('calcularTotal', () => {
  it('suma el envío por debajo del mínimo (R3)', () => {
    expect(calcularTotal(10000, new SinDescuento())).toBe(13000);
  });

  // 📌 [CASOS LÍMITE R3] $50.000 exactos reveló el DEFECTO 2
  it('con $50.000 exactos el envío es gratis', () => {
    expect(calcularTotal(50000, new SinDescuento())).toBe(50000);
  });

  it('con $49.999 se cobra el envío', () => {
    expect(calcularTotal(49999, new SinDescuento())).toBe(52999);
  });

  it('el mínimo se evalúa DESPUÉS del descuento: $55.000 con 10 % = $49.500 + envío', () => {
    expect(calcularTotal(55000, new DescuentoEstudiante())).toBeCloseTo(52500);
  });

  it.each([0, -100, Number.NaN])('rechaza el monto %d (R4)', (monto) => {
    expect(() => calcularTotal(monto, new SinDescuento())).toThrow(RangeError);
  });
});

describe('Adapter · BalanzaAdapter', () => {
  // 📌 [STUB DEL ADAPTEE] Un objeto literal reemplaza a la balanza real: el adapter depende de una interfaz
  it('convierte libras a kg redondeando a 2 decimales (R5)', () => {
    expect(new BalanzaAdapter({ pesoEnLibras: () => 10 }).pesoKg()).toBe(4.54);
    expect(new BalanzaAdapter({ pesoEnLibras: () => 1 }).pesoKg()).toBe(0.45);
    expect(new BalanzaAdapter({ pesoEnLibras: () => 0 }).pesoKg()).toBe(0);
  });
});
