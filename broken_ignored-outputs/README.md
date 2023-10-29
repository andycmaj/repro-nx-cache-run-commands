# broken. ignored outputs and transitive inputs not explicit

## summary

`a`, `b`, `c` have a transitive input/output dependency chain.

but all outputs from `a`, `b`, `c` are all `.gitignore`d.

without explcitly opting them into cache input participation, using `!`
in `.nxignore`, they would not be considered as cache inputs AT ALL.

but even when they ARE explcitly opted into cache participation,
the transitive inline re-calcualtion of inputs after each task execution
does not happen...

## MAKING NO CHANGES TO input-a

to begin, make sure you `pnpm nx reset`

### run 1

nothing cached

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a
a
> nx run ignored-outputs-broken:b
b
> nx run ignored-outputs-broken:c
c
```

### run 2

only `a` is cached

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs-broken:b
b
> nx run ignored-outputs-broken:c
c
```

### run 3

only `a` and `b` are cached

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs-broken:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs-broken:c
c
```

### run 4

finally, `a`, `b`, `c` are all cached

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs-broken:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs-broken:c  [existing outputs match the cache, left as is]
c
```

## MAKE A CHANGE TO `input-a`

### re-run 1

`a` is invalidated, but `b`, `c` inputs were re-calculated before `a` ran,
and not after, so they are STILL from cache.

even though the output from `a`, also `b`'s input, has changed, NX hasn't re-hashed
before running `b`, so it uses cached `b`.

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a
a
> nx run ignored-outputs-broken:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs-broken:c  [existing outputs match the cache, left as is]
c
```

### re-run 2

`b` is invalidated because NX has seen that the input to b has now changed. it calculates
these hashes BEFORE all execution.

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs-broken:b
b
> nx run ignored-outputs-broken:c  [existing outputs match the cache, left as is]
c
```

### rerun-3

now that `b` has been re-run, NX can re-calculate `c`'s input (`b`'s output) BEFORE
the next run, and it now sees that `c` needs to be re-run.

```bash
❯ pnpm nx c ignored-outputs-broken
> nx run ignored-outputs-broken:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs-broken:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs-broken:c
c
```
