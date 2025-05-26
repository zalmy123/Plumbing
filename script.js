document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const mainElement = document.querySelector('main');
  const scrollThresholdForShrink = 30; // Pixels to scroll within hero before shrinking hero-logo
  const smallLogoHeightWithMargin = 100; // Approx. height of small fixed logo + top offset + buffer (adjust as needed)

  // --- Homepage Logo Logic ---
  if (body.classList.contains('home-page')) {
    const heroSection = document.querySelector('.hero');
    const heroLogo = document.getElementById('hero-site-logo');
    const fixedLogoContainer = document.getElementById('fixed-logo-container');

    function handleHomepageScroll() {
      if (!heroSection || !heroLogo || !fixedLogoContainer || !mainElement) {
        // console.warn("Homepage scroll: Missing critical elements.");
        return;
      }

      const heroRect = heroSection.getBoundingClientRect();
      const heroBottomOnScreen = heroRect.bottom;
      const heroTopPassedScrollThreshold = window.pageYOffset > (heroSection.offsetTop + scrollThresholdForShrink);

      if (heroTopPassedScrollThreshold || (heroRect.top < 0 && heroBottomOnScreen > 0) ) {
        heroLogo.classList.add('scrolled-in-hero');
      } else if (heroRect.top >= 0) { 
        heroLogo.classList.remove('scrolled-in-hero');
      }

      if (heroBottomOnScreen <= 0) {
        fixedLogoContainer.classList.add('visible');
        mainElement.style.paddingTop = smallLogoHeightWithMargin + 'px';
        heroLogo.style.opacity = '0'; 
      }
      else {
        fixedLogoContainer.classList.remove('visible');
        mainElement.style.paddingTop = '0';
        heroLogo.style.opacity = '1';
      }
    }

    if (heroSection && heroLogo && fixedLogoContainer && mainElement) {
      handleHomepageScroll(); 
      window.addEventListener('scroll', handleHomepageScroll);
      window.addEventListener('resize', handleHomepageScroll); 
    }
  }

  // --- Contact Page Logo & Padding Logic ---
  if (body.classList.contains('contact-page')) {
    const contactLogo = document.getElementById('contact-page-fixed-logo');
    if (contactLogo && mainElement) {
      mainElement.style.paddingTop = smallLogoHeightWithMargin + 'px'; 
    }

    // Conditional form fields for Contact Page
    const existingSepticRadios = document.querySelectorAll('input[name="existing_septic"]');
    const septicLocationGroup = document.getElementById('septic_location_group');
    const septicLocationSelect = document.getElementById('septic_location');

    existingSepticRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'Yes' && this.checked) {
          septicLocationGroup.style.display = 'block';
          septicLocationSelect.required = true;
        } else {
          septicLocationGroup.style.display = 'none';
          septicLocationSelect.required = false;
          septicLocationSelect.value = ''; // Clear selection
        }
      });
    });
    // Initial check in case of browser pre-fill
    if (document.querySelector('input[name="existing_septic"][value="Yes"]:checked')) {
        septicLocationGroup.style.display = 'block';
        septicLocationSelect.required = true;
    }


    const existingWaterServiceRadios = document.querySelectorAll('input[name="existing_water_service"]');
    const waterServiceLocationGroup = document.getElementById('water_service_location_group');
    const waterServiceLocationInput = document.getElementById('water_service_location');

    existingWaterServiceRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'Yes' && this.checked) {
          waterServiceLocationGroup.style.display = 'block';
          waterServiceLocationInput.required = true;
        } else {
          waterServiceLocationGroup.style.display = 'none';
          waterServiceLocationInput.required = false;
          waterServiceLocationInput.value = ''; // Clear input
        }
      });
    });
    // Initial check
    if (document.querySelector('input[name="existing_water_service"][value="Yes"]:checked')) {
        waterServiceLocationGroup.style.display = 'block';
        waterServiceLocationInput.required = true;
    }

  }


  // --- General smooth scroll for anchor links (optional) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hrefAttribute = this.getAttribute('href');
      if (hrefAttribute && hrefAttribute.length > 1 && hrefAttribute !== '#') { // ensure it's not just "#"
        try {
          const targetElement = document.querySelector(hrefAttribute);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          console.warn('Smooth scroll failed for selector:', hrefAttribute, error);
        }
      }
    });
  });
});
