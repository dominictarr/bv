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

#other options

bv -s     # show output and exit
bv -n     # do not publish

# if neither of these options are provided, 
# bv will finish up by running `git push origin master & npm publish`
```


