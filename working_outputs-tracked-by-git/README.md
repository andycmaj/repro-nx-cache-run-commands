# WIP.... outputs of all tasks tracked by git

## summary

`a`, `b`, `c` have a transitive input/output dependency chain.

all outputs from `a`, `b`, `c` are tracked by git.

everything works.

## MAKING NO CHANGES TO input-a

to begin, make sure you `pnpm nx reset`, delete all files in `cachestuff/included/`

### run 1

nothing cached

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a
a
> nx run ignored-outputs:b
b
> nx run ignored-outputs:c
c
```

### run 2

only `a` is cached

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs:b
b
> nx run ignored-outputs:c
c
```

### run 3

only `a` and `b` are cached

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs:c
c
```

### run 4

finally, `a`, `b`, `c` are all cached

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs:c  [existing outputs match the cache, left as is]
c
```

## MAKE A CHANGE TO `input-a`

### re-run 1

`a` is invalidated, but `b`, `c` inputs were re-calculated before `a` ran,
and not after, so they are STILL from cache.

even though the output from `a`, also `b`'s input, has changed, NX hasn't re-hashed
before running `b`, so it uses cached `b`.

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a
a
> nx run ignored-outputs:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs:c  [existing outputs match the cache, left as is]
c
```

### re-run 2

`b` is invalidated because NX has seen that the input to b has now changed. it calculates
these hashes BEFORE all execution.

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs:b
b
> nx run ignored-outputs:c  [existing outputs match the cache, left as is]
c
```

### rerun-3

now that `b` has been re-run, NX can re-calculate `c`'s input (`b`'s output) BEFORE
the next run, and it now sees that `c` needs to be re-run.

```bash
❯ pnpm nx c ignored-outputs
> nx run ignored-outputs:a  [existing outputs match the cache, left as is]
a
> nx run ignored-outputs:b  [existing outputs match the cache, left as is]
b
> nx run ignored-outputs:c
c
```
