
var tabela = document.querySelector('#tabela-pacientes')
let pacientes = tabela.querySelectorAll('.paciente')
let btnAddPaciente = document.querySelector('#adicionar-paciente')
btnAddPaciente.addEventListener('click', adicionaPaciente)
tabela.addEventListener('click', removePaciente)

let busca = document.querySelector('#filtrar-tabela')
busca.addEventListener('input', filtraPaciente)

function adicionaPaciente(event) {

    event.preventDefault()
    let formulario = document.querySelector('#form-adiciona')
    let paciente = document.createElement('tr')
    let tdNome = document.createElement('td')
    let tdPeso = document.createElement('td')
    let tdAltura = document.createElement('td')
    let tdGordura = document.createElement('td')
    let tdIMC = document.createElement('td')


    tdNome.textContent = formulario.nome.value
    tdPeso.textContent = formulario.peso.value
    tdAltura.textContent = formulario.altura.value
    tdGordura.textContent = formulario.gordura.value


    tdNome.classList.add('info-nome')
    tdPeso.classList.add('info-peso')
    tdAltura.classList.add('info-altura')
    tdGordura.classList.add('info-gordura')
    tdIMC.classList.add('info-imc')

    paciente.appendChild(tdNome)
    paciente.appendChild(tdPeso)
    paciente.appendChild(tdAltura)
    paciente.appendChild(tdGordura)
    paciente.append(tdIMC)

    paciente.classList.add('paciente')
    calculaIMC(paciente)


    let erros = ''
    if (validaValores(paciente)) {
        tabela.appendChild(paciente)
    } else {
        mensagemErros(paciente)

    }
}

function removeMensagemErro() {
    setTimeout(function () {
        let avisos = document.querySelector('.avisos > ul ')
        avisos.remove()
    }, 3000)
}

function mensagemErros(paciente) {
    let peso = paciente.querySelector('.info-peso').textContent
    let altura = paciente.querySelector('.info-altura').textContent
    let erros = []
    if (peso < 1 || peso > 150) erros.push('Peso inválido')
    if (altura < 1 || altura > 2.5) erros.push('Altura inválida!')
    let avisos = document.querySelector('.avisos')
    avisos.textContent = ''
    let ul = document.createElement('ul')

    erros.forEach(function (index) {
        let li = document.createElement('li')
        li.textContent = index
        ul.appendChild(li)
        avisos.appendChild(ul)
    })

    removeMensagemErro()
}

function calculaIMC(paciente) {

    if (validaValores(paciente)) {

        let nome = paciente.querySelector('.info-nome').textContent
        let peso = paciente.querySelector('.info-peso').textContent
        let altura = paciente.querySelector('.info-altura').textContent
        let imc = paciente.querySelector('.info-imc')
        imc.textContent = (peso / (altura ** 2)).toFixed(2)
    }
}

function validaValores(paciente) {


    let peso = paciente.querySelector('.info-peso').textContent
    let altura = paciente.querySelector('.info-altura').textContent
    let imc = paciente.querySelector('.info-imc')

    if (peso < 1 || peso > 150) {
        imc.textContent = 'Peso inválido!'
        imc.parentNode.classList.add('invalido')
        return false
    }

    if (altura < 1 || altura > 2.5) {
        imc.textContent = 'Altura inválida!'
        return false
    }

    return true

}

function removePaciente(event) {

    event.target.parentNode.classList.add('remover')
    setTimeout(function () {
        event.target.parentNode.remove()
    }, 500)
}

function filtraPaciente() {
    var regex = new RegExp(this.value, 'i')
    var pacientes = tabela.querySelectorAll('.paciente')
    if (this.value.length > 0) {
        pacientes.forEach(function (element) {
            let nome = element.querySelector('.info-nome').textContent
            if (!regex.test(nome)) {
                element.classList.add('esconder')

            }
        });
    } else {
        pacientes.forEach(element => {

            element.classList.remove('esconder')

        });
    }



}

function buscarPacrientes (){

}
pacientes.forEach(function (paciente) {
    calculaIMC(paciente)
})


