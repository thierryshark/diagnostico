import re,json,collections
occ=json.load(open('/home/claude/v19/cantos-origem/occ.json'))
css=open('/home/claude/v19/dist/site.css',encoding='utf-8').read()
limpas={}
for t in open('/home/claude/v19/cantos-origem/limpas.txt').read().split():
    k,d,m=t.split('_'); limpas[int(k)]=(d,m)
mistas={72:('10','10'),107:('10','10'),234:('10','10'),242:('10','10'),351:('16','16'),380:('10','10')}
manter={0,382,123,301,352}
def maxv(v):
    px=[float(x[:-2]) for x in re.findall(r'[\d.]+px',v)]
    return 999 if '%' in v else (max(px) if px else 0)
plano={}; semdado=[]
for o in occ:
    k=o['k']; r=maxv(o['val'])
    if r<=10: continue
    if k in manter: continue
    if k in limpas or k in mistas:
        d,m=limpas.get(k) or mistas[k]
        plano[k]=(d,m)
    else:
        semdado.append(o)
print('com dado',len(plano),'sem dado',len(semdado))
c=collections.Counter()
ps=0
for o in semdado:
    if re.search(r'::?(before|after|placeholder|backdrop|marker|-webkit-|-moz-)',o['sel']): ps+=1; continue
    v=o['val'].replace('!important','').strip()
    c[v]+=1
print('pseudo',ps, c.most_common(25))
ex=[o for o in semdado if '999px' in o['val'] and not re.search(r'::?(before|after)',o['sel'])]
for o in ex[:70]: print(o['k'], o['med'][:22], '|', o['sel'][-95:])
json.dump({str(k):v for k,v in plano.items()},open('/home/claude/v19/cantos-origem/plano.json','w'))
