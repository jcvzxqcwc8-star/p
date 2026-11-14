// Pas hier de tekst aan.
var LINES = [
  "Gefeliciteerd met je 20e verjaardag, Yousra!",
  "Van alle sterren aan de hemel heb ik er één naar jou genoemd.",
  "Net als die ster val je op, zonder dat je er moeite voor hoeft te doen.",
  "Je geeft mensen om je heen warmte en licht.",
  "Ik hoop dat dit nieuwe jaar net zo mooi wordt als jij.",
  "Fijne verjaardag."
];

var cv = document.getElementById('c'), cx = cv.getContext('2d');
var W, H, stars = [], parts = [], fire = false, t0 = 0, sky = 0.35;
function size(){
  var d = window.devicePixelRatio || 1;
  W = innerWidth; H = innerHeight;
  cv.width = W * d; cv.height = H * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
  stars = [];
  for (var i = 0; i < 140; i++) stars.push({x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + .3, p: Math.random() * 6});
}
addEventListener('resize', size); size();

function burst(x, y){
  var hue = Math.floor(Math.random() * 360), n = 48;
  for (var i = 0; i < n; i++){
    var a = Math.PI * 2 * i / n, s = 1.5 + Math.random() * 3;
    parts.push({x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, h: hue + Math.random() * 40});
  }
}
function frame(ts){
  cx.clearRect(0, 0, W, H);
  stars.forEach(function(s){
    cx.globalAlpha = sky * (.5 + .5 * Math.sin(ts / 800 + s.p));
    cx.fillStyle = '#cfe3ff';
    cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.3); cx.fill();
  });
  if (fire && ts - t0 < 5500 && Math.random() < .08) burst(W * (.12 + Math.random() * .76), H * (.1 + Math.random() * .45));
  parts = parts.filter(function(p){ return p.life > 0; });
  parts.forEach(function(p){
    p.x += p.vx; p.y += p.vy; p.vy += .03; p.vx *= .985; p.life -= .011;
    cx.globalAlpha = Math.max(p.life, 0);
    cx.fillStyle = 'hsl(' + p.h + ',90%,65%)';
    cx.beginPath(); cx.arc(p.x, p.y, 2.2, 0, 6.3); cx.fill();
  });
  cx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

document.getElementById('go').addEventListener('click', function(){
  document.getElementById('intro').classList.add('hide');
  fire = true; t0 = performance.now(); burst(W / 2, H * .3);
  // Na het vuurwerk wordt de sterrenhemel helderder
  setTimeout(function(){ var f = setInterval(function(){ sky = Math.min(1, sky + .02); if (sky >= 1) clearInterval(f); }, 60); }, 4500);
  setTimeout(function(){
    document.getElementById('star').classList.add('on');
    document.getElementById('label').classList.add('on');
  }, 6500);
  var box = document.getElementById('msg');
  LINES.forEach(function(l, i){
    var p = document.createElement('p'); p.textContent = l;
    if (i === LINES.length - 1) p.className = 'last';
    box.appendChild(p);
  });
  setTimeout(function(){
    Array.prototype.forEach.call(box.children, function(p, i){ setTimeout(function(){ p.classList.add('show'); }, 1600 * i); });
  }, 8500);
});