# Queue Implementation in Java

> Source: https://www.techiedelight.com/queue-implementation-in-java/

This article covers queue implementation in Java. A queue is a linear data structure that follows the FIFO (First–In, First–Out) principle. That means the object inserted first will be the first one out, followed by the object inserted next.

The queue supports the following core operations:

  1. Enqueue: Inserts an item at the rear of the queue.
  2. Dequeue: Removes the object from the front of the queue and returns it, thereby decrementing queue size by one.
  3. Peek: Returns the object at the front of the queue without removing it.
  4. IsEmpty: Tests if the queue is empty or not.
  5. Size: Returns the total number of elements present in the queue.

> 

Queue Implementation using an array:

```

// A class to represent a queue
class Queue
{
    private int[] arr;      // array to store queue elements
    private int front;      // front points to the front element in the queue
    private int rear;       // rear points to the last element in the queue
    private int capacity;   // maximum capacity of the queue
    private int count;      // current size of the queue

    // Constructor to initialize a queue
    Queue(int size)
    {
        arr = new int[size];
        capacity = size;
        front = 0;
        rear = -1;
        count = 0;
    }

    // Utility function to dequeue the front element
    public int dequeue()
    {
        // check for queue underflow
        if (isEmpty())
        {
            System.out.println("Underflow\nProgram Terminated");
            System.exit(-1);
        }

        int x = arr[front];

        System.out.println("Removing " + x);

        front = (front + 1) % capacity;
        count--;

        return x;
    }

    // Utility function to add an item to the queue
    public void enqueue(int item)
    {
        // check for queue overflow
        if (isFull())
        {
            System.out.println("Overflow\nProgram Terminated");
            System.exit(-1);
        }

        System.out.println("Inserting " + item);

        rear = (rear + 1) % capacity;
        arr[rear] = item;
        count++;
    }

    // Utility function to return the front element of the queue
    public int peek()
    {
        if (isEmpty())
        {
            System.out.println("Underflow\nProgram Terminated");
            System.exit(-1);
        }
        return arr[front];
    }

    // Utility function to return the size of the queue
    public int size() {
        return count;
    }

    // Utility function to check if the queue is empty or not
    public boolean isEmpty() {
        return (size() == 0);
    }

    // Utility function to check if the queue is full or not
    public boolean isFull() {
        return (size() == capacity);
    }
}

class Main
{
    public static void main (String[] args)
    {
        // create a queue of capacity 5
        Queue q = new Queue(5);

        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);

        System.out.println("The front element is " + q.peek());
        q.dequeue();
        System.out.println("The front element is " + q.peek());

        System.out.println("The queue size is " + q.size());

        q.dequeue();
        q.dequeue();

        if (q.isEmpty()) {
            System.out.println("The queue is empty");
        }
        else {
            System.out.println("The queue is not empty");
        }
    }
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The front element is 1 Removing 1 The front element is 2 The queue size is 2 Removing 2 Removing 3 The queue is empty

The time complexity of `enqueue()`, `dequeue()`, `peek()`, `isEmpty()` and `size()` functions is constant, i.e., O(1).

Using `Queue` Interface:

Java’s library also contains [Queue](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html) interface that specifies queue operations. Following is an example of the `Queue` interface using the `LinkedList` class:

```
import java.util.LinkedList;
import java.util.Queue;

class Main
{
    public static void main(String[] args)
    {
        Queue<String> queue = new LinkedList<String>();

        queue.add("A");     // Insert `A` into the queue
        queue.add("B");     // Insert `B` into the queue
        queue.add("C");     // Insert `C` into the queue
        queue.add("D");     // Insert `D` into the queue

        // Prints the front of the queue (`A`)
        System.out.println("The front element is " + queue.peek());

        queue.remove();     // removing the front element (`A`)
        queue.remove();     // removing the front element (`B`)

        // Prints the front of the queue (`C`)
        System.out.println("The front element is " + queue.peek());

        // Returns the total number of elements present in the queue
        System.out.println("The queue size is " + queue.size());

        // check if the queue is empty
        if (queue.isEmpty()) {
            System.out.println("The queue is empty");
        }
        else {
            System.out.println("The queue is not empty");
        }
    }
}
```

**Output:** The front element is A The front element is C The queue size is 2 The queue is not empty

**Also See:**

> [Circular Queue implementation in C](https://techiedelight.com/circular-queue-implementation-c/)

> [Queue Implementation in C++](https://techiedelight.com/queue-implementation-cpp/)

> [Queue Implementation in Python](https://techiedelight.com/queue-implementation-python/)

> [Queue Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/queue-implementation-using-linked-list/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 189

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
