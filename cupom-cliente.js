document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.square');
    const numberSelection = document.querySelectorAll('.number');
    const showCouponButton = document.getElementById('show-coupon');
    const clearButton = document.getElementById('clear-squares');
    const notification = document.getElementById('notification');
    const fireworksContainer = document.getElementById('fireworks-container');

    let currentSquareIndex = 0;

    // Adiciona evento de clique para cada número na seleção
    numberSelection.forEach(number => {
        number.addEventListener('click', function() {
            const selectedNumber = this.getAttribute('data-number');
            
            if (currentSquareIndex < squares.length) {
                squares[currentSquareIndex].innerText = selectedNumber;
                currentSquareIndex++;
            }
        });
    });

    // Função para limpar os quadrados da direita para a esquerda
    clearButton.addEventListener('click', function() {
        if (currentSquareIndex > 0) {
            currentSquareIndex--;
            squares[currentSquareIndex].innerText = '';
        }
    });

    // Função para verificar os números dos quadrados
    showCouponButton.addEventListener('click', function() {
        const weekNumber = getCurrentWeekNumber();
        const weekData = getNumbersForWeek(weekNumber);

        const userNumbers = Array.from(squares).map(square => parseInt(square.innerText, 10));
        const correctNumbers = weekData.numbers;

        if (userNumbers.every((num, idx) => num === correctNumbers[idx])) {
            showNotification();
            launchFireworks();
        } else {
            alert('Números incorretos. Tente novamente.');
        }
    });

    // Função para obter o número da semana atual
    function getCurrentWeekNumber() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDaysOfYear = (now - startOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    }

    // Função para obter os números da semana específica
    function getNumbersForWeek(weekNumber) {
        const numbersByWeek = {
            26: { dates: '24/06 à 30/06', numbers: [1, 2, 3, 4] },
            27: { dates: '01/07 à 07/07', numbers: [5, 6, 7, 8] },
            28: { dates: '08/07 à 14/07', numbers: [9, 0, 1, 2] },
            29: { dates: '15/07 à 21/07', numbers: [3, 4, 5, 6] },
            30: { dates: '22/07 à 28/07', numbers: [7, 8, 9, 0] },
            31: { dates: '29/07 à 04/08', numbers: [1, 3, 5, 7] },
            32: { dates: '05/08 à 11/08', numbers: [9, 8, 7, 6] }
        };
        return numbersByWeek[weekNumber] || { dates: 'Semana não definida', numbers: [0, 0, 0, 0] }; // Default caso a semana não esteja definida
    }

    // Função para mostrar a notificação
    function showNotification() {
        notification.style.display = 'block';
    }

    // Função para lançar as bombas de ano novo
    function launchFireworks() {
        // Aqui você pode adicionar sua implementação de animação de bombas de ano novo
        // Este é um exemplo simples de como adicionar algumas animações básicas

        for (let i = 0; i < 5; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.animationDelay = i * 0.5 + 's';
            fireworksContainer.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 5000); // Remover a bomba de ano novo após 5 segundos
        }
    }
});
