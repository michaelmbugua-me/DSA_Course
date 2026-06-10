# Generate the power set of a given set

> Source: https://www.techiedelight.com/generate-power-set-given-set/

Given a set `S`, generate all subsets of it, i.e., find the power set of set `S`. A power set of any set `S` is the set of all subsets of `S`, including the empty set and `S` itself.

For example, if `S` is the set `{_x_ , _y_ , _z_}`, then the subsets of `S` are:

  * {} (also known as the empty set or the null set).
  * {_x_}
  * {_y_}
  * {_z_}
  * {_x_ , _y_}
  * {_x_ , _z_}
  * {_y_ , _z_}
  * {_x_ , _y_ , _z_}

Hence, the power set of `S` is `{{}, {_x_}, {_y_}, {_z_}, {_x_ , _y_}, {_x_ , _z_}, {_y_ , _z_}, {_x_ , _y_ , _z_}}`.

> 

## Approach 1: (Using Recursion)

The problem is very similar to the [0/1 knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for each element in set `S`, we have two choices:

  1. Consider that element.
  2. Don’t consider that element.

All combinations of subsets can be generated as follows in TypeScript, using the above logic:

```ts
// Function to generate a power set of given set `S`
function findPowerSet(S: number[], s: number[], n: number): void {

    // if we have considered all elements
    if (n === 0) {
        console.log(`[${s.join(', ')}]`);
        return;
    }

    // consider the n'th element
    s.push(S[n - 1]);
    findPowerSet(S, s, n - 1);

    s.pop();                    // backtrack

    // or don't consider the n'th element
    findPowerSet(S, s, n - 1);
}

const S = [1, 2, 3];

const s: number[] = [];
findPowerSet(S, s, S.length);
```

## Approach 2

For a given set `S`, the power set can be found by generating all binary numbers between `0` and `2n-1`, where `n` is the size of the set.

For example, for the set `S {_x_ , _y_ , _z_}`, generate binary numbers from `0` to `23-1` and for each number generated, the corresponding set can be found by considering set bits in the number.

  * 0 = 000 = {}
  * 1 = 001 = {_z_}
  * 2 = 010 = {_y_}
  * 3 = 011 = {_y_ , _z_}
  * 4 = 100 = {_x_}
  * 5 = 101 = {_x_ , _z_}
  * 6 = 110 = {_x_ , _y_}
  * 7 = 111 = {_x_ , _y_ , _z_}

Following is a TypeScript program that demonstrates it:

```ts
function findPowerSet(S: number[]): void {
    // `N` stores the total number of subsets
    const N = Math.pow(2, S.length);
    const s: number[] = [];

    // generate each subset one by one
    for (let i = 0; i < N; i++) {
        // check every bit of `i`
        for (let j = 0; j < S.length; j++) {
            // if j'th bit of `i` is set, print `S[j]`
            if (i & (1 << j)) {
                s.push(S[j]);
            }
        }

        console.log(`[${s.join(', ')}]`);
        s.length = 0;
    }
}

const S = [1, 2, 3];
findPowerSet(S);
```

The time complexity of both above-discussed methods is O(n.2n), where `n` is the size of the given set.

**References:** <https://en.wikipedia.org/wiki/Power_set>
