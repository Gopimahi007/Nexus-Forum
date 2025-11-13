// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'dark';
let isMenuOpen = false;
let isSearchOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Nexus Forum Initialized');
  
  // Initialize all features
  initTheme();
  initNavigation();
  initLoadingScreen();
  initSearch();
  initCounters();
  initAOS();
  initForms();
  initTabs();
  initVoting();
  initModals();
  initCodeCopy();
  initFilters();
  initPasswordStrength();
  initTooltips();
  initSmoothScroll();
  createParticles();
  
  // Auto-hide loading screen after 1.5 seconds
  setTimeout(() => {
    hideLoadingScreen();
  }, 1500);
});

// ===== THEME TOGGLE =====
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Set initial theme
  if (currentTheme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // Theme toggle click event
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark');
      body.classList.toggle('light');

      if (body.classList.contains('dark')) {
        currentTheme = 'dark';
        this.innerHTML = '<i class="fas fa-sun"></i>';
        showToast('Dark mode activated 🌙', 'info');
      } else {
        currentTheme = 'light';
        this.innerHTML = '<i class="fas fa-moon"></i>';
        showToast('Light mode activated ☀️', 'info');
      }

      localStorage.setItem('theme', currentTheme);
      
      // Add animation effect
      body.style.transition = 'background 0.5s ease, color 0.5s ease';
    });
  }
}

// ===== NAVIGATION =====
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      isMenuOpen = !isMenuOpen;

      // Prevent body scroll when menu is open
      if (isMenuOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'auto';
      }
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        isMenuOpen = false;
        body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        isMenuOpen = false;
        body.style.overflow = 'auto';
      }
    });
  }
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  if (loadingScreen) {
    // Add random loading messages
    const messages = [
      'INITIALIZING NEXUS...',
      'LOADING QUANTUM DATA...',
      'CONNECTING TO MATRIX...',
      'ACTIVATING SYSTEMS...',
      'PREPARING INTERFACE...'
    ];
    
    const loadingText = loadingScreen.querySelector('.loading-text');
    if (loadingText) {
      loadingText.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// ===== SEARCH MODAL =====
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = searchModal?.querySelector('.cyber-search');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', function() {
      searchModal.classList.add('active');
      isSearchOpen = true;
      setTimeout(() => {
        searchInput?.focus();
      }, 300);
    });
  }

  if (closeSearch && searchModal) {
    closeSearch.addEventListener('click', function() {
      searchModal.classList.remove('active');
      isSearchOpen = false;
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isSearchOpen && searchModal) {
      searchModal.classList.remove('active');
      isSearchOpen = false;
    }
  });

  // Close on outside click
  if (searchModal) {
    searchModal.addEventListener('click', function(e) {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
        isSearchOpen = false;
      }
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm.length > 2) {
        console.log('Searching for:', searchTerm);
        // Implement actual search functionality here
      }
    });
  }
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  // Intersection Observer for counters
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// ===== ANIMATE ON SCROLL (AOS) =====
function initAOS() {
  const aosElements = document.querySelectorAll('[data-aos]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  aosElements.forEach(element => {
    observer.observe(element);
  });
}

// ===== FORMS =====
function initForms() {
  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = this.querySelector('input[type="text"]').value;
      
      // Simulate login
      showToast(`Welcome back, ${username}! 🎉`, 'success');
      
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1500);
    });
  }

  // Signup Form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;
      
      // Basic validation
      if (password.length < 8) {
        showToast('Password must be at least 8 characters! ⚠️', 'warning');
        return;
      }

      if (!email.includes('@')) {
        showToast('Please enter a valid email! ⚠️', 'warning');
        return;
      }
      
      // Simulate signup
      showToast(`Account created for ${username}! 🚀`, 'success');
      
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  }

  // Reply Form
  const replyForm = document.getElementById('replyForm');
  if (replyForm) {
    replyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const replyText = this.querySelector('textarea').value;
      
      if (replyText.trim().length < 10) {
        showToast('Reply must be at least 10 characters! ⚠️', 'warning');
        return;
      }
      
      showToast('Reply posted successfully! 💬', 'success');
      this.querySelector('textarea').value = '';
      
      // Add new reply to the thread (simulate)
      addNewReply(replyText);
    });
  }

  // Password Toggle
  initPasswordToggle();
}

// ===== PASSWORD TOGGLE =====
function initPasswordToggle() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

// ===== PASSWORD STRENGTH METER =====
function initPasswordStrength() {
  const passwordInput = document.getElementById('signupPassword');
  const strengthBar = document.querySelector('.strength-fill');
  const strengthText = document.querySelector('.strength-text');

  if (passwordInput && strengthBar && strengthText) {
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      const strength = calculatePasswordStrength(password);
      
      strengthBar.style.width = strength.percentage + '%';
      strengthBar.className = 'strength-fill ' + strength.class;
      strengthText.textContent = 'Password Strength: ' + strength.text;
    });
  }
}

function calculatePasswordStrength(password) {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  if (score <= 2) {
    return { percentage: 33, class: 'weak', text: 'Weak' };
  } else if (score <= 4) {
    return { percentage: 66, class: 'medium', text: 'Medium' };
  } else {
    return { percentage: 100, class: 'strong', text: 'Strong' };
  }
}

// ===== TABS =====
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// ===== VOTING SYSTEM =====
function initVoting() {
  const voteButtons = document.querySelectorAll('.vote-btn');
  
  voteButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const voteType = this.getAttribute('data-vote');
      const voteCount = this.parentElement.querySelector('.vote-count');
      let currentCount = parseInt(voteCount.textContent);
      
      // Toggle vote
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        voteCount.textContent = voteType === 'up' ? currentCount - 1 : currentCount + 1;
      } else {
        // Remove active from sibling
        const sibling = voteType === 'up' 
          ? this.parentElement.querySelector('[data-vote="down"]')
          : this.parentElement.querySelector('[data-vote="up"]');
        
        if (sibling && sibling.classList.contains('active')) {
          sibling.classList.remove('active');
          currentCount = voteType === 'up' ? currentCount + 2 : currentCount - 2;
        } else {
          currentCount = voteType === 'up' ? currentCount + 1 : currentCount - 1;
        }
        
        this.classList.add('active');
        voteCount.textContent = currentCount;
      }
      
      // Animation
      voteCount.style.transform = 'scale(1.2)';
      setTimeout(() => {
        voteCount.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

// ===== MODALS =====
function initModals() {
  // New Thread Modal
  const newThreadBtn = document.getElementById('newThreadBtn');
  const newThreadModal = document.getElementById('newThreadModal');
  const closeThreadModal = document.getElementById('closeThreadModal');

  if (newThreadBtn && newThreadModal) {
    newThreadBtn.addEventListener('click', function() {
      newThreadModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeThreadModal && newThreadModal) {
    closeThreadModal.addEventListener('click', function() {
      newThreadModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Close modal on outside click
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    }
  });

  // Thread Form Submit
  const threadForm = newThreadModal?.querySelector('.thread-form');
  if (threadForm) {
    threadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Thread created successfully! 🎉', 'success');
      newThreadModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      this.reset();
      
      setTimeout(() => {
        window.location.href = 'thread.html';
      }, 1000);
    });
  }
}

// ===== CODE COPY FUNCTIONALITY =====
function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.copy-code');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;
      
      // Copy to clipboard
      navigator.clipboard.writeText(code).then(() => {
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.style.background = 'rgba(0, 255, 136, 0.2)';
        this.style.borderColor = 'var(--success)';
        this.style.color = 'var(--success)';
        
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.style.background = '';
          this.style.borderColor = '';
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy code! ❌', 'error');
      });
    });
  });
}

// ===== FILTERS =====
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      console.log('Filtering by:', filter);
      
      // Implement actual filtering logic here
      showToast(`Showing ${filter} threads 🔍`, 'info');
    });
  });
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (toast && toastMessage) {
    // Remove previous type classes
    toast.classList.remove('success', 'error', 'warning', 'info');
    
    // Add new type class
    toast.classList.add(type);
    
    // Set message
    toastMessage.textContent = message;
    
    // Update icon
    const icon = toast.querySelector('i');
    if (icon) {
      icon.className = '';
      switch(type) {
        case 'success':
          icon.className = 'fas fa-check-circle';
          break;
        case 'error':
          icon.className = 'fas fa-times-circle';
          break;
        case 'warning':
          icon.className = 'fas fa-exclamation-triangle';
          break;
        case 'info':
          icon.className = 'fas fa-info-circle';
          break;
      }
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// ===== TOOLTIPS =====
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[title]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (title) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = title;
        tooltip.style.cssText = `
          position: absolute;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
          z-index: 10000;
          pointer-events: none;
          white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const updatePosition = (e) => {
          tooltip.style.left = e.pageX + 10 + 'px';
          tooltip.style.top = e.pageY + 10 + 'px';
        };
        
        this.addEventListener('mousemove', updatePosition);
        updatePosition({ pageX: this.offsetLeft, pageY: this.offsetTop });
        
        this.addEventListener('mouseleave', function() {
          tooltip.remove();
          this.removeEventListener('mousemove', updatePosition);
        }, { once: true });
      }
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ===== PARTICLES EFFECT =====
function createParticles() {
  const particlesBg = document.getElementById('particles-bg');
  
  if (particlesBg) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      
      particlesBg.appendChild(particle);
    }
  }
}

// ===== ADD NEW REPLY (SIMULATED) =====
function addNewReply(replyText) {
  const threadContent = document.querySelector('.thread-content');
  
  if (threadContent) {
    const newReply = document.createElement('div');
    newReply.className = 'post-item glass reply';
    newReply.style.animation = 'fadeInUp 0.5s ease';
    
    newReply.innerHTML = `
      <div class="post-sidebar">
        <div class="post-avatar">
          <img src="https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}" alt="User">
        </div>
        <div class="post-actions-vertical">
          <button class="vote-btn upvote" data-vote="up">
            <i class="fas fa-arrow-up"></i>
          </button>
          <span class="vote-count">0</span>
          <button class="vote-btn downvote" data-vote="down">
            <i class="fas fa-arrow-down"></i>
          </button>
        </div>
      </div>

      <div class="post-main">
        <div class="post-header-info">
          <div class="post-author-details">
            <h3 class="post-author-name">You</h3>
            <span class="post-author-badge verified">✓</span>
            <span class="post-author-title">New Member</span>
          </div>
          <div class="post-timestamp">
            <i class="fas fa-clock"></i> Just now
          </div>
        </div>

        <div class="post-content-body">
          <p>${replyText}</p>
        </div>

        <div class="post-footer-actions">
          <button class="action-btn">
            <i class="fas fa-reply"></i> Reply
          </button>
          <button class="action-btn">
            <i class="fas fa-share"></i> Share
          </button>
          <button class="action-btn">
            <i class="fas fa-bookmark"></i> Save
          </button>
        </div>
      </div>
    `;
    
    const replyFormSection = document.querySelector('.reply-form-section');
    if (replyFormSection) {
      threadContent.insertBefore(newReply, replyFormSection);
      
      // Scroll to new reply
      setTimeout(() => {
        newReply.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      
      // Re-initialize voting for new reply
      initVoting();
    }
  }
}

// ===== ACTION BUTTONS =====
document.addEventListener('click', function(e) {
  // Like/Save buttons
  if (e.target.closest('.action-btn')) {
    const btn = e.target.closest('.action-btn');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fa-bookmark')) {
      btn.classList.toggle('liked');
      if (btn.classList.contains('liked')) {
        icon.classList.remove('fa-bookmark');
        icon.classList.add('fa-bookmark', 'fas');
        showToast('Saved! 📌', 'success');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showToast('Removed from saved 🗑️', 'info');
      }
    }
  }
  
  // Category cards click
  if (e.target.closest('.category-card')) {
    const card = e.target.closest('.category-card');
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 100);
  }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
      searchModal.classList.add('active');
      isSearchOpen = true;
      const searchInput = searchModal.querySelector('.cyber-search');
      setTimeout(() => {
        searchInput?.focus();
      }, 300);
    }
  }
  
  // Ctrl/Cmd + / for theme toggle
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.click();
    }
  }
});

// ===== LAZY LOADING IMAGES =====
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  
  // Show/hide back to top button
  let backToTop = document.getElementById('backToTop');
  
  if (scrollPosition > 500) {
    if (!backToTop) {
      backToTop = document.createElement('button');
      backToTop.id = 'backToTop';
      backToTop.className = 'cyber-btn-sm';
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
      backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 5px 20px rgba(0, 217, 255, 0.4);
      `;
      
      backToTop.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      document.body.appendChild(backToTop);
    }
  } else {
    if (backToTop) {
      backToTop.remove();
    }
  }
  
  // Navbar background on scroll
  const header = document.querySelector('.header');
  if (header) {
    if (scrollPosition > 50) {
      header.style.background = 'rgba(10, 14, 39, 0.95)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(10, 14, 39, 0.8)';
      header.style.boxShadow = 'none';
    }
  }
});

// ===== FORM ENHANCEMENTS =====
document.querySelectorAll('.cyber-input, .cyber-textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.01)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// ===== CATEGORY HOVER EFFECTS =====
document.querySelectorAll('.category-card, .forum-category-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});

// ===== ONLINE STATUS INDICATOR =====
function updateOnlineStatus() {
  const statusIndicator = document.querySelector('.online-dot');
  if (statusIndicator) {
    if (navigator.onLine) {
      statusIndicator.style.color = 'var(--success)';
    } else {
      statusIndicator.style.color = 'var(--error)';
      showToast('You are offline! ⚠️', 'warning');
    }
  }
}

window.addEventListener('online', () => {
  updateOnlineStatus();
  showToast('Back online! ✅', 'success');
});

window.addEventListener('offline', () => {
  updateOnlineStatus();
  showToast('Connection lost! ⚠️', 'warning');
});

// ===== PREVENT RIGHT CLICK ON IMAGES (OPTIONAL) =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', function(e) {
    // Uncomment to prevent right-click
    // e.preventDefault();
    // showToast('Image protection enabled! 🔒', 'info');
  });
});

// ===== READING PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--neon-purple));
  z-index: 10000;
  transition: width 0.2s ease;
  box-shadow: 0 0 10px var(--accent-primary);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    activateEasterEgg();
    konamiCode = [];
  }
});

function activateEasterEgg() {
  showToast('🎮 Konami Code Activated! Matrix Mode ON 🎮', 'success');
  document.body.style.animation = 'rainbow 5s linear infinite';
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
  const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  console.log(`⚡ Page loaded in ${loadTime}ms`);
  
  if (loadTime > 3000) {
    console.warn('⚠️ Slow page load detected');
  }
});

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ('serviceWorker' in navigator) {
  // Uncomment to enable service worker
  // navigator.serviceWorker.register('/sw.js')
  //   .then(reg => console.log('✅ Service Worker registered'))
  //   .catch(err => console.error('❌ Service Worker registration failed:', err));
}

// ===== CONSOLE EASTER EGG =====
console.log('%c🚀 NEXUS FORUM', 'color: #00d9ff; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,217,255,0.5);');
console.log('%cBuilt with 💙 by Future Developers', 'color: #b24bf3; font-size: 14px;');
console.log('%cWant to join our team? Visit: nexusforum.dev/careers', 'color: #39ff14; font-size: 12px;');

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.NexusForum = {
  showToast,
  initTheme,
  hideLoadingScreen,
  version: '2.0.0'
};

// ===== UTILITY: DEBOUNCE FUNCTION =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== UTILITY: THROTTLE FUNCTION =====
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
  console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
  
  // Close mobile menu on desktop resize
  if (window.innerWidth > 768) {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
}, 250));

// ===== CLIPBOARD COPY HELPER =====
function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
    .then(() => {
      showToast('Copied to clipboard! 📋', 'success');
      return true;
    })
    .catch(err => {
      console.error('Copy failed:', err);
      showToast('Copy failed! ❌', 'error');
      return false;
    });
}

// ===== LOCAL STORAGE HELPER =====
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  }
};

// ===== RANDOM AVATAR GENERATOR =====
function getRandomAvatar(seed = Math.random()) {
  const avatarId = Math.floor(seed * 70) + 1;
  return `https://i.pravatar.cc/150?img=${avatarId}`;
}

// ===== DATE FORMATTER =====
function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 30) {
    return date.toLocaleDateString();
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

// ===== INITIALIZE EVERYTHING =====
console.log('✅ All systems operational');