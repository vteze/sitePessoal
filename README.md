# My Personal Website

A modern, responsive personal website to showcase your social networks, skills, work experience and projects.

## Features

- Modern, clean design
- Fully responsive (works on mobile and desktop devices)
- Light/dark mode toggle
- Smooth animations
- Profile section with photo
- Social media links
- Professional experience timeline
- Skills & technologies section
- GitHub repositories integration
- Current learning progress
- Contact form
- WhatsApp integration
- Navigation menu

## How to Customize

1. Edit the `index.html` file:

   - Replace profile information with your own
   - Update the bio description
   - Update your profile image
   - Update social media links with your URLs
   - Add your own projects and experience

2. Customize colors in the `styles.css` file:
   - Edit the CSS variables at the beginning of the file to change the website's color scheme

## How to Host on GitHub

1. Create a new repository on GitHub
2. Initialize Git in your local project:
   ```bash
   git init
   git add .
   git commit -m "First commit"
   ```
3. Connect your local repository to GitHub:
   ```bash
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```
4. Go to your repository settings on GitHub
5. In the "Pages" section, select the "main" branch as the source
6. Your website will be available at `https://vteze.space`

## Custom Domain

This website is configured to use the custom domain `vteze.space`. To set up your own domain:

1. Purchase a domain from a domain registrar
2. Configure DNS records:
   - Add A records pointing to GitHub Pages IPs
   - Add a CNAME record for the www subdomain
3. Create a CNAME file in the project root with your domain
4. Configure the domain in GitHub Pages settings

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome (for icons)

## License

This project is under the MIT license. Feel free to use and modify it according to your needs.
