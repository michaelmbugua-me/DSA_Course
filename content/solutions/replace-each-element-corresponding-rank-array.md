# Replace each array element by its corresponding rank

> Source: https://www.techiedelight.com/replace-each-element-corresponding-rank-array/

Given an array of distinct integers, replace each array element by its corresponding rank in the array.

The minimum array element has the rank 1; the second minimum element has a rank of 2, and so on… For example,

**Input:** { 10, 8, 15, 12, 6, 20, 1 } **Output:** { 4, 3, 6, 5, 2, 7, 1 }

> 

The idea is to store each element’s index in an ordered map (Since the array contains all distinct integers, we can use array elements and their index as key-value pairs in the map). Since elements are stored in sorted order in an ordered map, if we iterate through the map, we get elements in increasing order. Therefore, for each element in increasing order, we start assigning values starting from number 1 to `n`.

Following is a TypeScript implementation of the idea:

```ts
// Function to replace each array element by its rank in the array
function transform(input: number[]): void {
    // create an empty ordered map
    const map = new Map<number, number>();

    // store (element, index) pair in a map
    for (let i = 0; i < input.length; i++) {
        map.set(input[i], i);
    }

    // keys are stored in sorted order in an ordered map

    // rank starts from 1
    let rank = 1;

    // iterate through the map in sorted order of its keys and
    // replace each element with its rank
    for (const key of [...map.keys()].sort((a, b) => a - b)) {
        input[map.get(key) as number] = rank++;
    }
}

const input = [10, 8, 15, 12, 6, 20, 1];

// transform the array
transform(input);

// print the transformed array
console.log(input);
```

**Output:** 4 3 6 5 2 7 1



The time complexity of the above solution is O(n.log(n)), where `n` is the size of the input. This assumes O(log(n)) time operation for the ordered map. The auxiliary space required by the program is O(n).

We can also use a [heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) to solve this problem. The idea remains similar to the previous approach, but we store array elements and their index as key-value pairs in a max-heap. The primary benefit of using max-heap is that we get elements in decreasing order if we remove pairs from it. Therefore, for each element in decreasing order, we start assigning values starting from number `n` till `1`. Note that min-heap can also be used.

Following is a TypeScript implementation of the idea:

```ts
// Function to replace each array element by its rank in the array
function transform(input: number[]): void {
    // build a max-heap of pairs (element, index) from all elements in the list
    // note: JS has no builtin heap — keep the pairs in a plain array and
    // treat it as a max-heap (sorted so the maximum is always at the front)
    const pq: [number, number][] = [];
    for (let i = 0; i < input.length; i++) {
        pq.push([input[i], i]);
    }
    pq.sort((a, b) => b[0] - a[0]);

    // get input size
    let rank = input.length;

    // run until max-heap is empty
    while (pq.length > 0) {
        // take the next maximum element from the heap and replace its value
        // in the input array with its corresponding rank
        input[pq.shift()![1]] = rank;

        // decrement rank for the next maximum element
        rank = rank - 1;
    }
}

const input = [10, 8, 15, 12, 6, 20, 1];

// transform the array
transform(input);

// print the transformed array
console.log(input);
```

**Output:** 4 3 6 5 2 7 1



The time complexity of the above solution remains the same as the previous approach, i.e., O(n.log(n)). The auxiliary space required by the program also remains O(n).

**Exercise:** Convert the above solution to use min-heap.
