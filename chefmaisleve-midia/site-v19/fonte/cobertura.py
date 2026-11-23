# Le o resultado da varredura (cov.json) + mapa do pacote de cobertura e resume o uso por modulo e por tipo de pagina.
import json, collections, sys
K = json.load(open('cov.json'))
M = json.load(open('dist-cov/mapa.json'))
pages = K['pages']
def parse(r):
    s = set()
    if not r: return s
    for part in r.split(','):
        if '-' in part:
            a, b = part.split('-'); s.update(range(int(a), int(b) + 1))
        elif part: s.add(int(part))
    return s
GR = {'template-home': 'home', 'template-category': 'cat', 'template-product': 'prod', 'template-cart': 'cart', 'template-page': 'page', 'template-search': 'busca', 'template-blog': 'blog', 'template-blog-post': 'post', 'template-contact': 'contato', 'template-404': '404'}
def grupo(p):
    t = p.get('tpl') or '?'
    if t.startswith('template-account'): return 'conta'
    return GR.get(t, t.replace('template-', ''))
ex = collections.defaultdict(set)   # grupo -> ids executados (antes dos cliques)
exAll = set(); exClick = set()
porPag = {}
for p in pages:
    e1 = parse(p.get('e1')); e2 = parse(p.get('e2')) if not p.get('nav') else set()
    g = grupo(p); ex[g] |= e1; exAll |= e1 | e2; exClick |= (e2 - e1)
    porPag[p['p'] + '@' + str(p['w'])] = e1 | e2
grupos = ['home', 'cat', 'prod', 'cart', 'page', 'busca', 'blog', 'post', 'contato', 'conta', '404']
tam = M['fnTam']
rows = []
for m in M['mods']:
    ids = range(m['fn0'], m['fn1']); n = len(ids)
    inner = [i for i in ids][1:] if n > 1 else []
    usados = [i for i in ids if i in exAll]
    por = {g: sum(1 for i in inner if i in ex[g]) for g in grupos}
    rows.append({'id': m['id'], 'nome': m['nome'], 'kb': m['min'] / 1024, 'fn': n, 'usadas': len(usados), 'por': por, 'clique': sum(1 for i in ids if i in exClick and all(i not in ex[g] for g in grupos))})
json.dump(rows, open('cobertura.json', 'w'))
modo = sys.argv[1] if len(sys.argv) > 1 else 'resumo'
if modo == 'resumo':
    print('paginas', len(pages), '| funcoes', M['nFn'], '| executadas em algum lugar', len(exAll), '| so com clique', len(exClick - set().union(*ex.values())))
    print('erros:', [(p['p'], p['w'], p.get('fail') or p.get('err')) for p in pages if p.get('fail') or p.get('err')][:12])
    print('4xx:', sorted(set(x for p in pages for x in (p.get('res') or [])))[:15])
    print('vazamento lateral (celular):', [(p['p'], p.get('sw')) for p in pages if p['w'] == 390 and (p.get('sw') or 0) > 392])
    print('navegou durante cliques:', sum(1 for p in pages if p.get('nav')), 'de', len(pages))
    print('\nMODULOS (KB, funcoes usadas/total, funcoes internas ativas por tipo de pagina)')
    print('id'.ljust(18), 'KB'.rjust(5), 'uso'.rjust(8), ' '.join(g[:5].rjust(5) for g in grupos), ' nome')
    for r in sorted(rows, key=lambda r: -r['kb']):
        if r['kb'] < 1.5: continue
        print(r['id'].ljust(18), ('%.0f' % r['kb']).rjust(5), ('%d/%d' % (r['usadas'], r['fn'])).rjust(8), ' '.join(str(r['por'][g]).rjust(5) for g in grupos), ' ' + r['nome'][:60])
    mortos = [r for r in rows if r['usadas'] <= 1 and r['fn'] > 1]
    print('\nSEM NENHUMA FUNCAO INTERNA EXECUTADA:', sum(r['kb'] for r in mortos).__round__(), 'KB')
    for r in sorted(mortos, key=lambda r: -r['kb']): print(' ', r['id'].ljust(18), ('%.1f' % r['kb']).rjust(6), 'KB', r['fn'], 'fn |', r['nome'][:90])
