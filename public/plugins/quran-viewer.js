/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, G = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (G && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (r) => new yt(typeof r == "string" ? r : r + "", void 0, Q), N = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce(((s, i, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1]), r[0]);
  return new yt(e, r, Q);
}, xt = (r, t) => {
  if (G) r.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const s = document.createElement("style"), i = L.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, ht = G ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Et(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: St, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Pt, getOwnPropertySymbols: Tt, getPrototypeOf: Mt } = Object, B = globalThis, lt = B.trustedTypes, Ut = lt ? lt.emptyScript : "", Ot = B.reactiveElementPolyfillSupport, U = (r, t) => r, V = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ut : null;
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
} }, J = (r, t) => !kt(r, t), ct = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ??= Symbol("metadata"), B.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && St(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = Ct(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...Pt(e), ...Tt(e)];
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
      for (const i of s) e.unshift(ht(i));
    } else t !== void 0 && e.push(ht(t));
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
    return xt(t, this.constructor.elementStyles), t;
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
      const a = (s.converter?.toAttribute !== void 0 ? s.converter : V).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : V;
      this._$Em = i;
      const h = n.fromAttribute(e, a.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, a = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? J)(a, e) || s.useDefault && s.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[U("elementProperties")] = /* @__PURE__ */ new Map(), C[U("finalized")] = /* @__PURE__ */ new Map(), Ot?.({ ReactiveElement: C }), (B.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, D = Z.trustedTypes, ut = D ? D.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, vt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, bt = "?" + b, jt = `<${bt}>`, w = document, O = () => w.createComment(""), j = (r) => r === null || typeof r != "object" && typeof r != "function", X = Array.isArray, Ht = (r) => X(r) || typeof r?.[Symbol.iterator] == "function", F = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, pt = />/g, _ = RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, mt = /"/g, _t = /^(?:script|style|textarea|title)$/i, Rt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), g = Rt(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), A = w.createTreeWalker(w, 129);
function At(r, t) {
  if (!X(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Nt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = M;
  for (let h = 0; h < e; h++) {
    const o = r[h];
    let u, d, l = -1, $ = 0;
    for (; $ < o.length && (n.lastIndex = $, d = n.exec(o), d !== null); ) $ = n.lastIndex, n === M ? d[1] === "!--" ? n = dt : d[1] !== void 0 ? n = pt : d[2] !== void 0 ? (_t.test(d[2]) && (i = RegExp("</" + d[2], "g")), n = _) : d[3] !== void 0 && (n = _) : n === _ ? d[0] === ">" ? (n = i ?? M, l = -1) : d[1] === void 0 ? l = -2 : (l = n.lastIndex - d[2].length, u = d[1], n = d[3] === void 0 ? _ : d[3] === '"' ? mt : gt) : n === mt || n === gt ? n = _ : n === dt || n === pt ? n = M : (n = _, i = void 0);
    const v = n === _ && r[h + 1].startsWith("/>") ? " " : "";
    a += n === M ? o + jt : l >= 0 ? (s.push(u), o.slice(0, l) + vt + o.slice(l) + b + v) : o + b + (l === -2 ? h : v);
  }
  return [At(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const h = t.length - 1, o = this.parts, [u, d] = Nt(t, e);
    if (this.el = H.createElement(u, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = A.nextNode()) !== null && o.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(vt)) {
          const $ = d[n++], v = i.getAttribute(l).split(b), z = /([.?@])?(.*)/.exec($);
          o.push({ type: 1, index: a, name: z[2], strings: v, ctor: z[1] === "." ? zt : z[1] === "?" ? Lt : z[1] === "@" ? Vt : W }), i.removeAttribute(l);
        } else l.startsWith(b) && (o.push({ type: 6, index: a }), i.removeAttribute(l));
        if (_t.test(i.tagName)) {
          const l = i.textContent.split(b), $ = l.length - 1;
          if ($ > 0) {
            i.textContent = D ? D.emptyScript : "";
            for (let v = 0; v < $; v++) i.append(l[v], O()), A.nextNode(), o.push({ type: 2, index: ++a });
            i.append(l[$], O());
          }
        }
      } else if (i.nodeType === 8) if (i.data === bt) o.push({ type: 2, index: a });
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
function P(r, t, e = r, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const a = j(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = P(r, i._$AS(r, t.values), i, s)), t;
}
class qt {
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
        o.type === 2 ? u = new q(a, a.nextSibling, this, t) : o.type === 1 ? u = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (u = new Dt(a, this, t)), this._$AV.push(u), o = s[++h];
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
class q {
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
    t = P(this, t, e), j(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(At(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const a = new qt(i, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new q(this.O(O()), this.O(O()), this, this.options)) : s = e[i], s._$AI(a), i++;
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
    if (a === void 0) t = P(this, t, e, 0), n = !j(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let o, u;
      for (t = a[0], o = 0; o < a.length - 1; o++) u = P(this, h[s + o], e, o), u === E && (u = this._$AH[o]), n ||= !j(u) || u !== this._$AH[o], u === c ? t = c : t !== c && (t += (u ?? "") + a[o + 1]), this._$AH[o] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Lt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Vt extends W {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? c) === E) return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Dt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const It = Z.litHtmlPolyfillSupport;
It?.(H, q), (Z.litHtmlVersions ??= []).push("3.3.1");
const Bt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = e?.renderBefore ?? null;
    s._$litPart$ = i = new q(t.insertBefore(O(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis;
let y = class extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
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
y._$litElement$ = !0, y.finalized = !0, tt.litElementHydrateSupport?.({ LitElement: y });
const Wt = tt.litElementPolyfillSupport;
Wt?.({ LitElement: y });
(tt.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: J }, Kt = (r = Ft, t, e) => {
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
function p(r) {
  return (t, e) => typeof e == "object" ? Kt(r, t, e) : ((s, i, a) => {
    const n = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(r) {
  return p({ ...r, state: !0, attribute: !1 });
}
const I = [
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
], Yt = [
  {
    number: 1,
    name: {
      arabic: "الفاتحة",
      transliteration: "Al-Fatiha",
      translation: { id: "Pembukaan", en: "The Opening" }
    },
    revelation: "Meccan",
    ayahs: I.filter((r) => r.surah === 1)
  },
  {
    number: 2,
    name: {
      arabic: "البقرة",
      transliteration: "Al-Baqarah",
      translation: { id: "Sapi Betina", en: "The Cow" }
    },
    revelation: "Madinan",
    ayahs: I.filter((r) => r.surah === 2)
  }
];
class Gt {
  constructor() {
    this.verses = I, this.surahs = Yt, this.index = new Map(this.verses.map((t) => [`${t.surah}:${t.ayah}`, t]));
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
    return I;
  }
}
var Qt = Object.defineProperty, wt = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && Qt(t, e, i), i;
};
const st = class st extends y {
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
st.styles = N`
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
let R = st;
wt([
  p({ type: String })
], R.prototype, "placeholder");
wt([
  x()
], R.prototype, "value");
customElements.get("quran-search-box") || customElements.define("quran-search-box", R);
var Jt = Object.defineProperty, et = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && Jt(t, e, i), i;
};
const it = class it extends y {
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
it.styles = N`
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
let T = it;
et([
  p({ type: Number })
], T.prototype, "value");
et([
  x()
], T.prototype, "chapters");
et([
  x()
], T.prototype, "loading");
customElements.get("quran-surah-selector") || customElements.define("quran-surah-selector", T);
const rt = class rt extends y {
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
rt.styles = N`
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
let K = rt;
customElements.get("quran-goto") || customElements.define("quran-goto", K);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = { CHILD: 2 }, Xt = (r) => (...t) => ({ _$litDirective$: r, values: t });
class te {
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
class Y extends te {
  constructor(t) {
    if (super(t), this.it = c, t.type !== Zt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
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
Y.directiveName = "unsafeHTML", Y.resultType = 1;
const ee = Xt(Y);
var se = Object.defineProperty, k = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && se(t, e, i), i;
};
const at = class at extends y {
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
                ${ee(e(t(s, this.lang), this.lastQuery.trim()))}
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
at.styles = N`
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
let m = at;
k([
  p({ type: Array })
], m.prototype, "results");
k([
  p({ type: String })
], m.prototype, "lang");
k([
  p({ type: String })
], m.prototype, "lastQuery");
k([
  p({ attribute: !1 })
], m.prototype, "gotoFn");
k([
  p({ attribute: !1 })
], m.prototype, "copyFn");
k([
  p({ attribute: !1 })
], m.prototype, "getTranslation");
k([
  p({ attribute: !1 })
], m.prototype, "highlight");
customElements.get("quran-search-results") || customElements.define("quran-search-results", m);
const ie = N`
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

  .highlight {
    background-color: yellow;
    padding: 0 2px;
    border-radius: 2px;
  }

  .result-actions {
    margin-top: 0.3rem;
    text-align: right;
  }

  .result-actions button {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
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
class $t {
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
var re = Object.defineProperty, S = (r, t, e, s) => {
  for (var i = void 0, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (i = n(t, e, i) || i);
  return i && re(t, e, i), i;
};
const nt = class nt extends y {
  constructor() {
    super(...arguments), this.surah = 1, this.ayah = 1, this.lang = "id", this.provider = new Gt(), this.service = new $t(this.provider), this.searchResults = [], this.loading = !1, this.lastQuery = "", this._onGoto = (t) => {
      const { surah: e, ayah: s } = t.detail;
      typeof e == "number" && (this.surah = e), typeof s == "number" && (this.ayah = s);
    }, this._onSearch = (t) => {
      const { query: e } = t.detail;
      this.runSearch(e);
    }, this.goto = (t, e) => {
      this.surah = t, this.ayah = e, this.searchResults = [];
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
  nextAyah() {
    this.ayah++;
  }
  prevAyah() {
    this.ayah > 1 && this.ayah--;
  }
  // === Render ===
  render() {
    return g`
      <quran-surah-selector .value=${this.surah}></quran-surah-selector>
      <quran-goto></quran-goto>

      <h2>📖 Qur’an Viewer</h2>
      <quran-search-box></quran-search-box>

      ${this.loading ? g`<div class="loading">⏳ Loading…</div>` : this.searchResults.length > 0 ? g`
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
          `}
    `;
  }
  // === Public API ===
  setProvider(t) {
    this.provider = t, this.service = new $t(t), this.loadVerse();
  }
};
nt.styles = ie;
let f = nt;
S([
  p({ type: Number })
], f.prototype, "surah");
S([
  p({ type: Number })
], f.prototype, "ayah");
S([
  p({ type: String })
], f.prototype, "lang");
S([
  x()
], f.prototype, "verse");
S([
  x()
], f.prototype, "searchResults");
S([
  x()
], f.prototype, "loading");
S([
  x()
], f.prototype, "lastQuery");
customElements.get("quran-viewer") || customElements.define("quran-viewer", f);
function he(r) {
  if (console.log("📖 QuranViewer init dengan host version:", r.version), r.provider) {
    const t = document.querySelector("quran-view");
    t && t.setProvider(r.provider);
  }
}
export {
  f as default,
  he as init
};
