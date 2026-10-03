// Relationship Health Check: 10 questions, 5 areas, 0-3 points per answer.
const AREAS = {
  comm:    ['Communication',     '../pages/communication.html'],
  trust:   ['Trust and Loyalty', '../topics/trust-loyalty.html'],
  support: ['Emotional Support', '../topics/emotional-support.html'],
  bound:   ['Healthy Boundaries','../topics/boundaries.html'],
  goals:   ['Relationship Goals','../topics/goals.html']
};

const QUESTIONS = [
  ['comm', 'When you disagree with your partner, what do you usually do?', [['I stay calm and listen before I respond',3],['I explain my side but sometimes interrupt',2],['I go quiet and hope it passes',1],['I get loud or say things I regret',0]]],
  ['comm', 'How often do you tell your partner how you really feel?', [['Rarely. I keep most things inside',1],['Whenever something matters to me',3],['Only when I am upset',0],['Often, but not always clearly',2]]],
  ['trust', 'How would your partner describe your honesty?', [['I sometimes hide small things to avoid trouble',1],['They can rely on me to tell the truth',3],['I have been caught in lies before',0],['Honest about big things, less about small ones',2]]],
  ['trust', "You see your partner's phone light up with a message. You...", [['Feel curious, but I trust them',2],['Do not think twice about it',3],['Want to check it',1],['Often check it when they are not looking',0]]],
  ['support', 'Your partner has had a terrible day. You...', [['Tell them it is not a big deal',0],['Give advice straight away',1],['Listen first, then ask what they need',3],['Stay nearby, but I am not sure what to say',2]]],
  ['support', 'When you are struggling, how comfortable are you asking for support?', [['Very. I know they will be there',3],['I would rather handle it alone',1],['I hide it so I do not burden them',0],['Somewhat. It depends on the situation',2]]],
  ['bound', 'Your partner asks for something you are not comfortable with. You...', [['Say no kindly and explain why',3],['Say yes to avoid conflict, then feel bad',0],['Hesitate and hope they drop it',1],['Say no, but feel guilty afterwards',2]]],
  ['bound', 'How do you feel about your partner having their own friends and time?', [['It makes me anxious or jealous',0],['I support it and enjoy my own time too',3],['I allow it, but I want to know everything',1],['I am fine with it most of the time',2]]],
  ['goals', 'Have you talked about where you both want to be in a year or two?', [['Not really, we take things day by day',1],['Yes, and we are working on it',3],['We have touched on it once or twice',2],['It makes me uncomfortable to talk about',0]]],
  ['goals', "How do you react to your partner's personal goals?", [['I cheer them on and help where I can',3],['I support them if it does not affect me',2],['I sometimes feel threatened by them',0],['I have not asked much about them',1]]]
];

const $ = id => document.getElementById(id);
let current = 0;
let answers = [];

function showSection(id) {
  ['start-screen', 'question-container', 'results-container'].forEach(s => $(s).classList.toggle('active', s === id));
}

function renderQuestion() {
  const [area, text, options] = QUESTIONS[current];
  $('question-count').textContent = 'Question ' + (current + 1) + ' of ' + QUESTIONS.length;
  $('question-area').textContent = AREAS[area][0];
  $('progress-fill').style.width = (current / QUESTIONS.length * 100) + '%';
  $('question-text').textContent = text;
  const box = $('options-container');
  box.innerHTML = '';
  options.forEach(([label], k) => {
    const b = document.createElement('button');
    b.className = 'option-button' + (answers[current] === k ? ' selected' : '');
    b.innerHTML = '<span class="letter">' + 'ABCD'[k] + '</span><span></span>';
    b.lastChild.textContent = label;
    b.addEventListener('click', () => choose(k, b));
    box.appendChild(b);
  });
  $('prev-question').disabled = current === 0;
}

function choose(k, button) {
  answers[current] = k;
  document.querySelectorAll('.option-button').forEach(o => o.classList.remove('selected'));
  button.classList.add('selected');
  setTimeout(() => {
    if (current < QUESTIONS.length - 1) { current++; renderQuestion(); }
    else showResults();
  }, 280);
}

function showResults() {
  const scores = { comm: 0, trust: 0, support: 0, bound: 0, goals: 0 };
  QUESTIONS.forEach((q, n) => { scores[q[0]] += q[2][answers[n]][1]; });
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const pct = Math.round(total / 30 * 100);

  let title, sub;
  if (pct >= 80)      { title = 'A Strong Foundation'; sub = 'You communicate, trust and support each other well. Keep nurturing it.'; }
  else if (pct >= 55) { title = 'Growing Well';        sub = 'You have good habits and a few areas that deserve attention.'; }
  else                { title = 'Room to Grow';        sub = 'Every relationship starts somewhere. The topics below can help you build skills step by step.'; }

  const keys = Object.keys(scores);
  const weakest = keys.reduce((a, b) => scores[b] < scores[a] ? b : a);

  const rows = keys.map(k => {
    const v = scores[k];
    const [cls, label] = v >= 5 ? ['strong', 'Strong'] : v >= 3 ? ['mid', 'Developing'] : ['low', 'Needs attention'];
    return '<div class="area-row"><div class="area-label"><span>' + AREAS[k][0] + '</span><span class="area-badge ' + cls + '">' + label + '</span></div>' +
           '<div class="area-track"><i data-w="' + Math.round(v / 6 * 100) + '%"></i></div></div>';
  }).join('');

  const advice = pct >= 80
    ? 'To keep growing, explore ' + AREAS[weakest][0] + ', your lowest score.'
    : 'Start with ' + AREAS[weakest][0] + '. It is where a small change will help most.';

  $('results-content').innerHTML =
    '<div class="score-row"><div class="score-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
    '<div><h3>' + title + '</h3><p>' + sub + '</p></div></div>' + rows +
    '<div class="next-read"><strong>Read this next</strong><p>' + advice + '</p>' +
    '<a class="quiz-button" href="' + AREAS[weakest][1] + '">Read: ' + AREAS[weakest][0] + '</a></div>';

  $('progress-fill').style.width = '100%';
  showSection('results-container');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => document.querySelectorAll('.area-track i').forEach(i => { i.style.width = i.dataset.w; }), 80);
}

$('start-quiz').addEventListener('click', () => { current = 0; answers = []; showSection('question-container'); renderQuestion(); });
$('prev-question').addEventListener('click', () => { if (current > 0) { current--; renderQuestion(); } });
$('retry-quiz').addEventListener('click', () => { current = 0; answers = []; showSection('start-screen'); window.scrollTo({ top: 0 }); });
