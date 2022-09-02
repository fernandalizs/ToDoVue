var app = new Vue({
    el: '#app',
    data: {
        message: 'Ola Vue',
        tasks: [],
        titulo: null,
        dataDia: null,
        projeto: null,
    },
    methods: {
        getTasks() {
            fetch("http://localhost:3000/tasks")
                .then((response) => response.json())
                .then((tarefasJson) => {
                    console.log(tarefasJson);
                    (this.tasks = tarefasJson);
                });
        },
        showModal() {
            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                document.querySelector('.modalNovaTask').style.display = 'none'
            }
        },
        async addTasks() {
            const addNoBanco = await fetch("http://localhost:3000/tasks", {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ title: this.titulo, project: this.projeto, dueTo: this.dataDia })
            })
            const recieve = await addNoBanco.json()
            console.log(recieve)
        },
        async deletar(id) {
            const deletaTask = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            })
            const recieve = await deletaTask.json()
            console.log(recieve)
        },
        // editar(id) {
        //     const editaTask = await fetch(`http://localhost:3000/tasks/${id}`, {
        //         method: 'PATCH',
        //     })
        //     const recieve = await editaTask.json()
        //     console.log(recieve)
        // },
    },
    created() {
        this.getTasks();
    }
});
