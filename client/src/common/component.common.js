export const setModifiers = (className, modifiers) => {
    // modifiers is an object like { active: true, current: false}
    const classList = ['', className]
    for (const mod in modifiers) {
        if (modifiers.hasOwnProperty(mod) && modifiers[mod]) {
            classList.push(`${className}--${mod}`)
        }
    }
}
