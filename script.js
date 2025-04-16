// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (document.querySelector('.nav-links.active')) {
                document.querySelector('.nav-links').classList.remove('active');
            }
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Fixed navigation menu with style changes on scroll
const mainNav = document.querySelector('.main-nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navHeight = mainNav.offsetHeight;

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Update active link when scrolling
window.addEventListener('scroll', () => {
    // Change navigation appearance when scrolling
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
    
    // Highlight active navigation link based on visible section
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 10;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active links in navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to cards
document.querySelectorAll('.social-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add fade-in animation for elements when they appear on screen
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Toggle between light and dark theme
document.addEventListener("DOMContentLoaded", function () {
    // Check if there's a saved preference
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcons();
    }

    // Theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i><i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        updateThemeIcons();
        
        // Save preference
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('themePreference', currentTheme);
    });

    function updateThemeIcons() {
        // Update icons based on the current theme
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            formStatus.textContent = 'Sending message...';
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            try {
                // Here you can integrate a real service like EmailJS, Formspree, or your own API
                // Sending simulation for demonstration
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Simulate success
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent successfully! We will be in touch soon.';
                contactForm.reset();
                
                // Clear the message after a few seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                // Display error
                formStatus.className = 'form-status error';
                formStatus.textContent = 'An error occurred while sending your message. Please try again.';
            }
        });
    }

    // GitHub API integration
    const username = 'vteze'; // Your GitHub username
    const reposContainer = document.querySelector('.repos-container');
    const repoFilters = document.querySelectorAll('.repo-filter');
    
    // Function to fetch GitHub repositories
    async function fetchGitHubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            
            const repos = await response.json();
            return repos;
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            return [];
        }
    }
    
    // Function to render repositories
    function renderRepos(repos, filter = 'all') {
        // Clear the repositories container
        reposContainer.innerHTML = '';
        
        if (!repos || repos.length === 0) {
            reposContainer.innerHTML = `
                <div class="no-repos">
                    <i class="fas fa-folder-open"></i>
                    <p>No repositories found.</p>
                </div>
            `;
            return;
        }
        
        // Filter repositories
        let filteredRepos = repos;
        if (filter === 'popular') {
            filteredRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
        } else if (filter === 'recent') {
            filteredRepos = [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6);
        } else {
            filteredRepos = repos.slice(0, 9); // Show only the first 9 repos in "all" mode
        }
        
        // Create and add repository cards
        filteredRepos.forEach((repo, index) => {
            const delayClass = `delay-${Math.min(index, 5)}`;
            
            // Define language dot color
            const languageColor = getLanguageColor(repo.language);
            
            const repoCard = document.createElement('div');
            repoCard.className = `repo-card ${delayClass}`;
            
            repoCard.innerHTML = `
                <a href="${repo.html_url}" class="repo-name" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                
                ${repo.language ? `
                <div class="repo-language">
                    <span class="language-dot" style="background-color: ${languageColor}"></span>
                    <span>${repo.language}</span>
                </div>
                ` : ''}
                
                <p class="repo-description">${repo.description || 'No description available'}</p>
                
                <div class="repo-stats">
                    <div class="repo-stat">
                        <i class="far fa-star"></i>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks_count}</span>
                    </div>
                    <div class="repo-stat">
                        <i class="far fa-calendar-alt"></i>
                        <span>${formatDate(repo.updated_at)}</span>
                    </div>
                </div>
            `;
            
            reposContainer.appendChild(repoCard);
        });
    }
    
    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Function to get language color
    function getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Python': '#3572A5',
            'Java': '#b07219',
            'C#': '#178600',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Shell': '#89e051',
            'C++': '#f34b7d',
            'C': '#555555'
        };
        
        return colors[language] || '#8257e5'; // Default color for unlisted languages
    }
    
    // Add event listeners for the filters
    repoFilters.forEach(filter => {
        filter.addEventListener('click', async () => {
            // Update active class
            repoFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            // Show loading
            reposContainer.innerHTML = `
                <div class="repos-loading">
                    <i class="fas fa-circle-notch fa-spin"></i>
                    <p>Loading repositories...</p>
                </div>
            `;
            
            // Fetch repositories if we haven't fetched them yet
            if (!window.githubRepos) {
                window.githubRepos = await fetchGitHubRepos();
            }
            
            // Render filtered repositories
            renderRepos(window.githubRepos, filterValue);
        });
    });
    
    // Load repositories when the page loads
    async function initGitHubRepos() {
        // Fetch repositories
        window.githubRepos = await fetchGitHubRepos();
        
        // Render repositories (default filter: 'all')
        renderRepos(window.githubRepos, 'all');
    }
    
    // Initialize if the repositories section is present
    if (reposContainer) {
        initGitHubRepos();
    }
});