document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Mobile Menu
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
      });
    });
  }

  // 2. Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 3. Project Lightbox Modal & SEP Protocol Preview
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalLoc = document.getElementById('modalLoc');
  const modalTime = document.getElementById('modalTime');
  const modalTitle = document.getElementById('modalTitle');
  const modalEquipment = document.getElementById('modalEquipment');
  const modalMeasurements = document.getElementById('modalMeasurements');
  const modalQuoteBtn = document.getElementById('modalQuoteBtn');
  const openProtocolPreviewBtn = document.getElementById('openProtocolPreviewBtn');

  function openProjectModal(card) {
    modalImg.style.display = 'block';
    modalImg.src = card.getAttribute('data-img');
    modalImg.alt = card.getAttribute('data-title');
    modalLoc.textContent = card.getAttribute('data-location');
    modalTime.textContent = card.getAttribute('data-time');
    modalTitle.textContent = card.getAttribute('data-title');
    modalEquipment.textContent = card.getAttribute('data-equipment');
    modalMeasurements.textContent = card.getAttribute('data-measurements');

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
  });

  if (openProtocolPreviewBtn) {
    openProtocolPreviewBtn.addEventListener('click', () => {
      modalImg.style.display = 'none';
      modalLoc.textContent = 'Wzór Dokumentu Odbiorczego SEP E1 + D1';
      modalTime.textContent = 'Zgodny z art. 62 Prawa Budowlanego i normą PN-HD 60364-6';
      modalTitle.textContent = 'Protokół z badania instalacji elektrycznej (Miernik Sonel MPI-540)';
      modalEquipment.textContent =
        'Zawiera: 1) Oględziny rozdzielnicy i osprzętu, 2) Pomiar ciągłości przewodów ochronnych PE, 3) Badanie wyłączników różnicowoprądowych RCD (czas t_A < 300ms, prąd zadziałania I_Δ), 4) Tabelę pomiarów impedancji pętli zwarcia Z_s (Ω) dla każdego gniazda i wypustu, 5) Pomiar rezystancji izolacji R_ISO przy napięciu probierczym 500V DC (> 1,0 MΩ).';
      modalMeasurements.textContent =
        'ORZECZENIE KOŃCOWE: Instalacja nadaje się do eksploatacji. Podpisano: Wykonywał [SEP E1 Nr 418/E/2023] • Sprawdził i zatwierdził [SEP D1 Nr 419/D/2023].';
      projectModal.classList.add('open');
      projectModal.setAttribute('aria-hidden', 'false');
    });
  }

  function closeModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalQuoteBtn) modalQuoteBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // 4. Service Area City Checker
  const cityInput = document.getElementById('cityInput');
  const checkCityBtn = document.getElementById('checkCityBtn');
  const cityResult = document.getElementById('cityResult');

  const zone1Keywords = [
    'warszawa', 'mokotów', 'mokotow', 'ursynów', 'ursynow', 'wilanów', 'wilanow',
    'wola', 'śródmieście', 'srodmiescie', 'ochota', 'bemowo', 'białołęka', 'bialoleka',
    'targówek', 'targowek', 'praga', 'wawer', 'bielany', 'żoliborz', 'zoliborz',
    'ursus', 'włochy', 'wlochy', 'wesoła', 'wesola', 'rembertów', 'rembertow'
  ];

  const zone2Keywords = [
    'piaseczno', 'konstancin', 'józefosław', 'jozefoslaw', 'pruszków', 'pruszkow',
    'ożarów', 'ozarow', 'babice', 'łomianki', 'lomianki', 'legionowo', 'jabłonna',
    'jablonna', 'marki', 'ząbki', 'zabki', 'kobyłka', 'kobylka', 'wołomin', 'wolomin',
    'sulejówek', 'sulejowek', 'otwock', 'józefów', 'jozefow', 'nadarzyn', 'raszyn', 'piastów', 'piastow'
  ];

  function checkCity() {
    const val = (cityInput.value || '').trim().toLowerCase();
    if (!val) {
      cityResult.classList.add('visible');
      cityResult.textContent = 'Wpisz nazwę dzielnicy lub miejscowości, np. Ursynów, Piaseczno, Pruszków.';
      return;
    }

    cityResult.classList.add('visible');
    if (zone1Keywords.some(k => val.includes(k))) {
      cityResult.textContent = `✓ Lokalizacja "${cityInput.value.trim()}" znajduje się w Strefie I (Warszawa). Dojazd: 0 zł • Czas reakcji pogotowia: 30–45 minut.`;
    } else if (zone2Keywords.some(k => val.includes(k))) {
      cityResult.textContent = `✓ Lokalizacja "${cityInput.value.trim()}" znajduje się w Strefie II (Aglomeracja). Bezpłatna wycena inwestycji • Czas dojazdu: 45–65 minut.`;
    } else {
      cityResult.textContent = `✓ Obsługujemy miejscowość "${cityInput.value.trim()}" w ramach Strefy II/III (woj. mazowieckie). Zadzwoń pod 604 821 390, aby potwierdzić godzinę wizyty.`;
    }
  }

  if (checkCityBtn && cityInput) {
    checkCityBtn.addEventListener('click', checkCity);
    cityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkCity();
      }
    });
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });

  // 6. Quote Estimator & Service Card Pre-selection
  const serviceSelect = document.getElementById('serviceSelect');
  const propertyType = document.getElementById('propertyType');
  const clientScope = document.getElementById('clientScope');
  const urgencyPills = document.querySelectorAll('.urgency-pill');
  const urgencyValue = document.getElementById('urgencyValue');
  const estimatedPriceOutput = document.getElementById('estimatedPriceOutput');
  const serviceSelectBtns = document.querySelectorAll('.service-select-btn');

  function updateEstimate() {
    if (!serviceSelect || !propertyType || !estimatedPriceOutput) return;
    const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
    let min = parseFloat(selectedOpt.getAttribute('data-min') || '500');
    let max = parseFloat(selectedOpt.getAttribute('data-max') || '1000');

    const propOpt = propertyType.options[propertyType.selectedIndex];
    const mult = parseFloat(propOpt.getAttribute('data-mult') || '1');

    min = Math.round((min * mult) / 10) * 10;
    max = Math.round((max * mult) / 10) * 10;

    const points = parseInt(clientScope.value, 10);
    if (!isNaN(points) && points > 0) {
      if (serviceSelect.value.includes('Kompleksowa')) {
        min = points * 55;
        max = points * 85;
      } else if (serviceSelect.value.includes('Pomiary')) {
        min = Math.max(350, points * 14);
        max = Math.max(550, points * 22);
      } else if (serviceSelect.value.includes('rozdzielnicy')) {
        min = Math.max(750, points * 45);
        max = Math.max(1200, points * 70);
      }
    }

    if (urgencyValue && urgencyValue.value.includes('Pilnie')) {
      min = Math.round((min * 1.15) / 10) * 10;
      max = Math.round((max * 1.15) / 10) * 10;
    }

    estimatedPriceOutput.textContent = `${min.toLocaleString('pl-PL')} – ${max.toLocaleString('pl-PL')} zł netto`;
  }

  if (serviceSelect) serviceSelect.addEventListener('change', updateEstimate);
  if (propertyType) propertyType.addEventListener('change', updateEstimate);
  if (clientScope) clientScope.addEventListener('input', updateEstimate);

  urgencyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      urgencyPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (urgencyValue) urgencyValue.value = pill.getAttribute('data-urgency');
      updateEstimate();
    });
  });

  serviceSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetService = btn.getAttribute('data-service');
      if (serviceSelect && targetService) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value === targetService) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
        updateEstimate();
      }
      const quoteSection = document.getElementById('wycena');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('clientName');
          if (nameInput) nameInput.focus();
        }, 650);
      }
    });
  });

  // 7. Quote Form Submission
  const quoteForm = document.getElementById('quoteForm');
  const formSuccessMsg = document.getElementById('formSuccessMsg');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const loc = document.getElementById('clientLocation').value.trim();

      if (!name || !phone || !loc) {
        formSuccessMsg.classList.add('visible');
        formSuccessMsg.style.background = '#FEE2E2';
        formSuccessMsg.style.borderColor = '#EF4444';
        formSuccessMsg.style.color = '#991B1B';
        formSuccessMsg.innerHTML = '<strong>Uzupełnij wymagane pola:</strong> Podaj imię, numer telefonu oraz dzielnicę/miejscowość, abyśmy mogli przygotować wycenę.';
        return;
      }

      const refId = 'VP-' + Math.floor(10000 + Math.random() * 90000);
      const chosenService = serviceSelect.value;
      const estRange = estimatedPriceOutput.textContent;

      formSuccessMsg.classList.add('visible');
      formSuccessMsg.style.background = '#D1FAE5';
      formSuccessMsg.style.borderColor = '#10B981';
      formSuccessMsg.style.color = '#065F46';
      formSuccessMsg.innerHTML = `
        <strong>✓ Zgłoszenie nr ${refId} zostało przyjęte!</strong><br/>
        Dziękujemy, <strong>${name}</strong>. Przygotowujemy wstępną wycenę dla usługi: <em>${chosenService}</em> (${loc}).<br/>
        Szacowany przedział: <strong>${estRange}</strong>. Inżynier dyżurny zadzwoni pod numer <strong>${phone}</strong> w ciągu 15–30 minut.
      `;
      quoteForm.reset();
      updateEstimate();
    });
  }

  updateEstimate();
});
