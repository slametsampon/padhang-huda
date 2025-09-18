/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, W = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), it = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (W && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = it.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && it.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (a) => new ft(typeof a == "string" ? a : a + "", void 0, F), L = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce(((s, r, i) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + a[i + 1]), a[0]);
  return new ft(e, a, F);
}, At = (a, t) => {
  if (W) a.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), r = z.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, a.appendChild(s);
  }
}, at = W ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return bt(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wt, defineProperty: Et, getOwnPropertyDescriptor: St, getOwnPropertyNames: xt, getOwnPropertySymbols: Ct, getPrototypeOf: Pt } = Object, J = globalThis, nt = J.trustedTypes, kt = nt ? nt.emptyScript : "", Tt = J.reactiveElementPolyfillSupport, U = (a, t) => a, q = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? kt : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch {
        e = null;
      }
  }
  return e;
} }, G = (a, t) => !wt(a, t), ot = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: G };
Symbol.metadata ??= Symbol("metadata"), J.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Et(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: i } = St(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const h = r?.call(this);
      i?.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Pt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...xt(e), ...Ct(e)];
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
      for (const r of s) e.unshift(at(r));
    } else t !== void 0 && e.push(at(t));
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
    return At(t, this.constructor.elementStyles), t;
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
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : q).toAttribute(e, s.type);
      this._$Em = t, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const i = s.getPropertyOptions(r), n = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : q;
      this._$Em = r;
      const h = n.fromAttribute(e, i.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const r = this.constructor, i = this[t];
      if (s ??= r.getPropertyOptions(t), !((s.hasChanged ?? G)(i, e) || s.useDefault && s.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: i }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), i !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, i] of s) {
        const { wrapped: n } = i, h = this[r];
        n !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, i, h);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[U("elementProperties")] = /* @__PURE__ */ new Map(), w[U("finalized")] = /* @__PURE__ */ new Map(), Tt?.({ ReactiveElement: w }), (J.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, V = K.trustedTypes, ht = V ? V.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, $t = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + g, Ut = `<${gt}>`, b = document, O = () => b.createComment(""), j = (a) => a === null || typeof a != "object" && typeof a != "function", Z = Array.isArray, Ot = (a) => Z(a) || typeof a?.[Symbol.iterator] == "function", I = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ct = />/g, y = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, ut = /"/g, _t = /^(?:script|style|textarea|title)$/i, jt = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), p = jt(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), v = b.createTreeWalker(b, 129);
function yt(a, t) {
  if (!Z(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Nt = (a, t) => {
  const e = a.length - 1, s = [];
  let r, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = T;
  for (let h = 0; h < e; h++) {
    const o = a[h];
    let c, u, l = -1, m = 0;
    for (; m < o.length && (n.lastIndex = m, u = n.exec(o), u !== null); ) m = n.lastIndex, n === T ? u[1] === "!--" ? n = lt : u[1] !== void 0 ? n = ct : u[2] !== void 0 ? (_t.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = y) : u[3] !== void 0 && (n = y) : n === y ? u[0] === ">" ? (n = r ?? T, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? y : u[3] === '"' ? ut : dt) : n === ut || n === dt ? n = y : n === lt || n === ct ? n = T : (n = y, r = void 0);
    const $ = n === y && a[h + 1].startsWith("/>") ? " " : "";
    i += n === T ? o + Ut : l >= 0 ? (s.push(c), o.slice(0, l) + $t + o.slice(l) + g + $) : o + g + (l === -2 ? h : $);
  }
  return [yt(a, i + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let i = 0, n = 0;
    const h = t.length - 1, o = this.parts, [c, u] = Nt(t, e);
    if (this.el = N.createElement(c, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = v.nextNode()) !== null && o.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith($t)) {
          const m = u[n++], $ = r.getAttribute(l).split(g), H = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: i, name: H[2], strings: $, ctor: H[1] === "." ? Rt : H[1] === "?" ? Ht : H[1] === "@" ? zt : D }), r.removeAttribute(l);
        } else l.startsWith(g) && (o.push({ type: 6, index: i }), r.removeAttribute(l));
        if (_t.test(r.tagName)) {
          const l = r.textContent.split(g), m = l.length - 1;
          if (m > 0) {
            r.textContent = V ? V.emptyScript : "";
            for (let $ = 0; $ < m; $++) r.append(l[$], O()), v.nextNode(), o.push({ type: 2, index: ++i });
            r.append(l[m], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === gt) o.push({ type: 2, index: i });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(g, l + 1)) !== -1; ) o.push({ type: 7, index: i }), l += g.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(a, t, e = a, s) {
  if (t === E) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const i = j(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(a), r._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = S(a, r._$AS(a, t.values), r, s)), t;
}
class Mt {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? b).importNode(e, !0);
    v.currentNode = r;
    let i = v.nextNode(), n = 0, h = 0, o = s[0];
    for (; o !== void 0; ) {
      if (n === o.index) {
        let c;
        o.type === 2 ? c = new R(i, i.nextSibling, this, t) : o.type === 1 ? c = new o.ctor(i, o.name, o.strings, this, t) : o.type === 6 && (c = new qt(i, this, t)), this._$AV.push(c), o = s[++h];
      }
      n !== o?.index && (i = v.nextNode(), n++);
    }
    return v.currentNode = b, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class R {
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
    t = S(this, t, e), j(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const i = new Mt(r, this), n = i.u(this.options);
      i.p(e), this.T(n), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const i of t) r === e.length ? e.push(s = new R(this.O(O()), this.O(O()), this, this.options)) : s = e[r], s._$AI(i), r++;
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
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, i) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const i = this.strings;
    let n = !1;
    if (i === void 0) t = S(this, t, e, 0), n = !j(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let o, c;
      for (t = i[0], o = 0; o < i.length - 1; o++) c = S(this, h[s + o], e, o), c === E && (c = this._$AH[o]), n ||= !j(c) || c !== this._$AH[o], c === d ? t = d : t !== d && (t += (c ?? "") + i[o + 1]), this._$AH[o] = c;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ht extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class zt extends D {
  constructor(t, e, s, r, i) {
    super(t, e, s, r, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? d) === E) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Vt = K.litHtmlPolyfillSupport;
Vt?.(N, R), (K.litHtmlVersions ??= []).push("3.3.1");
const Lt = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const i = e?.renderBefore ?? null;
    s._$litPart$ = r = new R(t.insertBefore(O(), i), i, void 0, e ?? {});
  }
  return r._$AI(a), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis;
class _ extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Lt(e, this.renderRoot, this.renderOptions);
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
}
_._$litElement$ = !0, _.finalized = !0, X.litElementHydrateSupport?.({ LitElement: _ });
const Jt = X.litElementPolyfillSupport;
Jt?.({ LitElement: _ });
(X.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: G }, It = (a = Dt, t, e) => {
  const { kind: s, metadata: r } = e;
  let i = globalThis.litPropertyMetadata.get(r);
  if (i === void 0 && globalThis.litPropertyMetadata.set(r, i = /* @__PURE__ */ new Map()), s === "setter" && ((a = Object.create(a)).wrapped = !0), i.set(e.name, a), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const o = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, o, a);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, a, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const o = this[n];
      t.call(this, h), this.requestUpdate(n, o, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function C(a) {
  return (t, e) => typeof e == "object" ? It(a, t, e) : ((s, r, i) => {
    const n = r.hasOwnProperty(i);
    return r.constructor.createProperty(i, s), n ? Object.getOwnPropertyDescriptor(r, i) : void 0;
  })(a, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(a) {
  return C({ ...a, state: !0, attribute: !1 });
}
class Bt {
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
function mt() {
  return typeof process < "u" && process.versions?.node;
}
class B {
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
      (i) => parseInt(i.verse_key.split(":")[1], 10) === e
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
    for (const i of r)
      try {
        const n = await this.loadVerses(i.id);
        for (const h of n) {
          const o = h.translations.find(
            (c) => c.language_name.toLowerCase() === e.toLowerCase()
          );
          (h.text_uthmani.includes(t) || o && o.text.includes(t)) && s.push(this.mapVerse(h));
        }
      } catch (n) {
        console.warn(
          `[JsonQuranProvider] Skip surah ${i.id}, error loadVerses:`,
          n
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
        e.push(...r.map((i) => this.mapVerse(i)));
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
    if (mt()) {
      const t = await Promise.resolve().then(() => A), e = await Promise.resolve().then(() => A), { fileURLToPath: s } = await Promise.resolve().then(() => A), r = s(import.meta.url), i = e.dirname(r), n = e.resolve(i, "../../public/chapters.json"), h = t.readFileSync(n, "utf-8"), o = JSON.parse(h);
      return this.chaptersCache = o, o.chapters;
    } else {
      const t = "/quran-data/chapters.json";
      console.log("[JsonQuranProvider] loadChapters (browser) fetch:", t);
      const s = await (await fetch(t)).json();
      return this.chaptersCache = s, s.chapters;
    }
  }
  async loadVerses(t) {
    if (mt()) {
      const e = await Promise.resolve().then(() => A), s = await Promise.resolve().then(() => A), { fileURLToPath: r } = await Promise.resolve().then(() => A), i = r(import.meta.url), n = s.dirname(i), h = s.resolve(
        n,
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
function Qt(a) {
  switch (a.dataProvider) {
    case "api": {
      const t = a.providers?.api?.baseUrl;
      return t ? new Bt({
        baseUrl: t,
        timeoutMs: a.providers?.api?.timeoutMs
      }) : (console.warn(
        "⚠️ Missing providers.api.baseUrl, fallback to mock JSON."
      ), new B());
    }
    case "db":
      return console.warn("⚠️ DB provider not implemented. Fallback to mock JSON."), new B();
    case "mock":
    default:
      return new B();
  }
}
var Wt = Object.defineProperty, vt = (a, t, e, s) => {
  for (var r = void 0, i = a.length - 1, n; i >= 0; i--)
    (n = a[i]) && (r = n(t, e, r) || r);
  return r && Wt(t, e, r), r;
};
const tt = class tt extends _ {
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
    return p`<input
      type="text"
      .value=${this.value}
      placeholder=${this.placeholder}
      @input=${this.onInput}
    />`;
  }
};
tt.styles = L`
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
let M = tt;
vt([
  C({ type: String })
], M.prototype, "placeholder");
vt([
  P()
], M.prototype, "value");
customElements.get("quran-search-box") || customElements.define("quran-search-box", M);
var Ft = Object.defineProperty, Y = (a, t, e, s) => {
  for (var r = void 0, i = a.length - 1, n; i >= 0; i--)
    (n = a[i]) && (r = n(t, e, r) || r);
  return r && Ft(t, e, r), r;
};
const et = class et extends _ {
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
    return p`
      <div class="row">
        <label for="surahSel">Surah:</label>
        <select
          id="surahSel"
          @change=${this.onChange}
          .value=${String(this.value)}
        >
          ${this.chapters.map(
      (t) => p`<option value=${t.id}>
                ${t.id}. ${t.name_simple} — ${t.name_arabic}
              </option>`
    )}
        </select>
        ${this.loading ? p`<span>⏳</span>` : null}
      </div>
    `;
  }
};
et.styles = L`
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
let x = et;
Y([
  C({ type: Number })
], x.prototype, "value");
Y([
  P()
], x.prototype, "chapters");
Y([
  P()
], x.prototype, "loading");
customElements.get("quran-surah-selector") || customElements.define("quran-surah-selector", x);
const st = class st extends _ {
  onSubmit(t) {
    t.preventDefault();
    const r = (this.shadowRoot?.querySelector("input")?.value || "").trim().match(/^(\d{1,3}):(\d{1,3})$/);
    if (!r) {
      alert('Format harus "surah:ayat", misal 2:255');
      return;
    }
    const i = Number(r[1]), n = Number(r[2]);
    window.dispatchEvent(
      new CustomEvent("quran.goto", { detail: { surah: i, ayah: n } })
    );
  }
  render() {
    return p`
      <form @submit=${this.onSubmit}>
        <label>Go to:</label>
        <input placeholder="2:255" aria-label="Go to surah:ayah" />
        <button type="submit">Go</button>
      </form>
    `;
  }
};
st.styles = L`
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
let Q = st;
customElements.get("quran-goto") || customElements.define("quran-goto", Q);
var Gt = Object.defineProperty, k = (a, t, e, s) => {
  for (var r = void 0, i = a.length - 1, n; i >= 0; i--)
    (n = a[i]) && (r = n(t, e, r) || r);
  return r && Gt(t, e, r), r;
};
const rt = class rt extends _ {
  constructor() {
    super(...arguments), this.surah = 1, this.ayah = 1, this.lang = "id", this.provider = Qt({
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
      (i) => i.language_name?.toLowerCase().startsWith(e.toLowerCase())
    )?.text ?? "[Terjemahan tidak tersedia]" : s[e] ?? "[Terjemahan tidak tersedia]" : "[Terjemahan tidak tersedia]";
  }
  async copyCurrent() {
    const t = `${this.surah}:${this.ayah}`, e = this.verse?.text?.arabic ?? "", s = this.verse ? this.getTranslation(this.verse, this.lang) : "[Terjemahan tidak tersedia]", r = s ? `${e}
${s}
(${t})` : `${e}
(${t})`;
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(r);
      else {
        const i = document.createElement("textarea");
        i.value = r, i.style.position = "fixed", i.style.left = "-9999px", document.body.appendChild(i), i.select(), document.execCommand("copy"), document.body.removeChild(i);
      }
      console.log("[QuranViewer] Copied:", t);
    } catch (i) {
      console.warn("[QuranViewer] Copy failed:", i), alert("Gagal menyalin teks.");
    }
  }
  render() {
    return p`
      <!-- NEW: Selector Surah + Goto -->
      <quran-surah-selector .value=${this.surah}></quran-surah-selector>
      <quran-goto></quran-goto>

      <h2>📖 Qur’an Viewer</h2>
      <quran-search-box></quran-search-box>

      ${this.loading ? p`<div class="loading">⏳ Loading…</div>` : this.searchResults.length > 0 ? p`
            <div class="search-results">
              ${this.searchResults.map(
      (t) => p`
                  <div class="result">
                    <div><strong>${t.surah}:${t.ayah}</strong></div>
                    <div class="ayah" lang="ar" dir="rtl">${t.text.arabic}</div>
                    <div class="translation">
                      ${this.verse ? this.getTranslation(this.verse, this.lang) : "[Terjemahan tidak tersedia]"}
                      ?? v.translations?.[this.lang] ?? '[Terjemahan tidak
                      tersedia]'
                    </div>
                  </div>
                `
    )}
            </div>
          ` : this.verse ? p`
            <div class="ayah" lang="ar" dir="rtl">
              ${this.verse?.text?.arabic ?? ""}
            </div>
            <div class="translation">
              ${this.verse ? this.getTranslation(this.verse, this.lang) : "[Terjemahan tidak tersedia]"}
              ?? this.verse?.translations?.[this.lang] ?? '[Terjemahan tidak
              tersedia]'
            </div>
            <div class="nav-buttons">
              <button @click=${this.prevAyah}>◀️ Prev</button>
              <!-- NEW: Copy ditempatkan di tengah agar last-child tetap Next -->
              <button @click=${this.copyCurrent}>📋 Copy</button>
              <button @click=${this.nextAyah}>Next ▶️</button>
            </div>
          ` : p`
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
rt.styles = L`
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
let f = rt;
k([
  C({ type: Number })
], f.prototype, "surah");
k([
  C({ type: Number })
], f.prototype, "ayah");
k([
  C({ type: String })
], f.prototype, "lang");
k([
  P()
], f.prototype, "verse");
k([
  P()
], f.prototype, "searchResults");
k([
  P()
], f.prototype, "loading");
customElements.get("quran-viewer") || customElements.define("quran-viewer", f);
function Xt(a) {
  if (console.log("📖 QuranViewer init dengan host version:", a.version), a.provider) {
    const t = document.querySelector("quran-view");
    t && t.setProvider(a.provider);
  }
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as default,
  Xt as init
};
