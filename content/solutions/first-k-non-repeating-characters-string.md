# Find first `k` non-repeating characters in a string in a single traversal

> Source: https://www.techiedelight.com/first-k-non-repeating-characters-string/

Given a string, find first `k` non-repeating characters in it by doing only a single traversal of it.

For example, if the string is `ABCDBAGHCHFAC` and `k = 3`, output would be `'D', 'G', 'F'`.

> 

A simple solution would be to store each character’s count in a map or an array by traversing it once. Then traverse the string once more to find the first `k` characters having their count as `1`. The time complexity of this solution is O(n) and requires O(n) extra space, where `n` is the length of the input string. The problem with this solution is that we are traversing the string twice, violating the program constraints.

We can solve this problem in a single traversal of the string. The idea is to use a map to store each distinct character count and the index of its first or last occurrence in the string. Then traverse the map and push the index of all characters having count `1` into the [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). Finally, pop the top `k` keys from the min-heap, and that will be our first `k` non-repeating characters in the string.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find first `k` non-repeating character in
// the string by doing only a single traversal
const first_k_non_repeating = (s: string, k: number): void => {
    // dictionary to store character count and the index of its
    // last occurrence in the string
    const d = new Map<string, { count: number; index: number }>();

    for (let i = 0; i < s.length; i++) {
        const pair = d.get(s[i]) ?? { count: 0, index: 0 };
        pair.count = pair.count + 1;
        pair.index = i;
        d.set(s[i], pair);
    }

    // create an empty min-heap
    // min-heap assumed (JS has no builtin heap)
    const pq: number[] = [];

    // traverse the dictionary and push the index of all characters
    // having the count of 1 into the min-heap
    for (const pair of d.values()) {
        if (pair.count === 1) {
            pq.push(pair.index);
        }
    }

    // keep the heap min-ordered
    pq.sort((a, b) => a - b);

    // pop the top `k` keys from the min-heap
    while (k > 0 && pq.length > 0) {
        // extract the minimum node from the min-heap
        console.log(s[pq.shift()!], '');
        k = k - 1;
    }
};

const s = 'ABCDBAGHCHFAC';
const k = 3;

first_k_non_repeating(s, k);
```

**Output:** D G F

In the above solution, we are doing a complete traversal of the string and the map. The solution inserts all the map characters (all having a count of `1`) into the min-heap. So, the heap size becomes O(n) in the worst case. So, the time complexity of the following solution is O(n + k.log(n)) and requires O(n) auxiliary space.

We can reduce the heap size to O(k) in the worst case. The idea is to push only the first `k` characters into the [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap), and then for all subsequent elements in the map, if the current element is less than the root of the heap, replace the root with it. After we have processed every key of the map, the heap will contain the first `k` non-repeating characters. _(Note that by character, we mean index of it)_

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find first `k` non-repeating character in
// the string by doing only a single traversal
const first_k_non_repeating = (s: string, k: number): void => {
    // dictionary to store character count and the index of its
    // last occurrence in the string
    const d = new Map<string, { count: number; index: number }>();

    for (let i = 0; i < s.length; i++) {
        const pair = d.get(s[i]) ?? { count: 0, index: 0 };
        pair.count = pair.count + 1;
        pair.index = i;
        d.set(s[i], pair);
    }

    // create an empty max-heap (max size will be `k`)
    // max-heap assumed (JS has no builtin heap); helper keeps the array max-ordered
    const pq: number[] = [];
    const heapPush = (index: number): void => {
        pq.push(index);
        pq.sort((a, b) => b - a);
    };
    const replaceRoot = (index: number): void => {
        pq.pop();
        pq.push(index);
        pq.sort((a, b) => b - a);
    };

    // traverse the dictionary and process index of all characters
    // having a count of 1
    for (const pair of d.values()) {
        if (pair.count === 1) {
            // if the heap has less than `k` keys,
            // push the current character's index
            k = k - 1;
            if (k >= 0) {
                heapPush(pair.index);
            }

            // otherwise, if the index of the current element is less than the root
            // of the heap, replace the root with the current element
            else if (pair.index < pq[0]) {
                replaceRoot(pair.index);
            }
        }
    }

    // Now the heap contains an index of count `k` non-repeating characters

    // pop all keys from the max-heap
    while (pq.length > 0) {
        // extract the maximum node from the max-heap
        console.log(s[pq.shift()!], '');
    }
};

const s = 'ABCDBAGHCHFAC';
const k = 3;

first_k_non_repeating(s, k);
```

**Output:** F G D

The time complexity of the above solution is O(n + k.log(k)) and requires O(k) extra space, where `n` is the length of the input string.
