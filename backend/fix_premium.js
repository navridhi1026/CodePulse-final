const { sequelize, Problem, TestCase } = require('./models');

const fixPremium = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const updates = {
            "LRU Cache Design": {
                sample_input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
                sample_output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
                testcases: [
                    { input: '["LRUCache", "put", "get"]\n[[1], [2, 1], [2]]', expected_output: '[null, null, 1]', is_hidden: true }
                ]
            },
            "Two Sum II - Input Array Is Sorted": {
                sample_input: "[2,7,11,15]\n9",
                sample_output: "[1,2]",
                testcases: [
                    { input: "[2,3,4]\n6", expected_output: "[1,3]", is_hidden: true },
                    { input: "[-1,0]\n-1", expected_output: "[1,2]", is_hidden: true }
                ]
            },
            "Number of Islands": {
                sample_input: '[\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
                sample_output: "1",
                testcases: [
                    { input: '[\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]', expected_output: "3", is_hidden: true }
                ]
            },
            "Median of Two Sorted Arrays": {
                sample_input: "[1,3]\n[2]",
                sample_output: "2.00000",
                testcases: [
                    { input: "[1,2]\n[3,4]", expected_output: "2.50000", is_hidden: true },
                    { input: "[0,0]\n[0,0]", expected_output: "0.00000", is_hidden: true }
                ]
            }
        };

        for (const [title, data] of Object.entries(updates)) {
            const problem = await Problem.findOne({ where: { title } });
            if (problem) {
                problem.sample_input = data.sample_input;
                problem.sample_output = data.sample_output;
                await problem.save();

                // Clear old test cases for this problem
                await TestCase.destroy({ where: { problem_id: problem.id } });

                // Add public testcase
                await TestCase.create({
                    problem_id: problem.id,
                    input: data.sample_input,
                    expected_output: data.sample_output,
                    is_hidden: false
                });

                // Add hidden testcases
                for (const tc of data.testcases) {
                    await TestCase.create({
                        problem_id: problem.id,
                        input: tc.input,
                        expected_output: tc.expected_output,
                        is_hidden: tc.is_hidden
                    });
                }
                console.log(`Updated problem and testcases for: ${title}`);
            }
        }
        console.log('Finished updating premium problems.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

fixPremium();
