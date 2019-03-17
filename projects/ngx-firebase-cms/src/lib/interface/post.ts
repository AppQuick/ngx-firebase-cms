export interface Post {
    author: string
    slug: string
    title: string
    content: string
    excerpt: string
    password: string
    parent: string
    mime: string
    status: string
    type: string
    order: number
    commentStatus: string
    commentCount: number
    updatedTime: Date
    createdTime: Date
}
