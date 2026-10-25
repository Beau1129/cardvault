const initialCards = [
  {
    id: 1,
    name: 'Jordan Lee',
    company: 'Northstar Studio',
    email: 'jordan@northstar.dev',
    role: 'Product Designer',
    notes: 'Met at Startup Day 2026',
    accent: 'JL'
  },
  {
    id: 2,
    name: 'Amina Patel',
    company: 'Bluepeak Labs',
    email: 'amina@bluepeak.io',
    role: 'Partnership Lead',
    notes: 'Follow up on Q3 campaign',
    accent: 'AP'
  },
  {
    id: 3,
    name: 'Lucas Kim',
    company: 'Morrow Health',
    email: 'lucas@morrowhealth.co',
    role: 'VP of Growth',
    notes: 'Discussed onboarding workflow',
    accent: 'LK'
  }
];

const cardList = document.getElementById('card-list');
const cardForm = document.getElementById('card-form');
const totalCards = document.getElementById('total-cards');
const searchInput = document.getElementById('search-input');

let cards = [...initialCards];

function renderCards(filterText = '') {
  const query = filterText.trim().toLowerCase();
  const filteredCards = cards.filter((card) => {
    const haystack = [card.name, card.company, card.email, card.role, card.notes]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });

  totalCards.textContent = filteredCards.length;

  if (!filteredCards.length) {
    cardList.innerHTML = `
      <div class="card-item">
        <div class="card-meta">
          <strong>No contacts found</strong>
          <span>Try a different search or add a new card.</span>
        </div>
      </div>
    `;
    return;
  }

  cardList.innerHTML = filteredCards
    .map(
      (card) => `
        <div class="card-item">
          <div class="avatar">${card.accent}</div>
          <div class="card-meta">
            <strong>${card.name}</strong>
            <span>${card.role} · ${card.company}</span>
            <small>${card.email}</small>
          </div>
          <span class="tag">Saved</span>
        </div>
      `
    )
    .join('');
}

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(cardForm);
  const newCard = {
    id: Date.now(),
    name: formData.get('name'),
    company: formData.get('company'),
    email: formData.get('email'),
    role: formData.get('role'),
    notes: formData.get('notes') || 'New contact',
    accent: formData.get('name')
      .toString()
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  };

  cards = [newCard, ...cards];
  renderCards(searchInput.value);
  cardForm.reset();
});

searchInput.addEventListener('input', (event) => {
  renderCards(event.target.value);
});

renderCards();
