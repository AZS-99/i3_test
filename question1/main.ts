export function isValidWalk(walk: string[]) {
    if (walk.length !== 10  ||  (walk.filter(d => d === 'n').length !== walk.filter(d => d === 's').length)  ||  (walk.filter(d => d === 'e').length !== walk.filter(d => d === 'w').length))
        return false
    return true
}