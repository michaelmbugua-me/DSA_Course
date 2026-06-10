# Left rotate an array

> Source: https://www.techiedelight.com/left-rotate-array-c/

[Array](https://www.techiedelight.com/Category/Array/)

In this post, we will see how to left-rotate an array by specified positions. For example, left-rotating array `{ 1, 2, 3, 4, 5 }` twice results in array `{ 3, 4, 5, 1, 2 }`.

> 

## 1\. Rotating `r` times

The idea is to left-rotate all array elements by one position `r` times, where `r` is the given rotation count. This approach is demonstrated below in TypeScript:

```ts
// Function to left-rotate an array by one position
function leftRotateByOne(A: number[]): void {
  const first = A[0];
  for (let i = 0; i < A.length - 1; i++) {
    A[i] = A[i + 1];
  }

  A[A.length - 1] = first;
}

// Function to left-rotate an array by `r` positions
function leftRotate(A: number[], r: number): void {
  // base case: invalid input
  if (r < 0 || r >= A.length) {
    return;
  }

  for (let i = 0; i < r; i++) {
    leftRotateByOne(A);
  }
}

const A = [1, 2, 3, 4, 5];
const r = 2;

leftRotate(A, r);
console.log(A);
```

**Output:** 3 4 5 1 2

The time complexity of the above solution is O(n.r), where `n` is the size of the input and `r` is the rotation count.

## 2\. Using Auxiliary Array

We can reduce the time complexity of the above solution to linear using some extra space. The idea is to store first `r` elements of the input array in an auxiliary array of size `r`. Then shift the remaining `n-r` elements of the input array at the beginning. Finally, put elements of the auxiliary array at their correct positions in the input array.

```ts
// Function to left-rotate an array by `r` positions
function leftRotate(A: number[], r: number): void {
  // get length of the array
  const n = A.length;

  // base case: invalid input
  if (r < 0 || r >= n) {
    return;
  }

  // construct an auxiliary array of size `r` and
  // fill it with the first `r` elements of the input array
  const aux = A.slice(0, r);

  // shift the remaining `n-r` elements of the input array at the beginning
  for (let i = r; i < n; i++) {
    A[i - r] = A[i];
  }

  // put the elements of the auxiliary space at their
  // correct positions in the input array
  for (let i = n - r; i < n; i++) {
    A[i] = aux[i - (n - r)];
  }
}

const A = [1, 2, 3, 4, 5];
const r = 2;

leftRotate(A, r);
console.log(A);
```

The time complexity of the above solution is O(n), where `n` is the size of the input. The auxiliary space required by the program is O(r), where `r` is the rotation count.

## 3\. By reversing array

We can even solve this problem in O(n) time and O(1) extra space. The idea is to reverse the first `r` elements of the input array and then reverse the remaining `n-r` elements. Finally, get the left-rotated array by reversing the complete array.

```ts
// Function to reverse a given subarray
function reverse(arr: number[], low: number, high: number): void {
  for (let i = low, j = high; i < j; i++, j--) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// Function to left-rotate an array by `r` positions
function leftRotate(arr: number[], r: number, n: number): void {
  // base case: invalid input
  if (r < 0 || r >= n) {
    return;
  }

  // Reverse the first `r` elements
  reverse(arr, 0, r - 1);

  // Reverse the remaining `n-r` elements
  reverse(arr, r, n - 1);

  // Reverse the whole array
  reverse(arr, 0, n - 1);
}

const arr = [1, 2, 3, 4, 5];
const r = 2;

const n = arr.length;

leftRotate(arr, r, n);

console.log(arr.join(' '));
```

**Output:** 3 4 5 1 2
