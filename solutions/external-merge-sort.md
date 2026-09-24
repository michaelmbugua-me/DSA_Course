# External Merge Sort Algorithm

> Source: https://www.techiedelight.com/external-merge-sort/

The external merge sort algorithm is used to efficiently sort massive amounts of data when the data being sorted cannot be fit into the main memory (usually RAM) and resides in the slower external memory (usually a HDD).

External merge sort uses a hybrid sort-merge technique. The chunks of data small enough to fit in the RAM are read, sorted, and written out to a temporary file during the sorting phase. In the merge phase, the sorted sub-files are combined into a single larger file.

In other words, external merge sort sorts the chunks of data that fits in the main memory, then merges the sorted chunks, i.e.,

  1. First, divide the file into runs such that the size of a run is small enough to fit into the main memory.
  2. Next, sort each run in main memory using the standard [merge sort sorting algorithm](https://techiedelight.com/merge-sort/).
  3. Finally, [merge the resulting runs](https://techiedelight.com/merge-m-sorted-lists-variable-length/) into successively bigger runs until the file is sorted.

Following is the C++ code to demonstrate the external merge sort algorithm:

```
#include <iostream>
#include <algorithm>
#include <queue>
#include <limits>
using namespace std;

struct MinHeapNode
{
    // element to be stored
    int element;

    // array index from which the element is taken
    int i;
};

// Comparison object to be used to order the heap
struct comp
{
    bool operator()(const MinHeapNode &lhs, const MinHeapNode &rhs) const {
        return lhs.element > rhs.element;
    }
};

FILE* openFile(char* fileName, char* mode)
{
    FILE* fp = fopen(fileName, mode);
    if (fp == NULL)
    {
        perror("Error while opening the file.\n");
        exit(EXIT_FAILURE);
    }
    return fp;
}

// Merges `k` sorted files. Names of files are assumed to be 1, 2, … `k`
void mergeFiles(char *output_file, int n, int k)
{
    FILE* in[k];
    for (int i = 0; i < k; i++)
    {
        char fileName[2];

        // convert `i` to a string
        snprintf(fileName, sizeof(fileName), "%d", i);

        // open output files in reading mode
        in[i] = openFile(fileName, "r");
    }

    // FINAL OUTPUT FILE
    FILE *out = openFile(output_file, "w");

    // Create a min-heap with `k` heap nodes. Every heap node has the first
    // element of the scratch output file
    MinHeapNode harr[k];
    priority_queue<MinHeapNode, vector<MinHeapNode>, comp> pq;

    int i;
    for (i = 0; i < k; i++)
    {
        // break if no output file is empty and
        // index `i` will be a number of input files
        if (fscanf(in[i], "%d ", &harr[i].element) != 1) {
            break;
        }

        // index of the scratch output file
        harr[i].i = i;
        pq.push(harr[i]);
    }

    int count = 0;

    // One by one, get the minimum element from the min-heap and replace
    // it with the next element. Run till all filled input files reach EOF.
    while (count != i)
    {
        // Get the minimum element and store it in the output file
        MinHeapNode root = pq.top();
        pq.pop();
        fprintf(out, "%d ", root.element);

        // Find the next element that should replace the current root of the heap.
        // The next element belongs to the same input file as the current
        // minimum element.
        if (fscanf(in[root.i], "%d ", &root.element) != 1 )
        {
            root.element = numeric_limits<int>::max();
            count++;
        }

        // Replace the root with the next element of the input file
        pq.push(root);
    }

    // close the input and output files
    for (int i = 0; i < k; i++) {
        fclose(in[i]);
    }

    fclose(out);
}

// Using a merge sort algorithm, create the initial runs and divide them
// evenly among the output files
void createInitialRuns(char *input_file, int run_size, int num_ways)
{
    // For big input file
    FILE *in = openFile(input_file, "r");

    // output scratch files
    FILE* out[num_ways];
    char fileName[2];
    for (int i = 0; i < num_ways; i++)
    {
        // convert `i` to a string
        snprintf(fileName, sizeof(fileName), "%d", i);

        // Open output files in write mode.
        out[i] = openFile(fileName, "w");
    }

    // allocate a dynamic array large enough to accommodate runs of
    // size `run_size`
    int* arr = new int[run_size];

    bool more_input = true;
    int next_output_file = 0;

    int i;
    while (more_input)
    {
        // write `run_size` elements into `arr` from the input file
        for (i = 0; i < run_size; i++)
        {
            if (fscanf(in, "%d ", &arr[i]) != 1)
            {
                more_input = false;
                break;
            }
        }

        // sort the array using merge sort
        sort(arr, arr + i);

        // write the records to the appropriate scratch output file
        // can't assume that the loop runs to `run_size`
        // since the last run's length may be less than `run_size`
        for (int j = 0; j < i; j++) {
            fprintf(out[next_output_file], "%d ", arr[j]);
        }

        next_output_file++;
    }

    // deallocate memory
    delete arr;

    // close the input and output files
    for (int i = 0; i < num_ways; i++) {
        fclose(out[i]);
    }

    fclose(in);
}

// Program to demonstrate external sorting
int main()
{
    // number of partitions of the input file
    int num_ways = 10;

    // the size of each partition
    int run_size = 1000;

    char input_file[] = "input.txt";
    char output_file[] = "output.txt";

    FILE* in = openFile(input_file, "w");

    srand(time(NULL));

    // generate input
    for (int i = 0; i < num_ways * run_size; i++) {
        fprintf(in, "%d ", rand());
    }

    fclose(in);

    // Read the input file, create the initial runs,
    // and assign the runs to the scratch output files
    createInitialRuns(input_file, run_size, num_ways);

    // Merge the runs using the k–way merging
    mergeFiles(output_file, run_size, num_ways);

    return 0;
}
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
