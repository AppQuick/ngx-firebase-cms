export interface TableHeader {
    label: string
    key: string
    pipe?: ("date" | "user")
    pipeParameter?: (string | { keys: Array<string>, separator: string })
    canSort?: boolean
    canFilter?: boolean
    routerLink?: string
}
