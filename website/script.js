document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const certsBtn = document.getElementById('certs-btn');
    const costsBtn = document.getElementById('costs-btn');
    const studyBtn = document.getElementById('study-btn');
    const mainBtn = document.getElementById('main-btn');

    const buttons = [certsBtn, costsBtn, studyBtn, mainBtn];

    const loadMarkdown = async (file, button) => {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        if (button) {
            button.classList.add('active');
        }

        contentDiv.innerHTML = '<div class="loader"></div>'; // Show loader

        try {
            const response = await fetch(`${file}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            contentDiv.innerHTML = marked.parse(markdown);
        } catch (error) {
            contentDiv.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        }
    };

    mainBtn.addEventListener('click', () => loadMarkdown('CertMainInformation.md', mainBtn));

    // Load default content
    loadMarkdown('CertMainInformation.md', mainBtn);
});
