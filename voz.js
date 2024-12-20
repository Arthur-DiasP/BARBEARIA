document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.querySelector('.chat-box');
    const voiceButton = document.getElementById('voice-btn');
    const voiceText = document.getElementById('voice-text');

    function addMessage(content, isBot = true, backgroundColor = '') {
        const message = document.createElement('div');
        message.classList.add('message', isBot ? 'bot' : 'user');
        message.innerHTML = `<p>${content}</p>`;
        message.style.opacity = 0;
        if (backgroundColor) {
            message.style.backgroundColor = backgroundColor; // Adiciona a cor de fundo à mensagem
        }
        chatBox.appendChild(message);

        setTimeout(() => {
            message.style.opacity = 1;
        }, 100);
    }

    function simulateBotMessages() {
        addMessage('Olá, tudo bom.');

        setTimeout(() => {
            addMessage('Qual profissional você quer fazer o seu agendamento?<br>Kel<br>Vavá');
        }, 6000);
    }

    let userFullName = '';
    let isWaitingForPhone = false;
    let isWaitingForService = false;
    let isWaitingForDate = false;
    let isWaitingForTime = false; // Estado para esperar o horário
    let isConfirmingAppointment = false; // Estado para confirmar o agendamento

    function sendMessage(inputText) {
        if (inputText === 'Kel' || inputText === 'Vavá') {
            addMessage(inputText, false);
            voiceText.value = '';

            setTimeout(() => {
                addMessage('Qual o seu nome completo?');
            }, 500);
        } else if (!userFullName) {
            userFullName = inputText;
            addMessage(inputText, false);
            voiceText.value = '';

            setTimeout(() => {
                addMessage('Qual é o número do seu celular? (xx-xxxxx-xxxx)');
                voiceText.placeholder = 'Digite Aqui: xx-xxxxx-xxxx';
                isWaitingForPhone = true;
            }, 500);
        } else if (isWaitingForPhone) {
            const phoneRegex = /^\d{2}-\d{5}-\d{4}$/;
            if (phoneRegex.test(inputText)) {
                addMessage(inputText, false);
                voiceText.value = '';
                isWaitingForPhone = false;

                setTimeout(() => {
                    addMessage('Escolha o serviço que você deseja:');
                }, 500);

                setTimeout(() => {
                    addMessage('1- Corte = R$35,00 <br>2- Penteado = R$20,00 <br>3- Luzes = R$50,00');
                    voiceText.placeholder = 'Digite o número do serviço';
                    isWaitingForService = true;
                }, 2500);
            } else {
                alert('Formato inválido. Por favor, digite no formato: xx-xxxxx-xxxx');
            }
        } else if (isWaitingForService) {
            const serviceRegex = /^[1-3]+$/;
            if (serviceRegex.test(inputText.replace(/\s/g, '').replace(/\+/g, ''))) {
                addMessage(inputText, false);
                voiceText.value = '';
                isWaitingForService = false;

                setTimeout(() => {
                    addMessage('Escolha uma dessas datas:');
                }, 500);

                setTimeout(() => {
                    const dates = ['17/07', '18/07', '19/07', '20/07', '21/07', '22/07', '23/07'];
                    addMessage(dates.join(', '));
                    voiceText.placeholder = 'Digite a data no formato dd/mm';
                    isWaitingForDate = true;
                }, 1500);
            } else {
                alert('Entrada inválida. Por favor, escolha 1, 2 ou 3.');
            }
        } else if (isWaitingForDate) {
            const dateRegex = /^\d{2}\/\d{2}$/;
            if (dateRegex.test(inputText)) {
                addMessage(inputText, false);
                voiceText.value = '';
                isWaitingForDate = false;

                // Chamar a função para mostrar os horários disponíveis
                showAvailableTimes(inputText);
            } else {
                alert('Formato de data inválido. Por favor, digite no formato: dd/mm');
            }
        } else if (isWaitingForTime) {
            const timeRegex = /^\d{2}:\d{2}$/;
            if (timeRegex.test(inputText)) {
                addMessage(inputText, false);
                voiceText.value = '';
                isWaitingForTime = false;

                // Mensagem de agradecimento
                addMessage('Obrigado! Seu agendamento foi registrado.');

                // Perguntar para confirmar o agendamento
                setTimeout(() => {
                    addMessage('Confirmar Agendamento?', true, '#2a9d8f'); // Fundo verde
                    isConfirmingAppointment = true; // Muda o estado para confirmar o agendamento
                }, 500);
            } else {
                alert('Formato de horário inválido. Por favor, digite no formato: hh:mm');
            }
        } else if (isConfirmingAppointment) {
            if (inputText.toLowerCase() === 'sim') {
                addMessage('Agendamento confirmado!', false);
                voiceText.value = '';
                isConfirmingAppointment = false; // Reseta o estado
            } else if (inputText.toLowerCase() === 'não') {
                addMessage('Agendamento cancelado.', false);
                voiceText.value = '';
                isConfirmingAppointment = false; // Reseta o estado
            } else {
                alert('Por favor, responda com "Sim" ou "Não".');
            }
        } else {
            alert('Profissional não reconhecido. Por favor, diga "Kel" ou "Vavá".');
        }
    }

    function showAvailableTimes(selectedDate) {
        const availableTimes = {
            '17/07': ['10:00', '14:00', '16:00'],
            '18/07': ['09:00', '11:00', '15:00'],
            '19/07': ['13:00', '17:00'],
            '20/07': ['10:00', '12:00', '16:00'],
            '21/07': ['11:00', '15:00'],
            '22/07': ['10:00', '14:00', '18:00'],
            '23/07': ['09:00', '13:00']
        };

        if (availableTimes[selectedDate]) {
            setTimeout(() => {
                addMessage('Horários disponíveis: ' + availableTimes[selectedDate].join(', '));
                voiceText.placeholder = 'Digite o horário (ex: 10:00)';
                isWaitingForTime = true;
            }, 500);
        } else {
            addMessage('Desculpe, não temos horários disponíveis para essa data.');
        }
    }

    // Formatação automática do número do celular
    voiceText.addEventListener('input', (event) => {
        const input = event.target;
        let value = input.value.replace(/\D/g, '');

        if (isWaitingForPhone) {
            if (value.length > 13) {
                input.value = value.slice(0, 13);
                return;
            }

            if (value.length >= 2) {
                const formattedValue = `${value.slice(0, 2)}-${value.slice(2, 7)}-${value.slice(7, 11)}`;
                input.value = formattedValue.slice(0, 13);
            } else {
                input.value = value;
            }
        } else if (isWaitingForService) {
            let services = input.value.replace(/[^\d]/g, '');
            services = services.split('').join(' + ');
            input.value = services;
        }
    });

    voiceText.addEventListener('keydown', (event) => {
        if (isWaitingForPhone && event.key === 'Backspace') {
            const currentValue = voiceText.value.replace(/\D/g, '');
            if (currentValue.length > 0) {
                const formattedValue = currentValue.slice(0, -1);
                voiceText.value = formattedValue.length >= 2 
                    ? `${formattedValue.slice(0, 2)}-${formattedValue.slice(2, 7)}-${formattedValue.slice(7, 11)}` 
                    : formattedValue;
            }
        } else if (isWaitingForService && event.key === 'Backspace') {
            const currentValue = voiceText.value.replace(/[^\d]/g, '');
            const formattedValue = currentValue.slice(0, -1);
            voiceText.value = formattedValue.split('').join(' + ');
        }
    });

    voiceButton.addEventListener('click', () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'pt-BR';

        recognition.start();

        recognition.onresult = (event) => {
            const recognizedText = event.results[0][0].transcript;
            sendMessage(recognizedText);
        };

        recognition.onerror = (event) => {
            console.error('Erro no reconhecimento de voz: ', event.error);
            alert('Ocorreu um erro ao reconhecer sua voz. Tente novamente.');
        };
    });

    voiceText.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage(voiceText.value);
        }
    });

    simulateBotMessages();
});
