define(
	['tsukajs'],
	function (tsuka) { // tsu
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
	}
);
