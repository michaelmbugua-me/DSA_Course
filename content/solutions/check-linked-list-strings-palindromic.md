# Check if a linked list of strings is palindromic

> Source: https://www.techiedelight.com/check-linked-list-strings-palindromic/

Given a linked list of strings, check whether the concatenation of all values in the list together forms a palindrome. It is not permissible to construct a string out of the linked list nodes and check that string for palindrome.

For example,

**Input:** AA —> XYZ —> CD —> C —> ZYX —> AA —> null **Output:** true **Explanation:** String AAXYZCDCZYXAA is palindrome **Input:** A —> B —> C —> DC —> B —> null **Output:** false **Explanation:** String ABCDCB is not a palindrome

> 

The idea is to traverse till the end of the linked list using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) and construct a string that contains a concatenation of all values in the linked list nodes (in encountered order). When the recursion unfolds, we build another string containing a concatenation of all strings in reverse order. This time, the encountered order of linked list nodes is the opposite, i.e., from the last node towards the head node.

Now the problem reduces to just validating if both constructed strings are equal or not. If both strings are the same, we can say that the linked list is palindromic. The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    data: string;
    next: ListNode | null = null;
    constructor(data: string, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a linked list
const printList = (node: ListNode | null): void => {

    let output = '';
    while (node !== null) {
        output += node.data + ' —> ';
        node = node.next;
    }
    output += 'None';
    process.stdout.write(output);
};

// Construct string 'x' and 'y' out of the given linked list with consecutive
// list elements in the forward and backward direction
const construct = (head: ListNode | null, x = '', y = ''): [string, string] => {

    if (head === null) {        // base case
        return [x, y];
    }

    x += head.data;
    [x, y] = construct(head.next, x, y);
    y += head.data.split('').reverse().join('');
    return [x, y];
};

// Function to check if a given linked list of strings is palindromic
const isPalindromic = (head: ListNode | null): boolean => {

    // construct string 'x' with consecutive elements of the linked list
    // construct string 'y' by reversing consecutive elements of the
    // linked list, starting from the end
    const [x, y] = construct(head);

    // check if the linked list is palindromic
    return x === y;
};

// demo

let head = new ListNode('AA');
head.next = new ListNode('XYZ');
head.next.next = new ListNode('CD');
head.next.next.next = new ListNode('C');
head.next.next.next.next = new ListNode('ZYX');
head.next.next.next.next.next = new ListNode('AA');

process.stdout.write('Linked List [');
printList(head);

if (isPalindromic(head)) {
    process.stdout.write('] is a palindrome');
} else {
    process.stdout.write('] is not a palindrome');
}
```

The time complexity of the above solution is O(N.M), where `N` is the length of the linked list and `M` is the maximum word length. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

Also See:

> [Recursively check if the linked list of characters is palindrome or not](https://www.techiedelight.com/recursively-check-linked-list-characters-palindrome-or-not/ "Recursively check if the linked list of characters is palindrome or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
