(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $author$project$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$Main$initialAccessSpec = {allProjects: '', developer: false, network: _List_Nil, project: '', projectCreation: false};
var $author$project$Main$initialHttpsApp = {ports: _List_Nil, sharedAccess: ''};
var $author$project$Main$initialRunSpec = {distribution: 'Ubuntu', execDepends: _List_Nil, file: 'src/script.sh', interpreter: 'bash', release: '20.04', restartableEntryPoints: 'master', systemRequirements: $elm$core$Dict$empty, timeoutPolicy: $elm$core$Dict$empty, version: '0'};
var $author$project$Main$initialApp = {access: $author$project$Main$initialAccessSpec, authorizedUsers: _List_Nil, categories: _List_Nil, description: '', developerNotes: '', developers: _List_Nil, dxapi: '0.0.1', httpsApp: $author$project$Main$initialHttpsApp, inputSpec: _List_Nil, name: 'my_new_app', outputSpec: _List_Nil, regionalOptions: $elm$core$Dict$empty, runSpec: $author$project$Main$initialRunSpec, summary: 'App Summary', title: 'My New App', version: '0.0.1'};
var $rundis$elm_bootstrap$Bootstrap$Tab$Showing = {$: 'Showing'};
var $rundis$elm_bootstrap$Bootstrap$Tab$State = function (a) {
	return {$: 'State', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Tab$initialState = $rundis$elm_bootstrap$Bootstrap$Tab$State(
	{activeTab: $elm$core$Maybe$Nothing, visibility: $rundis$elm_bootstrap$Bootstrap$Tab$Showing});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			{accessSpecNetwork: '', app: $author$project$Main$initialApp, authorizedUser: '', customCategory: '', developer: '', editingExecDependsIndex: $elm$core$Maybe$Nothing, editingInputSpecIndex: $elm$core$Maybe$Nothing, editingOutputSpecIndex: $elm$core$Maybe$Nothing, editingSysReqHost: $elm$core$Maybe$Nothing, editingSysReqIndex: $elm$core$Maybe$Nothing, editingTimeoutPolicyIndex: $elm$core$Maybe$Nothing, error: $elm$core$Maybe$Nothing, execDependsStage: '', execDependsToModify: $elm$core$Maybe$Nothing, httpsAppPort: $elm$core$Maybe$Nothing, incomingJson: $elm$core$Maybe$Nothing, inputSpecChoice: '', inputSpecPattern: '', inputSpecToModify: $elm$core$Maybe$Nothing, inputSpecToModifyDefault: '', inputSpecToModifyError: $elm$core$Maybe$Nothing, jsonError: $elm$core$Maybe$Nothing, key: key, outputSpecPattern: '', outputSpecToModify: $elm$core$Maybe$Nothing, outputSpecToModifyError: $elm$core$Maybe$Nothing, regionalOptionsToModify: $elm$core$Maybe$Nothing, sysReqToModify: $elm$core$Maybe$Nothing, tabState: $rundis$elm_bootstrap$Bootstrap$Tab$initialState, timeoutPolicyToModify: $elm$core$Maybe$Nothing, url: url},
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$TabMsg = function (a) {
	return {$: 'TabMsg', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $rundis$elm_bootstrap$Bootstrap$Tab$subscriptions = F2(
	function (_v0, toMsg) {
		var state = _v0.a;
		var _v1 = state.visibility;
		if (_v1.$ === 'Start') {
			return $elm$browser$Browser$Events$onAnimationFrame(
				function (_v2) {
					return toMsg(
						$rundis$elm_bootstrap$Bootstrap$Tab$State(
							_Utils_update(
								state,
								{visibility: $rundis$elm_bootstrap$Bootstrap$Tab$Showing})));
				});
		} else {
			return $elm$core$Platform$Sub$none;
		}
	});
var $author$project$Main$subscriptions = function (model) {
	return A2($rundis$elm_bootstrap$Bootstrap$Tab$subscriptions, model.tabState, $author$project$Main$TabMsg);
};
var $author$project$Main$Aws = {$: 'Aws'};
var $author$project$Main$Azure = {$: 'Azure'};
var $author$project$Main$DefaultValBool = function (a) {
	return {$: 'DefaultValBool', a: a};
};
var $author$project$Main$DefaultValFloat = function (a) {
	return {$: 'DefaultValFloat', a: a};
};
var $author$project$Main$DefaultValInt = function (a) {
	return {$: 'DefaultValInt', a: a};
};
var $author$project$Main$DefaultValString = function (a) {
	return {$: 'DefaultValString', a: a};
};
var $author$project$Main$Gpu = {$: 'Gpu'};
var $author$project$Main$InputSpecBool = {$: 'InputSpecBool'};
var $author$project$Main$InputSpecFloat = {$: 'InputSpecFloat'};
var $author$project$Main$InputSpecInt = {$: 'InputSpecInt'};
var $author$project$Main$InputSpecString = {$: 'InputSpecString'};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Main$App = function (name) {
	return function (title) {
		return function (summary) {
			return function (description) {
				return function (dxapi) {
					return function (version) {
						return function (developerNotes) {
							return function (categories) {
								return function (developers) {
									return function (authorizedUsers) {
										return function (runSpec) {
											return function (inputSpec) {
												return function (outputSpec) {
													return function (access) {
														return function (httpsApp) {
															return function (regionalOptions) {
																return {access: access, authorizedUsers: authorizedUsers, categories: categories, description: description, developerNotes: developerNotes, developers: developers, dxapi: dxapi, httpsApp: httpsApp, inputSpec: inputSpec, name: name, outputSpec: outputSpec, regionalOptions: regionalOptions, runSpec: runSpec, summary: summary, title: title, version: version};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Main$AccessSpec = F5(
	function (network, project, allProjects, developer, projectCreation) {
		return {allProjects: allProjects, developer: developer, network: network, project: project, projectCreation: projectCreation};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2($elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_v0.$ === 'Ok') {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_v1.$ === 'Ok') {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _v1.a;
					return $elm$json$Json$Decode$fail(
						$elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2($elm$json$Json$Decode$field, key, $elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$decoderAccessSpec = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'projectCreation',
	$elm$json$Json$Decode$bool,
	false,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'developer',
		$elm$json$Json$Decode$bool,
		false,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'allProjects',
			$elm$json$Json$Decode$string,
			'',
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'project',
				$elm$json$Json$Decode$string,
				'',
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'network',
					$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$Main$AccessSpec))))));
var $author$project$Main$HttpsApp = F2(
	function (ports, sharedAccess) {
		return {ports: ports, sharedAccess: sharedAccess};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Main$decoderHttpsApp = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'shared_access',
	$elm$json$Json$Decode$string,
	'',
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'ports',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$int),
		$elm$json$Json$Decode$succeed($author$project$Main$HttpsApp)));
var $author$project$Main$InputSpec = function (name) {
	return function (label) {
		return function (_class) {
			return function (optional) {
				return function (_default) {
					return function (patterns) {
						return function (choices) {
							return function (type_) {
								return function (help) {
									return function (group) {
										return {choices: choices, _class: _class, _default: _default, group: group, help: help, label: label, name: name, optional: optional, patterns: patterns, type_: type_};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Main$decoderDefaultValue = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (f) {
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$DefaultValFloat(f));
			},
			$elm$json$Json$Decode$float),
			A2(
			$elm$json$Json$Decode$andThen,
			function (i) {
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$DefaultValInt(i));
			},
			$elm$json$Json$Decode$int),
			A2(
			$elm$json$Json$Decode$andThen,
			function (b) {
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$DefaultValBool(b));
			},
			$elm$json$Json$Decode$bool),
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$DefaultValString(s));
			},
			$elm$json$Json$Decode$string)
		]));
var $author$project$Main$InputSpecApplet = {$: 'InputSpecApplet'};
var $author$project$Main$InputSpecArrayApplet = {$: 'InputSpecArrayApplet'};
var $author$project$Main$InputSpecArrayBoolean = {$: 'InputSpecArrayBoolean'};
var $author$project$Main$InputSpecArrayFile = {$: 'InputSpecArrayFile'};
var $author$project$Main$InputSpecArrayFloat = {$: 'InputSpecArrayFloat'};
var $author$project$Main$InputSpecArrayInt = {$: 'InputSpecArrayInt'};
var $author$project$Main$InputSpecArrayRecord = {$: 'InputSpecArrayRecord'};
var $author$project$Main$InputSpecArrayString = {$: 'InputSpecArrayString'};
var $author$project$Main$InputSpecFile = {$: 'InputSpecFile'};
var $author$project$Main$InputSpecHash = {$: 'InputSpecHash'};
var $author$project$Main$InputSpecRecord = {$: 'InputSpecRecord'};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Main$decoderInputSpecClass = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		var _v0 = $elm$core$String$toLower(str);
		switch (_v0) {
			case 'applet':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecApplet);
			case 'array:applet':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayApplet);
			case 'array:boolean':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayBoolean);
			case 'array:file':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayFile);
			case 'array:float':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayFloat);
			case 'array:int':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayInt);
			case 'array:record':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayRecord);
			case 'array:string':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecArrayString);
			case 'boolean':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecBool);
			case 'file':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecFile);
			case 'float':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecFloat);
			case 'hash':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecHash);
			case 'int':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecInt);
			case 'record':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecRecord);
			case 'string':
				return $elm$json$Json$Decode$succeed($author$project$Main$InputSpecString);
			default:
				return $elm$json$Json$Decode$fail('Unknown param type: ' + str);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Main$decoderInputSpec = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'group',
	$elm$json$Json$Decode$string,
	'',
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'help',
		$elm$json$Json$Decode$string,
		'',
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'type',
			$elm$json$Json$Decode$string,
			'',
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'choices',
				$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
				_List_Nil,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'patterns',
					$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
					_List_Nil,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'default',
						$author$project$Main$decoderDefaultValue,
						$author$project$Main$DefaultValString(''),
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'optional',
							$elm$json$Json$Decode$bool,
							true,
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'class',
								$author$project$Main$decoderInputSpecClass,
								$author$project$Main$InputSpecString,
								A4(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
									'label',
									$elm$json$Json$Decode$string,
									'',
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'name',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Main$InputSpec)))))))))));
var $author$project$Main$OutputSpec = F3(
	function (name, _class, patterns) {
		return {_class: _class, name: name, patterns: patterns};
	});
var $author$project$Main$decoderOutputSpec = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'patterns',
	$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
	_List_Nil,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'class',
		$elm$json$Json$Decode$string,
		'',
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'name',
			$elm$json$Json$Decode$string,
			$elm$json$Json$Decode$succeed($author$project$Main$OutputSpec))));
var $author$project$Main$RegionalOptions = F2(
	function (resources, systemRequirements) {
		return {resources: resources, systemRequirements: systemRequirements};
	});
var $author$project$Main$SystemRequirements = F2(
	function (instanceType, clusterSpec) {
		return {clusterSpec: clusterSpec, instanceType: instanceType};
	});
var $author$project$Main$ClusterSpec = F5(
	function (type_, version, initialInstanceCount, ports, bootstrapScript) {
		return {bootstrapScript: bootstrapScript, initialInstanceCount: initialInstanceCount, ports: ports, type_: type_, version: version};
	});
var $author$project$Main$decoderClusterSpec = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'bootstrapScript',
	$elm$json$Json$Decode$string,
	'',
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'ports',
		$elm$json$Json$Decode$string,
		'',
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'initialInstanceCount',
			$elm$json$Json$Decode$int,
			1,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'version',
				$elm$json$Json$Decode$string,
				'',
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'type',
					$elm$json$Json$Decode$string,
					$elm$json$Json$Decode$succeed($author$project$Main$ClusterSpec))))));
var $author$project$Main$initialClusterSpec = {bootstrapScript: '', initialInstanceCount: 1, ports: '', type_: 'generic', version: ''};
var $author$project$Main$decoderSystemRequirementsBody = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'clusterSpec',
	$author$project$Main$decoderClusterSpec,
	$author$project$Main$initialClusterSpec,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'instanceType',
		$elm$json$Json$Decode$string,
		$elm$json$Json$Decode$succeed($author$project$Main$SystemRequirements)));
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Main$decoderSystemRequirements = $elm$json$Json$Decode$dict($author$project$Main$decoderSystemRequirementsBody);
var $author$project$Main$decoderRegionalOptionsBody = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'systemRequirements',
	$author$project$Main$decoderSystemRequirements,
	$elm$core$Dict$empty,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'resources',
		$elm$json$Json$Decode$string,
		'',
		$elm$json$Json$Decode$succeed($author$project$Main$RegionalOptions)));
var $author$project$Main$decoderRegionalOptions = $elm$json$Json$Decode$dict($author$project$Main$decoderRegionalOptionsBody);
var $author$project$Main$RunSpec = F9(
	function (interpreter, file, distribution, release, version, restartableEntryPoints, execDepends, timeoutPolicy, systemRequirements) {
		return {distribution: distribution, execDepends: execDepends, file: file, interpreter: interpreter, release: release, restartableEntryPoints: restartableEntryPoints, systemRequirements: systemRequirements, timeoutPolicy: timeoutPolicy, version: version};
	});
var $author$project$Main$ExecDepends = F4(
	function (name, packageManager, version, stages) {
		return {name: name, packageManager: packageManager, stages: stages, version: version};
	});
var $author$project$Main$decoderExecDepends = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'stages',
	$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
	_List_Nil,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'version',
		$elm$json$Json$Decode$string,
		'',
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'package_manager',
			$elm$json$Json$Decode$string,
			'apt',
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'name',
				$elm$json$Json$Decode$string,
				$elm$json$Json$Decode$succeed($author$project$Main$ExecDepends)))));
var $author$project$Main$TimeoutPolicyTime = F2(
	function (hours, minutes) {
		return {hours: hours, minutes: minutes};
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalAt = F4(
	function (path, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var $author$project$Main$decoderTimeoutPolicyBody = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalAt,
	_List_fromArray(
		['minutes']),
	$elm$json$Json$Decode$int,
	0,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalAt,
		_List_fromArray(
			['hours']),
		$elm$json$Json$Decode$int,
		0,
		$elm$json$Json$Decode$succeed($author$project$Main$TimeoutPolicyTime)));
var $author$project$Main$decoderTimeoutPolicy = $elm$json$Json$Decode$dict($author$project$Main$decoderTimeoutPolicyBody);
var $author$project$Main$decoderRunSpec = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'systemRequirements',
	$author$project$Main$decoderSystemRequirements,
	$elm$core$Dict$empty,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'timeoutPolicy',
		$author$project$Main$decoderTimeoutPolicy,
		$elm$core$Dict$empty,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'execDepends',
			$elm$json$Json$Decode$list($author$project$Main$decoderExecDepends),
			_List_Nil,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'restartableEntryPoints',
				$elm$json$Json$Decode$string,
				'master',
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'version',
					$elm$json$Json$Decode$string,
					'',
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'release',
						$elm$json$Json$Decode$string,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'distribution',
							$elm$json$Json$Decode$string,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'file',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'interpreter',
									$elm$json$Json$Decode$string,
									$elm$json$Json$Decode$succeed($author$project$Main$RunSpec))))))))));
var $author$project$Main$decoderApp = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'regionalOptions',
	$author$project$Main$decoderRegionalOptions,
	$elm$core$Dict$empty,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'httpsApp',
		$author$project$Main$decoderHttpsApp,
		$author$project$Main$initialHttpsApp,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'access',
			$author$project$Main$decoderAccessSpec,
			$author$project$Main$initialAccessSpec,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'outputSpec',
				$elm$json$Json$Decode$list($author$project$Main$decoderOutputSpec),
				_List_Nil,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'inputSpec',
					$elm$json$Json$Decode$list($author$project$Main$decoderInputSpec),
					_List_Nil,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'runSpec',
						$author$project$Main$decoderRunSpec,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'authorizedUsers',
							$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
							_List_Nil,
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'developers',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
								_List_Nil,
								A4(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
									'categories',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
									_List_Nil,
									A4(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
										'developerNotes',
										$elm$json$Json$Decode$string,
										'',
										A4(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
											'version',
											$elm$json$Json$Decode$string,
											'',
											A4(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
												'dxapi',
												$elm$json$Json$Decode$string,
												'',
												A4(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
													'description',
													$elm$json$Json$Decode$string,
													'',
													A3(
														$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
														'summary',
														$elm$json$Json$Decode$string,
														A3(
															$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
															'title',
															$elm$json$Json$Decode$string,
															A3(
																$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
																'name',
																$elm$json$Json$Decode$string,
																$elm$json$Json$Decode$succeed($author$project$Main$App)))))))))))))))));
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Main$defaultValueToString = function (val) {
	switch (val.$) {
		case 'DefaultValInt':
			var i = val.a;
			return $elm$core$String$fromInt(i);
		case 'DefaultValFloat':
			var f = val.a;
			return $elm$core$String$fromFloat(f);
		case 'DefaultValBool':
			var b = val.a;
			return b ? 'True' : 'False';
		default:
			var v = val.a;
			return v;
	}
};
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$decodeIncomingJson = function (model) {
	var setDefault = function (spec) {
		var defaultStr = $author$project$Main$defaultValueToString(spec._default);
		var newDefault = function () {
			var _v3 = spec._class;
			switch (_v3.$) {
				case 'InputSpecInt':
					return $author$project$Main$DefaultValInt(
						A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$String$toInt(defaultStr)));
				case 'InputSpecFloat':
					return $author$project$Main$DefaultValFloat(
						A2(
							$elm$core$Maybe$withDefault,
							0.0,
							$elm$core$String$toFloat(defaultStr)));
				case 'InputSpecBool':
					return $author$project$Main$DefaultValBool(defaultStr === 'True');
				default:
					return $author$project$Main$DefaultValString('');
			}
		}();
		return _Utils_update(
			spec,
			{_default: newDefault});
	};
	var _v0 = function () {
		var _v1 = model.incomingJson;
		if (_v1.$ === 'Just') {
			var json = _v1.a;
			var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Main$decoderApp, json);
			if (_v2.$ === 'Ok') {
				var app = _v2.a;
				var inputSpecWithDefaults = A2($elm$core$List$map, setDefault, app.inputSpec);
				return _Utils_Tuple2(
					_Utils_update(
						app,
						{inputSpec: inputSpecWithDefaults}),
					$elm$core$Maybe$Nothing);
			} else {
				var e = _v2.a;
				return _Utils_Tuple2(
					model.app,
					$elm$core$Maybe$Just(
						$elm$json$Json$Decode$errorToString(e)));
			}
		} else {
			return _Utils_Tuple2(
				model.app,
				$elm$core$Maybe$Just('No JSON'));
		}
	}();
	var newApp = _v0.a;
	var err = _v0.b;
	return _Utils_update(
		model,
		{app: newApp, jsonError: err});
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$json$Json$Encode$dict = F3(
	function (toKey, toValue, dictionary) {
		return _Json_wrap(
			A3(
				$elm$core$Dict$foldl,
				F3(
					function (key, value, obj) {
						return A3(
							_Json_addField,
							toKey(key),
							toValue(value),
							obj);
					}),
				_Json_emptyObject(_Utils_Tuple0),
				dictionary));
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Main$inputSpecClassToString = function (_class) {
	switch (_class.$) {
		case 'InputSpecApplet':
			return 'applet';
		case 'InputSpecArrayApplet':
			return 'array:applet';
		case 'InputSpecArrayBoolean':
			return 'array:boolean';
		case 'InputSpecArrayFile':
			return 'array:file';
		case 'InputSpecArrayFloat':
			return 'array:float';
		case 'InputSpecArrayInt':
			return 'array:int';
		case 'InputSpecArrayRecord':
			return 'array:record';
		case 'InputSpecArrayString':
			return 'array:string';
		case 'InputSpecBool':
			return 'boolean';
		case 'InputSpecFile':
			return 'file';
		case 'InputSpecFloat':
			return 'float';
		case 'InputSpecHash':
			return 'hash';
		case 'InputSpecInt':
			return 'int';
		case 'InputSpecRecord':
			return 'record';
		default:
			return 'string';
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$encodeInputSpec = function (inputSpec) {
	var defaultValue = function () {
		var _v0 = inputSpec._default;
		switch (_v0.$) {
			case 'DefaultValInt':
				var val = _v0.a;
				return $elm$json$Json$Encode$int(val);
			case 'DefaultValFloat':
				var val = _v0.a;
				return $elm$json$Json$Encode$float(val);
			case 'DefaultValBool':
				var val = _v0.a;
				return $elm$json$Json$Encode$bool(val);
			default:
				var val = _v0.a;
				return $elm$json$Json$Encode$string(val);
		}
	}();
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(inputSpec.name)),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(inputSpec.label)),
				_Utils_Tuple2(
				'class',
				$elm$json$Json$Encode$string(
					$author$project$Main$inputSpecClassToString(inputSpec._class))),
				_Utils_Tuple2(
				'optional',
				$elm$json$Json$Encode$bool(inputSpec.optional)),
				_Utils_Tuple2('default', defaultValue),
				_Utils_Tuple2(
				'patterns',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, inputSpec.patterns)),
				_Utils_Tuple2(
				'choices',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, inputSpec.choices)),
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string(inputSpec.type_)),
				_Utils_Tuple2(
				'help',
				$elm$json$Json$Encode$string(inputSpec.help)),
				_Utils_Tuple2(
				'group',
				$elm$json$Json$Encode$string(inputSpec.group))
			]));
};
var $author$project$Main$encodeApp = function (app) {
	var encodeTimeoutPolicyTime = function (policy) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'hours',
					$elm$json$Json$Encode$int(policy.hours)),
					_Utils_Tuple2(
					'minutes',
					$elm$json$Json$Encode$int(policy.minutes))
				]));
	};
	var encodeOutputSpec = function (spec) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(spec.name)),
					_Utils_Tuple2(
					'class',
					$elm$json$Json$Encode$string(spec._class)),
					_Utils_Tuple2(
					'patterns',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, spec.patterns))
				]));
	};
	var encodeHttpsApp = function (httpsApp) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'ports',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, httpsApp.ports)),
					_Utils_Tuple2(
					'sharedAccess',
					$elm$json$Json$Encode$string(httpsApp.sharedAccess))
				]));
	};
	var encodeExecDepends = function (execDepends) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(execDepends.name)),
					_Utils_Tuple2(
					'package_manager',
					$elm$json$Json$Encode$string(execDepends.packageManager)),
					_Utils_Tuple2(
					'version',
					$elm$json$Json$Encode$string(execDepends.version)),
					_Utils_Tuple2(
					'stages',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, execDepends.stages))
				]));
	};
	var encodeClusterSpec = function (spec) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(spec.type_)),
					_Utils_Tuple2(
					'version',
					$elm$json$Json$Encode$string(spec.version)),
					_Utils_Tuple2(
					'initialInstanceCount',
					$elm$json$Json$Encode$int(spec.initialInstanceCount)),
					_Utils_Tuple2(
					'ports',
					$elm$json$Json$Encode$string(spec.ports)),
					_Utils_Tuple2(
					'bootstrapScript',
					$elm$json$Json$Encode$string(spec.bootstrapScript))
				]));
	};
	var encodeSystemRequirements = function (req) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'instanceType',
					$elm$json$Json$Encode$string(req.instanceType)),
					_Utils_Tuple2(
					'clusterSpec',
					encodeClusterSpec(req.clusterSpec))
				]));
	};
	var encodeRegionalOptions = function (opts) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'resources',
					$elm$json$Json$Encode$string(opts.resources)),
					_Utils_Tuple2(
					'systemRequirements',
					A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, encodeSystemRequirements, opts.systemRequirements))
				]));
	};
	var encodeRunSpec = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'interpreter',
				$elm$json$Json$Encode$string(app.runSpec.interpreter)),
				_Utils_Tuple2(
				'file',
				$elm$json$Json$Encode$string(app.runSpec.file)),
				_Utils_Tuple2(
				'distribution',
				$elm$json$Json$Encode$string(app.runSpec.distribution)),
				_Utils_Tuple2(
				'release',
				$elm$json$Json$Encode$string(app.runSpec.release)),
				_Utils_Tuple2(
				'version',
				$elm$json$Json$Encode$string(app.runSpec.version)),
				_Utils_Tuple2(
				'restartableEntryPoints',
				$elm$json$Json$Encode$string(app.runSpec.restartableEntryPoints)),
				_Utils_Tuple2(
				'execDepends',
				A2($elm$json$Json$Encode$list, encodeExecDepends, app.runSpec.execDepends)),
				_Utils_Tuple2(
				'timeoutPolicy',
				A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, encodeTimeoutPolicyTime, app.runSpec.timeoutPolicy)),
				_Utils_Tuple2(
				'systemRequirements',
				A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, encodeSystemRequirements, app.runSpec.systemRequirements))
			]));
	var encodeAccessSpec = function (access) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'network',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, access.network)),
					_Utils_Tuple2(
					'project',
					$elm$json$Json$Encode$string(access.project)),
					_Utils_Tuple2(
					'allProjects',
					$elm$json$Json$Encode$string(access.allProjects)),
					_Utils_Tuple2(
					'developer',
					$elm$json$Json$Encode$bool(access.developer)),
					_Utils_Tuple2(
					'projectCreation',
					$elm$json$Json$Encode$bool(access.projectCreation))
				]));
	};
	return A2(
		$elm$json$Json$Encode$encode,
		4,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(app.name)),
					_Utils_Tuple2(
					'title',
					$elm$json$Json$Encode$string(app.title)),
					_Utils_Tuple2(
					'summary',
					$elm$json$Json$Encode$string(app.summary)),
					_Utils_Tuple2(
					'description',
					$elm$json$Json$Encode$string(app.description)),
					_Utils_Tuple2(
					'dxapi',
					$elm$json$Json$Encode$string(app.dxapi)),
					_Utils_Tuple2(
					'version',
					$elm$json$Json$Encode$string(app.version)),
					_Utils_Tuple2(
					'developerNotes',
					$elm$json$Json$Encode$string(app.developerNotes)),
					_Utils_Tuple2(
					'categories',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, app.categories)),
					_Utils_Tuple2(
					'developers',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, app.developers)),
					_Utils_Tuple2(
					'authorizedUsers',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, app.authorizedUsers)),
					_Utils_Tuple2('runSpec', encodeRunSpec),
					_Utils_Tuple2(
					'inputSpec',
					A2($elm$json$Json$Encode$list, $author$project$Main$encodeInputSpec, app.inputSpec)),
					_Utils_Tuple2(
					'outputSpec',
					A2($elm$json$Json$Encode$list, encodeOutputSpec, app.outputSpec)),
					_Utils_Tuple2(
					'access',
					encodeAccessSpec(app.access)),
					_Utils_Tuple2(
					'httpsApp',
					encodeHttpsApp(app.httpsApp)),
					_Utils_Tuple2(
					'regionalOptions',
					A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, encodeRegionalOptions, app.regionalOptions))
				])));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $Chadtech$unique_list$List$Unique$UniqueList = function (a) {
	return {$: 'UniqueList', a: a};
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $Chadtech$unique_list$List$Unique$consIfNotMember = F2(
	function (el, list) {
		return A2($elm$core$List$member, el, list) ? list : A2($elm$core$List$cons, el, list);
	});
var $Chadtech$unique_list$List$Unique$fromList = function (list) {
	return $Chadtech$unique_list$List$Unique$UniqueList(
		A3($elm$core$List$foldr, $Chadtech$unique_list$List$Unique$consIfNotMember, _List_Nil, list));
};
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var $elm$regex$Regex$never = _Regex_never;
var $author$project$Main$isSemanticVersion = function (val) {
	var pattern = A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('^[0-9]+[.][0-9]+[.][0-9]+$'));
	return $elm$core$List$length(
		A2($elm$regex$Regex$find, pattern, val)) === 1;
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $Chadtech$unique_list$List$Unique$toList = function (_v0) {
	var list = _v0.a;
	return list;
};
var $author$project$Main$mkSortedUniqList = F2(
	function (vals, newVal) {
		return $Chadtech$unique_list$List$Unique$toList(
			$Chadtech$unique_list$List$Unique$fromList(
				$elm$core$List$sort(
					_Utils_ap(
						vals,
						_List_fromArray(
							[newVal])))));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$removeAt = F2(
	function (index, l) {
		if (index < 0) {
			return l;
		} else {
			var tail = $elm$core$List$tail(
				A2($elm$core$List$drop, index, l));
			var head = A2($elm$core$List$take, index, l);
			if (tail.$ === 'Nothing') {
				return l;
			} else {
				var t = tail.a;
				return A2($elm$core$List$append, head, t);
			}
		}
	});
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $elm$core$String$trim = _String_trim;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			var head = A2($elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'CloseExecDependsDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingExecDependsIndex: $elm$core$Maybe$Nothing, execDependsToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'CloseInputSpecDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingInputSpecIndex: $elm$core$Maybe$Nothing, inputSpecToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'CloseOutputSpecDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingOutputSpecIndex: $elm$core$Maybe$Nothing, outputSpecToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'CloseRegionalOptionsDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{regionalOptionsToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'CloseSysReqDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingSysReqHost: $elm$core$Maybe$Nothing, editingSysReqIndex: $elm$core$Maybe$Nothing, sysReqToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'CloseTimeoutPolicyDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingTimeoutPolicyIndex: $elm$core$Maybe$Nothing, timeoutPolicyToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'CloseJsonDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{incomingJson: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteAccessSpecNetwork':
				var network = msg.a;
				var app = model.app;
				var access = app.access;
				var newAccess = _Utils_update(
					access,
					{
						network: A2(
							$elm$core$List$filter,
							function (n) {
								return !_Utils_eq(n, network);
							},
							access.network)
					});
				var newApp = _Utils_update(
					app,
					{access: newAccess});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteAppCategory':
				var cat = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{
						categories: A2(
							$elm$core$List$filter,
							function (c) {
								return !_Utils_eq(c, cat);
							},
							app.categories)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteAuthorizedUser':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{
						authorizedUsers: A2(
							$elm$core$List$filter,
							function (u) {
								return !_Utils_eq(u, val);
							},
							app.authorizedUsers)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteDeveloper':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{
						developers: A2(
							$elm$core$List$filter,
							function (d) {
								return !_Utils_eq(d, val);
							},
							app.developers)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteExecDepends':
				var index = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{
						execDepends: A2($elm_community$list_extra$List$Extra$removeAt, index, runSpec.execDepends)
					});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteExecDependsStage':
				var stage = msg.a;
				var newExec = A2(
					$elm$core$Maybe$map,
					function (exec) {
						return _Utils_update(
							exec,
							{
								stages: A2(
									$elm$core$List$filter,
									function (s) {
										return !_Utils_eq(s, stage);
									},
									exec.stages)
							});
					},
					model.execDependsToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{execDependsToModify: newExec}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteHttpsAppPort':
				var index = msg.a;
				var app = model.app;
				var httpsApp = app.httpsApp;
				var newHttpsApp = _Utils_update(
					httpsApp,
					{
						ports: A2($elm_community$list_extra$List$Extra$removeAt, index, httpsApp.ports)
					});
				var newApp = _Utils_update(
					app,
					{httpsApp: newHttpsApp});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteInputSpec':
				var index = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{
						inputSpec: A2($elm_community$list_extra$List$Extra$removeAt, index, app.inputSpec)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteInputSpecChoice':
				var choice = msg.a;
				var newSpec = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								choices: A2(
									$elm$core$List$filter,
									function (c) {
										return !_Utils_eq(c, choice);
									},
									spec.choices)
							});
					},
					model.inputSpecToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newSpec}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteInputSpecPattern':
				var pattern = msg.a;
				var newSpec = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								patterns: A2(
									$elm$core$List$filter,
									function (p) {
										return !_Utils_eq(p, pattern);
									},
									spec.patterns)
							});
					},
					model.inputSpecToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newSpec}),
					$elm$core$Platform$Cmd$none);
			case 'DecodeIncomingJson':
				var newModel = $author$project$Main$decodeIncomingJson(model);
				var newJson = function () {
					var _v1 = newModel.jsonError;
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						return model.incomingJson;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						newModel,
						{incomingJson: newJson}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteOutputSpec':
				var index = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{
						outputSpec: A2($elm_community$list_extra$List$Extra$removeAt, index, app.outputSpec)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteOutputSpecPattern':
				var pattern = msg.a;
				var newSpec = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								patterns: A2(
									$elm$core$List$filter,
									function (p) {
										return !_Utils_eq(p, pattern);
									},
									spec.patterns)
							});
					},
					model.outputSpecToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{outputSpecToModify: newSpec}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteRegionalOptions':
				var regionName = msg.a;
				var app = model.app;
				var newOpts = $elm$core$Dict$fromList(
					A2(
						$elm$core$List$filter,
						function (_v2) {
							var regName = _v2.a;
							var opt = _v2.b;
							return !_Utils_eq(regName, regionName);
						},
						$elm$core$Dict$toList(app.regionalOptions)));
				var newApp = _Utils_update(
					app,
					{regionalOptions: newOpts});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteSysReq':
				var index = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newSysReqs = $elm$core$Dict$fromList(
					A2(
						$elm_community$list_extra$List$Extra$removeAt,
						index,
						$elm$core$Dict$toList(runSpec.systemRequirements)));
				var newRunSpec = _Utils_update(
					runSpec,
					{systemRequirements: newSysReqs});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'DeleteTimeoutPolicy':
				var index = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newTimeoutPolicy = $elm$core$Dict$fromList(
					A2(
						$elm_community$list_extra$List$Extra$removeAt,
						index,
						$elm$core$Dict$toList(runSpec.timeoutPolicy)));
				var newRunSpec = _Utils_update(
					runSpec,
					{timeoutPolicy: newTimeoutPolicy});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.key,
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'ModifyExecDependsDialog':
				var newExecDepends = msg.a;
				var index = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingExecDependsIndex: index,
							execDependsToModify: $elm$core$Maybe$Just(newExecDepends)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ModifyInputSpecDialog':
				var newInputSpec = msg.a;
				var index = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingInputSpecIndex: index,
							inputSpecToModify: $elm$core$Maybe$Just(newInputSpec)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ModifyOutputSpecDialog':
				var newOutputSpec = msg.a;
				var index = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingOutputSpecIndex: index,
							outputSpecToModify: $elm$core$Maybe$Just(newOutputSpec)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ModifyRegionalOptionsDialog':
				var regionName = msg.a;
				var newOpts = msg.b;
				var index = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							regionalOptionsToModify: $elm$core$Maybe$Just(
								_Utils_Tuple2(regionName, newOpts))
						}),
					$elm$core$Platform$Cmd$none);
			case 'ModifySysReqDialog':
				var entryPointName = msg.a;
				var newSysReq = msg.b;
				var index = msg.c;
				var instanceType = newSysReq.instanceType;
				var newHost = A2($elm$core$String$contains, 'gpu', instanceType) ? $author$project$Main$Gpu : (A2($elm$core$String$contains, 'azure', instanceType) ? $author$project$Main$Azure : $author$project$Main$Aws);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingSysReqHost: $elm$core$Maybe$Just(newHost),
							editingSysReqIndex: index,
							sysReqToModify: $elm$core$Maybe$Just(
								_Utils_Tuple2(entryPointName, newSysReq))
						}),
					$elm$core$Platform$Cmd$none);
			case 'ModifyTimeoutPolicyDialog':
				var entryPointName = msg.a;
				var newTimeoutPolicy = msg.b;
				var index = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingTimeoutPolicyIndex: index,
							timeoutPolicyToModify: $elm$core$Maybe$Just(
								_Utils_Tuple2(entryPointName, newTimeoutPolicy))
						}),
					$elm$core$Platform$Cmd$none);
			case 'SaveExecDepends':
				var app = model.app;
				var runSpec = app.runSpec;
				var newExecDepends = function () {
					var _v4 = model.execDependsToModify;
					if (_v4.$ === 'Just') {
						var val = _v4.a;
						var _v5 = model.editingExecDependsIndex;
						if (_v5.$ === 'Just') {
							var i = _v5.a;
							return A3(
								$elm_community$list_extra$List$Extra$updateAt,
								i,
								function (_v6) {
									return val;
								},
								runSpec.execDepends);
						} else {
							return _Utils_ap(
								runSpec.execDepends,
								_List_fromArray(
									[val]));
						}
					} else {
						return runSpec.execDepends;
					}
				}();
				var newRunSpec = _Utils_update(
					runSpec,
					{execDepends: newExecDepends});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, editingExecDependsIndex: $elm$core$Maybe$Nothing, execDependsToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SaveInputSpecDefault':
				var toBool = function (s) {
					return $elm$core$String$toLower(s) === 'true';
				};
				var curDefault = model.inputSpecToModifyDefault;
				var convertedDefault = function () {
					var _v10 = model.inputSpecToModify;
					if (_v10.$ === 'Just') {
						var spec = _v10.a;
						var _v11 = spec._class;
						switch (_v11.$) {
							case 'InputSpecBool':
								return $elm$core$Maybe$Just(
									$author$project$Main$DefaultValBool(
										toBool(curDefault)));
							case 'InputSpecInt':
								return A2(
									$elm$core$Maybe$map,
									function (i) {
										return $author$project$Main$DefaultValInt(i);
									},
									$elm$core$String$toInt(curDefault));
							case 'InputSpecFloat':
								return A2(
									$elm$core$Maybe$map,
									function (f) {
										return $author$project$Main$DefaultValFloat(f);
									},
									$elm$core$String$toFloat(curDefault));
							default:
								return $elm$core$Maybe$Just(
									$author$project$Main$DefaultValString(curDefault));
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				var app = model.app;
				var _v7 = function () {
					var _v8 = model.inputSpecToModify;
					if (_v8.$ === 'Just') {
						var inputSpecToModify = _v8.a;
						if (convertedDefault.$ === 'Just') {
							var def = convertedDefault.a;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(
									_Utils_update(
										inputSpecToModify,
										{_default: def})),
								$elm$core$Maybe$Nothing);
						} else {
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(inputSpecToModify),
								$elm$core$Maybe$Just('Invalid default'));
						}
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
					}
				}();
				var newInputSpec = _v7.a;
				var newErr = _v7.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpec, inputSpecToModifyError: newErr}),
					$elm$core$Platform$Cmd$none);
			case 'SaveInputSpec':
				var app = model.app;
				var newInputSpec = function () {
					var _v12 = model.inputSpecToModify;
					if (_v12.$ === 'Just') {
						var spec = _v12.a;
						var _v13 = model.editingInputSpecIndex;
						if (_v13.$ === 'Just') {
							var i = _v13.a;
							return A3(
								$elm_community$list_extra$List$Extra$updateAt,
								i,
								function (_v14) {
									return spec;
								},
								app.inputSpec);
						} else {
							return _Utils_ap(
								app.inputSpec,
								_List_fromArray(
									[spec]));
						}
					} else {
						return app.inputSpec;
					}
				}();
				var newApp = _Utils_update(
					app,
					{inputSpec: newInputSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, editingInputSpecIndex: $elm$core$Maybe$Nothing, inputSpecToModify: $elm$core$Maybe$Nothing, inputSpecToModifyDefault: '', inputSpecToModifyError: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SaveOutputSpec':
				var app = model.app;
				var newOutputSpec = function () {
					var _v15 = model.outputSpecToModify;
					if (_v15.$ === 'Just') {
						var spec = _v15.a;
						var _v16 = model.editingOutputSpecIndex;
						if (_v16.$ === 'Just') {
							var i = _v16.a;
							return A3(
								$elm_community$list_extra$List$Extra$updateAt,
								i,
								function (_v17) {
									return spec;
								},
								app.outputSpec);
						} else {
							return _Utils_ap(
								app.outputSpec,
								_List_fromArray(
									[spec]));
						}
					} else {
						return app.outputSpec;
					}
				}();
				var newApp = _Utils_update(
					app,
					{outputSpec: newOutputSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, editingOutputSpecIndex: $elm$core$Maybe$Nothing, outputSpecToModify: $elm$core$Maybe$Nothing, outputSpecToModifyError: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SaveRegionalOptions':
				var app = model.app;
				var curOpts = app.regionalOptions;
				var _v18 = function () {
					var _v19 = model.regionalOptionsToModify;
					if (_v19.$ === 'Just') {
						var _v20 = _v19.a;
						var regionName = _v20.a;
						var opt = _v20.b;
						return _Utils_Tuple2(
							A3(
								$elm$core$Dict$update,
								regionName,
								function (_v21) {
									return $elm$core$Maybe$Just(opt);
								},
								curOpts),
							$elm$core$Maybe$Nothing);
					} else {
						return _Utils_Tuple2(curOpts, model.regionalOptionsToModify);
					}
				}();
				var newOpts = _v18.a;
				var editingOpt = _v18.b;
				var newApp = _Utils_update(
					app,
					{regionalOptions: newOpts});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, regionalOptionsToModify: editingOpt}),
					$elm$core$Platform$Cmd$none);
			case 'SaveSysReq':
				var app = model.app;
				var runSpec = app.runSpec;
				var sysReqs = $elm$core$Dict$toList(runSpec.systemRequirements);
				var newSysReq = function () {
					var _v22 = model.sysReqToModify;
					if (_v22.$ === 'Just') {
						var _v23 = _v22.a;
						var entryPointName = _v23.a;
						var req = _v23.b;
						var _v24 = model.editingSysReqIndex;
						if (_v24.$ === 'Just') {
							var i = _v24.a;
							return A3(
								$elm_community$list_extra$List$Extra$updateAt,
								i,
								function (_v25) {
									return _Utils_Tuple2(entryPointName, req);
								},
								sysReqs);
						} else {
							return _Utils_ap(
								sysReqs,
								_List_fromArray(
									[
										_Utils_Tuple2(entryPointName, req)
									]));
						}
					} else {
						return sysReqs;
					}
				}();
				var newRunSpec = _Utils_update(
					runSpec,
					{
						systemRequirements: $elm$core$Dict$fromList(newSysReq)
					});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, editingSysReqIndex: $elm$core$Maybe$Nothing, sysReqToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SaveTimeoutPolicy':
				var app = model.app;
				var runSpec = app.runSpec;
				var timeoutPolicy = $elm$core$Dict$toList(runSpec.timeoutPolicy);
				var newTimeoutPolicy = function () {
					var _v26 = model.timeoutPolicyToModify;
					if (_v26.$ === 'Just') {
						var _v27 = _v26.a;
						var entryPointName = _v27.a;
						var policy = _v27.b;
						var _v28 = model.editingTimeoutPolicyIndex;
						if (_v28.$ === 'Just') {
							var i = _v28.a;
							return A3(
								$elm_community$list_extra$List$Extra$updateAt,
								i,
								function (_v29) {
									return _Utils_Tuple2(entryPointName, policy);
								},
								timeoutPolicy);
						} else {
							return _Utils_ap(
								timeoutPolicy,
								_List_fromArray(
									[
										_Utils_Tuple2(entryPointName, policy)
									]));
						}
					} else {
						return timeoutPolicy;
					}
				}();
				var newRunSpec = _Utils_update(
					runSpec,
					{
						timeoutPolicy: $elm$core$Dict$fromList(newTimeoutPolicy)
					});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, editingTimeoutPolicyIndex: $elm$core$Maybe$Nothing, timeoutPolicyToModify: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SetExecDependsToModify':
				var index = msg.a;
				var _v30 = function () {
					var _v31 = A2($elm_community$list_extra$List$Extra$getAt, index, model.app.runSpec.execDepends);
					if (_v31.$ === 'Just') {
						var val = _v31.a;
						return _Utils_Tuple2(
							$elm$core$Maybe$Just(val),
							$elm$core$Maybe$Just(index));
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
					}
				}();
				var newExecDepends = _v30.a;
				var indexValue = _v30.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingExecDependsIndex: indexValue, execDependsToModify: newExecDepends}),
					$elm$core$Platform$Cmd$none);
			case 'SetInputSpecToModify':
				var index = msg.a;
				var _v32 = function () {
					var _v33 = A2($elm_community$list_extra$List$Extra$getAt, index, model.app.inputSpec);
					if (_v33.$ === 'Just') {
						var val = _v33.a;
						return _Utils_Tuple2(
							$elm$core$Maybe$Just(val),
							$elm$core$Maybe$Just(index));
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
					}
				}();
				var newInputSpec = _v32.a;
				var indexValue = _v32.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingInputSpecIndex: indexValue, inputSpecToModify: newInputSpec}),
					$elm$core$Platform$Cmd$none);
			case 'SetOutputSpecToModify':
				var index = msg.a;
				var _v34 = function () {
					var _v35 = A2($elm_community$list_extra$List$Extra$getAt, index, model.app.outputSpec);
					if (_v35.$ === 'Just') {
						var val = _v35.a;
						return _Utils_Tuple2(
							$elm$core$Maybe$Just(val),
							$elm$core$Maybe$Just(index));
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
					}
				}();
				var newOutputSpec = _v34.a;
				var indexValue = _v34.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingOutputSpecIndex: indexValue, outputSpecToModify: newOutputSpec}),
					$elm$core$Platform$Cmd$none);
			case 'SetRegionalOptionsToModify':
				var regionName = msg.a;
				var optToModify = A2(
					$elm$core$Maybe$map,
					function (opt) {
						return _Utils_Tuple2(regionName, opt);
					},
					A2($elm$core$Dict$get, regionName, model.app.regionalOptions));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{regionalOptionsToModify: optToModify}),
					$elm$core$Platform$Cmd$none);
			case 'SetSysReqToModify':
				var index = msg.a;
				var sysReqs = $elm$core$Dict$toList(model.app.runSpec.systemRequirements);
				var _v36 = function () {
					var _v37 = A2($elm_community$list_extra$List$Extra$getAt, index, sysReqs);
					if (_v37.$ === 'Just') {
						var val = _v37.a;
						return _Utils_Tuple2(
							$elm$core$Maybe$Just(val),
							$elm$core$Maybe$Just(index));
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
					}
				}();
				var newSysReq = _v36.a;
				var indexValue = _v36.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingSysReqIndex: indexValue, sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'SetTimeoutPolicyToModify':
				var index = msg.a;
				var policies = $elm$core$Dict$toList(model.app.runSpec.timeoutPolicy);
				var _v38 = function () {
					var _v39 = A2($elm_community$list_extra$List$Extra$getAt, index, policies);
					if (_v39.$ === 'Just') {
						var val = _v39.a;
						return _Utils_Tuple2(
							$elm$core$Maybe$Just(val),
							$elm$core$Maybe$Just(index));
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
					}
				}();
				var newTimeoutPolicy = _v38.a;
				var indexValue = _v38.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingTimeoutPolicyIndex: indexValue, timeoutPolicyToModify: newTimeoutPolicy}),
					$elm$core$Platform$Cmd$none);
			case 'ShowJsonDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							incomingJson: $elm$core$Maybe$Just(
								$author$project$Main$encodeApp(model.app))
						}),
					$elm$core$Platform$Cmd$none);
			case 'TabMsg':
				var state = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{tabState: state}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleAccessSpecDeveloper':
				var app = model.app;
				var access = app.access;
				var newAccess = _Utils_update(
					access,
					{developer: !access.developer});
				var newApp = _Utils_update(
					app,
					{access: newAccess});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleAccessSpecProjectCreation':
				var app = model.app;
				var access = app.access;
				var newAccess = _Utils_update(
					access,
					{projectCreation: !access.projectCreation});
				var newApp = _Utils_update(
					app,
					{access: newAccess});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleInputSpecOptional':
				var newInputSpecToModify = function () {
					var _v40 = model.inputSpecToModify;
					if (_v40.$ === 'Just') {
						var spec = _v40.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								spec,
								{optional: !spec.optional}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateCustomCategory':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{customCategory: val}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAuthorizedUser':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							authorizedUser: $elm$core$String$trim(val)
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateDeveloper':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							developer: $elm$core$String$trim(val)
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAddAuthorizedUser':
				var app = model.app;
				var newAuthorizedUsers = $elm$core$String$isEmpty(model.authorizedUser) ? app.authorizedUsers : A2($author$project$Main$mkSortedUniqList, app.authorizedUsers, model.authorizedUser);
				var newApp = _Utils_update(
					app,
					{authorizedUsers: newAuthorizedUsers});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, authorizedUser: ''}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAddDeveloper':
				var app = model.app;
				var newDevelopers = $elm$core$String$isEmpty(model.developer) ? app.developers : A2($author$project$Main$mkSortedUniqList, app.developers, model.developer);
				var newApp = _Utils_update(
					app,
					{developers: newDevelopers});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, developer: ''}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppAddCustomCategory':
				var customCat = $elm$core$String$trim(model.customCategory);
				var app = model.app;
				var _v41 = function () {
					var _v42 = !$elm$core$String$length(customCat);
					if (_v42) {
						return _Utils_Tuple2(customCat, app.categories);
					} else {
						return _Utils_Tuple2(
							'',
							$elm$core$List$sort(
								_Utils_ap(
									app.categories,
									_List_fromArray(
										[customCat]))));
					}
				}();
				var newCustomCat = _v41.a;
				var newCats = _v41.b;
				var newApp = _Utils_update(
					app,
					{categories: newCats});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, customCategory: newCustomCat}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAccessSpecNetwork':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{accessSpecNetwork: val}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAccessSpecAllProjects':
				var val = msg.a;
				var app = model.app;
				var access = app.access;
				var newAccess = _Utils_update(
					access,
					{allProjects: val});
				var newApp = _Utils_update(
					app,
					{access: newAccess});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAccessSpecProject':
				var val = msg.a;
				var app = model.app;
				var access = app.access;
				var newAccess = _Utils_update(
					access,
					{project: val});
				var newApp = _Utils_update(
					app,
					{access: newAccess});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAccessSpecAddNetwork':
				var app = model.app;
				var access = app.access;
				var newAccess = _Utils_update(
					access,
					{
						network: _Utils_ap(
							$elm$core$List$sort(access.network),
							_List_fromArray(
								[model.accessSpecNetwork]))
					});
				var newApp = _Utils_update(
					app,
					{access: newAccess});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{accessSpecNetwork: '', app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppCategories':
				var newCat = msg.a;
				var app = model.app;
				var newCats = function () {
					var _v43 = A2($elm$core$String$startsWith, '--', newCat);
					if (_v43) {
						return app.categories;
					} else {
						return $elm$core$List$sort(
							_Utils_ap(
								app.categories,
								_List_fromArray(
									[newCat])));
					}
				}();
				var newApp = _Utils_update(
					app,
					{categories: newCats});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppDescription':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{description: val});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppDxapi':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{dxapi: val});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppName':
				var val = msg.a;
				var newVal = A3(
					$elm$core$String$replace,
					' ',
					'_',
					$elm$core$String$toLower(val));
				var badChars = A2(
					$elm$core$Maybe$withDefault,
					$elm$regex$Regex$never,
					$elm$regex$Regex$fromString('[^a-z0-9_]'));
				var app = model.app;
				var _v44 = function () {
					var _v45 = A2($elm$regex$Regex$contains, badChars, newVal);
					if (_v45) {
						return _Utils_Tuple2(
							app.name,
							$elm$core$Maybe$Just('Disallowed character in name'));
					} else {
						return _Utils_Tuple2(newVal, $elm$core$Maybe$Nothing);
					}
				}();
				var newName = _v44.a;
				var err = _v44.b;
				var newApp = _Utils_update(
					app,
					{name: newName});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, error: err}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppDeveloperNotes':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{developerNotes: val});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppSummary':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{summary: val});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppTitle':
				var val = msg.a;
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{title: val});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateAppVersion':
				var val = msg.a;
				var error = function () {
					var _v46 = $author$project$Main$isSemanticVersion(val);
					if (_v46) {
						return $elm$core$Maybe$Nothing;
					} else {
						return $elm$core$Maybe$Just('Not a semantic version');
					}
				}();
				var app = model.app;
				var newApp = _Utils_update(
					app,
					{version: val});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, error: error}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateExecDependsStage':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{execDependsStage: val}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateExecDependsAddStage':
				var newExec = A2(
					$elm$core$Maybe$map,
					function (exec) {
						return _Utils_update(
							exec,
							{
								stages: $elm$core$List$sort(
									_Utils_ap(
										exec.stages,
										_List_fromArray(
											[model.execDependsStage])))
							});
					},
					model.execDependsToModify);
				var app = model.app;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{execDependsStage: '', execDependsToModify: newExec}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateExecDependsName':
				var val = msg.a;
				var newExecDependsToModify = function () {
					var _v47 = model.execDependsToModify;
					if (_v47.$ === 'Just') {
						var execDependsToModify = _v47.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								execDependsToModify,
								{name: val}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{execDependsToModify: newExecDependsToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateExecDependsPackageManager':
				var val = msg.a;
				var newExecDependsToModify = function () {
					var _v48 = model.execDependsToModify;
					if (_v48.$ === 'Just') {
						var execDependsToModify = _v48.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								execDependsToModify,
								{packageManager: val}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{execDependsToModify: newExecDependsToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateExecDependsVersion':
				var val = msg.a;
				var newExecDependsToModify = function () {
					var _v49 = model.execDependsToModify;
					if (_v49.$ === 'Just') {
						var execDependsToModify = _v49.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								execDependsToModify,
								{version: val}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{execDependsToModify: newExecDependsToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateHttpsAppPort':
				var val = msg.a;
				var newPort = $elm$core$String$toInt(
					$elm$core$String$trim(val));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{httpsAppPort: newPort}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateHttpsAppAddPort':
				var app = model.app;
				var httpsApp = app.httpsApp;
				var newPorts = function () {
					var _v50 = model.httpsAppPort;
					if (_v50.$ === 'Just') {
						var newPort = _v50.a;
						return _Utils_ap(
							httpsApp.ports,
							_List_fromArray(
								[newPort]));
					} else {
						return httpsApp.ports;
					}
				}();
				var newHttpsApp = _Utils_update(
					httpsApp,
					{ports: newPorts});
				var newApp = _Utils_update(
					app,
					{httpsApp: newHttpsApp});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp, httpsAppPort: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateHttpsAppSharedAccess':
				var val = msg.a;
				var app = model.app;
				var httpsApp = app.httpsApp;
				var newHttpsApp = _Utils_update(
					httpsApp,
					{sharedAccess: val});
				var newApp = _Utils_update(
					app,
					{httpsApp: newHttpsApp});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecName':
				var val = msg.a;
				var notAllowed = A2(
					$elm$core$Maybe$withDefault,
					$elm$regex$Regex$never,
					$elm$regex$Regex$fromString('[^0-9a-zA-Z_]'));
				var newName = A3($elm$core$String$replace, ' ', '_', val);
				var cleaned = A3(
					$elm$regex$Regex$replace,
					notAllowed,
					function (_v52) {
						return '';
					},
					newName);
				var newInputSpecToModify = function () {
					var _v51 = model.inputSpecToModify;
					if (_v51.$ === 'Just') {
						var spec = _v51.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								spec,
								{name: cleaned}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecClass':
				var val = msg.a;
				var _v53 = function () {
					switch (val) {
						case 'int':
							return _Utils_Tuple2($author$project$Main$InputSpecInt, '0');
						case 'float':
							return _Utils_Tuple2($author$project$Main$InputSpecFloat, '0.0');
						case 'boolean':
							return _Utils_Tuple2($author$project$Main$InputSpecBool, 'False');
						default:
							return _Utils_Tuple2($author$project$Main$InputSpecString, '');
					}
				}();
				var newType = _v53.a;
				var newDefaultValue = _v53.b;
				var newInputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{_class: newType});
					},
					model.inputSpecToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpecToModify, inputSpecToModifyDefault: newDefaultValue}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecDefault':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModifyDefault: val}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecHelp':
				var val = msg.a;
				var newInputSpecToModify = function () {
					var _v55 = model.inputSpecToModify;
					if (_v55.$ === 'Just') {
						var spec = _v55.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								spec,
								{help: val}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecChoice':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							inputSpecChoice: $elm$core$String$trim(val)
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecCustomPattern':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							inputSpecPattern: $elm$core$String$trim(val)
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecAddChoice':
				var newChoice = model.inputSpecChoice;
				var newInputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								choices: $Chadtech$unique_list$List$Unique$toList(
									$Chadtech$unique_list$List$Unique$fromList(
										$elm$core$List$sort(
											_Utils_ap(
												spec.choices,
												_List_fromArray(
													[newChoice])))))
							});
					},
					model.inputSpecToModify);
				var app = model.app;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecChoice: '', inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecAddCustomPattern':
				var newPat = model.inputSpecPattern;
				var newInputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								patterns: $Chadtech$unique_list$List$Unique$toList(
									$Chadtech$unique_list$List$Unique$fromList(
										$elm$core$List$sort(
											_Utils_ap(
												spec.patterns,
												_List_fromArray(
													[newPat])))))
							});
					},
					model.inputSpecToModify);
				var app = model.app;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecPattern: '', inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecAddPattern':
				var newPat = msg.a;
				var newInputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								patterns: $Chadtech$unique_list$List$Unique$toList(
									$Chadtech$unique_list$List$Unique$fromList(
										$elm$core$List$sort(
											_Utils_ap(
												spec.patterns,
												_List_fromArray(
													[newPat])))))
							});
					},
					model.inputSpecToModify);
				var app = model.app;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateInputSpecLabel':
				var val = msg.a;
				var newInputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{label: val});
					},
					model.inputSpecToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputSpecToModify: newInputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateIncomingJson':
				var json = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							incomingJson: $elm$core$Maybe$Just(json)
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateOutputSpecCustomPattern':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							outputSpecPattern: $elm$core$String$trim(val)
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateOutputSpecAddPattern':
				var newPat = msg.a;
				var newOutputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								patterns: $elm$core$List$sort(
									_Utils_ap(
										spec.patterns,
										_List_fromArray(
											[newPat])))
							});
					},
					model.outputSpecToModify);
				var app = model.app;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{outputSpecToModify: newOutputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateOutputSpecAddCustomPattern':
				var newPat = model.outputSpecPattern;
				var newOutputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{
								patterns: $elm$core$List$sort(
									_Utils_ap(
										spec.patterns,
										_List_fromArray(
											[newPat])))
							});
					},
					model.outputSpecToModify);
				var app = model.app;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{outputSpecPattern: '', outputSpecToModify: newOutputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateOutputSpecClass':
				var val = msg.a;
				var newOutputSpecToModify = A2(
					$elm$core$Maybe$map,
					function (spec) {
						return _Utils_update(
							spec,
							{_class: val});
					},
					model.outputSpecToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{outputSpecToModify: newOutputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateOutputSpecName':
				var val = msg.a;
				var notAllowed = A2(
					$elm$core$Maybe$withDefault,
					$elm$regex$Regex$never,
					$elm$regex$Regex$fromString('[^0-9a-zA-Z_]'));
				var newName = A3($elm$core$String$replace, ' ', '_', val);
				var cleaned = A3(
					$elm$regex$Regex$replace,
					notAllowed,
					function (_v57) {
						return '';
					},
					newName);
				var newOutputSpecToModify = function () {
					var _v56 = model.outputSpecToModify;
					if (_v56.$ === 'Just') {
						var spec = _v56.a;
						return $elm$core$Maybe$Just(
							_Utils_update(
								spec,
								{name: cleaned}));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{outputSpecToModify: newOutputSpecToModify}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRegionalOptionsRegionName':
				var val = msg.a;
				var newOpts = A2(
					$elm$core$Maybe$map,
					function (_v58) {
						var regionName = _v58.a;
						var opts = _v58.b;
						return _Utils_Tuple2(val, opts);
					},
					model.regionalOptionsToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{regionalOptionsToModify: newOpts}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRegionalOptionsResources':
				var val = msg.a;
				var newOpts = A2(
					$elm$core$Maybe$map,
					function (_v59) {
						var regionName = _v59.a;
						var opts = _v59.b;
						return _Utils_Tuple2(
							regionName,
							_Utils_update(
								opts,
								{resources: val}));
					},
					model.regionalOptionsToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{regionalOptionsToModify: newOpts}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRunSpecInterpreter':
				var val = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{interpreter: val});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRunSpecDistribution':
				var val = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{distribution: val});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRunSpecRelease':
				var val = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{release: val});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRunSpecRestartableEntryPoints':
				var val = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{restartableEntryPoints: val});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRunSpecVersion':
				var val = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{version: val});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateRunSpecFile':
				var val = msg.a;
				var app = model.app;
				var runSpec = app.runSpec;
				var newRunSpec = _Utils_update(
					runSpec,
					{file: val});
				var newApp = _Utils_update(
					app,
					{runSpec: newRunSpec});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{app: newApp}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqHost':
				var val = msg.a;
				var newHost = function () {
					switch (val) {
						case 'Azure':
							return $author$project$Main$Azure;
						case 'GPU':
							return $author$project$Main$Gpu;
						default:
							return $author$project$Main$Aws;
					}
				}();
				var newInstanceType = function () {
					switch (newHost.$) {
						case 'Aws':
							return 'mem2_hdd2_x2';
						case 'Azure':
							return 'azure:mem1_ssd1_x2';
						default:
							return 'mem1_ssd1_gpu2_x8';
					}
				}();
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v60) {
						var entryPointName = _v60.a;
						var sysReq = _v60.b;
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{instanceType: newInstanceType}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingSysReqHost: $elm$core$Maybe$Just(newHost),
							sysReqToModify: newSysReq
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqEntryPointName':
				var val = msg.a;
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v63) {
						var entryPointName = _v63.a;
						var sysReq = _v63.b;
						return _Utils_Tuple2(val, sysReq);
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqInstanceType':
				var val = msg.a;
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v64) {
						var entryPointName = _v64.a;
						var sysReq = _v64.b;
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{instanceType: val}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqClusterSpecType':
				var val = msg.a;
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v65) {
						var entryPointName = _v65.a;
						var sysReq = _v65.b;
						var clusterSpec = sysReq.clusterSpec;
						var newClusterSpec = _Utils_update(
							clusterSpec,
							{type_: val, version: ''});
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{clusterSpec: newClusterSpec}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqClusterSpecInitialInstanceCount':
				var val = msg.a;
				var newCount = A2(
					$elm$core$Maybe$withDefault,
					1,
					$elm$core$String$toInt(val));
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v66) {
						var entryPointName = _v66.a;
						var sysReq = _v66.b;
						var clusterSpec = sysReq.clusterSpec;
						var newClusterSpec = _Utils_update(
							clusterSpec,
							{initialInstanceCount: newCount});
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{clusterSpec: newClusterSpec}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqClusterSpecBootstrapScript':
				var val = msg.a;
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v67) {
						var entryPointName = _v67.a;
						var sysReq = _v67.b;
						var clusterSpec = sysReq.clusterSpec;
						var newClusterSpec = _Utils_update(
							clusterSpec,
							{bootstrapScript: val});
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{clusterSpec: newClusterSpec}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqClusterSpecPorts':
				var val = msg.a;
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v68) {
						var entryPointName = _v68.a;
						var sysReq = _v68.b;
						var clusterSpec = sysReq.clusterSpec;
						var newClusterSpec = _Utils_update(
							clusterSpec,
							{ports: val});
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{clusterSpec: newClusterSpec}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSysReqClusterSpecVersion':
				var val = msg.a;
				var newSysReq = A2(
					$elm$core$Maybe$map,
					function (_v69) {
						var entryPointName = _v69.a;
						var sysReq = _v69.b;
						var clusterSpec = sysReq.clusterSpec;
						var newClusterSpec = _Utils_update(
							clusterSpec,
							{version: val});
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								sysReq,
								{clusterSpec: newClusterSpec}));
					},
					model.sysReqToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sysReqToModify: newSysReq}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateTimeoutPolicyEntryPointName':
				var val = msg.a;
				var newTimeout = A2(
					$elm$core$Maybe$map,
					function (_v70) {
						var entryPointName = _v70.a;
						var policy = _v70.b;
						return _Utils_Tuple2(val, policy);
					},
					model.timeoutPolicyToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timeoutPolicyToModify: newTimeout}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateTimeoutPolicyHours':
				var val = msg.a;
				var trimmed = $elm$core$String$trim(val);
				var newVal = $elm$core$String$isEmpty(trimmed) ? '0' : trimmed;
				var newTimeout = A2(
					$elm$core$Maybe$map,
					function (_v71) {
						var entryPointName = _v71.a;
						var timeout = _v71.b;
						var newHours = A2(
							$elm$core$Maybe$withDefault,
							timeout.hours,
							$elm$core$String$toInt(newVal));
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								timeout,
								{hours: newHours}));
					},
					model.timeoutPolicyToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timeoutPolicyToModify: newTimeout}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateTimeoutPolicyMinutes':
				var val = msg.a;
				var trimmed = $elm$core$String$trim(val);
				var newVal = $elm$core$String$isEmpty(trimmed) ? '0' : trimmed;
				var newTimeout = A2(
					$elm$core$Maybe$map,
					function (_v72) {
						var entryPointName = _v72.a;
						var timeout = _v72.b;
						var newMinutes = A2(
							$elm$core$Maybe$withDefault,
							timeout.minutes,
							$elm$core$String$toInt(newVal));
						return _Utils_Tuple2(
							entryPointName,
							_Utils_update(
								timeout,
								{minutes: newMinutes}));
					},
					model.timeoutPolicyToModify);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timeoutPolicyToModify: newTimeout}),
					$elm$core$Platform$Cmd$none);
			case 'UrlChanged':
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{url: url}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $rundis$elm_bootstrap$Bootstrap$Tab$Config = function (a) {
	return {$: 'Config', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Tab$config = function (toMsg) {
	return $rundis$elm_bootstrap$Bootstrap$Tab$Config(
		{attributes: _List_Nil, isPill: false, items: _List_Nil, layout: $elm$core$Maybe$Nothing, toMsg: toMsg, useHash: false, withAnimation: false});
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $rundis$elm_bootstrap$Bootstrap$Grid$container = F2(
	function (attributes, children) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				attributes),
			children);
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $rundis$elm_bootstrap$Bootstrap$Tab$Item = function (a) {
	return {$: 'Item', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Tab$item = function (rec) {
	return $rundis$elm_bootstrap$Bootstrap$Tab$Item(
		{id: rec.id, link: rec.link, pane: rec.pane});
};
var $rundis$elm_bootstrap$Bootstrap$Tab$items = F2(
	function (items_, _v0) {
		var configRec = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Tab$Config(
			_Utils_update(
				configRec,
				{items: items_}));
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$Link = function (a) {
	return {$: 'Link', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Tab$link = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Tab$Link(
			{attributes: attributes, children: children});
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$Pane = function (a) {
	return {$: 'Pane', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Tab$pane = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Tab$Pane(
			{attributes: attributes, children: children});
	});
var $author$project$Main$DeleteAccessSpecNetwork = function (a) {
	return {$: 'DeleteAccessSpecNetwork', a: a};
};
var $author$project$Main$ToggleAccessSpecDeveloper = {$: 'ToggleAccessSpecDeveloper'};
var $author$project$Main$ToggleAccessSpecProjectCreation = {$: 'ToggleAccessSpecProjectCreation'};
var $author$project$Main$UpdateAccessSpecAddNetwork = {$: 'UpdateAccessSpecAddNetwork'};
var $author$project$Main$UpdateAccessSpecAllProjects = function (a) {
	return {$: 'UpdateAccessSpecAllProjects', a: a};
};
var $author$project$Main$UpdateAccessSpecNetwork = function (a) {
	return {$: 'UpdateAccessSpecNetwork', a: a};
};
var $author$project$Main$UpdateAccessSpecProject = function (a) {
	return {$: 'UpdateAccessSpecProject', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$th = _VirtualDom_node('th');
var $author$project$Main$mkTh = function (label) {
	return A2(
		$elm$html$Html$th,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'align', 'right')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(label)
			]));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$Main$mkRowCheckbox = F3(
	function (label, state, msg) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('checkbox'),
									$elm$html$Html$Events$onClick(msg),
									$elm$html$Html$Attributes$checked(state),
									$elm$html$Html$Attributes$class('form-control')
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$Main$mkRowHtml = F2(
	function (label, html) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[html]))
				]));
	});
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$mkRowSelect = F4(
	function (label, optList, curOpt, msg) {
		var mkOption = function (val) {
			return A2(
				$elm$html$Html$option,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value(val),
						$elm$html$Html$Attributes$selected(
						_Utils_eq(val, curOpt))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(val)
					]));
		};
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$select,
							_List_fromArray(
								[
									$elm$html$Html$Events$onInput(msg)
								]),
							A2($elm$core$List$map, mkOption, optList))
						]))
				]));
	});
var $elm$html$Html$Attributes$size = function (n) {
	return A2(
		_VirtualDom_attribute,
		'size',
		$elm$core$String$fromInt(n));
};
var $author$project$Main$mkRowTextEntrySubmit = F4(
	function (label, defValue, inputMsg, submitMsg) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('text'),
									$elm$html$Html$Attributes$value(defValue),
									$elm$html$Html$Attributes$class('form-control'),
									$elm$html$Html$Events$onInput(inputMsg),
									$elm$html$Html$Attributes$size(60)
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('btn btn-default'),
									$elm$html$Html$Attributes$type_('button'),
									$elm$html$Html$Events$onClick(submitMsg)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Add')
								]))
						]))
				]));
	});
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Main$validAccessSpecOptions = _List_fromArray(
	['', 'VIEW', 'UPLOAD', 'CONTRIBUTE', 'ADMINISTER']);
var $author$project$Main$paneAccessSpec = function (model) {
	var spec = model.app.access;
	var mkLi = function (val) {
		return A2(
			$elm$html$Html$li,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(val),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Attributes$class('btn btn-default'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$DeleteAccessSpecNetwork(val))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Delete')
						]))
				]));
	};
	var curNetworks = function () {
		var _v0 = $elm$core$List$length(spec.network) > 0;
		if (_v0) {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2($elm$core$List$map, mkLi, spec.network));
		} else {
			return $elm$html$Html$text('None');
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$form,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_Nil,
						_List_fromArray(
							[
								A2($author$project$Main$mkRowHtml, 'Network', curNetworks),
								A4($author$project$Main$mkRowTextEntrySubmit, 'Add Network', model.accessSpecNetwork, $author$project$Main$UpdateAccessSpecNetwork, $author$project$Main$UpdateAccessSpecAddNetwork),
								A4($author$project$Main$mkRowSelect, 'Project', $author$project$Main$validAccessSpecOptions, spec.project, $author$project$Main$UpdateAccessSpecProject),
								A4($author$project$Main$mkRowSelect, 'All Projects', $author$project$Main$validAccessSpecOptions, spec.allProjects, $author$project$Main$UpdateAccessSpecAllProjects),
								A3($author$project$Main$mkRowCheckbox, 'Developer', spec.developer, $author$project$Main$ToggleAccessSpecDeveloper),
								A3($author$project$Main$mkRowCheckbox, 'Project Creation', spec.projectCreation, $author$project$Main$ToggleAccessSpecProjectCreation)
							]))
					]))
			]));
};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Main$paneDebug = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(
				$elm$core$Debug$toString(model))
			]));
};
var $author$project$Main$ModifyExecDependsDialog = F2(
	function (a, b) {
		return {$: 'ModifyExecDependsDialog', a: a, b: b};
	});
var $author$project$Main$DeleteExecDepends = function (a) {
	return {$: 'DeleteExecDepends', a: a};
};
var $author$project$Main$SetExecDependsToModify = function (a) {
	return {$: 'SetExecDependsToModify', a: a};
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $author$project$Main$execDependsTable = function (execDepends) {
	var inputTr = F2(
		function (index, dep) {
			return A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(dep.name)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(dep.packageManager)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(dep.version)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($elm$core$String$join, ', ', dep.stages))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$SetExecDependsToModify(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Edit')
									]))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$DeleteExecDepends(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Delete')
									]))
							]))
					]));
		});
	var tbl = A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('table')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Name')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Package Manager')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Version')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Stages')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									]))
							]))
					])),
				A2(
				$elm$html$Html$tbody,
				_List_Nil,
				A2($elm$core$List$indexedMap, inputTr, execDepends))
			]));
	var _v0 = $elm$core$List$isEmpty(execDepends);
	if (_v0) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No dependencies')
				]));
	} else {
		return tbl;
	}
};
var $author$project$Main$initialExecDepends = {name: 'package_name', packageManager: 'apt', stages: _List_Nil, version: ''};
var $author$project$Main$CloseExecDependsDialog = {$: 'CloseExecDependsDialog'};
var $author$project$Main$DeleteExecDependsStage = function (a) {
	return {$: 'DeleteExecDependsStage', a: a};
};
var $author$project$Main$SaveExecDepends = {$: 'SaveExecDepends'};
var $author$project$Main$UpdateExecDependsAddStage = {$: 'UpdateExecDependsAddStage'};
var $author$project$Main$UpdateExecDependsName = function (a) {
	return {$: 'UpdateExecDependsName', a: a};
};
var $author$project$Main$UpdateExecDependsPackageManager = function (a) {
	return {$: 'UpdateExecDependsPackageManager', a: a};
};
var $author$project$Main$UpdateExecDependsStage = function (a) {
	return {$: 'UpdateExecDependsStage', a: a};
};
var $author$project$Main$UpdateExecDependsVersion = function (a) {
	return {$: 'UpdateExecDependsVersion', a: a};
};
var $author$project$Main$mkRowTextEntry = F3(
	function (label, defValue, msg) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('text'),
									$elm$html$Html$Attributes$value(defValue),
									$elm$html$Html$Attributes$class('form-control'),
									$elm$html$Html$Events$onInput(msg),
									$elm$html$Html$Attributes$size(60)
								]),
							_List_Nil)
						]))
				]));
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $alex_tan$elm_dialog$Dialog$isJust = function (m) {
	if (m.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $alex_tan$elm_dialog$Dialog$backdrop = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'modal-backdrop in',
						$alex_tan$elm_dialog$Dialog$isJust(config))
					]))
			]),
		_List_Nil);
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $alex_tan$elm_dialog$Dialog$empty = A2($elm$html$Html$span, _List_Nil, _List_Nil);
var $alex_tan$elm_dialog$Dialog$maybe = F3(
	function (_default, f, value) {
		if (value.$ === 'Just') {
			var value_ = value.a;
			return f(value_);
		} else {
			return _default;
		}
	});
var $alex_tan$elm_dialog$Dialog$wrapBody = function (body) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('modal-body')
			]),
		_List_fromArray(
			[body]));
};
var $alex_tan$elm_dialog$Dialog$wrapFooter = function (footer) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('modal-footer')
			]),
		_List_fromArray(
			[footer]));
};
var $alex_tan$elm_dialog$Dialog$closeButton = function (closeMessage) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('close'),
				$elm$html$Html$Events$onClick(closeMessage)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('x')
			]));
};
var $alex_tan$elm_dialog$Dialog$wrapHeader = F2(
	function (closeMessage, header) {
		return (_Utils_eq(closeMessage, $elm$core$Maybe$Nothing) && _Utils_eq(header, $elm$core$Maybe$Nothing)) ? $alex_tan$elm_dialog$Dialog$empty : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal-header')
				]),
			_List_fromArray(
				[
					A3($alex_tan$elm_dialog$Dialog$maybe, $alex_tan$elm_dialog$Dialog$empty, $alex_tan$elm_dialog$Dialog$closeButton, closeMessage),
					A2($elm$core$Maybe$withDefault, $alex_tan$elm_dialog$Dialog$empty, header)
				]));
	});
var $alex_tan$elm_dialog$Dialog$view = function (maybeConfig) {
	var displayed = $alex_tan$elm_dialog$Dialog$isJust(maybeConfig);
	return A2(
		$elm$html$Html$div,
		function () {
			var _v0 = A2(
				$elm$core$Maybe$andThen,
				function ($) {
					return $.containerClass;
				},
				maybeConfig);
			if (_v0.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var containerClass = _v0.a;
				return _List_fromArray(
					[
						$elm$html$Html$Attributes$class(containerClass)
					]);
			}
		}(),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('modal', true),
								_Utils_Tuple2('in', displayed)
							])),
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						displayed ? 'block' : 'none')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-dialog')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('modal-content')
									]),
								function () {
									if (maybeConfig.$ === 'Nothing') {
										return _List_fromArray(
											[$alex_tan$elm_dialog$Dialog$empty]);
									} else {
										var config = maybeConfig.a;
										return _List_fromArray(
											[
												A2($alex_tan$elm_dialog$Dialog$wrapHeader, config.closeMessage, config.header),
												A3($alex_tan$elm_dialog$Dialog$maybe, $alex_tan$elm_dialog$Dialog$empty, $alex_tan$elm_dialog$Dialog$wrapBody, config.body),
												A3($alex_tan$elm_dialog$Dialog$maybe, $alex_tan$elm_dialog$Dialog$empty, $alex_tan$elm_dialog$Dialog$wrapFooter, config.footer)
											]);
									}
								}())
							]))
					])),
				$alex_tan$elm_dialog$Dialog$backdrop(maybeConfig)
			]));
};
var $author$project$Main$modifyExecDependsDialog = function (model) {
	var mkLi = function (val) {
		return A2(
			$elm$html$Html$li,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(val),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Attributes$class('btn btn-default'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$DeleteExecDependsStage(val))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Delete')
						]))
				]));
	};
	var curStages = function (stages) {
		var _v1 = $elm$core$List$length(stages) > 0;
		if (_v1) {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2($elm$core$List$map, mkLi, stages));
		} else {
			return $elm$html$Html$text('None');
		}
	};
	var tbl = function (execDepends) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
							A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$form,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$table,
									_List_Nil,
									_List_fromArray(
										[
											A3($author$project$Main$mkRowTextEntry, 'Name', execDepends.name, $author$project$Main$UpdateExecDependsName),
											A3($author$project$Main$mkRowTextEntry, 'Package Manager', execDepends.packageManager, $author$project$Main$UpdateExecDependsPackageManager),
											A3($author$project$Main$mkRowTextEntry, 'Version', execDepends.version, $author$project$Main$UpdateExecDependsVersion),
											A2(
											$author$project$Main$mkRowHtml,
											'Stages',
											curStages(execDepends.stages)),
											A4($author$project$Main$mkRowTextEntrySubmit, 'Stage', model.execDependsStage, $author$project$Main$UpdateExecDependsStage, $author$project$Main$UpdateExecDependsAddStage)
										]))
								]))
						]))
				]));
	};
	return $alex_tan$elm_dialog$Dialog$view(
		function () {
			var _v0 = model.execDependsToModify;
			if (_v0.$ === 'Just') {
				var input = _v0.a;
				return $elm$core$Maybe$Just(
					{
						body: $elm$core$Maybe$Just(
							tbl(input)),
						closeMessage: $elm$core$Maybe$Nothing,
						containerClass: $elm$core$Maybe$Nothing,
						footer: $elm$core$Maybe$Just(
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$SaveExecDepends)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Save')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-default'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$CloseExecDependsDialog)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Cancel')
											]))
									]))),
						header: $elm$core$Maybe$Just(
							$elm$html$Html$text('Add Input'))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $author$project$Main$paneExecDepends = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('button'),
						$elm$html$Html$Attributes$class('btn btn-default'),
						$elm$html$Html$Events$onClick(
						A2($author$project$Main$ModifyExecDependsDialog, $author$project$Main$initialExecDepends, $elm$core$Maybe$Nothing))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Add Dependency')
					])),
				$author$project$Main$modifyExecDependsDialog(model),
				$author$project$Main$execDependsTable(model.app.runSpec.execDepends)
			]));
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Main$paneHelp = function () {
	var helpUrl = 'https://documentation.dnanexus.com/developer/apps/' + 'advanced-app-tutorial';
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Docs')
					])),
				$elm$html$Html$text('This interface allows you to edit the dxapp.json file')
			]));
}();
var $author$project$Main$DeleteHttpsAppPort = function (a) {
	return {$: 'DeleteHttpsAppPort', a: a};
};
var $author$project$Main$UpdateHttpsAppAddPort = {$: 'UpdateHttpsAppAddPort'};
var $author$project$Main$UpdateHttpsAppPort = function (a) {
	return {$: 'UpdateHttpsAppPort', a: a};
};
var $author$project$Main$UpdateHttpsAppSharedAccess = function (a) {
	return {$: 'UpdateHttpsAppSharedAccess', a: a};
};
var $author$project$Main$paneHttpsApp = function (model) {
	var mkLi = F2(
		function (index, val) {
			return A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(val),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$class('btn btn-default'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$DeleteHttpsAppPort(index))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Delete')
							]))
					]));
		});
	var httpsApp = model.app.httpsApp;
	var ports = httpsApp.ports;
	var curPorts = function () {
		var _v0 = $elm$core$List$isEmpty(ports);
		if (_v0) {
			return $elm$html$Html$text('No ports');
		} else {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$indexedMap,
					mkLi,
					A2($elm$core$List$map, $elm$core$String$fromInt, ports)));
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$form,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$author$project$Main$mkRowTextEntrySubmit,
								'Add Port',
								A2(
									$elm$core$Maybe$withDefault,
									'',
									A2($elm$core$Maybe$map, $elm$core$String$fromInt, model.httpsAppPort)),
								$author$project$Main$UpdateHttpsAppPort,
								$author$project$Main$UpdateHttpsAppAddPort),
								A2($author$project$Main$mkRowHtml, 'Ports', curPorts),
								A4(
								$author$project$Main$mkRowSelect,
								'Shard Access',
								_List_fromArray(
									['', 'VIEW', 'CONTRIBUTE', 'ADMINISTER', 'NONE']),
								httpsApp.sharedAccess,
								$author$project$Main$UpdateHttpsAppSharedAccess)
							]))
					]))
			]));
};
var $author$project$Main$ModifyInputSpecDialog = F2(
	function (a, b) {
		return {$: 'ModifyInputSpecDialog', a: a, b: b};
	});
var $author$project$Main$initialInputSpec = {
	choices: _List_Nil,
	_class: $author$project$Main$InputSpecString,
	_default: $author$project$Main$DefaultValString(''),
	group: '',
	help: '',
	label: 'Human-readable label',
	name: 'input_name',
	optional: false,
	patterns: _List_Nil,
	type_: ''
};
var $author$project$Main$DeleteInputSpec = function (a) {
	return {$: 'DeleteInputSpec', a: a};
};
var $author$project$Main$SetInputSpecToModify = function (a) {
	return {$: 'SetInputSpecToModify', a: a};
};
var $author$project$Main$inputSpecTable = function (inputSpec) {
	var inputTr = F2(
		function (index, spec) {
			return A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(spec.name)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(spec.label)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Main$inputSpecClassToString(spec._class))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								spec.optional ? 'True' : 'False')
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$SetInputSpecToModify(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Edit')
									]))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$DeleteInputSpec(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Delete')
									]))
							]))
					]));
		});
	var tbl = A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('table')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Name')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Label')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Class')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Optional')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									]))
							]))
					])),
				A2(
				$elm$html$Html$tbody,
				_List_Nil,
				A2($elm$core$List$indexedMap, inputTr, inputSpec))
			]));
	var _v0 = $elm$core$List$isEmpty(inputSpec);
	if (_v0) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No input specs')
				]));
	} else {
		return tbl;
	}
};
var $author$project$Main$CloseInputSpecDialog = {$: 'CloseInputSpecDialog'};
var $author$project$Main$DeleteInputSpecChoice = function (a) {
	return {$: 'DeleteInputSpecChoice', a: a};
};
var $author$project$Main$DeleteInputSpecPattern = function (a) {
	return {$: 'DeleteInputSpecPattern', a: a};
};
var $author$project$Main$SaveInputSpec = {$: 'SaveInputSpec'};
var $author$project$Main$SaveInputSpecDefault = {$: 'SaveInputSpecDefault'};
var $author$project$Main$ToggleInputSpecOptional = {$: 'ToggleInputSpecOptional'};
var $author$project$Main$UpdateInputSpecAddChoice = {$: 'UpdateInputSpecAddChoice'};
var $author$project$Main$UpdateInputSpecAddCustomPattern = {$: 'UpdateInputSpecAddCustomPattern'};
var $author$project$Main$UpdateInputSpecAddPattern = function (a) {
	return {$: 'UpdateInputSpecAddPattern', a: a};
};
var $author$project$Main$UpdateInputSpecChoice = function (a) {
	return {$: 'UpdateInputSpecChoice', a: a};
};
var $author$project$Main$UpdateInputSpecClass = function (a) {
	return {$: 'UpdateInputSpecClass', a: a};
};
var $author$project$Main$UpdateInputSpecCustomPattern = function (a) {
	return {$: 'UpdateInputSpecCustomPattern', a: a};
};
var $author$project$Main$UpdateInputSpecDefault = function (a) {
	return {$: 'UpdateInputSpecDefault', a: a};
};
var $author$project$Main$UpdateInputSpecHelp = function (a) {
	return {$: 'UpdateInputSpecHelp', a: a};
};
var $author$project$Main$UpdateInputSpecLabel = function (a) {
	return {$: 'UpdateInputSpecLabel', a: a};
};
var $author$project$Main$UpdateInputSpecName = function (a) {
	return {$: 'UpdateInputSpecName', a: a};
};
var $author$project$Main$commonInputSpecPatterns = _List_fromArray(
	['*', '*.fastq', '*.fq', '*.fasta', '*.fna', '*.fa', '*.faa', '*.sam', '*.bam', '*.bai']);
var $author$project$Main$mkRowText = F2(
	function (label, defValue) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(defValue)
						]))
				]));
	});
var $elm$html$Html$Attributes$cols = function (n) {
	return A2(
		_VirtualDom_attribute,
		'cols',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $author$project$Main$mkRowTextArea = F3(
	function (label, defValue, msg) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$mkTh(label),
					A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$textarea,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$value(defValue),
									$elm$html$Html$Attributes$class('form-control'),
									$elm$html$Html$Events$onInput(msg),
									$elm$html$Html$Attributes$rows(10),
									$elm$html$Html$Attributes$cols(40)
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$Main$modifyInputSpecDialog = function (model) {
	var mkLi = F2(
		function (f, val) {
			return A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(val),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$class('btn btn-default'),
								$elm$html$Html$Events$onClick(
								f(val))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Delete')
							]))
					]));
		});
	var errDiv = function () {
		var _v3 = model.inputSpecToModifyError;
		if (_v3.$ === 'Nothing') {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('')
					]));
		} else {
			var e = _v3.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('alert alert-danger')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Error: ' + e)
					]));
		}
	}();
	var curPatterns = function (pats) {
		var _v2 = $elm$core$List$length(pats) > 0;
		if (_v2) {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					mkLi($author$project$Main$DeleteInputSpecPattern),
					pats));
		} else {
			return $elm$html$Html$text('None');
		}
	};
	var curChoices = function (pats) {
		var _v1 = $elm$core$List$length(pats) > 0;
		if (_v1) {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					mkLi($author$project$Main$DeleteInputSpecChoice),
					pats));
		} else {
			return $elm$html$Html$text('None');
		}
	};
	var classes = _List_fromArray(
		[$author$project$Main$InputSpecApplet, $author$project$Main$InputSpecArrayApplet, $author$project$Main$InputSpecArrayBoolean, $author$project$Main$InputSpecArrayFile, $author$project$Main$InputSpecArrayFloat, $author$project$Main$InputSpecArrayInt, $author$project$Main$InputSpecArrayRecord, $author$project$Main$InputSpecArrayString, $author$project$Main$InputSpecBool, $author$project$Main$InputSpecFile, $author$project$Main$InputSpecFloat, $author$project$Main$InputSpecHash, $author$project$Main$InputSpecInt, $author$project$Main$InputSpecRecord, $author$project$Main$InputSpecString]);
	var tbl = function (spec) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					errDiv,
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
							A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$form,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$table,
									_List_Nil,
									_List_fromArray(
										[
											A3($author$project$Main$mkRowTextEntry, 'Name', spec.name, $author$project$Main$UpdateInputSpecName),
											A3($author$project$Main$mkRowTextEntry, 'Label', spec.label, $author$project$Main$UpdateInputSpecLabel),
											A4(
											$author$project$Main$mkRowSelect,
											'Class',
											A2($elm$core$List$map, $author$project$Main$inputSpecClassToString, classes),
											$author$project$Main$inputSpecClassToString(spec._class),
											$author$project$Main$UpdateInputSpecClass),
											A4($author$project$Main$mkRowTextEntrySubmit, 'Default', model.inputSpecToModifyDefault, $author$project$Main$UpdateInputSpecDefault, $author$project$Main$SaveInputSpecDefault),
											A2(
											$author$project$Main$mkRowText,
											'Default Value',
											$author$project$Main$defaultValueToString(spec._default)),
											A3($author$project$Main$mkRowTextEntry, 'Label', spec.label, $author$project$Main$UpdateInputSpecLabel),
											A4(
											$author$project$Main$mkRowSelect,
											'Select Pattern: ',
											_Utils_ap(
												_List_fromArray(
													['--Select--']),
												$author$project$Main$commonInputSpecPatterns),
											'',
											$author$project$Main$UpdateInputSpecAddPattern),
											A4($author$project$Main$mkRowTextEntrySubmit, 'Add Pattern', model.inputSpecPattern, $author$project$Main$UpdateInputSpecCustomPattern, $author$project$Main$UpdateInputSpecAddCustomPattern),
											A2(
											$author$project$Main$mkRowHtml,
											'Patterns',
											curPatterns(spec.patterns)),
											A4($author$project$Main$mkRowTextEntrySubmit, 'Add Choice', model.inputSpecChoice, $author$project$Main$UpdateInputSpecChoice, $author$project$Main$UpdateInputSpecAddChoice),
											A2(
											$author$project$Main$mkRowHtml,
											'Choices',
											curChoices(spec.choices)),
											A3($author$project$Main$mkRowTextArea, 'Help', spec.help, $author$project$Main$UpdateInputSpecHelp),
											A3($author$project$Main$mkRowCheckbox, 'Optional', spec.optional, $author$project$Main$ToggleInputSpecOptional)
										]))
								]))
						]))
				]));
	};
	return $alex_tan$elm_dialog$Dialog$view(
		function () {
			var _v0 = model.inputSpecToModify;
			if (_v0.$ === 'Just') {
				var spec = _v0.a;
				return $elm$core$Maybe$Just(
					{
						body: $elm$core$Maybe$Just(
							tbl(spec)),
						closeMessage: $elm$core$Maybe$Nothing,
						containerClass: $elm$core$Maybe$Nothing,
						footer: $elm$core$Maybe$Just(
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$SaveInputSpec)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Save')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-default'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$CloseInputSpecDialog)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Cancel')
											]))
									]))),
						header: $elm$core$Maybe$Just(
							$elm$html$Html$text('Add Input'))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $author$project$Main$paneInputSpec = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('button'),
						$elm$html$Html$Attributes$class('btn btn-default'),
						$elm$html$Html$Events$onClick(
						A2($author$project$Main$ModifyInputSpecDialog, $author$project$Main$initialInputSpec, $elm$core$Maybe$Nothing))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Add Input')
					])),
				$author$project$Main$modifyInputSpecDialog(model),
				$author$project$Main$inputSpecTable(model.app.inputSpec)
			]));
};
var $author$project$Main$ShowJsonDialog = {$: 'ShowJsonDialog'};
var $author$project$Main$CloseJsonDialog = {$: 'CloseJsonDialog'};
var $author$project$Main$DecodeIncomingJson = {$: 'DecodeIncomingJson'};
var $author$project$Main$UpdateIncomingJson = function (a) {
	return {$: 'UpdateIncomingJson', a: a};
};
var $author$project$Main$modifyJsonDialog = function (model) {
	var err = function () {
		var _v1 = model.jsonError;
		if (_v1.$ === 'Nothing') {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('')
					]));
		} else {
			var e = _v1.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('alert alert-danger')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Error: ' + e)
					]));
		}
	}();
	var body = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
				A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
			]),
		_List_fromArray(
			[
				err,
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$cols(80),
						$elm$html$Html$Attributes$rows(30),
						$elm$html$Html$Events$onInput($author$project$Main$UpdateIncomingJson)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$Main$encodeApp(model.app))
					]))
			]));
	return $alex_tan$elm_dialog$Dialog$view(
		function () {
			var _v0 = model.incomingJson;
			if (_v0.$ === 'Just') {
				var json = _v0.a;
				return $elm$core$Maybe$Just(
					{
						body: $elm$core$Maybe$Just(body),
						closeMessage: $elm$core$Maybe$Nothing,
						containerClass: $elm$core$Maybe$Nothing,
						footer: $elm$core$Maybe$Just(
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$DecodeIncomingJson)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Save')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-default'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$CloseJsonDialog)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Cancel')
											]))
									]))),
						header: $elm$core$Maybe$Just(
							$elm$html$Html$text('Edit JSON'))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$Main$paneJson = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'text-align', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-primary'),
								$elm$html$Html$Events$onClick($author$project$Main$ShowJsonDialog)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Manual Edit')
							]))
					])),
				A2($elm$html$Html$br, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$pre,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$Main$encodeApp(model.app))
					])),
				$author$project$Main$modifyJsonDialog(model)
			]));
};
var $author$project$Main$DeleteAppCategory = function (a) {
	return {$: 'DeleteAppCategory', a: a};
};
var $author$project$Main$UpdateAppAddCustomCategory = {$: 'UpdateAppAddCustomCategory'};
var $author$project$Main$UpdateAppCategories = function (a) {
	return {$: 'UpdateAppCategories', a: a};
};
var $author$project$Main$UpdateAppDescription = function (a) {
	return {$: 'UpdateAppDescription', a: a};
};
var $author$project$Main$UpdateAppDeveloperNotes = function (a) {
	return {$: 'UpdateAppDeveloperNotes', a: a};
};
var $author$project$Main$UpdateAppDxapi = function (a) {
	return {$: 'UpdateAppDxapi', a: a};
};
var $author$project$Main$UpdateAppName = function (a) {
	return {$: 'UpdateAppName', a: a};
};
var $author$project$Main$UpdateAppSummary = function (a) {
	return {$: 'UpdateAppSummary', a: a};
};
var $author$project$Main$UpdateAppTitle = function (a) {
	return {$: 'UpdateAppTitle', a: a};
};
var $author$project$Main$UpdateAppVersion = function (a) {
	return {$: 'UpdateAppVersion', a: a};
};
var $author$project$Main$UpdateCustomCategory = function (a) {
	return {$: 'UpdateCustomCategory', a: a};
};
var $author$project$Main$validCategories = _List_fromArray(
	['Annotation', 'Assembly', 'Debugging', 'Export', 'Import', 'Mappings Manipulation', 'Read Manipulation', 'Read Mapping', 'Reports', 'RNA-Seq', 'Statistics', 'Structural Variation', 'Variation Calling']);
var $author$project$Main$paneMain = function (model) {
	var mkLi = function (val) {
		return A2(
			$elm$html$Html$li,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(val),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Attributes$class('btn btn-default'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$DeleteAppCategory(val))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Delete')
						]))
				]));
	};
	var app = model.app;
	var curCats = function () {
		var _v0 = $elm$core$List$length(app.categories) > 0;
		if (_v0) {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2($elm$core$List$map, mkLi, app.categories));
		} else {
			return $elm$html$Html$text('None');
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$form,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_Nil,
						_List_fromArray(
							[
								A3($author$project$Main$mkRowTextEntry, 'Name: ', app.name, $author$project$Main$UpdateAppName),
								A3($author$project$Main$mkRowTextEntry, 'Title: ', app.title, $author$project$Main$UpdateAppTitle),
								A3($author$project$Main$mkRowTextEntry, 'DX API Version: ', app.dxapi, $author$project$Main$UpdateAppDxapi),
								A3($author$project$Main$mkRowTextEntry, 'App Version: ', app.version, $author$project$Main$UpdateAppVersion),
								A3($author$project$Main$mkRowTextEntry, 'Summary: ', app.summary, $author$project$Main$UpdateAppSummary),
								A4($author$project$Main$mkRowTextEntrySubmit, 'Add Category: ', model.customCategory, $author$project$Main$UpdateCustomCategory, $author$project$Main$UpdateAppAddCustomCategory),
								A4(
								$author$project$Main$mkRowSelect,
								'Select Category: ',
								_Utils_ap(
									_List_fromArray(
										['--Select--']),
									$author$project$Main$validCategories),
								'',
								$author$project$Main$UpdateAppCategories),
								A2($author$project$Main$mkRowHtml, 'Categories: ', curCats),
								A3($author$project$Main$mkRowTextArea, 'Description (opt):', app.description, $author$project$Main$UpdateAppDescription),
								A3($author$project$Main$mkRowTextArea, 'Developer Notes (opt):', app.developerNotes, $author$project$Main$UpdateAppDeveloperNotes)
							]))
					]))
			]));
};
var $author$project$Main$ModifyOutputSpecDialog = F2(
	function (a, b) {
		return {$: 'ModifyOutputSpecDialog', a: a, b: b};
	});
var $author$project$Main$initialOutputSpec = {_class: 'file', name: 'output_name', patterns: _List_Nil};
var $author$project$Main$CloseOutputSpecDialog = {$: 'CloseOutputSpecDialog'};
var $author$project$Main$DeleteOutputSpecPattern = function (a) {
	return {$: 'DeleteOutputSpecPattern', a: a};
};
var $author$project$Main$SaveOutputSpec = {$: 'SaveOutputSpec'};
var $author$project$Main$UpdateOutputSpecAddCustomPattern = {$: 'UpdateOutputSpecAddCustomPattern'};
var $author$project$Main$UpdateOutputSpecClass = function (a) {
	return {$: 'UpdateOutputSpecClass', a: a};
};
var $author$project$Main$UpdateOutputSpecCustomPattern = function (a) {
	return {$: 'UpdateOutputSpecCustomPattern', a: a};
};
var $author$project$Main$UpdateOutputSpecName = function (a) {
	return {$: 'UpdateOutputSpecName', a: a};
};
var $author$project$Main$modifyOutputSpecDialog = function (model) {
	var mkLi = function (val) {
		return A2(
			$elm$html$Html$li,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(val),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Attributes$class('btn btn-default'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$DeleteOutputSpecPattern(val))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Delete')
						]))
				]));
	};
	var errDiv = function () {
		var _v2 = model.outputSpecToModifyError;
		if (_v2.$ === 'Nothing') {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('')
					]));
		} else {
			var e = _v2.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('alert alert-danger')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Error: ' + e)
					]));
		}
	}();
	var curPatterns = function (pats) {
		var _v1 = $elm$core$List$length(pats) > 0;
		if (_v1) {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2($elm$core$List$map, mkLi, pats));
		} else {
			return $elm$html$Html$text('None');
		}
	};
	var tbl = function (spec) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					errDiv,
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
							A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$form,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$table,
									_List_Nil,
									_List_fromArray(
										[
											A3($author$project$Main$mkRowTextEntry, 'Name', spec.name, $author$project$Main$UpdateOutputSpecName),
											A4(
											$author$project$Main$mkRowSelect,
											'Class',
											_List_fromArray(
												['file', 'string']),
											spec._class,
											$author$project$Main$UpdateOutputSpecClass),
											A4($author$project$Main$mkRowTextEntrySubmit, 'Pattern', model.outputSpecPattern, $author$project$Main$UpdateOutputSpecCustomPattern, $author$project$Main$UpdateOutputSpecAddCustomPattern),
											A2(
											$author$project$Main$mkRowHtml,
											'Patterns',
											curPatterns(spec.patterns))
										]))
								]))
						]))
				]));
	};
	return $alex_tan$elm_dialog$Dialog$view(
		function () {
			var _v0 = model.outputSpecToModify;
			if (_v0.$ === 'Just') {
				var spec = _v0.a;
				return $elm$core$Maybe$Just(
					{
						body: $elm$core$Maybe$Just(
							tbl(spec)),
						closeMessage: $elm$core$Maybe$Nothing,
						containerClass: $elm$core$Maybe$Nothing,
						footer: $elm$core$Maybe$Just(
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$SaveOutputSpec)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Save')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-default'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$CloseOutputSpecDialog)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Cancel')
											]))
									]))),
						header: $elm$core$Maybe$Just(
							$elm$html$Html$text('Add Input'))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $author$project$Main$DeleteOutputSpec = function (a) {
	return {$: 'DeleteOutputSpec', a: a};
};
var $author$project$Main$SetOutputSpecToModify = function (a) {
	return {$: 'SetOutputSpecToModify', a: a};
};
var $author$project$Main$outputSpecTable = function (outputSpec) {
	var inputTr = F2(
		function (index, spec) {
			return A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(spec.name)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(spec._class)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$SetOutputSpecToModify(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Edit')
									]))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$DeleteOutputSpec(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Delete')
									]))
							]))
					]));
		});
	var tbl = A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('table')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Name')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Class')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									]))
							]))
					])),
				A2(
				$elm$html$Html$tbody,
				_List_Nil,
				A2($elm$core$List$indexedMap, inputTr, outputSpec))
			]));
	var _v0 = $elm$core$List$isEmpty(outputSpec);
	if (_v0) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No output specs')
				]));
	} else {
		return tbl;
	}
};
var $author$project$Main$paneOutputSpec = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('button'),
						$elm$html$Html$Attributes$class('btn btn-default'),
						$elm$html$Html$Events$onClick(
						A2($author$project$Main$ModifyOutputSpecDialog, $author$project$Main$initialOutputSpec, $elm$core$Maybe$Nothing))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Add Output')
					])),
				$author$project$Main$modifyOutputSpecDialog(model),
				$author$project$Main$outputSpecTable(model.app.outputSpec)
			]));
};
var $author$project$Main$ModifyRegionalOptionsDialog = F3(
	function (a, b, c) {
		return {$: 'ModifyRegionalOptionsDialog', a: a, b: b, c: c};
	});
var $author$project$Main$initialRegionalOptions = {resources: '', systemRequirements: $elm$core$Dict$empty};
var $author$project$Main$CloseRegionalOptionsDialog = {$: 'CloseRegionalOptionsDialog'};
var $author$project$Main$SaveRegionalOptions = {$: 'SaveRegionalOptions'};
var $author$project$Main$UpdateRegionalOptionsRegionName = function (a) {
	return {$: 'UpdateRegionalOptionsRegionName', a: a};
};
var $author$project$Main$UpdateRegionalOptionsResources = function (a) {
	return {$: 'UpdateRegionalOptionsResources', a: a};
};
var $author$project$Main$validRegions = _List_fromArray(
	['aws:us-east-1', 'aws:eu-central-1', 'aws:ap-southeast-2', 'aws:eu-west-2', 'aws:eu-west-2-g', 'azure:westus', 'azure:westeurope']);
var $author$project$Main$modifyRegionalOptionsDialog = function (model) {
	var tbl = F2(
		function (regionName, options) {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
								A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$form,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$table,
										_List_Nil,
										_List_fromArray(
											[
												A4($author$project$Main$mkRowSelect, 'Region Name', $author$project$Main$validRegions, regionName, $author$project$Main$UpdateRegionalOptionsRegionName),
												A3($author$project$Main$mkRowTextEntry, 'Resources', options.resources, $author$project$Main$UpdateRegionalOptionsResources)
											]))
									]))
							]))
					]));
		});
	return $alex_tan$elm_dialog$Dialog$view(
		A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var regionName = _v0.a;
				var opts = _v0.b;
				return {
					body: $elm$core$Maybe$Just(
						A2(tbl, regionName, opts)),
					closeMessage: $elm$core$Maybe$Nothing,
					containerClass: $elm$core$Maybe$Nothing,
					footer: $elm$core$Maybe$Just(
						A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-primary'),
											$elm$html$Html$Attributes$type_('button'),
											$elm$html$Html$Events$onClick($author$project$Main$SaveRegionalOptions)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Save')
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-default'),
											$elm$html$Html$Attributes$type_('button'),
											$elm$html$Html$Events$onClick($author$project$Main$CloseRegionalOptionsDialog)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Cancel')
										]))
								]))),
					header: $elm$core$Maybe$Just(
						$elm$html$Html$text('Add Input'))
				};
			},
			model.regionalOptionsToModify));
};
var $author$project$Main$DeleteRegionalOptions = function (a) {
	return {$: 'DeleteRegionalOptions', a: a};
};
var $author$project$Main$ModifySysReqDialog = F3(
	function (a, b, c) {
		return {$: 'ModifySysReqDialog', a: a, b: b, c: c};
	});
var $author$project$Main$SetRegionalOptionsToModify = function (a) {
	return {$: 'SetRegionalOptionsToModify', a: a};
};
var $author$project$Main$initialSystemRequirements = {clusterSpec: $author$project$Main$initialClusterSpec, instanceType: 'mem2_hdd2_x2'};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Main$regionalOptionsTable = function (regionalOptions) {
	var tbl = F2(
		function (regionName, opts) {
			return A2(
				$elm$html$Html$table,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('table')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$thead,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$th,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Region Name')
											])),
										A2(
										$elm$html$Html$th,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Resources')
											]))
									]))
							])),
						A2(
						$elm$html$Html$tbody,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$td,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(regionName)
											])),
										A2(
										$elm$html$Html$td,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(opts.resources)
											])),
										A2(
										$elm$html$Html$td,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn btn-default'),
														$elm$html$Html$Events$onClick(
														$author$project$Main$SetRegionalOptionsToModify(regionName))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Edit')
													]))
											])),
										A2(
										$elm$html$Html$td,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn btn-default'),
														$elm$html$Html$Events$onClick(
														$author$project$Main$DeleteRegionalOptions(regionName))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Delete')
													]))
											])),
										A2(
										$elm$html$Html$td,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn btn-default'),
														$elm$html$Html$Events$onClick(
														A3($author$project$Main$ModifySysReqDialog, '*', $author$project$Main$initialSystemRequirements, $elm$core$Maybe$Nothing))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Add SysReq')
													]))
											]))
									]))
							]))
					]));
		});
	var optDiv = function (_v1) {
		var regionName = _v1.a;
		var opts = _v1.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(tbl, regionName, opts)
				]));
	};
	var body = A2(
		$elm$core$List$map,
		optDiv,
		$elm$core$Dict$toList(regionalOptions));
	var _v0 = $elm$core$Dict$isEmpty(regionalOptions);
	if (_v0) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No options')
				]));
	} else {
		return A2($elm$html$Html$div, _List_Nil, body);
	}
};
var $author$project$Main$paneRegionalOptions = function (model) {
	var opts = model.app.regionalOptions;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('button'),
						$elm$html$Html$Attributes$class('btn btn-default'),
						$elm$html$Html$Events$onClick(
						A3($author$project$Main$ModifyRegionalOptionsDialog, 'aws:us-east-1', $author$project$Main$initialRegionalOptions, $elm$core$Maybe$Nothing))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Add Options')
					])),
				$author$project$Main$modifyRegionalOptionsDialog(model),
				$author$project$Main$regionalOptionsTable(model.app.regionalOptions)
			]));
};
var $author$project$Main$UpdateRunSpecDistribution = function (a) {
	return {$: 'UpdateRunSpecDistribution', a: a};
};
var $author$project$Main$UpdateRunSpecFile = function (a) {
	return {$: 'UpdateRunSpecFile', a: a};
};
var $author$project$Main$UpdateRunSpecInterpreter = function (a) {
	return {$: 'UpdateRunSpecInterpreter', a: a};
};
var $author$project$Main$UpdateRunSpecRelease = function (a) {
	return {$: 'UpdateRunSpecRelease', a: a};
};
var $author$project$Main$UpdateRunSpecRestartableEntryPoints = function (a) {
	return {$: 'UpdateRunSpecRestartableEntryPoints', a: a};
};
var $author$project$Main$UpdateRunSpecVersion = function (a) {
	return {$: 'UpdateRunSpecVersion', a: a};
};
var $author$project$Main$paneRunSpec = function (runSpec) {
	var appExecutionEnvVersions = function () {
		var _v0 = runSpec.release;
		if (_v0 === '20.04') {
			return _List_fromArray(
				['0']);
		} else {
			return _List_fromArray(
				['0', '1']);
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$form,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$author$project$Main$mkRowSelect,
								'Interpreter',
								_List_fromArray(
									['bash', 'python3', 'python2.7']),
								runSpec.interpreter,
								$author$project$Main$UpdateRunSpecInterpreter),
								A3($author$project$Main$mkRowTextEntry, 'File', runSpec.file, $author$project$Main$UpdateRunSpecFile),
								A4(
								$author$project$Main$mkRowSelect,
								'Distribution',
								_List_fromArray(
									['Ubuntu']),
								runSpec.distribution,
								$author$project$Main$UpdateRunSpecDistribution),
								A4(
								$author$project$Main$mkRowSelect,
								'Release',
								_List_fromArray(
									['20.04', '16.04']),
								runSpec.release,
								$author$project$Main$UpdateRunSpecRelease),
								A4($author$project$Main$mkRowSelect, 'Application Execution Version', appExecutionEnvVersions, runSpec.version, $author$project$Main$UpdateRunSpecVersion),
								A4(
								$author$project$Main$mkRowSelect,
								'Restartable Entry Points',
								_List_fromArray(
									['master', 'all']),
								runSpec.restartableEntryPoints,
								$author$project$Main$UpdateRunSpecRestartableEntryPoints)
							]))
					]))
			]));
};
var $author$project$Main$CloseSysReqDialog = {$: 'CloseSysReqDialog'};
var $author$project$Main$SaveSysReq = {$: 'SaveSysReq'};
var $author$project$Main$UpdateSysReqClusterSpecBootstrapScript = function (a) {
	return {$: 'UpdateSysReqClusterSpecBootstrapScript', a: a};
};
var $author$project$Main$UpdateSysReqClusterSpecInitialInstanceCount = function (a) {
	return {$: 'UpdateSysReqClusterSpecInitialInstanceCount', a: a};
};
var $author$project$Main$UpdateSysReqClusterSpecPorts = function (a) {
	return {$: 'UpdateSysReqClusterSpecPorts', a: a};
};
var $author$project$Main$UpdateSysReqClusterSpecType = function (a) {
	return {$: 'UpdateSysReqClusterSpecType', a: a};
};
var $author$project$Main$UpdateSysReqClusterSpecVersion = function (a) {
	return {$: 'UpdateSysReqClusterSpecVersion', a: a};
};
var $author$project$Main$UpdateSysReqEntryPointName = function (a) {
	return {$: 'UpdateSysReqEntryPointName', a: a};
};
var $author$project$Main$UpdateSysReqHost = function (a) {
	return {$: 'UpdateSysReqHost', a: a};
};
var $author$project$Main$UpdateSysReqInstanceType = function (a) {
	return {$: 'UpdateSysReqInstanceType', a: a};
};
var $author$project$Main$sysReqHostToString = function (host) {
	switch (host.$) {
		case 'Azure':
			return 'Azure';
		case 'Gpu':
			return 'GPU';
		default:
			return 'AWS';
	}
};
var $author$project$Main$validClusterSpecType = _List_fromArray(
	['', 'generic', 'dxspark', 'apachespark']);
var $author$project$Main$validClusterSpecVersions = _List_fromArray(
	['', '2.4.4', '3.2.0']);
var $author$project$Main$validInstanceTypesAws = _List_fromArray(
	['mem1_ssd1_x2', 'mem1_ssd1_x4', 'mem1_ssd1_x8', 'mem1_ssd1_x16', 'mem1_ssd1_x32', 'mem1_ssd1_x36', 'mem1_ssd1_v2_x2', 'mem1_ssd1_v2_x4', 'mem1_ssd1_v2_x8', 'mem1_ssd1_v2_x16', 'mem1_ssd1_v2_x36', 'mem1_ssd1_v2_x72', 'mem1_ssd2_x2', 'mem1_ssd2_x4', 'mem1_ssd2_x8', 'mem1_ssd2_x16', 'mem1_ssd2_x36', 'mem1_ssd2_v2_x2', 'mem1_ssd2_v2_x4', 'mem1_ssd2_v2_x8', 'mem1_ssd2_v2_x16', 'mem1_ssd2_v2_x36', 'mem1_ssd2_v2_x72', 'mem1_hdd2_x8', 'mem1_hdd2_x32', 'mem2_ssd1_x2', 'mem2_ssd1_x4', 'mem2_ssd1_x8', 'mem2_ssd1_v2_x2', 'mem2_ssd1_v2_x4', 'mem2_ssd1_v2_x8', 'mem2_ssd1_v2_x16', 'mem2_ssd1_v2_x32', 'mem2_ssd1_v2_x48', 'mem2_ssd1_v2_x64', 'mem2_ssd1_v2_x96', 'mem2_hdd2_x1', 'mem2_hdd2_x2', 'mem2_hdd2_x4', 'mem2_hdd2_v2_x2', 'mem2_hdd2_v2_x4', 'mem3_ssd1_x2', 'mem3_ssd1_x4', 'mem3_ssd1_x8', 'mem3_ssd1_x16', 'mem3_ssd1_x32', 'mem3_ssd1_v2_x2', 'mem3_ssd1_v2_x4', 'mem3_ssd1_v2_x8', 'mem3_ssd1_v2_x16', 'mem3_ssd1_v2_x32', 'mem3_ssd1_v2_x48', 'mem3_ssd1_v2_x64', 'mem3_ssd1_v2_x96', 'mem3_ssd2_x4', 'mem3_ssd2_x8', 'mem3_ssd2_x16', 'mem3_ssd2_x32', 'mem3_ssd2_v2_x2', 'mem3_ssd2_v2_x4', 'mem3_ssd2_v2_x8', 'mem3_ssd2_v2_x16', 'mem3_ssd2_v2_x32', 'mem3_ssd2_v2_x64', 'mem3_ssd3_x2', 'mem3_ssd3_x4', 'mem3_ssd3_x8', 'mem3_ssd3_x12', 'mem3_ssd3_x24', 'mem3_ssd3_x48', 'mem3_ssd3_x96', 'mem3_hdd2_x2', 'mem3_hdd2_x4', 'mem3_hdd2_x8', 'mem3_hdd2_v2_x2', 'mem3_hdd2_v2_x4', 'mem3_hdd2_v2_x8', 'mem4_ssd1_x128']);
var $author$project$Main$validInstanceTypesAzure = _List_fromArray(
	['azure:mem1_ssd1_x2', 'azure:mem1_ssd1_x4', 'azure:mem1_ssd1_x8', 'azure:mem1_ssd1_x16', 'azure:mem2_ssd1_x1', 'azure:mem2_ssd1_x2', 'azure:mem2_ssd1_x4', 'azure:mem2_ssd1_x8', 'azure:mem2_ssd1_x16', 'azure:mem3_ssd1_x2', 'azure:mem3_ssd1_x4', 'azure:mem3_ssd1_x8', 'azure:mem3_ssd1_x16', 'azure:mem3_ssd1_x20', 'azure:mem4_ssd1_x2', 'azure:mem4_ssd1_x4', 'azure:mem4_ssd1_x8', 'azure:mem4_ssd1_x16', 'azure:mem4_ssd1_x32', 'azure:mem5_ssd2_x64', 'azure:mem5_ssd2_x128']);
var $author$project$Main$validInstanceTypesGpu = _List_fromArray(
	['mem1_ssd1_gpu2_x8', 'mem1_ssd1_gpu2_x32', 'mem2_ssd1_gpu_x16', 'mem2_ssd1_gpu_x32', 'mem2_ssd1_gpu_x48', 'mem2_ssd1_gpu_x64', 'mem3_ssd1_gpu_x8', 'mem3_ssd1_gpu_x32', 'mem3_ssd1_gpu_x64', 'azure:mem3_ssd2_gpu4_x64']);
var $author$project$Main$modifySysReqDialog = function (model) {
	var hostNames = A2(
		$elm$core$List$map,
		$author$project$Main$sysReqHostToString,
		_List_fromArray(
			[$author$project$Main$Aws, $author$project$Main$Azure, $author$project$Main$Gpu]));
	var curHost = A2($elm$core$Maybe$withDefault, $author$project$Main$Aws, model.editingSysReqHost);
	var instanceTypeChoices = function () {
		switch (curHost.$) {
			case 'Azure':
				return $author$project$Main$validInstanceTypesAzure;
			case 'Gpu':
				return $author$project$Main$validInstanceTypesGpu;
			default:
				return $author$project$Main$validInstanceTypesAws;
		}
	}();
	var tbl = F2(
		function (entryPointName, req) {
			var clusterVersionChoices = function () {
				var _v2 = req.clusterSpec.type_;
				if (_v2 === 'generic') {
					return _List_Nil;
				} else {
					return $author$project$Main$validClusterSpecVersions;
				}
			}();
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
								A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$form,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$table,
										_List_Nil,
										_List_fromArray(
											[
												A3($author$project$Main$mkRowTextEntry, 'Entry Point Name', entryPointName, $author$project$Main$UpdateSysReqEntryPointName),
												A4(
												$author$project$Main$mkRowSelect,
												'Host',
												hostNames,
												$author$project$Main$sysReqHostToString(curHost),
												$author$project$Main$UpdateSysReqHost),
												A4($author$project$Main$mkRowSelect, 'Instance Type', instanceTypeChoices, req.instanceType, $author$project$Main$UpdateSysReqInstanceType),
												A4($author$project$Main$mkRowSelect, 'Cluster Type', $author$project$Main$validClusterSpecType, req.clusterSpec.type_, $author$project$Main$UpdateSysReqClusterSpecType),
												A4($author$project$Main$mkRowSelect, 'Cluster Version', clusterVersionChoices, req.clusterSpec.version, $author$project$Main$UpdateSysReqClusterSpecVersion),
												A4(
												$author$project$Main$mkRowSelect,
												'Initial Instance Count',
												A2(
													$elm$core$List$map,
													$elm$core$String$fromInt,
													A2($elm$core$List$range, 1, 10)),
												$elm$core$String$fromInt(req.clusterSpec.initialInstanceCount),
												$author$project$Main$UpdateSysReqClusterSpecInitialInstanceCount),
												A3($author$project$Main$mkRowTextEntry, 'Ports', req.clusterSpec.ports, $author$project$Main$UpdateSysReqClusterSpecPorts),
												A3($author$project$Main$mkRowTextEntry, 'Bootstrap Script', req.clusterSpec.bootstrapScript, $author$project$Main$UpdateSysReqClusterSpecBootstrapScript)
											]))
									]))
							]))
					]));
		});
	return $alex_tan$elm_dialog$Dialog$view(
		function () {
			var _v0 = model.sysReqToModify;
			if (_v0.$ === 'Just') {
				var _v1 = _v0.a;
				var entryPointName = _v1.a;
				var req = _v1.b;
				return $elm$core$Maybe$Just(
					{
						body: $elm$core$Maybe$Just(
							A2(tbl, entryPointName, req)),
						closeMessage: $elm$core$Maybe$Nothing,
						containerClass: $elm$core$Maybe$Nothing,
						footer: $elm$core$Maybe$Just(
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$SaveSysReq)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Save')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-default'),
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick($author$project$Main$CloseSysReqDialog)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Cancel')
											]))
									]))),
						header: $elm$core$Maybe$Just(
							$elm$html$Html$text('Add Req'))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}());
};
var $author$project$Main$DeleteSysReq = function (a) {
	return {$: 'DeleteSysReq', a: a};
};
var $author$project$Main$SetSysReqToModify = function (a) {
	return {$: 'SetSysReqToModify', a: a};
};
var $author$project$Main$systemsRequirementsTable = function (reqs) {
	var inputTr = F2(
		function (index, _v1) {
			var entryPointName = _v1.a;
			var req = _v1.b;
			return A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(entryPointName)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(req.instanceType)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$SetSysReqToModify(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Edit')
									]))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$DeleteSysReq(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Delete')
									]))
							]))
					]));
		});
	var tbl = A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('table')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Entry Point')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Instance Type')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									]))
							]))
					])),
				A2(
				$elm$html$Html$tbody,
				_List_Nil,
				A2(
					$elm$core$List$indexedMap,
					inputTr,
					$elm$core$Dict$toList(reqs)))
			]));
	var _v0 = $elm$core$Dict$isEmpty(reqs);
	if (_v0) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No requirements')
				]));
	} else {
		return tbl;
	}
};
var $author$project$Main$paneSysReq = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('button'),
						$elm$html$Html$Attributes$class('btn btn-default'),
						$elm$html$Html$Events$onClick(
						A3($author$project$Main$ModifySysReqDialog, '*', $author$project$Main$initialSystemRequirements, $elm$core$Maybe$Nothing))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Add SysReq')
					])),
				$author$project$Main$modifySysReqDialog(model),
				$author$project$Main$systemsRequirementsTable(model.app.runSpec.systemRequirements)
			]));
};
var $author$project$Main$ModifyTimeoutPolicyDialog = F3(
	function (a, b, c) {
		return {$: 'ModifyTimeoutPolicyDialog', a: a, b: b, c: c};
	});
var $author$project$Main$initialTimeoutPolicy = {hours: 48, minutes: 0};
var $author$project$Main$CloseTimeoutPolicyDialog = {$: 'CloseTimeoutPolicyDialog'};
var $author$project$Main$SaveTimeoutPolicy = {$: 'SaveTimeoutPolicy'};
var $author$project$Main$UpdateTimeoutPolicyEntryPointName = function (a) {
	return {$: 'UpdateTimeoutPolicyEntryPointName', a: a};
};
var $author$project$Main$UpdateTimeoutPolicyHours = function (a) {
	return {$: 'UpdateTimeoutPolicyHours', a: a};
};
var $author$project$Main$UpdateTimeoutPolicyMinutes = function (a) {
	return {$: 'UpdateTimeoutPolicyMinutes', a: a};
};
var $author$project$Main$modifyTimeoutPolicyDialog = function (model) {
	var tbl = F2(
		function (entryPointName, policy) {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
								A2($elm$html$Html$Attributes$style, 'max-height', '60vh')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$form,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$table,
										_List_Nil,
										_List_fromArray(
											[
												A3($author$project$Main$mkRowTextEntry, 'Entry Point Name', entryPointName, $author$project$Main$UpdateTimeoutPolicyEntryPointName),
												A3(
												$author$project$Main$mkRowTextEntry,
												'Hours',
												$elm$core$String$fromInt(policy.hours),
												$author$project$Main$UpdateTimeoutPolicyHours),
												A3(
												$author$project$Main$mkRowTextEntry,
												'Minutes',
												$elm$core$String$fromInt(policy.minutes),
												$author$project$Main$UpdateTimeoutPolicyMinutes)
											]))
									]))
							]))
					]));
		});
	return $alex_tan$elm_dialog$Dialog$view(
		A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var entryPointName = _v0.a;
				var policy = _v0.b;
				return {
					body: $elm$core$Maybe$Just(
						A2(tbl, entryPointName, policy)),
					closeMessage: $elm$core$Maybe$Nothing,
					containerClass: $elm$core$Maybe$Nothing,
					footer: $elm$core$Maybe$Just(
						A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-primary'),
											$elm$html$Html$Attributes$type_('button'),
											$elm$html$Html$Events$onClick($author$project$Main$SaveTimeoutPolicy)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Save')
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-default'),
											$elm$html$Html$Attributes$type_('button'),
											$elm$html$Html$Events$onClick($author$project$Main$CloseTimeoutPolicyDialog)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Cancel')
										]))
								]))),
					header: $elm$core$Maybe$Just(
						$elm$html$Html$text('Add Policy'))
				};
			},
			model.timeoutPolicyToModify));
};
var $author$project$Main$DeleteTimeoutPolicy = function (a) {
	return {$: 'DeleteTimeoutPolicy', a: a};
};
var $author$project$Main$SetTimeoutPolicyToModify = function (a) {
	return {$: 'SetTimeoutPolicyToModify', a: a};
};
var $author$project$Main$timeoutPolicyTable = function (policies) {
	var inputTr = F2(
		function (index, _v1) {
			var entryPointName = _v1.a;
			var policy = _v1.b;
			return A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(entryPointName)
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(policy.hours))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(policy.minutes))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$SetTimeoutPolicyToModify(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Edit')
									]))
							])),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-default'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$DeleteTimeoutPolicy(index))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Delete')
									]))
							]))
					]));
		});
	var tbl = A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('table')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Entry Point')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Hours')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Minutes')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('')
									]))
							]))
					])),
				A2(
				$elm$html$Html$tbody,
				_List_Nil,
				A2(
					$elm$core$List$indexedMap,
					inputTr,
					$elm$core$Dict$toList(policies)))
			]));
	var _v0 = $elm$core$Dict$isEmpty(policies);
	if (_v0) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No timeout policies')
				]));
	} else {
		return tbl;
	}
};
var $author$project$Main$paneTimeoutPolicy = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('button'),
						$elm$html$Html$Attributes$class('btn btn-default'),
						$elm$html$Html$Events$onClick(
						A3($author$project$Main$ModifyTimeoutPolicyDialog, '*', $author$project$Main$initialTimeoutPolicy, $elm$core$Maybe$Nothing))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Add Timeout')
					])),
				$author$project$Main$modifyTimeoutPolicyDialog(model),
				$author$project$Main$timeoutPolicyTable(model.app.runSpec.timeoutPolicy)
			]));
};
var $author$project$Main$DeleteAuthorizedUser = function (a) {
	return {$: 'DeleteAuthorizedUser', a: a};
};
var $author$project$Main$DeleteDeveloper = function (a) {
	return {$: 'DeleteDeveloper', a: a};
};
var $author$project$Main$UpdateAddAuthorizedUser = {$: 'UpdateAddAuthorizedUser'};
var $author$project$Main$UpdateAddDeveloper = {$: 'UpdateAddDeveloper'};
var $author$project$Main$UpdateAuthorizedUser = function (a) {
	return {$: 'UpdateAuthorizedUser', a: a};
};
var $author$project$Main$UpdateDeveloper = function (a) {
	return {$: 'UpdateDeveloper', a: a};
};
var $author$project$Main$paneUsers = function (model) {
	var mkLi = F2(
		function (f, val) {
			return A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(val),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$class('btn btn-default'),
								$elm$html$Html$Events$onClick(
								f(val))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Delete')
							]))
					]));
		});
	var developers = model.app.developers;
	var curDevelopers = function () {
		var _v1 = $elm$core$List$isEmpty(developers);
		if (_v1) {
			return $elm$html$Html$text('None');
		} else {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					mkLi($author$project$Main$DeleteDeveloper),
					developers));
		}
	}();
	var authorizedUsers = model.app.authorizedUsers;
	var curAuthorizedUsers = function () {
		var _v0 = $elm$core$List$isEmpty(authorizedUsers);
		if (_v0) {
			return $elm$html$Html$text('None');
		} else {
			return A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					mkLi($author$project$Main$DeleteAuthorizedUser),
					authorizedUsers));
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$form,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_Nil,
						_List_fromArray(
							[
								A4($author$project$Main$mkRowTextEntrySubmit, 'Add Developer', model.developer, $author$project$Main$UpdateDeveloper, $author$project$Main$UpdateAddDeveloper),
								A2($author$project$Main$mkRowHtml, 'Developers', curDevelopers),
								A4($author$project$Main$mkRowTextEntrySubmit, 'Add Authorized User', model.authorizedUser, $author$project$Main$UpdateAuthorizedUser, $author$project$Main$UpdateAddAuthorizedUser),
								A2($author$project$Main$mkRowHtml, 'Authorized Users', curAuthorizedUsers)
							]))
					]))
			]));
};
var $rundis$elm_bootstrap$Bootstrap$Tab$Right = {$: 'Right'};
var $rundis$elm_bootstrap$Bootstrap$Tab$layout = F2(
	function (layout_, _v0) {
		var configRec = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Tab$Config(
			_Utils_update(
				configRec,
				{
					layout: $elm$core$Maybe$Just(layout_)
				}));
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$right = $rundis$elm_bootstrap$Bootstrap$Tab$layout($rundis$elm_bootstrap$Bootstrap$Tab$Right);
var $rundis$elm_bootstrap$Bootstrap$Tab$getActiveItem = F2(
	function (_v0, configRec) {
		var activeTab = _v0.a.activeTab;
		if (activeTab.$ === 'Nothing') {
			return $elm$core$List$head(configRec.items);
		} else {
			var id = activeTab.a;
			return function (found) {
				if (found.$ === 'Just') {
					var f = found.a;
					return $elm$core$Maybe$Just(f);
				} else {
					return $elm$core$List$head(configRec.items);
				}
			}(
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v2) {
							var item_ = _v2.a;
							return _Utils_eq(item_.id, id);
						},
						configRec.items)));
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$Hidden = {$: 'Hidden'};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $rundis$elm_bootstrap$Bootstrap$Tab$Start = {$: 'Start'};
var $rundis$elm_bootstrap$Bootstrap$Tab$visibilityTransition = F2(
	function (withAnimation_, visibility) {
		var _v0 = _Utils_Tuple2(withAnimation_, visibility);
		_v0$2:
		while (true) {
			if (_v0.a) {
				switch (_v0.b.$) {
					case 'Hidden':
						var _v1 = _v0.b;
						return $rundis$elm_bootstrap$Bootstrap$Tab$Start;
					case 'Start':
						var _v2 = _v0.b;
						return $rundis$elm_bootstrap$Bootstrap$Tab$Showing;
					default:
						break _v0$2;
				}
			} else {
				break _v0$2;
			}
		}
		return $rundis$elm_bootstrap$Bootstrap$Tab$Showing;
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$renderLink = F4(
	function (id, active, _v0, configRec) {
		var attributes = _v0.a.attributes;
		var children = _v0.a.children;
		var commonClasses = _List_fromArray(
			[
				_Utils_Tuple2('nav-link', true),
				_Utils_Tuple2('active', active)
			]);
		var clickHandler = $elm$html$Html$Events$onClick(
			configRec.toMsg(
				$rundis$elm_bootstrap$Bootstrap$Tab$State(
					{
						activeTab: $elm$core$Maybe$Just(id),
						visibility: A2($rundis$elm_bootstrap$Bootstrap$Tab$visibilityTransition, configRec.withAnimation && (!active), $rundis$elm_bootstrap$Bootstrap$Tab$Hidden)
					})));
		var linkItem = configRec.useHash ? A2(
			$elm$html$Html$a,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(commonClasses),
						clickHandler,
						$elm$html$Html$Attributes$href('#' + id)
					]),
				attributes),
			children) : A2(
			$elm$html$Html$button,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_Utils_ap(
							commonClasses,
							_List_fromArray(
								[
									_Utils_Tuple2('btn', true),
									_Utils_Tuple2('btn-link', true)
								]))),
						clickHandler
					]),
				attributes),
			children);
		return A2(
			$elm$html$Html$li,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('nav-item')
				]),
			_List_fromArray(
				[linkItem]));
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$transitionStyles = function (opacity) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'opacity',
			$elm$core$String$fromInt(opacity)),
			A2($elm$html$Html$Attributes$style, '-webkit-transition', 'opacity 0.15s linear'),
			A2($elm$html$Html$Attributes$style, '-o-transition', 'opacity 0.15s linear'),
			A2($elm$html$Html$Attributes$style, 'transition', 'opacity 0.15s linear')
		]);
};
var $rundis$elm_bootstrap$Bootstrap$Tab$activeTabAttributes = F2(
	function (_v0, configRec) {
		var visibility = _v0.a.visibility;
		switch (visibility.$) {
			case 'Hidden':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'none')
					]);
			case 'Start':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'block'),
						A2($elm$html$Html$Attributes$style, 'opacity', '0')
					]);
			default:
				return _Utils_ap(
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'block')
						]),
					$rundis$elm_bootstrap$Bootstrap$Tab$transitionStyles(1));
		}
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $rundis$elm_bootstrap$Bootstrap$Tab$renderTabPane = F5(
	function (id, active, _v0, state, configRec) {
		var attributes = _v0.a.attributes;
		var children = _v0.a.children;
		var displayAttrs = active ? A2($rundis$elm_bootstrap$Bootstrap$Tab$activeTabAttributes, state, configRec) : _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'none')
			]);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id(id),
						$elm$html$Html$Attributes$class('tab-pane')
					]),
				_Utils_ap(displayAttrs, attributes)),
			children);
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$tabAttributes = function (configRec) {
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('nav', true),
						_Utils_Tuple2('nav-tabs', !configRec.isPill),
						_Utils_Tuple2('nav-pills', configRec.isPill)
					]))
			]),
		_Utils_ap(
			function () {
				var _v0 = configRec.layout;
				if (_v0.$ === 'Just') {
					switch (_v0.a.$) {
						case 'Justified':
							var _v1 = _v0.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class('nav-justified')
								]);
						case 'Fill':
							var _v2 = _v0.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class('nav-fill')
								]);
						case 'Center':
							var _v3 = _v0.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class('justify-content-center')
								]);
						default:
							var _v4 = _v0.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class('justify-content-end')
								]);
					}
				} else {
					return _List_Nil;
				}
			}(),
			configRec.attributes));
};
var $rundis$elm_bootstrap$Bootstrap$Tab$view = F2(
	function (state, _v0) {
		var configRec = _v0.a;
		var _v1 = A2($rundis$elm_bootstrap$Bootstrap$Tab$getActiveItem, state, configRec);
		if (_v1.$ === 'Nothing') {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$ul,
						$rundis$elm_bootstrap$Bootstrap$Tab$tabAttributes(configRec),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('tab-content')
							]),
						_List_Nil)
					]));
		} else {
			var currentItem = _v1.a.a;
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$ul,
						$rundis$elm_bootstrap$Bootstrap$Tab$tabAttributes(configRec),
						A2(
							$elm$core$List$map,
							function (_v2) {
								var item_ = _v2.a;
								return A4(
									$rundis$elm_bootstrap$Bootstrap$Tab$renderLink,
									item_.id,
									_Utils_eq(item_.id, currentItem.id),
									item_.link,
									configRec);
							},
							configRec.items)),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('tab-content')
							]),
						A2(
							$elm$core$List$map,
							function (_v3) {
								var item_ = _v3.a;
								return A5(
									$rundis$elm_bootstrap$Bootstrap$Tab$renderTabPane,
									item_.id,
									_Utils_eq(item_.id, currentItem.id),
									item_.pane,
									state,
									configRec);
							},
							configRec.items))
					]));
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Tab$withAnimation = function (_v0) {
	var configRec = _v0.a;
	return $rundis$elm_bootstrap$Bootstrap$Tab$Config(
		_Utils_update(
			configRec,
			{withAnimation: true}));
};
var $author$project$Main$view = function (model) {
	var title = 'The Appetizer';
	var err = function () {
		var _v0 = model.error;
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('')
					]));
		} else {
			var e = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('alert alert-danger')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Error: ' + e)
					]));
		}
	}();
	return {
		body: _List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$container,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(title)
							])),
						err,
						A2(
						$rundis$elm_bootstrap$Bootstrap$Tab$view,
						model.tabState,
						A2(
							$rundis$elm_bootstrap$Bootstrap$Tab$items,
							_List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabMain',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Main')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneMain(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabRunSpec',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('RunSpec')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneRunSpec(model.app.runSpec)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabSystemsRequirements',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('SysReq')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneSysReq(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabTimeoutPolicy',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Timeout')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneTimeoutPolicy(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabExecDepends',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('ExecDepends')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneExecDepends(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabInputSpec',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('InputSpec')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneInputSpec(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabOutputSpec',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('OutputSpec')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneOutputSpec(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabAccessSpec',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('AccessSpec')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneAccessSpec(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabUsers',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Users')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneUsers(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabHttpsApp',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('HttpsApp')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneHttpsApp(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabRegionalOptions',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('RegOpts')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneRegionalOptions(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabDebug',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Debug')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneDebug(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabJson',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('JSON')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneJson(model)
												]))
									}),
									$rundis$elm_bootstrap$Bootstrap$Tab$item(
									{
										id: 'tabHelp',
										link: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$link,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Help')
												])),
										pane: A2(
											$rundis$elm_bootstrap$Bootstrap$Tab$pane,
											_List_Nil,
											_List_fromArray(
												[
													A2($elm$html$Html$br, _List_Nil, _List_Nil),
													$author$project$Main$paneHelp
												]))
									})
								]),
							$rundis$elm_bootstrap$Bootstrap$Tab$right(
								$rundis$elm_bootstrap$Bootstrap$Tab$withAnimation(
									$rundis$elm_bootstrap$Bootstrap$Tab$config($author$project$Main$TabMsg)))))
					]))
			]),
		title: title
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Main$UrlChanged, onUrlRequest: $author$project$Main$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));