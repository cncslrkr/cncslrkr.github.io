const crossfadeImages = [
    "glitches/face0.dng",
    "glitches/face1.dng",
    "glitches/face3.dng",
    "glitches/face4.dng",
];  
  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  }
  
  function getRandomImage(current) {
    let newImg;
    do {
      newImg = crossfadeImages[Math.floor(Math.random() * crossfadeImages.length)];
    } while (newImg === current);
    return newImg;
  }
  
  async function startCrossfade(wrapper) {
    const layer1 = document.createElement("div");
    const layer2 = document.createElement("div");
    wrapper.appendChild(layer1);
    wrapper.appendChild(layer2);
  
    let currentLayer = layer1;
    let nextLayer = layer2;
  
    let currentImage = crossfadeImages[Math.floor(Math.random() * crossfadeImages.length)];
    currentLayer.style.backgroundImage = `url(${currentImage})`;
    currentLayer.classList.add("fade-in");
  
    setInterval(async () => {
      const nextImage = getRandomImage(currentImage);
      await preloadImage(nextImage);
  
      nextLayer.style.backgroundImage = `url(${nextImage})`;
      nextLayer.classList.add("fade-in");
      currentLayer.classList.remove("fade-in");
  
      // Swap layers
      [currentLayer, nextLayer] = [nextLayer, currentLayer];
      currentImage = nextImage;
    }, Math.random() * 4000 + 3000);
  }
  
  // Only run if container exists (safe for shared pages)
  ["slot1", "slot2", "slot3"].forEach(id => {
    const wrapper = document.getElementById(id);
    if (wrapper) startCrossfade(wrapper);
  });
  