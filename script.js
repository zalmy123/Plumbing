document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const mainElement = document.querySelector('main');
  const scrollThresholdForShrink = 30; // Pixels to scroll within hero before shrinking hero-logo
  const smallLogoHeightWithMargin = 100; // Approx. height of small fixed logo + top offset + buffer (adjust as needed)

  // --- Homepage Logo Logic ---
  if (body.classList.contains('home-page')) {
    const heroSection = document.querySelector('.hero');
    const heroLogo = document.getElementById('hero-site-logo');
    const fixedLogoContainer = document.getElementById('fixed-logo-container'); // The one outside main

    function handleHomepageScroll() {
      if (!heroSection || !heroLogo || !fixedLogoContainer || !mainElement) {
        console.warn("Homepage scroll: Missing critical elements.");
        return;
      }

      const heroRect = heroSection.getBoundingClientRect();
      const heroBottomOnScreen = heroRect.bottom;
      const heroTopPassedScrollThreshold = window.pageYOffset > (heroSection.offsetTop + scrollThresholdForShrink);

      // Shrink logo within hero if scrolled past threshold OR hero top is above viewport (but hero still visible)
      if (heroTopPassedScrollThreshold || (heroRect.top < 0 && heroBottomOnScreen > 0) ) {
        heroLogo.classList.add('scrolled-in-hero');
      } else if (heroRect.top >= 0) { // Only remove if hero top is back in view
        heroLogo.classList.remove('scrolled-in-hero');
      }

      // Condition: Hero is completely scrolled off the top of the screen
      if (heroBottomOnScreen <= 0) {
        fixedLogoContainer.classList.add('visible');
        mainElement.style.paddingTop = smallLogoHeightWithMargin + 'px';
        heroLogo.style.opacity = '0'; // Hide hero logo when fixed one is visible
      }
      // Condition: Hero is at least partially visible on screen
      else {
        fixedLogoContainer.classList.remove('visible');
        mainElement.style.paddingTop = '0';
        heroLogo.style.opacity = '1';
      }
    }

    // Initial check and event listener for homepage
    if (heroSection && heroLogo && fixedLogoContainer && mainElement) {
      handleHomepageScroll(); // Call once on load
      window.addEventListener('scroll', handleHomepageScroll);
      window.addEventListener('resize', handleHomepageScroll); // Re-check on resize
    }
  }

  // --- Contact Page Logo & Padding Logic ---
  if (body.classList.contains('contact-page')) {
    const contactLogo = document.getElementById('contact-page-fixed-logo');
    if (contactLogo && mainElement) {
      // Ensure main has padding for the fixed logo on contact page
      // This value should match or be slightly more than the logo's height + its top offset + a small buffer
      mainElement.style.paddingTop = smallLogoHeightWithMargin + 'px'; 
    }
  }


  // --- General smooth scroll for anchor links (optional) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hrefAttribute = this.getAttribute('href');
      if (hrefAttribute && hrefAttribute.length > 1) {
        const targetElement = document.querySelector(hrefAttribute);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});