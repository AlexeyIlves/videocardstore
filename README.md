# Online Store for Graphics Cards

📌 **Project Description**

This project is an online store for selling graphics cards. The website is developed using JavaScript and is designed to showcase a catalog of graphics cards, their specifications, and prices. The project consists of static web pages and does not require a backend.

📂 **Project Structure**

```plaintext
/
├── index.html        # Main page
├── styles/
│   ├── main.css      # Main site styles
├── scripts/
│   ├── app.js        # Site logic
├── assets/
│   ├── images/       # Graphics card images
├── README.md         # Project documentation


🛠 **Technologies Used**

- HTML, CSS, JavaScript
- GitHub Pages for deployment
- GitHub Actions (optional) for automatic deployment

🚀 **Deployment on GitHub Pages**

1. **Fork or Clone the Repository**

   ```bash
   git clone https://github.com/username/repository.git
   cd repository

🚀 **Deployment on GitHub Pages

1. **Fork or Clone the Repository

git clone https://github.com/username/repository.git
cd repository

2. Ensure Files Are in the main Branch

If needed, create and switch to the main branch:

git checkout -b main

3. Enable GitHub Pages

Go to Settings → Pages in the repository settings.

In the "Source" section, select the main branch and the /root folder (or docs if the site is there).

Click Save. After this, the site will be available at:
https://username.github.io/repository/

4. Automatic Deployment 

To automate deployment on each commit, use GitHub Actions by adding the .github/workflows/deploy.yml file:

name: Deploy to GitHub Pages
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: .

📜 Local Development

To test before deployment, start a local server:

npx http-server . -p 8080

The site will be available at http://localhost:8080.



