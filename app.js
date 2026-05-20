// Venus Bleeds Dashboard — App Logic

// ── Toast ──
function toast(msg, duration = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// ── Copy to clipboard ──
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (btn) { btn.textContent = 'Copied'; btn.classList.add('copied'); setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800); }
    toast('Copied to clipboard');
  });
}

// ── Navigation ──
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  const link = document.querySelector('[data-page="' + pageId + '"]');
  if (page) page.classList.add('active');
  if (link) link.classList.add('active');
  localStorage.setItem('vb_lastPage', pageId);
}

// ── Pillar helpers ──
function getPillar(id) { return VB_DATA.pillars.find(p => p.id === id); }
function pillarTag(id) {
  if (!id) return '';
  const p = getPillar(id);
  return `<span class="tag ${id}">P${p.number} ${p.name}</span>`;
}

function getWeekKey() {
  const d = new Date();
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return d.getFullYear() + '_w' + week;
}

// ────────────────────────────────────────────
// PAGE: THURSDAY REVIEW
// ────────────────────────────────────────────
async function initThursday() {
  await renderThursdayLatest();
  await renderThursdayHistory();
}

async function renderThursdayLatest() {
  const review = await ThursdayReviews.latest();
  const el = document.getElementById('thursday-latest');
  if (!review) return;

  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
      <div>
        <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--burgundy);margin-bottom:4px">Latest Review</div>
        <div style="font-family:'Archivo Black',sans-serif;font-size:16px">${review.date}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:11px;color:var(--text-dim)">Followers</div>
        <div style="font-family:'Archivo Black',sans-serif;font-size:22px;color:var(--text)">${Number(review.followers).toLocaleString()}</div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="stat-box"><div class="stat-num">${review.views}</div><div class="stat-label">Video Views</div></div>
      <div class="stat-box"><div class="stat-num">${review.likes}</div><div class="stat-label">Likes</div></div>
      <div class="stat-box"><div class="stat-num">${review.shares}</div><div class="stat-label">Shares</div></div>
      <div class="stat-box"><div class="stat-num">${review.searchPct}%</div><div class="stat-label">Search Traffic</div></div>
    </div>

    ${review.topPost ? `
    <div style="margin-bottom:16px">
      <div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-faint);margin-bottom:6px">Top Post</div>
      <div style="font-size:14px;color:var(--text);line-height:1.6">${review.topPost}</div>
    </div>` : ''}

    <div style="margin-bottom:16px">
      <div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-faint);margin-bottom:6px">Key Insight</div>
      <div style="font-size:14px;color:var(--text);line-height:1.6">${review.insight}</div>
    </div>

    <div>
      <div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-faint);margin-bottom:6px">Next Week's Focus</div>
      <div style="font-size:14px;color:var(--text);line-height:1.8">${review.nextWeek}</div>
    </div>
  `;
}

async function renderThursdayHistory() {
  const history = await ThursdayReviews.history();
  const el = document.getElementById('thursday-history');
  if (!history.length) {
    el.innerHTML = '<div style="color:var(--text-faint);font-size:13px">No previous reviews yet.</div>';
    return;
  }
  el.innerHTML = history.slice(1).map(r => `
    <div class="hook-item" style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12px;color:var(--text-dim);margin-bottom:2px">${r.date}</div>
          <div style="font-size:13px;color:var(--text)">${r.insight}</div>
        </div>
        <div style="text-align:right;flex-shrink:0;margin-left:16px">
          <div style="font-size:11px;color:var(--text-faint)">followers</div>
          <div style="font-family:'Archivo Black',sans-serif;font-size:15px">${Number(r.followers).toLocaleString()}</div>
        </div>
      </div>
    </div>`).join('');
}

// ────────────────────────────────────────────
// PAGE: DAILY CHECK-IN
// ────────────────────────────────────────────
async function initCheckin() {
  const today = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName = days[today.getDay()];
  const schedule = VB_DATA.weeklySchedule.find(d => d.day === todayName);
  const pillar = schedule && schedule.pillar ? getPillar(schedule.pillar) : null;
  const todayKey = today.toISOString().split('T')[0];

  document.getElementById('checkin-date').textContent =
    today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const todayPillarEl = document.getElementById('checkin-today-pillar');
  if (pillar) {
    todayPillarEl.innerHTML = `
      <div class="today-pillar-banner ${pillar.id}">
        <div class="pillar-banner-label" style="color:var(--${pillar.id})">Pillar ${pillar.number} — Today</div>
        <div class="pillar-banner-name" style="color:var(--${pillar.id})">${pillar.name}</div>
        <div class="pillar-banner-desc">${pillar.format}</div>
        <div class="pillar-banner-desc" style="margin-top:6px;opacity:0.6">${pillar.purpose}</div>
      </div>`;
  } else {
    todayPillarEl.innerHTML = `
      <div class="today-pillar-banner rest">
        <div class="pillar-banner-label" style="color:var(--text-faint)">Today</div>
        <div class="pillar-banner-name" style="color:var(--text-dim);font-size:20px">Rest Day</div>
        <div class="pillar-banner-desc">No post scheduled. Recharge.</div>
      </div>`;
  }

  // Load saved check-in
  const saved = await Checkins.get(todayKey);
  if (saved) {
    if (saved.mood) document.querySelectorAll('.mood-btn').forEach(b => { if (b.dataset.mood === saved.mood) b.classList.add('selected'); });
    if (saved.energy) document.getElementById('checkin-energy').value = saved.energy;
    if (saved.intention) document.getElementById('checkin-intention').value = saved.intention;
  }

  let saveTimer;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveCheckin, 800);
  }

  async function saveCheckin() {
    const mood = document.querySelector('.mood-btn.selected')?.dataset.mood || '';
    await Checkins.save(todayKey, {
      mood,
      energy: document.getElementById('checkin-energy').value,
      intention: document.getElementById('checkin-intention').value,
    });
  }

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      saveCheckin();
    });
  });

  ['checkin-energy','checkin-intention'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', scheduleSave);
  });

  // Rules
  document.getElementById('checkin-rules').innerHTML = VB_DATA.rules.map((r, i) => `
    <div class="rule-item"><span class="rule-num">${i + 1}</span><span>${r}</span></div>
  `).join('');
}

// ────────────────────────────────────────────
// PAGE: WEEK CALENDAR
// ────────────────────────────────────────────
async function initCalendar() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName = days[new Date().getDay()];
  const weekKey = getWeekKey();
  const checked = await CalendarChecks.get(weekKey);
  const calEl = document.getElementById('calendar-grid');

  calEl.innerHTML = VB_DATA.weeklySchedule.map(day => {
    const pillar = day.pillar ? getPillar(day.pillar) : null;
    const isToday = day.day === todayName;
    const isRest = !day.pillar;
    const isDone = checked[day.day] || false;

    return `
      <div class="cal-row ${isToday ? 'today' : ''} ${isRest ? 'rest' : ''}">
        <div class="cal-row-left">
          <div class="cal-day-name">${day.day}${isToday ? ' · today' : ''}</div>
          ${pillar ? `<div class="cal-pillar ${day.pillar}">P${pillar.number} — ${pillar.name}</div>` : '<div class="cal-pillar" style="color:var(--text-faint)">Rest</div>'}
          <div class="cal-note">${day.note}</div>
        </div>
        <div class="cal-row-right">
          ${!isRest ? `
            <label class="cal-check ${isDone ? 'done' : ''}" data-day="${day.day}">
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="calToggle('${day.day}', this)">
              ${isDone ? 'Posted' : 'Post'}
            </label>` : ''}
        </div>
      </div>`;
  }).join('');
}

async function calToggle(day, checkbox) {
  const weekKey = getWeekKey();
  await CalendarChecks.toggle(weekKey, day, checkbox.checked);
  const label = checkbox.closest('.cal-check');
  label.classList.toggle('done', checkbox.checked);
  label.childNodes[label.childNodes.length - 1].textContent = ' ' + (checkbox.checked ? 'Posted' : 'Mark posted');
  toast(checkbox.checked ? 'Marked as posted' : 'Unmarked');
}

// ────────────────────────────────────────────
// PAGE: HOOK LIBRARY
// ────────────────────────────────────────────
function initHooks() {
  renderHooks('p1');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderHooks(btn.dataset.tab);
    });
  });
}

function renderHooks(tab) {
  const el = document.getElementById('hooks-list');
  let html = '';

  if (tab === 'mechanics') {
    html += '<h3 style="margin-bottom:16px">Hook Mechanics</h3>';
    html += '<div style="font-size:13px;color:var(--text-dim);margin-bottom:20px;line-height:1.7">These are the structural formulas behind every hook. Use them to build new ideas, not just copy existing ones.</div>';
    VB_DATA.hookMechanics.forEach(m => {
      html += `
        <div class="hook-item" style="margin-bottom:8px">
          <div style="font-family:'Archivo Black',sans-serif;font-size:14px;color:var(--text);margin-bottom:6px">${m.name}</div>
          <div style="font-size:13px;color:var(--text-dim);margin-bottom:8px;line-height:1.6">${m.description}</div>
          <div style="font-size:12px;color:var(--text-faint);line-height:1.6;border-top:1px solid var(--border);padding-top:8px">e.g. ${m.example}</div>
        </div>`;
    });
  } else {
    const pillar = getPillar(tab);
    const titles = VB_DATA.onScreenTitles[tab] || [];
    const spoken = VB_DATA.spokenHooks[tab] || [];

    html += `
      <div class="card" style="border-left:3px solid ${pillar.color};margin-bottom:20px">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-faint);margin-bottom:4px">${pillar.format}</div>
        <div style="font-size:13px;color:var(--text-dim)">${pillar.purpose}</div>
      </div>`;

    if (titles.length) {
      html += '<h3 style="margin-bottom:12px">On-Screen Titles</h3>';
      html += '<div style="font-size:12px;color:var(--text-faint);margin-bottom:14px">3–5 words. All lowercase. Fades by second 4.</div>';
      titles.forEach(t => {
        html += `
          <div class="hook-item">
            <div class="hook-text">"${t}"</div>
            <div class="hook-meta"><span></span>
              <button class="btn-copy" onclick="copyText('${t.replace(/'/g,"\\'")}', this)">Copy</button>
            </div>
          </div>`;
      });
    }

    if (spoken.length) {
      html += '<h3 style="margin-bottom:12px;margin-top:28px">Spoken Hooks</h3>';
      html += '<div style="font-size:12px;color:var(--text-faint);margin-bottom:14px">First words out of your mouth. Start mid-sentence.</div>';
      spoken.forEach(h => {
        html += `
          <div class="hook-item">
            <div class="hook-text">${h}</div>
            <div class="hook-meta"><span></span>
              <button class="btn-copy" onclick="copyText(this.closest('.hook-item').querySelector('.hook-text').textContent, this)">Copy</button>
            </div>
          </div>`;
      });
    }

    if (!titles.length && !spoken.length) {
      html += `<div style="color:var(--text-faint);font-size:13px">No hooks saved for this pillar yet. Generate some in the Idea Bank.</div>`;
    }
  }

  el.innerHTML = html;
}

// ────────────────────────────────────────────
// PAGE: CAPTIONS
// ────────────────────────────────────────────
function initCaptions() {
  const el = document.getElementById('captions-list');
  let html = '';
  VB_DATA.captionFormulas.forEach(c => {
    html += `<div class="hook-item"><div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-faint);margin-bottom:6px">${c.type}</div><div class="hook-text">"${c.caption}"</div><div style="font-size:12px;color:var(--text-faint);margin:6px 0 8px">${c.hashtags}</div><div class="hook-meta"><span></span><button class="btn-copy" onclick="copyText('${c.caption} ${c.hashtags}', this)">Copy all</button></div></div>`;
  });
  html += '<hr class="divider"><h3>Hashtag Sets by Pillar</h3>';
  ['p1','p2','p3'].forEach(pid => {
    html += `<div class="hook-item"><div class="hook-meta" style="margin-bottom:0"><div>${pillarTag(pid)} <span style="font-size:13px;color:var(--text-dim);margin-left:8px">${VB_DATA.hashtagSets[pid]}</span></div><button class="btn-copy" onclick="copyText('${VB_DATA.hashtagSets[pid]}', this)">Copy</button></div></div>`;
  });
  html += '<hr class="divider"><h3>Caption Rule</h3><div class="card" style="margin-bottom:0"><div style="font-size:14px;color:var(--text-dim);line-height:1.7">Caption = second hook, not a summary. Never describe the video. Add a layer, a contradiction, or something that makes them need to watch again. Under 150 characters. Hashtags go IN the caption.</div></div>';
  el.innerHTML = html;
}

// ────────────────────────────────────────────
// PAGE: ANALYTICS
// ────────────────────────────────────────────
async function initAnalytics() {
  const followers = await Settings.get('followers', '26500');
  document.getElementById('analytics-followers-input').value = followers;
  updateFollowerDisplay(parseInt(followers));

  let saveTimer;
  document.getElementById('analytics-followers-input').addEventListener('input', e => {
    const val = parseInt(e.target.value) || 0;
    updateFollowerDisplay(val);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => Settings.set('followers', val), 800);
  });

  await renderPostLog();
}

function updateFollowerDisplay(count) {
  const goal = VB_DATA.brand.goal;
  document.getElementById('stat-followers').textContent = count.toLocaleString();
  document.getElementById('stat-goal').textContent = goal.toLocaleString();
  const pct = Math.min((count / goal) * 100, 100);
  document.getElementById('progress-fill').style.width = pct.toFixed(1) + '%';
  document.getElementById('progress-pct').textContent = pct.toFixed(1) + '%';
  document.getElementById('progress-remaining').textContent = Math.max(goal - count, 0).toLocaleString() + ' to go';
}

async function addPostLog() {
  const pillar = document.getElementById('log-pillar').value;
  const views = document.getElementById('log-views').value;
  if (!pillar || !views) { toast('Pillar and views are required'); return; }

  await PostLogs.add({
    date: new Date().toISOString().split('T')[0],
    pillar,
    views: parseInt(views) || 0,
    likes: parseInt(document.getElementById('log-likes').value) || 0,
    saves: parseInt(document.getElementById('log-saves').value) || 0,
    shares: parseInt(document.getElementById('log-shares').value) || 0,
    note: document.getElementById('log-note').value,
  });

  ['log-views','log-likes','log-saves','log-shares','log-note'].forEach(id => { document.getElementById(id).value = ''; });
  await renderPostLog();
  toast('Post logged');
}

async function deleteLog(id) {
  await PostLogs.remove(id);
  await renderPostLog();
}

async function renderPostLog() {
  const logs = await PostLogs.all();
  const el = document.getElementById('post-log-list');
  if (!logs.length) {
    el.innerHTML = '<div style="color:var(--text-faint);font-size:13px;padding:12px 0">No posts logged yet.</div>';
    document.getElementById('stat-posts').textContent = '0';
    document.getElementById('stat-best-views').textContent = '—';
    document.getElementById('stat-avg-views').textContent = '—';
    return;
  }
  document.getElementById('stat-posts').textContent = logs.length;
  const views = logs.map(l => l.views);
  document.getElementById('stat-best-views').textContent = Math.max(...views).toLocaleString();
  document.getElementById('stat-avg-views').textContent = Math.round(views.reduce((a,b) => a+b,0) / views.length).toLocaleString();
  el.innerHTML = logs.map(l => `
    <div class="hook-item">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>${pillarTag(l.pillar)} <span style="font-size:11px;color:var(--text-faint);margin-left:8px">${l.date}</span></div>
        <button class="btn-ghost btn-sm" onclick="deleteLog(${l.id})">Delete</button>
      </div>
      <div style="display:flex;gap:20px;font-size:13px;color:var(--text-dim)">
        <span><strong style="color:var(--text)">${l.views.toLocaleString()}</strong> views</span>
        <span><strong style="color:var(--text)">${l.likes.toLocaleString()}</strong> likes</span>
        <span><strong style="color:var(--text)">${l.saves.toLocaleString()}</strong> saves</span>
        <span><strong style="color:var(--text)">${l.shares.toLocaleString()}</strong> shares</span>
      </div>
      ${l.note ? `<div style="font-size:12px;color:var(--text-faint);margin-top:6px">${l.note}</div>` : ''}
    </div>`).join('');
}

// ────────────────────────────────────────────
// PAGE: COMPETITORS
// ────────────────────────────────────────────
async function initCompetitors() {
  await renderCompetitors();
}

async function addCompetitor() {
  const handle = document.getElementById('comp-handle').value.trim();
  const why = document.getElementById('comp-why').value.trim();
  if (!handle) { toast('Handle is required'); return; }
  await Competitors.add(handle, why);
  document.getElementById('comp-handle').value = '';
  document.getElementById('comp-why').value = '';
  await renderCompetitors();
  toast('Competitor added');
}

async function addCompLog(id) {
  const input = document.getElementById('complog-' + id);
  const note = input.value.trim();
  if (!note) return;
  await Competitors.addLog(id, note);
  input.value = '';
  await renderCompetitors();
}

async function deleteCompetitor(id) {
  await Competitors.remove(id);
  await renderCompetitors();
  toast('Removed');
}

async function renderCompetitors() {
  const comps = await Competitors.all();
  const el = document.getElementById('competitors-list');
  if (!comps.length) {
    el.innerHTML = '<div style="color:var(--text-faint);font-size:13px;padding:12px 0">No competitors tracked yet.</div>';
    return;
  }
  el.innerHTML = comps.map(c => `
    <div class="competitor-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div class="competitor-handle">${c.handle}</div>
          ${c.why ? `<div class="competitor-note">${c.why}</div>` : ''}
        </div>
        <button class="btn-ghost btn-sm" onclick="deleteCompetitor(${c.id})">Remove</button>
      </div>
      <div class="competitor-log">
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <input id="complog-${c.id}" type="text" placeholder="Log an observation...">
          <button class="btn btn-sm" onclick="addCompLog(${c.id})" style="white-space:nowrap">Add note</button>
        </div>
        ${c.logs.map(l => `<div class="log-entry"><div class="log-date">${l.date}</div>${l.note}</div>`).join('')}
        ${!c.logs.length ? '<div style="color:var(--text-faint);font-size:12px">No notes yet.</div>' : ''}
      </div>
    </div>`).join('');
}

// ────────────────────────────────────────────
// PAGE: SAVED IDEAS (Idea Bank)
// ────────────────────────────────────────────
async function initIdeas() {
  await renderSavedIdeas();
}

async function saveNewIdea() {
  const pillar = document.getElementById('idea-pillar').value;
  const text = document.getElementById('idea-text').value.trim();
  if (!text) { toast('Paste an idea first'); return; }
  await SavedIdeas.add(pillar, text);
  document.getElementById('idea-text').value = '';
  await renderSavedIdeas();
  toast('Idea saved');
}

async function deleteSavedIdea(id) {
  await SavedIdeas.remove(id);
  await renderSavedIdeas();
}

async function renderSavedIdeas() {
  const ideas = await SavedIdeas.all();
  const el = document.getElementById('saved-ideas-list');
  if (!ideas.length) {
    el.innerHTML = '<div style="color:var(--text-faint);font-size:13px">No saved ideas yet.</div>';
    return;
  }
  el.innerHTML = ideas.map(idea => {
    const firstLine = idea.text.split('\n')[0] || '';
    return `
      <div class="hook-item">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <div>${pillarTag(idea.pillar)} <span style="font-size:11px;color:var(--text-faint);margin-left:8px">${idea.date}</span></div>
          <button class="btn-ghost btn-sm" onclick="deleteSavedIdea(${idea.id})">Delete</button>
        </div>
        <div class="hook-text" style="font-size:13px">${firstLine}</div>
        ${idea.text.split('\n').length > 1 ? `<details style="margin-top:8px"><summary style="font-size:11px;color:var(--text-faint);cursor:pointer">Full idea</summary><pre style="font-size:12px;color:var(--text-dim);margin-top:8px;white-space:pre-wrap;line-height:1.6">${idea.text}</pre></details>` : ''}
      </div>`;
  }).join('');
}

// ────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navigate(link.dataset.page));
  });

  // Pillars page (static)
  document.getElementById('pillars-detail').innerHTML = VB_DATA.pillars.map(p => `
    <div class="card" style="border-left:3px solid ${p.color};margin-bottom:16px">
      <div class="pillar-num" style="color:${p.color}">Pillar ${p.number}</div>
      <div class="pillar-name" style="font-size:20px;margin-bottom:12px">${p.name}</div>
      <div class="grid-2">
        <div>
          <div style="margin-bottom:10px"><label>Format</label><div style="font-size:13px;color:var(--text-dim)">${p.format}</div></div>
          <div style="margin-bottom:10px"><label>Purpose</label><div style="font-size:13px;color:var(--text-dim)">${p.purpose}</div></div>
          <div style="margin-bottom:10px"><label>Sound</label><div style="font-size:13px;color:var(--text-dim)">${p.sound}</div></div>
        </div>
        <div>
          <div style="margin-bottom:10px"><label>Mechanics</label><div style="font-size:13px;color:var(--text-dim)">${p.mechanics}</div></div>
          <div style="margin-bottom:10px"><label>On-screen text</label><div style="font-size:13px;color:var(--text-dim)">${p.textRule}</div></div>
          <div><label>Hashtags</label><div>${p.hashtags.map(h => `<span class="tag">${h}</span>`).join('')}</div></div>
        </div>
      </div>
    </div>`).join('');

  document.getElementById('donts-list').innerHTML = VB_DATA.donts.map(d =>
    `<div class="rule-item"><span class="rule-num">✗</span><span style="color:var(--text-dim)">${d}</span></div>`
  ).join('');

  // Init all pages in parallel
  await Promise.all([
    initThursday(),
    initCheckin(),
    initCalendar(),
    initAnalytics(),
    initCompetitors(),
    initIdeas(),
  ]);

  initHooks();
  initCaptions();

  const last = localStorage.getItem('vb_lastPage') || 'checkin';
  navigate(last);
});
