// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Album navigation
const albumCards = document.querySelectorAll('.album-card');
const timelineAlbums = document.querySelectorAll('.timeline-album');
const albumsGrid = document.getElementById('albums-grid');
const albumDetails = document.querySelectorAll('.album-detail');

function showAlbum(albumId) {
    albumsGrid.style.display = 'none';
    albumDetails.forEach(detail => detail.classList.remove('active'));
    
    const targetAlbum = document.getElementById(`album-${albumId}`);
    if (targetAlbum) {
        targetAlbum.classList.add('active');
        
        // Initialize map if it's a trip album
        if (albumId === 'japan-2024') {
            initTripMap();
        }
    }

    // Update timeline active state
    timelineAlbums.forEach(album => {
        album.classList.toggle('active', album.dataset.album === albumId);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAlbumGrid() {
    albumDetails.forEach(detail => detail.classList.remove('active'));
    albumsGrid.style.display = 'block';
    timelineAlbums.forEach(album => album.classList.remove('active'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

albumCards.forEach(card => {
    card.addEventListener('click', () => {
        showAlbum(card.dataset.album);
    });
});

timelineAlbums.forEach(album => {
    album.addEventListener('click', (e) => {
        e.preventDefault();
        showAlbum(album.dataset.album);
    });
});

// Trip map initialization
let tripMap = null;

function initTripMap() {
    if (tripMap) {
        tripMap.remove();
    }

    tripMap = L.map('trip-map', {
        scrollWheelZoom: false
    }).setView([35.6762, 139.6503], 6);

    // Dark map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(tripMap);

    // Locations - customize these for your trips!
    const locations = [
        { name: 'Tokyo', coords: [35.6762, 139.6503], dates: 'Oct 12-15' },
        { name: 'Kyoto', coords: [35.0116, 135.7681], dates: 'Oct 16-19' },
        { name: 'Nara', coords: [34.6851, 135.8048], dates: 'Oct 20-21' },
        { name: 'Osaka', coords: [34.6937, 135.5023], dates: 'Oct 22-26' }
    ];

    // Custom marker icon
    const markerIcon = L.divIcon({
        className: 'custom-marker',
        iconSize: [16, 16]
    });

    // Add markers
    locations.forEach(loc => {
        L.marker(loc.coords, { icon: markerIcon })
            .addTo(tripMap)
            .bindPopup(`<strong>${loc.name}</strong><br>${loc.dates}`);
    });

    // Draw route line
    const routeCoords = locations.map(loc => loc.coords);
    L.polyline(routeCoords, {
        color: '#d4a574',
        weight: 2,
        opacity: 0.7,
        dashArray: '5, 10'
    }).addTo(tripMap);

    // Fit bounds
    tripMap.fitBounds(routeCoords, { padding: [50, 50] });
}

// Trip timeline interaction
const tripDays = document.querySelectorAll('.trip-day');
tripDays.forEach(day => {
    day.addEventListener('click', () => {
        tripDays.forEach(d => d.classList.remove('active'));
        day.classList.add('active');
        
        // You can add filtering logic here to show photos from specific days
        const dayIndex = day.dataset.day;
        console.log(`Selected day: ${dayIndex}`);
    });
});

// Lightbox
let currentImages = [];
let currentImageIndex = 0;

function openLightbox(element) {
    const img = element.querySelector('img');
    const gallery = element.closest('.gallery-masonry, .family-featured');
    
    currentImages = Array.from(gallery.querySelectorAll('.gallery-item img')).map(i => {
        // Get the full-size image URL (modify this based on your image naming convention)
        return i.src.replace(/w=\d+/, 'w=1200');
    });
    currentImageIndex = currentImages.indexOf(img.src.replace(/w=\d+/, 'w=1200'));
    
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    document.getElementById('lightbox-image').src = currentImages[currentImageIndex];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById('lightbox-image').src = currentImages[currentImageIndex];
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    document.getElementById('lightbox-image').src = currentImages[currentImageIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
});

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});
