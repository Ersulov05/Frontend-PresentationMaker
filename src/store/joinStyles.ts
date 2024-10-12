function joinStyles(...styles: (string | undefined)[]) {
    return styles.filter(Boolean).join(' ');
}

export {
    joinStyles
}