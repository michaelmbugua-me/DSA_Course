# External Merge Sort Algorithm

> Source: https://www.techiedelight.com/external-merge-sort/

The external merge sort algorithm is used to efficiently sort massive amounts of data when the data being sorted cannot be fit into the main memory (usually RAM) and resides in the slower external memory (usually a HDD).

External merge sort uses a hybrid sort-merge technique. The chunks of data small enough to fit in the RAM are read, sorted, and written out to a temporary file during the sorting phase. In the merge phase, the sorted sub-files are combined into a single larger file.

In other words, external merge sort sorts the chunks of data that fits in the main memory, then merges the sorted chunks, i.e.,

  1. First, divide the file into runs such that the size of a run is small enough to fit into the main memory.
  2. Next, sort each run in main memory using the standard [merge sort sorting algorithm](https://techiedelight.com/merge-sort/).
  3. Finally, [merge the resulting runs](https://techiedelight.com/merge-m-sorted-lists-variable-length/) into successively bigger runs until the file is sorted.

Following is the TypeScript code to demonstrate the external merge sort algorithm:

```ts
import * as fs from 'fs';

// A class to store a heap node
class MinHeapNode
{
    // element to be stored
    element: number;

    // array index from which the element is taken
    i: number;

    constructor(element: number, i: number) {
        this.element = element;
        this.i = i;
    }
}

// Comparison function to be used to order the heap
const comp = (lhs: MinHeapNode, rhs: MinHeapNode): boolean => lhs.element > rhs.element;

// min-heap assumed (JS has no builtin heap) — a tiny array-based min-heap
class MinHeap
{
    private data: MinHeapNode[] = [];

    top(): MinHeapNode {
        return this.data[0];
    }

    pop(): MinHeapNode {
        const min = this.data[0];
        const last = this.data.pop();
        if (last === undefined) {
            return min;
        }
        if (this.data.length > 0) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const left = 2 * i + 1;
                const right = left + 1;
                let smallest = i;
                if (left < this.data.length && comp(this.data[left], this.data[smallest])) {
                    smallest = left;
                }
                if (right < this.data.length && comp(this.data[right], this.data[smallest])) {
                    smallest = right;
                }
                if (smallest === i) {
                    break;
                }
                [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                i = smallest;
            }
        }
        return min;
    }

    push(node: MinHeapNode): void {
        this.data.push(node);
        let i = this.data.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (comp(this.data[i], this.data[parent])) {
                [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
                i = parent;
            }
            else {
                break;
            }
        }
    }
}

// Read all integers from a file (mimics repeated `fscanf` of "%d ")
function readNumbers(fileName: string): number[] {
    return fs.readFileSync(fileName, 'utf8')
        .split(/\s+/)
        .filter((s: string) => s.length > 0)
        .map(Number);
}

// Merges `k` sorted files. Names of files are assumed to be 1, 2, … `k`
function mergeFiles(output_file: string, n: number, k: number): void
{
    const inData: number[][] = [];
    const inPos: number[] = [];
    for (let i = 0; i < k; i++)
    {
        // open output files in reading mode
        inData.push(readNumbers(String(i)));
        inPos.push(0);
    }

    // FINAL OUTPUT FILE
    const outLines: string[] = [];

    // Create a min-heap with `k` heap nodes. Every heap node has the first
    // element of the scratch output file
    const harr: MinHeapNode[] = [];
    const pq = new MinHeap();

    let i;
    for (i = 0; i < k; i++)
    {
        // break if no output file is empty and
        // index `i` will be a number of input files
        if (inPos[i] === inData[i].length) {
            break;
        }

        // index of the scratch output file
        harr.push(new MinHeapNode(inData[i][inPos[i]], i));
        inPos[i]++;
        pq.push(harr[i]);
    }

    let count = 0;

    // One by one, get the minimum element from the min-heap and replace
    // it with the next element. Run till all filled input files reach EOF.
    while (count !== i)
    {
        // Get the minimum element and store it in the output file
        const root = pq.pop();
        outLines.push(String(root.element));

        // Find the next element that should replace the current root of the heap.
        // The next element belongs to the same input file as the current
        // minimum element.
        if (inPos[root.i] === inData[root.i].length)
        {
            root.element = Number.MAX_SAFE_INTEGER;
            count++;
        }
        else {
            root.element = inData[root.i][inPos[root.i]++];
        }

        // Replace the root with the next element of the input file
        pq.push(root);
    }

    // write the final output file
    fs.writeFileSync(output_file, outLines.join(' '));
}

// Using a merge sort algorithm, create the initial runs and divide them
// evenly among the output files
function createInitialRuns(input_file: string, run_size: number, num_ways: number): void
{
    // For big input file
    const inData = readNumbers(input_file);
    let inPos = 0;

    // output scratch files
    const out: number[][] = [];
    for (let i = 0; i < num_ways; i++) {
        out.push([]);
    }

    let more_input = true;
    let next_output_file = 0;

    let i;
    while (more_input)
    {
        // allocate an array large enough to accommodate runs of
        // size `run_size`
        const arr: number[] = [];

        // write `run_size` elements into `arr` from the input file
        for (i = 0; i < run_size; i++)
        {
            if (inPos === inData.length)
            {
                more_input = false;
                break;
            }

            arr.push(inData[inPos++]);
        }

        // sort the array using merge sort
        arr.sort((a, b) => a - b);

        // write the records to the appropriate scratch output file
        // can't assume that the loop runs to `run_size`
        // since the last run's length may be less than `run_size`
        for (let j = 0; j < arr.length; j++) {
            out[next_output_file].push(arr[j]);
        }

        next_output_file++;
    }

    // write the scratch output files to disk
    for (let i = 0; i < num_ways; i++) {
        fs.writeFileSync(String(i), out[i].join(' '));
    }
}

// Program to demonstrate external sorting

// number of partitions of the input file
const num_ways = 10;

// the size of each partition
const run_size = 1000;

const input_file = 'input.txt';
const output_file = 'output.txt';

// generate input
const input: string[] = [];
for (let i = 0; i < num_ways * run_size; i++) {
    input.push(String(Math.floor(Math.random() * 32768)));
}
fs.writeFileSync(input_file, input.join(' '));

// Read the input file, create the initial runs,
// and assign the runs to the scratch output files
createInitialRuns(input_file, run_size, num_ways);

// Merge the runs using the k–way merging
mergeFiles(output_file, run_size, num_ways);
```

Please note that this code doesn’t work on online compilers as it requires file creation permissions. When run locally, it will produce a sample input file “input.txt” with 10000 random numbers. It sorts the numbers and puts the sorted numbers in a file “output.txt.” It also generates files with names 1, 2, … to store sorted runs.

**Author:** Aditya Goel

**References:** <https://en.wikipedia.org/wiki/External_sorting>

Also See:

> [Merge Sort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/merge-sort/ "Merge Sort Algorithm – C++, Java, and Python Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.61/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
