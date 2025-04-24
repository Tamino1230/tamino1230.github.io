

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

const gameGalleries = document.querySelectorAll('.game-gallery');

gameGalleries.forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    const poster = gallery.closest('.game').querySelector('.game-poster');
    let currentIndex = 0;

    // Add click event to each image in the gallery
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            poster.src = img.src; // Update the poster image
        });
    });

    // Add navigation buttons for switching images
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    prevButton.textContent = '◀';
    nextButton.textContent = '▶';
    prevButton.classList.add('gallery-nav-btn');
    nextButton.classList.add('gallery-nav-btn');

    gallery.appendChild(prevButton);
    gallery.appendChild(nextButton);

    // Hide the buttons
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        poster.src = images[currentIndex].src;
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        poster.src = images[currentIndex].src;
    });
});
