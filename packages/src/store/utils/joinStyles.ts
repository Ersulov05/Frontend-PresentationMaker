function joinStyles(...styles: (string | undefined | boolean)[]) {
    return styles.filter(Boolean).join(' ');
}

export {
    joinStyles
}