const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const iconSize = 16;  
const columns = canvas.width / iconSize;  

let snowflakes = [];
const snowflakeSVG = new Image();
snowflakeSVG.src = 'snowflake-svgrepo.svg'; 

snowflakeSVG.onload = () => {
  // snowflakes count
  for (let i = 0; i < 300; i++) {
      snowflakes.push(createSnowflake());
  }
  animateSnowfall();
};

function createSnowflake() {
  return {
      x: Math.random() * canvas.width,  // rnd X pos
      y: Math.random() * -canvas.height,  // rnd Y pos
      speed: Math.random() * 1 + 0.5,  // rnd fall speed
      size: Math.random() * iconSize + 1,  // rnd size
      opacity: Math.random() * 0.5 + 0.3,  // rnd opacity
      angle: Math.random() * Math.PI * 2,  // rnd rotate angle
      rotationSpeed: Math.random() * 0.05 + 0.01,
  };
}

function animateSnowfall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  

  // Draw snowflakes
  snowflakes.forEach(snowflake => {
      
      ctx.globalAlpha = snowflake.opacity;
      ctx.save();
      ctx.translate(snowflake.x + snowflake.size / 2, snowflake.y + snowflake.size / 2);
      ctx.rotate(snowflake.angle);
      // Draw snowflakes
      ctx.drawImage(snowflakeSVG, -snowflake.size / 2, -snowflake.size / 2, snowflake.size, snowflake.size);
      ctx.restore();

      snowflake.y += snowflake.speed; 
      snowflake.angle += snowflake.rotationSpeed; 

      
      if (snowflake.y > canvas.height) {
          snowflake.y = -snowflake.size;
          snowflake.x = Math.random() * canvas.width;
      }
  });

  requestAnimationFrame(animateSnowfall);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  snowflakes = [];
  for (let i = 0; i < 200; i++) {
      snowflakes.push(createSnowflake());
  }
});

const hideUiBtn = document.getElementById('hideUiBtn')

let isBtnClicked = false

hideUiBtn.addEventListener('click', ()=>{
  if (!isBtnClicked){
    isBtnClicked = true
    document.querySelector('.svg-textHead').style.opacity = '0'
    document.querySelector('.ng-text').style.opacity = '0'
    document.querySelector('.year').style.opacity = '0'
    document.querySelector('.bg-gradient').style.opacity = '0'
    
  } else {
    isBtnClicked = false
    document.querySelector('.svg-textHead').style.opacity = '1'
    document.querySelector('.ng-text').style.opacity = '1'
    document.querySelector('.year').style.opacity = '1'
    document.querySelector('.bg-gradient').style.opacity = '1'
  }
})

