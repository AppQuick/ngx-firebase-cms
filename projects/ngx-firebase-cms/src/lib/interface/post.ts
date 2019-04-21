import * as firebase from 'firebase/app'

export interface Post {
    author: string
    title: string
    type: ('post' | 'media')
    slug?: string
    content?: string
    excerpt?: string
    password?: string
    status?: string
    order?: number
    commentStatus?: string
    commentCount?: number
    parent?: string
    url?: string
    meta?: string
    mime?: string
    updatedTime?: firebase.firestore.FieldValue
    createdTime?: firebase.firestore.FieldValue
}
