const { sequelize, Problem } = require('./models');

const syncAndSeed = async () => {
    try {
        // Manually add columns if they don't exist
        try { await sequelize.query('ALTER TABLE problems ADD COLUMN is_premium BOOLEAN DEFAULT false;'); } catch(e){}
        try { await sequelize.query('ALTER TABLE problems ADD COLUMN company_tags VARCHAR(255);'); } catch(e){}
        try { await sequelize.query('ALTER TABLE problems ADD COLUMN frequency INTEGER DEFAULT 0;'); } catch(e){}
        try { await sequelize.query('ALTER TABLE users ADD COLUMN is_subscribed BOOLEAN DEFAULT false;'); } catch(e){}
        
        await Problem.bulkCreate([
            {
                title: 'LRU Cache Design',
                description: 'Design and implement a data structure for Least Recently Used (LRU) cache. It should support get and put operations.',
                difficulty: 'Hard',
                input_format: 'Operations sequence',
                output_format: 'Results of get operations',
                is_premium: true,
                company_tags: 'Google,Amazon,Microsoft',
                frequency: 98
            },
            {
                title: 'Two Sum II - Input Array Is Sorted',
                description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
                difficulty: 'Medium',
                input_format: 'Array of integers and target',
                output_format: 'Indices of the two numbers',
                is_premium: true,
                company_tags: 'Amazon,Apple',
                frequency: 95
            },
            {
                title: 'Number of Islands',
                description: 'Given an m x n 2D binary grid grid which represents a map of 1s (land) and 0s (water), return the number of islands.',
                difficulty: 'Medium',
                input_format: 'Grid of 1s and 0s',
                output_format: 'Integer count',
                is_premium: true,
                company_tags: 'Meta,Amazon,Microsoft',
                frequency: 92
            },
            {
                title: 'Median of Two Sorted Arrays',
                description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
                difficulty: 'Hard',
                input_format: 'Two sorted arrays',
                output_format: 'Float median',
                is_premium: true,
                company_tags: 'Google,Apple,Meta',
                frequency: 88
            }
        ]);
        console.log('Premium problems seeded successfully');
    } catch (err) {
        console.error('Error:', err);
    }
    process.exit();
};

syncAndSeed();
