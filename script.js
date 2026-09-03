"use strict";

/* =========================================================
   1. 기업가의 7가지 특성
   ========================================================= */
const TRAITS = {
  responsibility:{ko:'강한 책임감', en:'RESPONSIBILITY', short:'책임감',
    desc:'맡은 일을 끝까지 책임지고 문제를 해결하는 사람.'},
  achievement:{ko:'성취동기', en:'ACHIEVEMENT', short:'성취동기',
    desc:'목표를 세우고 성과를 만들어내기 위해 끊임없이 노력하는 사람.'},
  preparedness:{ko:'대비할 자세', en:'PREPAREDNESS', short:'대비',
    desc:'미래의 변화와 위험을 예상하고 미리 준비하는 사람.'},
  trust:{ko:'신뢰 형성', en:'TRUST', short:'신뢰',
    desc:'약속과 행동을 통해 다른 사람에게 믿음을 주는 사람.'},
  communication:{ko:'의사소통 능력', en:'COMMUNICATION', short:'의사소통',
    desc:'자신의 생각을 전달하고 다른 사람의 의견을 이해하며 협력하는 사람.'},
  confidence:{ko:'자신감', en:'CONFIDENCE', short:'자신감',
    desc:'자신의 능력과 아이디어를 믿고 새로운 도전을 하는 사람.'},
  leadership:{ko:'리더십', en:'LEADERSHIP', short:'리더십',
    desc:'사람들을 이끌고 공동의 목표를 달성하도록 만드는 사람.'}
};
const ORDER = ['responsibility','achievement','preparedness','trust','communication','confidence','leadership'];

/* 유형별로 닮은 실존 기업가 — 지어낸 말 없이, 실제로 있었던 일만 */
const PEERS = {
  responsibility:{
    name:'유일한', org:'유한양행 창업 · 한국 · 1895–1971',
    story:'1926년 제약회사를 세우고, 기업이 번 돈은 그 기업을 키워준 사회로 돌아가야 한다는 원칙을 끝까지 지켰다. 회사를 자식이 아니라 전문경영인에게 넘겼고, 세상을 떠나며 남긴 재산의 대부분을 사회에 내놓았다.',
    echo:'책임감은 일이 잘 풀릴 때가 아니라, 손해를 감수해야 하는 순간에 무엇을 지키는지에서 드러난다.'},
  achievement:{
    name:'제임스 다이슨', org:'다이슨 창업 · 영국 · 1947–',
    story:'먼지봉투 없는 청소기를 만들겠다며 5,127개의 시제품을 만들었다. 그중 5,126개가 실패였고, 실패할 때마다 무엇이 잘못됐는지를 기록해 다음 모형을 고쳤다. 완성까지 15년이 걸렸다.',
    echo:'성취동기가 강한 사람은 실패를 결과가 아니라 다음에 쓸 자료로 다룬다.'},
  preparedness:{
    name:'리드 헤이스팅스', org:'넷플릭스 공동창업 · 미국 · 1960–',
    story:'DVD를 우편으로 빌려주는 사업이 한창 잘되던 시기에, 인터넷 속도가 빨라지면 그 사업이 사라질 것을 내다보고 스트리밍에 투자했다. 남이 무너뜨리기 전에 자기 사업을 스스로 갈아엎은 셈이다.',
    echo:'대비할 자세는 위기가 닥쳤을 때가 아니라, 아직 잘되고 있을 때 발휘된다.'},
  trust:{
    name:'이본 쉬나드', org:'파타고니아 창업 · 미국 · 1938–',
    story:'일 년 중 가장 많이 팔리는 날에 자사 재킷을 사지 말라는 신문 광고를 냈고, 새 옷을 파는 대신 낡은 옷을 수선해 주는 매장을 열었다. 2022년에는 회사의 소유권을 환경 보호 쪽으로 넘겼다.',
    echo:'신뢰는 좋은 말이 아니라, 손해를 보면서도 지킨 약속이 쌓여서 만들어진다.'},
  communication:{
    name:'사티아 나델라', org:'마이크로소프트 CEO · 미국 · 1967–',
    story:'부서끼리 경쟁이 심하던 조직에 공감을 화두로 던졌다. 오랫동안 적으로 여기던 리눅스와 경쟁사의 제품까지 자사 플랫폼에 받아들였고, 기술보다 사람들의 대화 방식을 먼저 바꿨다.',
    echo:'의사소통은 말을 잘하는 기술이 아니라, 상대의 입장에서 한 번 더 생각해 보는 태도다.'},
  confidence:{
    name:'마윈', org:'알리바바 창업 · 중국 · 1964–',
    story:'영어 교사 출신으로 취업 시험에도 여러 번 떨어졌다. 1999년 아파트에서 인터넷 거래 회사를 시작했을 때, 중국에서 인터넷을 쓰는 사람은 극소수였고 주변에서는 대부분 안 될 거라고 말했다.',
    echo:'자신감은 근거 없는 확신이 아니라, 남들에게 보이지 않는 가능성을 끝까지 설명해 내는 힘이다.'},
  leadership:{
    name:'정주영', org:'현대그룹 창업 · 한국 · 1915–2001',
    story:'조선소가 아직 없던 시절, 백사장 사진과 도면만 들고 외국에서 자금을 빌리고 배를 주문받았다. 그리고 조선소와 배를 같은 시기에 지어 약속한 날짜에 배를 넘겼다.',
    echo:'리더십은 혼자 앞서가는 것이 아니라, 아직 없는 것을 사람들이 함께 믿고 만들게 하는 힘이다.'}
};

/* =========================================================
   2. 상황 5개
   ========================================================= */
const QUESTIONS = [
  {
    fig:'A',
    title:'첫 제품에 문제가 생겼다.',
    situation:'창업한 회사의 첫 제품 출시를 하루 앞두고\n제품의 10%에서 오류가 발견됐다.\n이미 홍보도 시작된 상황이다.',
    ask:'당신이라면 어떻게 할까?',
    options:[
      {text:'일단 출시하고 나중에 문제를 수정한다.', main:'confidence',
        pts:{confidence:2, achievement:1},
        note:'약속한 날짜를 지키는 추진력은 있지만, 문제를 아는 채로 내보낸 제품은 신뢰를 먼저 잃게 만든다.'},
      {text:'출시를 미루고 문제를 해결한 뒤 출시한다.', main:'responsibility',
        pts:{responsibility:4, trust:2, preparedness:1},
        note:'손해를 감수하더라도 제품의 결과까지 내가 책임진다는 태도. 교과서가 말하는 기업가의 첫 번째 자질이다.'},
      {text:'팀원들에게 해결 방법을 맡기고 나는 다른 일을 한다.', main:'leadership',
        pts:{leadership:2, trust:1},
        note:'일을 나누는 것은 리더의 일이지만, 결과에 대한 책임까지 넘길 수는 없다.'},
      {text:'고객에게 상황을 알리고 의견을 듣는다.', main:'communication',
        pts:{communication:3, trust:2, responsibility:1},
        note:'불리한 사실을 먼저 말하는 것은 위험해 보이지만, 오히려 고객의 신뢰를 얻는 방법이 되기도 한다.'}
    ]
  },
  {
    fig:'B',
    title:'목표한 성과를 이루지 못했다.',
    situation:'3개월 동안 준비한 서비스의 이용자가\n예상했던 목표의 절반밖에 되지 않았다.',
    ask:'당신은 어떻게 행동할까?',
    options:[
      {text:'실패했다고 생각하고 프로젝트를 종료한다.', main:'preparedness',
        pts:{preparedness:2, trust:1},
        note:'더 큰 손실을 막는 판단일 수 있다. 다만 원인을 확인하지 않은 종료는 다음 도전에 아무것도 남기지 못한다.'},
      {text:'문제점을 분석하고 목표를 다시 설정한다.', main:'achievement',
        pts:{achievement:3, responsibility:2, preparedness:1},
        note:'목표를 세우고 부족한 부분을 개선하며 끝까지 성과를 만들어내려는 태도.'},
      {text:'다른 팀의 성공 사례를 그대로 따라 한다.', main:'preparedness',
        pts:{preparedness:2, achievement:1},
        note:'앞선 사례를 살피는 것은 위험을 줄인다. 그러나 우리 문제의 원인은 우리만 알 수 있다.'},
      {text:'결과는 운의 문제였다고 생각한다.', main:'confidence',
        pts:{confidence:2, leadership:1},
        note:'흔들리지 않는 마음은 필요하다. 하지만 원인을 운으로 돌리면 같은 결과가 반복된다.'}
    ]
  },
  {
    fig:'C',
    title:'갑자기 시장이 변했다.',
    situation:'출시를 준비하는 동안 경쟁 기업에서\n새로운 기술을 적용한 제품을 공개했다.',
    ask:'당신은 어떻게 준비할까?',
    options:[
      {text:'원래 계획대로만 진행한다.', main:'confidence',
        pts:{confidence:2, responsibility:1},
        note:'계획을 지키는 힘은 중요하다. 다만 시장이 변했는데 계획만 그대로면 위험은 그대로 남는다.'},
      {text:'경쟁 기업의 제품을 분석하고 전략을 수정한다.', main:'preparedness',
        pts:{preparedness:3, achievement:2, leadership:1},
        note:'변화와 위험을 예상하고 미리 준비하는 태도.'},
      {text:'경쟁 기업이 잘될지 지켜본다.', main:'preparedness',
        pts:{preparedness:1, trust:1},
        note:'관망도 하나의 전략이다. 그러나 지켜보는 동안 준비할 시간도 함께 지나간다.'},
      {text:'일단 제품을 출시하고 반응을 확인한다.', main:'achievement',
        pts:{achievement:2, confidence:1, communication:1},
        note:'시장에서 직접 답을 얻는 빠른 방법. 대신 한 번의 반응으로 평가가 굳어질 수 있다.'}
    ]
  },
  {
    fig:'D',
    title:'팀원과 의견이 충돌했다.',
    situation:'중요한 프로젝트의 방향을 결정해야 하는데\n팀원과 서로 다른 의견을 가지고 있다.',
    ask:'당신은 어떻게 할까?',
    options:[
      {text:'내 의견이 더 좋다고 생각하고 그대로 진행한다.', main:'confidence',
        pts:{confidence:2, leadership:2},
        note:'결정을 내리는 것은 리더의 역할이다. 다만 설득 없는 결정은 팀을 함께 움직이게 하지 못한다.'},
      {text:'서로의 의견을 듣고 가장 좋은 방법을 함께 찾는다.', main:'communication',
        pts:{communication:3, trust:2, leadership:2},
        note:'자신의 생각을 전달하고 다른 사람의 의견을 이해하며 협력하는 능력. 이 과정에서 신뢰도 함께 쌓인다.'},
      {text:'팀원에게 결정을 맡긴다.', main:'trust',
        pts:{trust:3, leadership:1},
        note:'믿고 맡기는 것도 신뢰를 만드는 방법. 다만 매번 맡기기만 하면 방향을 정할 사람이 사라진다.'},
      {text:'갈등을 피하기 위해 아무 결정도 하지 않는다.', main:'preparedness',
        pts:{preparedness:1},
        note:'당장의 충돌은 피할 수 있다. 그러나 결정이 미뤄지는 동안 문제는 더 커진다.'}
    ]
  },
  {
    fig:'E',
    title:'아무도 당신의 아이디어를 믿지 않는다.',
    situation:'당신이 새로운 서비스를 만들겠다고 하자\n주변 사람들은 "성공하기 어려울 것 같다"고 말한다.',
    ask:'당신은 어떻게 할까?',
    options:[
      {text:'주변에서 반대하니 아이디어를 포기한다.', main:'preparedness',
        pts:{preparedness:1, trust:1},
        note:'다른 사람의 판단을 듣는 것은 신중함이다. 다만 새로운 것은 언제나 처음엔 반대를 받는다.'},
      {text:'내 아이디어의 장점과 가능성을 설명하고 도전한다.', main:'confidence',
        pts:{confidence:3, communication:2, leadership:2},
        note:'자신의 능력과 아이디어를 믿고 새로운 도전에 나서는 태도. 설명하는 과정에서 사람들이 모이기 시작한다.'},
      {text:'다른 사람이 먼저 성공하면 따라간다.', main:'preparedness',
        pts:{preparedness:2, achievement:1},
        note:'위험은 줄지만, 기업가가 얻는 가장 큰 몫은 대부분 먼저 움직인 사람에게 돌아간다.'},
      {text:'아무에게도 말하지 않고 혼자 진행한다.', main:'responsibility',
        pts:{responsibility:2, confidence:2},
        note:'끝까지 혼자 짊어지는 책임감. 하지만 아무도 모르는 아이디어는 도움도 받을 수 없다.'}
    ]
  }
];

/* =========================================================
   3. 인물 이미지 (SVG로 직접 생성 — 저작권 문제 없음)
   ========================================================= */
function svgDefs(id){
  return `
  <defs>
    <radialGradient id="skin${id}" cx="40%" cy="32%" r="72%">
      <stop offset="0%" stop-color="#f6f4ee"/>
      <stop offset="46%" stop-color="#c2c0b9"/>
      <stop offset="100%" stop-color="#2a2a27"/>
    </radialGradient>
    <linearGradient id="hair${id}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#4a4844"/>
      <stop offset="60%" stop-color="#1c1c1a"/>
      <stop offset="100%" stop-color="#0a0a09"/>
    </linearGradient>
    <linearGradient id="cloth${id}" x1="0.3" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#c9c6bf"/>
      <stop offset="42%" stop-color="#6e6c67"/>
      <stop offset="100%" stop-color="#090908"/>
    </linearGradient>
    <filter id="soft${id}" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
    <filter id="soft2${id}" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
  </defs>`;
}

// 얼굴 한 덩어리(머리 + 목 + 어깨) — 목과 어깨가 끊기지 않도록 좌표를 맞춤
function bust(id, o){
  const t = o.tilt || 0;
  return `
  <g transform="translate(${o.x||0},${o.y||0}) scale(${o.s||1})" opacity="${o.op||1}">
    <path d="M-46 60 L46 60 L52 286 L-52 286 Z" fill="url(#skin${id})"/>
    <path d="M-240 700 C-230 456 -134 306 -54 290 L54 290 C134 306 230 456 240 700 Z" fill="url(#cloth${id})"/>
    <path d="M-54 168 C-30 214 30 214 54 168 L54 292 L-54 292 Z" fill="#141412" opacity=".5"/>
    <g transform="rotate(${t})">
      <path d="M-138 40 C-138 -132 -74 -196 0 -196 C74 -196 138 -132 138 40 C138 96 118 128 96 138 C104 40 96 -60 0 -60 C-96 -60 -104 40 -96 138 C-118 128 -138 96 -138 40 Z" fill="url(#hair${id})"/>
      <ellipse cx="0" cy="10" rx="112" ry="146" fill="url(#skin${id})"/>
      <ellipse cx="-44" cy="-18" rx="27" ry="12" fill="#131311" opacity=".44"/>
      <ellipse cx="46" cy="-20" rx="27" ry="12" fill="#131311" opacity=".44"/>
      <path d="M-72 -50 C-56 -62 -30 -60 -18 -50" stroke="#131311" stroke-width="8" fill="none" opacity=".34"/>
      <path d="M18 -52 C32 -62 58 -64 74 -50" stroke="#131311" stroke-width="8" fill="none" opacity=".34"/>
      <ellipse cx="4" cy="44" rx="13" ry="25" fill="#131311" opacity=".26"/>
      <ellipse cx="2" cy="94" rx="30" ry="11" fill="#131311" opacity=".46"/>
      <ellipse cx="-88" cy="26" rx="28" ry="56" fill="#131311" opacity=".3"/>
      <ellipse cx="90" cy="30" rx="24" ry="50" fill="#131311" opacity=".2"/>
      <path d="M-150 -28 C-150 -170 -80 -214 0 -214 C80 -214 150 -170 150 -28 C130 -122 74 -150 0 -150 C-74 -150 -130 -122 -150 -28 Z" fill="url(#hair${id})"/>
    </g>
  </g>`;
}

const FIGURES = {
  // A — 손을 얼굴 가까이 든 인물 (참고 이미지 구도)
  A:`<svg viewBox="0 0 620 860" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${svgDefs('A')}
      <g filter="url(#softA)" transform="translate(310,190)">
        ${bust('A',{tilt:-4})}
        <path d="M160 700 C132 566 108 452 76 330 C58 292 112 268 132 306 C164 372 190 512 216 700 Z" fill="url(#clothA)" opacity=".9"/>
        <ellipse cx="88" cy="252" rx="50" ry="44" fill="url(#skinA)"/>
        <ellipse cx="60" cy="212" rx="16" ry="30" transform="rotate(18 60 212)" fill="url(#skinA)"/>
        <ellipse cx="92" cy="198" rx="14" ry="32" transform="rotate(6 92 198)" fill="url(#skinA)"/>
      </g></svg>`,
  // B — 정면 상반신
  B:`<svg viewBox="0 0 620 860" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${svgDefs('B')}
      <g filter="url(#softB)" transform="translate(310,200)">${bust('B',{tilt:2,s:1.02})}</g></svg>`,
  // C — 멀리 물러선 인물 + 배경의 흐릿한 실루엣
  C:`<svg viewBox="0 0 620 860" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${svgDefs('C')}
      <g filter="url(#soft2C)" transform="translate(430,300) scale(.62)" opacity=".5">${bust('C',{tilt:8})}</g>
      <g filter="url(#softC)" transform="translate(250,230) scale(.92)">${bust('C',{tilt:-6})}</g></svg>`,
  // D — 마주 선 두 사람
  D:`<svg viewBox="0 0 620 860" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${svgDefs('D')}
      <g filter="url(#soft2D)" transform="translate(196,296) scale(.72)" opacity=".62">${bust('D',{tilt:11})}</g>
      <g filter="url(#softD)" transform="translate(398,236) scale(.88)">${bust('D',{tilt:-9})}</g></svg>`,
  // E — 고개를 든 인물
  E:`<svg viewBox="0 0 620 860" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${svgDefs('E')}
      <g filter="url(#soft2E)" transform="translate(310,214) scale(1.06)">${bust('E',{tilt:-13})}</g></svg>`
};

/* =========================================================
   4. 상태
   ========================================================= */
const TOTAL = 7;                 // FRAME 01 ~ 07
let idx = 0;                     // 0 = intro, 1~5 = 질문, 6 = 결과
let answers = [null,null,null,null,null];
let busy = false;

const $content  = document.getElementById('content');
const $portrait = document.getElementById('portrait');
const $scrim    = document.getElementById('scrim');
const $slateL   = document.getElementById('slateL');
const $back     = document.getElementById('back');
const $next     = document.getElementById('next');
const $ticks    = document.getElementById('ticks');
const $tracking = document.getElementById('tracking');
const REDUCED   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 점수 계산 ---------- */
function computeScores(){
  const s = {};
  ORDER.forEach(k => s[k] = 0);
  answers.forEach((pick, qi) => {
    if(pick === null) return;
    const pts = QUESTIONS[qi].options[pick].pts;
    for(const k in pts) s[k] += pts[k];
  });
  return s;
}
function topTraits(scores){
  const max = Math.max(...ORDER.map(k => scores[k]));
  const tied = ORDER.filter(k => scores[k] === max && max > 0);
  return {max, tied, winner: tied[0] || 'responsibility'};
}
const esc = t => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const CIRC = ['①','②','③','④'];

/* =========================================================
   5. 화면 그리기
   ========================================================= */
function frameHTML(){
  if(idx === 0) return introHTML();
  if(idx === TOTAL - 1) return resultHTML();
  return questionHTML(idx - 1);
}

function introHTML(){
  return `
  <div class="frame intro">
    <div class="eyebrow">Your Entrepreneur Type</div>
    <h1>나는 어떤<br>기업가일까?</h1>
    <p class="lead">당신의 선택으로 알아보는 기업가의 자질</p>
    <div class="rule"></div>
    <div class="meta">상황 05 · 특성 07 · 소요 03분<br>화면을 넘기며 함께 선택해 주세요</div>
  </div>`;
}

function questionHTML(qi){
  const q = QUESTIONS[qi];
  const picked = answers[qi];
  const opts = q.options.map((o,i) => {
    const cls = picked === null ? '' : (picked === i ? 'picked' : 'muted');
    return `<button class="opt ${cls}" data-opt="${i}" aria-pressed="${picked===i}">
      <span class="num">${CIRC[i]}</span><span>${esc(o.text)}</span></button>`;
  }).join('');

  let readout = '';
  if(picked !== null){
    const o = q.options[picked];
    const tr = TRAITS[o.main];
    readout = `
    <div class="readout">
      <div class="chose">You chose ${CIRC[picked]}</div>
      <div class="cap">이 선택에서 가장 잘 나타나는 기업가 특성</div>
      <div class="trait"><strong>${tr.ko}</strong><span>${tr.en}</span></div>
      <div class="note">${esc(o.note)}</div>
    </div>`;
  }

  return `
  <div class="frame">
    <div class="q">
      <div class="q-left">
        <div class="eyebrow">Situation ${String(qi+1).padStart(2,'0')}</div>
        <h2>${esc(q.title)}</h2>
        <p class="situation">${esc(q.situation)}</p>
        <p class="ask">${esc(q.ask)}</p>
      </div>
      <div class="q-right">
        <div class="opts">${opts}</div>
        ${readout}
      </div>
    </div>
  </div>`;
}

function resultHTML(){
  const scores = computeScores();
  const {max, tied, winner} = topTraits(scores);
  const w = TRAITS[winner];
  const peer = PEERS[winner];
  const denom = Math.max(max, 1);

  const bars = ORDER.map(k => {
    const isTop = k === winner;
    const pct = Math.round(scores[k] / denom * 100);
    return `
    <div class="bar-row ${isTop ? 'top' : ''}">
      <span class="bar-label">${TRAITS[k].short}</span>
      <span class="bar-track">
        <span class="bar-fill" data-pct="${pct}"></span>
        ${isTop ? '<span class="tag">Your Type</span>' : ''}
      </span>
      <span class="bar-val">${scores[k]}</span>
    </div>`;
  }).join('');

  let tie = '';
  if(tied.length === 2 || tied.length === 3){
    tie = `<div class="tie">공동 1위 · ${tied.map(k=>TRAITS[k].ko).join(' / ')}</div>`;
  } else if(tied.length > 3){
    tie = `<div class="tie">${tied.length}개 특성 공동 1위 · 어느 하나에 치우치지 않은 균형형</div>`;
  }

  return `
  <div class="frame result flash">
    <div class="eyebrow">Your Entrepreneur Type</div>
    <h2>당신은 어떤 기업가일까요?</h2>
    <div class="bigtype">${w.en}</div>
    <div class="ko">${w.ko}</div>
    <p class="say">${esc(w.desc)}</p>
    ${tie}
    <div class="res-grid">
      <div class="scoreblock">
        <h3>나의 기업가 점수</h3>
        ${bars}
      </div>
      <div class="peer">
        <h3>나와 닮은 기업가</h3>
        <div class="who">${peer.name}</div>
        <div class="org">${peer.org}</div>
        <p class="story">${esc(peer.story)}</p>
        <p class="echo">${esc(peer.echo)}</p>
      </div>
    </div>
  </div>`;
}

/* ---------- 렌더 ---------- */
function paint(){
  $content.innerHTML = frameHTML();

  // 인물 이미지
  let figKey = 'B', mode = 'ask', op = .34;
  if(idx === 0){ figKey = 'A'; mode = 'center'; op = .52; }
  else if(idx === TOTAL - 1){ figKey = 'E'; mode = 'end'; op = .5; }
  else { figKey = QUESTIONS[idx-1].fig; }
  $portrait.className = 'layer portrait ' + mode;
  $scrim.className = 'layer scrim ' + mode;
  $portrait.style.setProperty('--po', op);
  $portrait.style.opacity = op;
  $portrait.innerHTML = FIGURES[figKey];

  // 슬레이트 / 내비
  $slateL.textContent = `Frame ${String(idx+1).padStart(2,'0')} / 0${TOTAL}`;
  $back.style.visibility = idx === 0 ? 'hidden' : 'visible';

  if(idx === 0){
    $next.textContent = 'Start Game →';
    $next.disabled = false;
  } else if(idx === TOTAL - 1){
    $next.textContent = 'Play Again ↻';
    $next.disabled = false;
  } else {
    $next.textContent = 'Next →';
    $next.disabled = answers[idx-1] === null;
  }

  // 진행 표시
  $ticks.innerHTML = QUESTIONS.map((_,i) => {
    const c = (idx-1 === i) ? 'tick now' : (answers[i] !== null ? 'tick done' : 'tick');
    return `<span class="${c}"></span>`;
  }).join('');

  // 선택지 이벤트
  $content.querySelectorAll('[data-opt]').forEach(btn => {
    btn.addEventListener('click', () => choose(parseInt(btn.dataset.opt,10)));
  });

  // 막대그래프 애니메이션
  const fills = $content.querySelectorAll('.bar-fill');
  if(fills.length){
    requestAnimationFrame(() => setTimeout(() => {
      fills.forEach(f => f.style.width = f.dataset.pct + '%');
    }, 120));
  }
}

function transition(fn){
  if(busy) return;
  busy = true;
  if(REDUCED){ fn(); paint(); busy = false; return; }
  $tracking.classList.remove('run');
  void $tracking.offsetWidth;
  $tracking.classList.add('run');
  $content.classList.add('out');
  setTimeout(() => {
    fn();
    paint();
    $content.classList.remove('out');
    $content.classList.remove('in');
    void $content.offsetWidth;
    $content.classList.add('in');
    $content.scrollTop = 0;
    setTimeout(() => { busy = false; }, 220);
  }, 210);
}

/* ---------- 조작 ---------- */
function choose(i){
  if(busy || idx === 0 || idx === TOTAL-1) return;
  const qi = idx - 1;
  answers[qi] = i;
  paint();
  const ro = $content.querySelector('.readout');
  if(ro && !REDUCED){
    $tracking.classList.remove('run'); void $tracking.offsetWidth; $tracking.classList.add('run');
  }
}
function goNext(){
  if(idx === TOTAL - 1){ restart(); return; }
  if(idx !== 0 && answers[idx-1] === null) return;
  if(idx < TOTAL - 1) transition(() => { idx++; });
}
function goBack(){ if(idx > 0) transition(() => { idx--; }); }
function restart(){
  transition(() => { answers = [null,null,null,null,null]; idx = 0; });
}

$next.addEventListener('click', goNext);
$back.addEventListener('click', goBack);

document.addEventListener('keydown', e => {
  const k = e.key;
  if(k === 'ArrowRight' || k === 'Enter' || k === ' ' || k === 'PageDown'){ e.preventDefault(); goNext(); }
  else if(k === 'ArrowLeft' || k === 'PageUp'){ e.preventDefault(); goBack(); }
  else if(['1','2','3','4'].includes(k)){ choose(parseInt(k,10) - 1); }
  else if(k === 'r' || k === 'R'){ restart(); }
  else if(k === 'f' || k === 'F'){
    if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
});

/* ---------- 타임코드 ---------- */
(function(){
  const $tc = document.getElementById('tc');
  let f = 0;
  setInterval(() => {
    f++;
    const ff = f % 24, s = Math.floor(f/24)%60, m = Math.floor(f/1440)%60;
    const p = n => String(n).padStart(2,'0');
    $tc.textContent = `00:${p(m)}:${p(s)}:${p(ff)}`;
  }, REDUCED ? 1000 : 42);
})();

paint();