document.addEventListener("DOMContentLoaded", function() {
    const flapJsButton = document.getElementById('flapJsButton');
    const blocksContainer = document.getElementById('blocksContainer');

    flapJsButton.addEventListener('click', () => {
        // Create a new block element
        const resizeBlock = document.createElement('div');
        resizeBlock.className = 'resizeable-block';

        // Create the header for the block
        const header = document.createElement('div');
        header.className = 'block-header';

        // Create the content area
        const blockContent = document.createElement('div');
        blockContent.className = 'block-content';

        // Create a new embed element
        const embed = document.createElement('embed');
        embed.type = 'text/html';
        embed.src = 'https://flapjs.web.app/';
        blockContent.appendChild(embed);

        // Add a close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => {
            resizeBlock.remove();
        });
        blockContent.appendChild(closeButton);

        // Append the header and content to the block
        resizeBlock.appendChild(header);
        resizeBlock.appendChild(blockContent);

        // Append the block to the container
        blocksContainer.appendChild(resizeBlock);
    });
});
