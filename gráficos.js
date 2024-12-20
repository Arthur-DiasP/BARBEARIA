// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdetp7jRbqaL5B2iaFOjSSI_nUH_U0f6U",
    authDomain: "arthur-37ccf.firebaseapp.com",
    databaseURL: "https://arthur-37ccf-default-rtdb.firebaseio.com",
    projectId: "arthur-37ccf",
    storageBucket: "arthur-37ccf.appspot.com",
    messagingSenderId: "633486950077",
    appId: "1:633486950077:web:70b39f855f01c4c721c1d4"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);

// Função para calcular a quantidade de clientes do dia atual
function calculateClientsToday(userDataArray) {
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    const clientsToday = userDataArray.filter(userData => userData.data === formattedToday).length;
    return clientsToday;
}

// Função para calcular o valor total dos serviços para os clientes do dia especificado
function calculateTotalPrice(userDataArray, targetDate) {
    const filteredClients = userDataArray.filter(userData => userData.data === targetDate);
    const totalPrice = filteredClients.reduce((total, userData) => {
        return total + userData.servicos.reduce((acc, servico) => acc + parseFloat(servico.preco), 0);
    }, 0);
    return parseFloat(totalPrice.toFixed(2));
}

// Função para calcular o valor total dos serviços para os clientes do mês especificado
function calculateTotalPriceByMonth(userDataArray, month) {
    const filteredClients = userDataArray.filter(userData => {
        const userDataMonth = parseInt(userData.data.split('-')[1]);
        return userDataMonth === month;
    });

    const totalPrice = filteredClients.reduce((total, userData) => {
        return total + userData.servicos.reduce((acc, servico) => acc + parseFloat(servico.preco), 0);
    }, 0);

    return parseFloat(totalPrice.toFixed(2));
}

// Função para obter a data correspondente ao dia da semana
function getTargetDate(dayOfWeekIndex) {
    const today = new Date();
    const day = today.getDay();
    const diff = dayOfWeekIndex - day;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    const formattedDate = `${targetDate.getDate().toString().padStart(2, '0')}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getFullYear()}`;
    return formattedDate;
}

// Função para atualizar o gráfico de barras da Semana
class ChartAxisConfig {
    constructor(stepSize, suggestedMin, suggestedMax, tickColor) {
        this.stepSize = stepSize;
        this.suggestedMin = suggestedMin;
        this.suggestedMax = suggestedMax;
        this.ticks = {
            color: tickColor
        };
    }
}

class ChartPluginConfig {
    constructor(legendLabelColor) {
        this.legend = {
            labels: {
                color: legendLabelColor
            }
        };
    }
}

class ChartOptionsConfig {
    constructor(yAxisConfig, xAxisTickColor, pluginConfig) {
        this.scales = {
            y: yAxisConfig,
            x: {
                ticks: {
                    color: xAxisTickColor
                }
            }
        };
        this.plugins = pluginConfig;
    }
}

// Função para atualizar o gráfico de barras da Semana
function updateWeeklyBarChart(labels, data, chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');
    ctx.canvas.style.height = '600px'; // Ajuste a altura conforme necessário
    ctx.canvas.style.width = '500px'; // Ajuste a altura conforme necessário

    const yAxisConfig = new ChartAxisConfig(50, 0, 500, 'gray');
    const pluginConfig = new ChartPluginConfig('gray');
    const chartOptions = new ChartOptionsConfig(yAxisConfig, 'gray', pluginConfig);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valores em R$',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: chartOptions
    });
}

// Função para atualizar o gráfico de barras do Mês
function updateMonthlyBarChart(labels, data, chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');
    ctx.canvas.style.height = '500px'; // Ajuste a altura conforme necessário
    ctx.canvas.style.width = '600px'; // Ajuste a altura conforme necessário

    const yAxisConfig = new ChartAxisConfig(500, 0, 5000, 'gray');
    const pluginConfig = new ChartPluginConfig('gray');
    const chartOptions = new ChartOptionsConfig(yAxisConfig, 'gray', pluginConfig);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valores em R$',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: chartOptions
    });
}


document.addEventListener('DOMContentLoaded', (event) => {
    readUserData();
});

// Função principal para ler os dados do Firebase e atualizar as informações nos cartões e gráficos
async function readUserData() {
    try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'agendamentos'));
        const data = snapshot.val();
        
        const userDataArray = Object.values(data);

        // Atualização do gráfico de barras para a semana atual
        const daysOfWeek = ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        const totalPriceByDay = daysOfWeek.map((_, index) => {
            const targetDate = getTargetDate(index + 2); // O índice 2 corresponde à terça-feira
            return calculateTotalPrice(userDataArray, targetDate);
        });
        updateWeeklyBarChart(daysOfWeek, totalPriceByDay, 'barChart');

        // Atualização do gráfico de barras para o mês atual
        const monthsLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const totalPriceByMonth = monthsLabels.map((_, index) => {
            // O índice do mês é index + 1 (janeiro é 1, fevereiro é 2, ..., dezembro é 12)
            return calculateTotalPriceByMonth(userDataArray, index + 1);
        });
        updateMonthlyBarChart(monthsLabels, totalPriceByMonth, 'barChartMes');

    } catch (error) {
        console.error("Erro ao ler dados do Firebase:", error);
    }
}

