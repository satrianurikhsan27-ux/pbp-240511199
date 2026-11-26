
const formTodo = document.getElementById("form-todo");
const inputTodo = document.getElementById("input-todo");
const listTodo = document.getElementById("list-todo");
const stats = document.getElementById("stats");

// Mengambil data tugas dari localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Menyimpan data tugas
function simpan() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Menampilkan daftar tugas
function render() {
    listTodo.innerHTML = "";

    todos.forEach((todo) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.selesai;
        checkbox.addEventListener("change", () => {
            toggleSelesai(todo.id);
        });

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.teks;

        if (todo.selesai) {
            span.classList.add("selesai");
        }

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.className = "hapus";
        tombolHapus.addEventListener("click", () => {
            hapusTodo(todo.id);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(tombolHapus);

        listTodo.appendChild(li);
    });

    const belumSelesai = todos.filter(
        (todo) => !todo.selesai
    ).length;

    stats.textContent = `${belumSelesai} tugas belum selesai`;
}

// Menambahkan tugas baru
function tambahTodo(teks) {
    const tugasBaru = {
        id: Date.now(),
        teks: teks,
        selesai: false
    };

    todos.push(tugasBaru);
    simpan();
    render();
}

// Menghapus tugas
function hapusTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    simpan();
    render();
}

// Mengubah status tugas
function toggleSelesai(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return {
                ...todo,
                selesai: !todo.selesai
            };
        }

        return todo;
    });

    simpan();
    render();
}

// Menangani pengiriman form
formTodo.addEventListener("submit", (event) => {
    event.preventDefault();

    const teks = inputTodo.value.trim();

    if (teks === "") {
        return;
    }

    tambahTodo(teks);
    inputTodo.value = "";
    inputTodo.focus();
});

// Menampilkan data saat halaman dibuka
render();
