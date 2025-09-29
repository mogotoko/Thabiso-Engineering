
(function(){
  // Matrix animation
  function startMatrix(){
    const canvas = document.getElementById('matrix');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let cols, ypos;
    function init(){
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight * 0.68, 360);
      cols = Math.floor(canvas.width / 14);
      ypos = Array.from({length: cols}, () => Math.random()*40);
    }
    init(); window.addEventListener('resize', init);
    function draw(){
      ctx.fillStyle = 'rgba(7,18,38,0.14)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#00bfff'; ctx.font = '13px monospace';
      for(let i=0;i<cols;i++){
        const ch = String.fromCharCode(33 + Math.floor(Math.random()*94));
        ctx.fillText(ch, i*14, ypos[i]*14);
        if(ypos[i]*14 > canvas.height && Math.random() > 0.996) ypos[i]=0;
        ypos[i] += 0.12;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }
  startMatrix();

  // popup with sound and 20s auto-close
  const sound = new Audio('assets/sounds/notify.wav');
  function showPopup(msg){
    let p = document.getElementById('popup');
    if(!p){
      p = document.createElement('div');
      p.id = 'popup';
      p.className = 'popup';
      document.body.appendChild(p);
    }
    p.textContent = msg;
    p.style.display = 'block';
    try{ sound.currentTime = 0; sound.play(); }catch(e){}
    setTimeout(()=>{ p.style.display='none'; }, 20000);
  }

  // form simulation: contact form with dept mapping
  document.addEventListener('submit', function(e){
    const form = e.target;
    if(form.classList.contains('simulate-form')){
      e.preventDefault();
      // basic validation
      const req = form.querySelectorAll('[required]');
      for(const el of req){ if(!el.value.trim()){ alert('Please complete all required fields.'); return; } }
      // determine recipient based on department select (data-email)
      const dept = form.querySelector('[name=department]');
      const cat = form.querySelector('[name=category]');
      let recipient = '';
      if(dept) recipient = dept.options[dept.selectedIndex].dataset.email || dept.value;
      // show popup
      let msg = 'Simulated send';
      if(recipient) msg += ' to: ' + recipient;
      if(cat) msg += ' (' + cat.value + ')';
      showPopup(msg);
      form.reset();
    }
  });
})();
