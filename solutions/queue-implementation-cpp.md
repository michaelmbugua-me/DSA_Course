# Queue Implementation in C++

> Source: https://www.techiedelight.com/queue-implementation-cpp/

A queue is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure) that serves as a container of objects that are inserted and removed according to the FIFO (First–In, First–Out) principle.

Queue has three main operations: `enqueue`, `dequeue`, and `peek`. We have already covered these operations and C implementation of queue data structure using an [array](https://techiedelight.com/circular-queue-implementation-c/) and [linked list](https://techiedelight.com/queue-implementation-using-linked-list/). In this post, we will cover queue implementation in C++ using class and STL.

The following queue implementation in C++ covers the following operations:

  * Enqueue: Inserts a new element at the rear of the queue.
  * Dequeue: Removes the front element of the queue and returns it.
  * Peek: Returns the front element present in the queue without dequeuing it.
  * IsEmpty: Checks if the queue is empty.
  * IsFull: Checks if the queue is full.
  * Size: Returns the total number of elements present in the queue.

> 

Queue Implementation using an array:

```
#include <iostream>
#include <cstdlib>
using namespace std;

// Define the default capacity of a queue
#define SIZE 1000

// A class to store a queue
class Queue
{
    int *arr;       // array to store queue elements
    int capacity;   // maximum capacity of the queue
    int front;      // front points to the front element in the queue (if any)
    int rear;       // rear points to the last element in the queue
    int count;      // current size of the queue

public:
    Queue(int size = SIZE);     // constructor
    ~Queue();                   // destructor

    int dequeue();
    void enqueue(int x);
    int peek();
    int size();
    bool isEmpty();
    bool isFull();
};

// Constructor to initialize a queue
Queue::Queue(int size)
{
    arr = new int[size];
    capacity = size;
    front = 0;
    rear = -1;
    count = 0;
}

// Destructor to free memory allocated to the queue
Queue::~Queue() {
    delete[] arr;
}

// Utility function to dequeue the front element
int Queue::dequeue()
{
    // check for queue underflow
    if (isEmpty())
    {
        cout << "Underflow\nProgram Terminated\n";
        exit(EXIT_FAILURE);
    }

    int x = arr[front];
    cout << "Removing " << x << endl;

    front = (front + 1) % capacity;
    count--;

    return x;
}

// Utility function to add an item to the queue
void Queue::enqueue(int item)
{
    // check for queue overflow
    if (isFull())
    {
        cout << "Overflow\nProgram Terminated\n";
        exit(EXIT_FAILURE);
    }

    cout << "Inserting " << item << endl;

    rear = (rear + 1) % capacity;
    arr[rear] = item;
    count++;
}

// Utility function to return the front element of the queue
int Queue::peek()
{
    if (isEmpty())
    {
        cout << "Underflow\nProgram Terminated\n";
        exit(EXIT_FAILURE);
    }
    return arr[front];
}

// Utility function to return the size of the queue
int Queue::size() {
    return count;
}

// Utility function to check if the queue is empty or not
bool Queue::isEmpty() {
    return (size() == 0);
}

// Utility function to check if the queue is full or not
bool Queue::isFull() {
    return (size() == capacity);
}

int main()
{
    // create a queue of capacity 5
    Queue q(5);

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    cout << "The front element is " << q.peek() << endl;
    q.dequeue();

    q.enqueue(4);

    cout << "The queue size is " << q.size() << endl;

    q.dequeue();
    q.dequeue();
    q.dequeue();

    if (q.isEmpty()) {
        cout << "The queue is empty\n";
    }
    else {
        cout << "The queue is not empty\n";
    }

    return 0;
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The front element is 1 Removing 1 Inserting 4 The queue size is 3 Removing 2 Removing 3 Removing 4 The queue is empty

The time complexity of all the above queue operations is O(1).

Using `std::queue`:

C++’s STL provides a [std::queue](https://cplusplus.com/reference/list/list/) template class which is restricted to only enqueue/dequeue operations. It also provides [std::list](https://cplusplus.com/reference/queue/queue/) which has `push_back` and `pop_front` operations with LIFO semantics. Java’s library contains [Queue](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html) interface that specifies queue operations.

```std::queue
#include <iostream>
#include <queue>
using namespace std;

// Queue implementation in C++ using `std::queue`
int main()
{
    queue<string> q;

    q.push("A");        // Insert `A` into the queue
    q.push("B");        // Insert `B` into the queue
    q.push("C");        // Insert `C` into the queue
    q.push("D");        // Insert `D` into the queue

    // Returns the total number of elements present in the queue
    cout << "The queue size is " << q.size() << endl;

    // Prints the front of the queue (`A`)
    cout << "The front element is " << q.front() << endl;

    // Prints the rear of the queue (`D`)
    cout << "The rear element is " << q.back() << endl;

    q.pop();            // removing the front element (`A`)
    q.pop();            // removing the next front element (`B`)

    cout << "The queue size is " << q.size() << endl;

    // check if the queue is empty
    if (q.empty()) {
        cout << "The queue is empty\n";
    }
    else {
        cout << "The queue is not empty\n";
    }

    return 0;
}
```

##

```std::list
#include <iostream>
#include <list>
using namespace std;

// Queue implementation in C++ using `std::list`
int main()
{
    list<string> q;

    q.push_back("A");        // Insert `A` into the queue
    q.push_back("B");        // Insert `B` into the queue
    q.push_back("C");        // Insert `C` into the queue
    q.push_back("D");        // Insert `D` into the queue

    // Returns the total number of elements present in the queue
    cout << "The queue size is " << q.size() << endl;

    // Prints the front of the queue (`A`)
    cout << "The front element is " << q.front() << endl;

    // Prints the rear of the queue (`D`)
    cout << "The rear element is " << q.back() << endl;

    q.pop_front();          // removing the front element (`A`)
    q.pop_front();          // removing the next front element (`B`)

    cout << "The queue size is " << q.size() << endl;

    // check if the queue is empty
    if (q.empty()) {
        cout << "The queue is empty\n";
    }
    else {
        cout << "The queue is not empty\n";
    }

    return 0;
}
```

**Output:** The queue size is 4 The front element is A The rear element is D The queue size is 2 The queue is not empty

**Also See:**

> [Queue Implementation in Java](https://techiedelight.com/queue-implementation-in-java/)

> [Queue Implementation in Python](https://techiedelight.com/queue-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
