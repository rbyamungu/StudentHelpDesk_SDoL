document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const mainBtn = document.getElementById('main-btn');

    const loadMarkdown = async (file) => {
        // Add active class to the main button
        mainBtn.classList.add('active');

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

    mainBtn.addEventListener('click', () => loadMarkdown('CertMainInformation.md'));

    // Load default content
    loadMarkdown('CertMainInformation.md');
});
