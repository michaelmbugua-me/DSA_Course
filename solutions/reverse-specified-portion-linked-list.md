# Reverse specific portion of a linked list

> Source: https://www.techiedelight.com/reverse-specified-portion-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write an efficient algorithm to reverse the specified portion of a given linked list.

For example,

**Input:** Linked List: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> None start position = 2 end position = 5 **Output:** 1 —> 5 —> 4 —> 3 —> 2 —> 6 —> 7 —> None

> 

We can easily solve the problem iteratively by dividing the solution into three parts. To [reverse a list](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/) from position `m` to `n`, do the following:

  1. Skip the first `m` nodes.
  2. Reverse the sublist from position `m` to `n` using the same `previous-current-next` strategy used in the solution to [reverse a complete linked list](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/).
  3. Rearrange the pointers and return the head node.

This can be effectively implemented as the following in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;
};

// Utility function to print a linked list
void printList(string msg, Node* head)
{
    cout << msg;

    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "null" << endl;
}

// Helper function to insert a new node at the beginning of the linked list
void push(Node** head, int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Iteratively reverse a linked list from position `m` to `n`
// Note that the head is passed by reference
void reverse(Node* &head, int m, int n)
{
    // base case
    if (m > n) {
        return;
    }

    Node* prev = NULL;        // the previous pointer
    Node* curr = head;        // the main pointer

    // 1. Skip the first `m` nodes
    for (int i = 1; curr != NULL && i < m; i++)
    {
        prev = curr;
        curr = curr->next;
    }

    // `prev` now points to (m-1)'th node
    // `curr` now points to m'th node

    Node* start = curr;
    Node* end = NULL;

    // 2. Traverse and reverse the sublist from position `m` to `n`
    for (int i = 1; curr != NULL && i <= n - m + 1; i++)
    {
        // Take note of the next node
        Node* next = curr->next;

        // move the current node onto the `end`
        curr->next = end;
        end = curr;

        // move to the next node
        curr = next;
    }

    /*
        `start` points to the m'th node
        `end` now points to the n'th node
        `curr` now points to the (n+1)'th node
    */

    // 3. Fix the pointers and return the head node

    if (start)
    {
        start->next = curr;
        if (prev != NULL) {
            prev->next = end;
        }
        // when m = 1, `prev` is nullptr
        else {
            // fix the head pointer to point to the new front
            head = end;
        }
    }
}

int main()
{
    int m = 2, n = 5;

    Node* head = NULL;
    for (int i = 7; i >= 1; i--) {
        push(&head, i);
    }

    printList("Original linked list: ", head);
    reverse(head, m, n);
    printList("Reversed linked list: ", head);

    return 0;
}
```

**Output:** Original linked list: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> null Reversed linked list: 1 —> 5 —> 4 —> 3 —> 2 —> 6 —> 7 —> null

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int data, Node next)
    {
        this.data = data;
        this.next = next;
    }
}

class Main
{
    // Utility function to print a linked list
    public static void printList(String msg, Node head)
    {
        System.out.print(msg);

        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }

        System.out.println("null");
    }

    // Iteratively reverse a linked list from position `m` to `n`
    public static Node reverse(Node head, int m, int n)
    {
        // base case
        if (m > n) {
            return head;
        }

        Node prev = null;
        Node curr = head;

        // 1. Skip the first `m` nodes
        for (int i = 1; curr != null && i < m; i++)
        {
            prev = curr;
            curr = curr.next;
        }

        // `prev` now points to (m-1)'th node
        // `curr` now points to m'th node

        Node start = curr;
        Node end = null;

        // 2. Traverse and reverse the sublist from position `m` to `n`
        for (int i = 1; curr != null && i <= n - m + 1; i++)
        {
            // Take note of the next node
            Node next = curr.next;

            // move the current node onto the `end`
            curr.next = end;
            end = curr;

            // move to the next node
            curr = next;
        }

        /*
            `start` points to the m'th node
            `end` now points to the n'th node
            `curr` now points to the (n+1)'th node
        */

        // 3. Fix the pointers and return the head node
        if (start != null)
        {
            start.next = curr;
            if (prev != null) {
                prev.next = end;
            }
            else {
                head = end;     // when m = 1, `prev` is null
            }
        }

        return head;
    }

    public static void main(String[] args)
    {
        int m = 2, n = 5;

        Node head = null;
        for (int i = 7; i >= 1; i--) {
            head = new Node(i, head);
        }

        printList("Original linked list: ", head);
        head = reverse(head, m, n);
        printList("Reversed linked list: ", head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next

# Utility function to print a linked list
def printList(msg, head):
    print(msg, end=': ')
    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Iteratively reverse a linked list from position `m` to `n`
def reverse(head, m, n):

    # base case
    if m > n:
        return head

    prev = None
    curr = head

    # 1. Skip the first `m` nodes
    i = 1
    while curr is not None and i < m:
        prev = curr
        curr = curr.next
        i = i + 1

    # `prev` now points to (m-1)'th node
    # `curr` now points to m'th node

    start = curr
    end = None

    # 2. Traverse and reverse the sublist from position `m` to `n`
    while curr is not None and i <= n:

        # Take note of the next node
        next = curr.next

        # move the current node onto the `end`
        curr.next = end
        end = curr

        # move to the next node
        curr = next
        i = i + 1

    '''
        `start` points to the m'th node
        `end` now points to the n'th node
        `curr` now points to the (n+1)'th node
    '''

    # 3. Fix the pointers and return the head node

    if start:
        start.next = curr
        if prev is None:        # when m = 1, `prev` is None
            head = end
        else:
            prev.next = end

    return head

if __name__ == '__main__':

    head = None
    for i in reversed(range(7)):
        head = Node(i + 1, head)

    (m, n) = (2, 5)

    printList('Original linked list:', head)
    head = reverse(head, m, n)
    printList('Reversed linked list', head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Exercise** : Write recursive version of above solution.

Also See:

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Reverse every group of `k` nodes in a linked list](https://www.techiedelight.com/reverse-every-k-nodes-of-a-linked-list/ "Reverse every group of `k` nodes in a linked list")

> [Delete every `N` nodes in a linked list after skipping `M` nodes](https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/ "Delete every `N` nodes in a linked list after skipping `M` nodes")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 211

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
