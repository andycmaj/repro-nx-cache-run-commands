# WIP.... outputs of all tasks tracked by git

## summary

`a`, `b`, `c` have a transitive input/output dependency chain.

inputs for each transitive dependency are explicitly added to each task

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

all tasks are correctly invalidated based on explicit inputs.

```bash
❯ pnpm nx c explicit-inputs
> nx run explicit-inputs:a
a
> nx run explicit-inputs:b

> nx run explicit-inputs:c
c
```
