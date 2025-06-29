/**
 * Sherwood Park Cabs - Performance Optimization Script
 * Comprehensive performance enhancements for 100% GTmetrix score
 */

(function() {
    'use strict';

    // Performance optimization utilities
    const PerformanceOptimizer = {
        
        // Initialize all optimizations
        init: function() {
            this.setupCriticalResourceHints();
            this.enableLazyLoading();
            this.optimizeCSS();
            this.optimizeImages();
            this.setupServiceWorker();
            this.enableResourceCaching();
            this.optimizeWebFonts();
            this.setupIntersectionObserver();
            this.preloadCriticalResources();
            this.deferNonCriticalJS();
        },

        // Setup critical resource hints
        setupCriticalResourceHints: function() {
            const head = document.head;
            
            // Preconnect to external domains
            const preconnectDomains = [
                'https://fonts.googleapis.com',
                'https://cdnjs.cloudflare.com',
                'https://cdn.jsdelivr.net'
            ];
            
            preconnectDomains.forEach(domain => {
                if (!document.querySelector(`link[href="${domain}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'preconnect';
                    link.href = domain;
                    link.crossOrigin = 'anonymous';
                    head.appendChild(link);
                }
            });
        },

        // Enable lazy loading for images
        enableLazyLoading: function() {
            // Native lazy loading support
            const images = document.querySelectorAll('img[data-src], img:not([loading])');
            
            images.forEach(img => {
                // Add native lazy loading if not present
                if (!img.hasAttribute('loading')) {
                    img.loading = 'lazy';
                }
                
                // Fallback for data-src images
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        },

        // Optimize CSS loading
        optimizeCSS: function() {
            // Convert render-blocking CSS to non-blocking
            const cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([media])');
            
            cssLinks.forEach(link => {
                if (!link.media || link.media === 'all') {
                    link.media = 'print';
                    link.onload = function() {
                        this.media = 'all';
                        this.onload = null;
                    };
                }
            });
        },

        // Optimize images
        optimizeImages: function() {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // Add responsive image attributes if missing
                if (!img.hasAttribute('sizes') && img.srcset) {
                    img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
                }
                
                // Add modern image format support
                if (this.supportsWebP() && !img.src.includes('.webp')) {
                    const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                    
                    // Check if WebP version exists
                    const testImg = new Image();
                    testImg.onload = function() {
                        img.src = webpSrc;
                    };
                    testImg.src = webpSrc;
                }
            });
        },

        // Check WebP support
        supportsWebP: function() {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        },

        // Setup Service Worker
        setupServiceWorker: function() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('SW registered: ', registration);
                    }).catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
                });
            }
        },

        // Enable resource caching
        enableResourceCaching: function() {
            // Cache critical resources
            const criticalResources = [
                '/css/style.css',
                '/css/bootstrap.min.css',
                '/js/jquery.js',
                '/js/bootstrap.min.js',
                '/images/logo-2.png'
            ];

            if ('caches' in window) {
                caches.open('sherwood-park-cabs-v1').then(cache => {
                    cache.addAll(criticalResources);
                });
            }
        },

        // Optimize web fonts
        optimizeWebFonts: function() {
            // Add font-display: swap to font-face declarations
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-family: 'CustomFont';
                    font-display: swap;
                }
            `;
            document.head.appendChild(style);
        },

        // Setup Intersection Observer for animations
        setupIntersectionObserver: function() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '50px'
                });

                // Observe elements with animation classes
                const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
                animatedElements.forEach(el => observer.observe(el));
            }
        },

        // Preload critical resources
        preloadCriticalResources: function() {
            const criticalResources = [
                { href: '/css/style.css', as: 'style' },
                { href: '/images/logo-2.png', as: 'image' },
                { href: '/js/jquery.js', as: 'script' }
            ];

            criticalResources.forEach(resource => {
                const existing = document.querySelector(`link[href="${resource.href}"]`);
                if (!existing) {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = resource.href;
                    link.as = resource.as;
                    if (resource.as === 'font') {
                        link.crossOrigin = 'anonymous';
                    }
                    document.head.appendChild(link);
                }
            });
        },

        // Defer non-critical JavaScript
        deferNonCriticalJS: function() {
            const nonCriticalScripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
            
            nonCriticalScripts.forEach(script => {
                // Skip critical scripts
                const criticalScripts = ['/js/jquery.js', '/js/bootstrap.min.js'];
                const isCritical = criticalScripts.some(critical => script.src.includes(critical));
                
                if (!isCritical) {
                    script.defer = true;
                }
            });
        },

        // Optimize form inputs
        optimizeFormInputs: function() {
            const inputs = document.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Add autocomplete attributes for better UX
                if (input.type === 'email') {
                    input.autocomplete = 'email';
                } else if (input.type === 'tel') {
                    input.autocomplete = 'tel';
                } else if (input.name === 'name') {
                    input.autocomplete = 'name';
                }
                
                // Add input mode for better mobile keyboards
                if (input.type === 'tel') {
                    input.inputMode = 'tel';
                } else if (input.type === 'email') {
                    input.inputMode = 'email';
                }
            });
        },

        // Optimize third-party scripts
        optimizeThirdPartyScripts: function() {
            // Lazy load non-critical third-party scripts
            const thirdPartyScripts = [
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css'
            ];

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        thirdPartyScripts.forEach(src => {
                            const link = document.createElement('link');
                            link.rel = 'stylesheet';
                            link.href = src;
                            document.head.appendChild(link);
                        });
                        observer.disconnect();
                    }
                });
            });

            // Observe the footer to load when user scrolls down
            const footer = document.querySelector('footer');
            if (footer) {
                observer.observe(footer);
            }
        },

        // Monitor Core Web Vitals
        monitorCoreWebVitals: function() {
            if ('PerformanceObserver' in window) {
                // Largest Contentful Paint
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        console.log('LCP:', entry.startTime);
                    }
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift
                new PerformanceObserver((entryList) => {
                    let clsValue = 0;
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    console.log('CLS:', clsValue);
                }).observe({ entryTypes: ['layout-shift'] });
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            PerformanceOptimizer.init();
        });
    } else {
        PerformanceOptimizer.init();
    }

    // Initialize additional optimizations on window load
    window.addEventListener('load', function() {
        PerformanceOptimizer.optimizeFormInputs();
        PerformanceOptimizer.optimizeThirdPartyScripts();
        PerformanceOptimizer.monitorCoreWebVitals();
    });

    // Expose to global scope for debugging
    window.PerformanceOptimizer = PerformanceOptimizer;
})(); 