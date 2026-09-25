# Print all distinct subsets of a given set

> Source: https://www.techiedelight.com/print-distinct-subsets-given-set/

Given a set `S`, generate all distinct subsets of it, i.e., find distinct power set of set `S`. A power set of any set `S` is the set of all subsets of `S`, including the empty set and `S` itself.

For example, if `S` is set `{_x_ , _y_ , _x_}`, then the subsets of `S` are:

  * {} (also known as the empty set or the null set).
  * {_x_}
  * {_y_}
  * {_x_}
  * {_x_ , _y_}
  * {_x_ , _x_}
  * {_y_ , _x_}
  * {_x_ , _y_ , _x_}

Therefore, distinct subsets in the power set of `S` are: `{{}, {_x_}, {_y_}, {_x_ , _y_}, {_x_ , _x_}, {_x_ , _y_ , _x_}}`.

> 

## Approach 1: Using Recursion

The problem is very similar to the [0/1 knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for each element in set `S`, we have two options:

  1. Consider that element.
  2. Don’t consider that element.

The following solution generates all combinations of subsets using the above logic. To print only distinct subsets, initially [sort the subset](https://techiedelight.com/sort-array-ascending-order-cpp/) and exclude all adjacent duplicate elements from the subset along with the current element in case 2. This is demonstrated below in TypeScript:

```ts
// Recursive function to print all distinct subsets of `S`.
// `S`   ——> input set
// `i`   ——> index of next element in set `S` to be processed
// `out` ——> list to store elements of a subset
function printPowerSet(S: number[], i: number, out: number[] = []): void {

    // if all elements are processed, print the current subset
    if (i < 0) {
        console.log([...out]);
        return;
    }

    // include the current element in the current subset and recur
    out.push(S[i]);
    printPowerSet(S, i - 1, out);

    // backtrack: exclude the current element from the current subset
    out.pop();

    // remove adjacent duplicate elements
    while (i > 0 && S[i] === S[i - 1]) {
        i = i - 1;
    }

    // exclude the current element from the current subset and recur
    printPowerSet(S, i - 1, out);
}

// Wrapper over `printPowerSet()` function
function findPowerSet(S: number[]): void {

    // sort the set
    S.sort((a, b) => a - b);

    // print the power set
    printPowerSet(S, S.length - 1);
}

const S = [1, 3, 1];

findPowerSet(S);
```

**Output:** [3, 1, 1] [3, 1] [3] [1, 1] [1] []

The time complexity of the above solution is O(n.2n), where `n` is the size of the given set.

## Approach 2

For a given set `S`, the power set can be found by generating all binary numbers between 0 and `2n-1`, where `n` is the size of the set. For example, for set `S {_x_ , _y_ , _z_}`, generate binary numbers from 0 to `23-1` and for each number generated, the corresponding set can be found by considering set bits in the number.

  * 0 = 000 = {}
  * 1 = 001 = {_z_}
  * 2 = 010 = {_y_}
  * 3 = 011 = {_y_ , _z_}
  * 4 = 100 = {_x_}
  * 5 = 101 = {_x_ , _z_}
  * 6 = 110 = {_x_ , _y_}
  * 7 = 111 = {_x_ , _y_ , _z_}

To avoid printing duplicates subsets, initially sort the set. Also, insert each subset into the set. As the set maintains all distinct combinations, we will have unique subsets into the set. Following is a TypeScript program that demonstrates it:

```ts
// Iterative function to print all distinct subsets of `S`
function findPowerSet(S: number[]): void {

    // `N` stores the total number of subsets
    const N = Math.pow(2, S.length);
    const s = new Map<string, number[]>();

    // sort the set
    S.sort((a, b) => a - b);

    // generate each subset one by one
    for (let i = 0; i < N; i++) {
        const subset: number[] = [];
        // check every bit of `i`
        for (let j = 0; j < S.length; j++) {
            // if j'th bit of `i` is set, append `S[j]` to the subset
            if (i & (1 << j)) {
                subset.push(S[j]);
            }
        }

        // insert the subset into the set
        s.set(subset.join(","), subset);
    }

    // print all subsets present in the set
    console.log([...s.values()]);
}

const S = [1, 2, 1];
findPowerSet(S);
```

**Output:** [] [1] [1, 1] [1, 1, 2] [1, 2] [2]

The time complexity of the above solution is O(n.2n), where `n` is the size of the given set.
