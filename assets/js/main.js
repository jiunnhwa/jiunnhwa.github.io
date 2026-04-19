// Google Analytics Event Tracking
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PDF DOWNLOAD TRACKING
    // ============================================
    const pdfDownload = document.getElementById('pdf-download');
    if (pdfDownload) {
        pdfDownload.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Track the PDF download event
            if (typeof trackEvent !== 'undefined') {
                trackEvent('download', 'Resume', 'PDF Download', 1);
            }
            
            // Small delay to ensure tracking fires before print dialog
            setTimeout(function() {
                window.print();
            }, 100);
        });
    }
    
    // ============================================
    // DARK MODE TRACKING
    // ============================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        body.classList.add('dark');
        if (darkModeToggle) {
            const span = darkModeToggle.querySelector('span:last-child');
            if (span) span.textContent = 'Light Mode';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isDark = body.classList.contains('dark');
            const newMode = !isDark;
            
            // Toggle the class
            body.classList.toggle('dark');
            
            // Track the dark mode toggle event
            if (typeof trackEvent !== 'undefined') {
                trackEvent('toggle', 'Dark Mode', newMode ? 'Enabled' : 'Disabled', 1);
            }
            
            // Update localStorage
            if (newMode) {
                localStorage.setItem('darkMode', 'enabled');
                const span = this.querySelector('span:last-child');
                if (span) span.textContent = 'Light Mode';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                const span = this.querySelector('span:last-child');
                if (span) span.textContent = 'Dark Mode';
            }
        });
    }
    
    // ============================================
    // PAGE VIEW TRACKING (with page details)
    // ============================================
    if (typeof trackEvent !== 'undefined') {
        // Track page view with page title and URL
        trackEvent('page_view', 'Navigation', window.location.pathname, 1);
    }
    
    // ============================================
    // EXTERNAL LINK TRACKING
    // ============================================
    // Track clicks on external links (GitHub, LinkedIn, etc.)
    const externalLinks = document.querySelectorAll('a[href^="https://github.com"], a[href^="https://linkedin.com"], a[href^="mailto:"]');
    externalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkUrl = this.getAttribute('href');
            
            if (typeof trackEvent !== 'undefined') {
                trackEvent('click', 'External Link', linkText + ' (' + linkUrl + ')', 1);
            }
        });
    });
    
    // ============================================
    // TIME ON PAGE TRACKING (basic engagement)
    // ============================================
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 5 && typeof trackEvent !== 'undefined') {
            trackEvent('engagement', 'Time on Page', window.location.pathname, timeSpent);
        }
    });
    
    // ============================================
    // SCROLL DEPTH TRACKING
    // ============================================
    let maxScrollPercent = 0;
    let scrollTracked = false;
    
    window.addEventListener('scroll', function() {
        if (!scrollTracked) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScrollPercent) {
                maxScrollPercent = scrollPercent;
                
                // Track at 25%, 50%, 75%, 100%
                if (maxScrollPercent >= 25 && maxScrollPercent < 30 && typeof trackEvent !== 'undefined') {
                    trackEvent('scroll', 'Depth', '25%', 1);
                } else if (maxScrollPercent >= 50 && maxScrollPercent < 55 && typeof trackEvent !== 'undefined') {
                    trackEvent('scroll', 'Depth', '50%', 1);
                } else if (maxScrollPercent >= 75 && maxScrollPercent < 80 && typeof trackEvent !== 'undefined') {
                    trackEvent('scroll', 'Depth', '75%', 1);
                } else if (maxScrollPercent >= 95 && !scrollTracked && typeof trackEvent !== 'undefined') {
                    trackEvent('scroll', 'Depth', '100%', 1);
                    scrollTracked = true;
                }
            }
        }
    });
    
    // ============================================
    // MOBILE SIDEBAR TOGGLE TRACKING
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (mobileToggle && sidebar && overlay) {
        let sidebarOpened = false;
        
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
            
            sidebarOpened = sidebar.classList.contains('mobile-open');
            
            if (typeof trackEvent !== 'undefined') {
                trackEvent('toggle', 'Mobile Sidebar', sidebarOpened ? 'Opened' : 'Closed', 1);
            }
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            
            if (typeof trackEvent !== 'undefined') {
                trackEvent('toggle', 'Mobile Sidebar', 'Closed via Overlay', 1);
            }
        });
    }
    
    // ============================================
    // BLOG POST ENGAGEMENT TRACKING
    // ============================================
    // Track when user clicks "Read more" on blog posts
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const postTitle = this.closest('.post-item')?.querySelector('.post-title')?.textContent || 'Unknown';
            
            if (typeof trackEvent !== 'undefined') {
                trackEvent('click', 'Blog', 'Read More: ' + postTitle, 1);
            }
        });
    });
    
    // ============================================
    // PROJECT CARD CLICK TRACKING
    // ============================================
    const projectCards = document.querySelectorAll('.project-card a');
    projectCards.forEach(function(link) {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card')?.querySelector('h3')?.textContent || 'Unknown';
            const linkType = this.textContent.includes('GitHub') ? 'GitHub' : 'Live Demo';
            
            if (typeof trackEvent !== 'undefined') {
                trackEvent('click', 'Projects', projectName + ' - ' + linkType, 1);
            }
        });
    });
    
    // ============================================
    // ACTIVE NAV HIGHLIGHTING
    // ============================================
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(function(item) {
        const href = item.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            item.classList.add('active');
        }
    });
    
    // Console confirmation that tracking is active (for debugging)
    if (typeof trackEvent !== 'undefined') {
        console.log('✅ Google Analytics Event Tracking Active');
        console.log('📍 Current page: ' + window.location.pathname);
    } else {
        console.log('⚠️ Google Analytics not configured. Add google_analytics to _config.yml');
    }
});
