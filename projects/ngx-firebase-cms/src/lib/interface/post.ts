import * as firebase from 'firebase/app'

export interface Post {
    author: string
    title: string
    type: ('post' | 'media')
    parent?: string
    url?: string
    meta?: string
    mime?: string
    updatedTime?: firebase.firestore.FieldValue
    createdTime?: firebase.firestore.FieldValue
}
