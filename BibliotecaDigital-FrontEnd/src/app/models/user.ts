export class User{

    constructor(
        public _id: string,
        public cui: string,
        public name:string,
        public lastname:string,
        public username:string,
        public password:string,
        public email:string,
        public role: string,
        public image: string,
        public librosRentados: number,
        public Libros:[]
    ){}
}