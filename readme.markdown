#bump version

bump the version of a npm project with one easy command.

```
npm install bv
```

#Usage: `bv SLOT OPTIONS`
```

bv patch  # bump patch number, and publish.
bv p      # bump patch number, and publish
bv minor  # bump minor number.... 
bv m      # bump...
bv major  # if you can't see the pattern
bv M      # go back to ruby

#also

bv        # defaults to `patch`

```
by default, `bv` will commit the bump, tag it, git push, and npm publish.
each of these steps may be skipped.
```
bv -s     # show output and exit
bv -c     # do not commit
bv -t     # do not tag
bv -n     # do not npm publish
bv -g     # do not git push
```
by default, the commit message is the new version. set it manually with `-m`

```
bv -m message    # set message manually, 
```

