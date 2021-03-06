const { ApolloServer, gql } = require('apollo-server');

const courses = [
  {
      title: 'The Modern GraphQL Bootcamp',
      author: 'Andrew Mead',
      description: 'Learn how to build GraphQL applications using Node.js. Includes Prisma, authentication, Apollo Client, and more!',
      url: 'http://codingthesmartway.com//courses/graphql-bootcamp/'
  },
  {
      title: 'NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)',
      author: 'Maximilian Schwarzmüller',
      description: 'Master Node JS, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL & much more!',
      url: 'http://codingthesmartway.com/courses/nodejs-complete-guide/'
  },
  {
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      author: 'Maximilian Schwarzmüller',
      description: 'Dive in and learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
      url: 'http://codingthesmartway.com/courses/react-complete-guide/'
  },
];

const typeDefs = gql`
  type Course {
    title: String,
    author: String,
    description: String,
    url: String
  }
`;

const resolvers = {
  Query: {
    courses: () => courses
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});