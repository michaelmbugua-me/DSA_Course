# Linked List Implementation in Java

> Source: https://www.techiedelight.com/linked-list-implementation-java/

We know that the `LinkedList` class in Java is a doubly-linked list implementation of the `List` interface. This post provides an overview of common techniques to implement a linked list in Java programming language.

We know that each node of a linked list contains a single data field and a reference to the next node in the list. The nodes of the linked list are allocated in the heap memory during runtime by the JVM. We can use the constructor of the `Node` class to initialize the `data` field and the `next` pointer.

```
// A Linked List Node
class Node
{
    int data;
    Node next;

    // constructor
    Node(int data, Node next)
    {
        this.data = data;
        this.next = next;
    }
}
```

> 

There are several methods to construct a singly linked list in Java:

## 1\. Naive method

A simple solution would be to allocate memory for all individual nodes of the linked list, set their data, and rearrange their references to build the complete list.

```
// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }

        System.out.println("null");
    }

    // Naive function for linked list implementation containing three nodes
    public static Node constructList()
    {
        // construct linked list nodes
        Node first = new Node(1);
        Node second = new Node(2);
        Node third = new Node(3);
        Node fourth = new Node(4);

        // rearrange the references to construct a list
        Node head = first;
        first.next = second;
        second.next = third;
        third.next = fourth;

        // return reference to the first node in the list
        return head;
    }

    public static void main(String[] args)
    {
        // `head` points to the head node of the linked list
        Node head = constructList();

        // print linked list
        printList(head);
    }
}
```

We can write the above code in a single line by passing the next node as an argument to the `Node` constructor:

```
// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int data, Node next_node)
    {
        // Set data
        this.data = data;

        // set the next field to point to a given node of the list
        this.next = next_node;
    }
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }

        System.out.println("null");
    }

    // Naive function for linked list implementation containing three nodes
    public static Node constructList()
    {
        Node head = new Node(1, new Node(2, new Node(3, null)));
        return head;
    }

    public static void main(String[] args)
    {
        // `head` points to the head node of the linked list
        Node head = constructList();

        // print linked list
        printList(head);
    }
}
```

## 2\. Return Head Node

The standard solution adds a single node to the head end of any list. This function is called `push()` since we are adding the link to the head end, making a list look a bit like a stack.

This is demonstrated below, where we return the head node from the `push()` function and update the head in the caller.

```
// A Linked List Node
class Node
{
    int data;
    Node next;
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }
        System.out.println("null");
    }

    public static Node push(Node head, int data)
    {
        // allocate a new node in a heap and set its data
        Node newNode = new Node();
        newNode.data = data;

        // set the next field of the new node to point to the current
        // first node of the list.

        newNode.next = head;

        // change the head to point to the new node, so it is
        // now the first node in the list.

        return newNode;
    }

    // Function for linked list implementation from the given set of keys
    public static Node constructList(int[] keys)
    {
        Node head = null;

        // start from the end of the array
        for (int i = keys.length - 1; i >= 0; i--) {
            head = push(head, keys[i]);
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4 };

        // points to the head node of the linked list
        Node head = constructList(keys);

        // print linked list
        printList(head);
    }
}
```

## 3\. Make head reference global

We can construct a linked list by making the head reference global, but this approach is not recommended since [global variables](https://en.wikipedia.org/wiki/Global_variable) are usually considered bad practice.

```
// A Linked List Node
class Node
{
    int data;
    Node next;
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }
        System.out.println("null");
    }

    // global head
    public static Node head;

    // Takes a list and a data value, creates a new link with the given
    // data and pushes it onto the list's front.
    public static Node push(int data)
    {
        // allocate a new node in a heap and set its data
        Node newNode = new Node();
        newNode.data = data;

        // set the next field of the new node to point to the current
        // head node of the list.
        newNode.next = head;

        // change the head to point to the new node, so it is
        // now the first node in the list.

        return newNode;
    }

    // Function for linked list implementation from the given set of keys
    public static void constructList(int[] keys)
    {
        // start from the end of the array
        for (int i = keys.length - 1; i >= 0; i--) {
            head = push(keys[i]);
        }
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4 };

        // points to the head node of the linked list
        constructList(keys);

        // print linked list
        printList(head);
    }
}
```

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

> [Linked List Implementation in C++](https://techiedelight.com/linked-list-implementation-cpp/)

> [Linked List Implementation in Python](https://techiedelight.com/linked-list-implementation-python/)

**References:** <http://cslibrary.stanford.edu/103/LinkedListBasics.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
