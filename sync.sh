#!/bin/bash
# Auto-push Venus Bleeds dashboard to GitHub after every handover
cd /Users/omarhamadeh/Desktop/venusbleeds-dashboard
git add .
git commit -m "auto-sync $(date '+%Y-%m-%d %H:%M')"
git push
echo "✅ Pushed to GitHub"
