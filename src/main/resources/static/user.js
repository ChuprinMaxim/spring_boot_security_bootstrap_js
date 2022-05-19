//||��� ��������� � ����������� �������� ������������ � ����� � � �������|||||||||||||||||||||||||||||||||||||||||||
async function getCurrentUser() {
    try {
        let response = await fetch('http://localhost:8080/api/user');
        let user = await response.json();
        getUsersTable(user);
        document.getElementById('current-user-name').innerText = user.email;
        document.getElementById('current-user-role').innerText = user.roles.map(r => r.role).join(' ');
    } catch (error) {
        alert(error);
    }
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//||����� � �������� �������|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function getUsersTable(user) {
    const currentUserTable = `
        <tr>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(r => r.role).join(' ')}</td>
        </tr>
    `
    document.getElementById('users-table').innerHTML = currentUserTable;
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//��������� ��� �������� ��������||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
window.onload = async function () {
    await getCurrentUser();
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||