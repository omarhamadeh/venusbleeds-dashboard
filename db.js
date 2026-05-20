// Venus Bleeds — Supabase client + all data operations

const SUPABASE_URL = 'https://rsgmqwlqytxednsdzlmu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_aw38zg2iVrLmw4_GK4mjDw_opX8PYAP';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Checkins ──
const Checkins = {
  async get(date) {
    const { data } = await db.from('checkins').select('*').eq('date', date).maybeSingle();
    return data;
  },
  async save(date, fields) {
    await db.from('checkins').upsert({ date, ...fields }, { onConflict: 'date' });
  },
};

// ── Post logs ──
const PostLogs = {
  async all() {
    const { data } = await db.from('post_logs').select('*').order('created_at', { ascending: false });
    return data || [];
  },
  async add(entry) {
    const { data } = await db.from('post_logs').insert(entry).select().single();
    return data;
  },
  async remove(id) {
    await db.from('post_logs').delete().eq('id', id);
  },
};

// ── Competitors ──
const Competitors = {
  async all() {
    const { data: comps } = await db.from('competitors').select('*').order('created_at', { ascending: true });
    if (!comps || !comps.length) return [];
    const { data: logs } = await db.from('competitor_logs').select('*').order('created_at', { ascending: false });
    return comps.map(c => ({ ...c, logs: (logs || []).filter(l => l.competitor_id === c.id) }));
  },
  async add(handle, why) {
    const { data } = await db.from('competitors').insert({ handle, why }).select().single();
    return data;
  },
  async remove(id) {
    await db.from('competitors').delete().eq('id', id);
  },
  async addLog(competitor_id, note) {
    const date = new Date().toISOString().split('T')[0];
    await db.from('competitor_logs').insert({ competitor_id, date, note });
  },
};

// ── Saved ideas ──
const SavedIdeas = {
  async all() {
    const { data } = await db.from('saved_ideas').select('*').order('created_at', { ascending: false });
    return data || [];
  },
  async add(pillar, text) {
    const date = new Date().toISOString().split('T')[0];
    const { data } = await db.from('saved_ideas').insert({ date, pillar, text }).select().single();
    return data;
  },
  async remove(id) {
    await db.from('saved_ideas').delete().eq('id', id);
  },
};

// ── Calendar checks ──
const CalendarChecks = {
  async get(weekKey) {
    const { data } = await db.from('calendar_checks').select('*').eq('week_key', weekKey);
    const map = {};
    (data || []).forEach(r => { map[r.day] = r.checked; });
    return map;
  },
  async toggle(weekKey, day, checked) {
    await db.from('calendar_checks').upsert({ week_key: weekKey, day, checked }, { onConflict: 'week_key,day' });
  },
};

// ── Settings ──
const Settings = {
  async get(key, fallback = null) {
    const { data } = await db.from('settings').select('value').eq('key', key).maybeSingle();
    return data ? data.value : fallback;
  },
  async set(key, value) {
    await db.from('settings').upsert({ key, value: String(value) }, { onConflict: 'key' });
  },
};
