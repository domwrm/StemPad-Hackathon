document.addEventListener("DOMContentLoaded", function () {
    const flapJsButton = document.getElementById("flapJsButton");
    const textDocument = document.getElementById("textDocument");

    document.addEventListener("click", (e) => {
        const isDropdownButton = e.target.matches("[data-dropdown-button]");
        if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

        let currentDropdown;
        if (isDropdownButton) {
            currentDropdown = e.target.closest("[data-dropdown]");
            currentDropdown.classList.toggle("active");
        }
        document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
            if (dropdown === currentDropdown) return;
            dropdown.classList.remove("active");
        });
    });

    flapJsButton.addEventListener("click", () => {
        // Create a container for the Flap.js interactive
        const flapContainer = document.createElement("div");
        flapContainer.className = "flap-container";
        flapContainer.contentEditable = "false"; // Make the container non-editable
        flapContainer.style.resize = "both"; // Make the container resizable
        flapContainer.style.overflow = "hidden"; // Ensure resize works properly

        // Create an iframe to embed Flap.js
        const iframe = document.createElement("iframe");
        iframe.src = "https://flapjs.web.app/";
        iframe.style.width = "100%";
        iframe.style.height = "100%"; // Fill the container
        iframe.style.border = "none";
        iframe.style.borderRadius = "5px";
        iframe.contentEditable = "false"; // Ensure the iframe is non-editable

        // Add a close button
        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.style.marginTop = "10px";
        closeButton.contentEditable = "false"; // Ensure the button is non-editable
        closeButton.addEventListener("click", () => {
            flapContainer.remove(); // Remove the container when the button is clicked
        });

        // Append the iframe and close button to the container
        flapContainer.appendChild(iframe);
        flapContainer.appendChild(closeButton);

        // Append the container to the text box
        textDocument.appendChild(flapContainer);
    });
});