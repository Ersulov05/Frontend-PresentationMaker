function logout() {
    fetch('/api/logout', {
        method: 'GET',
    })
    .then(res => {
        if (res.ok) { 
            window.location.href = '/login';
        }
    })
    .catch(error => console.log('Ошибка:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector(".profile-block__button-quit").addEventListener("click", () => logout())
})