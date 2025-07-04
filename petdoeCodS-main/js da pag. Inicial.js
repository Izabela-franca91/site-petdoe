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

  // Seletores atualizados baseados na sua estrutura HTML
  ScrollReveal().reveal(".about__row:nth-child(odd) .about__image img", {
    ...scrollRevealOption,
    origin: "left",
  });
  ScrollReveal().reveal(".about__row:nth-child(even) .about__image img", {
    ...scrollRevealOption,
    origin: "right",
  });

  ScrollReveal().reveal(".about__content span", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".about__content h4", {
    ...scrollRevealOption,
    delay: 1000,
  });
  ScrollReveal().reveal(".about__content p", {
    ...scrollRevealOption,
    delay: 1500,
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

const map = L.map('map').setView([-8.05, -34.9], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const clinicIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/256/9184/9184277.png',
  iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -30]
});
const vaccineIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/809/809957.phttps://cdn-icons-png.flaticon.com/512/4891/4891742.pngg',
  iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -30]
});
const castraIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2966/2966489.png',
  iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -30]
});

async function geocode(city, state) {
  const q = `${city}, ${state}, Brasil`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const resp = await fetch(url);
  const results = await resp.json();
  return results[0] ? [parseFloat(results[0].lat), parseFloat(results[0].lon)] : null;
}

async function fetchData(lat, lon) {
  return {
    clinics: [
      { name: 'Clínica Animal Med', lat: lat - 0.06, lng: lon - 0.01 },
      { name: 'Animal Vet Center', lat: lat - 0.07, lng: lon - 0.02 }
    ],
    vaccines: [
      { name: 'Hospital Veterinário Recife (Cordeiro)', lat: lat + 0.01, lng: lon + 0.01 },
      { name: 'CVA Peixinhos', lat: lat + 0.02, lng: lon + 0.02 }
    ],
    castram: [
      { name: 'CãoPaz Compaz Eduardo Campos', lat: lat + 0.015, lng: lon - 0.005 }
    ]
  };
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
      topBtn.style.display = 'block';
    } else {
      topBtn.style.display = 'none';
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
  searchForm.addEventListener("submit", function (event) {
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

