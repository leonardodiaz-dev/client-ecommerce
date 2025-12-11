export interface BuscarVariante {
  id:number,
  article: {
    codigo: string;
    nombre: string;
  };
  color: {
    nombre: string;
  } | null;
  size: {
    nombre: string;
  } | null;
  stock: number;
}
