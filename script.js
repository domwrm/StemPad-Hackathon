document.addEventListener("DOMContentLoaded", function() {

    const flapJsButton = document.getElementById('flapJsButton');
    const closePopup = document.getElementById('closePopup');
    const popup = document.getElementById('popup');

    // show popup when flapjs is clicked
    flapJsButton.addEventListener('click', (event) => {
        popup.style.display = 'flex';
        event.stopPropagation();
    });

    //close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    //close when clicking outside popup
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

});