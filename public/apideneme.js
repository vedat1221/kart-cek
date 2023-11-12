// apideneme.js

document.addEventListener('DOMContentLoaded', () => {
  const drawCardButton = document.getElementById('drawCardButton');
  const resetButton = document.getElementById('resetButton');
  const cardImageContainer = document.getElementById('cardImageContainer');
  const remainingCardsText = document.getElementById('remainingCards');

  let deckId; // Oyun desteği için kullanılan kimlik

  // Yeni bir deste oluştur ve kimliğini al
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
      remainingCardsText.textContent = `Kalan Kartlar: ${data.remaining}`;
    })
    .catch(error => console.error('Hata oluştu:', error));

  drawCardButton.addEventListener('click', () => {
    const apiUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const card = data.cards[0];

        // Kart resmini görüntüle
        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardImage.alt = 'Kart Resmi';
        cardImageContainer.appendChild(cardImage);

        // Kalan kart sayısını güncelle
        remainingCardsText.textContent = `Kalan Kartlar: ${data.remaining}`;
      })
      .catch(error => console.error('Hata oluştu:', error));
  });

  resetButton.addEventListener('click', () => {
    // Deste kimliğini kullanarak desteyi sıfırla
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      .then(response => response.json())
      .then(data => {
        // Kart resimlerini ve kalan kart sayısını temizle
        cardImageContainer.innerHTML = '';
        remainingCardsText.textContent = `Kalan Kartlar: ${data.remaining}`;
      })
      .catch(error => console.error('Hata oluştu:', error));
  });
});
