const Usuario = require('./models/Usuario');
const { Server } = require('./server')

async function iniciarServidor() {

    const server = new Server()

    // Verificar se o usuário admin = true
    const adminExists = await Usuario.findOne({ where: { isAdmin: true } });

    // Se o usuário admin não existir, criá-lo
    if (!adminExists) {
        //dados para criar usuario admin
        await Usuario.create({
            nome: 'admin',
            email: 'admin@email.com',
            senha: '12345',
            isAdmin: true,
            //dados obrigatórios para criar um novo usuário
            sexo: "undefined",
            cpf: "undefined",
            data_nascimento: "2024-05-13",
            cep_endereco: "undefined"
        });
    }
}

iniciarServidor();