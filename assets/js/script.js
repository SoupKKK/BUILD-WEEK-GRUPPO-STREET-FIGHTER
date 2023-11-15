function checkCheckbox() {
    const promiseCheckbox = document.getElementById('promise');
    if (promiseCheckbox.checked) {
        
        console.log("La checkbox è spuntata. Puoi procedere!");
    } else {
        
        alert("Per procedere, spunta la casella 'I promise...'");
    }

}

checkCheckbox()