export interface Endereco {
    cidade: string,
    estado: string,
    cep: string,
    logradouro: string
}

export interface Usuario {
    nome: string,
    dataDeNascimento: Date,
    cpf: string,
    email: string,
    isAdmin: boolean,
    nomeSocial?: string,
    endereco?: Endereco
}