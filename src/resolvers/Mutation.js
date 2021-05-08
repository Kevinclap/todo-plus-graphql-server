function user(parent, args, context, info) {
    const newUser = context.prisma.user.create({
        data: {
            name: args.name,
            email: args.email,
        },
    })
   return newUser
 }

function  updateUser(parent, args, context, info) {
    const updatedUser = context.prisma.user.update({
        where: {
            id: args.id,
        },
        data: {
            name: args.name,
            email: args.email
        }
    })
    return updatedUser
}

function  deleteUser(parent, args, context, info) {
    const deletedUser = context.prisma.user.delete({
        where: {
            id: args.id,
        },
    })
    return deletedUser
}

// function toDo(parent, args, context, info) {
//     console.log('This is context: ', context.userId)
//     const newtoDo = context.prisma.toDo.create({
//         data: {
//             title: args.title,
//             author: resolvers.Query.user('',args.authorId),
//         },
//     })
//    return newtoDo
// }

// async function toDo(parent, args, context, info) {
//     console.log('This is context: ', context.userId)
//     const newtoDo = await context.prisma.user.update({
//         where: {
//             id: args.id
//           },
//           data: {
//             toDos: {        
//               create: {
//                   title: args.title 
                  
//               }
//             }
//           }
//     }) 
//     console.log(newtoDo)
//    return newtoDo
// }

async function toDo(parent, args, context, info) {
    console.log('This is context: ', context.userId)
    console.log('This is parents: ', parent)
        const newtoDo = await context.prisma.toDo.create({
            data: {
                title: args.title,
                author: {
                    connect: {id: args.id}
                }
            },
            include: {
                author: true, // Include all posts in the returned object
              },
        }) 
        console.log(newtoDo)
       return newtoDo

}


// const user = await prisma.user.update({
//     where: {
//       id: 9
//     },
//     data: {
//       posts: {        
//         createMany: {
//           data: [
//             { title: "My first post", },
//             { title: "My second post" }
//           ]
//         }
//       }
//     }
//   })

module.exports = {
    user,
    updateUser,
    deleteUser,
    toDo
  }