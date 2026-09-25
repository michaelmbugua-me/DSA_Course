# Find preorder traversal of a binary tree from its inorder and postorder sequence

> Source: https://www.techiedelight.com/find-preorder-traversal-binary-tree-from-inorder-postorder/

Write an efficient algorithm to find a binary tree’s [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) from its [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) sequence without constructing the tree.

For example, consider the following tree:

**Input:** Inorder traversal is { 4, 2, 1, 7, 5, 8, 3, 6 } Postorder traversal is { 4, 2, 7, 8, 5, 6, 3, 1 } **Output:** The preorder traversal is { 1, 2, 4, 3, 5, 7, 8, 6 }

> 

We start with the root node, whose value would be the last item in the postorder sequence. The idea is to find boundaries of the left and right subtree of the root node in a given inorder sequence. To find the left and right subtree edges, search for the root node index in the inorder sequence. All keys before the root node in the inorder sequence become part of the left subtree, and all keys after the root node become part of the right subtree. If we repeat this recursively for all tree nodes, we will end up doing a preorder traversal on the tree.

The algorithm can be implemented as follows in TypeScript:

```ts
// Recursive function to find preorder traversal of a binary tree
// from its inorder and postorder sequence.
function printPreorder(start: number, end: number, postorder: number[],
                pIndex: { value: number }, d: Map<number, number>, stack: number[]): void {

    // base case
    if (start > end) {
        return;
    }

    // The next element in the postorder sequence from the end will be the root node
    // of subtree formed by sequence inorder[start, end]
    const value = postorder[pIndex.value];
    pIndex.value = pIndex.value - 1;

    // get the current node index in inorder sequence to determine
    // its left and right subtree boundary
    const index = d.get(value);

    // recur for the right subtree
    printPreorder(index + 1, end, postorder, pIndex, d, stack);

    // recur for the left subtree
    printPreorder(start, index - 1, postorder, pIndex, d, stack);

    // push the value of the current node into the stack
    stack.push(value);
}

// Find preorder traversal of a binary tree from its inorder and
// postorder sequence. This function assumes that the input is valid.
// i.e., given inorder and postorder sequence forms a binary tree.
function findPreorder(inorder: number[], postorder: number[]): void {

    // map is used to efficiently find the index of any element in
    // a given inorder sequence
    const d = new Map<number, number>();

    // fill the map
    for (let i = 0; i < inorder.length; i++) {
        d.set(inorder[i], i);
    }

    // `lastIndex` stores the index of the next unprocessed node from the end
    // of the postorder sequence
    const lastIndex = inorder.length - 1;

    // construct a stack to store the preorder sequence
    const stack: number[] = [];

    // fill the stack
    printPreorder(0, lastIndex, postorder, { value: lastIndex }, d, stack);

    // print the stack
    process.stdout.write('The preorder traversal is ');
    while (stack.length) {
        process.stdout.write(stack.pop() + ' ');
    }
}

/* Construct the following tree
           1
         /   \
        /     \
       2       3
      /       / \
     /       /   \
    4       5     6
           / \
          /   \
         7     8
*/

const inorder = [4, 2, 1, 7, 5, 8, 3, 6];
const postorder = [4, 2, 7, 8, 5, 6, 3, 1];

findPreorder(inorder, postorder);
```

**Output:** The preorder traversal is 1 2 4 3 5 7 8 6

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for hashmap, stack, and call stack.

Also See:

> [Find postorder traversal of a binary tree from its inorder and preorder sequence](https://www.techiedelight.com/find-postorder-traversal-binary-tree-from-inorder-preorder-sequence/ "Find postorder traversal of a binary tree from its inorder and preorder sequence")

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

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

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
