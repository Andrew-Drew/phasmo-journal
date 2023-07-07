"use strict";

/* eslint-disable @typescript-eslint/no-unused-vars */
var __classPrivateFieldGet = void 0 && (void 0).__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = void 0 && (void 0).__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _EvidenceHelper_data, _EvidenceHelper_countTotal, _EvidenceHelper_countAllowed;
class EvidenceHelper {
  constructor() {
    _EvidenceHelper_data.set(this, new Map());
    _EvidenceHelper_countTotal.set(this, 0);
    _EvidenceHelper_countAllowed.set(this, 0);
  }
  get countTotal() {
    return __classPrivateFieldGet(this, _EvidenceHelper_countTotal, "f");
  }
  get countAllowed() {
    return __classPrivateFieldGet(this, _EvidenceHelper_countAllowed, "f");
  }
  setSelected(type, isAllowed) {
    var _a, _b, _c, _d;
    const hasVal = __classPrivateFieldGet(this, _EvidenceHelper_data, "f").has(type);
    if (!hasVal) {
      __classPrivateFieldSet(this, _EvidenceHelper_countTotal, (_a = __classPrivateFieldGet(this, _EvidenceHelper_countTotal, "f"), _a++, _a), "f");
      if (isAllowed) __classPrivateFieldSet(this, _EvidenceHelper_countAllowed, (_b = __classPrivateFieldGet(this, _EvidenceHelper_countAllowed, "f"), _b++, _b), "f");
    } else if (__classPrivateFieldGet(this, _EvidenceHelper_data, "f").get(type) !== isAllowed) {
      if (isAllowed) __classPrivateFieldSet(this, _EvidenceHelper_countAllowed, (_c = __classPrivateFieldGet(this, _EvidenceHelper_countAllowed, "f"), _c++, _c), "f");else __classPrivateFieldSet(this, _EvidenceHelper_countAllowed, (_d = __classPrivateFieldGet(this, _EvidenceHelper_countAllowed, "f"), _d--, _d), "f");
    }
    __classPrivateFieldGet(this, _EvidenceHelper_data, "f").set(type, !!isAllowed);
  }
  remove(type) {
    var _a, _b;
    if (!__classPrivateFieldGet(this, _EvidenceHelper_data, "f").has(type)) return;
    if (__classPrivateFieldGet(this, _EvidenceHelper_data, "f").get(type) === true) __classPrivateFieldSet(this, _EvidenceHelper_countAllowed, (_a = __classPrivateFieldGet(this, _EvidenceHelper_countAllowed, "f"), _a--, _a), "f");
    __classPrivateFieldSet(this, _EvidenceHelper_countTotal, (_b = __classPrivateFieldGet(this, _EvidenceHelper_countTotal, "f"), _b--, _b), "f");
    __classPrivateFieldGet(this, _EvidenceHelper_data, "f").delete(type);
  }
  contains(type) {
    return __classPrivateFieldGet(this, _EvidenceHelper_data, "f").has(type);
  }
  getState(type) {
    return __classPrivateFieldGet(this, _EvidenceHelper_data, "f").get(type);
  }
  clear() {
    __classPrivateFieldGet(this, _EvidenceHelper_data, "f").clear();
    __classPrivateFieldSet(this, _EvidenceHelper_countTotal, 0, "f");
    __classPrivateFieldSet(this, _EvidenceHelper_countAllowed, 0, "f");
  }
}
_EvidenceHelper_data = new WeakMap(), _EvidenceHelper_countTotal = new WeakMap(), _EvidenceHelper_countAllowed = new WeakMap();