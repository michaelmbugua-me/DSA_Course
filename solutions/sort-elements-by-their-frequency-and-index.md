# Sort elements by their frequency and index

> Source: https://www.techiedelight.com/sort-elements-by-their-frequency-and-index/

Given an integer array, sort its element by their frequency and index. i.e., if two elements have different frequencies, then the one which has more frequency should come first; otherwise, the one which has less index should come first.

For example,

**Input :** [3, 3, 1, 1, 1, 8, 3, 6, 8, 7, 8] **Output:** [3, 3, 3, 1, 1, 1, 8, 8, 8, 6, 7]

> 

The idea is to write a custom comparison method to solve this problem. Let the two elements to be compared are `x` and `y`. Then

  1. If `x` and `y` have different frequencies, then the one with more frequency should be treated as smaller than the other.
  2. If `x` and `y` have the same frequencies, then the one with less index should be treated as smaller than the other.

The algorithm can be implemented as follows in TypeScript:

```ts
class Data {
    value: number;
    index: number;
    count: number;
    constructor(value: number, index: number, count = 0) {
        this.value = value;
        this.index = index;
        this.count = count;
    }
}

// Custom sort by element's frequency and index
function sortByFrequencyAndIndex(arr: number[]): void {
    if (arr === null || arr.length < 2) {
        return;
    }

    const hm = new Map<number, Data>();

    // for each array element, insert into the map
    // its frequency and index of its first occurrence in the array
    for (let i = 0; i < arr.length; i++) {
        let data = hm.get(arr[i]);
        if (data === undefined) {
            data = new Data(arr[i], i);
            hm.set(arr[i], data);
        }
        data.count += 1;
    }

    // get the values
    const values = [...hm.values()];

    /*
        Sort the values based on a custom comparator

        1. If two elements have different frequencies, then
        the one which has more frequency should come first.

        2. If two elements have the same frequencies, then the
        one which has less index should come first.
    */

    values.sort((x, y) => y.count - x.count || x.index - y.index);

    let k = 0;
    for (const data of values) {
        for (let j = 0; j < data.count; j++) {
            arr[k++] = data.value;
        }
    }
}

const arr = [3, 3, 1, 1, 1, 8, 3, 6, 8, 7, 8];
sortByFrequencyAndIndex(arr);
console.log(arr);
```

The time complexity of the above solution is O(n + m.log(m)) and requires O(m) extra space, where `n` is the size of the input and `m` is the total number of distinct elements in the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 156

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
