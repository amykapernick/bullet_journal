require(`dotenv`).config();

const { ApolloServer } = require(`apollo-server-azure-functions`);
const typeDefs = require(`./typeDefs`);
const resolvers = require(`./resolvers`);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true,
	context: ({ req }) => {
		const fakeUser = {
			userId: `userId`
		};
		return ({
			...fakeUser
		});
	}
});

module.exports = server.createHandler();
