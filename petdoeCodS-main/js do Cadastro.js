// Este script deve ser carregado DEPOIS de firebase-app-compat.js e firebase-config.js (se ainda for usar Firebase)

document.addEventListener("DOMContentLoaded", function () {
    // Obtém as telas de cadastro dentro de 'register.html'
    const choiceScreen = document.getElementById("choiceScreen");
    const userRegistration = document.getElementById("userRegistration");
    const freelancerRegistration = document.getElementById("freelancerRegistration");

    // Obtém os botões de navegação dentro de 'register.html'
    const btnRegisterUser = document.getElementById("btnRegisterUser");
    const btnRegisterFreelancer = document.getElementById("btnRegisterFreelancer");
    const backToChoiceUser = document.getElementById("backToChoiceUser");
    const backToChoiceFreelancer = document.getElementById("backToChoiceFreelancer");

    // Obtém os formulários de cadastro
    const formCadastroUsuario = document.getElementById("formCadastroUsuario");
    const formCadastroFreelancer = document.getElementById("formCadastroFreelancer");


    // --- Função auxiliar para mostrar/esconder telas DENTRO de register.html ---
    function showScreen(screenId) {
        // Esconde todas as telas de cadastro primeiro
        if (choiceScreen) choiceScreen.style.display = "none";
        if (userRegistration) userRegistration.style.display = "none";
        if (freelancerRegistration) freelancerRegistration.style.display = "none";

        // Mostra a tela desejada
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) screenToShow.style.display = "block";
    }

    // --- Exibição Inicial: Mostra a tela de Escolha de Cadastro ao carregar register.html ---
    if (choiceScreen) {
        showScreen("choiceScreen"); // A tela de escolha é a primeira a ser exibida em register.html
    }


    // --- Listeners de Eventos de Navegação DENTRO de register.html ---

    // Das Opções de Cadastro para o Cadastro de Usuário
    if (btnRegisterUser) {
        btnRegisterUser.addEventListener("click", function () {
            showScreen("userRegistration");
        });
    }

    // Das Opções de Cadastro para o Cadastro de Freelancer
    if (btnRegisterFreelancer) {
        btnRegisterFreelancer.addEventListener("click", function () {
            showScreen("freelancerRegistration");
        });
    }

    // Do Cadastro de Usuário de volta para as Opções de Cadastro
    if (backToChoiceUser) {
        backToChoiceUser.addEventListener("click", function (e) {
            e.preventDefault();
            showScreen("choiceScreen");
        });
    }

    // Do Cadastro de Freelancer de volta para as Opções de Cadastro
    if (backToChoiceFreelancer) {
        backToChoiceFreelancer.addEventListener("click", function (e) {
            e.preventDefault();
            showScreen("choiceScreen");
        });
    }


    // --- Manipuladores de Envio de Formulário de Cadastro ---

    // Envio do Formulário de Cadastro de Usuário
    if (formCadastroUsuario) {
        formCadastroUsuario.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = formCadastroUsuario.userEmail.value;
            const senha = formCadastroUsuario.userSenha.value;

            // ***** LÓGICA DE LOCALSTORAGE PARA CADASTRO DE USUÁRIO *****
            // Verifica se o email já está registrado
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = storedUsers.some(user => user.email === email);

            if (userExists) {
                alert("Este e-mail já está cadastrado. Por favor, use outro.");
                return;
            }

            const newUser = {
                tipoCadastro: "Usuario",
                nome: formCadastroUsuario.userNome.value,
                nomeSocial: formCadastroUsuario.userNomeSocial.value,
                genero: document.querySelector('input[name="userGenero"]:checked').value,
                cpf: formCadastroUsuario.userCpf.value,
                email: email,
                senha: senha, // ATENÇÃO: Armazenar senha em LocalStorage NÃO É SEGURO em produção!
                celular: formCadastroUsuario.userCelular.value,
                dataNascimento: formCadastroUsuario.userDataNascimento.value,
                rua: formCadastroUsuario.userRua.value,
                numero: formCadastroUsuario.userNumero.value,
                cidade: formCadastroUsuario.userCidade.value,
                estado: formCadastroUsuario.userEstado.value
            };

            storedUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(storedUsers));

            alert("Cadastro de Usuário realizado com sucesso! Agora você pode fazer login.");
            formCadastroUsuario.reset();
            window.location.href = 'html do Login.html'; // Redireciona para a tela de login
            // ***** FIM DA LÓGICA DE LOCALSTORAGE *****

            /*
            // Lógica de Autenticação e Firestore para Usuário (MANTIDA MAS NÃO SERÁ EXECUTADA NA DEMO LOCALSTORAGE)
            if (typeof auth !== 'undefined' && typeof db !== 'undefined') {
                auth.createUserWithEmailAndPassword(email, senha)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('Usuário registrado no Auth:', user);
                        return db.collection('users').doc(user.uid).set({
                            ...newUser, // Copia todos os campos coletados
                            uid: user.uid,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    })
                    .then(() => {
                        alert("Cadastro de Usuário realizado com sucesso! (Firebase)");
                        formCadastroUsuario.reset();
                        window.location.href = 'html do Login.html';
                    })
                    .catch((error) => {
                        console.error('Erro ao registrar usuário Firebase:', error);
                        alert(`Erro ao cadastrar usuário Firebase: ${error.message}`);
                    });
            } else {
                console.warn("Firebase Auth/Firestore não configurado para cadastro de usuário. Usando apenas LocalStorage.");
            }
            */
        });
    }

    // Envio do Formulário de Cadastro de Freelancer
    if (formCadastroFreelancer) {
        formCadastroFreelancer.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = formCadastroFreelancer.freelancerEmail.value;
            const senha = formCadastroFreelancer.freelancerSenha.value;

            // ***** LÓGICA DE LOCALSTORAGE PARA CADASTRO DE FREELANCER *****
            // Verifica se o email já está registrado
            const storedFreelancers = JSON.parse(localStorage.getItem('freelancers')) || [];
            const freelancerExists = storedFreelancers.some(f => f.email === email);

            if (freelancerExists) {
                alert("Este e-mail de freelancer já está cadastrado. Por favor, use outro.");
                return;
            }

            const newFreelancer = {
                tipoCadastro: "Freelancer",
                nome: formCadastroFreelancer.freelancerNome.value,
                cpf: formCadastroFreelancer.freelancerCpf.value,
                dataNascimento: formCadastroFreelancer.freelancerDataNascimento.value,
                email: email,
                senha: senha, // ATENÇÃO: Armazenar senha em LocalStorage NÃO É SEGURO em produção!
                celular: formCadastroFreelancer.freelancerCelular.value,
                tipoServico: formCadastroFreelancer.freelancerTipo.value,
                descricao: formCadastroFreelancer.freelancerDescricao.value,
                cidadeAtuacao: formCadastroFreelancer.freelancerCidade.value,
                estadoAtuacao: formCadastroFreelancer.freelancerEstado.value,
                foto: formCadastroFreelancer.freelancerFoto.files.length > 0 ? formCadastroFreelancer.freelancerFoto.files[0].name : "Nenhuma foto selecionada",
                plano: "Pro", // Atribui automaticamente o plano Pro no cadastro de freelancer
                rating: 0 // Classificação padrão para novos freelancers
            };

            storedFreelancers.push(newFreelancer);
            localStorage.setItem('freelancers', JSON.stringify(storedFreelancers));

            alert("Cadastro de Freelancer realizado com sucesso! Agora você pode fazer login.");
            formCadastroFreelancer.reset();
            window.location.href = 'html do Login.html'; // Redireciona para a tela de login
            // ***** FIM DA LÓGICA DE LOCALSTORAGE *****

            /*
            // Lógica de Autenticação e Firestore para Freelancer (MANTIDA MAS NÃO SERÁ EXECUTADA NA DEMO LOCALSTORAGE)
            if (typeof auth !== 'undefined' && typeof db !== 'undefined') {
                auth.createUserWithEmailAndPassword(email, senha)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('Freelancer registrado no Auth:', user);
                        return db.collection('freelancers').doc(user.uid).set({
                            ...newFreelancer,
                            uid: user.uid,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            rating: 0
                        });
                    })
                    .then(() => {
                        alert("Cadastro de Freelancer realizado com sucesso! (Firebase)");
                        formCadastroFreelancer.reset();
                        window.location.href = 'html do Login.html';
                    })
                    .catch((error) => {
                        console.error('Erro ao registrar freelancer Firebase:', error);
                        alert(`Erro ao cadastrar freelancer Firebase: ${error.message}`);
                    });
            } else {
                console.warn("Firebase Auth/Firestore não configurado para cadastro de freelancer. Usando apenas LocalStorage.");
            }
            */
        });
    }

    // --- Manipula os Botões "Assinar" dos Planos (mantido como estava) ---
    const btnAssinar = document.querySelectorAll(".btn-assinar");
    btnAssinar.forEach(button => {
        button.addEventListener("click", function() {
            const plano = this.dataset.plano;
            alert(`Você selecionou o Plano ${plano.charAt(0).toUpperCase() + plano.slice(1)}!`);
            // Em uma aplicação real, aqui você iniciaria um fluxo de pagamento ou confirmaria a seleção do plano.
            // Para freelancers, o envio real dos dados para o Firebase ocorreria APÓS a confirmação do pagamento, se aplicável.
        });
    });
});