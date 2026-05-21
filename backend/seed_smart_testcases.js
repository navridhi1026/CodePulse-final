const { sequelize, Problem, TestCase } = require('./models');

const testcaseMap = {
    "Two Sum": [
        { input: "[3,2,4]\n6", expected: "[1,2]" },
        { input: "[3,3]\n6", expected: "[0,1]" }
    ],
    "Reverse a String": [
        { input: "world", expected: "dlrow" },
        { input: "codepulse", expected: "esluppedoc" }
    ],
    "FizzBuzz": [
        { input: "3", expected: "Fizz" },
        { input: "5", expected: "Buzz" }
    ],
    "Palindrome Check": [
        { input: "madam", expected: "true" },
        { input: "hello", expected: "false" }
    ],
    "Maximum Subarray": [
        { input: "[-1]", expected: "-1" },
        { input: "[5,4,-1,7,8]", expected: "23" }
    ],
    "Palindrome Number1": [
        { input: "-121", expected: "false" },
        { input: "10", expected: "false" }
    ],
    "Reverse Integer": [
        { input: "-123", expected: "-321" },
        { input: "120", expected: "21" }
    ],
    "Valid Anagram": [
        { input: "rat\ncar", expected: "false" },
        { input: "a\na", expected: "true" }
    ],
    "Climbing Stairs": [
        { input: "2", expected: "2" },
        { input: "4", expected: "5" }
    ],
    "Longest Substring": [
        { input: "bbbbb", expected: "1" },
        { input: "pwwkew", expected: "3" }
    ],
    "Container With Most Water": [
        { input: "1,1", expected: "1" },
        { input: "4,3,2,1,4", expected: "16" }
    ],
    "Group Anagrams": [
        { input: "", expected: "[[\"\"]]" },
        { input: "a", expected: "[[\"a\"]]" }
    ],
    "Product of Array Except Self": [
        { input: "-1,1,0,-3,3", expected: "[0,0,9,0,0]" }
    ],
    "3Sum": [
        { input: "0,1,1", expected: "[]" },
        { input: "0,0,0", expected: "[[0,0,0]]" }
    ],
    "Longest Consecutive Sequence": [
        { input: "0,3,7,2,5,8,4,6,0,1", expected: "9" }
    ],
    "Median of Two Sorted Arrays": [
        { input: "1,2\n3,4", expected: "2.50000" }
    ],
    "First Missing Positive": [
        { input: "3,4,-1,1", expected: "2" },
        { input: "7,8,9,11,12", expected: "1" }
    ],
    "Trapping Rain Water": [
        { input: "4,2,0,3,2,5", expected: "9" }
    ],
    "Minimum Window Substring": [
        { input: "a\na", expected: "a" }
    ],
    "Largest Rectangle in Histogram": [
        { input: "2,4", expected: "4" }
    ],
    "duplicate number": [
        { input: "1,3,4,2,2", expected: "2" },
        { input: "3,1,3,4,2", expected: "3" }
    ]
};

async function seedSmartTestCases() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Wipe old test cases
        await TestCase.destroy({ where: {} });
        console.log('Old dummy testcases cleared.');

        const problems = await Problem.findAll();
        let seeded = 0;

        for (const problem of problems) {
            console.log(`Seeding test cases for problem: ${problem.title}`);
            
            // 1. Always create the public sample testcase from DB data if it exists
            const sampleInput = problem.sample_input || "sample_input";
            const sampleOutput = problem.sample_output || "sample_output";
            
            await TestCase.create({
                problem_id: problem.id,
                input: sampleInput,
                expected_output: sampleOutput,
                is_hidden: false
            });

            // 2. Add smart hidden testcases based on the title map
            const smartCases = testcaseMap[problem.title];
            if (smartCases && smartCases.length > 0) {
                for (const tc of smartCases) {
                    await TestCase.create({
                        problem_id: problem.id,
                        input: tc.input,
                        expected_output: tc.expected,
                        is_hidden: true
                    });
                }
            } else {
                // Fallback for problems not in the map (just use an edge case string)
                await TestCase.create({
                    problem_id: problem.id,
                    input: "fallback_hidden_input_1",
                    expected_output: "fallback_hidden_output_1",
                    is_hidden: true
                });
            }

            seeded++;
        }

        console.log(`Successfully seeded SMART test cases for ${seeded} problems.`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding test cases:', error);
        process.exit(1);
    }
}

seedSmartTestCases();
