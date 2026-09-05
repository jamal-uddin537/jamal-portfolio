# Jamal Ud Din — Portfolio Website

Personal portfolio website for **Jamal Ud Din**, showcasing graduate research in Materials Science at Northwestern Polytechnical University (NPU), Finite Element Analysis (FEA / Abaqus), Python engineering automation, and applied physics.

## Project Structure

```
├── index.html                 # Main website entry point
├── Jamal_CV.pdf               # Original CV document for direct download
├── assets/
│   ├── css/
│   │   └── style.css          # Design system, themes (Dark/Light), animations
│   ├── js/
│   │   └── main.js            # ScrollSpy, Canvas FEA simulator, opportunity switcher
│   └── img/
│       ├── jamal-portrait-opt.jpg  # Web-optimized portrait
│       └── jamal-portrait.png      # High-res master portrait
├── .gitignore
└── README.md
```

## Features

- **Agency-Grade Editorial Aesthetic**: Minimalist typography, dark & light theme toggle, responsive layout.
- **Interactive Ti-60 Simulation Engine**: HTML5 2D Canvas rendering finite element quad mesh, von Mises stress field, and real-time void closure kinetics with automated playback.
- **Strategic Opportunity Explorer**: Filter profile by career track (Aerospace R&D, Computational FEA, Applied Physics, STEM Pedagogy) with live Skills Matrix illumination.
- **ScrollSpy & Tactile Micro-Interactions**: Active section tracking, tactile press states, and in-card copy feedback.

## Free Deployment on Cloudflare Pages

### Option 1: Git Integration (Recommended for automatic deployments on push)
1. Push this repository to your GitHub account (instructions below).
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Compute (Workers & Pages)** > **Create** > **Pages** > **Connect to Git**.
4. Select your `portfolio` repository.
5. In **Build settings**:
   - **Framework preset**: `None`
   - **Build command**: *(Leave empty)*
   - **Build output directory**: `/` *(root)*
6. Click **Save and Deploy**. Your site will be live instantly on a free `*.pages.dev` subdomain with automatic SSL and global CDN caching.

### Option 2: Direct Drag & Drop Upload
1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create** > **Pages** > **Upload assets**.
2. Create a project name (e.g. `jamal-portfolio`).
3. Drag and drop this folder directly into the browser.
4. Click **Deploy site**.
