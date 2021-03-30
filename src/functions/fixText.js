const fixText = (text, length, cut) => {
    const markers = ['<br>', '<li>', '<ul>', '</ul>', '</li>', '<br/>'];
    markers.forEach(marker => {
        text = text.replaceAll(marker, '');
    });

    if(text === null || text === 'null') {
        return '';
    }

    if(cut) {
        if(text.split(" ").splice(0,length).length < 20) {
            return text
        }
        else return `${text.split(" ").splice(0,length).join(" ")}...`;
    } else return text

  }

  export default fixText;