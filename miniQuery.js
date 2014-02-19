//miniQuery
//2014, Marcel Duin <https://github.com/marcelduin/>

$ = function(s){return new _$(s)};

$.extend = function(){
	var a = arguments, r = a[0]===true, o = a[r&&1||0];
	function cp(i,o) { for(var x in i) { var p = i[x], c = p&&p.constructor; o[x] = (r&&c&&(c==Array||c==Object)) ? cp(p,new c) : (r&&c&&(c==Number||c==String)) ? c(p) : p; } return o };
	for(var i=(r?2:1);i<a.length;i++) cp(a[i],o);
	return o;
};

function _getEls(sel,par){
	if(sel==window) return [window];
	if(sel instanceof Element) return [sel];
	if(sel instanceof Array || sel instanceof _$) return sel;
	if(/^\</.test(sel)) {var fr = document.createElement('div');fr.innerHTML = sel;return fr.childNodes;}
	if(sel) return (par||document).querySelectorAll(sel);
	return [];
};

function _$(sel,par){ var _=_getEls(sel,par); for(var x in _) this[x]=_[x]; if(!this.length) this.length = _.length; };
_$.prototype = {
	each        : function(f)    { for(var i=0;i<this.length;i++) f.call(this[i]); return this },
	remove      : function()     { this.each(function(){this.parentNode.removeChild(this)}); return this },
	replaceWith : function(el)   { var me = this; if(me[0]) { if(el.each) el.each(function(){ me[0].parentNode.insertBefore(this,me[0]); }); else me[0].parentNode.insertBefore(el,me[0]); me.remove(); } return this },
	appendTo    : function(el)   { el=el.length?el[0]:el;this.each(function(){el.appendChild(this)}); return this },
	parent      : function()     { var r = [];this.each(function(){if(r.indexOf(this.parentNode)<0) r.push(this.parentNode)});return new _$(r); },
	children    : function(sel)  { sel = sel || '*';var ce = [];this.each(function(){var e = this.querySelectorAll(sel);for(var i=0;i<e.length;i++) if(e[i].parentNode==this) ce.push(e[i]);}); return new _$(ce) },
	find        : function(sel)  { return new _$(sel,this[0]) },
	filter      : function(s,iv) { s = _getEls(s); return new _$([].filter.call(this,function(n){ for(var i=0;i<s.length;i++) if(s[i]==n) return !iv; return !!iv })) },
	not         : function(sel)  { return this.filter(sel,true) },
	eq          : function(i)    { return new _$(this[i]) },
	has         : function(el)   { for(var i=0;i<this.length;i++) if(this[i]==el) return true },
	add         : function(sel)  { sel = _getEls(sel); var me = this, cu = []; for(var i=0;i<this.length;i++) cu.push(this[i]); var ta = cu.concat([].filter.call(sel,function(n){return cu.indexOf(n)==-1})); return ta.length==this.length?this:new _$(ta) },
	attr        : function(k,v)  { if(v===undefined) return this[0]&&this[0].getAttribute(k); this.each(function(){this[((v===null)?'remove':'set')+'Attribute'](k,v)}); return this },
	trigger     : function(e,v)  { this.each(function(){var evt = !isIE?new CustomEvent(e,{detail:v}):document.createEvent('CustomEvent');if(isIE) evt.initCustomEvent(e, false, false, v);this.dispatchEvent(evt)}); return this },
	on          : function(e,f)  { e=e.split(' '); this.each(function(){for(var x in e) this.addEventListener(e[x],f)}); return this },
	off         : function(e,f)  { e=e.split(' '); this.each(function(){for(var x in e) this.removeEventListener(e[x],f)}); return this },
	click       : function(f)    { if(f instanceof Function) this.on('click',f); else this.trigger('click'); return this },
	text        : function(t)    { if(t===undefined) return this[0]&&this[0].textContent; this.each(function(){this.textContent=t}); return this },
	html        : function(h)    { if(t===undefined) return this[0]&&this[0].innerHTML; this.each(function(){this.innerHTML=h}); return this },
	hasClass    : function(cl,h) { h=0;this.each(function(){h+=this.classList.contains(cl)&&1||0});return !!h },
	addClass    : function(cl)   { cl=cl.split(' ');this.each(function(){for(var i in cl) this.classList.add(cl[i])});return this },
	removeClass : function(cl)   { cl=cl.split(' ');this.each(function(){for(var i in cl) this.classList.remove(cl[i])});return this },
	toggleClass : function(cl)   { cl=cl.split(' ');for(var x in cl) this[(this.hasClass(cl[x])?'remove':'add')+'Class'](cl[x]); return this },
	setcss      : function(v,p)  { this.each(function(){this.style.setProperty(v,p)}); return this },
	getcss      : function(p)    { return this[0]&&this[0].style.getPropertyValue(p); },
	css         : function(a,b)  { if(typeof a == 'string') if(b===undefined) return this.getcss(a); else this.setcss(a,b);else for(var x in a) this.setcss(x,a[x]); return this },
	hide        : function()     { this.setcss('display','none'); return this },
	show        : function()     { this.setcss('display','block'); return this },
	width       : function()     { return this[0]&&this[0].clientWidth },
	height      : function()     { return this[0]&&this[0].clientHeight }
};
