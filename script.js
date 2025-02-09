document.addEventListener("DOMContentLoaded", function () {
    const flapJsButton = document.getElementById("flapJsButton");
    const openaiQuestionButton = document.getElementById("openaiQuestionButton");
    const textDocument = document.getElementById("textDocument");

    // Existing dropdown toggle code...
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

    // Flap.js button – your existing code
    flapJsButton.addEventListener("click", () => {
        const flapContainer = document.createElement("div");
        flapContainer.className = "flap-container";
        flapContainer.contentEditable = "false";
        flapContainer.style.resize = "both";
        flapContainer.style.overflow = "hidden";

        const iframe = document.createElement("iframe");
        iframe.src = "https://flapjs.web.app/";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.borderRadius = "5px";
        iframe.contentEditable = "false";

        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.style.marginTop = "10px";
        closeButton.contentEditable = "false";
        closeButton.addEventListener("click", () => {
            flapContainer.remove();
        });

        flapContainer.appendChild(iframe);
        flapContainer.appendChild(closeButton);
        textDocument.appendChild(flapContainer);
    });

    // New: OpenAI Question Generator
    openaiQuestionButton.addEventListener("click", async () => {
        // Create a resizable container for the OpenAI Q&A block.
        const questionBlock = document.createElement("div");
        questionBlock.className = "resizeable-block openai-block"; // using the existing style
        questionBlock.contentEditable = "false";

        // Build inner elements.
        const header = document.createElement("h3");
        header.textContent = "Generated Question";

        const questionText = document.createElement("p");
        questionText.textContent = "Loading question...";

        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.placeholder = "Your answer";

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit Answer";

        const feedback = document.createElement("div");
        feedback.className = "feedback";

        // Append all to the container.
        questionBlock.appendChild(header);
        questionBlock.appendChild(questionText);
        questionBlock.appendChild(answerInput);
        questionBlock.appendChild(submitButton);
        questionBlock.appendChild(feedback);

        // Optionally, add a close button.
        const closeBlockButton = document.createElement("button");
        closeBlockButton.textContent = "Close";
        closeBlockButton.style.float = "right";
        closeBlockButton.addEventListener("click", () => {
            questionBlock.remove();
        });
        questionBlock.appendChild(closeBlockButton);

        // Add the question block to your notepad or a designated container.
        textDocument.appendChild(questionBlock);

        // Get the current notes from the textDocument.
        const notes = textDocument.innerText;

        // Prepare the prompt for the backend.
        const prompt = `Based on the following notes, generate a single, clear question to test understanding of the content, and provide the correct answer. Return the result as JSON in the format: {"question": "...", "answer": "..."}. Notes: ${notes}`;

        try {
            // Call your backend endpoint to generate the question.
            const response = await fetch("/api/generateQuestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch question from OpenAI.");
            }

            const data = await response.json();
            // Expected data format: { question: "Generated question text", answer: "Correct answer" }
            questionText.textContent = data.question;
            const correctAnswer = data.answer; // Save for later checking

            // When the user submits an answer...
            submitButton.addEventListener("click", () => {
                const userAnswer = answerInput.value.trim();
                if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                    feedback.textContent = "Correct!";
                    feedback.style.color = "green";
                } else {
                    feedback.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
                    feedback.style.color = "red";
                }
            });
        } catch (error) {
            console.error(error);
            questionText.textContent = "Error generating question. Please try again later.";
        }
    });
});