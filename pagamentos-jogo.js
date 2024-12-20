document.getElementById('copyButton').addEventListener('click', function() {
    var input = document.querySelector('.itens input');
    input.select();
    input.setSelectionRange(0, 99999); // Para dispositivos móveis

    try {
        var successful = document.execCommand('copy');
        if (successful) {
            var button = document.getElementById('copyButton');
            button.textContent = 'Copiado';
            setTimeout(function() {
                button.textContent = 'Copiar';
            }, 2000); // Volta para "Copiar" após 2 segundos
        }
    } catch (err) {
        console.error('Falha ao copiar o texto: ', err);
    }
});
