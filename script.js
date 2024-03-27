const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks')


let minhaLista = []



function addNovaTarefa() {
    if (input.value.trim() !== '') { // Verifica se o valor do input não está vazio após remover espaços em branco
        minhaLista.push({
            tarefa: input.value,
            concluida: false
        })

        input.value = ''

        mostrarTarefas()
    } else {
        alert('Por favor, insira uma tarefa antes de adicionar!') // Exibe um alerta se o input estiver vazio
    }
}

function mostrarTarefas() {

    let novaLi = ''

    minhaLista.forEach((task, index) => {
        novaLi = novaLi + `
        <li class="task ${task.concluida && "done"}">
        <img src="img/checked.png" alt="checked" onclick="concluirTarefa(${index})" >
        <p>${task.tarefa}</p>
        <img src="img/trash.png" alt="trash" onclick="deletarItem(${index})">
        </li>`
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaLista))

}

function concluirTarefa(index) {
    minhaLista[index].concluida = !minhaLista[index].concluida
    mostrarTarefas()
}

function deletarItem(index) {
    minhaLista.splice(index, 1)
    mostrarTarefas()
}

function recarregarTask() {
    const taskLocalStorage = localStorage.getItem('lista')

    if (taskLocalStorage) {
        minhaLista = JSON.parse(taskLocalStorage)
    }
    mostrarTarefas()
}

recarregarTask()
button.addEventListener('click', addNovaTarefa)


