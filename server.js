require('dotenv').config();
const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// GraphQL Schema (Type Definitions)
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order]
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    orders: [Order]
  }

  type Order {
    id: ID!
    user: User!
    product: Product!
    quantity: Int!
  }

  type Query {
    users: [User]
    products: [Product]
    orders: [Order]
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    createProduct(name: String!, description: String!, price: Float!): Product
    createOrder(userId: ID!, productId: ID!, quantity: Int!): Order
  }
`;

// Resolvers (Functions that fetch data from the database)
const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    products: () => prisma.product.findMany(),
    orders: () => prisma.order.findMany(),
  },
  Mutation: {
    signUp: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    },
    createProduct: (_, { name, description, price }) =>
      prisma.product.create({ data: { name, description, price } }),
    createOrder: (_, { userId, productId, quantity }) =>
      prisma.order.create({
        data: { userId, productId, quantity },
      }),
  },
};

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
