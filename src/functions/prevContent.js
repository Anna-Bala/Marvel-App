const prevContent = (current, previous, length) => {
    const nextContent = current;
    const currentContent = previous;
    let previousContent = 0;
    if(previous === 0) previousContent = length;
    else previousContent = previous - 1;

    const state = {currentContent, previousContent, nextContent};

    return state;
}

export default prevContent;