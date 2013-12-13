gotojs (with .gotojs parser)
=========================

A delightfully evil abomination of eval() with goto(); all in global space
by Dave Balmer.

This fork includes a mini file parser for .gotojs files. An example file is included.

Use
---

```language-javascript
program = {
	10: "x = 0",
	20: "x = x + 1",
	30: "print(x)",
	40: "if (x < 10) goto(20)",
	50: "end()"
};

run();
```

Use With File
-------------

In this fork, you can also load a file

As a bonus, the line numbering is completely optional in the gotojs files. By default, line numbers auto-increment by 10. If you do include line-numbering, you're better off adding it for all lines.

```language-javascript
load("example.gotojs");
run();
```

It's worth noting that loading files uses synchronous HTTP requests, which is generally not recommended.

Commands
--------

- `run(line)` start execution of the `program` at the beginning or `line`.
- `load(file)` load a gotojs file and assign it to `program`.
- `goto(line)` move execution to the `line` specified.
- `print(string)` prints the string to the `document.body`.
- `tron()` turns the tracer on.
- `tron()` turns the tracer off.
- `end()` stop execution of the `program`.

Support
-------

Tweet @balmer or visit http://blog.davebalmer.com/introducing-gotojs-sequential-programming-for-javascript/
