# Longest Increasing Subsequence Problem

> Source: https://www.techiedelight.com/longest-increasing-subsequence/

The Longest Increasing Subsequence (LIS) problem is to find a subsequence of a given sequence in which the subsequence’s elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous or unique.

For example, consider the following subsequence:

`{0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15}`

The longest increasing subsequence is `{0, 2, 6, 9, 11, 15}` having length 6; the input sequence has no 7–member increasing subsequences. The longest increasing subsequence in this example is not unique. For instance, `{0, 4, 6, 9, 11, 15}` and `{0, 4, 6, 9, 13, 15}` are other increasing subsequences of equal length in the same input sequence.

> 

We have already discussed an O(n2) time complexity solution of LIS [here](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/), which uses [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). In this post, an O(n.log(n)) time, non-DP solution, is discussed.

Let `S[i]` be defined as the smallest integer that ends an increasing sequence of length `i`. Now iterate through every integer `X` of the input set and do the following:

  * If `X` is more than the last element in `S`, then append `X` at the end of `S`. This essentially means we have found a new largest LIS.
  * Otherwise, find the smallest element in `S`, which is more than or equal to `X`, and replace it with `X`. Because `S` is sorted at any time, the element can be found using [binary search](https://techiedelight.com/binary-search/) in `log(N)` time.

Let’s illustrate this with the help of an example. Following are the steps followed by the algorithm for an integer array `{2, 6, 3, 4, 1, 2, 9, 5, 8}`:

Initialize to an empty set S = {}

Inserting 2 —- S = {2} – New largest LIS Inserting 6 —- S = {2, 6} – New largest LIS Inserting 3 —- S = {2, 3} – Replaced 6 with 3 Inserting 4 —- S = {2, 3, 4} – New largest LIS Inserting 1 —- S = {1, 3, 4} – Replaced 2 with 1 Inserting 2 —- S = {1, 2, 4} – Replaced 3 with 2 Inserting 9 —- S = {1, 2, 4, 9} – New largest LIS Inserting 5 —- S = {1, 2, 4, 5} – Replaced 9 with 5 Inserting 8 —- S = {1, 2, 4, 5, 8} – New largest LIS

So, the length of the LIS is 5 (the size of `S`). Please note that here `S[i]` is defined as the smallest integer that ends an increasing sequence of length `i`. Therefore, `S` does not represent an actual sequence, but S’s size represents the LIS length.

The following TypeScript solution uses an ordered set (implemented as a sorted array with [binary search](https://techiedelight.com/binary-search/)), which has the worst-case time complexity of O(log(n)) for insertion:

```ts
// Function to find the length of the longest increasing subsequence in a given array
function findLISLength(input: number[]): number {
    // base case
    if (input.length === 0) {
        return 0;
    }

    // create an empty ordered set `s`. The i'th element in `s` is defined as the
    // smallest integer that ends an increasing sequence of length `i`
    // (JS has no builtin ordered set, so keep it as a sorted array)
    const s: number[] = [];

    // binary search for the smallest element greater than or equal to `x`
    const lowerBound = (arr: number[], x: number): number => {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (arr[mid] < x) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    // process every element one by one
    for (const item of input) {
        // ignore the current element if it is already present in the set
        const idx = lowerBound(s, item);
        if (idx < s.length && s[idx] === item) {
            continue;
        }

        // insert the current element into the set
        s.splice(idx, 0, item);

        // if the element is not inserted at the end, then delete the next
        // greater element from the set
        if (idx + 1 < s.length) {
            s.splice(idx + 1, 1);
        }
    }

    // length of LIS is the total number of elements in the set
    return s.length;
}

(function main() {
    const input = [2, 6, 3, 4, 1, 2, 9, 5, 8];

    console.log("The length of the LIS is " + findLISLength(input));
})();
```

**Output:** The length of the LIS is 5

How to print LIS?

To make things simpler, we can keep in the set `s`, not the actual integers, but their indices. That is we do not keep `{1, 2, 4, 5, 8}`, but keep `{4, 5, 3, 7, 8}` since `input[4] = 1`, `input[5] = 2`, `input[3] = 4`, `input[7] = 5`, and `input[8] = 8`.

To reconstruct the actual LIS, we have to use a parent array. Let `parent[i]` be the predecessor of an element with index `i` in the LIS, ending at the element with index `i`. If we update the parent array properly, the actual LIS is:

input[s[lastElementOfS]], input[parent[s[lastElementOfS]]], input[parent[parent[s[lastElementOfS]]]], ………

The following TypeScript solution stores both actual integers and their indices in the set for easier implementation:

```ts
// Data structure to store an element and its index in an array
class Node {
    elem: number;
    index: number;
    constructor(elem: number, index: number) {
        this.elem = elem;
        this.index = index;
    }
}

// Function to print LIS using parent array
function print(input: number[], parent: Map<number, number>, s: Node[]): void {
    // container to store LIS in reverse order
    const lis: number[] = [];

    // start from the last element of `s`
    let index: number | undefined = s[s.length - 1].index;

    // get length of LIS
    let n = s.length;

    // retrieve LIS from parent array
    while (n-- > 0 && index !== undefined) {
        lis.push(input[index]);
        index = parent.get(index);
    }

    // print LIS
    process.stdout.write("LIS is ");
    while (lis.length > 0) {
        process.stdout.write(`${lis.pop()} `);
    }
}

// Function to find the longest increasing subsequence in a given array
function printLIS(input: number[]): void {
    // base case
    if (input.length === 0) {
        return;
    }

    // create an empty ordered set `s` (i'th element in `s` is defined as the
    // smallest integer that ends an increasing sequence of length `i`)
    // (JS has no builtin ordered set, so keep it as a sorted array of nodes)
    const s: Node[] = [];

    // `parent[i]` will store the predecessor of an element with index `i` in the LIS,
    // ending at the element with index `i`.
    const parent = new Map<number, number>();

    // binary search for the smallest node whose element is greater than or equal to `e`
    const lowerBound = (arr: Node[], e: number): number => {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (arr[mid].elem < e) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    // process every element one by one
    for (let i = 0; i < input.length; i++) {
        // construct node from the current element and its index
        const curr = new Node(input[i], i);

        // ignore the current element if it is already present in the set
        let it = lowerBound(s, curr.elem);
        if (it < s.length && s[it].elem === curr.elem) {
            continue;
        }

        // insert the current node into the set
        s.splice(it, 0, curr);

        // if the node is not inserted at the end, then delete the next node
        if (it + 1 < s.length) {
            s.splice(it + 1, 1);
        }

        // get an iterator to the current node and update the parent
        it = lowerBound(s, curr.elem);
        if (it > 0) {
            parent.set(i, s[it - 1].index);
        }
    }

    // print LIS using parent map
    print(input, parent, s);
}

(function main() {
    const input = [2, 6, 3, 4, 1, 2, 9, 5, 8];
    printLIS(input);
})();
```

**Output:** LIS is 2 3 4 5 8

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the given sequence.

**References:**

<https://stackoverflow.com/questions/2631726/how-to-determine-the-longest-increasing-subsequence-using-dynamic-programming>

Contribute more code to this problem, share by commenting or [send us in email](https://techiedelight.com/contact/).

Also See:

> [Longest Increasing Subsequence using Dynamic Programming](https://www.techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/ "Longest Increasing Subsequence using Dynamic Programming")

> [Longest Bitonic Subsequence](https://www.techiedelight.com/longest-bitonic-subsequence/ "Longest Bitonic Subsequence")

> [Longest Consecutive Subsequence](https://www.techiedelight.com/find-longest-subsequence-formed-by-consecutive-integers/ "Longest Consecutive Subsequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 193

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
