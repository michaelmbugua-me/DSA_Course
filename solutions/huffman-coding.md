# Huffman Coding Compression Algorithm

> Source: https://www.techiedelight.com/huffman-coding/

Huffman coding (also known as Huffman Encoding) is an algorithm for doing data compression, and it forms the basic idea behind file compression. This post talks about the fixed-length and variable-length encoding, uniquely decodable codes, prefix rules, and Huffman Tree construction.

## Overview

We already know that every character is sequences of `0's` and `1's` and stored using 8-bits. This is known as “fixed-length encoding”, as each character uses the same number of fixed-bit storage.

### Given a text, how to reduce the amount of space required to store a character?

The idea is to use “variable-length encoding”. We can exploit the fact that some characters occur more frequently than others in a text (refer to [this](https://en.wikipedia.org/wiki/Letter_frequency)) to design an algorithm that can represent the same piece of text using a lesser number of bits. In variable-length encoding, we assign a variable number of bits to characters depending upon their frequency in the given text. So, some characters might end up taking a single bit, and some might end up taking two bits, some might be encoded using three bits, and so on. The problem with variable-length encoding lies in its decoding.

### Given a sequence of bits, how to decode it uniquely?

Let’s consider the string `aabacdab`. It has `8` characters in it and uses 64–bits storage (using fixed-length encoding). If we note, the frequency of characters `a`, `b`, `c` and `d` are `4`, `2`, `1`, `1`, respectively. Let’s try to represent `aabacdab` using a lesser number of bits by using the fact that `a` occurs more frequently than `b`, and `b` occurs more frequently than `c` and `d`. We start by randomly assigning a single bit code `0` to `a`, 2–bit code `11` to `b`, and 3–bit code `100` and `011` to characters `c` and `d`, respectively.

a 0 b 11 c 100 d 011

So, the string `aabacdab` will be encoded to `00110100011011 (0|0|11|0|100|011|0|11)` using the above codes. But the real problem lies in decoding. If we try to decode the string `00110100011011`, it will lead to ambiguity as it can be decoded to,

0|011|0|100|011|0|11 adacdab 0|0|11|0|100|0|11|011 aabacabd 0|011|0|100|0|11|0|11 adacabab … and so on

To prevent ambiguities in decoding, we will ensure that our encoding satisfies the “prefix rule”, which will result in “uniquely decodable codes”. The prefix rule states that no code is a prefix of another code. By code, we mean the bits used for a particular character. In the above example, `0` is the prefix of `011`, which violates the prefix rule. If our codes satisfy the prefix rule, the decoding will be unambiguous (and vice versa).

Let’s consider the above example again. This time we assign codes that satisfy the prefix rule to characters `'a'`, `'b'`, `'c'`, and `'d'`.

a 0 b 10 c 110 d 111

Using the above codes, the string `aabacdab` will be encoded to `00100110111010 (0|0|10|0|110|111|0|10)`. Now we can uniquely decode `00100110111010` back to our original string `aabacdab`.

Now that we are clear on variable-length encoding and prefix rule, let’s talk about Huffman coding.

## Huffman Coding

The technique works by creating a [binary tree](https://techiedelight.com/binary-tree-interview-questions/) of nodes. A node can be either a leaf node or an internal node. Initially, all nodes are leaf nodes, which contain the character itself, the weight (frequency of appearance) of the character. Internal nodes contain character weight and links to two child nodes. As a common convention, bit `0` represents following the left child, and a bit `1` represents following the right child. A finished tree has `n` leaf nodes and `n-1` internal nodes. It is recommended that Huffman Tree should discard unused characters in the text to produce the most optimal code lengths.

We will use a [priority queue](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/) for building Huffman Tree, where the node with the lowest frequency has the highest priority. Following are the complete steps:

1\. Create a leaf node for each character and add them to the priority queue.

2\. While there is more than one node in the queue:

  * Remove the two nodes of the highest priority (the lowest frequency) from the queue.
  * Create a new internal node with these two nodes as children and a frequency equal to the sum of both nodes’ frequencies.
  * Add the new node to the priority queue.

3\. The remaining node is the root node and the tree is complete.

Consider some text consisting of only `'A'`, `'B'`, `'C'`, `'D'`, and `'E'` characters, and their frequencies are `15`, `7`, `6`, `6`, `5`, respectively. The following figures illustrate the steps followed by the algorithm:

* * *

* * *

* * *

* * *

The path from the root to any leaf node stores the optimal prefix code (also called Huffman code) corresponding to the character associated with that leaf node.

## Implementation

Following is the C++, Java, and Python implementation of the Huffman coding compression algorithm:

```cpp
#include <iostream>
#include <string>
#include <queue>
#include <unordered_map>
using namespace std;

#define EMPTY_STRING ""

// A Tree node
struct Node
{
    char ch;
    int freq;
    Node *left, *right;
};

// Function to allocate a new tree node
Node* getNode(char ch, int freq, Node* left, Node* right)
{
    Node* node = new Node();

    node->ch = ch;
    node->freq = freq;
    node->left = left;
    node->right = right;

    return node;
}

// Comparison object to be used to order the heap
struct comp
{
    bool operator()(const Node* l, const Node* r) const
    {
        // the highest priority item has the lowest frequency
        return l->freq > r->freq;
    }
};

// Utility function to check if Huffman Tree contains only a single node
bool isLeaf(Node* root) {
    return root->left == nullptr && root->right == nullptr;
}

// Traverse the Huffman Tree and store Huffman Codes in a map.
void encode(Node* root, string str, unordered_map<char, string> &huffmanCode)
{
    if (root == nullptr) {
        return;
    }

    // found a leaf node
    if (isLeaf(root)) {
        huffmanCode[root->ch] = (str != EMPTY_STRING) ? str : "1";
    }

    encode(root->left, str + "0", huffmanCode);
    encode(root->right, str + "1", huffmanCode);
}

// Traverse the Huffman Tree and decode the encoded string
void decode(Node* root, int &index, string str)
{
    if (root == nullptr) {
        return;
    }

    // found a leaf node
    if (isLeaf(root))
    {
        cout << root->ch;
        return;
    }

    index++;

    if (str[index] == '0') {
        decode(root->left, index, str);
    }
    else {
        decode(root->right, index, str);
    }
}

// Builds Huffman Tree and decodes the given input text
void buildHuffmanTree(string text)
{
    // base case: empty string
    if (text == EMPTY_STRING) {
        return;
    }

    // count the frequency of appearance of each character
    // and store it in a map
    unordered_map<char, int> freq;
    for (char ch: text) {
        freq[ch]++;
    }

    // Create a priority queue to store live nodes of the Huffman tree
    priority_queue<Node*, vector<Node*>, comp> pq;

    // Create a leaf node for each character and add it
    // to the priority queue.
    for (auto pair: freq) {
        pq.push(getNode(pair.first, pair.second, nullptr, nullptr));
    }

    // do till there is more than one node in the queue
    while (pq.size() != 1)
    {
        // Remove the two nodes of the highest priority
        // (the lowest frequency) from the queue

        Node* left = pq.top(); pq.pop();
        Node* right = pq.top();    pq.pop();

        // create a new internal node with these two nodes as children and
        // with a frequency equal to the sum of the two nodes' frequencies.
        // Add the new node to the priority queue.

        int sum = left->freq + right->freq;
        pq.push(getNode('\0', sum, left, right));
    }

    // `root` stores pointer to the root of Huffman Tree
    Node* root = pq.top();

    // Traverse the Huffman Tree and store Huffman Codes
    // in a map. Also, print them
    unordered_map<char, string> huffmanCode;
    encode(root, EMPTY_STRING, huffmanCode);

    cout << "Huffman Codes are:\n" << endl;
    for (auto pair: huffmanCode) {
        cout << pair.first << " " << pair.second << endl;
    }

    cout << "\nThe original string is:\n" << text << endl;

    // Print encoded string
    string str;
    for (char ch: text) {
        str += huffmanCode[ch];
    }

    cout << "\nThe encoded string is:\n" << str << endl;
    cout << "\nThe decoded string is:\n";

    if (isLeaf(root))
    {
        // Special case: For input like a, aa, aaa, etc.
        while (root->freq--) {
            cout << root->ch;
        }
    }
    else {
        // Traverse the Huffman Tree again and this time,
        // decode the encoded string
        int index = -1;
        while (index < (int)str.size() - 1) {
            decode(root, index, str);
        }
    }
}

// Huffman coding algorithm implementation in C++
int main()
{
    string text = "Huffman coding is a data compression algorithm.";
    buildHuffmanTree(text);

    return 0;
}
```

**Output:** **Huffman Codes are:** c 11111 h 111100 f 11101 r 11100 t 11011 p 110101 i 1100 g 0011 l 00101 a 010 o 000 d 10011 H 00100 . 111101 s 0110 m 0111 e 110100 101 n 1000 u 10010 **The original string is:** Huffman coding is a data compression algorithm. **The encoded string is:** 00100100101110111101011101010001011111100010011110010000011101110001101010101011001101011011010101111110000111110101111001101000110011011000001000101010001010011000111001100110111111000111111101 **The decoded string is:** Huffman coding is a data compression algorithm.

##

```java
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

// A Tree node
class Node
{
    Character ch;
    Integer freq;
    Node left = null, right = null;

    Node(Character ch, Integer freq)
    {
        this.ch = ch;
        this.freq = freq;
    }

    public Node(Character ch, Integer freq, Node left, Node right)
    {
        this.ch = ch;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

class Main
{
    // Traverse the Huffman Tree and store Huffman Codes in a map.
    public static void encode(Node root, String str,
                        Map<Character, String> huffmanCode)
    {
        if (root == null) {
            return;
        }

        // Found a leaf node
        if (isLeaf(root)) {
            huffmanCode.put(root.ch, str.length() > 0 ? str : "1");
        }

        encode(root.left, str + '0', huffmanCode);
        encode(root.right, str + '1', huffmanCode);
    }

    // Traverse the Huffman Tree and decode the encoded string
    public static int decode(Node root, int index, StringBuilder sb)
    {
        if (root == null) {
            return index;
        }

        // Found a leaf node
        if (isLeaf(root))
        {
            System.out.print(root.ch);
            return index;
        }

        index++;

        root = (sb.charAt(index) == '0') ? root.left : root.right;
        index = decode(root, index, sb);
        return index;
    }

    // Utility function to check if Huffman Tree contains only a single node
    public static boolean isLeaf(Node root) {
        return root.left == null && root.right == null;
    }

    // Builds Huffman Tree and decodes the given input text
    public static void buildHuffmanTree(String text)
    {
        // Base case: empty string
        if (text == null || text.length() == 0) {
            return;
        }

        // Count the frequency of appearance of each character
        // and store it in a map

        Map<Character, Integer> freq = new HashMap<>();
        for (char c: text.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }

        // create a priority queue to store live nodes of the Huffman tree.
        // Notice that the highest priority item has the lowest frequency

        PriorityQueue<Node> pq;
        pq = new PriorityQueue<>(Comparator.comparingInt(l -> l.freq));

        // create a leaf node for each character and add it
        // to the priority queue.

        for (var entry: freq.entrySet()) {
            pq.add(new Node(entry.getKey(), entry.getValue()));
        }

        // do till there is more than one node in the queue
        while (pq.size() != 1)
        {
            // Remove the two nodes of the highest priority
            // (the lowest frequency) from the queue

            Node left = pq.poll();
            Node right = pq.poll();

            // create a new internal node with these two nodes as children
            // and with a frequency equal to the sum of both nodes'
            // frequencies. Add the new node to the priority queue.

            int sum = left.freq + right.freq;
            pq.add(new Node(null, sum, left, right));
        }

        // `root` stores pointer to the root of Huffman Tree
        Node root = pq.peek();

        // Traverse the Huffman tree and store the Huffman codes in a map
        Map<Character, String> huffmanCode = new HashMap<>();
        encode(root, "", huffmanCode);

        // Print the Huffman codes
        System.out.println("Huffman Codes are: " + huffmanCode);
        System.out.println("The original string is: " + text);

        // Print encoded string
        StringBuilder sb = new StringBuilder();
        for (char c: text.toCharArray()) {
            sb.append(huffmanCode.get(c));
        }

        System.out.println("The encoded string is: " + sb);
        System.out.print("The decoded string is: ");

        if (isLeaf(root))
        {
            // Special case: For input like a, aa, aaa, etc.
            while (root.freq-- > 0) {
                System.out.print(root.ch);
            }
        }
        else {
            // Traverse the Huffman Tree again and this time,
            // decode the encoded string
            int index = -1;
            while (index < sb.length() - 1) {
                index = decode(root, index, sb);
            }
        }
    }

    // Huffman coding algorithm implementation in Java
    public static void main(String[] args)
    {
        String text = "Huffman coding is a data compression algorithm.";
        buildHuffmanTree(text);
    }
}
```

##

```python3
import heapq
from heapq import heappop, heappush

def isLeaf(root):
    return root.left is None and root.right is None

# A Tree node
class Node:
    def __init__(self, ch, freq, left=None, right=None):
        self.ch = ch
        self.freq = freq
        self.left = left
        self.right = right

    # Override the `__lt__()` function to make `Node` class work with priority queue
    # such that the highest priority item has the lowest frequency
    def __lt__(self, other):
        return self.freq < other.freq

# Traverse the Huffman Tree and store Huffman Codes in a dictionary
def encode(root, s, huffman_code):

    if root is None:
        return

    # found a leaf node
    if isLeaf(root):
        huffman_code[root.ch] = s if len(s) > 0 else '1'

    encode(root.left, s + '0', huffman_code)
    encode(root.right, s + '1', huffman_code)

# Traverse the Huffman Tree and decode the encoded string
def decode(root, index, s):

    if root is None:
        return index

    # found a leaf node
    if isLeaf(root):
        print(root.ch, end='')
        return index

    index = index + 1
    root = root.left if s[index] == '0' else root.right
    return decode(root, index, s)

# Builds Huffman Tree and decodes the given input text
def buildHuffmanTree(text):

    # base case: empty string
    if len(text) == 0:
        return

    # count the frequency of appearance of each character
    # and store it in a dictionary
    freq = {i: text.count(i) for i in set(text)}

    # Create a priority queue to store live nodes of the Huffman tree.
    pq = [Node(k, v) for k, v in freq.items()]
    heapq.heapify(pq)

    # do till there is more than one node in the queue
    while len(pq) != 1:

        # Remove the two nodes of the highest priority
        # (the lowest frequency) from the queue

        left = heappop(pq)
        right = heappop(pq)

        # create a new internal node with these two nodes as children and
        # with a frequency equal to the sum of the two nodes' frequencies.
        # Add the new node to the priority queue.

        total = left.freq + right.freq
        heappush(pq, Node(None, total, left, right))

    # `root` stores pointer to the root of Huffman Tree
    root = pq[0]

    # traverse the Huffman tree and store the Huffman codes in a dictionary
    huffmanCode = {}
    encode(root, '', huffmanCode)

    # print the Huffman codes
    print('Huffman Codes are:', huffmanCode)
    print('The original string is:', text)

    # print the encoded string
    s = ''
    for c in text:
        s += huffmanCode.get(c)

    print('The encoded string is:', s)
    print('The decoded string is:', end=' ')

    if isLeaf(root):
        # Special case: For input like a, aa, aaa, etc.
        while root.freq > 0:
            print(root.ch, end='')
            root.freq = root.freq - 1
    else:
        # traverse the Huffman Tree again and this time,
        # decode the encoded string
        index = -1
        while index < len(s) - 1:
            index = decode(root, index, s)

# Huffman coding algorithm implementation in Python
if __name__ == '__main__':

    text = 'Huffman coding is a data compression algorithm.'
    buildHuffmanTree(text)
```

Note that the input string’s storage is 47×8 = 376 bits, but our encoded string only takes 194 bits, i.e., about 48% of data compression. To make the program readable, we have used string class to store the above program’s encoded string.

Since efficient priority queue data structures require O(log(n)) time per insertion, and a complete binary tree with `n` leaves has `2n-1` nodes, and Huffman coding tree is a complete binary tree, this algorithm operates in O(n.log(n)) time, where `n` is the total number of characters.

**References:**

<https://en.wikipedia.org/wiki/Huffman_coding> <https://en.wikipedia.org/wiki/Variable-length_code> [Dr. Naveen Garg, IIT–D (Lecture – 19 Data Compression)](https://www.youtube.com/watch?v=5wRPin4oxCo)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 229

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
