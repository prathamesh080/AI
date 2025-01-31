const apiKey = 'fabfd8a1da0e40cdac3e19d23487c1c4'; // Replace with your OpenAI API Key

async function getAIResponse() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    document.getElementById('userInput').value = '';

    const apiRequest = {
        model: "gpt-4",
        messages: [{ role: "user", content: userInput }]
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(apiRequest)
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        chatBox.innerHTML += `<div><strong>AI:</strong> ${aiMessage}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<div><strong>AI:</strong> Error: Something went wrong.</div>`;
    }
}
