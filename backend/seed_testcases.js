const { sequelize, Problem, TestCase } = require('./models');

async function seedTestCases() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const problems = await Problem.findAll();
        let seeded = 0;

        for (const problem of problems) {
            const count = await TestCase.count({ where: { problem_id: problem.id }});
            
            // If the problem has no test cases, let's create some dummy ones!
            if (count === 0) {
                console.log(`Seeding test cases for problem: ${problem.title}`);
                
                // 1. The public sample testcase
                await TestCase.create({
                    problem_id: problem.id,
                    input: problem.sample_input || "7\n1 2 3 5 -1 -1 8\n5",
                    expected_output: problem.sample_output || "8",
                    is_hidden: false
                });

                // 2. A hidden testcase
                await TestCase.create({
                    problem_id: problem.id,
                    input: "6\n1 2 3 5 6 7\n7",
                    expected_output: "1",
                    is_hidden: true
                });

                // 3. Another hidden testcase
                await TestCase.create({
                    problem_id: problem.id,
                    input: "3\n1 2 3\n4",
                    expected_output: "-1",
                    is_hidden: true
                });

                seeded++;
            }
        }

        console.log(`Successfully seeded test cases for ${seeded} problems.`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding test cases:', error);
        process.exit(1);
    }
}

seedTestCases();
