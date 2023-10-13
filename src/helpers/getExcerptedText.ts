export const getExcerptedText = (text: string, excerptLength = 15) => text.length < excerptLength ? text : text.slice(0, excerptLength) + "..."
