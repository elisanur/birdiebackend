(window.webpackJsonpbirdie=window.webpackJsonpbirdie||[]).push([[0],{14:function(e,t,n){e.exports=n.p+"static/media/vladimir-kudinov-orng-mDXPnk-unsplash.4fe0ebb0.jpg"},16:function(e,t,n){e.exports=n(41)},21:function(e,t,n){},22:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(13),c=n.n(r),l=(n(21),n(2)),i=n(14),u=n.n(i),s=(n(22),n(3)),m=n.n(s),f=Object({NODE_ENV:"production",PUBLIC_URL:""}).API_URL||"http://localhost:3004/api",d={getAll:function(){return m.a.get(f+"/observations").then((function(e){return e.data}))},create:function(e){return m.a.post(f+"/observations",e).then((function(e){return e.data}))},update:function(e,t){return m.a.put("".concat(f,"/observations/").concat(e),t).then((function(e){return e.data}))}},v=n(15),g=n.n(v),p=function(e){var t=e.observation;return o.a.createElement("tr",null,o.a.createElement("td",null,g()(t.datetime).format("HH:MM:SS DD.MM.YYYY")),o.a.createElement("td",null,t.name),o.a.createElement("td",null,t.scientificName),o.a.createElement("td",null,t.rarity))};var b=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),s=i[0],m=i[1],f=Object(a.useState)("common"),v=Object(l.a)(f,2),g=v[0],b=v[1],h=Object(a.useState)(""),E=Object(l.a)(h,2),w=E[0],j=E[1];return Object(a.useEffect)((function(){console.log("effect"),d.getAll().then((function(e){r(e)}))}),[]),console.log("render",n.length,"observations"),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:u.a,className:"App-logo",alt:"logo"}),o.a.createElement("h1",null,"Birdie")),o.a.createElement("p",null),o.a.createElement("div",null,o.a.createElement("div",null,n.map((function(e){return o.a.createElement("table",null,o.a.createElement(p,{key:e.id,observation:e}))}))),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:s,scientificName:w,rarity:g};d.create(t).then((function(e){console.log("returned object...",e),r(n.concat(e)),m(""),j(""),b("common")}))}},o.a.createElement("label",null,"Name",o.a.createElement("input",{value:s,onChange:function(e){m(e.target.value)}})),o.a.createElement("br",null),o.a.createElement("label",null,"Scientific name",o.a.createElement("input",{value:w,onChange:function(e){j(e.target.value)}})),o.a.createElement("br",null),o.a.createElement("label",null,"Rarity"),o.a.createElement("select",{value:g,onChange:function(e){console.log("event target value",e.target.value),b(e.target.value)}},o.a.createElement("option",{value:"common"},"Common"),o.a.createElement("option",{value:"rare"},"Rare"),o.a.createElement("option",{value:"extremely rare"},"Extremely rare")),o.a.createElement("button",{type:"submit"},"save"))),"    ")},h=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function E(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(o.a.createElement(b,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");h?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):E(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):E(t,e)}))}}()}},[[16,1,2]]]);
//# sourceMappingURL=main.26ba249f.chunk.js.map