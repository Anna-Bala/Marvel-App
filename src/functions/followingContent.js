const followingContent = (current, next, length) => {
    const previousContent = current;
    const currentContent = next;
    let nextContent = 0;
    if(next === length) nextContent = 0;
    else nextContent = next + 1;

    const state = {currentContent, previousContent, nextContent};

    return state;
}

export default followingContent;