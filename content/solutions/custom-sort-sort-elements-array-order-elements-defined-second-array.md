# Sort an array based on order defined by another array

> Source: https://www.techiedelight.com/custom-sort-sort-elements-array-order-elements-defined-second-array/

Given two integer arrays, reorder elements of the first array by the order of elements defined by the second array.

The elements that are not present in the second array but present in the first array should be appended at the end sorted. The second array can contain some extra elements which are not part of the first array.

For example,

**Input:** first = [5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4] second = [3, 5, 7, 2] **Output:** [3, 3, 3, 5, 5, 5, 7, 1, 1, 4, 4, 8, 8, 9, 9]

> 

## 1\. Using Hashing

The idea is to count the frequency of each element of the first array and store it in a [hash table](https://techiedelight.com/hashing-in-data-structure/). Now for each element of the second array, check if the element is present on the map or not. If it is present on the map, print the element `n` number of times, where `n` is the frequency of that element in the first array. We also remove that element from the map so that we are only left with only present elements in the first array (but not present in the second array). To append them at the end, they need to be sorted.

Note that keys are already ordered in a `TreeMap`-like structure, but we get O(log(n)) insertion and retrieval time. If we use a hash-based map like `HashMap`, we get O(1) insertion and retrieval time, but will require sorting since its keys are unordered.

Following is a TypeScript implementation of the idea:

```ts
function customSort(first: number[], second: number[]): void {
    // map to store the frequency of each element of the first array
    const freq = new Map<number, number>();

    // find the frequency of each element of the first array and
    // store it in a map
    for (const i of first) {
        freq.set(i, (freq.get(i) ?? 0) + 1);
    }

    // Note that once we have the frequencies of all elements of
    // the first array, we can overwrite elements of the first array
    let index = 0;

    // do for every element of the second array
    for (const i of second) {
        // If the current element is present on the map, print it `n` times
        // where `n` is the frequency of that element in the first array
        const n = freq.get(i) ?? 0;
        for (let k = 0; k < n; k++) {
            first[index] = i;
            index = index + 1;
        }

        // erase the element from the map
        freq.delete(i);
    }

    // Now we are left with elements only present in the first array,
    // but not in the second array.

    // sort the remaining elements present on the map
    for (const key of Array.from(freq.keys()).sort((a, b) => a - b)) {
        let count = freq.get(key)!;
        while (count > 0) {
            first[index] = key;
            count = count - 1;
            index = index + 1;
        }
    }
}

const first = [5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4];
const second = [3, 5, 7, 2];

customSort(first, second);
console.log("After sorting the list is:", first);
```

**Output:** The array after sorting is 3 3 3 5 5 5 7 1 1 4 4 8 8 9 9

The time complexity of the above solution is O(m.log(m) + n), where `m` and `n` are the total number of elements in the first and second array, respectively.

## 2\. Using Comparator

We can also write a custom comparison method to solve this problem. Let the two elements to be compared are `x` and `y`. Then

  1. If both `x` and `y` are present in the second array, then the lower index element in the second array should come first.
  2. If only one of `x` or `y` is present in the second array, then the second array element should come first.
  3. If both elements are not present in the second array, then the default ordering will be considered.

The algorithm can be implemented as follows in TypeScript:

```ts
const first = [5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4];
const second = [3, 5, 7, 2];

// map each element of the second array to its index
const map = new Map<number, number>();
for (let i = 0; i < second.length; i++) {
    map.set(second[i], i);
}

// custom comparison method
first.sort((x, y) => {
    if (map.has(x) && map.has(y)) {
        return map.get(x)! - map.get(y)!;
    } else if (map.has(y)) {
        return 1;
    } else if (map.has(x)) {
        return -1;
    } else {
        return x - y;
    }
});
console.log(first);
```

**Output:** [3, 3, 3, 5, 5, 5, 7, 1, 1, 4, 4, 8, 8, 9, 9]

