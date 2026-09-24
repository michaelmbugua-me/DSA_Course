# Replace every array element with the least greater element on its right

> Source: https://www.techiedelight.com/replace-every-element-array-least-greater-element-right/

Given an array of distinct integers, replace every element with the least greater element on its right or with -1 if there are no greater elements.

For example,

**Input:** { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6 } **Output:** { 32, -1, 94, 35, 65, 80, 90, 94, -1, -1 }

> 

A simple solution is to check if every array element has a successor to its right or not by using nested loops. The outer loop picks elements from left to right of the array, and the inner loop searches for the smallest element greater than the picked element and replaces the picked element with it. Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <limits.h>

// Replace each element of the specified array with the
// least greater element on its right
void replace(int nums[], int n)
{
    // traverse the array from the beginning
    for (int i = 0; i < n; i++)
    {
        int successor = -1;
        int diff = INT_MAX;

        // check every element on the right for a successor
        for (int j = i + 1; j < n; j++)
        {
            if (nums[j] > nums[i] && (nums[j] - nums[i] < diff))
            {
                successor = nums[j];
                diff = nums[j] - nums[i];
            }
        }
        nums[i] = successor;
    }

    // print the resultant array
    for (int i = 0; i < n; i++) {
        printf("%d ", nums[i]);
    }
}

int main(void)
{
    int nums[] = { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6};
    int n = sizeof(nums)/ sizeof(nums[0]);

    replace(nums, n);

    return 0;
}
```

**Output:** 32 -1 94 35 65 80 90 94 -1 -1

##

```java
import java.util.Arrays;

class Main
{
    // Replace each element of the specified array with the
    // least greater element on its right
    public static void replace(int[] nums)
    {
        // traverse the array from the beginning
        for (int i = 0; i < nums.length; i++)
        {
            int successor = -1;
            int diff = Integer.MAX_VALUE;

            // check every element on the right for a successor
            for (int j = i + 1; j < nums.length; j++)
            {
                if (nums[j] > nums[i] && (nums[j] - nums[i] < diff))
                {
                    successor = nums[j];
                    diff = nums[j] - nums[i];
                }
            }
            nums[i] = successor;
        }

        // print the resultant array
        System.out.println(Arrays.toString(nums));
    }

    public static void main(String[] args)
    {
        int[] nums = { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6};

        replace(nums);
    }
}
```

##

```python3
import sys

# Replace each element of the specified list with the
# least greater element on its right
def replace(nums):

    # traverse the list from the beginning
    for i in range(len(nums)):

        successor = -1
        diff = sys.maxsize

        # check every element on the right for a successor
        for j in range(i + 1, len(nums)):
            if nums[j] > nums[i] and (nums[j] - nums[i] < diff):
                successor = nums[j]
                diff = nums[j] - nums[i]

        nums[i] = successor

    # print the resultant list
    print(nums)

if __name__ == '__main__':

    nums = [10, 100, 93, 32, 35, 65, 80, 90, 94, 6]
    replace(nums)
```

The time complexity of the above solution would be O(n2), where `n` is the size of the input.

Another solution is to use a [BST](https://techiedelight.com/binary-search-tree-bst-interview-questions/). The idea is to traverse the array from right to left and insert each element into the BST. Replace each array element by its inorder successor in the BST or by -1 if its inorder successor doesn’t exist.

Following is the C, Java, and Python implementation based on the above idea. This solution work only for distinct integers.

```c
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a BST node
struct Node
{
    int key;
    struct Node *left, *right;
};

// Utility function to create a new binary search tree node
struct Node* allocateNode(int key)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));

    node->key = key;
    node->left = NULL;
    node->right = NULL;

    return node;
}

// Function to insert a specified key into the binary search tree rooted at
// the specified node and find its successor
void insert(struct Node **root, int key, int *successor)
{
    // base case: empty tree
    if (*root == NULL)
    {
        *root = allocateNode(key);
        return;
    }

    // if the key is less than root
    if (key < (*root)->key)
    {
        // set successor as the current node
        *successor = (*root)->key;

        // traverse left subtree
        insert(&(*root)->left, key, successor);
    }

    // if the key is more than root
    else if (key > (*root)->key)
    {
        // traverse right subtree
        insert(&(*root)->right, key, successor);
    }
}

// Replace each element of the specified array with the
// least greater element on its right
void replace(int nums[], int n)
{
    // root of the binary search tree
    struct Node* root = NULL;

    // traverse the array from the end
    for (int i = n - 1; i >= 0; i--)
    {
        // insert the current element into the binary search tree
        // and replace it with its inorder successor
        int successor = -1;
        insert(&root, nums[i], &successor);
        nums[i] = successor;
    }

    // print the resultant array
    for (int i = 0; i < n; i++) {
        printf("%d ", nums[i]);
    }
}

int main(void)
{
    int nums[] = { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6 };
    int n = sizeof(nums)/ sizeof(nums[0]);

    replace(nums, n);

    return 0;
}
```

**Output:** 32 -1 94 35 65 80 90 94 -1 -1

##

```cpp
#include <iostream>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int key;
    Node *left, *right;
};

// Utility function to create a new binary search tree node
Node* allocateNode(int key)
{
    Node* node = new Node;

    node->key = key;
    node->left = nullptr;
    node->right = nullptr;

    return node;
}

// Function to insert a specified key into the binary search tree rooted at
// the specified node and find its successor
void insert(Node* &root, int key, int &successor)
{
    // base case: empty tree
    if (root == nullptr)
    {
        root = allocateNode(key);
        return;
    }

    // if the key is less than root
    if (key < root->key)
    {
        // set successor as the current node
        successor = root->key;

        // traverse the left subtree
        insert(root->left, key, successor);
    }

    // if the key is more than root
    else if (key > root->key)
    {
        // traverse the right subtree
        insert(root->right, key, successor);
    }
}

// Replace each element of the specified array with the
// least greater element on its right
void replace(int nums[], int n)
{
    // root of the binary search tree
    Node* root = nullptr;

    // traverse the array from the end
    for (int i = n - 1; i >= 0; i--)
    {
        // insert the current element into the binary search tree
        // and replace it with its inorder successor
        int successor = -1;
        insert(root, nums[i], successor);
        nums[i] = successor;
    }

    // print the resultant array
    for (int i = 0; i < n; i++) {
        cout << nums[i] << " ";
    }
}

int main()
{
    int nums[] = { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6 };
    int n = sizeof(nums)/ sizeof(nums[0]);

    replace(nums, n);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a BST node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Function to insert a specified key into the binary search tree
    // rooted at the specified node and find its successor
    public static Node insert(Node root, int key, AtomicInteger successor)
    {
        // base case: empty tree
        if (root == null) {
            return new Node(key);
        }

        // if the key is less than root
        if (key < root.key)
        {
            // set successor as the current node
            successor.set(root.key);

            // traverse the left subtree
            root.left = insert(root.left, key, successor);
        }

        // if the key is more than root
        else if (key > root.key)
        {
            // traverse the right subtree
            root.right = insert(root.right, key, successor);
        }

        return root;
    }

    // Replace each element of the specified array with the
    // least greater element on its right
    public static void replace(int[] nums)
    {
        // root of the binary search tree
        Node root = null;

        // traverse the array from the end
        for (int i = nums.length - 1; i >= 0; i--)
        {
            // insert the current element into the binary search tree
            // and replace it with its inorder successor
            AtomicInteger successor = new AtomicInteger(-1);
            root = insert(root, nums[i], successor);
            nums[i] = successor.get();
        }

        // print the resultant array
        System.out.println(Arrays.toString(nums));
    }

    public static void main(String[] args)
    {
        int[] nums = { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6 };

        replace(nums);
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

# Function to insert a specified key into the binary search tree
# rooted at the specified node and find its successor
def insert(root, key, successor):

    # base case: empty tree
    if root is None:
        return Node(key), successor

    # if the key is less than root
    if key < root.key:

        # set successor as the current node
        successor = root.key

        # traverse the left subtree
        root.left, successor = insert(root.left, key, successor)

    # if the key is more than root
    elif key > root.key:

        # traverse the right subtree
        root.right, successor = insert(root.right, key, successor)

    return root, successor

# Replace each element of the specified list with the
# least greater element on its right
def replace(nums):

    # root of the binary search tree
    root = None

    # traverse the list from the end
    for i in reversed(range(len(nums))):
        # insert the current element into the binary search tree
        # and replace it with its inorder successor
        successor = -1
        root, successor = insert(root, nums[i], successor)
        nums[i] = successor

    # print the resultant list
    print(nums)

if __name__ == '__main__':

    nums = [10, 100, 93, 32, 35, 65, 80, 90, 94, 6]

    replace(nums)
```

The time complexity of the above solution remains O(n2), but it can be reduced to O(n.log(n)) using height-balanced trees. The worst case happens when the input array is sorted in either ascending or descending order.

**Author:** Aditya Goel
