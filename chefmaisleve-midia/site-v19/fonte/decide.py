import json,collections,subprocess
d=json.load(open('est.json')); P=d['pages']; T=d['texts']; tpl=json.load(open('tpl.json'))
sites=json.load(open('sites.json'))
# texto estatico de cada site (re-avalia via node para pegar o css)
st=json.loads(subprocess.check_output(['node','-e',"""
import('./analisa.mjs').then(({analisa})=>{const fs=require('fs');const o={};for(const f of fs.readdirSync('src').filter(x=>x.endsWith('.js'))){o[f]=analisa(fs.readFileSync('src/'+f,'utf8')).map(x=>x.estatico?x.css:null)}console.log(JSON.stringify(o))})"""]))
bytpl=collections.defaultdict(list)
for p,t in tpl.items(): bytpl[t].append(p)
# chave de cada estilo em runtime: id se tiver, senao 'txt:'+indice do texto
def rkey(s): return s['id'] if s['id'] else 'txt:%d'%s['t']
pres=collections.defaultdict(dict)
for p,v in P.items():
    for s in v['styles']:
        if s['tag']=='STYLE': pres[rkey(s)][p]=s['t']
tidx={t:i for i,t in enumerate(T)}
# liga cada site a uma chave de runtime
plan=[]  # (arquivo, idx site, chave, motivo)
for f,arr in sites.items():
    for i,x in enumerate(arr):
        if x['id']: key=x['id']
        elif st[f][i] is not None and st[f][i] in tidx: key='txt:%d'%tidx[st[f][i]]
        else: key=None
        plan.append([f,i,key])
def blankavel(k):
    if k is None or k not in pres: return False
    if len(set(pres[k].values()))!=1: return False
    return all(len({p in pres[k] for p in ps})==1 for ps in bytpl.values())
keys_sites=collections.Counter(k for _,_,k in plan if k)
ok=set(k for k in keys_sites if blankavel(k))
# um id com varios sites: so blanka se todos os sites ligados a ele... (todos blankados juntos)
res=[(f,i,k, k in ok) for f,i,k in plan]
json.dump({'plan':res,'ok':sorted(ok)},open('decisao.json','w'))
tot=sum(len(T[next(iter(pres[k].values()))]) for k in ok)
print('sites',len(res),'blankaveis',sum(1 for r in res if r[3]),'chaves',len(ok),'KB',tot//1024)
print('fica no JS:',[ (f.split('.')[0],k) for f,i,k,b in res if not b])
# chaves de runtime nossas que nao foram ligadas a site
nossas=set(k for _,_,k in plan if k)
