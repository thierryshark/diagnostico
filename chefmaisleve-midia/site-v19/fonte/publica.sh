#!/bin/bash
# copia dist (visual, comportamento e fontes) para o repo, publica e imprime o codigo curto da versao
set -e
cd /home/claude/sitenovo/repo
D=chefmaisleve-midia/site-v19
mkdir -p $D/fontes
rm -f $D/pack*.js
cp /home/claude/v19/dist/site.css /home/claude/v19/dist/pack*.js /home/claude/v19/dist/cedo.js $D/
cp /home/claude/v19/fontes/*.woff2 $D/fontes/
git add -A $D
git commit -qm "v19: ${1:-ajuste}

Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_015GUuQb5MGz8x6VVVHjXhQt"
git push -q
git rev-parse --short=7 HEAD
