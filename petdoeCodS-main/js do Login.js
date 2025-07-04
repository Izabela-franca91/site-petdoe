// Este script deve ser carregado DEPOIS de firebase-app-compat.js e firebase-config.js (se ainda for usar Firebase)

document.addEventListener("DOMContentLoaded", function () {
    // Obtém o formulário de login
    const formLogin = document.getElementById("formLogin");

    // Adiciona o manipulador de evento para o envio do formulário de login
    if (formLogin) { // Garante que o elemento existe nesta página (login.html)
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault(); // Impede o envio padrão do formulário
            const email = formLogin.loginEmail.value;
            const password = formLogin.loginSenha.value;

            console.log("Tentando login com:", { email, password });

            let isAuthenticated = false;
            let userType = null; // Para saber se é 'usuario' ou 'freelancer'
            let userName = null; // Para armazenar o nome do usuário logado

            // ***** LÓGICA DE LOCALSTORAGE PARA LOGIN *****
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const storedFreelancers = JSON.parse(localStorage.getItem('freelancers')) || [];

            // Tenta autenticar como usuário
            const foundUser = storedUsers.find(user => user.email === email && user.senha === password);
            if (foundUser) {
                isAuthenticated = true;
                userType = 'usuario';
                userName = foundUser.nome; // Pega o nome do usuário
                // Armazenar o usuário logado no sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            } else {
                // Tenta autenticar como freelancer
                const foundFreelancer = storedFreelancers.find(f => f.email === email && f.senha === password);
                if (foundFreelancer) {
                    isAuthenticated = true;
                    userType = 'freelancer';
                    userName = foundFreelancer.nome; // Pega o nome do freelancer
                    sessionStorage.setItem('loggedInUser', JSON.stringify(foundFreelancer));
                }
            }

            if (isAuthenticated) {
                alert(`Login realizado com sucesso como ${userType}! Bem-vindo(a), ${userName}!`);
                formLogin.reset(); // Limpa o formulário
                window.location.href = 'html da pag. inicial.html'; // REDIRECIONA PARA A PÁGINA PRINCIPAL
            } else {
                alert("Login falhou. E-mail ou senha incorretos.");
            }
            // ***** FIM DA LÓGICA DE LOCALSTORAGE *****


            /*
            // Lógica de Autenticação com Firebase (MANTIDA MAS NÃO SERÁ EXECUTADA NA DEMO LOCALSTORAGE)
            // Certifique-se de que 'auth' esteja disponível do 'firebase-config.js'
            if (typeof auth !== 'undefined') {
                auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log('Usuário logado Firebase:', userCredential.user);
                        alert('Login realizado com sucesso! Bem-vindo(a)! (Firebase)');
                        formLogin.reset();
                        window.location.href = 'html da pag. Principal.html'; // Redireciona para a página principal
                    })
                    .catch((error) => {
                        console.error('Erro de login Firebase:', error);
                        alert(`Erro de login Firebase: ${error.message}`);
                    });
            } else {
                console.warn("Firebase Auth não configurado para login. Usando apenas LocalStorage.");
            }
            */
        });
    }
});