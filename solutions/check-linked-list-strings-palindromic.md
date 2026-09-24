# Check if a linked list of strings is palindromic

> Source: https://www.techiedelight.com/check-linked-list-strings-palindromic/

Given a linked list of strings, check whether the concatenation of all values in the list together forms a palindrome. It is not permissible to construct a string out of the linked list nodes and check that string for palindrome.

For example,

**Input:** AA —> XYZ —> CD —> C —> ZYX —> AA —> null **Output:** true **Explanation:** String AAXYZCDCZYXAA is palindrome **Input:** A —> B —> C —> DC —> B —> null **Output:** false **Explanation:** String ABCDCB is not a palindrome

> 

The idea is to traverse till the end of the linked list using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) and construct a string that contains a concatenation of all values in the linked list nodes (in encountered order). When the recursion unfolds, we build another string containing a concatenation of all strings in reverse order. This time, the encountered order of linked list nodes is the opposite, i.e., from the last node towards the head node.

Now the problem reduces to just validating if both constructed strings are equal or not. If both strings are the same, we can say that the linked list is palindromic. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// A Linked List Node
struct Node
{
    string data;
    Node* next;

    // Constructor
    Node(string str)
    {
        this->data = str;
        this->next = nullptr;
    }
};

// Function to print a linked list
void printList(Node* node)
{
    while (node)
    {
        cout << node->data << " —> ";
        node = node->next;
    }

    cout << "nullptr";
}

// Function to reverse a string
string reverse(string const &s)
{
    string rev = "";
    for_each(s.rbegin(), s.rend(),
                [&rev] (char const &c) {
                    rev = rev.append(1, c);
                });
    return rev;
}

// Construct string 'x' and 'y' out of the given linked list with consecutive
// list elements in the forward and backward direction
void construct(Node* &head, string &x, string &y)
{
    // base case
    if (head == nullptr) {
        return;
    }

    x += head->data;
    construct(head->next, x, y);
    y += reverse(head->data);
}

// Function to check if a given linked list of strings is palindromic
bool isPalindromic(Node* head)
{
    // construct string 'x' with consecutive elements of the linked list
    // construct string 'y' by reversing consecutive elements of the
    // linked list, starting from the end

    string x, y;
    construct(head, x, y);

    // check if the linked list is palindromic
    return x == y;
}

int main()
{
    Node* head = new Node("AA");
    head->next = new Node("XYZ");
    head->next->next = new Node("CD");
    head->next->next->next = new Node("C");
    head->next->next->next->next = new Node("ZYX");
    head->next->next->next->next->next = new Node("AA");

    cout << "Linked List [";
    printList(head);

    if (isPalindromic(head)) {
        cout << "] is a palindrome.";
    }
    else {
        cout << "] is not a palindrome.";
    }

    return 0;
}
```

**Output:** Linked List [AA —> XYZ —> CD —> C —> ZYX —> AA —> nullptr] is a palindrome.

##

```java
// A Linked List Node
class Node
{
    String data;
    Node next;

    // Constructor
    Node(String str)
    {
        this.data = str;
        this.next = null;
    }
}

class Main
{
    // Function to print a linked list
    public static void printList(Node node)
    {
        while (node != null)
        {
            System.out.print(node.data + " —> ");
            node = node.next;
        }
        System.out.print("null");
    }

    // Construct string 'x' and 'y' out of the given linked list with consecutive
    // list elements in the forward and backward direction
    public static void construct(Node head, StringBuilder x, StringBuilder y)
    {
        // base case
        if (head == null) {
            return;
        }

        x.append(head.data);
        construct(head.next, x, y);
        y.append(new StringBuilder(head.data).reverse().toString());
    }

    // Function to check if a given linked list of strings is palindromic
    public static boolean isPalindromic(Node head)
    {
        // construct string 'x' with consecutive elements of the linked list
        // construct string 'y' by reversing consecutive elements of the
        // linked list, starting from the end

        StringBuilder x = new StringBuilder(), y = new StringBuilder();
        construct(head, x, y);

        // check if the linked list is palindromic
        return x.toString().equals(y.toString());
    }

    public static void main(String[] args)
    {
        Node head = new Node("AA");
        head.next = new Node("XYZ");
        head.next.next = new Node("CD");
        head.next.next.next = new Node("C");
        head.next.next.next.next = new Node("ZYX");
        head.next.next.next.next.next = new Node("AA");

        System.out.print("Linked List [");
        printList(head);

        if (isPalindromic(head)) {
            System.out.print("] is a palindrome.");
        }
        else {
            System.out.print("] is not a palindrome.");
        }
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, s):
        self.data = s
        self.next = None

# Function to print a linked list
def printList(node):

    while node:
        print(node.data, end=' —> ')
        node = node.next
    print('None', end='')

# Construct string 'x' and 'y' out of the given linked list with consecutive
# list elements in the forward and backward direction
def construct(head, x='', y=''):

    if head is None:        # base case
        return x, y

    x += head.data
    x, y = construct(head.next, x, y)
    y += head.data[::-1]
    return x, y

# Function to check if a given linked list of strings is palindromic
def isPalindromic(head):

    # construct string 'x' with consecutive elements of the linked list
    # construct string 'y' by reversing consecutive elements of the
    # linked list, starting from the end
    x, y = construct(head)

    # check if the linked list is palindromic
    return x == y

if __name__ == '__main__':

    head = Node('AA')
    head.next = Node('XYZ')
    head.next.next = Node('CD')
    head.next.next.next = Node('C')
    head.next.next.next.next = Node('ZYX')
    head.next.next.next.next.next = Node('AA')

    print('Linked List [', end='');
    printList(head)

    if isPalindromic(head):
        print('] is a palindrome', end='')
    else:
        print('] is not a palindrome', end='')
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
