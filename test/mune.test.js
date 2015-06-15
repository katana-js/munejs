var assert = chai.assert;
var expect = chai.expect;

describe('mune', function() {
    describe('mune()', function() {
        it('`selector`로 요소들을 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha');

            assert.equal(foo.length, 1, '찾아낸 요소의 개수가 정확하지 않습니다.');
            assert.strictEqual(foo[0], document.getElementById('mocha'), '찾아낸 요소가 정확히 일치하지 않습니다.');
        });

        it('`HTML element`가 전달되면 해당 요소에 대해서도 동작해야 합니다.', function() {
            var foo = mune(document.getElementById('mocha'));

            assert.equal(foo.length, 1, '찾아낸 요소의 개수가 정확하지 않습니다.');
            assert.strictEqual(foo[0], document.getElementById('mocha'), '찾아낸 요소가 정확히 일치하지 않습니다.');
        });

        it('아무런 파라메터도 주어지지 않으면 \<html\> 요소를 찾게 됩니다.', function() {
            var foo = mune();

            assert.equal(foo.length, 1, '찾아낸 요소의 개수가 정확하지 않습니다.');
            assert.strictEqual(foo[0], document.documentElement, '찾아낸 요소가 정확히 일치하지 않습니다.');
        });
    });
    describe('mune.up()', function() {
        it('상위 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha').up();
            assert.strictEqual(foo[0], document.body, '찾아낸 요소가 정확히 일치하지 않습니다.');
        });
        it('\<html\> 요소의 상위 요소는 찾지 못합니다.', function() {
            var foo = mune().up();
            assert.strictEqual(foo[0], undefined, '찾아낸 요소가 정확히 일치하지 않습니다.');
        });
    });
    describe('mune.down()', function() {
        it('하위 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha').down();
            assert.isAbove(foo.length, 0, '하위 요소를 찾지 못했습니다.');
        });
        it('하위 요소를 아이디를 통해 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha').down('#mocha-stats');
            assert.strictEqual(foo[0].id, 'mocha-stats', '');
        });
        it('하위 요소를 요소 이름으로 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha').down('li');
            assert.isAbove(foo.length, 0, '하위 요소를 요소 이름으로 찾지 못했습니다.');
        });
        it('하위 요소를 CSS 클래스 이름으로 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha').down('.suite');
            assert.isAbove(foo.length, 0, '하위 요소를 CSS 클래스 이름으로 찾지 못했습니다.');
        });
    });
    describe('mune.siblings()', function() {
        it('형제 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').siblings();
            assert.isAbove(foo.length, 0, '형제 요소를 찾지 못했습니다.');
        });
        it('형제 요소를 아이디를 통해 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').siblings('#mocha-report');
            assert.strictEqual(foo.length, 1, '형제 요소를 아이디를 통해 찾아낼 수 있어야 합니다.');
        });
        it('형제 요소를 요소 이름으로 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').siblings('li');
            assert.isAbove(foo.length, 0, '형제 요소를 요소 이름으로 찾지 못했습니다.');
        });
        it('형제 요소를 CSS 클래스 이름으로 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('.progress').siblings('.passes');
            assert.strictEqual(foo.length, 1, '형제 요소를 CSS 클래스 이름으로 찾아낼 수 있어야 합니다.');
        });
    });
    describe('mune.parents()', function() {
        it('부모 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').parents();
            assert.isAbove(foo.length, 0, '부모 요소를 찾지 못했습니다.');
        });
        it('부모 요소를 요소 이름으로 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').parents('div');
            assert.strictEqual(foo.length, 1, '부모 요소를 찾지 못했습니다.');
        });
        it('부모 요소를 아이디로 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').parents('#mocha');
            assert.strictEqual(foo[0].id, 'mocha', '부모 요소를 찾지 못했습니다.');
        });
    });
    describe('mune.closest()', function() {
        it('가장 가까운 상위 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha').closest();
            assert.strictEqual(foo[0], document.body, '가장 가까운 상위 요소를 찾지 못했습니다.');
        });
        it('요소 이름으로 가장 가까운 상위 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('#mocha-stats').closest('body');
            assert.strictEqual(foo[0], document.body, '가장 가까운 상위 요소를 찾지 못했습니다.');
        });
    });
    describe('mune.first()', function() {
        it('같은 레벨의 첫 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('.failures').first();
            assert.strictEqual(foo[0], mune('.progress')[0], '첫 요소를 찾지 못했습니다.');
        });
    });
    describe('mune.prev()', function() {
        it('같은 레벨의 이전 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('.failures').prev();
            assert.strictEqual(foo[0], mune('.passes')[0], '이전 요소를 찾지 못했습니다.');
        });
    });
    describe('mune.next()', function() {
        it('같은 레벨의 다음 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('.failures').next();
            assert.strictEqual(foo[0], mune('.duration')[0], '다음 요소를 찾지 못했습니다.');
        });
    });
    describe('mune.prev()', function() {
        it('같은 레벨의 마지막 요소를 찾아낼 수 있어야 합니다.', function() {
            var foo = mune('.progress').last();
            assert.strictEqual(foo[0], mune('.duration')[0], '마지막 요소를 찾지 못했습니다.');
        });
    });
    describe('mune.style()', function() {
        afterEach(function() {
            var foo = mune('.progress').siblings();
            foo.style('backgroundColor', '');
        });
        it('스타일의 이름이 올바르지 않은 경우 예외가 발생해야 합니다.', function() {
            var foo = mune('.progress');
            expect(foo.style.bind(foo, 'foo', 'none')).to.not.throw(new Error("The element has no style \'foo\'"));
        });
        it('스타일이 잘 적용되어야 합니다.', function() {
            var foo = mune('.progress').siblings();
            foo.style('backgroundColor', 'black');
            foo.map(function(el) {
                assert.strictEqual(el.style.backgroundColor, 'black', '스타일이 잘 적용되지 않았습니다.');
            });
        });
    });
    describe('mune.css()', function() {
        it('CSS 클래스가 잘 설정되어야 합니다.', function() {
            var foo = mune('.progress');
            foo.css('test');
            foo.map(function(el) {
                assert.isTrue(el.classList.contains('test'), 'CSS 클래스가 정상적으로 설정되지 않았습니다.');
            });
        });
        it('CSS 클래스가 잘 해제되어야 합니다.', function() {
            var foo = mune('.progress');
            foo.css('test');
            foo.map(function(el) {
                assert.isFalse(el.classList.contains('test'), 'CSS 클래스가 정상적으로 해제되지 않았습니다.');
            });
        });
    });
    describe('mune.show() and mune.hide()', function() {
        it('요소가 표시 중이면 감춰야 합니다.', function() {
            var foo = mune('.progress');
            foo.hide();
            foo.map(function(el) {
                var style = document.defaultView.getComputedStyle(el, null);
                assert.strictEqual(style.display, 'none', '요소를 감추지 못했습니다.');
            });
        });
        it('요소가 감춰져 있으면 표시해야 합니다.', function() {
            var foo = mune('.progress');
            foo.show();
            foo.map(function(el) {
                var style = document.defaultView.getComputedStyle(el, null);
                expect(style.display).to.satisfy(function(display) {
                    return display === 'block' || display === 'inline';
                }, '요소를 표시하지 못했습니다.');
            });
        });
        it('요소가 다시 표시된 뒤에는 관련 데이터 값을 삭제해야 합니다.', function() {
            var el = document.querySelector('.progress');
            assert.notProperty(el.dataset, 'styleDisplay', '요소가 표시된 뒤에 관련 데이터 값을 삭제하지 못했습니다.');
        });
    });
});