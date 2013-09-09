
# Unicode dragon <big><big><a title="&#x1f409;" href="http://www.fileformat.info/info/unicode/char/1f409/index.htm">🐉 </a></big></big>

There's [a bug](https://code.google.com/p/v8/issues/detail?id=2875) in V8 which
means that in rare circumstances Node strings can contain invalid Unicode.

As this is an abhorrent situation, you should use `unicode-dragon` to ensure
that any untrusted user input is actually valid unicode before saving it to
your database.

## Installation

You can install unicode-dragon with npm. If you're really desperate, you can
also copy-pasted the function out of index.js into whereever you need.

```shell
npm install unicode-dragon
```

## Usage

```javascript
unicodeDragon = require('unicode-dragon');
var validString = unicodeDragon(buffer.toString('utf-8'));
```

## Details

V8 strings are internally UCS-2, which is a legacy Unicode encoding that only
works with Unicode 1.0. In Unicode 2.0, 2048 code-points (U+D800 - U+DFFF) were
removed from Unicode and are used by UTF-16 in surrogate pairs to represent
code-points higher than U+FFFF (which is the highest UCS-2 can support).

That said, the UTF-8 codecs in V8 can support characters greater than U+FFFF as
though the internal strings were UTF-16. This is awesome, but there's a small
mistake, and V8 will accidentally parse invalid UTF-8 that happens to include
one of the removed surrogate code-points.

In the case that there is a valid surrogate pair, this is fine, as internally
the UCS-2 buffer is now valid UTF-16, and so the encoder will re-encode it to
valid UTF-8. (UTF-8 with surrogate pairs is more properly known as CESU-8, and
is a frowned upon hack). This is definitely not fine however in the case were
the surrogates appear individually, or incorrectly paired. As the UTF-8 encoder
will output another invalid surrogate.

And if that makes your brain hurt, stay safe, and use `unicodeDragon` to guard
yourself from invalid user input.

## Meta-fu

Unicode-dragon is licensed under the MIT licence. Bug-reports and contributions
are welcome.
