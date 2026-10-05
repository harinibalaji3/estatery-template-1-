(function(){
var d=document,R=d.documentElement,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
function get(k,f){try{return localStorage.getItem(k)||f}catch(e){return f}}function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
R.setAttribute('data-theme',get('theme',matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));R.dir=get('dir','ltr');
function toast(m){var t=$('.toast')||d.body.appendChild(Object.assign(d.createElement('div'),{className:'toast'}));t.textContent=m;t.classList.add('show');clearTimeout(t.t);t.t=setTimeout(function(){t.classList.remove('show')},2600)}
d.addEventListener('click',function(e){
var b=e.target.closest('[data-act]');if(b){var a=b.dataset.act;
if(a=='theme'){var n=R.dataset.theme=='dark'?'light':'dark';R.setAttribute('data-theme',n);set('theme',n)}
if(a=='dir'){R.dir=R.dir=='rtl'?'ltr':'rtl';set('dir',R.dir)}
if(a=='menu')$('.links').classList.toggle('open');
if(a=='pf')b.parentNode.classList.toggle('open')}
else if(!e.target.closest('.pf'))$$('.pf.open').forEach(function(p){p.classList.remove('open')});
var f=e.target.closest('[data-fav]'),c=e.target.closest('[data-cmp]');
if(f){f.classList.toggle('on');store('fav',f.dataset.fav);toast(f.classList.contains('on')?'Saved to favorites':'Removed from favorites')}
if(c){var l=list('cmp');if(!l.includes(c.dataset.cmp)&&l.length>=3){return toast('You can compare up to 3 properties')}c.classList.toggle('on');store('cmp',c.dataset.cmp);toast(c.classList.contains('on')?'Added to compare':'Removed from compare')}
var t=e.target.closest('[data-tab]');if(t){var g=t.closest('.side,.tabs');$$('[data-tab]',g).forEach(function(x){x.classList.toggle('on',x==t)});$$('.panel').forEach(function(p){p.classList.toggle('on',p.id==t.dataset.tab)});if(t.dataset.tab=='ov'||t.dataset.tab=='ad')bars()}
var r=e.target.closest('[data-role]');if(r){$$('[data-role]').forEach(function(x){x.classList.toggle('on',x==r)});$$('[data-for]').forEach(function(x){x.hidden=x.dataset.for!=r.dataset.role});var first=$('[data-for="'+r.dataset.role+'"] [data-tab]');if(first)first.click()}
var im=e.target.closest('.gal .t');if(im){$$('.gal .t').forEach(function(x){x.classList.remove('on')});im.classList.add('on');$('.gal .m').innerHTML=im.innerHTML}
});
function list(k){try{return JSON.parse(get(k,'[]'))}catch(e){return[]}}
function store(k,v){var l=list(k),i=l.indexOf(v);i<0?l.push(v):l.splice(i,1);set(k,JSON.stringify(l));badges()}
function badges(){$$('[data-count]').forEach(function(b){var n=list(b.dataset.count).length;b.textContent=n;b.hidden=!n})}
$$('[data-fav]').forEach(function(x){if(list('fav').includes(x.dataset.fav))x.classList.add('on')});
$$('[data-cmp]').forEach(function(x){if(list('cmp').includes(x.dataset.cmp))x.classList.add('on')});badges();
$$('form[data-toast]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();toast(f.dataset.toast);f.reset()})});
/* filters */
var ff=$('#filters');if(ff){var q=new URLSearchParams(location.search);['loc','type'].forEach(function(n){if(q.get(n)&&ff[n])ff[n].value=q.get(n)});
function run(){var loc=ff.loc.value,ty=ff.type.value,mx=+ff.budget.value,am=$$('[name=am]:checked',ff).map(function(x){return x.value}),n=0;$('#bv').textContent=mx>=5e7?'Any':'Up to '+(mx/1e5)+' L';
$$('.pc[data-id]').forEach(function(c){var ok=(!loc||c.dataset.loc==loc)&&(!ty||c.dataset.type==ty)&&(mx>=5e7||+c.dataset.price<=mx)&&am.every(function(a){return c.dataset.am.includes(a)});c.hidden=!ok;n+=ok});$('#cnt').textContent=n+' properties found';$('#none').hidden=!!n}
ff.addEventListener('input',run);ff.addEventListener('submit',function(e){e.preventDefault();run()});run()}
/* compare table */
var ct=$('#cmpbody');if(ct){var ids=list('cmp'),cards=$$('.pc[data-id]',$('#all'));
ct.innerHTML=ids.length?cards.filter(function(c){return ids.includes(c.dataset.id)}).map(function(c){return'<tr><td>'+c.dataset.title+'</td><td>'+c.dataset.loc+'</td><td>'+c.dataset.type+'</td><td>'+c.dataset.fmt+'</td><td>'+c.dataset.am.split(',').join(', ')+'</td></tr>'}).join(''):'<tr><td colspan=5>Nothing to compare yet. Use the compare button on any property.</td></tr>'}
/* reveal, bars, counters */
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);var n=x.target.dataset.n;if(n)count(x.target,+n)}})},{threshold:.15});
$$('.rv,[data-n]').forEach(function(x){io.observe(x)});
function count(el,n){var s=null;(function st(t){s=s||t;var p=Math.min((t-s)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString()+(el.dataset.s||'');if(p<1)requestAnimationFrame(st)})(performance.now())}
function bars(){$$('.panel.on .bars i').forEach(function(b){b.style.height='0';setTimeout(function(){b.style.height=b.dataset.h+'%'},50)})}
bars();
$$('.tabs[data-sw] button').forEach(function(b){b.onclick=function(){$$('.tabs[data-sw] button').forEach(function(x){x.classList.toggle('on',x==b)});$$('[data-form]').forEach(function(f){f.hidden=f.dataset.form!=b.dataset.t})}});
})();
