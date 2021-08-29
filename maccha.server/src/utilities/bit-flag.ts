export function hasFlag(value: number, type: number): boolean {
    return (value & type) !== 0;
}

export function addFlag(value: number, type: number): number {
    return (value | type);
}

export function removeFalg(value: number, type: number): number {
    return (value & ~type);
}