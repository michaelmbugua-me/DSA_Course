# Min Heap and Max Heap Implementation in TypeScript

> Source: https://www.techiedelight.com/min-heap-max-heap-implementation-in-java/

Implement a heap data structure in TypeScript.

**Prerequisite:**

> [Introduction to Priority Queues using Binary Heaps](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/)

In the above post, we have introduced the heap data structure and covered `heapify-up`, `push`, `heapify-down`, and `pop` operations. In this post, TypeScript implementation of Max Heap and Min Heap is discussed.

## 1\. Max Heap implementation in TypeScript

Following is TypeScript implementation of max-heap data structure. We have tried to keep the implementation similar to the [java.util.PriorityQueue](https://docs.oracle.com/javase/7/docs/api/java/util/PriorityQueue.html) class.

```ts
// A class for implementing the priority queue
class PriorityQueue {
    // array to store heap elements
    private A: number[] = [];

    // constructor: set a custom initial capacity for the array
    constructor(capacity: number = 0) {}

    // return parent of `A[i]`
    private parent(i: number): number {
        // if `i` is already a root node
        if (i === 0) {
            return 0;
        }

        return Math.floor((i - 1) / 2);
    }

    // return left child of `A[i]`
    private LEFT(i: number): number {
        return (2*i + 1);
    }

    // return right child of `A[i]`
    private RIGHT(i: number): number {
        return (2*i + 2);
    }

    // swap values at two indexes
    swap(x: number, y: number): void {
        // swap with a child having greater value
        const temp = this.A[x];
        this.A[x] = this.A[y];
        this.A[y] = temp;
    }

    // Recursive heapify-down procedure. Here, the node at index `i`
    // and its two direct children violate the heap property
    private heapify_down(i: number): void {
        // get left and right child of node at index `i`
        const left = this.LEFT(i);
        const right = this.RIGHT(i);

        let largest = i;

        // compare `A[i]` with its left and right child
        // and find the largest value
        if (left < this.size() && this.A[left] > this.A[i]) {
            largest = left;
        }

        if (right < this.size() && this.A[right] > this.A[largest]) {
            largest = right;
        }

        if (largest !== i) {
            // swap with a child having greater value
            this.swap(i, largest);

            // call heapify-down on the child
            this.heapify_down(largest);
        }
    }

    // Recursive heapify-up procedure
    private heapify_up(i: number): void {
        // check if the node at index `i` and its parent violates
        // the heap property
        if (i > 0 && this.A[this.parent(i)] < this.A[i]) {
            // swap the two if heap property is violated
            this.swap(i, this.parent(i));

            // call heapify-up on the parent
            this.heapify_up(this.parent(i));
        }
    }

    // return size of the heap
    public size(): number {
        return this.A.length;
    }

    // check if the heap is empty or not
    public isEmpty(): boolean {
        return this.A.length === 0;
    }

    // insert a specified key into the heap
    public add(key: number): void {
        // insert a new element at the end of the array
        this.A.push(key);

        // get element index and call heapify-up procedure
        const index = this.size() - 1;
        this.heapify_up(index);
    }

    // Function to remove and return an element with the highest priority
    // (present at the root). It returns null if the queue is empty
    public poll(): number | null {
        try {
            // if the heap is empty, throw an exception
            if (this.size() === 0) {
                throw new Error("Index is out of range (Heap underflow)");
            }

            // element with the highest priority
            const root = this.A[0];

            // replace the root of the heap with the last element of the array
            this.A[0] = this.A[this.A.length - 1];
            this.A.pop();

            // call heapify-down on the root node
            this.heapify_down(0);

            // return root element
            return root;
        }
        // catch and print the exception
        catch (ex) {
            console.log((ex as Error).message);
            return null;
        }
    }

    // Function to return an element with the highest priority
    // (present at the root). It returns null if the queue is empty
    public peek(): number | null {
        try {
            // if the heap has no elements, throw an exception
            if (this.size() === 0) {
                throw new Error("Index out of range (Heap underflow)");
            }

            // otherwise, return the top (first) element
            return this.A[0];
        }
        // catch the exception and print it, and return null
        catch (ex) {
            console.log((ex as Error).message);
            return null;
        }
    }

    // Function to remove all elements from the priority queue
    public clear(): void {
        process.stdout.write("Emptying queue: ");
        while (!this.isEmpty()) {
            process.stdout.write(`${this.poll()} `);
        }
        console.log();
    }

    // Returns true if the queue contains the specified element
    public contains(i: number): boolean {
        return this.A.includes(i);
    }

    // Returns an array containing all elements in the queue
    public toArray(): number[] {
        return this.A.slice();
    }
}

(function main() {
    // create a priority queue with an initial capacity of 10.
    // The value of an element decides the priority of it.
    const pq = new PriorityQueue(10);

    // insert three integers
    pq.add(3);
    pq.add(2);
    pq.add(15);

    // print priority queue size
    console.log("Priority queue size is " + pq.size());

    // search 2 in priority queue
    const searchKey = 2;

    if (pq.contains(searchKey)) {
        console.log("Priority queue contains " + searchKey + "\n");
    }

    // empty queue
    pq.clear();

    if (pq.isEmpty()) {
        console.log("The queue is empty");
    }

    console.log("\nCalling remove operation on an empty heap");
    console.log("The element with the highest priority is " + pq.poll());

    console.log("\nCalling peek operation on an empty heap");
    console.log("The element with the highest priority is " + pq.peek() + "\n");

    // again insert three integers
    pq.add(5);
    pq.add(4);
    pq.add(45);

    // construct an array containing all elements present in the queue
    const I = pq.toArray();
    console.log("Printing array: [" + I.join(", ") + "]");

    console.log("\nThe element with the highest priority is " + pq.poll());
    console.log("The element with the highest priority is " + pq.peek());
})();
```

**Output:** Priority queue size is 3 Priority queue contains 2 Emptying queue: 15 3 2 The queue is empty Calling remove operation on an empty heap java.lang.Exception: Index out of range(Heap underflow) The element with the highest priority is null Calling peek operation on an empty heap java.lang.Exception: Index out of range (Heap underflow) The element with the highest priority is null Printing array: [45, 4, 5] The element with the highest priority is 45 The element with the highest priority is 5

## 2\. Min Heap implementation in TypeScript

The min-heap implementation is very similar to the max-heap implementation discussed above. The highlighted portion in the following code marks its differences with max-heap implementation:

```ts
// A class for implementing the Priority queue
class PriorityQueue {
    // array to store heap elements
    private A: number[] = [];

    // constructor: set a custom initial capacity for the array
    constructor(capacity: number = 0) {}

    // return parent of `A[i]`
    private parent(i: number): number {
        // if `i` is already a root node
        if (i === 0) {
            return 0;
        }

        return Math.floor((i - 1) / 2);
    }

    // return left child of `A[i]`
    private LEFT(i: number): number {
        return (2*i + 1);
    }

    // return right child of `A[i]`
    private RIGHT(i: number): number {
        return (2*i + 2);
    }

    // swap values at two indexes
    swap(x: number, y: number): void {
        // swap with a child having lesser value
        const temp = this.A[x];
        this.A[x] = this.A[y];
        this.A[y] = temp;
    }

    // Recursive heapify-down procedure. Here, the node at index `i`
    // and its two direct children violate the heap property
    private heapify_down(i: number): void {
        // get left and right child of node at index `i`
        const left = this.LEFT(i);
        const right = this.RIGHT(i);

        let smallest = i;

        // compare `A[i]` with its left and right child
        // and find the smallest value
        if (left < this.size() && this.A[left] < this.A[i]) {
            smallest = left;
        }

        if (right < this.size() && this.A[right] < this.A[smallest]) {
            smallest = right;
        }

        if (smallest !== i) {
            // swap with a child having lesser value
            this.swap(i, smallest);

            // call heapify-down on the child
            this.heapify_down(smallest);
        }
    }

    // Recursive heapify-up procedure
    private heapify_up(i: number): void {
        // check if the node at index `i` and its parent violates
        // the heap property
        if (i > 0 && this.A[this.parent(i)] > this.A[i]) {
            // swap the two if heap property is violated
            this.swap(i, this.parent(i));

            // call heapify-up on the parent
            this.heapify_up(this.parent(i));
        }
    }

    // return size of the heap
    public size(): number {
        return this.A.length;
    }

    // check if the heap is empty or not
    public isEmpty(): boolean {
        return this.A.length === 0;
    }

    // insert a specified key into the heap
    public add(key: number): void {
        // insert a new element at the end of the array
        this.A.push(key);

        // get its index and call the heapify-up procedure
        const index = this.size() - 1;
        this.heapify_up(index);
    }

    // Function to remove and return an element with the highest priority
    // (present at the root). It returns null if the queue is empty
    public poll(): number | null {
        try {
            // if the heap is empty, throw an exception
            if (this.size() === 0) {
                throw new Error("Index is out of range (Heap underflow)");
            }

            // element with the highest priority
            const root = this.A[0];

            // replace the root of the heap with the last element of the array
            this.A[0] = this.A[this.A.length - 1];
            this.A.pop();

            // call heapify-down on the root node
            this.heapify_down(0);

            // return root element
            return root;
        }
        // catch and print the exception
        catch (ex) {
            console.log((ex as Error).message);
            return null;
        }
    }

    // Function to return an element with the highest priority
    // (present at the root). It returns null if the queue is empty
    public peek(): number | null {
        try {
            // if the heap has no elements, throw an exception
            if (this.size() === 0) {
                throw new Error("Index out of range (Heap underflow)");
            }

            // otherwise, return the top (first) element
            return this.A[0];
        }
        // catch the exception and print it, and return null
        catch (ex) {
            console.log((ex as Error).message);
            return null;
        }
    }

    // Function to remove all elements from the priority queue
    public clear(): void {
        process.stdout.write("Emptying queue: ");
        while (!this.isEmpty()) {
            process.stdout.write(`${this.poll()} `);
        }
        console.log();
    }

    // Returns true if the queue contains the specified element
    public contains(i: number): boolean {
        return this.A.includes(i);
    }

    // Returns an array containing all elements in the queue
    public toArray(): number[] {
        return this.A.slice();
    }
}

(function main() {
    // create a priority queue with an initial capacity of 10.
    // The value of an element decides the priority of it.
    const pq = new PriorityQueue(10);

    // insert three integers
    pq.add(3);
    pq.add(2);
    pq.add(15);

    // print priority queue size
    console.log("Priority queue size is " + pq.size());

    // search 2 in priority queue
    const searchKey = 2;

    if (pq.contains(searchKey)) {
        console.log("Priority queue contains " + searchKey + "\n");
    }

    // empty queue
    pq.clear();

    if (pq.isEmpty()) {
        console.log("The queue is empty");
    }

    console.log("\nCalling remove operation on an empty heap");
    console.log("The element with the highest priority is " + pq.poll());

    console.log("\nCalling peek operation on an empty heap");
    console.log("The element with the highest priority is " + pq.peek() + "\n");

    // again insert three integers
    pq.add(5);
    pq.add(4);
    pq.add(45);

    // construct an array containing all elements present in the queue
    const I = pq.toArray();
    console.log("Printing array: [" + I.join(", ") + "]");

    console.log("\nThe element with the highest priority is " + pq.poll());
    console.log("The element with the highest priority is " + pq.peek());
})();
```

**Output:** Priority queue size is 3 Priority queue contains 2 Emptying queue: 2 3 15 The queue is empty Calling remove operation on an empty heap java.lang.Exception: Index out of range(Heap underflow) The element with the highest priority is null Calling peek operation on an empty heap java.lang.Exception: Index out of range (Heap underflow) The element with the highest priority is null Printing array: [4, 5, 45] The element with the highest priority is 4 The element with the highest priority is 5

Following is the time complexity of implemented heap operations:

  1. `add()` and `poll()` takes O(log(n)) time.
  2. `toArray()` and `contains()` takes O(n) time.
  3. `peek()` and `size()` and `isEmpty()` takes O(1) time.

**Also See:**

> [Min Heap and Max Heap Implementation in C++](https://techiedelight.com/min-heap-max-heap-implementation-c/)

**Exercise:** Implement Heap in TypeScript using a plain array instead of a dynamically resizing array.

**References:** <https://en.wikipedia.org/wiki/Heap_(data_structure)>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 65

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
