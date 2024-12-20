// Função para ajustar as cores dos elementos quando o modo escuro estiver ativado
function adjustColorsForDarkMode() {
    const body = document.body;
    const h2Elements = document.querySelectorAll('.content h2');
    const h3Elements = document.querySelectorAll('.agendamentos h3');
    const cardHoje = document.querySelector('.card-hoje');
    const cardAmanha = document.querySelector('.card-amanhã');
    const cards = document.querySelectorAll('.card');
    const quadros = document.querySelectorAll('.quadro');
    const filterByDateButton = document.getElementById('filterByDateButton');

    if (body.classList.contains('dark-mode')) {
        h2Elements.forEach(h2 => {
            h2.style.color = 'white';
        });

        h3Elements.forEach(h3 => {
            h3.style.color = 'white';
        });

        if (cardHoje) {
            cardHoje.style.backgroundColor = '#da7635';
            cardHoje.style.color = 'white';
        }

        if (cardAmanha) {
            cardAmanha.style.backgroundColor = '#343a40';
            cardAmanha.style.color = 'white';
        }

        cards.forEach(card => {
            card.style.backgroundColor = '#343a40';
            card.style.color = 'white';
            const cardH2 = card.querySelector('h2');
            const cardP = card.querySelectorAll('p');

            if (cardH2) {
                cardH2.style.color = 'white';
            }
            cardP.forEach(p => {
                p.style.color = '#ccc';
            });
        });

        quadros.forEach(quadro => {
            quadro.style.backgroundColor = '#343a40';
            quadro.style.color = 'white';
            const quadroH2 = quadro.querySelector('h2');

            if (quadroH2) {
                quadroH2.style.color = 'white';
            }
        });

        if (filterByDateButton) {
            filterByDateButton.style.backgroundColor = 'gray';
            filterByDateButton.style.color = 'black';
        }
    } else {
        h2Elements.forEach(h2 => {
            h2.style.color = ''; // Reverte para a cor padrão
        });

        h3Elements.forEach(h3 => {
            h3.style.color = ''; // Reverte para a cor padrão
        });

        if (cardHoje) {
            cardHoje.style.backgroundColor = ''; // Reverte para a cor padrão
            cardHoje.style.color = ''; // Reverte para a cor padrão
        }

        if (cardAmanha) {
            cardAmanha.style.backgroundColor = ''; // Reverte para a cor padrão
            cardAmanha.style.color = ''; // Reverte para a cor padrão
        }

        cards.forEach(card => {
            card.style.backgroundColor = ''; // Reverte para a cor padrão
            card.style.color = ''; // Reverte para a cor padrão
            const cardH2 = card.querySelector('h2');
            const cardP = card.querySelectorAll('p');

            if (cardH2) {
                cardH2.style.color = ''; // Reverte para a cor padrão
            }
            cardP.forEach(p => {
                p.style.color = ''; // Reverte para a cor padrão
            });
        });

        quadros.forEach(quadro => {
            quadro.style.backgroundColor = ''; // Reverte para a cor padrão
            quadro.style.color = ''; // Reverte para a cor padrão
            const quadroH2 = quadro.querySelector('h2');

            if (quadroH2) {
                quadroH2.style.color = ''; // Reverte para a cor padrão
            }
        });

        if (filterByDateButton) {
            filterByDateButton.style.backgroundColor = ''; // Reverte para a cor padrão
            filterByDateButton.style.color = ''; // Reverte para a cor padrão
        }
    }
}

// Click event on menu icon
let sidebarOpen = false; // Variável para controlar o estado do sidebar

document.getElementById('menu-icon').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    
    if (!sidebarOpen) {
        sidebar.style.left = '0';
        sidebarOpen = true;
    } else {
        sidebar.style.left = '-250px';
        sidebarOpen = false;
    }
});



// Click event on dark mode icon
document.getElementById('dark-icon').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    adjustColorsForDarkMode(); // Chama a função para ajustar as cores quando o modo escuro for ativado/desativado
});

// Chama a função ao carregar a página para garantir que as cores estejam ajustadas corretamente
window.addEventListener('load', adjustColorsForDarkMode);
