// Intersection Observer for Scroll Animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .glass-card').forEach(el => {
    observer.observe(el);
  });
};

// Smooth Scrolling for Navigation Links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed/sticky header
          behavior: 'smooth'
        });
      }
    });
  });
};

// Form Handling
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Enviar usando FormSubmit API
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      fetch("https://formsubmit.co/ajax/jadonis123@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Nombre: name,
            Correo: email,
            Reto: message,
            _subject: `Nueva solicitud de adaptación de ${name}`
        })
      })
      .then(response => response.json())
      .then(data => {
        alert('¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.');
        form.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar la solicitud. Por favor intenta de nuevo.');
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }
};

// Image Fallback Handling
const initImageFallback = () => {
  const heroImg = document.getElementById('hero-img');
  const fallback = document.getElementById('img-fallback');

  if (heroImg) {
    heroImg.onerror = () => {
      heroImg.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
    };

    heroImg.onload = () => {
      if (fallback) fallback.style.display = 'none';
    };
  }
};

// Custom Toast Handling
const showToast = () => {
  const toast = document.getElementById('toast-notification');
  if (toast) {
    toast.classList.remove('hidden');
  }
};

const initToastHandling = () => {
  const closeBtn = document.getElementById('close-toast');
  const toast = document.getElementById('toast-notification');
  
  if (closeBtn && toast) {
    closeBtn.addEventListener('click', () => {
      toast.classList.add('hidden');
    });
    
    // Cerrar al hacer click fuera
    toast.addEventListener('click', (e) => {
      if (e.target === toast) {
        toast.classList.add('hidden');
      }
    });
  }
};

// Form Handling Customization (Modified)
const customizeFormSubmit = () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Enviar usando FormSubmit API
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      fetch("https://formsubmit.co/ajax/jadonis123@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Nombre: name,
            Correo: email,
            Reto: message,
            _subject: `Nueva solicitud de adaptación de ${name}`,
            _template: "box"
        })
      })
      .then(response => response.json())
      .then(data => {
        showToast();
        form.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar la solicitud. Por favor intenta de nuevo.');
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  initSmoothScroll();
  initToastHandling();
  customizeFormSubmit();
  initImageFallback();
});
