var y=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var l=y((w,f)=>{f.exports=function(e){let{atomic:t,utils:s}=e,n="";return t&&(n+=A(t)),s&&(n+=C(s)),n};function A(e){let t="";for(let s in e){let n=e[s];for(let r in n){let o=n[r];for(let i in o){let c=o[i];t+=`.${s.startsWith("$")?"":s}${i}{${r}:${c}}`}}}return t}function C(e){let t="";for(let s in e){let n=e[s],{css:r,actions:o}=n;if(r){let i=h(r);t+=`.${s}{${i}}`}if(o)for(let i in o){let c=o[i];t+=`.${s}:${i}{${h(c)}}`}}return t}function h(e){return e?Object.entries(e).map(([t,s])=>`${t}:${s}`).join(";"):""}});var u=require("fs"),p=require("path"),m=l(),a=class{options={config:"",assets:"",importWay:"link"};CSS_ASSET_NAME="atomic.css";cssContent="";constructor(t){for(let s in t)t[s]&&(this.options[s]=t[s]);this.cssContent=m(this.getConfig())}getConfig(){if(this.options.config){if(!u.existsSync(this.options.config))throw new Error("config path is not valid, please check.");return require(this.options.config)}return require(p.resolve(__dirname,"./default.config.js"))}getAssetsPath(t=""){return`${this.options.assets}${t}${this.CSS_ASSET_NAME}`}apply(t){let s=a.name,{Compilation:n,sources:r}=t.webpack;t.hooks.thisCompilation.tap(s,o=>{o.hooks.processAssets.tap({name:s,stage:n.PROCESS_ASSETS_STAGE_SUMMARIZE},i=>{o.emitAsset(this.getAssetsPath("/"),new r.RawSource(this.cssContent)),Object.keys(i).filter(c=>c.endsWith(".html")).forEach(c=>{let $=i[c].source(),[g,S]=$.split("</head>"),d=`${g}${this.getMiddlePart()}</head>${S}`;o.updateAsset(c,new r.RawSource(d))}),u.writeFileSync(p.resolve(__dirname,"./.atomic.css"),this.cssContent)})})}getMiddlePart(){switch(this.options.importWay){case"link":return`<link type="text/css" rel="stylesheet" href="${this.getAssetsPath()}">`;case"inline":return`<style type="text/css">${this.cssContent}</style>`;default:return`<link type="text/css" rel="stylesheet" href="${this.getAssetsPath()}">`}}};module.exports=a;exports.default=a;
