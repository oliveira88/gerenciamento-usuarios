import { Usuario } from './usuario';

export const USUARIOS: Usuario[] = [
    {
        nome: 'Jose',
        dataDeNascimento: new Date(2001, 1, 1),
        cpf: '111.111.111-11',
        email: '111@email.com',
        isAdmin: false
    },
    {
        nome: 'Maria',
        dataDeNascimento: new Date(2002, 2, 2),
        cpf: '222.222.222-22',
        email: '222@email.com',
        isAdmin: false
    },
    {
        nome: 'Jesus',
        dataDeNascimento: new Date(2003, 3, 3),
        cpf: '333.333.333-33',
        email: '333@email.com',
        isAdmin: true,
        nomeSocial: 'Yeshua'
    }
];
