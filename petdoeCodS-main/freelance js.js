// --- Funcionalidade do Menu de Navegação ---
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

if (menuBtn && navLinks && menuBtnIcon) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", (e) => {
        // Fecha apenas se um link dentro da navegação for clicado
        if (e.target.tagName === 'A') {
            navLinks.classList.remove("open");
            menuBtnIcon.setAttribute("class", "ri-menu-line");
        }
    });
} else {
    console.warn("Elementos de navegação (menu-btn, nav-links ou menu-btn-icon) não encontrados. A funcionalidade de navegação pode não funcionar.");
}


// --- Animações ScrollReveal ---
// Certifique-se de que ScrollReveal esteja carregado antes de tentar usá-lo
if (typeof ScrollReveal !== 'undefined') {
    const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
    };

    ScrollReveal().reveal(".header__content h4", {
        ...scrollRevealOption,
    });
    ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: 500,
    });
    ScrollReveal().reveal(".header__content h2", {
        ...scrollRevealOption,
        delay: 1000,
    });
    ScrollReveal().reveal(".header__content p", {
        ...scrollRevealOption,
        delay: 1500,
    });

    ScrollReveal().reveal(".header__btn", {
        ...scrollRevealOption,
        delay: 2000,
    });

    ScrollReveal().reveal(".intro__card", {
        ...scrollRevealOption,
        interval: 500,
    });

    ScrollReveal().reveal(".product__card", {
        ...scrollRevealOption,
        interval: 500,
    });

    ScrollReveal().reveal(".service__card", {
        duration: 1000,
        interval: 500,
    });

    ScrollReveal().reveal(".instagram__grid img", {
        duration: 1000,
        interval: 500,
    });

    // Add ScrollReveal for new performance section elements
    ScrollReveal().reveal(".performance__container .section__subheader", {
        ...scrollRevealOption,
        delay: 0,
    });
    ScrollReveal().reveal(".performance__container .section__header", {
        ...scrollRevealOption,
        delay: 200,
    });
    ScrollReveal().reveal(".chart-container", {
        ...scrollRevealOption,
        origin: "left", // Chart slides in from left
        delay: 400,
    });
    ScrollReveal().reveal(".messages-container .message-card", {
        ...scrollRevealOption,
        origin: "right", // Messages slide in from right
        interval: 200, // Stagger messages
        delay: 600,
    });


} else {
    console.warn("Biblioteca ScrollReveal não encontrada. As animações não funcionarão.");
}


// --- Swiper (Carrossel de Depoimentos) ---
// Certifique-se de que Swiper esteja carregado antes de tentar usá-lo
if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1, // Padrão para 1 no celular
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000, // Reproduz slides automaticamente a cada 3 segundos
            disableOnInteraction: false, // Continua a reprodução automática mesmo após a interação do usuário
        },
        // Pontos de interrupção responsivos
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
} else {
    console.warn("Biblioteca Swiper não encontrada. O carrossel de depoimentos não funcionará.");
}


// --- Duplicação de Imagens da Frota/Banner para Efeito de Rolagem Infinita ---
const fleet1 = document.querySelector(".fleet__wrapper-1 .fleet__images");
const fleet2 = document.querySelector(".fleet__wrapper-2 .fleet__images");

if (fleet1 && fleet2) {
    const fleet1Content = Array.from(fleet1.children);
    const fleet2Content = Array.from(fleet2.children);

    fleet1Content.forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", "true"); // Para acessibilidade
        fleet1.appendChild(duplicateNode);
    });

    fleet2Content.forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", "true"); // Para acessibilidade
        fleet2.appendChild(duplicateNode);
    });
} else {
    console.warn("Invólucros ou imagens da frota não encontrados. O efeito de rolagem infinita não funcionará.");
}


// --- Funcionalidade do Mapa Leaflet ---

// Verifique se Leaflet está carregado
if (typeof L !== 'undefined') {
    const map = L.map('map').setView([-8.05, -34.9], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const clinicIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/6363/6363425.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30]
    });
    const vaccineIcon = L.icon({
        iconUrl: 'https://cdn3d.iconscout.com/3d/premium/thumb/vacina-pet-12706867-10330634.png?f=webp',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30]
    });
    const castraIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.freepik.com/256/10753/10753901.png?semt=ais_hybrid',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30]
    });

    async function geocode(city, state) {
        try {
            const q = `${city}, ${state}, Brasil`;
            const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const results = await resp.json();
            return results[0] ? [parseFloat(results[0].lat), parseFloat(results[0].lon)] : null;
        } catch (error) {
            console.error("Geocoding failed:", error);
            alert("Erro ao buscar coordenadas. Tente novamente mais tarde.");
            return null;
        }
    }

    async function fetchData(lat, lon) {
        // These values are illustrative and would come from a real database.
        // Example: If within Recife, return Recife-specific data.
        if (lat > -8.1 && lat < -8.0 && lon > -35.0 && lon < -34.8) { // General area for Recife
            return {
                clinics: [
                    { name: 'Clínica Animal Med (Boa Vista)', lat: -8.062, lng: -34.885 },
                    { name: 'Animal Vet Center (Pina)', lat: -8.095, lng: -34.897 }
                ],
                vaccines: [
                    { name: 'Hospital Veterinário Recife (Cordeiro)', lat: -8.055, lng: -34.921 },
                    { name: 'CVA Peixinhos (Olinda)', lat: -7.998, lng: -34.871 } // A bit north of Recife proper
                ],
                castram: [
                    { name: 'CãoPaz Compaz Eduardo Campos (Alto Santa Terezinha)', lat: -8.012, lng: -34.905 }
                ]
            };
        } else {
            // Fallback or generic data if outside Recife, or you can fetch from a real API
            return {
                clinics: [
                    { name: 'Clínica Genérica 1', lat: lat - 0.01, lng: lon + 0.01 },
                    { name: 'Clínica Genérica 2', lat: lat + 0.01, lng: lon - 0.01 }
                ],
                vaccines: [
                    { name: 'Ponto Vacinação A', lat: lat - 0.02, lng: lon - 0.02 }
                ],
                castram: [
                    { name: 'Evento Castração B', lat: lat + 0.02, lng: lon + 0.02 }
                ]
            };
        }
    }

    function updateMap(data) {
        map.eachLayer(layer => {
            if (layer.options && layer.options.pane === 'markerPane') map.removeLayer(layer);
        });

        data.clinics.forEach(p =>
            L.marker([p.lat, p.lng], { icon: clinicIcon })
            .bindPopup(`<strong>${p.name}</strong><br>Clínica veterinária`)
            .addTo(map)
        );
        data.vaccines.forEach(p =>
            L.marker([p.lat, p.lng], { icon: vaccineIcon })
            .bindPopup(`<strong>${p.name}</strong><br>Vacinação antirrábica`)
            .addTo(map)
        );
        data.castram.forEach(p =>
            L.marker([p.lat, p.lng], { icon: castraIcon })
            .bindPopup(`<strong>${p.name}</strong><br>Castramóvel / Evento`)
            .addTo(map)
        );
    }

    document.getElementById('search-btn').addEventListener('click', async () => {
        const city = document.getElementById('city-input').value.trim();
        const state = document.getElementById('state-input').value.trim();
        if (!city || !state) return alert('Informe cidade e estado');

        const coords = await geocode(city, state);
        if (!coords) return alert('Local não encontrado');

        const [lat, lon] = coords;
        map.setView([lat, lon], 13);

        const data = await fetchData(lat, lon);
        updateMap(data);
    });
} else {
    console.warn("Biblioteca Leaflet não encontrada. O mapa não funcionará.");
}


// --- Funcionalidade de Listagem de Freelancers ---
const freelancers = [{
        nome: "Maria Souza",
        profissao: "Pet Sitter",
        descricao: "Cuido do seu pet com amor e responsabilidade.",
        telefone: "(81) 91234-5678",
        avaliacao: 4.8,
        foto: "https://i.pinimg.com/originals/df/d5/0c/dfd50c00972b6bdaec95827ce7bec3d5.jpg"
    },
    {
        nome: "João Pereira",
        profissao: "Dog Walker",
        descricao: "Passeios divertidos e seguros para o seu cão.",
        telefone: "(81) 99876-5432",
        avaliacao: 4.7,
        foto: "https://th.bing.com/th/id/R.7e05f4e20897f9d8f103003cc7faad9d?rik=uAYgZNcfqstAdw&pid=ImgRaw&r=0"
    },
    {
        nome: "Ana Oliveira",
        profissao: "Adestrador",
        descricao: "Treino básico e avançado para cães.",
        telefone: "(81) 98765-4321",
        avaliacao: 4.9,
        foto: "https://i.pinimg.com/originals/44/26/53/4426535db70cf9e5b58a6f4f7f9a98a3.jpg"
    },
    {
        nome: "Carlos Lima",
        profissao: "Veterinário",
        descricao: "Atendimento veterinário domiciliar.",
        telefone: "(81) 91234-5678",
        avaliacao: 4.8,
        foto: "https://img.freepik.com/premium-photo/male-veterinarian-holding-animals-hand-hospital_601128-3624.jpg"
    },
    {
        nome: "Fernanda Costa",
        profissao: "Pet Sitter",
        descricao: "Dedicação e carinho para seu animal de estimação.",
        telefone: "(81) 91111-2222",
        avaliacao: 4.6,
        foto: "https://img.freepik.com/premium-photo/emotional-dynamic-pose-30-year-old-woman_731930-16733.jpg"
    },
    {
        nome: "Pedro Rocha",
        profissao: "Dog Walker",
        descricao: "Caminhadas energéticas para cães de todos os portes.",
        telefone: "(81) 93333-4444",
        avaliacao: 4.9,
        foto: "https://th.bing.com/th/id/OIP.I5aOwQflNZTu46PItLEGwgHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
    },
    {
        nome: "Mariana Dias",
        profissao: "Adestrador",
        descricao: "Soluções personalizadas para o comportamento do seu pet.",
        telefone: "(81) 95555-6666",
        avaliacao: 4.7,
        foto: "https://292aa00292a014763d1b-96a84504aed2b25fc1239be8d2b61736.ssl.cf1.rackcdn.com/GaleriaImagem/129397/foto-de-perfil-profissional-feminino_luciana-ribeiro-4.jpg"
    },
    {
        nome: "Ricardo Silva",
        profissao: "Veterinário",
        descricao: "Saúde e bem-estar animal com atendimento especializado.",
        telefone: "(81) 97777-8888",
        avaliacao: 5.0,
        foto: "https://img.freepik.com/premium-photo/portrait-veterinarian-doctor-holding-kitten-veterinary-clinic_222237-1986.jpg"
    },
];

const freelancerList = document.getElementById("freelancer-list");
const filterSelect = document.getElementById("filter");

function renderFreelancers(lista) {
    if (!freelancerList) {
        console.error("Elemento da lista de freelancers não encontrado.");
        return;
    }
    freelancerList.innerHTML = "";
    if (lista.length === 0) {
        freelancerList.innerHTML = "<p>Nenhum profissional encontrado para este filtro.</p>";
        return;
    }
    lista.forEach(f => {
        const card = document.createElement("div");
        card.className = "freelancer-card";
        card.innerHTML = `
            <img src="${f.foto}" alt="Foto de ${f.nome}">
            <h3>${f.nome}</h3>
            <p><strong>Profissão:</strong> ${f.profissao}</p>
            <p><strong>Descrição:</strong> ${f.descricao}</p>
            <p><strong>Telefone:</strong> ${f.telefone}</p>
            <p class="rating">⭐ ${f.avaliacao.toFixed(1)}</p>
            <button onclick="alert('Abrindo chat com ${f.nome}...')">Chat</button>
        `;
        freelancerList.appendChild(card);
    });
}

if (filterSelect) {
    filterSelect.addEventListener("change", () => {
        const value = filterSelect.value;
        if (value === "all") {
            renderFreelancers(freelancers);
        } else {
            const filtrados = freelancers.filter(f => f.profissao === value);
            renderFreelancers(filtrados);
        }
    });
    renderFreelancers(freelancers); // Renderização inicial
} else {
    console.warn("Elemento de seleção de filtro de freelancer não encontrado.");
}

// --- Lógica da Seção de Denúncia (placeholder) ---
window.pesquisarDenuncia = function() {
    const cidade = document.getElementById('cidadeDenuncia').value.trim();
    const resultadosDiv = document.getElementById('denuncia__resultados');

    if (cidade === "") {
        resultadosDiv.innerHTML = `<p style="color: red;">Por favor, digite uma cidade para pesquisar.</p>`;
        return;
    }

    // Dados de exemplo (substitua por sua lógica de busca real)
    const contatosPorCidade = {
        "Recife": {
            telefone: "(81) 3333-4444",
            email: "denuncia.recife@exemplo.com",
            info: "Delegacia de Proteção Animal de Recife"
        },
        "São Paulo": {
            telefone: "(11) 9876-5432",
            email: "denuncia.sp@exemplo.com",
            info: "Coordenação de Saúde e Proteção ao Animal Doméstico (Cosap)"
        },
        "Rio de Janeiro": {
            telefone: "(21) 5555-1234",
            email: "denuncia.rj@exemplo.com",
            info: "Secretaria Municipal de Proteção e Defesa dos Animais (SMPDA)"
        },
        "Salvador": {
            telefone: "(71) 8765-4321",
            email: "denuncia.salvador@exemplo.com",
            info: "Diretoria de Proteção Animal (Dipa)"
        },
        "Belo Horizonte": {
            telefone: "(31) 2345-6789",
            email: "denuncia.bh@exemplo.com",
            info: "Coordenadoria de Defesa dos Animais (CDA)"
        },
        // Adicione mais cidades conforme necessário
    };

    const dadosCidade = contatosPorCidade[cidade];

    if (dadosCidade) {
        resultadosDiv.innerHTML = `
            <h3>Contatos para Denúncias em ${cidade}:</h3>
            <p><strong>Órgão/Informação:</strong> ${dadosCidade.info}</p>
            <p><strong>Telefone:</strong> ${dadosCidade.telefone}</p>
            <p><strong>Email:</strong> ${dadosCidade.email}</p>
            <p style="margin-top: 10px; font-size: 0.9em; color: var(--text-light);">Lembre-se de fornecer o máximo de detalhes possível ao denunciar.</p>
        `;
    } else {
        resultadosDiv.innerHTML = `
            <p>Nenhum contato de denúncia encontrado para **${cidade}**.</p>
            <p style="margin-top: 5px; font-size: 0.9em; color: var(--text-light);">Tente outra cidade ou procure órgãos de proteção animal locais.</p>
        `;
    }
};


// --- Botão Voltar ao Topo ---
const topBtn = document.getElementById('topBtn');

if (topBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('visible'); // Adiciona classe para mostrar
        } else {
            topBtn.classList.remove('visible'); // Remove classe para esconder
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} else {
    console.warn("Botão de voltar ao topo não encontrado.");
}


// --- Funcionalidade de Busca de ONGs ---
const ongs = [{
        nome: "ONG Esperança",
        cidade: "São Paulo",
        bairro: "Centro",
        denuncias: 5,
        telefone: "(11) 98888-1234",
        email: "contato@ongesperanca.org"
    },
    {
        nome: "Amigos da Vida",
        cidade: "Rio de Janeiro",
        bairro: "Copacabana",
        denuncias: 2,
        telefone: "(21) 99999-4321",
        email: "amigos@vida.org.br"
    },
    {
        nome: "Proteção Animal",
        cidade: "São Paulo",
        bairro: "Mooca",
        denuncias: 3,
        telefone: "(11) 98765-4321",
        email: "contato@protecaoanimal.org"
    },
    {
        nome: "Ajuda Legal",
        cidade: "São Paulo",
        bairro: "Centro",
        denuncias: 1,
        telefone: "(11) 91234-5678",
        email: "ajuda@legal.org"
    },
    {
        nome: "Cidadania Viva",
        cidade: "Belo Horizonte",
        bairro: "Savassi",
        denuncias: 0,
        telefone: "(31) 99876-5432",
        email: "viva@cidada.org"
    },
    // ONGs em Recife (baseado na localização atual)
    {
        nome: "Cuidar Recife",
        cidade: "Recife",
        bairro: "Boa Viagem",
        denuncias: 4,
        telefone: "(81) 98888-1111",
        email: "contato@cuidarrecife.org"
    },
    {
        nome: "Mãos Solidárias",
        cidade: "Recife",
        bairro: "Casa Amarela",
        denuncias: 3,
        telefone: "(81) 98777-2222",
        email: "maos@solidarias.org"
    },
    {
        nome: "Viva Recife",
        cidade: "Recife",
        bairro: "Afogados",
        denuncias: 2,
        telefone: "(81) 98666-3333",
        email: "viva@recife.org"
    },
    {
        nome: "Recife Animal",
        cidade: "Recife",
        bairro: "Tamarineira",
        denuncias: 5,
        telefone: "(81) 98555-4444",
        email: "contato@recifeanimal.org"
    },
    {
        nome: "Saúde e Vida",
        cidade: "Recife",
        bairro: "Imbiribeira",
        denuncias: 1,
        telefone: "(81) 98444-5555",
        email: "saudevida@rec.org"
    }
];

const searchForm = document.getElementById("searchForm");
const listaOngs = document.getElementById("listaOngs");
const resultadosSection = document.getElementById("resultados");
const numOngsSpan = document.getElementById("numOngs");
const numDenunciasSpan = document.getElementById("numDenuncias");

if (searchForm && listaOngs && resultadosSection && numOngsSpan && numDenunciasSpan) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const cidadeInput = document.getElementById("cidade");
        const bairroInput = document.getElementById("bairro");

        if (!cidadeInput || !bairroInput) {
            console.error("Elementos de entrada de cidade ou bairro para busca de ONGs não encontrados.");
            return;
        }

        const cidade = cidadeInput.value.trim().toLowerCase();
        const bairro = bairroInput.value.trim().toLowerCase();

        const resultados = ongs.filter(ong =>
            ong.cidade.toLowerCase() === cidade &&
            ong.bairro.toLowerCase() === bairro
        );

        listaOngs.innerHTML = ""; // Limpa os resultados anteriores

        if (resultados.length > 0) {
            let totalDenuncias = 0;

            resultados.forEach(ong => {
                totalDenuncias += ong.denuncias;

                const ongDiv = document.createElement("div");
                ongDiv.classList.add("ong-card");
                ongDiv.innerHTML = `
                    <h3>${ong.nome}</h3>
                    <p><strong>Cidade:</strong> ${ong.cidade}</p>
                    <p><strong>Bairro:</strong> ${ong.bairro}</p>
                    <p><strong>Denúncias:</strong> ${ong.denuncias}</p>
                    <p><strong>Telefone:</strong> ${ong.telefone}</p>
                    <p><strong>Email:</strong> <a href="mailto:${ong.email}">${ong.email}</a></p>
                `;
                listaOngs.appendChild(ongDiv);
            });

            numOngsSpan.textContent = resultados.length;
            numDenunciasSpan.textContent = totalDenuncias;
            resultadosSection.classList.remove("hidden"); // Mostra a seção de resultados
        } else {
            listaOngs.innerHTML = "<p>Nenhuma ONG encontrada para a cidade e bairro informados.</p>";
            numOngsSpan.textContent = "0";
            numDenunciasSpan.textContent = "0";
            resultadosSection.classList.remove("hidden"); // Ainda mostra a seção para exibir "Nenhuma ONG encontrada"
        }
    });
} else {
    console.warn("Elementos de busca de ONGs (formulário, lista ou spans de resultado) não encontrados. A busca de ONGs pode não funcionar.");
}

// --- Lógica da Plataforma de Descontos e Ranking ---
const taskList = document.getElementById('task-list');
const rankingList = document.getElementById('ranking-list');

// Simulação de dados (em um projeto real, viriam de um backend/banco de dados)
let tasks = [
    { id: 1, name: "Compartilhar post de adoção em rede social", points: 10, completed: false },
    { id: 2, name: "Participar de 3 discussões no fórum", points: 20, completed: false },
    { id: 3, name: "Denunciar 1 caso de maus-tratos (se aplicável)", points: 50, completed: false },
    { id: 4, name: "Avaliar 1 profissional freelancer", points: 15, completed: false },
    { id: 5, name: "Visitar 3 ONGs no mapa", points: 25, completed: false },
];

let users = [
    { name: "Ana Souza", score: 120 },
    { name: "Bruno Costa", score: 90 },
    { name: "Carla Lima", score: 75 },
    { name: "Diego Santos", score: 60 },
    { name: "Elisa Gomes", score: 40 },
];

function renderTasks() {
    if (!taskList) return; // Garante que o elemento existe
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.name} (+${task.points} pontos)</span>
            <button data-id="${task.id}" ${task.completed ? 'disabled' : ''}>${task.completed ? 'Concluída' : 'Concluir'}</button>
        `;
        taskList.appendChild(li);
    });

    // Adiciona event listeners aos botões de concluir tarefa
    taskList.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            const taskId = parseInt(event.target.dataset.id);
            completeTask(taskId);
        });
    });
}

function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1 && !tasks[taskIndex].completed) {
        tasks[taskIndex].completed = true;

        // Simula adicionar pontos ao usuário atual (apenas para demonstração)
        // Em um sistema real, você adicionaria pontos ao usuário logado
        if (users.length > 0) {
            users[0].score += tasks[taskIndex].points; // Adiciona pontos ao primeiro usuário
        }

        alert(`Tarefa "${tasks[taskIndex].name}" concluída! Você ganhou ${tasks[taskIndex].points} pontos.`);
        renderTasks();
        renderRanking();
    }
}

function renderRanking() {
    if (!rankingList) return; // Garante que o elemento existe
    rankingList.innerHTML = '';
    // Ordena os usuários por pontuação decrescente
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    // Exibe apenas o top 3
    sortedUsers.slice(0, 3).forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.name}</span>
            <span>${user.score} pontos</span>
        `;
        rankingList.appendChild(li);
    });
}

// Inicializa tarefas e ranking quando a página carrega
renderTasks();
renderRanking();


// --- Lógica do Fórum Interativo ---
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const submitPostBtn = document.getElementById('submit-post');
const forumPostsDiv = document.getElementById('forum-posts');

// Simulação de dados para posts do fórum
let forumPosts = [
    {
        id: 1,
        title: "Dicas para adestramento de filhotes",
        content: "Compartilhem suas melhores dicas para adestrar filhotes! Estou com um novo amigo e preciso de ajuda com o xixi no lugar certo.",
        author: "Tutor Feliz",
        date: "18 de Junho de 2025",
        comments: [
            { author: "PetLover", text: "Paciência e reforço positivo são chave! Recompense sempre." },
            { author: "AdestradorPro", text: "Use jornais ou tapetes higiênicos em um local fixo, e aumente o espaço gradualmente." }
        ]
    },
    {
        id: 2,
        title: "Perdi meu gato! O que fazer?",
        content: "Meu gato sumiu ontem à noite. Estou desesperado(a)! Alguma dica de como procurar ou onde divulgar?",
        author: "Desesperado(a)",
        date: "19 de Junho de 2025",
        comments: []
    }
];

function renderForumPosts() {
    if (!forumPostsDiv) return; // Garante que o elemento existe
    // Limpa os posts existentes, mas mantém o título "Últimas Publicações"
    forumPostsDiv.querySelectorAll('.forum__post').forEach(post => post.remove()); // Remove apenas os posts, não o h3

    forumPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('forum__post');
        postElement.dataset.id = post.id; // Para identificar posts para comentários

        let commentsHtml = '';
        if (post.comments.length > 0) {
            commentsHtml += '<div class="post__comments">';
            post.comments.forEach(comment => {
                commentsHtml += `
                    <div class="comment">
                        <p>${comment.text}</p>
                        <span>Por: ${comment.author}</span>
                    </div>
                `;
            });
            commentsHtml += '</div>';
        }

        postElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <div class="post__meta">
                <span>Por: ${post.author}</span> | <span>${post.date}</span>
            </div>
            ${commentsHtml}
            <input type="text" class="comment-input" placeholder="Adicionar comentário...">
            <button class="add-comment-btn">Comentar</button>
        `;
        forumPostsDiv.appendChild(postElement);
    });

    // Adiciona event listeners para botões de comentar
    forumPostsDiv.querySelectorAll('.add-comment-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const postId = parseInt(event.target.closest('.forum__post').dataset.id);
            const commentInput = event.target.previousElementSibling;
            const commentText = commentInput.value.trim();

            if (commentText) {
                addComment(postId, commentText);
                commentInput.value = ''; // Limpa o input
            } else {
                alert("Por favor, digite um comentário.");
            }
        });
    });
}

function addComment(postId, commentText) {
    const post = forumPosts.find(p => p.id === postId);
    if (post) {
        // Simula o autor do comentário (em um sistema real, seria o usuário logado)
        const authorName = "Usuário Anônimo"; // Você pode mudar isso
        post.comments.push({ author: authorName, text: commentText });
        renderForumPosts(); // Renderiza novamente para mostrar o novo comentário
        alert("Comentário adicionado!");
    }
}

if (submitPostBtn) {
    submitPostBtn.addEventListener('click', () => {
        const title = postTitleInput.value.trim();
        const content = postContentInput.value.trim();

        if (title && content) {
            const newPost = {
                id: forumPosts.length + 1,
                title: title,
                content: content,
                author: "Usuário Atual", // Substitua pelo nome do usuário logado
                date: new Date().toLocaleDateString('pt-BR'),
                comments: []
            };
            forumPosts.unshift(newPost); // Adiciona o novo post no início
            renderForumPosts();
            postTitleInput.value = '';
            postContentInput.value = '';
            alert("Publicação criada com sucesso!");
        } else {
            alert("Por favor, preencha o título e o conteúdo da publicação.");
        }
    });
}
renderForumPosts(); // Renderiza os posts iniciais


// --- Lógica do Chatbot para Pets Perdidos ---
const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotBox = document.getElementById('chatbot-box');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInputField = document.getElementById('chatbot-input-field');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');

if (chatbotToggleBtn && chatbotBox && chatbotCloseBtn && chatbotMessages && chatbotInputField && chatbotSendBtn) {
    chatbotToggleBtn.addEventListener('click', () => {
        chatbotBox.classList.toggle('open');
    });

    chatbotCloseBtn.addEventListener('click', () => {
        chatbotBox.classList.remove('open');
    });

    chatbotSendBtn.addEventListener('click', sendMessage);
    chatbotInputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatbotInputField.value.trim();
        if (userMessage === '') return;

        // Adiciona mensagem do usuário
        const userMsgElement = document.createElement('div');
        userMsgElement.classList.add('message', 'user-message');
        userMsgElement.textContent = userMessage;
        chatbotMessages.appendChild(userMsgElement);
        chatbotInputField.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll para o final

        // Resposta do chatbot (lógica simples de exemplo)
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            const botMsgElement = document.createElement('div');
            botMsgElement.classList.add('message', 'bot-message');
            botMsgElement.textContent = botResponse;
            chatbotMessages.appendChild(botMsgElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll para o final
        }, 500); // Pequeno atraso para simular "digitação"
    }

    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes("perdi meu pet") || message.includes("sumiu") || message.includes("desapareceu")) {
            return "Sinto muito pelo seu pet! Para te ajudar, preciso de algumas informações: qual o tipo do seu pet (cachorro, gato, etc.), raça, e o local e data aproximada em que ele foi visto pela última vez?";
        } else if (message.includes("cachorro") || message.includes("gato") || message.includes("ave")) {
            return "Ok. E onde ele foi visto pela última vez (endereço, ponto de referência)? Qual a raça e o nome dele?";
        } else if (message.includes("recursos") || message.includes("ajuda")) {
            return "Posso te direcionar para ONGs de resgate, grupos de busca no Facebook, ou te ajudar a criar um cartaz de 'Procura-se'. Qual você prefere?";
        } else if (message.includes("cartaz")) {
            return "Para criar um cartaz, você precisará de uma foto clara do seu pet, nome, sua localização e um telefone para contato. Posso te dar algumas dicas de onde divulgar.";
        } else if (message.includes("obrigado") || message.includes("valeu")) {
            return "De nada! Estamos aqui para ajudar. Espero que encontre seu pet em breve.";
        } else {
            return "Entendi. Poderia me dar mais detalhes sobre o que aconteceu ou o que você precisa? Se for sobre um pet perdido, por favor, me diga: 'Perdi meu pet'.";
        }
    }
} else {
    console.warn("Elementos do chatbot não encontrados. O chatbot pode não funcionar.");
}


// --- Seção de Desempenho do Freelancer (Chart.js) ---
// Certifique-se de que Chart.js esteja carregado antes de tentar usá-lo
if (typeof Chart !== 'undefined') {
    const ctx = document.getElementById('freelancerPerformanceChart');

    if (ctx) { // This checks if the canvas element was found
        const freelancerPerformanceChart = new Chart(ctx, {
            type: 'line', // Alterado para gráfico de LINHA
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'], // Meses
                datasets: [
                    {
                        label: 'Rendimento Mensal (R$)',
                        data: [1200, 1500, 1300, 1800, 2000, 1900, 2200], // Exemplo de rendimento
                        backgroundColor: 'rgba(64, 206, 224, 0.4)', // Cor primária com transparência
                        borderColor: 'rgba(64, 206, 224, 1)', // Cor primária sólida
                        borderWidth: 2,
                        yAxisID: 'y-earnings',
                        tension: 0.4, // Curva suave para a linha
                        fill: true, // Preenche a área abaixo da linha
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(64, 206, 224, 1)'
                    },
                    {
                        label: 'Avaliação Média',
                        data: [4.5, 4.6, 4.7, 4.8, 4.9, 4.8, 4.9], // Exemplo de avaliação média
                        backgroundColor: 'rgba(255, 215, 94, 0.4)', // Amarelo de destaque com transparência
                        borderColor: 'rgba(255, 215, 94, 1)', // Amarelo de destaque sólido
                        borderWidth: 2,
                        type: 'line', // Garante que este seja um gráfico de linha
                        fill: false, // Não preenche a área abaixo desta linha
                        yAxisID: 'y-rating',
                        tension: 0.4, // Curva suave para a linha
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(255, 111, 111, 1)' // Vermelho de destaque para os pontos
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permite que o gráfico se redimensione livremente
                interaction: {
                    mode: 'index', // Interação do tooltip com base no índice
                    intersect: false, // Tooltip aparece mesmo se não estiver exatamente sobre o ponto
                },
                scales: {
                    'y-earnings': {
                        beginAtZero: true,
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Rendimento (R$)'
                        }
                    },
                    'y-rating': {
                        beginAtZero: false,
                        max: 5.0,
                        min: 4.0,
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Avaliação Média'
                        },
                        grid: {
                            drawOnChartArea: false, // Desenha linhas de grade apenas para o primeiro eixo Y
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(1); // Exibe uma casa decimal para a avaliação
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataset.yAxisID === 'y-earnings') {
                                    label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.raw);
                                } else if (context.dataset.yAxisID === 'y-rating') {
                                    label += context.raw.toFixed(1);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.warn("Elemento canvas para o gráfico de desempenho do freelancer não encontrado.");
    }
} else {
    console.warn("Biblioteca Chart.js não encontrada. O gráfico de desempenho do freelancer não funcionará.");
}
