var app = new Vue({
    el: '#app',
    data: {
        message: 'Ola Vue',
        tasks: [],
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
        }
    },
    created() {
        this.getTasks();
    }
});
