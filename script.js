const html = document.documentElement;
const canvas = document.querySelector('.video-scrolling');
const context = canvas.getContext('2d');

const currentFrame = index => (
    `./images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
)

const frameCount = 163;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

preloadImages();

canvas.height = 2160;
canvas.width = 3840;
const img = new Image();
img.src = currentFrame(1);
img.onload = function() {
    context.drawImage(img, 0, 0)
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  }

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );
    console.log(frameIndex);

    requestAnimationFrame( () => updateImage(frameIndex + 1) )
})