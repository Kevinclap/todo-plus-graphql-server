const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const ToDo = require('./resolvers/ToDo');

// const resolvers = {
//     Query: {
//       info: () => `This is the API of a Hackernews Clone`,
//       allUsers: async (parent, args, context) => {
//           return context.prisma.user.findMany()
//       },
//       user: async (parent, args, context) => {
//           return context.prisma.user.findUnique({
//               where: {
//                   id: args.id,
//               },
//           })
//       },
//       toDo: async (parent, args, context) => {
//         return context.prisma.toDo.findUnique({
//             where: {
//                 id: parent.id,
//             },
//         })
//     },
//     },
//     Mutation: {
//         user: (parent, args, context, info) => {
//            const newUser = context.prisma.user.create({
//                data: {
//                    name: args.name,
//                    email: args.email,
//                },
//            })
//           return newUser
//         },
//         updateUser: (parent, args, context, info) => {
//             const updatedUser = context.prisma.user.update({
//                 where: {
//                     id: args.id,
//                 },
//                 data: {
//                     name: args.name,
//                     email: args.email
//                 }
//             })
//             return updatedUser
//         },
//         deleteUser: (parent, args, context, info) => {
//             const deletedUser = context.prisma.user.delete({
//                 where: {
//                     id: args.id,
//                 },
//             })
//             return deletedUser
//         },
//         toDo: (parent, args, context, info) => {
//             console.log('This is context: ', context.userId)
//             const newtoDo = context.prisma.toDo.create({
//                 data: {
//                     title: args.title,
//                     author: resolvers.Query.user('',args.authorId),
//                 },
//             })
//            return newtoDo
//         },
//   }
// }

const resolvers = {
    Query,
    Mutation,
    User,
    ToDo,
  };

  const prisma = new PrismaClient()

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    playground: true,
    introspection: true,
    context: {
      prisma,
    }
  })

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );