document.getElementById('show-coupon').addEventListener('click', function() {
    // Função para obter a semana do ano a partir de uma data
    function getWeekOfYear(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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

    // Função para exibir os números e o título da semana
    function showCouponForWeek() {
        const today = new Date();
        const weekNumber = getWeekOfYear(today);
        const weekData = getNumbersForWeek(weekNumber);

        // Verificar se já existe um título na tela
        const existingTitle = document.querySelector('h2');
        if (existingTitle) {
            return; // Se já existir, não faz nada
        }

        // Exibir título da semana
        const titleElement = document.createElement('h2');
        titleElement.textContent = `Números da semana ${weekData.dates}`;
        document.body.insertBefore(titleElement, document.querySelector('.fidelity-card'));

        // Exibir os números nos quadrados
        const squares = [1, 2, 3, 4];
        squares.forEach((num, index) => {
            document.getElementById(`square${num}`).textContent = weekData.numbers[index];
        });
    }

    // Chamar a função para exibir os números e o título da semana
    showCouponForWeek();
});
