# Find duplicate rows in a binary matrix

> Source: https://www.techiedelight.com/find-duplicate-rows-binary-matrix/

Find duplicate rows present in a given binary matrix by traversing the matrix only once.

For example,

**Input:** [1 0 0 1 0] [0 1 1 0 0] [1 0 0 1 0] [0 0 1 1 0] [0 1 1 0 0] **Output:** {3, 5} **Explanation:** Row #3 is duplicate of row #1 and row #5 is duplicate of row #2

> 

## Approach 1 (Using Trie)

The idea is to insert each row of the given binary matrix into a binary [Trie](https://techiedelight.com/trie-implementation-insert-search-delete/). The alphabet size of a binary trie is only limited to Boolean numbers (0 and 1). If a row is seen before (i.e., it is already present in the Trie), report it as duplicate.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a Trie node
class Trie {
    character: (Trie | null)[] = [null, null];

    // set when the node is a leaf node
    isLeaf = false;
}

// Iterative function to insert each element of a row into a Trie
function insert(head: Trie, A: number[]): boolean {

    // start from the root node
    let curr: Trie = head;

    for (const i of A) {
        // create a new node if the path doesn't exist
        if (curr.character[i] === null) {
            curr.character[i] = new Trie();
        }

        // go to the next node
        curr = curr.character[i] as Trie;
    }

    // if the row is inserted before, return false
    if (curr.isLeaf) {
        return false;
    }

    // mark leaf node and return true
    curr.isLeaf = true;
    return true;
}

const mat = [
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0]
];

// insert all rows of the matrix into a Trie
const head = new Trie();
for (const [i, e] of mat.entries()) {
    if (!insert(head, e)) {
        console.log(`Duplicate row found: Row #${i + 1}`);
    }
}
```

**Output:** Duplicate row found: Row #3 Duplicate row found: Row #5

The time complexity of the above solution is O(N.M) and requires O(N.M) extra space for Trie data structure, where `M` and `N` are dimensions of the matrix.

## Approach 2 (Converting to Decimal)

The idea is to convert each row to its decimal equivalent and check if the decimal value is seen before or not. If it is seen before, report the row as duplicate. This method will only work for `N < 32` (or `N < 64` if `long` datatype is used), where `N` is the total number of columns in the matrix.

```ts
const mat = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0]
];

const s = new Set<number>();

// do for each row `i`
for (let i = 0; i < mat.length; i++) {
    let decimal = 0;

    // convert binary row `i` to its decimal equivalent
    for (let j = 0; j < mat[i].length; j++) {
        decimal += mat[i][j] * 2 ** j;
    }

    // if the decimal value is seen before
    if (s.has(decimal)) {
        console.log(`Duplicate row found: Row #${i + 1}`);
    }
    else {
        s.add(decimal);
    }
}
```

**Output:** Duplicate row found: Row #3 Duplicate row found: Row #5

The time complexity of the above solution is O(N.M) and requires O(M) extra space for the hashset, where `M` and `N` are dimensions of the matrix.
