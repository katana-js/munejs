(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["mune"] = factory();
	else
		root["mune"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(mune) {
			'use strict';

			return mune;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (tsuka) { // tsu
			var mune = (function () {
				/**
				 * 상위 요소의 하위 요소들에 대해서 주어진 `selector`를 활용하여 검색합니다.
				 * @param el 상위 요소
				 * @param selector 하위 요소 검색을 위한 `selector`
				 * @returns {Array.<T>} 검색된 하위 요소들의 배열
				 */
				function find(el, selector) {
					return Array.prototype.slice.call(el.querySelectorAll(selector));
				}

				/**
				 * 사용자에 의해 주어진 `selector`가 문제가 없도록 검사합니다.
				 * 만약, 주어진 `selector`가 문자열이 아니라면 '*'로 변환합니다.
				 * @param selector 사용자가 입력한 `selector` 문자열
				 * @returns {*} `Selector API`에 근거한 `selector` 문자열
				 */
				function ruSelector(selector) {
					return tsuka.isStr(selector) ? selector : '*';
				}

				/**
				 * 현재 요소에서 `selector`를 이용해 다른 요소로 건너띕니다.
				 * 건너뛰는 방식인 `directive`는 `HTMLElement`의 속성의 이름이기도 합니다.
				 * @param mune `mu` 인스턴스
				 * @param directive 다른 요소로 건너뛰기 위한 방식
				 * @param selector 대상 요소에 대한 `selector`
				 * @param options 대상 검색을 위한 옵션(firstCut: 첫 번째 요소만 검사, once: 한 개의 요소만 허용)
				 * @returns {Array} 대상 요소 목록
				 */
				function traverse(mune, directive, selector, options) {
					selector = ruSelector(selector);
					options = tsuka.extend({}, options);

					return mune.map(function (el) {
						var els = [];

						el = el[directive];

						while (el) {
							if (tsuka.isEl(el) && el.matches(selector)) {
								els.push(el);

								if (options.firstCut || options.once) break;
							}

							if (options.firstCut) break;

							el = el[directive];
						}

						return els;
					});
				}

				/**
				 * 사용자들이 실제로 사용하게 될 `traversal` 클래스입니다.
				 * @param el `Selector API`에 기반한 `selector` 문자열 혹은 요소 혹은 요소 목록
				 * @constructor
				 */
				function Mu(el) {
					// 문자열이 전달된다면 요소(혹은 목록)를 `document`에서 찾도록 합니다.
					el = tsuka.isUndef(el) ? document.documentElement :
						tsuka.isStr(el) ? find(document, el) : el;
					el = tsuka.unique(tsuka.isArr(el) ? el : [el]);

					this.length = el.length;

					var this_ = this;

					el.map(function (v, i) {
						this_[i] = v;
					});
				}

				tsuka.extend(Mu.prototype, {
					/**
					 * 요소들에 대해서 주어진 함수 ƒ를 실행합니다.
					 * 함수 ƒ는 한 개의 요소와 인덱스 번호를 전달받게 됩니다.
					 * @param ƒ 사용자 정의 함수
					 * @return {Array} 함수 ƒ에 의해 `select`된 요소 목록
					 */
					map: function (ƒ) {
						var els = [];

						for (var i = 0; i < this.length; i++) {
							// 함수 ƒ가 실행된 결과로 `selecting`된 요소 목록을 받게 된다.
							els = els.concat(ƒ.call(this, this[i], i));
						}

						return els;
					},
					up: function (selector) {
						return mune(traverse(this, 'parentNode', selector, {firstCut: true}));
					},
					down: function (selector) {
						selector = ruSelector(selector);

						return mune(this.map(function (el) {
							return find(el, selector);
						}));
					},
					siblings: function (selector) {
						return Mu.prototype.up.call(this).down(selector);
					},
					parents: function (selector) {
						return mune(traverse(this, 'parentNode', selector));
					},
					closest: function (selector) {
						return mune(traverse(this, 'parentNode', selector, {once: true}));
					},
					first: function (selector) {
						return mune(traverse(Mu.prototype.up.call(this), 'firstChild', selector));
					},
					prev: function (selector) {
						return mune(traverse(this, 'previousSibling', selector, true));
					},
					next: function (selector) {
						return mune(traverse(this, 'nextSibling', selector, true));
					},
					last: function (selector) {
						return mune(traverse(Mu.prototype.up.call(this), 'lastChild', selector));
					},
					style: function (name, value) {
						return mune(this.map(function (el) {
							if (!el.style.hasOwnProperty(name)) {
								throw new Error('The element has no style \'' + name + '\'');
							}

							el.style[name] = value;

							return el;
						}));
					},
					css: function (value) {
						return mune(this.map(function (el) {
							if (el.classList.contains(value)) {
								el.classList.remove(value);
							} else {
								el.classList.add(value);
							}

							return el;
						}));
					},
					show: function () {
						this.map(function (el) {
							var display = tsuka.dataAttr(el, 'styleDisplay');
							tsuka.dataAttr(el, 'styleDisplay', null);

							el.style.display = ['block', 'inline'].indexOf(display) > -1 ? display : 'block';
						});
					},
					hide: function () {
						this.map(function (el) {
							tsuka.dataAttr(el, 'styleDisplay', tsuka.style(el, 'display'));

							el.style.display = 'none';
						});
					}
				});

				/**
				 * `mune`를 사용할 때 사용되는 최상위 `wrapper` 메서드입니다.
				 * root.mune('...')를 실행하게 되면 이 메서드가 실행되는 것입니다.
				 * @param el `Selector API`에 기반하는 `selector` 문자열 혹은 요소 혹은 요소 목록
				 * @returns {Mu} `traversal` 클래스의 인스턴스
				 */
				function ne(el) {
					return new Mu(el);
				}

				return ne;
			})();

			mune.VERSION_ = '0.0.0';

			tsuka.extend(mune.prototype, {});

			return mune;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else if(typeof exports === 'object')
			exports["tsuka"] = factory();
		else
			root["tsuka"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(1),
			__webpack_require__(2),
			__webpack_require__(3)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(array, html, reflection) {
			var tsuka = {};

			/**
			 * 객체를 확장합니다.
			 * @param s 확장시킬 객체
			 * @returns {*|{}} 확장된 객체
			 */
			var extend = function (s) {
				s = s || {};

				for (var i = 1; i < arguments.length; i++) {
					var t = arguments[i];

					for (var p in t) {
						s[p] = t[p];
					}
				}

				return s;
			};

			extend(tsuka, {
				extend: extend,
			}, array, html, reflection);

			return tsuka;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			var array = {
				/**
				 * 대상이 `Array`일 경우, 배열 요소 중 동일한 값을 가지는 요소들을 제거하고 유일한 값들로 이루어진 새로운 배열로 만든다.
				 * @param t 대상
				 * @param sorting (optional) 정렬 여부
				 * @returns {*} 유일한 값들로 이루어진 배열
				 */
				unique: function (t) {
					if (!this.isArr(t)) return;

					var ua = [],
						i = -1;

					if (arguments[1]) t.sort();

					while (t.length - 1 > i++) {
						if (ua.indexOf(t[i]) === -1) {
							ua.push(t[i]);
						}
					}

					return ua;
				}
			};

			return array;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			var html = {
				/**
				 * 요소의 실제 스타일 프로퍼티를 가져옵니다.
				 * @param el 요소
				 * @param property 프로퍼티 이름
				 * @returns {string} 프로퍼티 이름에 대한 스타일 프로퍼티
				 */
				style: function (el, property) {
					if (window.getComputedStyle) {
						return this.isStr(property) ?
							document.defaultView.getComputedStyle(el, null)[property] :
							document.defaultView.getComputedStyle(el, null);
					}

					if (el.currentStyle) {
						return el.currentStyle[property];
					}
				},
				/**
				 * 모든 단위의 값을 숫자로 변환합니다.
				 * @param val 어떤 단위에 해당하는 값
				 * @returns {number} 단위 값의 숫자
				 */
				unitToNum: function (val) {
					return this.isNum(val) ? val : parseInt(val.replace(/[^-\d\.]/g, ''));
				},
				/**
				 * 요소에 데이터 속성을 설정하거나 해당되는 값을 가져옵니다.
				 * @param el 요소
				 * @param name 데이터 속성의 이름
				 * @param value 설정하려는 값
				 * @returns {*} 값이 전달되지 않은 경우, 데이터 속성에 대한 값이 반환됩니다.
				 */
				dataAttr: function (el, name, value) {
					if (this.isUndef(value)) {
						return el.dataset[name];
					} else if (value === null) {
						delete el.dataset[name];
					} else {
						el.dataset[name] = value;
					}
				}
			};

			return html;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			var reflection = {
				/**
				 * 객체로부터, 주어진 키에 대한 프로터티만 뽑아서 가져옵니다.
				 * @param o 대상 객체
				 * @param ks 뽑아올 프로퍼티의 키 목록
				 * @returns {*} 키 목록에 의해 뽑힌 프로퍼티들의 객체
				 */
				collect: function (o, ks) {
					if (!(ks instanceof Array) || !o) return void 0;

					var co = {};

					ks.map(function (k) {
						co[k] = o[k];
					});

					return co;
				},
				/**
				 * 대상의 생성자가 무엇인지 판단합니다.
				 * @param t 대상
				 * @param c 클래스
				 * @returns {*} 대상의 생성자
				 */
				instOf: function (t, c) {
					return t.constructor === c;
				},
				/**
				 * 대상의 타입을 가져옵니다.
				 * @param t 대상
				 * @param type 대상의 타입 문자열
				 * @returns {boolean} 대상의 타입이 타입 문자열과 동일하면 true
				 */
				typeOf: function (t, type) {
					return typeof t === type;
				},

				/**
				 * 대상이 특정 프로퍼티를 가지고 있는지 판단합니다.
				 * @param t 대상
				 * @param p 프로퍼티 이름
				 * @returns {boolean} 대상이 프로퍼티 이름에 해당하는 프로퍼티를 소유하고 있으면 true
				 */
				has: function (t, p) {
					return t[p] ? true : false;
				},

				/**
				 * 대상이 숫자인지 판단합니다.
				 * 대상이 `Number`의 인스턴스인 경우에는 `false`를 반환합니다.
				 * @param t 대상
				 * @returns {boolean} 숫자면 `true`
				 */
				isNum: function (t) {
					return t + 0 === t;
				},
				/**
				 * 대상이 문자열인지 판단합니다.
				 * @param t 대상
				 * @returns {*}
				 */
				isStr: function (t) {
					return t !== void 0 && this.has(t, 'substr');
				},
				/**
				 * 대상이 함수인지 판단합니다.
				 * @param t
				 * @returns {*}
				 */
				isFn: function (t) {
					return t !== void 0 && this.instOf(t, Function);
				},
				isArr: function (t) {
					return t !== void 0 && this.instOf(t, Array);
				},
				/**
				 * 대상이 `undefined`인지 판단합니다.
				 * @param t 대상
				 * @returns {boolean} `undefined`이면 `true`
				 */
				isUndef: function (t) {
					return t === void 0;
				},
				/**
				 * 대상이 HTML 문서 요소인지 판단합니다.
				 * @param t 대상
				 * @returns {*|boolean} HTML 문서 요소이면 `true`
				 */
				isEl: function (t) {
					return t && t.nodeType === 1;
				},

				/**
				 * 함수의 이름을 가져옵니다.
				 * @param ƒ 대상 함수
				 * @returns {*} 함수의 이름
				 */
				getFnName: function (ƒ) {
					var fnName = void 0;

					if (this.isFn(ƒ)) {
						ƒ.toString().replace(/^function\s*([\w]+)\([\w]*\)[\s\r]*\{[\s\S]+}$/, function (m, p1) {
							fnName = p1;
						});
					}

					return fnName;
				}
			};

			return reflection;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ])
});
;