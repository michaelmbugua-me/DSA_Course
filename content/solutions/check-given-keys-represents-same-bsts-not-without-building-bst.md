# Check if the given keys represent the same BSTs or not without building BST

> Source: https://www.techiedelight.com/check-given-keys-represents-same-bsts-not-without-building-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given two integer arrays, X and Y, representing a set of BST keys, check if they represent the same BSTs or not without building the tree. Assume that the keys are inserted into the BST in the same order as they appear in the array.

For example, consider the following arrays:

X[] = { 15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6 } Y[] = { 15, 10, 12, 8, 25, 30, 6, 20, 18, 9, 22 }

Both arrays represent the same BSTs, as shown below:

> 

The algorithm can be implemented as follows in TypeScript:

```ts
// Recursive function to check if `X[0…n)` and `Y[0…n)` represent the same BSTs or not
const isSameBST = (X: number[], Y: number[], n: number): boolean => {

    // if no element is present in the list, return true
    if (n === 0) {
        return true;
    }

    // if the first element differs in both lists (root node key), return false
    if (X[0] !== Y[0]) {
        return false;
    }

    // if the list contains only one key, return true
    if (n === 1) {
        return true;
    }

    // take four auxiliary spaces of size `n-1` each (as maximum keys in
    // left or right subtree can be `n-1`)
    const leftX: number[] = [];
    const rightX: number[] = [];
    const leftY: number[] = [];
    const rightY: number[] = [];

    let k = 0, l = 0, m = 0, o = 0;

    // process the remaining keys and divide them into two groups
    for (let i = 1; i < n; i++) {

        // `leftX` will contain all elements less than `X[0]`
        if (X[i] < X[0]) {
            leftX[k] = X[i];
            k = k + 1;
        }
        // `rightX` will contain all elements more than `X[0]`
        else {
            rightX[l] = X[i];
            l = l + 1;
        }

        // `leftY` will contain all elements less than `Y[0]`
        if (Y[i] < Y[0]) {
            leftY[m] = Y[i];
            m = m + 1;
        }
        // `rightY` will contain all elements more than `Y[0]`
        else {
            rightY[o] = Y[i];
            o = o + 1;
        }
    }

    // return false if the size of `leftX` and `leftY` differs, i.e.,
    // the total number of nodes in the left subtree of both trees differs
    if (k !== m) {
        return false;
    }

    // return false if the size of `rightX` and `rightY` differs, i.e.,
    // the total number of nodes in the right subtree of both trees differs
    if (l !== o) {
        return false;
    }

    // check left and right subtree
    return isSameBST(leftX, leftY, k) && isSameBST(rightX, rightY, l);
};

const X = [15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6];
const Y = [15, 10, 12, 8, 25, 30, 6, 20, 18, 9, 22];

if (X.length === Y.length && isSameBST(X, Y, X.length)) {
    console.log('Given keys represent the same BSTs');
}
else {
    console.log('Given keys represent different BSTs');
}
```

**Output:** Given keys represent the same BSTs

The time complexity of the above solution is O(n2), where `n` is the size of the BST. The auxiliary space required by the program is O(n2).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
