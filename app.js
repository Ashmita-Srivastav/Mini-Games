const cardData = [
      { title: "Rock Paper Scissor", image: "RPS.jpg", link: "RPS/SPS.html" },
      { title: "Reaction Time Game", image: "RTG.png", link: "RTG/index.html" }
    ];

    const container = document.getElementById("cardContainer");

    cardData.forEach(({ title, image, link }) => {
      const card = document.createElement("a");
      card.href = link;
      card.className = "card";
      card.innerHTML = `
        <img src="${image}" alt="${title}" />
        <div class="card-footer">${title}</div>
      `;
      container.appendChild(card);
    });