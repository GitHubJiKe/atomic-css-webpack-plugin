var y=(o,t)=>()=>(t||o((t={exports:{}}).exports,t),t.exports);var A=y((k,g)=>{function l(o){let t="";for(let s in o){let e=o[s];for(let i in e){let n=[i];i.includes("$")&&(n=i.split("$"));let r=e[i];for(let c in r){let a=r[c],p=c,f=!1;c.endsWith("!")&&(f=!0,p=c.split("!")[0]);let d=n.map(w=>`${w}:${a}${f?" !important":""}`).join(";");t+=`.${s.startsWith("$")?"":s}${p}{${d}}`}}}return t}function u(o){let t="";for(let s in o){let e=o[s],{css:i,actions:n}=e;if(i){let r=$(i);t+=`.${s}{${r}}`}if(n)for(let r in n){let c=n[r];t+=`.${s}:${r}{${$(c)}}`}}return t}function $(o){return o?Object.entries(o).map(([t,s])=>`${t}:${s}`).join(";"):""}g.exports={parse:function(o){let{atomic:t,utils:s}=o,e="";return t&&(e+=l(t)),s&&(e+=u(s)),e},parseAtomic:l,parseUtils:u}});var S=require("fs"),C=require("path"),m=A(),h=class{options={version:4,config:"",assets:"",publicPath:"/",importWay:"inline",parser:null};CSS_ASSET_NAME="atomic";cssContent="";constructor(t){for(let s in t)t[s]&&(this.options[s]=t[s]);if(this.options.parser)if(typeof this.options.parser=="function")this.cssContent=this.options.parser(this.getConfig());else throw new Error("Customizer parser should be function,which params is config");else this.cssContent=m.parse(this.getConfig())}getConfig(){if(!this.options.config)throw new Error("config path is required, please check.");if(this.options.config){if(!S.existsSync(this.options.config))throw new Error("config path is not valid, please check.");return require(this.options.config)}}getAssetsPath(t,s=!1){let{assets:e,publicPath:i}=this.options,n=s?`${i}${e}`:e;return t?`${n}/${this.CSS_ASSET_NAME}.${t}.css`:`${n}/${this.CSS_ASSET_NAME}.css`}apply(t){let s=h.name;if(!this.options.version)throw new Error("Please make sure you specify the version field.");if(this.options.version=="5"){let{Compilation:e,sources:i}=t.webpack;t.hooks.thisCompilation.tap(s,n=>{n.hooks.processAssets.tap({name:s,stage:e.PROCESS_ASSETS_STAGE_SUMMARIZE},r=>{this.emitAsset(n,i),this.updateAssets(r,n,i),this.writeFile()})})}else if(this.options.version=="4")t.hooks.emit.tapAsync(s,(e,i)=>{let n=e.assets;this.emitAsset(e),this.updateAssets(n,e),this.writeFile(),i()});else throw new Error(`Doesn't support webpack version ${this.options.version}.`)}emitAsset(t,s){this.options.importWay==="link"&&t.emitAsset(this.getAssetsPath(t.hash),this.getSource(this.cssContent,s))}updateAssets(t,s,e){Object.keys(t).filter(i=>i.endsWith(".html")).forEach(i=>{let n=t[i].source(),[r,c]=n.split("</head>"),a=`${r}${this.getMiddlePart(s.hash)}</head>${c}`;s.updateAsset(i,this.getSource(a,e))})}writeFile(){S.writeFileSync(C.resolve(__dirname,".atomic.css"),this.cssContent)}getSource(t,s){if(this.options.version=="4")return{source:()=>t,size:()=>t.length};if(this.options.version=="5")return new s.RawSource(t)}getMiddlePart(t){let s=`<link type="text/css" rel="stylesheet" href="${this.getAssetsPath(t,!0)}">`;switch(this.options.importWay){case"link":return s;case"inline":return`<style type="text/css">${this.cssContent}</style>`;default:return s}}};module.exports=h;exports.default=h;
