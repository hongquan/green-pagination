# `@green-pagination/core`

Generate data to help build pagination.

Another UI layer can use this data to render pagination like this:

```
[1][2][…][5][6][7][…][19][20]
```

## Usage

```ts
import { genItems } from '@green-pagination/core'

genItems({ totalPages: 20, currentPage: 6 })

```
