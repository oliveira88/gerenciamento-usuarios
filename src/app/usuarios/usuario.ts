export class Endereco {
    
    cidade: string = '';
    estado: string = '';
    cep: string = '';
    logradouro: string = '';
}

export class Usuario {

    id: number = 0;
    nome: string = '';
    dataDeNascimento: string = '';
    cpf: string = '';
    cpfResponsavel?: string;
    email: string = '';
    isAdmin: boolean = false;
    nomeSocial?: string;
    endereco?: Endereco;
}