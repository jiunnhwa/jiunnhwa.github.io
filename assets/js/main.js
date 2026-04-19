// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark');
        if (darkModeToggle) {
            const span = darkModeToggle.querySelector('span:last-child');
            if (span) span.textContent = 'Light Mode';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            body.classList.toggle('dark');
            
            const span = this.querySelector('span:last-child');
            if (body.classList.contains('dark')) {
                localStorage.setItem('darkMode', 'enabled');
                if (span) span.textContent = 'Light Mode';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                if (span) span.textContent = 'Dark Mode';
            }
        });
    }
    
    // PDF Download (using browser print)
    const pdfDownload = document.getElementById('pdf-download');
    if (pdfDownload) {
        pdfDownload.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
    
    // Mobile sidebar toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (mobileToggle && sidebar && overlay) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }
    
    // Active nav highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            item.classList.add('active');
        }
    });
});