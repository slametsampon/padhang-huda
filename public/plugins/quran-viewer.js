/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, I = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = Symbol(), X = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (I && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = X.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && X.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (i) => new lt(typeof i == "string" ? i : i + "", void 0, B), ct = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce(((s, r, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1]), i[0]);
  return new lt(e, i, B);
}, _t = (i, t) => {
  if (I) i.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), r = R.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, Y = I ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: gt, defineProperty: yt, getOwnPropertyDescriptor: vt, getOwnPropertyNames: bt, getOwnPropertySymbols: At, getPrototypeOf: wt } = Object, V = globalThis, tt = V.trustedTypes, St = tt ? tt.emptyScript : "", Et = V.reactiveElementPolyfillSupport, C = (i, t) => i, H = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? St : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Q = (i, t) => !gt(i, t), et = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && yt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = vt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: r, set(a) {
      const h = r?.call(this);
      n?.call(this, a), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = wt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, s = [...bt(e), ...At(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(Y(r));
    } else t !== void 0 && e.push(Y(t));
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
    return _t(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : H;
      this._$Em = r;
      const h = a.fromAttribute(e, n.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const r = this.constructor, n = this[t];
      if (s ??= r.getPropertyOptions(t), !((s.hasChanged ?? Q)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, h = this[r];
        a !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, n, h);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), Et?.({ ReactiveElement: A }), (V.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, z = W.trustedTypes, st = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, dt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + m, Pt = `<${ut}>`, v = document, k = () => v.createComment(""), U = (i) => i === null || typeof i != "object" && typeof i != "function", F = Array.isArray, xt = (i) => F(i) || typeof i?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, it = />/g, _ = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, at = /"/g, pt = /^(?:script|style|textarea|title)$/i, Ct = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), g = Ct(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), y = v.createTreeWalker(v, 129);
function ft(i, t) {
  if (!F(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st !== void 0 ? st.createHTML(t) : t;
}
const kt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = x;
  for (let h = 0; h < e; h++) {
    const o = i[h];
    let c, u, l = -1, p = 0;
    for (; p < o.length && (a.lastIndex = p, u = a.exec(o), u !== null); ) p = a.lastIndex, a === x ? u[1] === "!--" ? a = rt : u[1] !== void 0 ? a = it : u[2] !== void 0 ? (pt.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = _) : u[3] !== void 0 && (a = _) : a === _ ? u[0] === ">" ? (a = r ?? x, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? _ : u[3] === '"' ? at : nt) : a === at || a === nt ? a = _ : a === rt || a === it ? a = x : (a = _, r = void 0);
    const $ = a === _ && i[h + 1].startsWith("/>") ? " " : "";
    n += a === x ? o + Pt : l >= 0 ? (s.push(c), o.slice(0, l) + dt + o.slice(l) + m + $) : o + m + (l === -2 ? h : $);
  }
  return [ft(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const h = t.length - 1, o = this.parts, [c, u] = kt(t, e);
    if (this.el = O.createElement(c, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && o.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(dt)) {
          const p = u[a++], $ = r.getAttribute(l).split(m), j = /([.?@])?(.*)/.exec(p);
          o.push({ type: 1, index: n, name: j[2], strings: $, ctor: j[1] === "." ? Ot : j[1] === "?" ? Tt : j[1] === "@" ? Mt : L }), r.removeAttribute(l);
        } else l.startsWith(m) && (o.push({ type: 6, index: n }), r.removeAttribute(l));
        if (pt.test(r.tagName)) {
          const l = r.textContent.split(m), p = l.length - 1;
          if (p > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let $ = 0; $ < p; $++) r.append(l[$], k()), y.nextNode(), o.push({ type: 2, index: ++n });
            r.append(l[p], k());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ut) o.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(m, l + 1)) !== -1; ) o.push({ type: 7, index: n }), l += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  if (t === S) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = E(i, r._$AS(i, t.values), r, s)), t;
}
class Ut {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? v).importNode(e, !0);
    y.currentNode = r;
    let n = y.nextNode(), a = 0, h = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let c;
        o.type === 2 ? c = new M(n, n.nextSibling, this, t) : o.type === 1 ? c = new o.ctor(n, o.name, o.strings, this, t) : o.type === 6 && (c = new Nt(n, this, t)), this._$AV.push(c), o = s[++h];
      }
      a !== o?.index && (n = y.nextNode(), a++);
    }
    return y.currentNode = v, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = E(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(ft(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new Ut(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new M(this.O(k()), this.O(k()), this, this.options)) : s = e[r], s._$AI(n), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
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
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = E(this, t, e, 0), a = !U(t) || t !== this._$AH && t !== S, a && (this._$AH = t);
    else {
      const h = t;
      let o, c;
      for (t = n[0], o = 0; o < n.length - 1; o++) c = E(this, h[s + o], e, o), c === S && (c = this._$AH[o]), a ||= !U(c) || c !== this._$AH[o], c === d ? t = d : t !== d && (t += (c ?? "") + n[o + 1]), this._$AH[o] = c;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ot extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Tt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Mt extends L {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === S) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
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
const jt = W.litHtmlPolyfillSupport;
jt?.(O, M), (W.litHtmlVersions ??= []).push("3.3.1");
const Rt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = r = new M(t.insertBefore(k(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis;
class w extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return S;
  }
}
w._$litElement$ = !0, w.finalized = !0, G.litElementHydrateSupport?.({ LitElement: w });
const Ht = G.litElementPolyfillSupport;
Ht?.({ LitElement: w });
(G.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: Q }, Vt = (i = zt, t, e) => {
  const { kind: s, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: a } = e;
    return { set(h) {
      const o = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(a, o, i);
    }, init(h) {
      return h !== void 0 && this.C(a, void 0, i, h), h;
    } };
  }
  if (s === "setter") {
    const { name: a } = e;
    return function(h) {
      const o = this[a];
      t.call(this, h), this.requestUpdate(a, o, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function N(i) {
  return (t, e) => typeof e == "object" ? Vt(i, t, e) : ((s, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(i) {
  return N({ ...i, state: !0, attribute: !1 });
}
class Lt {
  constructor(t) {
    this.baseUrl = t.baseUrl.replace(/\/+$/, ""), this.timeoutMs = t.timeoutMs ?? 8e3, this.fetchFn = t.fetchFn ?? fetch;
  }
  async _getJSON(t) {
    const e = new AbortController(), s = setTimeout(() => e.abort(), this.timeoutMs);
    try {
      const r = await this.fetchFn(t, { signal: e.signal });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } finally {
      clearTimeout(s);
    }
  }
  async getVerse(t, e) {
    const s = await this._getJSON(
      `${this.baseUrl}/verse?surah=${t}&ayah=${e}`
    );
    return {
      surah: s.surah,
      ayah: s.ayah,
      text: { arabic: s.text_ar, uthmani: s.text_uth },
      translations: { id: s.tr_id ?? "", en: s.tr_en ?? "" },
      meta: { juz: s.juz, page: s.page }
    };
  }
  async getSurah(t) {
    const e = await this._getJSON(`${this.baseUrl}/surah/${t}`);
    return {
      number: e.number,
      name: {
        arabic: e.name_ar,
        transliteration: e.translit,
        translation: { en: e.name_en }
        // tambahkan {id: ...} jika backend punya
      },
      revelation: e.revelation,
      ayahs: e.ayahs.map((s) => ({
        surah: s.surah,
        ayah: s.ayah,
        text: { arabic: s.text_ar },
        translations: { id: s.tr_id ?? "", en: s.tr_en ?? "" },
        meta: { juz: s.juz, page: s.page }
      }))
    };
  }
  async search(t, e = "id") {
    return (await this._getJSON(
      `${this.baseUrl}/search?q=${encodeURIComponent(t)}&lang=${e}`
    )).map((r) => ({
      surah: r.surah,
      ayah: r.ayah,
      text: { arabic: r.text_ar },
      translations: { [e]: r.tr ?? "" },
      meta: { juz: r.juz, page: r.page }
    }));
  }
  async getAllVerses() {
    const t = [];
    for (let e = 1; e <= 114; e++)
      try {
        const s = await this.getSurah(e);
        s?.ayahs && t.push(...s.ayahs);
      } catch {
      }
    return t;
  }
}
function ht() {
  return typeof process < "u" && process.versions?.node;
}
class D {
  async getSurah(t) {
    console.log("[JsonQuranProvider] getSurah →", t);
    const s = (await this.loadChapters()).find((r) => r.id === t);
    if (!s) {
      console.warn(`[JsonQuranProvider] Surah ${t} tidak ditemukan`);
      return;
    }
    return {
      number: s.id,
      name: {
        arabic: s.name_arabic,
        transliteration: s.name_simple,
        translation: { en: s.translated_name.name }
      },
      revelation: s.revelation_place === "makka" ? "Meccan" : "Madinan"
    };
  }
  async getVerse(t, e) {
    console.log(`[JsonQuranProvider] getVerse → ${t}:${e}`);
    const r = (await this.loadVerses(t)).find(
      (n) => parseInt(n.verse_key.split(":")[1], 10) === e
    );
    if (!r) {
      console.warn(`[JsonQuranProvider] Ayah ${t}:${e} tidak ditemukan`);
      return;
    }
    return this.mapVerse(r);
  }
  async search(t, e = "english") {
    console.log(`[JsonQuranProvider] search → "${t}", lang=${e}`);
    const s = [], r = await this.loadChapters();
    for (const n of r)
      try {
        const a = await this.loadVerses(n.id);
        for (const h of a) {
          const o = h.translations.find(
            (c) => c.language_name.toLowerCase() === e.toLowerCase()
          );
          (h.text_uthmani.includes(t) || o && o.text.includes(t)) && s.push(this.mapVerse(h));
        }
      } catch (a) {
        console.warn(
          `[JsonQuranProvider] Skip surah ${n.id}, error loadVerses:`,
          a
        );
        continue;
      }
    return console.log(`[JsonQuranProvider] search result count = ${s.length}`), s;
  }
  async getAllVerses() {
    console.log("[JsonQuranProvider] getAllVerses");
    const t = await this.loadChapters(), e = [];
    for (const s of t)
      try {
        const r = await this.loadVerses(s.id);
        e.push(...r.map((n) => this.mapVerse(n)));
      } catch (r) {
        console.warn(
          `[JsonQuranProvider] Skip surah ${s.id}, error loadVerses:`,
          r
        );
        continue;
      }
    return console.log(
      `[JsonQuranProvider] getAllVerses total loaded = ${e.length}`
    ), e;
  }
  // === Private helpers ===
  async loadChapters() {
    if (this.chaptersCache) return this.chaptersCache.chapters;
    if (ht()) {
      const t = await Promise.resolve().then(() => b), e = await Promise.resolve().then(() => b), { fileURLToPath: s } = await Promise.resolve().then(() => b), r = s(import.meta.url), n = e.dirname(r), a = e.resolve(n, "../../public/chapters.json"), h = t.readFileSync(a, "utf-8"), o = JSON.parse(h);
      return this.chaptersCache = o, o.chapters;
    } else {
      const t = "/quran-data/chapters.json";
      console.log("[JsonQuranProvider] loadChapters (browser) fetch:", t);
      const s = await (await fetch(t)).json();
      return this.chaptersCache = s, s.chapters;
    }
  }
  async loadVerses(t) {
    if (ht()) {
      const e = await Promise.resolve().then(() => b), s = await Promise.resolve().then(() => b), { fileURLToPath: r } = await Promise.resolve().then(() => b), n = r(import.meta.url), a = s.dirname(n), h = s.resolve(
        a,
        `../../public/verses-surah-${t}.json`
      ), o = e.readFileSync(h, "utf-8");
      return JSON.parse(o).verses;
    } else {
      const e = `/quran-data/verses-surah-${t}.json`;
      return console.log("[JsonQuranProvider] loadVerses (browser) fetch:", e), (await (await fetch(e)).json()).verses;
    }
  }
  mapVerse(t) {
    return {
      surah: t.chapter_id,
      ayah: parseInt(t.verse_key.split(":")[1], 10),
      text: { arabic: t.text_uthmani },
      translations: t.translations.map(
        (e) => ({
          id: e.id,
          language_name: e.language_name,
          text: e.text
        })
      ),
      meta: {
        juz: t.juz_number,
        page: t.page_number,
        hizb: t.hizb_number,
        rubElHizb: t.rub_el_hizb_number,
        sajdah: t.sajdah
      }
    };
  }
}
function qt(i) {
  switch (i.dataProvider) {
    case "api": {
      const t = i.providers?.api?.baseUrl;
      return t ? new Lt({
        baseUrl: t,
        timeoutMs: i.providers?.api?.timeoutMs
      }) : (console.warn(
        "⚠️ Missing providers.api.baseUrl, fallback to mock JSON."
      ), new D());
    }
    case "db":
      return console.warn("⚠️ DB provider not implemented. Fallback to mock JSON."), new D();
    case "mock":
    default:
      return new D();
  }
}
var Jt = Object.defineProperty, $t = (i, t, e, s) => {
  for (var r = void 0, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (r = a(t, e, r) || r);
  return r && Jt(t, e, r), r;
};
const K = class K extends w {
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
K.styles = ct`
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
let T = K;
$t([
  N({ type: String })
], T.prototype, "placeholder");
$t([
  q()
], T.prototype, "value");
customElements.get("quran-search-box") || customElements.define("quran-search-box", T);
var Dt = Object.defineProperty, P = (i, t, e, s) => {
  for (var r = void 0, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (r = a(t, e, r) || r);
  return r && Dt(t, e, r), r;
};
const Z = class Z extends w {
  constructor() {
    super(...arguments), this.surah = 1, this.ayah = 1, this.lang = "id", this.provider = qt({
      dataProvider: "mock"
    }), this.searchResults = [], this.loading = !1, this._onGoto = (t) => {
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
      (s) => this.getTranslation(s, this.lang).toLowerCase().includes(t.toLowerCase())
    ), this.loading = !1;
  }
  nextAyah() {
    this.ayah++;
  }
  prevAyah() {
    this.ayah > 1 && this.ayah--;
  }
  // 🔹 Helper anti-break untuk translations
  getTranslation(t, e) {
    const s = t.translations;
    return s ? Array.isArray(s) ? s.find(
      (n) => n.language_name?.toLowerCase().startsWith(e.toLowerCase())
    )?.text ?? "[Terjemahan tidak tersedia]" : s[e] ?? "[Terjemahan tidak tersedia]" : "[Terjemahan tidak tersedia]";
  }
  render() {
    return g`
      <h2>📖 Qur’an Viewer</h2>
      <quran-search-box></quran-search-box>

      ${this.loading ? g`<div class="loading">⏳ Loading…</div>` : this.searchResults.length > 0 ? g`
            <div class="search-results">
              ${this.searchResults.map(
      (t) => g`
                  <div class="result">
                    <div><strong>${t.surah}:${t.ayah}</strong></div>
                    <div class="ayah" lang="ar" dir="rtl">${t.text.arabic}</div>
                    <div class="translation">
                      ${this.getTranslation(t, this.lang)}
                    </div>
                  </div>
                `
    )}
            </div>
          ` : this.verse ? g`
            <div class="ayah" lang="ar" dir="rtl">
              ${this.verse?.text?.arabic ?? ""}
            </div>
            <div class="translation">
              ${this.getTranslation(this.verse, this.lang)}
            </div>
            <div class="nav-buttons">
              <button @click=${this.prevAyah}>◀️ Prev</button>
              <button @click=${this.nextAyah}>Next ▶️</button>
            </div>
          ` : g`
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
Z.styles = ct`
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
let f = Z;
P([
  N({ type: Number })
], f.prototype, "surah");
P([
  N({ type: Number })
], f.prototype, "ayah");
P([
  N({ type: String })
], f.prototype, "lang");
P([
  q()
], f.prototype, "verse");
P([
  q()
], f.prototype, "searchResults");
P([
  q()
], f.prototype, "loading");
customElements.get("quran-viewer") || customElements.define("quran-viewer", f);
function Qt(i) {
  if (console.log("📖 QuranViewer init dengan host version:", i.version), i.provider) {
    const t = document.querySelector("quran-view");
    t && t.setProvider(i.provider);
  }
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as default,
  Qt as init
};
