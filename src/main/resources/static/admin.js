//||Для получения и отображения текущего пользователя в шапке||||||||||||||||||||||||||||||||||||||||||||||||||||||
async function getCurrentUser() {
    try {
        let response = await fetch('http://localhost:8080/api/user');
        let user = await response.json();
        document.getElementById('current-user-name').innerText = user.email
        document.getElementById('current-user-role').innerText = user.roles.map(r => r.role).join(' ')
    } catch (error) {
        alert(error);
    }
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Рисую и заполняю таблицу|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function getUsersTable(users) {
    const usersTable = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(r => r.role).join(' ')}</td>
            <td><button id="user-edit-button-${user.id}" class="btn btn-info btn-sm" style="color:white">Edit</button></td>
            <td><button id="user-delete-button-${user.id}" class="btn btn-danger btn-sm" style="color:white">Delete</button></td>
        </tr>
    `).join('');
    document.getElementById('users-table').innerHTML = usersTable;

    users.forEach(user => {
        document.getElementById(`user-edit-button-${user.id}`).addEventListener('click', () => getDataForForm(user, '#edit-user-form'));
        document.getElementById(`user-delete-button-${user.id}`).addEventListener('click', () => getDataForForm(user, '#delete-user-form'));
    })
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Получаю всех пользователей по API и передаю в таблицу||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
async function getAllUsers() {
    const users = await fetch('http://localhost:8080/api/users');
    let result = await users.json();
    getUsersTable(result);
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Получаем список всех ролей|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function allRoles(roles) {
    function opt(id, role) {
        let option = new Option(role.substring(role.indexOf('_') + 1), role)
        option.setAttribute("data-id", id)
        return option
    }
    document.querySelectorAll(`select[name="role"]`)
        .forEach(select => {
            roles.forEach(
                role => select.append(opt(role.id, role.role))
            )
        })
}
async function getAllRoles() {
    const rol = await fetch('http://localhost:8080/api/role');
    let result = await rol.json();
    allRoles(result);
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Собираю данные с полей формы, после редактирования или создания юзера||||||||||||||||||||||||||||||||||||||||||
function writeDataFromForm(form) {
    const data = {
        first_name: document.querySelector(`${form} input[name="first_name"]`).value,
        last_name: document.querySelector(`${form} input[name="last_name"]`).value,
        age: document.querySelector(`${form} input[name="age"]`).value,
        email: document.querySelector(`${form} input[name="email"]`).value,
        password: document.querySelector(`${form} input[name="password"]`).value,
        roles: Array.from(document.querySelectorAll(`${form} select[name="role"] option`)
        ).filter(option => option.selected).map(option => ({role: option.value, id: option.dataset.id}))
    }

    const id = document.querySelector(`${form} input[name="id"]`)
    if (id) data.id = id.value

    return data
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Получаю данные для заполнения формы для редактирования или удаления||||||||||||||||||||||||||||||||||||||||||||
function getDataForForm(user, form) {
    document.querySelector(`${form} input[name="id"]`).value = user.id;
    document.querySelector(`${form} input[name="first_name"]`).value = user.first_name;
    document.querySelector(`${form} input[name="last_name"]`).value = user.last_name;
    document.querySelector(`${form} input[name="age"]`).value = user.age;
    document.querySelector(`${form} input[name="email"]`).value = user.email;
    document.querySelector(`${form} input[name="password"]`).value = user.password;
    Array.from(document.querySelectorAll(`${form} select[name="role"] option`)).forEach(option => {
        if (user.roles.find(r => r.role === option.value)) option.selected = true;
    })
    document.getElementById(form.slice(1,)).style.display = 'block'
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Сохранение нового пользователя. Использую функцию getDataFromForm||||||||||||||||||||||||||||||||||||||||||||||
async function saveNewUser() {
    try {
        await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            body: JSON.stringify(writeDataFromForm('#new-user-form')),
            headers: { "Content-Type": "application/json; charset=utf-8"}
        });
        await getAllUsers();
        window.location.replace("/admin");
    } catch (e) {
        alert('Failed to create user')
        throw e
    }
}
//Вызов функции после нажатия на клавишу сохранения
document.getElementById('save-new-user').addEventListener('click', saveNewUser)
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Изменение нового пользователя. Использую функцию writeDataFromForm|||||||||||||||||||||||||||||||||||||||||||||
async function editUser() {
    try {
        await fetch('http://localhost:8080/api/users', {
            method: 'PUT',
            body: JSON.stringify(writeDataFromForm('#edit-user-form')),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        });
    } catch (e) {
        alert('Failed to change user')
        throw e
    }
    await getAllUsers();
    //Закрытие модального окна
    document.getElementById('edit-user-form').style.display = 'none';
}
//Вызов функции для сохранения внесённых изменений, после нажатия клавиши Edit
document.getElementById('edit-user-button').addEventListener('click', editUser);

//Закрыть модальное окно редактирования пользователя при нажатии на close
Array.from(document.getElementsByClassName('close-edit-user-form')).forEach(close => {
    close.addEventListener('click', () => document.getElementById('edit-user-form').style.display = 'none')
})
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||Удаление пользователя||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
async function deleteUser() {
    const data = writeDataFromForm('#delete-user-form');
    try {
        const url = await fetch('http://localhost:8080/api/users/'+ data.id, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        });
    } catch (e) {
        alert('Failed to delete user')
        throw e
    }
    await getAllUsers();;
    //Закрытие модального окна
    document.getElementById('delete-user-form').style.display = 'none';
}
//Вызов функции для удаления пользователя, после нажатия клавиши Delete
document.getElementById('delete-user-button').addEventListener('click', deleteUser);

//Закрыть модальное окно удаления пользователя при нажатии на close
Array.from(document.getElementsByClassName('close-delete-user-form')).forEach(close => {
    close.addEventListener('click', () => document.getElementById('delete-user-form').style.display = 'none')
})
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



//Запустить при загрузке страницы
window.onload = async function () {
    await getCurrentUser();
    await getAllUsers();
    await getAllRoles();
}