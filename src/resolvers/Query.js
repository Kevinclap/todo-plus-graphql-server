function info() {return `This is the API of a Hackernews Clone`} 

function allUsers(parent, args, context) {
    return context.prisma.user.findMany()
}

function user(parent, args, context) {
    return context.prisma.user.findUnique({
        where: {
            id: args.id,
        },
    })
}

function toDo(parent, args, context) {
    return context.prisma.toDo.findUnique({
        where: {
            id: args.id,
        },
    })
}

module.exports = {
    info,
    allUsers,
    user,
    toDo
  }