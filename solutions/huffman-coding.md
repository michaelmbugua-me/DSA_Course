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

Following is the TypeScript implementation of the Huffman coding compression algorithm:

```ts
// Utility function to check if Huffman Tree contains only a single node
function isLeaf(root: Node): boolean {
    return root.left === null && root.right === null;
}

// A Tree node
class Node {
    constructor(public ch: string | null, public freq: number,
                public left: Node | null = null, public right: Node | null = null) {}
}

// Traverse the Huffman Tree and store Huffman Codes in a map
function encode(root: Node | null, s: string, huffmanCode: Map<string, string>): void {

    if (root === null) {
        return;
    }

    // found a leaf node
    if (isLeaf(root)) {
        huffmanCode.set(root.ch!, s.length > 0 ? s : '1');
    }

    encode(root.left, s + '0', huffmanCode);
    encode(root.right, s + '1', huffmanCode);
}

// Traverse the Huffman Tree and decode the encoded string
function decode(root: Node | null, index: number, s: string, decoded: string[]): number {

    if (root === null) {
        return index;
    }

    // found a leaf node
    if (isLeaf(root)) {
        decoded.push(root.ch!);
        return index;
    }

    index = index + 1;
    root = s[index] === '0' ? root.left : root.right;
    return decode(root, index, s, decoded);
}

// Builds Huffman Tree and decodes the given input text
function buildHuffmanTree(text: string): void {

    // base case: empty string
    if (text.length === 0) {
        return;
    }

    // count the frequency of appearance of each character
    // and store it in a map
    const freq = new Map<string, number>();
    for (const c of text) {
        freq.set(c, (freq.get(c) ?? 0) + 1);
    }

    // Create a priority queue to store live nodes of the Huffman tree.
    // min-heap assumed (JS has no builtin heap)
    const pq: Node[] = [];
    for (const [ch, f] of freq) {
        pq.push(new Node(ch, f));
    }

    // remove and return the node with the lowest frequency
    const popMin = (pq: Node[]): Node => {
        let minIdx = 0;
        for (let i = 1; i < pq.length; i++) {
            if (pq[i].freq < pq[minIdx].freq) {
                minIdx = i;
            }
        }
        return pq.splice(minIdx, 1)[0];
    };

    // do till there is more than one node in the queue
    while (pq.length !== 1) {

        // Remove the two nodes of the highest priority
        // (the lowest frequency) from the queue

        const left = popMin(pq);
        const right = popMin(pq);

        // create a new internal node with these two nodes as children and
        // with a frequency equal to the sum of the two nodes' frequencies.
        // Add the new node to the priority queue.

        const total = left.freq + right.freq;
        pq.push(new Node(null, total, left, right));
    }

    // `root` stores pointer to the root of Huffman Tree
    const root = pq[0];

    // traverse the Huffman tree and store the Huffman codes in a map
    const huffmanCode = new Map<string, string>();
    encode(root, '', huffmanCode);

    // print the Huffman codes
    console.log('Huffman Codes are:', huffmanCode);
    console.log('The original string is:', text);

    // print the encoded string
    let s = '';
    for (const c of text) {
        s += huffmanCode.get(c);
    }

    console.log('The encoded string is:', s);
    console.log('The decoded string is:');

    if (isLeaf(root)) {
        // Special case: For input like a, aa, aaa, etc.
        while (root.freq > 0) {
            console.log(root.ch);
            root.freq = root.freq - 1;
        }
    } else {
        // traverse the Huffman Tree again and this time,
        // decode the encoded string
        const decoded: string[] = [];
        let index = -1;
        while (index < s.length - 1) {
            index = decode(root, index, s, decoded);
        }
        console.log(decoded.join(''));
    }
}

// Huffman coding algorithm implementation in TypeScript
const text = 'Huffman coding is a data compression algorithm.';
buildHuffmanTree(text);
```

**Output:** **Huffman Codes are:** c 11111 h 111100 f 11101 r 11100 t 11011 p 110101 i 1100 g 0011 l 00101 a 010 o 000 d 10011 H 00100 . 111101 s 0110 m 0111 e 110100 101 n 1000 u 10010 **The original string is:** Huffman coding is a data compression algorithm. **The encoded string is:** 00100100101110111101011101010001011111100010011110010000011101110001101010101011001101011011010101111110000111110101111001101000110011011000001000101010001010011000111001100110111111000111111101 **The decoded string is:** Huffman coding is a data compression algorithm.

Note that the input string’s storage is 47×8 = 376 bits, but our encoded string only takes 194 bits, i.e., about 48% of data compression. To make the program readable, we have used a string to store the above program’s encoded string.

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
