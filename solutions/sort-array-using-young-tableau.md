# Sort an array using Young tableau

> Source: https://www.techiedelight.com/sort-array-using-young-tableau/

In this post, we will see how to sort `N2` numbers in increasing order using an `N × N` Young tableau in `O(N3)` time.

An `N × N` Young tableau is an `N × N` matrix such that entries of each row are sorted from left to right and the entries of each column are sorted from top to bottom. Some entries of a Young tableau may be infinity, which indicates an empty entry. Thus, a Young tableau can be used to hold `n <= N2` finite numbers.

Refer the following article on Young tableau as a prerequisite of this post:

> [Young Tableau | Insert, Search, Extract-Min, Delete, Replace](https://techiedelight.com/young-tableau-insert-search-extract-min-delete-replace/)

> 

To sort an array using Young tableau, insert each of its values into an empty Young tableau, one at a time. Afterward, repeatedly call the `Extract-Min` routine on the Young tableau until the tableau is empty and put the returned values back to the original array.

Following is a TypeScript program that demonstrates it:

```ts
class YoungTableau {

    // Recursive function to fix the tableau property in an `N × N` Young tableau.
    // An infinite value is initially placed at the first cell `(0, 0)` of the tableau.
    // The function works by swapping the smallest of `[i+1, j]` and `[i, j+1]` with
    // `[i, j]` and recur for the smaller value.
    private fixTableau(tableau: number[][], i = 0, j = 0): void {
        const N = tableau.length;

        // get the values present at the bottom and right cell of the current cell
        const bottom = (i + 1 < N) ? tableau[i + 1][j] : Number.MAX_SAFE_INTEGER;
        const right = (j + 1 < N) ? tableau[i][j + 1] : Number.MAX_SAFE_INTEGER;

        if (bottom === Number.MAX_SAFE_INTEGER && right === Number.MAX_SAFE_INTEGER) {
            return;
        }

        if (bottom < right) {   // go down

            // swap `tableau[i][j]` and `tableau[i + 1][j]`

            [tableau[i][j], tableau[i + 1][j]] = [tableau[i + 1][j], tableau[i][j]];

            this.fixTableau(tableau, i + 1, j);
        }
        else {  // go right

            // swap `tableau[i][j]` and `tableau[i][j + 1]`

            [tableau[i][j], tableau[i][j + 1]] = [tableau[i][j + 1], tableau[i][j]];

            this.fixTableau(tableau, i, j + 1);
        }
    }

    // Recursive function to insert a new element into a non-full `N × N` Young tableau.
    // The new element is initially placed at the bottom-right corner of the tableau.
    // The function works by swapping the smallest of `[i-1, j]` and `[i, j-1]` with
    // `[i, j]` and recur for the smaller value.
    private insert(tableau: number[][], i: number, j: number): void {
        // base case
        if (i === 0 && j === 0) {
            return;
        }

        // handle separately for the first row
        if (i === 0) {
            if (tableau[i][j] < tableau[i][j - 1]) {
                // swap `tableau[i][j]` and `tableau[i][j-1]`

                [tableau[i][j], tableau[i][j - 1]] = [tableau[i][j - 1], tableau[i][j]];

                this.insert(tableau, i, j - 1);
            }
            return;
        }

        // handle separately for the first column
        if (j === 0) {
            if (tableau[i][j] < tableau[i - 1][j]) {
                // swap `tableau[i][j]` and `tableau[i-1][j]`

                [tableau[i][j], tableau[i - 1][j]] = [tableau[i - 1][j], tableau[i][j]];

                this.insert(tableau, i - 1, j);
            }
            return;
        }

        if (tableau[i][j] < tableau[i - 1][j]) {    // go up

            // swap `tableau[i][j]` and `tableau[i-1][j]`

            [tableau[i][j], tableau[i - 1][j]] = [tableau[i - 1][j], tableau[i][j]];

            this.insert(tableau, i - 1, j);
        }

        if (tableau[i][j] < tableau[i][j - 1]) {    // go left

            // swap `tableau[i][j]` and `tableau[i][j-1]`

            [tableau[i][j], tableau[i][j - 1]] = [tableau[i][j - 1], tableau[i][j]];

            this.insert(tableau, i, j - 1);
        }
    }

    // Function to extract the next minimum element from the Young tableau
    extractMin(tableau: number[][]): number {
        // the first cell of the tableau stores the minimum element
        const min = tableau[0][0];

        // make the first element as infinity
        tableau[0][0] = Number.MAX_SAFE_INTEGER;

        // fix the Young tableau property
        this.fixTableau(tableau);

        return min;
    }

    // Function construct an `N × N` Young tableau from the given keys
    construct(keys: number[]): number[][] {
        const N = Math.ceil(Math.sqrt(keys.length));
        const tableau = Array.from({ length: N }, () =>
            new Array(N).fill(Number.MAX_SAFE_INTEGER));

        // do for each key
        for (const key of keys) {
            // check for overflow
            if (tableau[N - 1][N - 1] !== Number.MAX_SAFE_INTEGER) {
                break;
            }

            // place the key at the bottom-right corner of the tableau
            tableau[N - 1][N - 1] = key;

            // move the key to its correct position in the tableau
            this.insert(tableau, N - 1, N - 1);
        }

        return tableau;
    }
}

function sort(keys: number[]): void {

    if (keys === null || keys.length === 0) {
        return;
    }

    const obj = new YoungTableau();

    // construct a Young tableau from the above keys
    const tableau = obj.construct(keys);

    // repeatedly call `extractMin()` and fill `keys[]` with the returned values
    for (let i = 0; i < keys.length; i++) {
        keys[i] = obj.extractMin(tableau);
    }
}

// unsorted input
const keys = [6, 4, 8, 7, 2, 3, 1, 5];

// sort the input keys
sort(keys);

// print the sorted input
console.log(keys);
```

**Output:** [1, 2, 3, 4, 5, 6, 7, 8]

Constructing an O(N × N) Young tableau from O(N2) keys takes O(N3) time. Also, the `extractMin()` routine is called O(N × N) times, which runs in linear time. So, the overall time complexity of the proposed solution is O(N3) for O(N2) keys. The additional space used by the program is O(N2) for constructing an `N × N` Young tableau.

In order words, the sorting procedure runs in O(n1.5) time and O(n) space, where `n` is the size of the input.

Also See:

> [Young Tableau | Insert, Search, Extract-Min, Delete, Replace](https://www.techiedelight.com/young-tableau-insert-search-extract-min-delete-replace/ "Young Tableau | Insert, Search, Extract-Min, Delete, Replace")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 313

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
