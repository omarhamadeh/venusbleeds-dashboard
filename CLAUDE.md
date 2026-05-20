# Venus Bleeds Dashboard — Project Context

## FIRST THING TO DO IN EVERY SESSION
1. Read the most recent file in the `handovers/` folder (sorted by date, take the latest)
2. Summarize what was last worked on in one line so the user knows you're up to speed
3. Ask what they want to work on today

## CONTEXT MANAGEMENT
When this conversation feels long (many tool calls, many topics covered), proactively say:
"We're getting close to context limit. Let me create a handover before we continue."
Then create a new dated file in `handovers/YYYY-MM-DD.md` with full session summary before proceeding.

The user can also say "wrap up" at any time — immediately create the handover file and push it to GitHub.

## What this project is
A daily content dashboard for @venusbleeds (Omar), a queer Lebanese musician based in Paris.
Managing TikTok growth toward 100K followers.
Full brand brief: ~/Downloads/venusbleeds-developer-handoff.md

## Stack
- Pure HTML/CSS/JS (no framework, no build step)
- Supabase for cross-device data sync
- Netlify for hosting (auto-deploys on GitHub push)
- Live URL: aquamarine-lollipop-c9b099.netlify.app
- GitHub: github.com/omarhamadeh/venusbleeds-dashboard

## Supabase
- URL: https://rsgmqwlqytxednsdzlmu.supabase.co
- Key: sb_publishable_aw38zg2iVrLmw4_GK4mjDw_opX8PYAP
- RLS disabled (personal tool)
- Tables: checkins, post_logs, competitors, competitor_logs, saved_ideas, calendar_checks, settings

## Key files
- `index.html` — structure + nav (9 pages)
- `styles.css` — Venus Bleeds dark theme, mobile-first bottom nav
- `data.js` — all static content (hooks, captions, pillars, rules)
- `db.js` — Supabase client + all data operations (Checkins, PostLogs, Competitors, SavedIdeas, CalendarChecks, Settings, ThursdayReviews)
- `app.js` — all page logic

## Pages
1. Daily Check-In
2. Thursday Review (Chrome MCP analytics workflow)
3. Week Calendar (vertical layout)
4. Idea Bank
5. Hook Library
6. Captions
7. Analytics
8. Competitors
9. Pillars

## Thursday workflow
User says "Thursday review" → Claude uses Chrome MCP to navigate TikTok Studio analytics → reads data → analyzes → saves review to Supabase (settings keys: thursday_latest, thursday_history) → updates follower count → pushes any code changes to GitHub.

## Deploying updates
```bash
cd /Users/omarhamadeh/Desktop/venusbleeds-dashboard
git add [files]
git commit -m "description"
git push
```

## About Omar
Complete beginner with code. Works on iPhone + Mac. Claude Pro subscriber — no extra paid services unless clearly justified. Wants things simple. Mobile experience is critical. Dashboard should feel like a professional music/creator tool — dark, editorial, not cheerful.
