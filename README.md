# Photography Portfolio

A clean, dark-themed photography portfolio website with timeline navigation, interactive maps for travel albums, and Spotify embeds for concert albums.

## Quick Start

1. Clone or download this repo
2. Add your images to the `images/` folder
3. Edit `index.html` to update album content
4. Push to GitHub and enable GitHub Pages

## File Structure

```
photography-portfolio/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactivity (lightbox, maps, navigation)
├── images/             # Your photos (create this folder)
│   ├── japan/
│   │   ├── cover.jpg
│   │   ├── photo-01.jpg
│   │   └── ...
│   ├── concerts/
│   │   └── radiohead/
│   │       ├── cover.jpg
│   │       └── ...
│   └── family/
│       └── summer-2024/
│           ├── cover.jpg
│           ├── featured.jpg
│           └── ...
└── README.md
```

## Adding a New Album

### 1. Add to Timeline Sidebar

In `index.html`, find the `.timeline` section and add:

```html
<a class="timeline-album" data-album="your-album-id">
    Album Name
    <span class="timeline-album-date">Month</span>
</a>
```

### 2. Add Album Card

In the `.albums-grid` section:

```html
<div class="album-card" data-album="your-album-id">
    <img src="images/your-album/cover.jpg" alt="Album Name">
    <div class="album-card-overlay">
        <span class="album-card-type">Travel | Concert | Family</span>
        <h3 class="album-card-title">Album Name</h3>
        <span class="album-card-meta">Date · X photos</span>
    </div>
</div>
```

### 3. Add Album Detail Page

Copy one of the existing album templates based on type:

- **Travel**: Use `album-japan-2024` as template (includes map + trip timeline)
- **Concert**: Use `album-radiohead-2024` as template (includes Spotify embed)
- **Family**: Use `album-summer-family-2024` as template (featured layout)

Important: The `id` must be `album-{your-album-id}` to match the `data-album` attributes.

## Customizing Maps

For travel albums, edit the `initTripMap()` function in `js/main.js`:

```javascript
const locations = [
    { name: 'City Name', coords: [latitude, longitude], dates: 'Date range' },
    // Add more locations...
];
```

To add maps for additional trip albums, you'll need to:
1. Create a new map container with a unique ID in your album HTML
2. Add initialization logic in `main.js` (check which album is being viewed)

## Spotify Embeds

To get your playlist embed:

1. Open Spotify → Go to your playlist
2. Click `...` → Share → Embed playlist
3. Copy the `src` URL from the iframe code
4. Replace the URL in the `<iframe>` tag

## Image Recommendations

- **Cover images**: 800×600px or similar 4:3 ratio
- **Gallery images**: Any aspect ratio works (masonry layout adapts)
- **Format**: JPG for photos, optimize for web (~200-500KB each)
- **Naming**: Use descriptive names like `photo-01.jpg`, `tokyo-temple.jpg`

## Deploying to GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to repo Settings → Pages
4. Under "Source", select `main` branch
5. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Custom Domain (Optional)

1. In repo Settings → Pages → Custom domain, enter your domain
2. Add a `CNAME` file to your repo with your domain name
3. Configure DNS with your domain provider (CNAME to `YOUR_USERNAME.github.io`)

## Browser Support

Works in all modern browsers. Uses:
- CSS Grid & Flexbox
- CSS Custom Properties
- Leaflet.js for maps
- ES6 JavaScript

## License

Feel free to use and modify for your own portfolio!
