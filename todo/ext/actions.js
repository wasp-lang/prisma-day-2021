import HttpError from '@wasp/core/HttpError.js'

export const createTask = async (args, context) => {
    if (!context.user) { throw new HttpError(403) }

    return context.entities.Task.create({
        data: { description: args.description }
    })
}