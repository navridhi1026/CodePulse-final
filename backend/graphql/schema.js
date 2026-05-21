const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } = require('graphql');
const { Problem } = require('../models');

const ProblemType = new GraphQLObjectType({
    name: 'Problem',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        is_premium: { type: GraphQLBoolean },
        company_tags: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        problems: {
            type: new GraphQLList(ProblemType),
            resolve(parent, args) {
                return Problem.findAll();
            }
        },
        problem: {
            type: ProblemType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return Problem.findByPk(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
