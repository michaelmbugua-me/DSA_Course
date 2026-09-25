# Find all employees who directly or indirectly reports to a manager

> Source: https://www.techiedelight.com/find-employees-who-reports-to-manager/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a map containing employee to manager mappings, find all employees under each manager who directly or indirectly reports him.

For example, consider the following employee-manager pairs:

A —> A B —> A C —> B D —> B E —> D F —> E

Here, `A` reports to himself, i.e., `A` is head of the company and is the manager of employee `B`. `B` is the manager of employees `C` and `D`, `D` is the manager of employee `E`, `E` is the manager of employee `F`, `C`, and `F` is not managers of any employee.

**Output:** A —> [B, D, C, E, F] B —> [D, C, E, F] C —> [] D —> [E, F] E —> [F] F —> []

> 

The idea is to construct a reverse map containing manager to employee mappings and recursively find all reporting employees (direct and indirect) in every manager’s hierarchy. The algorithm can be implemented as follows in TypeScript:

```ts
// Recursive DP function to find all employees who directly or indirectly
// report to a given manager and store the result in `result`
function findAllReportingEmployees(manager: string,
                    managerToEmployeeMappings: Map<string, Set<string>>,
                    result: Map<string, Set<string>>): Set<string> {

    // if the subproblem is already seen before
    if (result.has(manager)) {
        // return the already computed mapping
        return result.get(manager) as Set<string>;
    }

    // find all employees reporting directly to the current manager
    const managerEmployees = managerToEmployeeMappings.get(manager) as Set<string>;

    // find all employees reporting indirectly to the current manager
    for (const reportee of [...managerEmployees]) {
        // find all employees reporting to the current employee
        const employees = findAllReportingEmployees(reportee,
                            managerToEmployeeMappings, result);

        // move those employees to the current manager
        if (employees) {
            for (const c of employees) {
                managerEmployees.add(c);
            }
        }
    }

    // save the result to avoid recomputation and return it
    result.set(manager, managerEmployees);
    return managerEmployees;
}

// Find all employees who directly or indirectly reports to a manager
function findEmployees(employeeToManagerMappings: Map<string, string>): Map<string, Set<string>> {

    // store manager to employee mappings in a new map.
    // `Set<string>` is used since a manager can have several employees mapped
    const managerToEmployeeMappings = new Map<string, Set<string>>();

    // fill the above map with the manager to employee mappings
    for (const [employee, manager] of employeeToManagerMappings) {
        if (!managerToEmployeeMappings.has(employee)) {
            managerToEmployeeMappings.set(employee, new Set<string>());
        }
        if (!managerToEmployeeMappings.has(manager)) {
            managerToEmployeeMappings.set(manager, new Set<string>());
        }

        // don't map an employee with itself
        if (employee !== manager) {
            (managerToEmployeeMappings.get(manager) as Set<string>).add(employee);
        }
    }

    // construct an empty map to store the result
    const result = new Map<string, Set<string>>();

    // find all reporting employees (direct and indirect) for every manager
    // and store the result in a map
    for (const key of employeeToManagerMappings.keys()) {
        findAllReportingEmployees(key, managerToEmployeeMappings, result);
    }

    return result;
}

// construct a mapping from employee to manager
const employeeToManagerMappings = new Map<string, string>([
    ['A', 'A'], ['B', 'A'], ['C', 'B'], ['D', 'B'], ['E', 'D'], ['F', 'E']
]);

const result = findEmployees(employeeToManagerMappings);

// print contents of the resulting map
for (const [key, value] of result) {
    console.log(`${key} —> [${[...value].join(', ')}]`);
}
```

**Output:** A —> [C, D, F, B, E] E —> [F] F —> [] D —> [F, E] C —> [] B —> [E, F, D, C]

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 260

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
