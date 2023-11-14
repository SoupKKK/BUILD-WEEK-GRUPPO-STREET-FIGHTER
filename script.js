//funzione per la comparsa del bottone invia feedback
const removeButton = function () {
    const textInput = document.getElementById('textInput')
    const submitButton = document.getElementById('submitButton')

    textInput.addEventListener('input', function () {
        // Mostra o nascondi il pulsante in base al contenuto scritto
        if (this.value.trim() !== '') {
            submitButton.style.display = 'inline-block'
        } else {
            submitButton.style.display = 'none'
        }
    });

    submitButton.addEventListener('click', function () {
        alert('Feedback inviato correttamente')
        // Resetta l'input e nascondi il pulsante dopo l'invio
        textInput.value = ''
        submitButton.style.display = 'none'
    })
}

//funzione per aggiungere l'attributo fill e modificare il colore di base delle stelle svg
const addFillToStars = function () {
    const stars = document.querySelectorAll('.star')
    stars.forEach(star => {
        star.setAttribute('fill', '#0d1657')
    })
}

//funzione per impostare l'attributo fill solo per le stelle fino a quella cliccata
const removeFillToStars = function () {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
        star.addEventListener('click', function () {
            // Imposta l'attributo fill per tutte le stelle fino a quella cliccata
            for (let i = 0; i <= index; i++) {
                stars[i].setAttribute('fill', '#00FFFF');
            }

            // Ripristina il colore delle stelle successive
            for (let i = index + 1; i < stars.length; i++) {
                stars[i].setAttribute('fill', '#0d1657');
            }
        });
    });
}


//Sezione chiamata delle funzioni
document.addEventListener('DOMContentLoaded', addFillToStars)
document.addEventListener('DOMContentLoaded', removeFillToStars)
document.addEventListener('DOMContentLoaded', removeButton)

