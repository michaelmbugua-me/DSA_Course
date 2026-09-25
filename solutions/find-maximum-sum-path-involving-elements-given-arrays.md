# Find maximum sum path involving elements of given arrays

> Source: https://www.techiedelight.com/find-maximum-sum-path-involving-elements-given-arrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given two sorted arrays of integers, find a maximum sum path involving elements of both arrays whose sum is maximum. We can start from either array, but we can switch between arrays only through its common elements.

For example,

**Input:** X = { 3, 6, 7, 8, 10, 12, 15, 18, 100 } Y = { 1, 2, 3, 5, 7, 9, 10, 11, 15, 16, 18, 25, 50 } The maximum sum path is: 1 —> 2 —> 3 —> 6 —> 7 —> 9 —> 10 —> 12 —> 15 —> 16 —> 18 —> 100 The maximum sum is 199

> 

The idea is simple – calculate the sum between common elements present in both arrays and include the maximum sum in the output. For example, consider the following arrays `X` and `Y` having four common elements `A`, `B`, `C`, `D`:

X[]: [sum_x1 … A … sum_x2 … B … sum_x3 … C … sum_x4 … D … sum_x5] Y[]: [sum_x1 … A … sum_y2 … B … sum_y3 … C … sum_y4 … D … sum_y5]

Here, `sum_x _i_` denotes the sum of elements between two common elements in array `X`. Similarly, `sum_y _i_` denotes the sum of elements between two common elements in array `Y`. For each pair `(sum_x _i_ , sum_y _i_)`, include `max(sum_x _i_ , sum_y _i_)` in the solution, i.e.,

Result = max(sum_x1, sum_y1) + A + max(sum_x2, sum_y2) + B + max(sum_x3, sum_y3) + C + max(sum_x4, sum_y4) + D + max(sum_x5, sum_y5)

Following is a TypeScript implementation based on the above idea:

**Output:** The maximum sum is 199

```ts
// Function to find the maximum sum path in two given arrays.
// The code is similar to the merge routine of the merge sort algorithm
function findMaxSum(X: number[], Y: number[]): number {

    let total = 0, sum_x = 0, sum_y = 0;

    const m = X.length, n = Y.length;

    // `i` and `j` denotes the current index of `X` and `Y`, respectively
    let i = 0, j = 0;

    // loop till `X` and `Y` are empty
    while (i < m && j < n) {

        // to handle the duplicate elements in `X`
        while (i < m - 1 && X[i] === X[i + 1]) {
            sum_x += X[i];
            i++;
        }

        // to handle the duplicate elements in `Y`
        while (j < n - 1 && Y[j] === Y[j + 1]) {
            sum_y += Y[j];
            j++;
        }

        // if the current element of `Y` is less than the current element of `X`
        if (Y[j] < X[i]) {
            sum_y += Y[j];
            j++;
        }

        // if the current element of `X` is less than the current element of `Y`
        else if (X[i] < Y[j]) {
            sum_x += X[i];
            i++;
        }

        else {  // if X[i] === Y[j]
            // consider the maximum sum and include the current cell's value
            total += Math.max(sum_x, sum_y) + X[i];

            // move both indices by 1 position
            i++;
            j++;

            // reset both sums
            sum_x = 0;
            sum_y = 0;
        }
    }

    // process the remaining elements of `X` (if any)
    while (i < m) {
        sum_x += X[i];
        i++;
    }

    // process the remaining elements of `Y` (if any)
    while (j < n) {
        sum_y += Y[j];
        j++;
    }

    total += Math.max(sum_x, sum_y);
    return total;
}

const X = [3, 6, 7, 8, 10, 12, 15, 18, 100];
const Y = [1, 2, 3, 5, 7, 9, 10, 11, 15, 16, 18, 25, 50];

console.log(`The maximum sum is ${findMaxSum(X, Y)}`);
```

The time complexity of the above solution is O(m + n) and runs in constant space. Here, `m` and `n` are the size of the first and second array, respectively.

**Exercise:**

1\. Print maximum sum path (Hint – use an array/list)

2\. Use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem.

3\. Modify the above code to find the maximum sum path by traversing from the array’s end.

Also See:

> [Find the longest continuous sequence length with the same sum in given binary arrays](https://www.techiedelight.com/length-longest-continuous-sequence-same-sum-binary-arrays/ "Find the longest continuous sequence length with the same sum in given binary arrays")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 119

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
