# Combinations of words formed by replacing given numbers with corresponding alphabets

> Source: https://www.techiedelight.com/combinations-of-words-formed-replacing-given-numbers-corresponding-english-alphabet/

Given a set of single-digit positive numbers, find all possible combinations of words formed by replacing the continuous digits with corresponding character in the English alphabet, i.e., subset `{1}` can be replaced by `A`, `{2}` can be replaced by `B`, `{1, 0}` can be replaced by `J`, `{2, 1}` can be replaced by `U`, etc.

For example,

**Input:** digits[] = { 1, 2, 2 } **Output:** ABB, AV, LB {1, 2, 2} = ABB {1, 22} = AV {12, 2} = LB **Input:** digits[] = { 1, 2, 2, 1 } **Output:** ABBA, ABU, AVA, LBA, LU {1, 2, 2, 1} = ABBA {1, 2, 21} = ABU {1, 22, 1} = AVA {12, 2, 1} = LBA {12, 21} = LU

> 

For every `i'th` element of the input, there are two possibilities – either this `i'th` element will be combined with `(i+1)'th` element if the number formed by them is less than equal to 26 or `i'th` element itself will form a new character.

The idea is to recur with the remaining digits by considering both possibilities. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Function to find all possible combinations of words formed by replacing
// given positive numbers with the corresponding character of the English alphabet
void recur(vector<int> const &digits, int i, string str)
{
    int n = digits.size();

    // base case: all digits are processed in the current configuration
    if (i == n)
    {
        // print the string
        cout << str << endl;
        return;
    }

    static string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    int sum = 0;

    // process the next two digits (i'th and (i+1)'th)
    for (int j = i; j <= min(i + 1, n - 1); j++)
    {
        sum = (sum * 10) + digits[j];

        // if a valid character can be formed by taking one or both digits,
        // append it to the output and recur for the remaining digits
        if (sum <= 26) {
            recur(digits, j + 1, str + alphabet[sum - 1]);
        }
    }
}

void findCombinations(vector<int> const &digits)
{
    // base case
    if (digits.size() == 0) {
        return;
    }

    recur(digits, 0, "");
}

int main()
{
    vector<int> digits = { 1, 2, 2 };

    findCombinations(digits);

    return 0;
}
```

**Output:** ABB AV LB

##

```java
class Main
{
    private static final String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Function to find all possible combinations of words formed
    // by replacing given positive numbers with the corresponding
    // character of the English alphabet
    public static void recur(int[] digits, int i, String str)
    {
        // base case: all digits are processed in the current configuration
        if (i == digits.length)
        {
            // print the string
            System.out.println(str);
            return;
        }

        int sum = 0;

        // process the next two digits (i'th and (i+1)'th)
        for (int j = i; j <= Integer.min(i + 1, digits.length - 1); j++)
        {
            sum = (sum * 10) + digits[j];

            // if a valid char can be formed by taking one or both digits,
            // append it to the output and recur for the remaining digits
            if (sum > 0 && sum <= 26) {
                recur(digits, j + 1, str + alphabet.charAt(sum - 1));
            }
        }
    }

    public static void findCombinations(int[] digits)
    {
        // base case
        if (digits == null || digits.length == 0) {
            return;
        }

        String str = "";
        recur(digits, 0, str);
    }

    public static void main(String[] args)
    {
        int[] digits = { 1, 2, 2 };

        findCombinations(digits);
    }
}
```

##

```python3
# Function to find all possible combinations of words formed by replacing
# given positive numbers with the corresponding character of the English alphabet
def findCombinations(digits, i=0, s=''):

    # base case
    if not digits:
        return

    # base case: all digits are processed in the current configuration
    if i == len(digits):
        # print the string
        print(s)
        return

    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    total = 0

    # process the next two digits (i'th and (i+1)'th)
    for j in range(i, min(i + 1, len(digits) - 1) + 1):

        total = (total * 10) + digits[j]

        # if a valid character can be formed by taking one or both digits,
        # append it to the output and recur for the remaining digits
        if 0 < total <= 26:
            findCombinations(digits, j + 1, s + alphabet[total - 1])

if __name__ == '__main__':

    digits = [1, 2, 2]

    findCombinations(digits)
```

We can also solve this problem by using binary tree and recursion. The basic idea remains the same, i.e., recur with the remaining digits by considering both possibilities for every `i'th` element of the input – either this `i'th` element will be combined with `(i+1)'th` element if the number formed by them is less than equal to `26` or `i'th` element itself will form a new character.

The only difference is that instead of using string to store the output, use binary tree nodes. Following is the implementation in C++, Java, and Python based on the idea. It constructs a binary tree where each leaf node contains one unique combination of words formed.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    string key;
    Node *left, *right;

    Node(string key)
    {
        this->key = key;
        this->left = this->right = nullptr;
    }
};

// Function to print all leaf nodes of the binary tree
void print(Node* node)
{
    if (node == nullptr) {
        return;
    }

    if (node->left == nullptr && node->right == nullptr) {
        cout<< node->key << " ";
    }
    else {
        print(node->right);
        print(node->left);
    }
}

// Function to construct a binary tree where each leaf node contains
// one unique combination of words formed
void construct(Node* root, vector<int> const &digits, int i)
{
    int n = digits.size();

    // Base case: empty tree
    if (root == nullptr || i == n) {
        return;
    }

    static string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // check if `digits[i+1]` exists
    if (i + 1 < n)
    {
        // process current and next digit
        int sum = 10 * digits[i] + digits[i + 1];

        // if both digits can form a valid character, create the left child from it
        if (sum <= 26) {
            root->left = new Node(root->key + alphabet[sum - 1]);
        }

        // construct the left subtree by remaining digits
        construct(root->left, digits, i + 2);
    }

    // process the current digit and create the right child from it
    root->right = new Node(root->key + alphabet[digits[i] - 1]);

    // construct the right subtree by remaining digits
    construct(root->right, digits, i + 1);
}

int main()
{
    vector<int> digits = {1, 2, 2, 1};

    // create an empty root
    Node* root = new Node("");

    // construct binary tree
    construct(root, digits, 0);

    print(root);

    return 0;
}
```

**Output:** ABBA ABU AVA LBA LU

##

```java
// A class to store a binary tree node
class Node
{
    String key;
    Node left, right;

    // Constructor
    Node(String key)
    {
        this.key = key;
        left = right = null;
    }
}

class Main
{
    private static final String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Function to print all leaf nodes of the binary tree
    public static void print(Node node)
    {
        if (node == null) {
            return;
        }

        if (node.left == null && node.right == null) {
            System.out.print(node.key + " ");
        }
        else {
            print(node.right);
            print(node.left);
        }
    }

    // Function to construct a binary tree where each leaf node contains
    // one unique combination of words formed
    public static void construct(Node root, int[] digits, int i)
    {
        // Base case: empty tree
        if (root == null || i == digits.length) {
            return;
        }

        // check if `digits[i+1]` exists
        if (i + 1 < digits.length)
        {
            // process current and next digit
            int sum = 10 * digits[i] + digits[i + 1];

            // if both digits can form a valid character, create the left child from it
            if (sum <= 26) {
                root.left = new Node(root.key + alphabet.charAt(sum - 1));
            }

            // construct the left subtree by remaining digits
            construct(root.left, digits, i + 2);
        }

        // process the current digit and create the right child from it
        root.right = new Node(root.key + alphabet.charAt(digits[i] - 1));

        // construct the right subtree by remaining digits
        construct(root.right, digits, i + 1);
    }

    public static void main(String[] args)
    {
        int[] digits = { 1, 2, 2, 1 };

        // create an empty root
        Node root = new Node("");

        // construct binary tree
        construct(root, digits, 0);

        print(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    # Constructor
    def __init__(self, key='', left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Function to print all leaf nodes of the binary tree
def printBT(node):
    if node is None:
        return

    if node.left is None and node.right is None:
        print(node.key, end=' ')
    else:
        printBT(node.right)
        printBT(node.left)

# Function to construct a binary tree where each leaf node contains
# one unique combination of words formed
def construct(root, alphabet, digits, i):

    # Base case: empty tree
    if root is None or i == len(digits):
        return

    # check if `digits[i+1]` exists
    if i + 1 < len(digits):

        # process current and next digit
        total = 10 * digits[i] + digits[i + 1]

        # if both digits can form a valid character, create the left child from it
        if total <= 26:
            root.left = Node(root.key + alphabet[total - 1])

        # construct the left subtree by remaining digits
        construct(root.left, alphabet, digits, i + 2)

    # process the current digit and create the right child from it
    root.right = Node(root.key + alphabet[digits[i] - 1])

    # construct the right subtree by remaining digits
    construct(root.right, alphabet, digits, i + 1)

if __name__ == '__main__':

    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    digits = [1, 2, 2, 1]

    # create an empty root
    root = Node()

    # construct binary tree
    construct(root, alphabet, digits, 0)

    printBT(root)
```

The time complexity of both above-discussed methods is exponential and requires additional space for the recursion (call stack).
