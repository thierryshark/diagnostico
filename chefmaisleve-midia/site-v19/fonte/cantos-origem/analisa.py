import re,sys,json
css=open('/home/claude/v19/dist/site.css',encoding='utf-8').read()
RE=re.compile(r'border(?:-(?:top|bottom)-(?:left|right))?-radius:([^;}]+)')
occ=[]
for k,m in enumerate(RE.finditer(css)):
    ob=css.rfind('{',0,m.start()); st=max(css.rfind('}',0,ob),css.rfind('{',0,ob-1))+1
    sel=css[st:ob]
    # media envolvente: procura o ultimo @media aberto antes
    med=''
    i=css.rfind('@media',0,st)
    if i>=0:
        j=css.find('{',i); depth=0
        seg=css[j:m.start()]
        if seg.count('{')-seg.count('}')>=2 or (seg.count('{')-seg.count('}')==2): med=css[i:j]
        elif seg.count('{')-seg.count('}')>=1 and css.rfind('}',0,st)<j: med=css[i:j]
        else:
            # conta chaves abertas desde o @media
            if seg.count('{')-seg.count('}')>=2: med=css[i:j]
    occ.append(dict(k=k,sel=sel,val=m.group(1),ini=m.start(),fim=m.end(),med=med))
json.dump(occ,open('/home/claude/v19/cantos-origem/occ.json','w'),ensure_ascii=False)
def big(v):
    px=[float(x[:-2]) for x in re.findall(r'[\d.]+px',v)]
    return ('%' in v) or (max(px) if px else 0)>10
print('total',len(occ),'grandes',sum(big(o['val']) for o in occ))
if len(sys.argv)>1:
    for k in map(int,sys.argv[1:]):
        o=occ[k]; print(k,'|',o['med'][:40],'|',o['sel'][-150:],'|',o['val'])
