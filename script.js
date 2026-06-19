const STORAGE_KEY = "sportsTourismCountryQuizStatsV1";
const countries = [...new Set(QUESTION_BANK.map(q => q.country))];
let selectedCountries = new Set(countries);
let selectedCount = 10;
let currentSet = [];
let index = 0;
let score = 0;
let answered = false;
let wrongInSession = [];
let studySet = [];
let studyIndex = 0;
let stats = loadStats();

const $ = s => document.querySelector(s);
const countryChips = $("#countryChips");

function loadStats(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}}catch(e){return {}}}
function saveStats(){localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));}
function shuffle(arr){return [...arr].sort(()=>Math.random()-0.5)}
function statOf(id){return stats[id] || {wrong:0, correctStreak:0}}

function init(){
  renderCountryChips();
  bindSetup();
  updateSetupInfo();
}
function renderCountryChips(){
  countryChips.innerHTML = "";
  countries.forEach(c=>{
    const btn=document.createElement("button");
    btn.className="chip country active";
    btn.textContent=`${c} (${QUESTION_BANK.filter(q=>q.country===c).length})`;
    btn.dataset.country=c;
    btn.onclick=()=>{selectedCountries.has(c)?selectedCountries.delete(c):selectedCountries.add(c);btn.classList.toggle("active");updateSetupInfo();};
    countryChips.appendChild(btn);
  });
}
function bindSetup(){
  document.querySelectorAll(".count").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".count").forEach(b=>b.classList.remove("active"));btn.classList.add("active");selectedCount=btn.dataset.count;updateSetupInfo();});
  $("#startBtn").onclick=()=>startQuiz();
  $("#studyModeBtn").onclick=()=>startStudyMode();
  $("#backBtn").onclick=()=>showSetup();
  $("#studyBackBtn").onclick=()=>showSetup();
  $("#studyPrevBtn").onclick=()=>prevStudyQuestion();
  $("#studyNextBtn").onclick=()=>nextStudyQuestion();
  $("#studyShuffleBtn").onclick=()=>startStudyMode();
  $("#nextBtn").onclick=()=>nextQuestion();
  $("#restartBtn").onclick=()=>showSetup();
  $("#retryWrongBtn").onclick=()=>{ $("#wrongOnly").checked=true; showSetup(); updateSetupInfo(); };
  $("#resetStatsBtn").onclick=()=>{ if(confirm("틀린 문제 기록을 전부 초기화할까요?")){stats={};saveStats();updateSetupInfo();} };
}
function getPool(){
  let pool=QUESTION_BANK.filter(q=>selectedCountries.has(q.country));
  if($("#wrongOnly").checked){pool=pool.filter(q=>statOf(q.id).wrong>0)}
  return pool;
}
function updateSetupInfo(){
  const pool=getPool();
  const wrongCount=QUESTION_BANK.filter(q=>statOf(q.id).wrong>0).length;
  $("#setupInfo").textContent=`출제 가능 ${pool.length}문제 · 많이 틀린 문제 ${wrongCount}문제 · 전체 수록 ${QUESTION_BANK.length}문제`;
}
function startQuiz(customSet=null){
  let pool = customSet || getPool();
  if(pool.length===0){alert("출제할 문제가 없습니다. 국가 선택 또는 많이 틀린 문제 옵션을 확인하세요.");return;}
  const limit = selectedCount === "all" ? pool.length : Math.min(Number(selectedCount), pool.length);
  currentSet = shuffle(pool).slice(0, limit).map(q=>prepareQuestion(q));
  index=0;score=0;answered=false;wrongInSession=[];
  $("#setup").classList.add("hidden");$("#result").classList.add("hidden");$("#quiz").classList.remove("hidden");
  renderQuestion();
}
function prepareQuestion(q){
  let choices=q.choices.map((text,i)=>({text, original:i+1}));
  if($("#shuffleChoices").checked) choices=shuffle(choices);
  const answerIndex=choices.findIndex(c=>c.original===q.answer);
  return {...q, displayChoices:choices, displayAnswer:answerIndex};
}
function renderQuestion(){
  answered=false;
  const q=currentSet[index];
  $("#countryTag").textContent=q.country + (q.type === "tf" ? " · O/X" : " · 객관식");
  $("#questionText").textContent=q.question;
  $("#counter").textContent=`${index+1}/${currentSet.length}`;
  $("#progressBar").style.width=`${(index/currentSet.length)*100}%`;
  $("#feedback").className="feedback hidden";
  $("#nextBtn").classList.add("hidden");
  const box=$("#choices");box.innerHTML="";
  q.displayChoices.forEach((c,i)=>{
    const b=document.createElement("button");
    b.className="choice";
    b.innerHTML=`<b>${i+1}</b>. ${c.text}`;
    b.onclick=()=>selectAnswer(i);
    box.appendChild(b);
  });
}
function selectAnswer(i){
  if(answered) return;
  answered=true;
  const q=currentSet[index];
  const buttons=[...document.querySelectorAll(".choice")];
  buttons.forEach((b,idx)=>{ if(idx===q.displayAnswer)b.classList.add("correct"); if(idx===i && idx!==q.displayAnswer)b.classList.add("wrong"); });
  const ok=i===q.displayAnswer;
  const s=statOf(q.id);
  if(ok){score++; s.correctStreak=(s.correctStreak||0)+1; if(s.correctStreak>=3) s.wrong=0;}
  else{ s.wrong=(s.wrong||0)+1; s.correctStreak=0; wrongInSession.push(q); }
  stats[q.id]=s; saveStats(); updateSetupInfo();
  const fb=$("#feedback");
  fb.className=`feedback ${ok?'good':'bad'}`;
  const correctText=q.displayChoices[q.displayAnswer].text;
  fb.innerHTML=`${ok?'정답!':'오답'}<br>정답: <b>${correctText}</b>${q.explanation?`<br><span>${q.explanation}</span>`:''}`;
  $("#nextBtn").classList.remove("hidden");
  $("#nextBtn").textContent=index===currentSet.length-1?"결과 보기":"다음 문제";
}
function nextQuestion(){
  if(index<currentSet.length-1){index++;renderQuestion();} else showResult();
}
function showResult(){
  $("#progressBar").style.width="100%";
  $("#quiz").classList.add("hidden");$("#result").classList.remove("hidden");
  const pct=Math.round(score/currentSet.length*100);
  $("#scoreText").textContent=`${score}/${currentSet.length}점 · ${pct}%`;
  $("#resultText").textContent=pct>=90?"거의 완성. 틀린 문제만 한 번 더 보면 됨.":pct>=70?"괜찮음. 오답노트 위주로 돌리면 됨.":"아직 위험. 국가별로 10문제씩 다시 돌리는 게 좋음.";
  const box=$("#wrongList");box.innerHTML="";
  if(wrongInSession.length===0){box.innerHTML='<p class="muted">이번 세트에서 틀린 문제가 없습니다.</p>'}
  wrongInSession.forEach(q=>{
    const div=document.createElement("div");div.className="wrong-item";
    div.innerHTML=`<b>[${q.country}] ${q.question}</b><span>정답: ${q.choices[q.answer-1]}</span>`;
    box.appendChild(div);
  });
  $("#retryWrongBtn").style.display=QUESTION_BANK.some(q=>statOf(q.id).wrong>0)?"block":"none";
}
function showSetup(){
  $("#quiz").classList.add("hidden");
  $("#result").classList.add("hidden");
  $("#study").classList.add("hidden");
  $("#setup").classList.remove("hidden");
  updateSetupInfo();
}


function orderLabel(mode){
  return {
    random:"랜덤",
    likely:"출제유력순",
    hard:"어려운 순",
    easy:"쉬운 순"
  }[mode] || "랜덤";
}
function getStudyOrderMode(){
  const el = $("#studyOrderSelect");
  return el ? el.value : "random";
}
function baseDifficultyScore(q){
  const text = `${q.question} ${q.choices.join(" ")} ${q.explanation || ""}`;
  let score = 0;
  if(/정책|시사점|구조|모델|비교|지속가능|장소성|형성|기반|분권|민간|중앙정부/.test(text)) score += 45;
  if(/가장 적절|가장 타당|가장 거리가 먼|공통적|의미|개념|설명/.test(text)) score += 28;
  if(/다음 중|국가별|대표 사례 비교|운동형|관람형|체험형|유산/.test(text)) score += 18;
  if(q.choices.length >= 4) score += 8;
  if(text.length > 120) score += 6;
  if(/[A-Za-z]{4,}|·|\/|[0-9]{4}/.test(text)) score += 5;
  if(/도시|항공사|리조트|경기장|공항|개최지|대회|명예의 전당|박물관/.test(text)) score -= 8;
  if(/국민 스포츠|대표 항공사|개최한 곳|도시는\?|종목은\?|명소는\?/.test(q.question)) score -= 10;
  return score;
}
function likelyScore(q){
  const text = `${q.question} ${q.choices.join(" ")} ${q.explanation || ""}`;
  let score = 0;

  // 출제자 성향 반영: 단순 지명보다 정책·시사점·비교·장소성·유형 구분을 앞에 배치
  if(/정책|시사점|구조|모델|비교|지속가능|장소성|형성|기반/.test(text)) score += 90;
  if(/운동형|관람형|체험형|유산형|Event|대표 사례 비교/.test(text)) score += 65;
  if(/한국|미국|캐나다|핀란드|호주|필리핀|중국|일본/.test(text) && /비교|시사점|공통|기반|모델/.test(text)) score += 45;
  if(/자연|일상|관광 자원|지역|민간|중앙정부|분권|국민 참여/.test(text)) score += 32;
  if(/올림픽|레거시|개최|스포츠관광지로 성장/.test(text)) score += 28;
  if(/대표|국민 스포츠|명소|도시|리조트|항공사|숙박|대회|박물관|명예의 전당/.test(text)) score += 14;
  if(/다음 중|가장 적절|가장 타당|가장 거리가 먼/.test(text)) score += 10;

  // 단순 암기형은 뒤로 조금 밀기
  if(/공항 코드|항공사|숙박 브랜드|도시 조합|몇 년|개최한 곳/.test(text)) score -= 8;
  return score + baseDifficultyScore(q) * 0.35;
}
function orderedQuestions(mode){
  if(mode === "random") return shuffle(QUESTION_BANK);

  const arr = [...QUESTION_BANK];
  arr.forEach((q, i)=>q.__originalIndex = i);

  if(mode === "likely"){
    return arr.sort((a,b)=>
      (likelyScore(b) - likelyScore(a)) ||
      (baseDifficultyScore(b) - baseDifficultyScore(a)) ||
      a.country.localeCompare(b.country, "ko") ||
      (a.__originalIndex - b.__originalIndex)
    );
  }

  if(mode === "hard"){
    return arr.sort((a,b)=>
      (baseDifficultyScore(b) - baseDifficultyScore(a)) ||
      (likelyScore(b) - likelyScore(a)) ||
      a.country.localeCompare(b.country, "ko") ||
      (a.__originalIndex - b.__originalIndex)
    );
  }

  if(mode === "easy"){
    return arr.sort((a,b)=>
      (baseDifficultyScore(a) - baseDifficultyScore(b)) ||
      (likelyScore(a) - likelyScore(b)) ||
      a.country.localeCompare(b.country, "ko") ||
      (a.__originalIndex - b.__originalIndex)
    );
  }

  return shuffle(QUESTION_BANK);
}
function startStudyMode(){
  const mode = getStudyOrderMode();
  studySet = orderedQuestions(mode);
  studyIndex = 0;
  $("#setup").classList.add("hidden");
  $("#quiz").classList.add("hidden");
  $("#result").classList.add("hidden");
  $("#study").classList.remove("hidden");
  renderStudyQuestion();
}

function renderStudyQuestion(){
  const q = studySet[studyIndex];
  const mode = getStudyOrderMode();
  $("#studyCountryTag").innerHTML = q.country + (q.type === "tf" ? " · O/X · 정답 암기" : " · 객관식 · 정답 암기") + `<span class="order-mode-chip">${orderLabel(mode)}</span>`;
  $("#studyQuestionText").textContent = q.question;
  $("#studyCounter").textContent = `${studyIndex+1}/${studySet.length}`;
  $("#studyProgressBar").style.width = `${((studyIndex+1)/studySet.length)*100}%`;

  const box = $("#studyChoices");
  box.innerHTML = "";
  q.choices.forEach((text, i)=>{
    const b = document.createElement("div");
    const isAnswer = i + 1 === q.answer;
    b.className = "choice" + (isAnswer ? " revealed-answer" : "");
    b.innerHTML = `<b>${i+1}</b>. ${text}${isAnswer ? '<span class="answer-badge">정답</span>' : ''}`;
    box.appendChild(b);
  });

  const answerText = q.choices[q.answer-1];
  $("#studyAnswerBox").innerHTML =
    `정답: <b>${q.answer}번. ${answerText}</b>` +
    (q.explanation ? `<span>${q.explanation}</span>` : "");

  $("#studyPrevBtn").disabled = studyIndex === 0;
  $("#studyNextBtn").textContent = studyIndex === studySet.length - 1 ? "처음으로" : "다음";
  $("#studyShuffleBtn").textContent = getStudyOrderMode() === "random" ? "다시 섞기" : "순서 다시 적용";
}
function nextStudyQuestion(){
  if(studyIndex < studySet.length - 1){
    studyIndex++;
  }else{
    studyIndex = 0;
  }
  renderStudyQuestion();
}
function prevStudyQuestion(){
  if(studyIndex > 0){
    studyIndex--;
    renderStudyQuestion();
  }
}

init();
