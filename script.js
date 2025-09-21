const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar'); 

function toggleMenu() {
  navLinks.classList.toggle('show');
  burger.classList.toggle('toggle');
}

let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      dots[i].classList.add('active');
    }
  });
  current = index;
}

function currentSlide(index) {
  showSlide(index);
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

let lastScrollTop = 0; 
const scrollThreshold = 50; 

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight + scrollThreshold) {
    navbar.classList.remove('show-nav'); 
  } else if (scrollTop < lastScrollTop && scrollTop > 0) {
    navbar.classList.add('show-nav');
  } else if (scrollTop === 0) {
    navbar.classList.add('show-nav');
  }
  lastScrollTop = scrollTop;
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.pageYOffset === 0) {
    navbar.classList.add('show-nav');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  if (contactForm && confirmationMessage) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
      if (contactForm.checkValidity()) {
        confirmationMessage.textContent = 'Message submitted successfully!';
        confirmationMessage.style.display = 'block'; 
        contactForm.reset(); 
        setTimeout(() => {
          confirmationMessage.style.display = 'none';
          confirmationMessage.textContent = '';
        }, 3000);
      }
    });
  }
});

let mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

mybutton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== CART / SEARCH / FILTER =====
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const filterCategory = document.getElementById('filterCategory');
  const cards = document.querySelectorAll('.service-card');
  const successMsg = document.getElementById('successMsg');
  const cartCount = document.getElementById('cartCount');

  let cart = JSON.parse(localStorage.getItem('harleyCart')) || [];
  updateCartCount();

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  function showSuccess(message){
    if (successMsg) {
      successMsg.textContent = message;
      successMsg.style.display = 'block';
      setTimeout(() => successMsg.style.display = 'none', 1500);
    }
  }

  function filterServices(){
    const query = searchInput.value.toLowerCase();
    const category = filterCategory.value;
    cards.forEach(card => {
      const matchesText = card.innerText.toLowerCase().includes(query);
      const section = card.closest('.service-category').dataset.category;
      const matchesCat = (category === 'all' || category === section);
      card.style.display = (matchesText && matchesCat) ? 'flex' : 'none';
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', filterServices);
  }
  if (searchInput) {
    searchInput.addEventListener('keyup', e => { if(e.key === 'Enter') filterServices(); });
  }
  if (filterCategory) {
    filterCategory.addEventListener('change', filterServices);
  }

  // Add to cart / avail
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const item = {
        name: card.querySelector('h3').innerText,
        price: card.querySelector('.price').innerText
      };
      cart.push(item);
      localStorage.setItem('harleyCart', JSON.stringify(cart));
      updateCartCount();
      showSuccess(`${item.name} successfully added!`);
    });
  });

  // Initial filter on load to display all cards correctly
  filterServices(); 
});