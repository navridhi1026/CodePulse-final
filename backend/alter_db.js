const { sequelize } = require('./models');

async function alterDb() {
    try {
        await sequelize.query('ALTER TABLE submissions ADD COLUMN test_results TEXT;');
        console.log('Successfully added test_results column to submissions table.');
        process.exit(0);
    } catch (err) {
        console.log('Column might already exist or error occurred:', err.message);
        process.exit(0);
    }
}
alterDb();
