const cronometroElement = document.getElementById('cronometro');

// Definindo os minutos em que o cronômetro deve começar
const startHour = 20;   // Horário de início: 20h
const startMinute = 30; // Minuto de início: 30 (a cada hora cheia)

function startCronometro() {
    const timer = setInterval(() => {
        const now = new Date();
        const currentHour = now.getUTCHours(); // Obtém a hora atual em UTC
        const currentMinute = now.getUTCMinutes(); // Obtém o minuto atual em UTC
        let minutesToAdd = 0;

        // Convertendo para horário de Brasília (GMT-3)
        const brasilTimeZoneOffset = -3; // Offset de Brasília em relação a UTC
        const currentHourBrasil = currentHour - brasilTimeZoneOffset;
        
        // Verificando se já passou do horário de início do cronômetro
        if (currentHourBrasil < startHour || (currentHourBrasil === startHour && currentMinute < startMinute)) {
            minutesToAdd = (startHour - currentHourBrasil) * 60 + (startMinute - currentMinute);
        } else {
            // Já passou do horário de início, calcular o próximo horário de início
            minutesToAdd = 60 - currentMinute + startMinute;
        }

        // Adicionando o tempo restante para iniciar no próximo horário
        const startTime = new Date(now.getTime() + minutesToAdd * 60000);
        const nextStartTime = new Date(startTime.getTime() + 10 * 60000);

        // Função para atualizar o cronômetro a cada 10 minutos
        function updateCronometro() {
            const now = new Date();
            let diff = nextStartTime - now;

            // Mudar a cor do cronômetro baseado no horário
            if ((now.getUTCHours() === 20 && now.getUTCMinutes() >= 30) || now.getUTCHours() > 20) {
                cronometroElement.style.color = 'red';
            } else {
                cronometroElement.style.color = 'black';
            }

            // Se ainda não chegou ao horário de início, exibir "10:00"
            if (diff > 10 * 60000) {
                cronometroElement.textContent = `10:00`;
                return;
            }

            // Calculando minutos e segundos restantes
            const minutes = Math.floor(diff / (1000 * 60));
            const seconds = Math.floor((diff / 1000) % 60);

            // Formatando para exibir no formato mm:ss
            cronometroElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Se o tempo restante for 0, atualiza o próximo horário
            if (diff <= 0) {
                nextStartTime.setMinutes(nextStartTime.getMinutes() + 10);
            }
        }

        // Atualiza o cronômetro a cada segundo
        updateCronometro();
        setInterval(updateCronometro, 1000);

    }, 1000); // Executa a cada segundo para verificar e atualizar o cronômetro
}

startCronometro();
