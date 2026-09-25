# Replace every array element with the least greater element on its right

> Source: https://www.techiedelight.com/replace-every-element-array-least-greater-element-right/

Given an array of distinct integers, replace every element with the least greater element on its right or with -1 if there are no greater elements.

For example,

**Input:** { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6 } **Output:** { 32, -1, 94, 35, 65, 80, 90, 94, -1, -1 }

> 

A simple solution is to check if every array element has a successor to its right or not by using nested loops. The outer loop picks elements from left to right of the array, and the inner loop searches for the smallest element greater than the picked element and replaces the picked element with it. Following is a TypeScript program that demonstrates it:

```ts
// Replace each element of the specified array with the
// least greater element on its right
function replace(nums: number[]): void {
    // traverse the array from the beginning
    for (let i = 0; i < nums.length; i++) {
        let successor = -1;
        let diff = Number.MAX_VALUE;

        // check every element on the right for a successor
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] > nums[i] && nums[j] - nums[i] < diff) {
                successor = nums[j];
                diff = nums[j] - nums[i];
            }
        }
        nums[i] = successor;
    }

    // print the resultant array
    console.log(nums);
}

const nums = [10, 100, 93, 32, 35, 65, 80, 90, 94, 6];

replace(nums);
```

**Output:** 32 -1 94 35 65 80 90 94 -1 -1



The time complexity of the above solution would be O(n2), where `n` is the size of the input.

Another solution is to use a [BST](https://techiedelight.com/binary-search-tree-bst-interview-questions/). The idea is to traverse the array from right to left and insert each element into the BST. Replace each array element by its inorder successor in the BST or by -1 if its inorder successor doesn’t exist.

Following is a TypeScript implementation based on the above idea. This solution work only for distinct integers.

```ts
// A class to store a BST node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Function to insert a specified key into the binary search tree
// rooted at the specified node and find its successor
function insert(root: TreeNode | null, key: number, successor: number): [TreeNode | null, number] {
    // base case: empty tree
    if (root === null) {
        return [new TreeNode(key), successor];
    }

    // if the key is less than root
    if (key < root.val) {
        // set successor as the current node
        successor = root.val;

        // traverse the left subtree
        [root.left, successor] = insert(root.left, key, successor);
    }
    // if the key is more than root
    else if (key > root.val) {
        // traverse the right subtree
        [root.right, successor] = insert(root.right, key, successor);
    }

    return [root, successor];
}

// Replace each element of the specified array with the
// least greater element on its right
function replace(nums: number[]): void {
    // root of the binary search tree
    let root: TreeNode | null = null;

    // traverse the array from the end
    for (let i = nums.length - 1; i >= 0; i--) {
        // insert the current element into the binary search tree
        // and replace it with its inorder successor
        let successor = -1;
        [root, successor] = insert(root, nums[i], successor);
        nums[i] = successor;
    }

    // print the resultant array
    console.log(nums);
}

const nums = [10, 100, 93, 32, 35, 65, 80, 90, 94, 6];

replace(nums);
```

**Output:** 32 -1 94 35 65 80 90 94 -1 -1





The time complexity of the above solution remains O(n2), but it can be reduced to O(n.log(n)) using height-balanced trees. The worst case happens when the input array is sorted in either ascending or descending order.

**Author:** Aditya Goel
