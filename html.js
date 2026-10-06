const API_URL = 'https://SEU-SERVIDOR.vercel.app/api/cardapio';
 
export default `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Despensa Inteligente</title>
<style>
:root{--bg:#faf7f2;--card:#fff;--tx:#2a2a26;--mut:#7a766c;--ac:#2f7d4f;--acbg:#e3f1e8;--wa:#c9791b;--wabg:#fbefd9;--er:#c0392b;--erbg:#fbe3e0;--bd:#e8e3d8;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#171a17;--card:#222622;--tx:#eceae3;--mut:#9d9a90;--ac:#6cc58d;--acbg:#233a2b;--wa:#e8a24d;--wabg:#3d3020;--er:#ef7b6e;--erbg:#40241f;--bd:#333833}}
:root[data-theme="dark"]{--bg:#171a17;--card:#222622;--tx:#eceae3;--mut:#9d9a90;--ac:#6cc58d;--acbg:#233a2b;--wa:#e8a24d;--wabg:#3d3020;--er:#ef7b6e;--erbg:#40241f;--bd:#333833}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--tx);font:16px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{max-width:760px;margin:0 auto;padding:16px}
h1{font-size:1.5rem;margin:8px 0 2px}
.sub{color:var(--mut);margin:0 0 16px}
.tabs{display:flex;gap:6px;background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:4px;margin-bottom:16px}
.tabs button{flex:1;border:0;background:none;color:var(--mut);padding:10px;border-radius:9px;font:inherit;font-weight:600;cursor:pointer}
.tabs button.on{background:var(--ac);color:#fff}
.card{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:14px;margin-bottom:12px}
.row{display:flex;gap:8px;flex-wrap:wrap}
input,select{font:inherit;color:var(--tx);background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:10px;min-width:0}
input.nm{flex:2 1 160px}input.qt{flex:1 1 90px}input.dt{flex:1 1 130px}
.btn{border:0;background:var(--ac);color:#fff;font:inherit;font-weight:600;padding:10px 16px;border-radius:10px;cursor:pointer}
.btn.big{width:100%;padding:14px;font-size:1.05rem}
.btn.ghost{background:none;color:var(--mut);border:1px solid var(--bd);padding:6px 10px;font-weight:500}
.btn:disabled{opacity:.6}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.chip{border:1px solid var(--bd);background:var(--bg);color:var(--tx);border-radius:99px;padding:5px 11px;font:inherit;font-size:.85rem;cursor:pointer}
.item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd)}
.item:last-child{border:0}
.item .n{flex:1;min-width:0}.item b{display:block;overflow-wrap:anywhere}.item small{color:var(--mut)}
.tag{font-size:.75rem;font-weight:700;padding:3px 8px;border-radius:99px;background:var(--acbg);color:var(--ac);white-space:nowrap}
.tag.w{background:var(--wabg);color:var(--wa)}.tag.e{background:var(--erbg);color:var(--er)}
.x{border:0;background:none;color:var(--mut);font-size:1.3rem;cursor:pointer;padding:4px 8px}
.empty{color:var(--mut);text-align:center;padding:18px}
.day h3{margin:0 0 8px;font-size:1rem}
.meal{padding:8px 0;border-top:1px solid var(--bd)}
.meal:first-of-type{border:0}
.meal .l{font-size:.75rem;color:var(--mut);text-transform:uppercase;letter-spacing:.04em}
.meal .m{font-weight:600}
.meal .u{font-size:.85rem;color:var(--ac)}.meal .f{font-size:.85rem;color:var(--wa)}
.dica{background:var(--acbg);color:var(--ac);border-radius:12px;padding:12px;margin-bottom:12px}
.err{background:var(--erbg);color:var(--er);border-radius:12px;padding:12px;margin-bottom:12px}
.hid{display:none}
.bdg{background:var(--er);color:#fff;border-radius:99px;font-size:.7rem;padding:1px 7px;margin-left:5px}
.tabs button{font-size:.9rem}
.alert{background:var(--erbg);color:var(--er);border-radius:12px;padding:12px;margin-bottom:12px;font-weight:600}
.btn.sm{padding:6px 12px;font-size:.85rem}
</style>
</head>
<body>
<main>
<h1>🥕 Despensa Inteligente</h1>
<p class="sub">Registre o que você tem em casa e deixe a IA montar a semana sem desperdício.</p>
<div class="tabs"><button id="t1" class="on">Despensa</button><button id="t3">⭐ Essenciais<span id="bdg"></span></button><button id="t2">Cardápio</button></div>
 
<section id="p1">
  <div class="card">
    <div class="row">
      <input class="nm" id="nm" placeholder="Ingrediente (ex.: arroz)" maxlength="40">
      <input class="qt" id="qt" placeholder="Qtd (ex.: 2 kg)" maxlength="20">
      <input class="dt" id="dt" type="date" title="Validade">
      <button class="btn" id="add">Adicionar</button>
    </div>
  </div>
  <div class="card" id="list"></div>
</section>
 
<section id="p3" class="hid">
  <div id="alert"></div>
  <div class="card">
    <b>Itens que não podem faltar</b>
    <p class="sub" style="margin:4px 0 10px">Eu aviso quando algum sumir da despensa e coloco na lista de compras.</p>
    <div class="row"><input class="nm" id="en" placeholder="Ex.: café, arroz, papel higiênico" maxlength="40"><button class="btn" id="eadd">Adicionar</button></div>
  </div>
  <div class="card" id="elist"></div>
</section>
 
<section id="p2" class="hid">
  <div class="card">
    <div class="row">
      <select id="pes" aria-label="Pessoas"><option value="1">1 pessoa</option><option value="2" selected>2 pessoas</option><option value="3">3 pessoas</option><option value="4">4 pessoas</option><option value="6">6 pessoas</option></select>
      <select id="dieta" aria-label="Preferência"><option value="sem restrição">Sem restrição</option><option value="vegetariano">Vegetariano</option><option value="vegano">Vegano</option><option value="low carb">Low carb</option></select>
    </div>
    <p class="sub" style="margin:10px 0">A IA prioriza o que vence primeiro e aponta só o que realmente falta.</p>
    <button class="btn big" id="gen">✨ Gerar cardápio semanal</button>
  </div>
  <div id="out"></div>
</section>
</main>
<script>
const API_URL='${API_URL}';
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let items=[];
try{items=JSON.parse(localStorage.getItem('despensa')||'[]')}catch(e){}
function save(){try{localStorage.setItem('despensa',JSON.stringify(items))}catch(e){}}
function dias(d){if(!d)return null;const a=new Date(d+'T00:00:00'),h=new Date();h.setHours(0,0,0,0);return Math.round((a-h)/864e5)}
function render(){
  if(typeof renderE==='function')renderE();
  const L=$('list');
  if(!items.length){L.innerHTML='<div class="empty">Sua despensa está vazia.<br>Adicione ingredientes acima para começar.</div>';return}
  const s=items.map((x,i)=>({...x,i,d:dias(x.val)})).sort((a,b)=>(a.d==null?9999:a.d)-(b.d==null?9999:b.d));
  L.innerHTML=\`<b>\${items.length} ingrediente\${items.length>1?'s':''}</b>\`+s.map(x=>{
    let t='';
    if(x.d!=null){t=x.d<0?\`<span class="tag e">Vencido</span>\`:x.d<=3?\`<span class="tag w">\${x.d===0?'Vence hoje':'Vence em '+x.d+'d'}</span>\`:\`<span class="tag">\${x.d}d</span>\`}
    return \`<div class="item"><div class="n"><b>\${esc(x.nome)}</b><small>\${esc(x.qtd||'quantidade livre')}</small></div>\${t}<button class="x" data-i="\${x.i}" aria-label="Remover">×</button></div>\`}).join('');
}
$('list').onclick=e=>{const i=e.target.dataset.i;if(i!=null){items.splice(+i,1);save();render()}};
 
let ess=[];
try{ess=JSON.parse(localStorage.getItem('essenciais')||'[]')}catch(e){}
function saveE(){try{localStorage.setItem('essenciais',JSON.stringify(ess))}catch(e){}}
const norm=t=>String(t).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').trim();
function emEstoque(n){const k=norm(n);return items.some(x=>{const m=norm(x.nome);return m.includes(k)||k.includes(m)})}
function faltando(){return ess.filter(e=>!emEstoque(e))}
function addE(n){n=n.trim();if(!n||ess.some(e=>norm(e)===norm(n)))return;ess.push(n);saveE();renderE()}
$('eadd').onclick=()=>{addE($('en').value);$('en').value=''};
$('en').onkeydown=e=>{if(e.key==='Enter'){addE($('en').value);$('en').value=''}};
function renderE(){
  const f=faltando();
  $('bdg').innerHTML=f.length?\`<span class="bdg">\${f.length}</span>\`:'';
  $('alert').innerHTML=f.length?\`<div class="alert">⚠️ Faltando: \${f.map(esc).join(', ')}</div>\`:(ess.length?'<div class="dica">✅ Todos os essenciais estão na despensa.</div>':'');
  const L=$('elist');
  if(!ess.length){L.innerHTML='<div class="empty">Nenhum essencial ainda.<br>Digite o primeiro acima.</div>';return}
  L.innerHTML=ess.map((e,i)=>{const ok=emEstoque(e);return \`<div class="item"><div class="n"><b>\${esc(e)}</b></div>\${ok?'<span class="tag">Em estoque</span>':\`<span class="tag e">Faltando</span><button class="btn sm" data-b="\${i}">Comprei</button>\`}<button class="x" data-r="\${i}" aria-label="Remover">×</button></div>\`}).join('');
}
$('elist').onclick=e=>{
  const b=e.target.dataset.b,r=e.target.dataset.r;
  if(b!=null){items.push({nome:ess[+b],qtd:'',val:''});save();render()}
  else if(r!=null){ess.splice(+r,1);saveE();renderE()}
};
function add(){
  const n=$('nm').value.trim();if(!n)return;
  items.push({nome:n,qtd:$('qt').value.trim(),val:$('dt').value});
  $('nm').value=$('qt').value=$('dt').value='';save();render();$('nm').focus();
}
$('add').onclick=add;$('nm').onkeydown=e=>{if(e.key==='Enter')add()};
function tab(n){[1,2,3].forEach(k=>{$('p'+k).classList.toggle('hid',k!==n);$('t'+k).classList.toggle('on',k===n)})}
$('t1').onclick=()=>tab(1);$('t2').onclick=()=>tab(2);$('t3').onclick=()=>tab(3);
 
$('gen').onclick=async()=>{
  const out=$('out');
  if(!items.length){out.innerHTML='<div class="err">Adicione ao menos alguns ingredientes na despensa primeiro.</div>';return}
  const btn=$('gen');btn.disabled=true;btn.textContent='Planejando sua semana…';out.innerHTML='';
  try{
    if(!API_URL||API_URL.includes('SEU-SERVIDOR')){out.innerHTML='<div class="err">Configure o endereço do servidor (API_URL) no arquivo html.js.</div>';return}
    const lista=items.map(x=>{const d=dias(x.val);return \`- \${x.nome}\${x.qtd?' ('+x.qtd+')':''}\${d!=null?\` — validade em \${d} dia(s)\`:''}\`}).join('\\n');
    const prompt=\`Você é um nutricionista-chef brasileiro focado em zero desperdício. Monte um cardápio de 7 dias (almoço e jantar) para \${$('pes').value} pessoa(s), preferência: \${$('dieta').value}.
Regras: use ao máximo os ingredientes da despensa, priorizando os que vencem primeiro; pratos simples da culinária brasileira; assuma que sal, óleo, água e temperos básicos existem; em "falta" liste só ingredientes importantes que NÃO estão na despensa (poucos).
Essenciais que estão faltando (OBRIGATÓRIO incluir em "compras"): \${faltando().map(x=>x).join(', ')||'nenhum'}
Despensa:
\${lista}
Responda SOMENTE JSON: {"dica":"dica curta de aproveitamento","dias":[{"dia":"Segunda","almoco":{"prato":"","usa":["..."],"falta":["..."]},"jantar":{"prato":"","usa":["..."],"falta":["..."]}}],"compras":["itens a comprar, sem repetir"]}\`;
    const resp=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
    if(!resp.ok)throw new Error('http '+resp.status);
    const r=await resp.json();
    out.innerHTML=show(r);
  }catch(e){
    out.innerHTML=\`<div class="err">\${'Não foi possível gerar agora. Verifique a internet e tente novamente.'}</div>\`;
  }finally{btn.disabled=false;btn.textContent='✨ Gerar cardápio semanal'}
};
function meal(l,m){if(!m)return'';return \`<div class="meal"><div class="l">\${l}</div><div class="m">\${esc(m.prato)}</div>\`+((m.usa||[]).length?\`<div class="u">Usa: \${(m.usa).map(esc).join(', ')}</div>\`:'')+((m.falta||[]).length?\`<div class="f">Falta: \${(m.falta).map(esc).join(', ')}</div>\`:'')+'</div>'}
function show(r){
  let h=r.dica?\`<div class="dica">💡 \${esc(r.dica)}</div>\`:'';
  h+=(r.dias||[]).map(d=>\`<div class="card day"><h3>\${esc(d.dia)}</h3>\${meal('Almoço',d.almoco)}\${meal('Jantar',d.jantar)}</div>\`).join('');
  if((r.compras||[]).length)h+=\`<div class="card"><h3 style="margin:0 0 8px">🛒 Lista de compras</h3><div class="chips" style="margin:0">\${r.compras.map(c=>\`<span class="chip">\${esc(c)}</span>\`).join('')}</div></div>\`;
  return h;
}
render();
</script>
</body>
</html>
`;