export interface BuscarVariante {
  idVariante:number,
  articulo: {
    codigo: string;
    nombre: string;
  };
  color: {
    nombre: string;
  } | null;
  talla: {
    nombre: string;
  } | null;
  stock: number;
}
