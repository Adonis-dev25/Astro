// Relationship Health Check
// Scenario questions: options are written best -> worst (3, 2, 1, 0 points) and shuffled when shown.
// Myth-or-fact questions: 3 points if correct.
const AREAS = {
  comm:    { name: 'Communication',      link: '../pages/communication.html' },
  trust:   { name: 'Trust and Loyalty',  link: '../pages/trust-loyalty.html' },
  support: { name: 'Emotional Support',  link: '../pages/emotional-support.html' },
  bound:   { name: 'Healthy Boundaries', link: '../pages/boundaries.html' },
  goals:   { name: 'Relationship Goals', link: '../pages/goals.html' }
};

const S = (area, text, opts, why) => ({ area, type: 's', text, opts, why });
const M = (area, text, ans, why) => ({ area, type: 'm', text, ans, why });

const BANK = [
  // COMMUNICATION
  S('comm', 'Your partner forgot to call you as promised and you feel hurt. What is the most helpful way to bring it up?',
    ['Say, "I felt hurt when the call didn\'t happen. Can we talk about it?"', 'Wait a day, then mention it calmly', 'Send a short "Fine. Whatever."', 'List every time they have let you down'],
    'Describing your own feelings (an "I-statement") invites a conversation. Blame, sarcasm and old lists put people on the defensive, and hints leave the real problem unsolved.'),
  S('comm', 'Your partner is describing a problem and you already know the solution. You...',
    ['Listen fully, then ask if they want advice or just support', 'Wait until they finish, then give your advice', 'Jump in with the solution straight away', 'Check your phone while they talk'],
    'Listening to understand comes before fixing. Asking what kind of help they want avoids a very common mismatch: one person wants a solution, the other wants to be heard.'),
  S('comm', 'An argument is turning into a shouting match. The best move is to...',
    ['Agree to pause for 20 minutes and then return to it', 'Lower your voice and keep going', 'Go silent until it blows over', 'Keep going until you win'],
    'When emotions run high, clear thinking drops. A short break that you both agree on (not a walk-out) lets you cool down, and returning to the talk shows the issue matters.'),
  S('comm', 'Which message is most likely to be understood correctly?',
    ['"I\'m stressed about exams, so I may reply slowly this week."', '"Busy this week."', 'No reply at all, hoping they will guess why', '"If you really cared you would know what\'s wrong."'],
    'Clear, kind and specific beats hoping the other person reads your mind. Nobody can, and testing someone\'s love this way usually creates more hurt.'),
  M('comm', 'Couples who never argue have the healthiest relationships.', false,
    'Disagreements are normal. What matters is how you handle them: with respect and without insults or contempt. Couples who avoid all conflict often hide problems that grow.'),
  M('comm', 'Tone of voice and body language can change how a message is understood, even when the words stay the same.', true,
    'The same sentence can sound caring or cruel depending on tone, face and posture. This is why serious talks work better in person or by call than by text.'),

  // TRUST
  S('trust', 'You made a small mistake and hid it. Your partner finds out. What is best now?',
    ['Admit it, apologise and explain without excuses', 'Admit it, but explain why you hid it', 'Say you forgot to mention it', 'Deny it until they have proof'],
    'Hiding it hurt more than the mistake itself. A quick, honest apology starts repairing trust, while excuses and denial damage it further.'),
  S('trust', 'A friend says your partner was seen with someone else. You...',
    ['Calmly ask your partner for their side', 'Wait and watch for more signs first', 'Confront the friend and spread the story', 'Go through your partner\'s phone'],
    'Rumours are not facts. Asking directly respects your partner and gets real information. Spying and gossip erode trust on both sides.'),
  S('trust', 'You promised to meet your partner at 4pm, but something came up. You...',
    ['Message early, apologise and suggest a new time', 'Arrive late and apologise', 'Arrive late and say nothing', 'Skip it and explain tomorrow'],
    'Trust is built from small acts of reliability. When you can\'t keep a promise, telling them early shows respect for their time.'),
  S('trust', 'Your partner shared something private. A friend asks what\'s going on with them. You...',
    ['Say it is theirs to share and change the subject', 'Say they have been busy lately', 'Share a little to explain', 'Tell everything because you are worried'],
    'Keeping private things private is a core part of loyalty. If you are worried about your partner, talk to them, not about them.'),
  M('trust', 'Regularly checking your partner\'s phone proves you love them.', false,
    'Surveillance comes from insecurity, not love, and it damages trust. If something worries you, talk about the feeling instead of spying.'),
  M('trust', 'Trust that has been broken can sometimes be rebuilt, but it takes consistent honest action over time.', true,
    'Words alone are not enough. Repair comes from transparency, patience and repeated behaviour that matches what was promised.'),

  // EMOTIONAL SUPPORT
  S('support', 'Your partner failed an important test and feels very down. You...',
    ['Sit with them, acknowledge how hard it is and ask what would help', 'Say you believe in them and offer to study together', 'Say it is only one test', 'Say they should have studied more'],
    'People need to feel understood before advice helps. Validating comes first; minimising or blaming makes someone feel more alone.'),
  S('support', 'Your partner says "I\'m fine" but seems withdrawn. You...',
    ['Gently say you have noticed and that you are there when they are ready', 'Ask once more, then give space', 'Keep pushing until they tell you', 'Ignore it because they said they are fine'],
    'Pushing makes people close up, ignoring it can feel like not caring. Naming what you notice and leaving the door open respects their pace.'),
  S('support', 'You have been supporting your partner through a hard season and you feel exhausted. Best step?',
    ['Tell them honestly you need rest and involve others who can help', 'Take short breaks without explaining', 'Keep going silently', 'Pull away without a word'],
    'Looking after yourself is part of looking after others. Support works best as a team, with friends, family or a counsellor sharing the load.'),
  S('support', 'For weeks your partner has slept badly, lost interest in things and talks hopelessly. You...',
    ['Stay close, encourage them to see a counsellor or doctor and offer to go with them', 'Listen and hope it passes with time', 'Tell them to cheer up', 'Keep it secret and handle it alone'],
    'Some struggles are bigger than a partner can fix, and seeking professional help is a strength. If someone talks about harming themselves, involve a trusted adult or emergency help immediately.'),
  M('support', 'Supporting your partner means fixing their problems for them.', false,
    'Support is mostly presence, listening and encouragement. Taking over can make people feel incapable; ask what they need instead.'),
  M('support', 'Celebrating your partner\'s good news is also a form of emotional support.', true,
    'Researchers on relationships find that how you respond to good news strongly predicts closeness. Show real interest and excitement.'),

  // BOUNDARIES
  S('bound', 'Your partner asks for your social media passwords "to prove trust". You...',
    ['Kindly explain passwords are private and suggest other ways to build trust', 'Say no and ask why they feel insecure', 'Give them to avoid a fight', 'Give fake ones'],
    'Privacy and trust can exist together. Offering other ways to build closeness keeps the relationship honest without giving up your boundary.'),
  S('bound', 'A friend invites you out, but your partner wants you home every weekend. You...',
    ['Talk about balancing time together and time with friends', 'Alternate weekends without discussing it', 'Stop seeing friends to keep the peace', 'Lie about where you are'],
    'Healthy relationships leave room for friends, family and your own interests. Being cut off from other people is a warning sign.'),
  S('bound', 'You said no to something and your partner keeps pushing. The healthiest response is to...',
    ['Repeat your no calmly and firmly', 'Say no again, then change the subject', 'Give in "just this once"', 'Say "maybe later" to end it'],
    'No is a complete answer. A partner who respects you accepts it the first time, and giving in teaches pressure to work.'),
  S('bound', 'Your partner gets angry and threatens to leave every time you set a limit. This is...',
    ['A red flag, so talk to a trusted adult or counsellor', 'A pattern to watch and talk about calmly', 'Normal in relationships', 'Proof you should not set limits'],
    'Respect for limits is basic. Threats and punishment for saying no are a form of control, and it is wise to get support from someone you trust.'),
  M('bound', 'Setting boundaries means you do not love your partner enough.', false,
    'Boundaries make love safer, not smaller. They tell your partner how to love you well.'),
  M('bound', 'It is okay to change a boundary later if you feel differently.', true,
    'Your comfort can change with time and trust. A change should always be your own free choice, never the result of pressure.'),

  // GOALS
  S('goals', 'You want to study abroad, your partner wants to stay home. You...',
    ['Share your dreams openly and explore options together', 'Compromise quickly to avoid conflict', 'Avoid the topic and hope it sorts itself', 'Insist your plan is the only option'],
    'Open conversations about the future lead to creative solutions, such as timelines or long-distance plans. Avoiding it or forcing it both end badly.'),
  S('goals', 'What is the best way to start a shared goal such as saving money?',
    ['Agree on an amount, a deadline and each person\'s part', 'Agree to save "something" each month', 'Let one person handle everything', 'Wait until you have extra money'],
    'Good goals are specific and measurable, with a deadline. Shared roles prevent one person from carrying the weight and building resentment.'),
  S('goals', 'Your partner got a great opportunity and you feel a little threatened. You...',
    ['Admit your mixed feelings, celebrate them and talk about what it means', 'Congratulate them and hide your worry', 'Say little and withdraw', 'Discourage them to keep them close'],
    'Mixed feelings are normal. Sharing them honestly, while still supporting your partner, keeps you close. Holding someone back harms both of you.'),
  S('goals', 'You keep missing your relationship goals because life is busy. A smart move is to...',
    ['Break the goal into small steps and review monthly', 'Promise to try harder next month', 'Drop it until things calm down', 'Blame each other'],
    'Small steps with regular check-ins make big goals doable. Good intentions alone rarely survive busy weeks.'),
  M('goals', 'In a healthy relationship, both people should give up their personal dreams for the relationship.', false,
    'Strong couples support each other\'s individual dreams as well as shared ones. Giving up your own goals often leads to resentment.'),
  M('goals', 'Talking about the future early can reduce misunderstandings later.', true,
    'Discussing hopes about school, work, money and family early helps you notice differences while they are still easy to talk about.')
];

const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

let settings = { count: 10, focus: 'all', time: 0 };
let timerId = null, deadline = 0;
let quiz = [], idx = 0, results = [], locked = false, streak = 0, bestStreak = 0, points = 0;

function showSection(id) {
  ['start-screen', 'question-container', 'results-container'].forEach(s => $(s).classList.toggle('active', s === id));
}

// ---------- Setup ----------
function available() { return settings.focus === 'all' ? BANK.length : BANK.filter(q => q.area === settings.focus).length; }

function refreshSetup() {
  const max = available();
  document.querySelectorAll('#count-chips .chip').forEach(c => { c.disabled = +c.dataset.count > max; });
  if (settings.count > max) settings.count = max >= 5 ? 5 : max;
  document.querySelectorAll('#count-chips .chip').forEach(c => c.classList.toggle('active', +c.dataset.count === settings.count));
  document.querySelectorAll('#focus-chips .chip').forEach(c => c.classList.toggle('active', c.dataset.focus === settings.focus));
  document.querySelectorAll('#time-chips .chip').forEach(c => c.classList.toggle('active', +c.dataset.time === settings.time));
  $('setup-note').textContent = settings.count + ' questions' + (settings.focus === 'all' ? ' mixed from all five topics' : ' on ' + AREAS[settings.focus].name) + (settings.time ? ', ' + settings.time + ' seconds each.' : '. No time limit.');
}

function buildQuiz() {
  let pool;
  if (settings.focus === 'all') {
    const groups = shuffle(Object.keys(AREAS)).map(a => shuffle(BANK.filter(q => q.area === a)));
    pool = [];
    while (pool.length < settings.count) {
      groups.forEach(g => { if (g.length && pool.length < settings.count) pool.push(g.pop()); });
    }
  } else {
    pool = shuffle(BANK.filter(q => q.area === settings.focus)).slice(0, settings.count);
  }
  return shuffle(pool);
}

function startQuiz() {
  clearTimer();
  quiz = buildQuiz(); idx = 0; results = []; streak = 0; bestStreak = 0; points = 0;
  showSection('question-container');
  showQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Timer ----------
function clearTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

function startTimer() {
  clearTimer();
  const on = settings.time > 0;
  $('timer-wrap').style.display = on ? 'flex' : 'none';
  if (!on) return;
  deadline = Date.now() + settings.time * 1000;
  tick();
  timerId = setInterval(tick, 100);
}

function tick() {
  if (locked) return;
  const left = Math.max(0, deadline - Date.now());
  const secs = Math.ceil(left / 1000);
  $('timer-text').textContent = secs + 's';
  $('timer-fill').style.width = (left / (settings.time * 1000) * 100) + '%';
  $('timer-wrap').classList.toggle('low', secs <= 5);
  if (left <= 0) answer(-1);
}

// ---------- Questions ----------
function showQuestion() {
  const q = quiz[idx];
  locked = false;
  $('question-count').textContent = 'Question ' + (idx + 1) + ' of ' + quiz.length;
  $('score-live').innerHTML = '<i class="fas fa-fire"></i> Streak ' + streak + ' &nbsp;|&nbsp; ' + points + ' pts';
  $('progress-fill').style.width = (idx / quiz.length * 100) + '%';
  $('question-area').textContent = AREAS[q.area].name;
  $('question-type').textContent = q.type === 's' ? 'Real-life situation' : 'Myth or fact';
  $('question-text').textContent = q.type === 's' ? q.text : 'Myth or fact? "' + q.text + '"';
  q.shown = q.type === 's'
    ? shuffle(q.opts.map((t, i) => ({ t, p: 3 - i })))
    : [{ t: 'Fact (true)', p: q.ans ? 3 : 0 }, { t: 'Myth (false)', p: q.ans ? 0 : 3 }];
  const box = $('options-container');
  box.innerHTML = '';
  q.shown.forEach((o, k) => {
    const b = document.createElement('button');
    b.className = 'option-button';
    b.innerHTML = '<span class="letter">' + (k + 1) + '</span><span></span>';
    b.lastChild.textContent = o.t;
    b.addEventListener('click', () => answer(k));
    box.appendChild(b);
  });
  $('feedback').className = 'feedback';
  $('next-question').classList.remove('show');
  $('next-question').innerHTML = (idx === quiz.length - 1 ? 'See Results' : 'Next') + ' <i class="fas fa-arrow-right"></i>';
  startTimer();
}

function answer(k) {
  if (locked) return;
  locked = true;
  clearTimer();
  const q = quiz[idx];
  const chosen = k >= 0 ? q.shown[k] : { t: 'No answer (time ran out)', p: 0, timeout: true };
  points += chosen.p;
  if (chosen.p === 3) { streak++; bestStreak = Math.max(bestStreak, streak); } else streak = 0;
  results.push({ q, chosen, best: q.shown.find(o => o.p === 3) });

  document.querySelectorAll('.option-button').forEach((b, n) => {
    b.disabled = true;
    const p = q.shown[n].p;
    if (p === 3) b.classList.add('best');
    else if (n === k) b.classList.add(p >= 1 ? 'mid' : 'wrong');
  });

  const mythOk = q.type === 'm';
  const [cls, title] = chosen.timeout ? ['bad', "Time's up!"] : chosen.p === 3 ? ['good', mythOk ? 'Correct!' : 'Best answer!']
    : chosen.p === 2 ? ['ok', 'Good choice, but there is a better one']
    : chosen.p === 1 ? ['ok', 'Not ideal']
    : ['bad', mythOk ? 'Not quite' : 'Think again'];
  const fb = $('feedback');
  fb.className = 'feedback show ' + cls;
  fb.innerHTML = '<h3></h3><p></p><p><a href="' + AREAS[q.area].link + '">Learn more: ' + AREAS[q.area].name + ' <i class="fas fa-arrow-right"></i></a></p>';
  fb.querySelector('h3').textContent = title;
  fb.querySelector('p').textContent = q.why;
  $('score-live').innerHTML = '<i class="fas fa-fire"></i> Streak ' + streak + ' &nbsp;|&nbsp; ' + points + ' pts';
  $('progress-fill').style.width = ((idx + 1) / quiz.length * 100) + '%';
  const next = $('next-question');
  next.classList.add('show');
  next.focus({ preventScroll: true });
  fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
  if (idx < quiz.length - 1) { idx++; showQuestion(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  else showResults();
}

// ---------- Results ----------
function ratingFor(pct) {
  if (pct >= 85) return ['Relationship Pro', 'You show excellent judgement across the board. Keep practising these habits and share them with others.'];
  if (pct >= 65) return ['Growing Strong', 'You have solid instincts and a few areas to sharpen. Review the explanations below.'];
  if (pct >= 45) return ['Learning Along the Way', 'You know some of the basics. The explanations below show where small changes help most.'];
  return ['Just Getting Started', 'Everyone starts somewhere. Read the explanations below and the topic pages, then try again.'];
}

function showResults() {
  clearTimer();
  $('timer-wrap').style.display = 'none';
  const max = quiz.length * 3, pct = Math.round(points / max * 100);
  const [title, sub] = ratingFor(pct);
  const best = results.filter(r => r.chosen.p === 3).length;

  const by = {};
  results.forEach(r => { const a = by[r.q.area] || (by[r.q.area] = { p: 0, m: 0 }); a.p += r.chosen.p; a.m += 3; });
  const keys = Object.keys(by);
  const weakest = keys.reduce((a, b) => by[b].p / by[b].m < by[a].p / by[a].m ? b : a);

  const rows = keys.map(k => {
    const r = by[k].p / by[k].m;
    const [cls, label] = r >= 0.8 ? ['strong', 'Strong'] : r >= 0.5 ? ['mid', 'Developing'] : ['low', 'Needs attention'];
    return '<div class="area-row"><div class="area-label"><span>' + AREAS[k].name + '</span><span class="area-badge ' + cls + '">' + label + ' (' + by[k].p + '/' + by[k].m + ')</span></div>' +
           '<div class="area-track"><i data-w="' + Math.round(r * 100) + '%"></i></div></div>';
  }).join('');

  const review = results.map((r, n) => {
    const dot = r.chosen.p === 3 ? 'g' : r.chosen.p >= 1 ? 'y' : 'r';
    return '<details class="review-item"><summary><span class="dot ' + dot + '"></span><span class="rq"></span></summary><div class="review-body"><p><b>Your answer:</b> <span class="ra"></span></p><p><b>Best answer:</b> <span class="rb"></span></p><p class="rw"></p></div></details>';
  }).join('');

  $('results-content').innerHTML =
    '<div class="score-row"><div class="score-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div><div><h3>' + title + '</h3><p>' + sub + '</p></div></div>' +
    '<div class="stat-row"><div class="stat"><b>' + best + '/' + quiz.length + '</b><span>Best answers</span></div><div class="stat"><b>' + points + '/' + max + '</b><span>Points</span></div><div class="stat"><b>' + bestStreak + '</b><span>Longest streak</span></div>' + (settings.time ? '<div class="stat"><b>' + results.filter(r => r.chosen.timeout).length + '</b><span>Timed out</span></div>' : '') + '</div>' +
    '<h3 class="results-sub">How you did by topic</h3>' + rows +
    '<div class="next-read"><strong>Read this next</strong><p>' + (pct >= 85 ? 'To keep growing, explore ' : 'Start with ') + AREAS[weakest].name + (pct >= 85 ? ', your lowest topic.' : '. It is where a small change will help most.') + '</p><a class="quiz-button" href="' + AREAS[weakest].link + '">Read: ' + AREAS[weakest].name + '</a></div>' +
    '<h3 class="results-sub">Review your answers</h3>' + review;

  document.querySelectorAll('.review-item').forEach((el, n) => {
    const r = results[n];
    el.querySelector('.rq').textContent = (n + 1) + '. ' + (r.q.type === 's' ? r.q.text : 'Myth or fact: ' + r.q.text);
    el.querySelector('.ra').textContent = r.chosen.t;
    el.querySelector('.rb').textContent = r.best.t;
    el.querySelector('.rw').textContent = r.q.why;
  });

  $('progress-fill').style.width = '100%';
  showSection('results-container');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => document.querySelectorAll('.area-track i').forEach(i => { i.style.width = i.dataset.w; }), 80);
}

// ---------- Events ----------
document.querySelectorAll('#count-chips .chip').forEach(c => c.addEventListener('click', () => { settings.count = +c.dataset.count; refreshSetup(); }));
document.querySelectorAll('#focus-chips .chip').forEach(c => c.addEventListener('click', () => { settings.focus = c.dataset.focus; refreshSetup(); }));
document.querySelectorAll('#time-chips .chip').forEach(c => c.addEventListener('click', () => { settings.time = +c.dataset.time; refreshSetup(); }));
$('start-quiz').addEventListener('click', startQuiz);
$('next-question').addEventListener('click', nextQuestion);
$('retry-quiz').addEventListener('click', startQuiz);
$('new-quiz').addEventListener('click', () => { clearTimer(); showSection('start-screen'); refreshSetup(); window.scrollTo({ top: 0 }); });
document.addEventListener('keydown', e => {
  if (!$('question-container').classList.contains('active') || locked) return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 4) { const b = document.querySelectorAll('.option-button')[n - 1]; if (b) b.click(); }
});
refreshSetup();
