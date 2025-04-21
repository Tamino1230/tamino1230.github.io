

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');

    fetch('https://api.github.com/users/Tamino1230/repos?sort=updated&per_page=3')
        .then(response => response.json())
        .then(repos => {
            projectsContainer.innerHTML = ''; // Clear the loading message
            repos.forEach(repo => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                projectsContainer.appendChild(projectDiv);
            });
        })
        .catch(error => {
            projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
            console.error('Error fetching repositories:', error);
        });
});
