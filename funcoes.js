/*******************************************************************************
 * Objetivo: Funções para manipular JSON
 * Data: 24/09/2025
 * Autor: Vinicius Julio
 * Versão: 1.0
*********************************************************************************/

const dados = require('./contatos.js')

const MESSAGE_ERROR = { status: false, statusCode: 500, development: 'Vinicius Julio de Oliveira'}

const getAllUsers = function() {

    let messageSucess = { status: true, statuscode: 200, development: 'Vinicius Julio de Oliveira', usuarios: [] }

    dados.contatos['whats-users'].forEach(function(item) {
        let jsonUsuario = {}
        jsonUsuario.id = item.id
        jsonUsuario.nome = item.account
        jsonUsuario.nickName = item.nickname
        jsonUsuario.ativo_dez_de = item['created-since']
        jsonUsuario.imagem_perfil = item['profile-image']
        jsonUsuario.numero = item.number
        jsonUsuario.cor_fundo = item.background
        let contatosUsuario = []
        item.contacts.forEach(function(contatos){
            let jsonContatosUsuario = {}
            jsonContatosUsuario.nome = contatos.name
            jsonContatosUsuario.numero = contatos.number
            jsonContatosUsuario.descricao = contatos.description
            jsonContatosUsuario.imagem = contatos.image
            let mensagensWithContatos = []
            contatos.messages.forEach(function(mensagens){
                let jsonMensagens = {}
                    jsonMensagens.remetente = mensagens.sender
                    jsonMensagens.destinatario = mensagens.content
                    jsonMensagens.horario = mensagens.time
                    mensagensWithContatos.push(jsonMensagens)
            })
            jsonContatosUsuario.mensagens = mensagensWithContatos
            contatosUsuario.push(jsonContatosUsuario)

        })

        jsonUsuario.contatos = contatosUsuario
        messageSucess.usuarios.push(jsonUsuario)

    })
    return messageSucess
}

const teste = getAllUsers()
console.log(teste.usuarios[0].contatos[0].mensagens)