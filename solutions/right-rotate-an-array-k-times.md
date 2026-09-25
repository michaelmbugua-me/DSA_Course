# Right rotate an array `k` times

> Source: https://www.techiedelight.com/right-rotate-an-array-k-times/

[Array](https://www.techiedelight.com/Category/Array/)

In this post, we will see how to right-rotate an array by specified positions. For example, right rotating array `{ 1, 2, 3, 4, 5, 6, 7 }` three times will result in array `{ 5, 6, 7, 1, 2, 3, 4 }`.

> 

## 1\. Rotating `k` times

The idea is to right-rotate all array elements by one position `k` times, where `k` is the given rotation count. This approach is demonstrated below in TypeScript:

```ts
// Function to right-rotate an array by one position
function rightRotateByOne(A: number[]): void {
    const last = A[A.length - 1];
    for (let i = A.length - 2; i >= 0; i--) {
        A[i + 1] = A[i];
    }

    A[0] = last;
}

// Function to right-rotate an array by `k` positions
function rightRotate(A: number[], k: number): void {
    // base case: invalid input
    if (k < 0 || k >= A.length) {
        return;
    }

    for (let i = 0; i < k; i++) {
        rightRotateByOne(A);
    }
}

// demo
const A = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

rightRotate(A, k);
console.log(A);
```

The time complexity of the above solution is O(n.k), where `n` is the size of the input and `k` is the rotation count.

## 2\. Using Auxiliary Array

We can reduce the time complexity of the above solution to linear using some extra space. The idea is to store the last `k` elements of the input array in an auxiliary array of size `k`. Then shift the first `n-k` elements of the input array at the end. Finally, put elements of the auxiliary array at their correct positions in the input array.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to right-rotate an array by `k` positions
function rightRotate(A: number[], k: number): void {
    const n = A.length;

    // base case: invalid input
    if (k < 0 || k >= n) {
        return;
    }

    // construct an auxiliary array of size `k` and
    // fill it with the last `k` elements of the input array
    const aux: number[] = [];
    for (let i = 0; i < k; i++) {
        aux[i] = A[n - k + i];
    }

    // shift the first `n-k` elements of the input array at the end
    for (let i = n - k - 1; i >= 0; i--) {
        A[i + k] = A[i];
    }

    // put the elements of the auxiliary array at their
    // correct positions in the input array
    for (let i = 0; i < k; i++) {
        A[i] = aux[i];
    }
}

// demo
const A = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

rightRotate(A, k);
console.log(A);
```

The time complexity of the above solution is O(n), and the auxiliary space used is O(k).

## 3\. By reversing array

We can even solve this problem in O(n) time and O(1) extra space. The idea is to reverse the last `k` elements of the input array and then reverse the remaining `n-k` elements. Finally, get the right-rotated array by reversing the complete array.

Following is a TypeScript program that demonstrates it:

```ts
// Function to reverse a given subarray
function reverse(A: number[], low: number, high: number): void {
    for (let i = low, j = high; i < j; i++, j--) {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
}

// Function to right-rotate an array by `k` positions
function rightRotate(A: number[], k: number): void {
    const n = A.length;

    // base case: invalid input
    if (k < 0 || k >= n) {
        return;
    }

    // Reverse the last `k` elements
    reverse(A, n - k, n - 1);

    // Reverse the first `n-k` elements
    reverse(A, 0, n - k - 1);

    // Reverse the whole array
    reverse(A, 0, n - 1);
}

// demo
const A = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

rightRotate(A, k);

console.log(A);
```

**Output:** 5, 6, 7, 1, 2, 3, 4
