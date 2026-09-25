# Segregate positive and negative integers using merge sort

> Source: https://www.techiedelight.com/segregate-positive-negative-integers-using-mergesort/

Given an array of positive and negative integers, segregate them without changing the relative order of elements. The output should contain all positive numbers follow negative numbers while maintaining the same relative ordering.

For example,

**Input:** [9, -3, 5, -2, -8, -6, 1, 3] **Output:** [-3, -2, -8, -6, 9, 5, 1, 3]

> 

In the [previous post](https://techiedelight.com/positive-and-negative-integers-segregate/), we discussed how to segregate positive and negative integers in linear time and constant space using [Quicksort’s partitioning logic](https://techiedelight.com/quicksort/). The problem with this approach is that it changes the relative order of elements. This post will segregate positive and negative integers while maintaining their relative order using the [merge sort algorithm](https://techiedelight.com/merge-sort/).

The idea is simple. While merging the left– and right– subarray, merge in a way that negative elements of both left– and right– subarrays are copied first, followed by positive elements of left– and right– subarrays. Following is a TypeScript program that demonstrates it:

```ts
// Merge two subarrays, `A[low… mid]` and `A[mid+1… high]`,
// such that all positive numbers follow negative numbers
function merge(A: number[], aux: number[], low: number, mid: number, high: number): void {
    let k = low;

    // copy negative elements from the left subarray
    for (let i = low; i <= mid; i++) {
        if (A[i] < 0) {
            aux[k++] = A[i];
        }
    }

    // copy negative elements from the right subarray
    for (let j = mid + 1; j <= high; j++) {
        if (A[j] < 0) {
            aux[k++] = A[j];
        }
    }

    // copy positive elements from the left subarray
    for (let i = low; i <= mid; i++) {
        if (A[i] >= 0) {
            aux[k++] = A[i];
        }
    }

    // copy positive elements from the right subarray
    for (let j = mid + 1; j <= high; j++) {
        if (A[j] >= 0) {
            aux[k++] = A[j];
        }
    }

    // copy back to the original array to reflect sorted order
    for (let i = low; i <= high; i++) {
        A[i] = aux[i];
    }
}

// Segregate positive and negative integers using a mergesort-like routine
function partition(A: number[], aux: number[], low: number, high: number): void {
    // Base case
    if (high <= low) {
        return;
    }

    // find midpoint
    const mid = low + ((high - low) >> 1);

    partition(A, aux, low, mid);            // split/merge left half
    partition(A, aux, mid + 1, high);       // split/merge right half

    merge(A, aux, low, mid, high);          // join the two half runs
}

// demo
const A = [9, -3, 5, -2, -8, -6, 1, 3];
const aux = A.slice();

partition(A, aux, 0, A.length - 1);
console.log(A);
```

The time complexity of this solution would be the same as merge sort O(n.log(n)) and requires O(n) extra space, where `n` is the size of the input.

Please note that a linear time straightforward solution exists to solve this problem. The objective of this article is to demonstrate the [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) approach.

**Exercise:** Modify the solution so that positive numbers will come first.

Also See:

> [Segregate positive and negative integers in linear time](https://www.techiedelight.com/positive-and-negative-integers-segregate/ "Segregate positive and negative integers in linear time")

> [Merge Sort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/merge-sort/ "Merge Sort Algorithm – C++, Java, and Python Implementation")

> [Iterative Merge Sort Algorithm (Bottom-up Merge Sort)](https://www.techiedelight.com/iterative-merge-sort-algorithm-bottom-up/ "Iterative Merge Sort Algorithm \(Bottom-up Merge Sort\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 187

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
