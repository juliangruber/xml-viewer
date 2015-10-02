
test:
	@node_modules/.bin/tape test*

example:
	@node_modules/.bin/beefy example/index.js -- -t brfs

.PHONY: test example

