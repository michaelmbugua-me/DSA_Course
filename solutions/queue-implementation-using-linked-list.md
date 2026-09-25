# Queue Implementation using a Linked List – C, Java, and Python

> Source: https://www.techiedelight.com/queue-implementation-using-linked-list/

A queue is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a collection of elements, with three main operations: enqueue, dequeue and peek. We have discussed these operations in the [previous post](https://techiedelight.com/circular-queue-implementation-c/) and covered an array implementation of a queue data structure. In this post, the [linked list](https://techiedelight.com/introduction-linked-lists/) implementation of a queue is discussed.

> 

A queue can be easily implemented using a linked list. In singly linked list implementation, enqueuing happens at the tail of the list, and the dequeuing of items happens at the head of the list. We need to maintain a pointer to the last node to keep O(1) efficiency for insertion.

Since a doubly linked list offers O(1) insertion and deletion at both ends, use it if we want to enqueue to happen at the beginning and dequeuing to occur at the tail of the linked list.

Following is the implementation of the queue using a linked list in TypeScript:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;

    constructor(data: number, next: Node | null = null) {
        // set data in the allocated node and return it
        this.data = data;
        this.next = next;
    }
}

class Queue {
    private rear: Node | null = null;
    private front: Node | null = null;
    private count = 0;

    // Utility function to dequeue the front element
    dequeue(): number {          // delete at the beginning
        const temp = this.front;
        if (temp === null) {
            console.log('Queue Underflow');
            process.exit(-1);
            return 0;
        }
        console.log('Removing…', temp.data);

        // advance front to the next node
        this.front = temp.next;

        // if the list becomes empty
        if (this.front === null) {
            this.rear = null;
        }

        // decrease the node's count by 1
        this.count -= 1;

        // return the removed item
        return temp.data;
    }

    // Utility function to add an item to the queue
    enqueue(item: number): void {    // insertion at the end
        // allocate the node in a heap
        const node = new Node(item);
        console.log('Inserting…', item);

        // special case: queue was empty
        if (this.front === null) {
            // initialize both front and rear
            this.front = node;
            this.rear = node;
        }
        else {
            // update rear
            if (this.rear !== null) {
                this.rear.next = node;
                this.rear = node;
            }
        }

        // increase the node's count by 1
        this.count += 1;
    }

    // Utility function to return the top element in a queue
    peek(): number {
        // check for an empty queue
        if (this.front) {
            return this.front.data;
        }
        else {
            process.exit(-1);
            return 0;
        }
    }

    // Utility function to check if the queue is empty or not
    isEmpty(): boolean {
        return this.rear === null && this.front === null;
    }

    // Function to return the size of the queue
    size(): number {
        return this.count;
    }
}

const q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);

console.log('The front element is', q.peek());

q.dequeue();
q.dequeue();
q.dequeue();
q.dequeue();

if (q.isEmpty()) {
    console.log('The queue is empty');
}
else {
    console.log('The queue is not empty');
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 Inserting 4 The front element is 1 Removing 1 Removing 2 Removing 3 Removing 4 The queue is empty

The advantage of using linked lists over arrays is that it is possible to implement a queue that can grow or shrink as much as needed. Since each new node will be dynamically allocated, overflow is not possible unless heap memory is exhausted. Using a static array will restrict the array’s maximum capacity, which can lead to queue overflow.

Also See:

> [Queue Implementation using Templates in C++](https://www.techiedelight.com/queue-implementation-using-templates-cpp/ "Queue Implementation using Templates in C++")

> [Queue Implementation in Java](https://www.techiedelight.com/queue-implementation-in-java/ "Queue Implementation in Java")

> [Queue Implementation in Python](https://www.techiedelight.com/queue-implementation-python/ "Queue Implementation in Python")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 223

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
