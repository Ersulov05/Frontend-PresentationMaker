function getDegrees(radians: number): number {
    return radians * 180 / Math.PI
}

function getRadians(degrees: number): number {
    return degrees * Math.PI / 180
}

export {
    getDegrees,
    getRadians,
}