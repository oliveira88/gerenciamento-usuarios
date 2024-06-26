export class Endereco {
    
    constructor(
        public cidade: string = '',
        public estado: string = '',
        public cep: string = '',
        public logradouro: string = '',
    ) {}
}

export class Usuario {

    constructor(
        public id: number = 0,
        public nome: string = '',
        public dataDeNascimento: string = '',
        public cpf: string = '',
        public cpfResponsavel?: string,
        public email: string = '',
        public isAdmin: boolean = false,
        public nomeSocial?: string ,
        public endereco?: Endereco,
    ) {}
}