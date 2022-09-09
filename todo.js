var app = new Vue({
    el: '#app',
    data: {
        message: 'Ola Vue',
        tasks: [],
        titulo: null,
        dataDia: null,
        projeto: null,
        editarTarefa: false,
        id: null,
        taskFilter: "",
        load: false,
        toast: {
            duration: 5000,
            visible: false,
            message: "",
            style: {
                "vue-toast": true,
                success: true,
                hide: false,
            },
        },
    },
    methods: {
        getTasks() {
            this.load = true
            fetch("http://localhost:3000/tasks")
                .then((response) => response.json())
                .then((tarefasJson) => {
                    console.log(tarefasJson);
                    (this.tasks = tarefasJson);
                    this.load = false
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
            window.location.reload(true)
            const recieve = await addNoBanco.json()
            console.log(recieve)
            this.showToast("Tarefa adicionada com sucesso!")
        },
        async deletar(id) {
            const deletaTask = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            })
            window.location.reload(true)
            const recieve = await deletaTask.json()
            console.log(recieve)
            this.showToast("Tarefa deletada com sucesso!")
        },
        async editar() {
            const editaTask = await fetch(`http://localhost:3000/tasks/${this.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ title: this.titulo, project: this.projeto, dueTo: this.dataDia })
            })
            this.editarTarefa = false
            window.location.reload(true)

            const recieve = await editaTask.json()
            console.log(recieve)
            this.showToast("Tarefa editada com sucesso!")
        }
        ,
        edit(id, title, project, dueTo) {
            this.id = id
            this.titulo = title
            this.projeto = project
            this.dataDia = dueTo
        },
        showToast(message) {
            this.toast.visible = false;
            this.toast.message = message;
            this.toast.style.hide = false;
            this.toast.visible = true;

            clearTimeout(this.toast.timer);
            this.toast.timer = setTimeout(() => {
                this.toast.style.hide = true;
            }, this.toast.duration);
        },
    },
    created() {
        this.getTasks();
    },
    computed: {
        pesquisar() {
            return this.tasks.filter((el) => el.title.toLowerCase().includes(this.taskFilter.toLowerCase())

            )
        }
    }
});
