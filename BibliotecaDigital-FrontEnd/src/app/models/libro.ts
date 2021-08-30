export class Libro{

    constructor(
        public _id: string,
        public bibliografia: string,
        public titulo: string,
        public autor: string,
        public descripcion: string,
        public edicion: string,
        public palabrasClaves: string,
        public temas: string,
        public frecuencia: string,
        public ejemplares: number,
        public image: string,
        public copias: number,
        public disponibles: number,
        public compras: number
    ){}
}