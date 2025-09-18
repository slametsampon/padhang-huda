/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, V = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ft = (r) => new ot(typeof r == "string" ? r : r + "", void 0, B), ht = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce(((s, i, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1]), r[0]);
  return new ot(e, r, B);
}, $t = (r, t) => {
  if (V) r.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), i = R.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Z = V ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ft(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: mt, defineProperty: gt, getOwnPropertyDescriptor: yt, getOwnPropertyNames: _t, getOwnPropertySymbols: vt, getPrototypeOf: bt } = Object, L = globalThis, X = L.trustedTypes, At = X ? X.emptyScript : "", wt = L.reactiveElementPolyfillSupport, x = (r, t) => r, H = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? At : null;
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
} }, W = (r, t) => !mt(r, t), tt = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: W };
Symbol.metadata ??= Symbol("metadata"), L.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && gt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = yt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [..._t(e), ...vt(e)];
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
      for (const i of s) e.unshift(Z(i));
    } else t !== void 0 && e.push(Z(t));
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
    return $t(t, this.constructor.elementStyles), t;
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
      const a = (s.converter?.toAttribute !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : H;
      this._$Em = i;
      const h = n.fromAttribute(e, a.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, a = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? W)(a, e) || s.useDefault && s.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[x("elementProperties")] = /* @__PURE__ */ new Map(), b[x("finalized")] = /* @__PURE__ */ new Map(), wt?.({ ReactiveElement: b }), (L.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, N = K.trustedTypes, et = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, lt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + m, Et = `<${dt}>`, v = document, C = () => v.createComment(""), P = (r) => r === null || typeof r != "object" && typeof r != "function", Y = Array.isArray, St = (r) => Y(r) || typeof r?.[Symbol.iterator] == "function", I = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, g = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, at = /"/g, ct = /^(?:script|style|textarea|title)$/i, kt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), y = kt(1), w = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), _ = v.createTreeWalker(v, 129);
function ut(r, t) {
  if (!Y(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const xt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = k;
  for (let h = 0; h < e; h++) {
    const o = r[h];
    let d, u, l = -1, p = 0;
    for (; p < o.length && (n.lastIndex = p, u = n.exec(o), u !== null); ) p = n.lastIndex, n === k ? u[1] === "!--" ? n = st : u[1] !== void 0 ? n = it : u[2] !== void 0 ? (ct.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = g) : u[3] !== void 0 && (n = g) : n === g ? u[0] === ">" ? (n = i ?? k, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? g : u[3] === '"' ? at : rt) : n === at || n === rt ? n = g : n === st || n === it ? n = k : (n = g, i = void 0);
    const $ = n === g && r[h + 1].startsWith("/>") ? " " : "";
    a += n === k ? o + Et : l >= 0 ? (s.push(d), o.slice(0, l) + lt + o.slice(l) + m + $) : o + m + (l === -2 ? h : $);
  }
  return [ut(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const h = t.length - 1, o = this.parts, [d, u] = xt(t, e);
    if (this.el = M.createElement(d, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = _.nextNode()) !== null && o.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(lt)) {
          const p = u[n++], $ = i.getAttribute(l).split(m), j = /([.?@])?(.*)/.exec(p);
          o.push({ type: 1, index: a, name: j[2], strings: $, ctor: j[1] === "." ? Pt : j[1] === "?" ? Mt : j[1] === "@" ? Ut : q }), i.removeAttribute(l);
        } else l.startsWith(m) && (o.push({ type: 6, index: a }), i.removeAttribute(l));
        if (ct.test(i.tagName)) {
          const l = i.textContent.split(m), p = l.length - 1;
          if (p > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let $ = 0; $ < p; $++) i.append(l[$], C()), _.nextNode(), o.push({ type: 2, index: ++a });
            i.append(l[p], C());
          }
        }
      } else if (i.nodeType === 8) if (i.data === dt) o.push({ type: 2, index: a });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(m, l + 1)) !== -1; ) o.push({ type: 7, index: a }), l += m.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  if (t === w) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const a = P(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class Ct {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? v).importNode(e, !0);
    _.currentNode = i;
    let a = _.nextNode(), n = 0, h = 0, o = s[0];
    for (; o !== void 0; ) {
      if (n === o.index) {
        let d;
        o.type === 2 ? d = new O(a, a.nextSibling, this, t) : o.type === 1 ? d = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (d = new Ot(a, this, t)), this._$AV.push(d), o = s[++h];
      }
      n !== o?.index && (a = _.nextNode(), n++);
    }
    return _.currentNode = v, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class O {
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
    t = E(this, t, e), P(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = M.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const a = new Ct(i, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new O(this.O(C()), this.O(C()), this, this.options)) : s = e[i], s._$AI(a), i++;
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
class q {
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
    if (a === void 0) t = E(this, t, e, 0), n = !P(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
    else {
      const h = t;
      let o, d;
      for (t = a[0], o = 0; o < a.length - 1; o++) d = E(this, h[s + o], e, o), d === w && (d = this._$AH[o]), n ||= !P(d) || d !== this._$AH[o], d === c ? t = c : t !== c && (t += (d ?? "") + a[o + 1]), this._$AH[o] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Mt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ut extends q {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? c) === w) return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ot {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Tt = K.litHtmlPolyfillSupport;
Tt?.(M, O), (K.litHtmlVersions ??= []).push("3.3.1");
const jt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = e?.renderBefore ?? null;
    s._$litPart$ = i = new O(t.insertBefore(C(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis;
class A extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = jt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
A._$litElement$ = !0, A.finalized = !0, G.litElementHydrateSupport?.({ LitElement: A });
const Rt = G.litElementPolyfillSupport;
Rt?.({ LitElement: A });
(G.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: W }, Nt = (r = Ht, t, e) => {
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
function T(r) {
  return (t, e) => typeof e == "object" ? Nt(r, t, e) : ((s, i, a) => {
    const n = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(r) {
  return T({ ...r, state: !0, attribute: !1 });
}
const z = [
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
], zt = [
  {
    number: 1,
    name: {
      arabic: "الفاتحة",
      transliteration: "Al-Fatiha",
      translation: { id: "Pembukaan", en: "The Opening" }
    },
    revelation: "Meccan",
    ayahs: z.filter((r) => r.surah === 1)
  },
  {
    number: 2,
    name: {
      arabic: "البقرة",
      transliteration: "Al-Baqarah",
      translation: { id: "Sapi Betina", en: "The Cow" }
    },
    revelation: "Madinan",
    ayahs: z.filter((r) => r.surah === 2)
  }
];
class Lt {
  constructor() {
    this.verses = z, this.surahs = zt, this.index = new Map(this.verses.map((t) => [`${t.surah}:${t.ayah}`, t]));
  }
  async getVerse(t, e) {
    return this.index.get(`${t}:${e}`);
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
    return z;
  }
}
var qt = Object.defineProperty, pt = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && qt(t, e, i), i;
};
const J = class J extends A {
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
    return y`<input
      type="text"
      .value=${this.value}
      placeholder=${this.placeholder}
      @input=${this.onInput}
    />`;
  }
};
J.styles = ht`
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
    }
  `;
let U = J;
pt([
  T({ type: String })
], U.prototype, "placeholder");
pt([
  D()
], U.prototype, "value");
customElements.get("quran-search-box") || customElements.define("quran-search-box", U);
var Dt = Object.defineProperty, S = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && Dt(t, e, i), i;
};
const F = class F extends A {
  constructor() {
    super(...arguments), this.surah = 1, this.ayah = 1, this.lang = "id", this.provider = new Lt(), this.searchResults = [], this.loading = !1, this._onGoto = (t) => {
      const { surah: e, ayah: s } = t.detail;
      typeof e == "number" && (this.surah = e), typeof s == "number" && (this.ayah = s);
    }, this._onSearch = (t) => {
      const { query: e } = t.detail;
      this.runSearch(e);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("quran.goto", this._onGoto), window.addEventListener("quran.search", this._onSearch), this.loadVerse();
  }
  disconnectedCallback() {
    window.removeEventListener("quran.goto", this._onGoto), window.removeEventListener("quran.search", this._onSearch), super.disconnectedCallback();
  }
  updated(t) {
    (t.has("surah") || t.has("ayah") || t.has("lang")) && this.loadVerse();
  }
  async loadVerse() {
    this.loading = !0, this.verse = await this.provider.getVerse(this.surah, this.ayah), this.loading = !1;
  }
  async runSearch(t) {
    if (!t) {
      this.searchResults = [];
      return;
    }
    this.loading = !0;
    const e = await this.provider.getAllVerses();
    this.searchResults = e.filter(
      (s) => s.translations[this.lang]?.toLowerCase().includes(t.toLowerCase())
    ), this.loading = !1;
  }
  nextAyah() {
    this.ayah++;
  }
  prevAyah() {
    this.ayah > 1 && this.ayah--;
  }
  render() {
    return y`
      <h2>📖 Qur’an Viewer</h2>
      <quran-search-box></quran-search-box>

      ${this.loading ? y`<div class="loading">⏳ Loading…</div>` : this.searchResults.length > 0 ? y`
            <div class="search-results">
              ${this.searchResults.map(
      (t) => y`
                  <div class="result">
                    <div><strong>${t.surah}:${t.ayah}</strong></div>
                    <div class="ayah" lang="ar" dir="rtl">${t.text.arabic}</div>
                    <div class="translation">
                      ${t.translations[this.lang] ?? "[Terjemahan tidak tersedia]"}
                    </div>
                  </div>
                `
    )}
            </div>
          ` : this.verse ? y`
            <div class="ayah" lang="ar" dir="rtl">
              ${this.verse?.text?.arabic ?? ""}
            </div>
            <div class="translation">
              ${this.verse?.translations?.[this.lang] ?? "[Terjemahan tidak tersedia]"}
            </div>
            <div class="nav-buttons">
              <button @click=${this.prevAyah}>◀️ Prev</button>
              <button @click=${this.nextAyah}>Next ▶️</button>
            </div>
          ` : y`
            <div class="not-found">
              📭 Ayat ${this.surah}:${this.ayah} tidak ditemukan.
            </div>
          `}
    `;
  }
  setProvider(t) {
    this.provider = t, this.loadVerse();
  }
};
F.styles = ht`
    @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');

    :host {
      display: block;
      padding: 1rem;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      max-width: 700px;
      margin: auto;
    }
    h2 {
      margin-top: 0;
      font-size: 1.25rem;
      text-align: center;
    }
    .ayah {
      font-family: 'Amiri', serif;
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
      direction: rtl;
      text-align: right;
      line-height: 2.25rem;
    }
    .translation {
      color: #333;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .not-found {
      color: #900;
      font-style: italic;
      text-align: center;
    }
    .loading {
      text-align: center;
      font-style: italic;
      color: #555;
    }
    .nav-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 1rem;
    }
    button {
      padding: 0.4rem 0.9rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    button:hover {
      background: #eee;
    }
    .search-results {
      margin-top: 1rem;
    }
    .result {
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    .result .ayah {
      font-size: 1.25rem;
    }
    @media (max-width: 600px) {
      :host {
        padding: 0.5rem;
      }
      .ayah {
        font-size: 1.5rem;
      }
      .translation {
        font-size: 0.9rem;
      }
    }
  `;
let f = F;
S([
  T({ type: Number })
], f.prototype, "surah");
S([
  T({ type: Number })
], f.prototype, "ayah");
S([
  T({ type: String })
], f.prototype, "lang");
S([
  D()
], f.prototype, "verse");
S([
  D()
], f.prototype, "searchResults");
S([
  D()
], f.prototype, "loading");
customElements.get("quran-viewer") || customElements.define("quran-viewer", f);
function Bt(r) {
  if (console.log("📖 QuranViewer init dengan host version:", r.version), r.provider) {
    const t = document.querySelector("quran-view");
    t && t.setProvider(r.provider);
  }
}
export {
  f as default,
  Bt as init
};
