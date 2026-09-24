# Find minimum platforms needed to avoid delay in the train arrival

> Source: https://www.techiedelight.com/minimum-number-of-platforms-needed-avoid-delay-arrival-train/

Given a schedule containing the arrival and departure time of trains in a station, find the minimum number of platforms needed to avoid delay in any train’s arrival.

For example,

Trains arrival = { 2.00, 2.10, 3.00, 3.20, 3.50, 5.00 } Trains departure = { 2.30, 3.40, 3.20, 4.30, 4.00, 5.20 } The minimum platforms needed is 2 The train arrived at 2.00 on platform 1 The train arrived at 2.10 on platform 2 The train departed at 2.30 from platform 1 The train arrived at 3.00 on platform 1 The train departed at **3.20** from platform 1 The train arrived at **3.20** on platform 1 The train departed at 3.40 from platform 2 The train arrived at 3.50 on platform 2 The train departed at 4.00 from platform 2 The train departed at 4.30 from platform 1 The train arrived at 5.00 on platform 1 The train departed at 5.20 from platform 1

> 

The idea is to merge the arrival and departure times of trains and consider them in sorted order. Maintain a counter to count the total number of trains present at the station at any point. The counter also represents the total number of platforms needed at that time.

  * If the train is scheduled to arrive next, increase the counter by one and update the minimum platforms needed if the count is more than the minimum platforms needed so far.
  * If the train is scheduled to depart next, decrease the counter by 1.

One special case needs to be handled – when two trains are scheduled to arrive and depart simultaneously, depart the train first.

The algorithm can be implemented as follows in C++, Java, and Python. Instead of actually merging the arrival and departure of trains and sorting them, we have [sorted the arrival and departure of trains](https://techiedelight.com/sort-vector-custom-objects-cpp/) and followed logic similar to the [merging of two sorted arrays](https://techiedelight.com/merge-sort/).

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef vector<double> Trains;

// Function to find the minimum number of platforms needed
// to avoid delay in any train arrival
int findMinPlatforms(Trains arrival, Trains departure)        // no-ref, no-const
{
    // sort arrival time of trains
    sort(arrival.begin(), arrival.end());

    // sort departure time of trains
    sort(departure.begin(), departure.end());

    // maintains the count of trains
    int count = 0;

    // stores minimum platforms needed
    int platforms = 0;

    // take two indices for arrival and departure time
    int i = 0, j = 0;

    // run till all trains have arrived
    while (i < arrival.size())
    {
        // if a train is scheduled to arrive next
        if (arrival[i] < departure[j])
        {
            // increase the count of trains and update minimum
            // platforms if required
            platforms = max(platforms, ++count);

            // move the pointer to the next arrival
            i++;
        }

        // if the train is scheduled to depart next i.e.
        // `departure[j] < arrival[i]`, decrease trains' count
        // and move pointer `j` to the next departure.

        // If two trains are arriving and departing simultaneously, i.e.
        // `arrival[i] == departure[j]`, depart the train first
        else {
            count--, j++;
        }
    }

    return platforms;
}

int main()
{
    Trains arrival = { 2.00, 2.10, 3.00, 3.20, 3.50, 5.00 };
    Trains departure = { 2.30, 3.40, 3.20, 4.30, 4.00, 5.20 };

    cout << "The minimum platforms needed is " << findMinPlatforms(arrival, departure);

    return 0;
}
```

**Output:** The minimum platforms needed is 2

##

```java
import java.util.Arrays;

class Main
{
    // Function to find the minimum number of platforms needed
    // to avoid delay in any train arrival
    public static int findMinPlatforms(double[] arrival, double[] departure)
    {
        // sort arrival time of trains
        Arrays.sort(arrival);

        // sort departure time of trains
        Arrays.sort(departure);

        // maintains the count of trains
        int count = 0;

        // stores minimum platforms needed
        int platforms = 0;

        // take two indices for arrival and departure time
        int i = 0, j = 0;

        // run till all trains have arrived
        while (i < arrival.length)
        {
            // if a train is scheduled to arrive next
            if (arrival[i] < departure[j])
            {
                // increase the count of trains and update minimum
                // platforms if required
                platforms = Integer.max(platforms, ++count);

                // move the pointer to the next arrival
                i++;
            }

            // if the train is scheduled to depart next i.e.
            // `departure[j] < arrival[i]`, decrease trains' count
            // and move pointer `j` to the next departure.

            // If two trains are arriving and departing simultaneously,
            // i.e., `arrival[i] == departure[j]`, depart the train first
            else {
                count--;
                j++;
            }
        }

        return platforms;
    }

    public static void main(String[] args)
    {
        double[] arrival = { 2.00, 2.10, 3.00, 3.20, 3.50, 5.00 };
        double[] departure = { 2.30, 3.40, 3.20, 4.30, 4.00, 5.20 };

        System.out.print("The minimum platforms needed is "
                    + findMinPlatforms(arrival, departure));
    }
}
```

##

```python3
# Function to find the minimum number of platforms needed
# to avoid delay in any train arrival
def findMinPlatforms(arrival, departure):

    # sort arrival time of trains
    arrival.sort()

    # sort departure time of trains
    departure.sort()

    # maintains the count of trains
    count = 0

    # stores minimum platforms needed
    platforms = 0

    # take two indices for arrival and departure time
    i = j = 0

    # run till all trains have arrived
    while i < len(arrival):

        # if a train is scheduled to arrive next
        if arrival[i] < departure[j]:

            # increase the count of trains and update minimum
            # platforms if required
            count = count + 1
            platforms = max(platforms, count)

            # move the pointer to the next arrival
            i = i + 1

        # if the train is scheduled to depart next i.e.
        # `departure[j] < arrival[i]`, decrease trains' count
        # and move pointer `j` to the next departure.

        # If two trains are arriving and departing simultaneously, i.e.
        # `arrival[i] == departure[j]`, depart the train first
        else:
            count = count - 1
            j = j + 1

    return platforms

if __name__ == '__main__':

    arrival = [2.00, 2.10, 3.00, 3.20, 3.50, 5.00]
    departure = [2.30, 3.40, 3.20, 4.30, 4.00, 5.20]

    print("The minimum platforms needed is", findMinPlatforms(arrival, departure))
```

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space, where `n` is the total number of trains.

Also See:

> [Maximum Overlapping Intervals Problem](https://www.techiedelight.com/maximum-overlapping-intervals-problem/ "Maximum Overlapping Intervals Problem")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 248

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
