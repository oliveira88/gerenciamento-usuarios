import { Usuario } from './usuario';

export const USUARIOS: Usuario[] = [
    {
        id: 1,
        nome: 'Um',
        dataDeNascimento: '2001-01-01',
        cpf: '04503149016',
        email: '111@email.com',
        isAdmin: false
    },
    {
        id: 2,
        nome: 'Dois',
        dataDeNascimento: '2002-02-02',
        cpf: '74820800078',
        email: '222@email.com',
        isAdmin: false
    },
    {
        id: 3,
        nome: 'Três',
        dataDeNascimento: '2003-03-03',
        cpf: '27848460088',
        email: '333@email.com',
        isAdmin: true,
        nomeSocial: 'Tré'
    }
];
