var y=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var S=y((m,g)=>{function l(e){let t="";for(let s in e){let o=e[s];for(let i in o){let n=[i];i.includes("$")&&(n=i.split("$"));let r=o[i];for(let c in r){let h=r[c],p=n.map(f=>`${f}:${h}`).join(";");t+=`.${s.startsWith("$")?"":s}${c}{${p}}`}}}return t}function u(e){let t="";for(let s in e){let o=e[s],{css:i,actions:n}=o;if(i){let r=$(i);t+=`.${s}{${r}}`}if(n)for(let r in n){let c=n[r];t+=`.${s}:${r}{${$(c)}}`}}return t}function $(e){return e?Object.entries(e).map(([t,s])=>`${t}:${s}`).join(";"):""}g.exports={parse:function(e){let{atomic:t,utils:s}=e,o="";return t&&(o+=l(t)),s&&(o+=u(s)),o},parseAtomic:l,parseUtils:u}});var C=require("fs"),A=require("path"),w=S(),a=class{options={config:"",assets:"",importWay:"link",parser:null};CSS_ASSET_NAME="atomic.css";cssContent="";constructor(t){for(let s in t)t[s]&&(this.options[s]=t[s]);if(this.options.parser)if(typeof this.options.parser=="function")this.cssContent=this.options.parser(this.getConfig());else throw new Error("Customizer parser should be function,which params is config");else this.cssContent=w.parse(this.getConfig())}getConfig(){if(!this.options.config)throw new Error("config path is required, please check.");if(this.options.config){if(!C.existsSync(this.options.config))throw new Error("config path is not valid, please check.");return require(this.options.config)}}getAssetsPath(t){let s=this.options.assets;return t?`${s}/${this.CSS_ASSET_NAME}.${t}.css`:`${s}/${this.CSS_ASSET_NAME}.css`}apply(t){let s=a.name,{Compilation:o,sources:i}=t.webpack;t.hooks.thisCompilation.tap(s,n=>{n.hooks.processAssets.tap({name:s,stage:o.PROCESS_ASSETS_STAGE_SUMMARIZE},r=>{this.options.importWay==="link"&&n.emitAsset(this.getAssetsPath(n.hash),new i.RawSource(this.cssContent)),Object.keys(r).filter(c=>c.endsWith(".html")).forEach(c=>{let h=r[c].source(),[p,f]=h.split("</head>"),d=`${p}${this.getMiddlePart(n.hash)}</head>${f}`;n.updateAsset(c,new i.RawSource(d))}),C.writeFileSync(A.resolve(__dirname,"./.atomic.css"),this.cssContent)})})}getMiddlePart(t){let s=`<link type="text/css" rel="stylesheet" href="${this.getAssetsPath(t)}">`;switch(this.options.importWay){case"link":return s;case"inline":return`<style type="text/css">${this.cssContent}</style>`;default:return s}}};module.exports=a;exports.default=a;
