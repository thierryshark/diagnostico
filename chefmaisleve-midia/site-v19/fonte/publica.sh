#!/bin/bash
# copia dist para o repo, publica e imprime o hash curto
set -e
cd /home/claude/sitenovo/repo
cp /home/claude/v19/dist/site.css /home/claude/v19/dist/pack.js chefmaisleve-midia/site-v19/
git add -A chefmaisleve-midia/site-v19
git commit -qm "v19: ${1:-ajuste}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_015GUuQb5MGz8x6VVVHjXhQt"
git push -q
git rev-parse --short=7 HEAD
