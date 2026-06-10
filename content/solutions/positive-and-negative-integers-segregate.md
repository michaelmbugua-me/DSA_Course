# Segregate positive and negative integers in linear time

> Source: https://www.techiedelight.com/positive-and-negative-integers-segregate/

Given an array of positive and negative integers, segregate them in linear time and constant space. The output should print all negative numbers, followed by all positive numbers.

For example,

**Input:** [9, -3, 5, -2, -8, -6, 1, 3] **Output:** [-3, -2, -8, -6, 5, 9, 1, 3]

> 

We can solve this problem in linear time by using the [partitioning logic of Quicksort](https://techiedelight.com/quicksort/). The idea is to use 0 as a pivot element and make one pass of the partition process. The resultant array will satisfy the given constraints. Following is the TypeScript program that demonstrates it:

```ts
function swap(a: number[], i: number, j: number): void {

    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function partition(a: number[]): void {

    let pIndex = 0;

    // each time we find a negative number, `pIndex` is incremented,
    // and that element would be placed before the pivot
    for (let i = 0; i < a.length; i++) {
        if (a[i] < 0) {     // pivot is 0
            swap(a, i, pIndex);
            pIndex = pIndex + 1;
        }
    }
}

const a = [9, -3, 5, -2, -8, -6, 1, 3];
partition(a);
console.log(a);
```

**Output:** -3 -2 -8 -6 5 9 1 3

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

The problem with this approach is that it changes the relative order of elements. The following solution uses the [merge sort algorithm](https://techiedelight.com/merge-sort/) and maintains the relative order of elements.

> [Segregate positive and negative integers using merge sort](https://techiedelight.com/segregate-positive-negative-integers-using-mergesort/)

**Exercise:** Modify the solution so that positive integers will come first.

Also See:

> [Segregate positive and negative integers using merge sort](https://www.techiedelight.com/segregate-positive-negative-integers-using-mergesort/ "Segregate positive and negative integers using merge sort")

> [Problems solved using partitioning logic of Quicksort](https://www.techiedelight.com/problems-solved-using-partitioning-logic-quicksort/ "Problems solved using partitioning logic of Quicksort")

> [Rearrange an array such that it contains alternate positive and negative numbers](https://www.techiedelight.com/rearrange-array-positive-negative-numbers-alternate-positions/ "Rearrange an array such that it contains alternate positive and negative numbers")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
