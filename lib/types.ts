export type User = {
    userName : string,
    email : string,
    name : string,
}

export type Blog = {
    blogId? : number,
    title? : string,
    content? : string,
    authorId? : number
    authorName?: string
}

export type response = {
    status : boolean
    msg : string
    error? : string
    response? : object
}