# Linked List Implementation in Python

> Source: https://www.techiedelight.com/linked-list-implementation-python/

This post provides an overview of several methods to implement a linked list in Python.

A Linked List node consists of a data field and a reference to the next node in the list. We can use a constructor to initialize the data and the next field for a node allocated in the memory during runtime.

```
# A Linked List Node
class Node:
    def __init__(self, data=None, next=None):
        # Set data
        self.data = data

        # set the next field to point to a given node of the list
        self.next = next
```

> 

There are several ways to construct a singly linked list in Python:

## 1\. Standard Solution

The standard solution adds a single node to the `head` end of the list, making a list look a bit like a stack.

This is demonstrated below where the head node is updated in the caller.

```
# A Linked List Node
class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next

# Function to print a given linked list
def printList(head):
    ptr = head
    while ptr is not None:
        print(ptr.data, end=' —> ')
        ptr = ptr.next

    print('None')

# Function to construct a linked list from a given set of keys
def construct(keys):
    head = None

    # start from the end of the list
    for i in reversed(range(len(keys))):
        # allocate a new node in a heap and set its data
        head = Node(keys[i], head)

    return head

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 4]

    # points to the head node of the linked list
    head = construct(keys)

    # print linked list
    printList(head)
```

## 2\. Naive method

A simple solution would be to allocate memory for all individual nodes of the linked list, set their data, and rearrange their references to build the complete list.

Here’s what the code would look like:

```
# A Linked List Node
class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next

# Function to print a given linked list
def printList(head):
    ptr = head
    while ptr is not None:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Naive function for linked list implementation containing three nodes
def construct():

    # construct individual linked list nodes
    first = Node(1)
    second = Node(2)
    third = Node(3)
    fourth = Node(4)

    # rearrange the references to construct a list
    head = first
    first.next = second
    second.next = third
    third.next = fourth

    # return first node in the list
    return head

if __name__ == '__main__':

    # `head` points to the head node of the linked list
    head = construct()

    # print linked list
    printList(head)
```

We can write the above code in a single line by passing the next node as an argument to the `Node` constructor:

```
# A Linked List Node
class Node:
    def __init__(self, data, next_node):
        self.data = data
        self.next = next_node

# Function to print a given linked list
def printList(head):
    ptr = head
    while ptr is not None:
        print(ptr.data, end=' —> ')
        ptr = ptr.next

    print('None')

# Function for linked list implementation containing four nodes
def construct():
    return Node(1, Node(2, Node(3, Node(4, None))))

if __name__ == '__main__':

    # `head` points to the head node of the linked list
    head = construct()

    # print linked list
    printList(head)
```

**References:** <http://cslibrary.stanford.edu/103/LinkedListBasics.pdf>

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

> [Linked List Implementation in C++](https://techiedelight.com/linked-list-implementation-cpp/)

> [Linked List Implementation in Java](https://techiedelight.com/linked-list-implementation-java/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
