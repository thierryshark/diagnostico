# Gera cantos-origem.json: lista de trocas de canto na origem (seletor + valor declarado + ordem -> valor final).
# Base: medicao no navegador em 20 paginas (computador e celular) com a mesma regra do corretor antigo
# (ate 30 px de altura = 6, ate 64 = 10, acima = no maximo 16, circulos ficam). Sem dado: regra de bolso abaixo.
import re,json,collections
occ=json.load(open('/home/claude/v19/cantos-origem/occ.json'))
css=open('/home/claude/v19/dist/site.css',encoding='utf-8').read()
plano={int(k):v for k,v in json.load(open('/home/claude/v19/cantos-origem/plano.json')).items()}
def maxv(v):
    px=[float(x[:-2]) for x in re.findall(r'[\d.]+px',v)]
    return 999 if '%' in v else (max(px) if px else 0)
PSEUDO=re.compile(r'::?(before|after|placeholder|backdrop|marker|-webkit-|-moz-)')
CIRC=re.compile(r'(dot|bullet|\bav\b|avatar|ring|pulse|knob|thumb|radio|switch|spinner|loader|\.live i)')
ETIQ=re.compile(r'(badge|-off\b|\.off\b|-low\b|seal|pill|chips li|\btag\b|label|small\b|\.tg\b|discount|stock)')
saida=[]; ordem=collections.Counter(); stats=collections.Counter()
for o in occ:
    k=o['k']; val=o['val']; sel=o['sel']; chave=sel+'¦'+val
    n=ordem[chave]; ordem[chave]+=1
    r=maxv(val)
    if r<=10: continue
    novo=None
    if k in plano:
        d,m=plano[k]
        vals=[x for x in (d,m) if x not in ('-','k')]
        if vals and not (k==510): novo=vals[0]; stats['medido']+=1
    elif k in (0,382,123,301,352): pass
    elif not PSEUDO.search(sel) and '%' not in val:
        fim=css.find('}',o['fim']); ini=css.rfind('{',0,o['ini']); corpo=css[ini:fim]
        w=re.search(r'(?:^|[;{])width:(\d+)px',corpo); h=re.search(r'(?:^|[;{])height:(\d+)px',corpo)
        circ=bool(CIRC.search(sel)) or (w and h and w.group(1)==h.group(1) and int(w.group(1))<=64)
        if circ: stats['circulo']+=1
        elif r>=99: novo='6' if ETIQ.search(sel) else '10'; stats['bolso'+novo]+=1
        elif r>16: novo='16'; stats['bolso16']+=1
    if novo: saida.append({'s':sel,'v':val,'n':n,'t':novo})
json.dump(saida,open('/home/claude/v19/cantos-origem.json','w'),ensure_ascii=False,indent=0)
print(len(saida),dict(stats))
