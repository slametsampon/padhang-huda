/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Q = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Tt = (r) => new wt(typeof r == "string" ? r : r + "", void 0, X), q = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce(((s, i, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1]), r[0]);
  return new wt(e, r, X);
}, Mt = (r, t) => {
  if (Q) r.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), i = V.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, pt = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Tt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qt, defineProperty: Ot, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: jt, getOwnPropertySymbols: Nt, getPrototypeOf: Ht } = Object, G = globalThis, gt = G.trustedTypes, Rt = gt ? gt.emptyScript : "", zt = G.reactiveElementPolyfillSupport, U = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Rt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (r, t) => !qt(r, t), mt = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ??= Symbol("metadata"), G.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = mt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Ot(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = Ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i?.call(this);
      a?.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Ht(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...jt(e), ...Nt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(pt(i));
    } else t !== void 0 && e.push(pt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Mt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (s.converter?.toAttribute !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : D;
      this._$Em = i;
      const h = n.fromAttribute(e, a.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, a = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? tt)(a, e) || s.useDefault && s.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: a }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, a] of s) {
        const { wrapped: n } = a, h = this[i];
        n !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, a, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(((s) => s.hostUpdate?.())), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[U("elementProperties")] = /* @__PURE__ */ new Map(), P[U("finalized")] = /* @__PURE__ */ new Map(), zt?.({ ReactiveElement: P }), (G.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, I = et.trustedTypes, ft = I ? I.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Et = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + b, Lt = `<${xt}>`, w = document, j = () => w.createComment(""), N = (r) => r === null || typeof r != "object" && typeof r != "function", st = Array.isArray, Vt = (r) => st(r) || typeof r?.[Symbol.iterator] == "function", K = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, $t = />/g, _ = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vt = /'/g, bt = /"/g, kt = /^(?:script|style|textarea|title)$/i, Dt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), g = Dt(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), _t = /* @__PURE__ */ new WeakMap(), A = w.createTreeWalker(w, 129);
function St(r, t) {
  if (!st(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(t) : t;
}
const It = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = O;
  for (let h = 0; h < e; h++) {
    const o = r[h];
    let u, p, l = -1, $ = 0;
    for (; $ < o.length && (n.lastIndex = $, p = n.exec(o), p !== null); ) $ = n.lastIndex, n === O ? p[1] === "!--" ? n = yt : p[1] !== void 0 ? n = $t : p[2] !== void 0 ? (kt.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = _) : p[3] !== void 0 && (n = _) : n === _ ? p[0] === ">" ? (n = i ?? O, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, u = p[1], n = p[3] === void 0 ? _ : p[3] === '"' ? bt : vt) : n === bt || n === vt ? n = _ : n === yt || n === $t ? n = O : (n = _, i = void 0);
    const v = n === _ && r[h + 1].startsWith("/>") ? " " : "";
    a += n === O ? o + Lt : l >= 0 ? (s.push(u), o.slice(0, l) + Et + o.slice(l) + b + v) : o + b + (l === -2 ? h : v);
  }
  return [St(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const h = t.length - 1, o = this.parts, [u, p] = It(t, e);
    if (this.el = H.createElement(u, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = A.nextNode()) !== null && o.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(Et)) {
          const $ = p[n++], v = i.getAttribute(l).split(b), L = /([.?@])?(.*)/.exec($);
          o.push({ type: 1, index: a, name: L[2], strings: v, ctor: L[1] === "." ? Gt : L[1] === "?" ? Wt : L[1] === "@" ? Ft : W }), i.removeAttribute(l);
        } else l.startsWith(b) && (o.push({ type: 6, index: a }), i.removeAttribute(l));
        if (kt.test(i.tagName)) {
          const l = i.textContent.split(b), $ = l.length - 1;
          if ($ > 0) {
            i.textContent = I ? I.emptyScript : "";
            for (let v = 0; v < $; v++) i.append(l[v], j()), A.nextNode(), o.push({ type: 2, index: ++a });
            i.append(l[$], j());
          }
        }
      } else if (i.nodeType === 8) if (i.data === xt) o.push({ type: 2, index: a });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(b, l + 1)) !== -1; ) o.push({ type: 7, index: a }), l += b.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(r, t, e = r, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const a = N(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = T(r, i._$AS(r, t.values), i, s)), t;
}
class Bt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? w).importNode(e, !0);
    A.currentNode = i;
    let a = A.nextNode(), n = 0, h = 0, o = s[0];
    for (; o !== void 0; ) {
      if (n === o.index) {
        let u;
        o.type === 2 ? u = new z(a, a.nextSibling, this, t) : o.type === 1 ? u = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (u = new Kt(a, this, t)), this._$AV.push(u), o = s[++h];
      }
      n !== o?.index && (a = A.nextNode(), n++);
    }
    return A.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = T(this, t, e), N(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(St(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const a = new Bt(i, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = _t.get(t.strings);
    return e === void 0 && _t.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new z(this.O(j()), this.O(j()), this, this.options)) : s = e[i], s._$AI(a), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, a) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, i) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = T(this, t, e, 0), n = !N(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let o, u;
      for (t = a[0], o = 0; o < a.length - 1; o++) u = T(this, h[s + o], e, o), u === E && (u = this._$AH[o]), n ||= !N(u) || u !== this._$AH[o], u === c ? t = c : t !== c && (t += (u ?? "") + a[o + 1]), this._$AH[o] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Wt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ft extends W {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? c) === E) return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const Yt = et.litHtmlPolyfillSupport;
Yt?.(H, z), (et.litHtmlVersions ??= []).push("3.3.1");
const Jt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = e?.renderBefore ?? null;
    s._$litPart$ = i = new z(t.insertBefore(j(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis;
let m = class extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
};
m._$litElement$ = !0, m.finalized = !0, it.litElementHydrateSupport?.({ LitElement: m });
const Zt = it.litElementPolyfillSupport;
Zt?.({ LitElement: m });
(it.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: tt }, Xt = (r = Qt, t, e) => {
  const { kind: s, metadata: i } = e;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const o = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, o, r);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const o = this[n];
      t.call(this, h), this.requestUpdate(n, o, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function d(r) {
  return (t, e) => typeof e == "object" ? Xt(r, t, e) : ((s, i, a) => {
    const n = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(r) {
  return d({ ...r, state: !0, attribute: !1 });
}
var te = Object.defineProperty, Ct = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && te(t, e, i), i;
};
const at = class at extends m {
  constructor() {
    super(...arguments), this.placeholder = "Cari kata...", this.value = "";
  }
  onInput(t) {
    this.value = t.target.value, this.dispatchEvent(
      new CustomEvent("quran.search", {
        detail: { query: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return g`<input
      type="text"
      .value=${this.value}
      placeholder=${this.placeholder}
      @input=${this.onInput}
    />`;
  }
};
at.styles = q`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }
  `;
let R = at;
Ct([
  d({ type: String })
], R.prototype, "placeholder");
Ct([
  k()
], R.prototype, "value");
customElements.get("quran-search-box") || customElements.define("quran-search-box", R);
var ee = Object.defineProperty, rt = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && ee(t, e, i), i;
};
const nt = class nt extends m {
  constructor() {
    super(...arguments), this.value = 1, this.chapters = [], this.loading = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.loadChapters();
  }
  async loadChapters() {
    this.loading = !0;
    try {
      const t = await fetch("/quran-data/chapters.json");
      if (!t.ok) throw new Error(`HTTP ${t.status}`);
      const e = await t.json();
      if (this.chapters = (e?.chapters ?? []).map((s) => ({
        id: s.id,
        name_simple: s.name_simple,
        name_arabic: s.name_arabic,
        verses_count: s.verses_count
      })), !Array.isArray(this.chapters) || this.chapters.length === 0)
        throw new Error("Empty chapters");
    } catch (t) {
      console.warn("[SurahSelector] fallback minimal list:", t), this.chapters = [
        {
          id: 1,
          name_simple: "Al-Fatihah",
          name_arabic: "الفاتحة",
          verses_count: 7
        }
      ];
    } finally {
      this.loading = !1;
    }
  }
  onChange(t) {
    const e = Number(t.target.value);
    window.dispatchEvent(
      new CustomEvent("quran.goto", { detail: { surah: e, ayah: 1 } })
    );
  }
  render() {
    return g`
      <div class="row">
        <label for="surahSel">Surah:</label>
        <select
          id="surahSel"
          @change=${this.onChange}
          .value=${String(this.value)}
        >
          ${this.chapters.map(
      (t) => g`<option value=${t.id}>
                ${t.id}. ${t.name_simple} — ${t.name_arabic}
              </option>`
    )}
        </select>
        ${this.loading ? g`<span>⏳</span>` : null}
      </div>
    `;
  }
};
nt.styles = q`
    :host {
      display: block;
      margin-bottom: 0.5rem;
    }
    .row {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    select {
      padding: 0.35rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
    }
    label {
      font-size: 0.9rem;
      color: #444;
    }
  `;
let M = nt;
rt([
  d({ type: Number })
], M.prototype, "value");
rt([
  k()
], M.prototype, "chapters");
rt([
  k()
], M.prototype, "loading");
customElements.get("quran-surah-selector") || customElements.define("quran-surah-selector", M);
const ot = class ot extends m {
  onSubmit(t) {
    t.preventDefault();
    const i = (this.shadowRoot?.querySelector("input")?.value || "").trim().match(/^(\d{1,3}):(\d{1,3})$/);
    if (!i) {
      alert('Format harus "surah:ayat", misal 2:255');
      return;
    }
    const a = Number(i[1]), n = Number(i[2]);
    window.dispatchEvent(
      new CustomEvent("quran.goto", { detail: { surah: a, ayah: n } })
    );
  }
  render() {
    return g`
      <form @submit=${this.onSubmit}>
        <label>Go to:</label>
        <input placeholder="2:255" aria-label="Go to surah:ayah" />
        <button type="submit">Go</button>
      </form>
    `;
  }
};
ot.styles = q`
    :host {
      display: block;
      margin-bottom: 0.5rem;
    }
    form {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    input {
      padding: 0.35rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 8rem;
    }
    button {
      padding: 0.35rem 0.7rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
    }
  `;
let Y = ot;
customElements.get("quran-goto") || customElements.define("quran-goto", Y);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = { CHILD: 2 }, ie = (r) => (...t) => ({ _$litDirective$: r, values: t });
class re {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class J extends re {
  constructor(t) {
    if (super(t), this.it = c, t.type !== se.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === c || t == null) return this._t = void 0, this.it = t;
    if (t === E) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
J.directiveName = "unsafeHTML", J.resultType = 1;
const ae = ie(J);
var ne = Object.defineProperty, S = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && ne(t, e, i), i;
};
const ht = class ht extends m {
  constructor() {
    super(...arguments), this.results = [], this.lang = "id", this.lastQuery = "";
  }
  defaultTranslation(t, e) {
    return t.translations?.[e] ?? "";
  }
  // gunakan <mark> agar tetap terlihat walau CSS host tidak masuk
  defaultHighlight(t, e) {
    if (!e) return t;
    const s = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), i = new RegExp(`(${s})`, "gi");
    return t.replace(i, '<mark class="highlight">$1</mark>');
  }
  render() {
    const t = this.getTranslation ?? this.defaultTranslation, e = this.highlight ?? this.defaultHighlight;
    return g`
      <div class="search-results">
        ${this.results.map(
      (s) => g`
            <div class="result">
              <div><strong>${s.surah}:${s.ayah}</strong></div>
              <div class="ayah" lang="ar" dir="rtl">${s.text.arabic}</div>
              <div class="translation">
                ${ae(e(t(s, this.lang), this.lastQuery.trim()))}
              </div>
              <div class="result-actions">
                <button @click=${() => this.gotoFn?.(s.surah, s.ayah)}>
                  👁 View
                </button>
                <button @click=${() => this.copyFn?.(s)}>📋 Copy</button>
              </div>
            </div>
          `
    )}
      </div>
    `;
  }
};
ht.styles = q`
    /* minimal style agar highlight selalu terlihat di shadow DOM anak */
    mark,
    .highlight {
      background: var(--qv-highlight-bg, yellow);
      color: inherit;
      font-weight: var(--qv-highlight-weight, 700);
      padding: 0 2px;
      border-radius: 2px;
    }
  `;
let f = ht;
S([
  d({ type: Array })
], f.prototype, "results");
S([
  d({ type: String })
], f.prototype, "lang");
S([
  d({ type: String })
], f.prototype, "lastQuery");
S([
  d({ attribute: !1 })
], f.prototype, "gotoFn");
S([
  d({ attribute: !1 })
], f.prototype, "copyFn");
S([
  d({ attribute: !1 })
], f.prototype, "getTranslation");
S([
  d({ attribute: !1 })
], f.prototype, "highlight");
customElements.get("quran-search-results") || customElements.define("quran-search-results", f);
const lt = class lt extends m {
  render() {
    return g`<slot></slot>`;
  }
};
lt.styles = q`
    :host {
      display: block;
      border-right: 1px solid #ddd;
      height: 100%;
      overflow-y: auto;
    }

    header {
      position: sticky;
      top: 0;
      background: white;
      z-index: 10;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
  `;
let Z = lt;
customElements.get("quran-left-panel") || customElements.define("quran-left-panel", Z);
const B = [
  // Surah 1: Al-Fatiha
  {
    surah: 1,
    ayah: 1,
    text: { arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
    translations: {
      id: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang",
      en: "In the name of Allah, the Entirely Merciful, the Especially Merciful"
    },
    meta: { juz: 1, page: 1 }
  },
  {
    surah: 1,
    ayah: 2,
    text: { arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
    translations: {
      id: "Segala puji bagi Allah, Tuhan semesta alam",
      en: "All praise is due to Allah, Lord of the worlds"
    },
    meta: { juz: 1, page: 1 }
  },
  {
    surah: 1,
    ayah: 3,
    text: { arabic: "الرَّحْمَٰنِ الرَّحِيمِ" },
    translations: {
      id: "Yang Maha Pengasih, Maha Penyayang",
      en: "The Entirely Merciful, the Especially Merciful"
    },
    meta: { juz: 1, page: 1 }
  },
  {
    surah: 1,
    ayah: 4,
    text: { arabic: "مَالِكِ يَوْمِ الدِّينِ" },
    translations: {
      id: "Pemilik hari pembalasan",
      en: "Sovereign of the Day of Recompense"
    },
    meta: { juz: 1, page: 1 }
  },
  {
    surah: 1,
    ayah: 5,
    text: { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
    translations: {
      id: "Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami mohon pertolongan",
      en: "It is You we worship and You we ask for help"
    },
    meta: { juz: 1, page: 1 }
  },
  {
    surah: 1,
    ayah: 6,
    text: { arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" },
    translations: {
      id: "Tunjukilah kami jalan yang lurus",
      en: "Guide us to the straight path"
    },
    meta: { juz: 1, page: 1 }
  },
  {
    surah: 1,
    ayah: 7,
    text: {
      arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    },
    translations: {
      id: "Jalan orang-orang yang Engkau beri nikmat, bukan jalan mereka yang dimurkai, dan bukan pula jalan mereka yang sesat",
      en: "The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray"
    },
    meta: { juz: 1, page: 1 }
  },
  // Surah 2: Al-Baqarah (1–5)
  {
    surah: 2,
    ayah: 1,
    text: { arabic: "الم" },
    translations: {
      id: "Alif, Lam, Mim",
      en: "Alif, Lam, Meem"
    },
    meta: { juz: 1, page: 2 }
  },
  {
    surah: 2,
    ayah: 2,
    text: {
      arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ"
    },
    translations: {
      id: "Kitab (Al-Qur’an) ini tidak ada keraguan padanya; menjadi petunjuk bagi mereka yang bertakwa",
      en: "This is the Book about which there is no doubt, a guidance for those conscious of Allah"
    },
    meta: { juz: 1, page: 2 }
  },
  {
    surah: 2,
    ayah: 3,
    text: {
      arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ"
    },
    translations: {
      id: "Yaitu mereka yang beriman kepada yang gaib, menegakkan salat, dan menafkahkan sebagian rezeki yang Kami berikan",
      en: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them"
    },
    meta: { juz: 1, page: 2 }
  },
  {
    surah: 2,
    ayah: 4,
    text: {
      arabic: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ"
    },
    translations: {
      id: "Dan mereka yang beriman kepada Kitab yang diturunkan kepadamu dan Kitab yang diturunkan sebelum kamu, serta mereka yakin akan adanya akhirat",
      en: "And who believe in what has been revealed to you, and what was revealed before you, and of the Hereafter they are certain [in faith]"
    },
    meta: { juz: 1, page: 2 }
  },
  {
    surah: 2,
    ayah: 5,
    text: {
      arabic: "أُولَٰئِكَ عَلَىٰ هُدًى مِنْ رَبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ"
    },
    translations: {
      id: "Merekalah yang mendapat petunjuk dari Tuhan mereka, dan mereka itulah orang-orang yang beruntung",
      en: "It is they who will follow guidance from their Lord, and it is they who will be successful"
    },
    meta: { juz: 1, page: 2 }
  }
], oe = [
  {
    number: 1,
    name: {
      arabic: "الفاتحة",
      transliteration: "Al-Fatiha",
      translation: { id: "Pembukaan", en: "The Opening" }
    },
    revelation: "Meccan",
    ayahs: B.filter((r) => r.surah === 1)
  },
  {
    number: 2,
    name: {
      arabic: "البقرة",
      transliteration: "Al-Baqarah",
      translation: { id: "Sapi Betina", en: "The Cow" }
    },
    revelation: "Madinan",
    ayahs: B.filter((r) => r.surah === 2)
  }
];
class he {
  constructor() {
    this.verses = B, this.surahs = oe, this.index = new Map(this.verses.map((t) => [`${t.surah}:${t.ayah}`, t]));
  }
  async getVerse(t, e) {
    return this.index.get(`${t}:${e}`) ?? void 0;
  }
  async getSurah(t) {
    return this.surahs.find((e) => e.number === t);
  }
  async search(t, e = "id") {
    return this.verses.filter(
      (s) => (s.translations[e] ?? "").includes(t) || s.text.arabic.includes(t)
    );
  }
  async getAllVerses() {
    return B;
  }
}
class At {
  constructor(t) {
    this.provider = t;
  }
  async getVerse(t, e) {
    return this.provider.getVerse(t, e);
  }
  /**
   * Pencarian default (anti-break):
   * - Cocokkan query pada terjemahan (case-insensitive)
   * - ATAU cocokkan pada teks Arab (includes)
   */
  async searchVerses(t, e) {
    const s = (t ?? "").trim();
    if (!s) return [];
    const i = await this.provider.getAllVerses(), a = s.toLowerCase();
    return i.filter((n) => this.getTranslation(n, e).toLowerCase().includes(a) || (n.text?.arabic ?? "").includes(s));
  }
  /**
   * Mengambil terjemahan dari struktur array/map (sesuai kode awal).
   * Fallback: "[Terjemahan tidak tersedia]".
   */
  getTranslation(t, e) {
    const s = t.translations;
    return s ? Array.isArray(s) ? s.find(
      (a) => a.language_name?.toLowerCase().startsWith((e ?? "").toLowerCase())
    )?.text ?? "[Terjemahan tidak tersedia]" : s?.[e] ?? "[Terjemahan tidak tersedia]" : "[Terjemahan tidak tersedia]";
  }
  /**
   * Highlight query dalam text; aman terhadap karakter regex khusus.
   * Perilaku visual sama (span.highlight) seperti sebelumnya.
   */
  highlight(t, e) {
    if (!e) return t;
    const s = this.escapeRegExp(e), i = new RegExp(`(${s})`, "gi");
    return (t ?? "").replace(i, '<span class="highlight">$1</span>');
  }
  escapeRegExp(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
const Pt = q`
  @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');

  .layout {
    display: flex;
    height: 100vh;
    position: relative; /* supaya overlay bisa absolute di dalam */
    font-family: system-ui, sans-serif;
  }

  quran-left-panel {
    width: 250px;
    background: #fdfdfd;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    z-index: 0; /* pastikan di atas overlay */
  }

  quran-right-panel {
    flex: 1;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    min-height: 300px; /* biar nggak mepet */
  }

  @media (max-width: 800px) {
    :host([usepanels]) .layout {
      grid-template-columns: 1fr;
    }

    quran-left-panel {
      margin-bottom: 1rem;
    }
  }

  /* === Typography === */
  h2 {
    margin-top: 0;
    font-size: 1.3rem;
    text-align: center;
  }

  .ayah {
    font-family: 'Amiri', serif;
    font-size: 2rem;
    line-height: 2.5rem;
    direction: rtl;
    text-align: right;
    margin-bottom: 0.75rem;
  }

  .translation {
    color: #333;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .nav-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #f9f9f9;
    cursor: pointer;
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }

  button:hover {
    background: #eee;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
`;
var le = Object.defineProperty, C = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && le(t, e, i), i;
};
const ct = class ct extends m {
  constructor() {
    super(...arguments), this.surah = 1, this.ayah = 1, this.lang = "id", this.provider = new he(), this.service = new At(this.provider), this.searchResults = [], this.loading = !1, this.lastQuery = "", this._onGoto = (t) => {
      const { surah: e, ayah: s } = t.detail;
      typeof e == "number" && (this.surah = e), typeof s == "number" && (this.ayah = s);
    }, this._onSearch = (t) => {
      const { query: e } = t.detail;
      this.runSearch(e);
    }, this.goto = (t, e) => {
      this.surah = t, this.ayah = e, this.searchResults = [], this.emitGoto();
    }, this.copyVerse = (t) => {
      const e = `${t.text.arabic}
${this.service.getTranslation(
        t,
        this.lang
      )}`;
      navigator.clipboard.writeText(e), alert("✅ Ayat disalin ke clipboard!");
    }, this.copyCurrent = () => {
      if (!this.verse) return;
      const t = `${this.verse.text.arabic}
${this.service.getTranslation(
        this.verse,
        this.lang
      )}`;
      navigator.clipboard.writeText(t), alert("✅ Ayat disalin ke clipboard!");
    };
  }
  // === Lifecycle ===
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("quran.goto", this._onGoto), window.addEventListener("quran.search", this._onSearch), this.loadVerse();
  }
  disconnectedCallback() {
    window.removeEventListener("quran.goto", this._onGoto), window.removeEventListener("quran.search", this._onSearch), super.disconnectedCallback();
  }
  updated(t) {
    (t.has("surah") || t.has("ayah") || t.has("lang")) && this.loadVerse();
  }
  // === Data Fetching ===
  async loadVerse() {
    this.loading = !0, this.verse = await this.service.getVerse(this.surah, this.ayah), this.loading = !1;
  }
  async runSearch(t) {
    if (this.lastQuery = t, !t) {
      this.searchResults = [];
      return;
    }
    this.loading = !0, this.searchResults = await this.service.searchVerses(t, this.lang), this.loading = !1;
  }
  // === Actions ===
  emitGoto() {
    const t = { surah: this.surah, ayah: this.ayah };
    this.dispatchEvent(
      new CustomEvent("quran-goto", {
        detail: t,
        bubbles: !0,
        composed: !0
      })
    ), window.dispatchEvent(new CustomEvent("quran.goto", { detail: t }));
  }
  nextAyah() {
    this.ayah++, this.emitGoto();
  }
  prevAyah() {
    this.ayah > 1 && this.ayah--, this.emitGoto();
  }
  // === Public API ===
  setProvider(t) {
    this.provider = t, this.service = new At(t), this.loadVerse();
  }
  // === Render ===
  render() {
    return this.loading ? g`<div class="loading">⏳ Loading…</div>` : this.searchResults.length > 0 ? g`
        <quran-search-results
          .results=${this.searchResults}
          .lang=${this.lang}
          .lastQuery=${this.lastQuery}
          .onGoto=${this.goto}
          .onCopyVerse=${this.copyVerse}
          .getTranslation=${(t, e) => this.service.getTranslation(t, e)}
          .highlight=${(t, e) => this.service.highlight(t, e)}
        ></quran-search-results>
      ` : this.verse ? g`
        <div class="ayah" lang="ar" dir="rtl">
          ${this.verse?.text?.arabic ?? ""}
        </div>
        <div class="translation">
          ${this.service.getTranslation(this.verse, this.lang)}
        </div>
        <div class="nav-buttons">
          <button @click=${this.prevAyah}>◀️ Prev</button>
          <button @click=${this.copyCurrent}>📋 Copy</button>
          <button @click=${this.nextAyah}>Next ▶️</button>
        </div>
      ` : g`
      <div class="not-found">
        📭 Ayat ${this.surah}:${this.ayah} tidak ditemukan.
      </div>
    `;
  }
};
ct.styles = Pt;
let y = ct;
C([
  d({ type: Number })
], y.prototype, "surah");
C([
  d({ type: Number })
], y.prototype, "ayah");
C([
  d({ type: String })
], y.prototype, "lang");
C([
  k()
], y.prototype, "verse");
C([
  k()
], y.prototype, "searchResults");
C([
  k()
], y.prototype, "loading");
C([
  k()
], y.prototype, "lastQuery");
customElements.get("quran-right-panel") || customElements.define("quran-right-panel", y);
var ce = Object.defineProperty, F = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && ce(t, e, i), i;
};
const ut = class ut extends m {
  constructor() {
    super(...arguments), this.usePanels = !0, this.surah = 1, this.ayah = 1, this.lang = "id", this._onGoto = (t) => {
      const { surah: e, ayah: s } = t.detail;
      typeof e == "number" && (this.surah = e), typeof s == "number" && (this.ayah = s);
    };
  }
  get _right() {
    return this.shadowRoot?.querySelector("quran-right-panel");
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("quran.goto", this._onGoto);
  }
  disconnectedCallback() {
    window.removeEventListener("quran.goto", this._onGoto), super.disconnectedCallback();
  }
  async loadVerse() {
    await this.updateComplete, await this._right?.loadVerse?.();
  }
  setProvider(t) {
    this._right?.setProvider?.(t), this.loadVerse();
  }
  render() {
    return g`
      <div class="layout">
        <quran-left-panel>
          <quran-surah-selector .value=${this.surah}></quran-surah-selector>
          <quran-goto></quran-goto>
          <quran-search-box></quran-search-box>
        </quran-left-panel>

        <quran-right-panel
          @quran-goto=${(t) => {
      this.surah = t.detail.surah, this.ayah = t.detail.ayah;
    }}
        ></quran-right-panel>
      </div>
    `;
  }
};
ut.styles = Pt;
let x = ut;
F([
  d({ type: Boolean, reflect: !0 })
], x.prototype, "usePanels");
F([
  d({ type: Number })
], x.prototype, "surah");
F([
  d({ type: Number })
], x.prototype, "ayah");
F([
  d({ type: String })
], x.prototype, "lang");
customElements.get("quran-viewer") || customElements.define("quran-viewer", x);
function ge(r) {
  if (console.log("📖 QuranViewer init dengan host version:", r.version), r.provider) {
    const t = document.querySelector("quran-view");
    t && t.setProvider(r.provider);
  }
}
export {
  x as default,
  ge as init
};
