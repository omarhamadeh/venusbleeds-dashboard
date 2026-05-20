# Venus Bleeds Dashboard — Project Context

## What this is
A daily content dashboard for @venusbleeds (Omar), a queer Lebanese musician based in Paris. Built to manage TikTok growth toward 100K followers. The full brand brief is in `venusbleeds-developer-handoff.md` (in ~/Downloads).

## Stack
- Pure HTML/CSS/JS (no framework, no build step)
- Supabase for data persistence (cross-device sync)
- Hosted on Netlify, code on GitHub
- Live URL: aquamarine-lollipop-c9b099.netlify.app
- GitHub: github.com/omarhamadeh/venusbleeds-dashboard

## Supabase
- Project URL: https://rsgmqwlqytxednsdzlmu.supabase.co
- Publishable key: sb_publishable_aw38zg2iVrLmw4_GK4mjDw_opX8PYAP
- RLS disabled (personal tool)
- Tables: checkins, post_logs, competitors, competitor_logs, saved_ideas, calendar_checks, settings

## Key files
- `index.html` — structure + nav (8 pages)
- `styles.css` — Venus Bleeds dark theme, mobile-first
- `data.js` — all static content (hooks, captions, pillars, rules)
- `db.js` — Supabase client + all data operations
- `app.js` — all page logic

## Pages
1. Daily Check-In — mood, energy, yesterday's post
2. Thursday Review — weekly analytics from Chrome MCP, auto-updated by Claude
3. Week Calendar — vertical layout, check off posts as done
4. Idea Bank — paste and save ideas from Claude chat
5. Hook Library — searchable, copy-ready
6. Captions — caption formulas + hashtag sets
7. Analytics — follower tracker, 100K progress
8. Competitors — manual tracking + notes
9. Pillars — full pillar specs

## Thursday workflow
Every Thursday: user opens TikTok Studio in Chrome, comes to Claude Code, says "Thursday review". Claude uses Chrome MCP to read analytics, analyzes data, saves review to Supabase (settings table, keys: thursday_latest, thursday_history), updates follower count.

## Deploying updates
```bash
cd /Users/omarhamadeh/Desktop/venusbleeds-dashboard
git add [files]
git commit -m "description"
git push
```
Netlify auto-deploys on push. No manual steps.

## Current state
See HANDOVER.md for latest session summary.
