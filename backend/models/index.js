const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    profile_pic: { type: DataTypes.STRING, defaultValue: null },
    is_subscribed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });

const Problem = sequelize.define('Problem', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    difficulty: { type: DataTypes.STRING, allowNull: false },
    input_format: { type: DataTypes.TEXT, allowNull: false },
    output_format: { type: DataTypes.TEXT, allowNull: false },
    sample_input: { type: DataTypes.TEXT },
    sample_output: { type: DataTypes.TEXT },
    is_premium: { type: DataTypes.BOOLEAN, defaultValue: false },
    company_tags: { type: DataTypes.STRING }, // Comma separated tags e.g., 'Google,Amazon'
    frequency: { type: DataTypes.INTEGER, defaultValue: 0 } // e.g. 95 for 95% frequency
}, { tableName: 'problems', timestamps: true, createdAt: 'created_at', updatedAt: false });

const Contest = sequelize.define('Contest', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'contests', timestamps: true, createdAt: 'created_at', updatedAt: false });

const TestCase = sequelize.define('TestCase', {
    problem_id: { type: DataTypes.INTEGER, allowNull: false },
    input: { type: DataTypes.TEXT, allowNull: false },
    expected_output: { type: DataTypes.TEXT, allowNull: false },
    is_hidden: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'testcases', timestamps: true, createdAt: 'created_at', updatedAt: false });

const Submission = sequelize.define('Submission', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    problem_id: { type: DataTypes.INTEGER, allowNull: false },
    code: { type: DataTypes.TEXT, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    output: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, allowNull: false },
    test_results: { type: DataTypes.TEXT } // Raw JSON of test case evaluations
}, { tableName: 'submissions', timestamps: true, createdAt: 'created_at', updatedAt: false });

User.hasMany(Submission, { foreignKey: 'user_id' });
Submission.belongsTo(User, { foreignKey: 'user_id' });

Problem.hasMany(Submission, { foreignKey: 'problem_id' });
Submission.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem' });

Problem.hasMany(TestCase, { foreignKey: 'problem_id' });
TestCase.belongsTo(Problem, { foreignKey: 'problem_id' });

module.exports = { sequelize, User, Problem, Submission, Contest, TestCase };
