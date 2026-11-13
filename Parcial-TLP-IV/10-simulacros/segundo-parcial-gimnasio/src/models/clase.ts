export interface Clase {
  id: number;
  nombre: string;
  profesor: string;
  cupos: number;
}

export interface NuevoSocio {
  nombre: string;
  email: string;
  edad: number;
}

export interface Socio extends NuevoSocio {
  id: number;
}
