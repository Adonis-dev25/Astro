const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (!backToTopButton) return;
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
const revealSections = () => {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 150) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (this.dataset.failed) return;
        this.dataset.failed = '1';
        this.src = '/api/placeholder/' + (this.width || 800) + '/' + (this.height || 450);
        this.alt = 'Image placeholder';
    });
});

/* =====================================================================
   SITE FEATURES: dark mode, reading progress, learning journey,
   tip of the day, quick checks, Get Help links
   ===================================================================== */
(function () {
    const $ = (s, r) => (r || document).querySelector(s);
    const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } };
    const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

    const homeLink = Array.from(document.querySelectorAll('.nav-menu a')).find(a => a.textContent.trim() === 'Home');
    const base = homeLink ? homeLink.getAttribute('href').replace(/index\.html.*$/, '') : '';
    const slug = location.pathname.split('/').pop().replace('.html', '');

    const TOPICS = {
        'understanding':     ['Understanding Love', 'pages/understanding.html'],
        'communication':     ['Communication', 'pages/communication.html'],
        'trust-loyalty':     ['Trust and Loyalty', 'pages/trust-loyalty.html'],
        'emotional-support': ['Emotional Support', 'pages/emotional-support.html'],
        'boundaries':        ['Healthy Boundaries', 'pages/boundaries.html'],
        'goals':             ['Relationship Goals', 'pages/goals.html']
    };

    /* ---- favicon and browser colour ---- */
    if (!$('link[rel="icon"]')) {
        const l = document.createElement('link');
        l.rel = 'icon';
        l.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23FF4500'/%3E%3Cpath d='M50 76 28 54a14 14 0 0 1 22-17 14 14 0 0 1 22 17z' fill='white'/%3E%3C/svg%3E";
        document.head.appendChild(l);
    }
    if (!$('meta[name="theme-color"]')) {
        const m = document.createElement('meta'); m.name = 'theme-color'; m.content = '#FF4500'; document.head.appendChild(m);
    }

    /* ---- dark mode (off by default, remembered once chosen) ---- */
    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        const b = $('.theme-toggle');
        if (b) { b.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); }
    }
    const header = $('.header-content');
    if (header && !$('.theme-toggle')) {
        const b = document.createElement('button');
        b.className = 'theme-toggle'; b.type = 'button';
        const nt = $('.nav-toggle', header);
        nt ? nt.insertAdjacentElement('beforebegin', b) : header.appendChild(b);
        b.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            set('astro-theme', next); applyTheme(next);
        });
    }
    applyTheme(get('astro-theme', 'light'));

    /* ---- Get Help links in menu and footer ---- */
    const helpHref = base + 'pages/help.html';
    const nav = $('.nav-menu');
    if (nav && !$('a[data-help]', nav)) {
        const a = document.createElement('a'); a.href = helpHref; a.textContent = 'Get Help'; a.setAttribute('data-help', '1'); nav.appendChild(a);
    }
    const priv = $('.footer a[href$="privacy.html"]');
    if (priv && priv.parentElement && !$('.footer a[data-help]')) {
        const p = document.createElement('p');
        p.innerHTML = '<a data-help="1" href="' + helpHref + '" style="color: white; text-decoration: none;">Get Help</a>';
        priv.parentElement.insertAdjacentElement('beforebegin', p);
    }

    /* ---- reading progress bar + mark topic as read ---- */
    const bar = document.createElement('div');
    bar.className = 'read-progress'; document.body.appendChild(bar);
    let marked = false;
    function toast(msg) {
        const t = document.createElement('div'); t.className = 'astro-toast'; t.innerHTML = msg; document.body.appendChild(t);
        setTimeout(() => t.classList.add('show'), 30);
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
    }
    function onScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.width = (p * 100) + '%';
        if (!marked && TOPICS[slug] && p > 0.8) {
            marked = true;
            const read = get('astro-read', []);
            if (read.indexOf(slug) === -1) {
                read.push(slug); set('astro-read', read);
                toast('<i class="fas fa-circle-check"></i> Topic complete! ' + read.length + ' of ' + Object.keys(TOPICS).length + ' read');
            }
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    /* ---- home page: learning journey + tip of the day ---- */
    const TIPS = [
        'Listen to understand, not just to reply.', 'Say thank you for the small things every day.',
        'Pause for a breath before you answer when you are upset.', 'Start hard talks with "I feel", not "You always".',
        'Trust grows when your words and actions match.', 'A good apology names what you did and does not make excuses.',
        'It is okay to need time alone. Say so kindly.', 'Ask "How can I support you?" instead of guessing.',
        'Respect a "no" the first time you hear it.', 'Celebrate your partner\'s wins as much as your own.',
        'Real love lets you keep your friends and your dreams.', 'Write down one shared goal and one small step toward it.',
        'Do not argue over text. Talk in person or call.', 'Be curious about how your partner sees things.',
        'Rest and good sleep make kindness easier.', 'Check in weekly: what went well, what could be better?',
        'Privacy is not secrecy. Everyone deserves some of it.', 'Anger is a signal, not a license to hurt someone.',
        'Compliment effort, not just results.', 'If you feel unsafe, tell a trusted adult or call 116 or 933.',
        'Forgive when you can, but keep your boundaries.'
    ];
    const grid = $('.topics-grid');
    if (grid) {
        const read = get('astro-read', []), quiz = get('astro-quiz', null), total = Object.keys(TOPICS).length;
        const next = Object.keys(TOPICS).find(k => read.indexOf(k) === -1);
        const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const panel = document.createElement('section');
        panel.className = 'journey';
        panel.innerHTML =
            '<div class="journey-main"><h2><i class="fas fa-route"></i> Your Learning Journey</h2>' +
            '<div class="journey-track"><i style="width:' + Math.round(read.length / total * 100) + '%"></i></div>' +
            '<p class="journey-meta">' + read.length + ' of ' + total + ' topics read' +
            (quiz ? ' &middot; Best quiz score ' + quiz.best + '%' : ' &middot; Quiz not taken yet') + '</p>' +
            '<div class="journey-actions">' +
            (next ? '<a class="topic-link" href="' + base + TOPICS[next][1] + '">' + (read.length ? 'Continue: ' : 'Start: ') + TOPICS[next][0] + ' <i class="fas fa-arrow-right"></i></a>'
                  : '<span class="journey-done"><i class="fas fa-trophy"></i> All topics read!</span>') +
            '<a class="journey-link" href="' + base + 'components/quiz.html">' + (quiz ? 'Retake quiz' : 'Take the quiz') + '</a></div></div>' +
            '<div class="tip-card"><h3><i class="fas fa-lightbulb"></i> Tip of the day</h3><p>' + TIPS[day % TIPS.length] + '</p></div>';
        grid.insertAdjacentElement('beforebegin', panel);
        grid.querySelectorAll('.topic-card').forEach(card => {
            const a = $('.topic-link', card); if (!a) return;
            const s = a.getAttribute('href').split('/').pop().replace('.html', '');
            if (read.indexOf(s) !== -1) {
                const img = $('.topic-image', card);
                if (img) img.insertAdjacentHTML('beforeend', '<span class="read-badge"><i class="fas fa-check"></i> Read</span>');
            }
        });
    }

    /* ---- quick check at the end of each topic page ---- */
    const CHECKS = {
        'understanding': [['Love is only a feeling of butterflies.', false, 'Feelings rise and fall. Lasting love is also made of choices, respect and effort.'], ['Kindness and respect in everyday moments are signs of real love.', true, 'Daily respect shows more about love than big gestures do.']],
        'communication': [['Listening to understand matters more than winning an argument.', true, 'Feeling heard calms most conflicts faster than any clever reply.'], ['If someone loves you, they should know what you think without being told.', false, 'Nobody can read minds. Clear, kind words prevent many hurts.']],
        'trust-loyalty': [['Small lies do not affect trust.', false, 'Small lies teach people that your word is negotiable, and trust wears away.'], ['Matching your words and actions builds trust over time.', true, 'Reliability in small things is how trust is built.']],
        'emotional-support': [['Supporting someone means solving all their problems.', false, 'Presence and listening help more than taking over. Ask what they need.'], ['Asking "What do you need right now?" is a helpful way to support someone.', true, 'It avoids guessing and shows you care about their needs.']],
        'boundaries': [['Saying no to something means you do not care about your partner.', false, 'Boundaries make love safer. They tell your partner how to love you well.'], ['A partner who respects you accepts your "no" the first time.', true, 'Respect for limits is basic. Pressure after a no is a warning sign.']],
        'goals': [['Couples should give up personal goals for the relationship.', false, 'Strong couples support each other\'s own dreams as well as shared ones.'], ['Small steps and regular check-ins help shared goals succeed.', true, 'Breaking goals into steps keeps them doable in busy weeks.']]
    };
    const items = CHECKS[slug], host = $('.topic-sections');
    if (items && host) {
        const sec = document.createElement('section');
        sec.className = 'content-section quick-check';
        sec.innerHTML = '<h2><i class="fas fa-brain"></i> Quick Check: Myth or Fact?</h2><div class="qc-list"></div><p class="qc-score"></p>';
        const list = $('.qc-list', sec); let answered = 0, right = 0;
        items.forEach(([text, ans, why]) => {
            const row = document.createElement('div'); row.className = 'qc-item';
            row.innerHTML = '<p class="qc-text"></p><div class="qc-btns"><button type="button" data-v="1">Fact</button><button type="button" data-v="0">Myth</button></div><p class="qc-why"></p>';
            $('.qc-text', row).textContent = text;
            row.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
                if (row.dataset.done) return; row.dataset.done = '1';
                const ok = (btn.dataset.v === '1') === ans;
                btn.classList.add(ok ? 'ok' : 'no'); row.querySelectorAll('button').forEach(b => b.disabled = true);
                const w = $('.qc-why', row); w.textContent = (ok ? 'Correct! ' : 'Not quite. ') + why; w.className = 'qc-why show ' + (ok ? 'ok' : 'no');
                answered++; if (ok) right++;
                if (answered === items.length) {
                    $('.qc-score', sec).innerHTML = 'You got ' + right + ' of ' + items.length + '. <a href="' + base + 'components/quiz.html">Test yourself with the full quiz</a>';
                    const c = get('astro-checks', {}); c[slug] = right; set('astro-checks', c);
                }
            }));
            list.appendChild(row);
        });
        const before = $('.topic-cta', host) || $('.pn', host);
        before ? host.insertBefore(sec, before) : host.appendChild(sec);
    }
})();
