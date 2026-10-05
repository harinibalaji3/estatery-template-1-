(function(){
var d=document,btns=[].slice.call(d.querySelectorAll('[data-hub]')),ids=btns.map(function(b){return b.dataset.hub}),hint=d.getElementById('hub-hint');
if(!btns.length)return;
function show(k,scroll){
  ids.forEach(function(i){var p=d.getElementById(i);if(p)p.hidden=i!==k});
  btns.forEach(function(b){var on=b.dataset.hub===k;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
  if(hint)hint.hidden=!!k;
  if(k&&scroll){var p=d.getElementById(k);if(p)p.scrollIntoView({behavior:'smooth',block:'start'})}
}
btns.forEach(function(b){b.addEventListener('click',function(){
  var k=b.dataset.hub,open=b.classList.contains('on');
  show(open?null:k,!open);
  try{history.replaceState(null,'',open?location.pathname:'#'+k)}catch(e){}
})});
function fromHash(){var k=location.hash.slice(1);if(ids.indexOf(k)>-1){show(k,false);var h=d.getElementById('hub');if(h)setTimeout(function(){h.scrollIntoView({behavior:'smooth',block:'start'})},60)}}
window.addEventListener('hashchange',fromHash);fromHash();
})();