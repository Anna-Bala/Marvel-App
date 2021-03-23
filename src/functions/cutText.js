const cutText = (text, length) => {
    const markers = ['<br>', '<li>', '<ul>', '</ul>', '</li>', '<br/>'];
    markers.forEach(marker => {
        text = text.replace(marker, '');
    });

    if(text.split(" ").splice(0,length).length < 20) {
        return text
    }
    else return `${text.split(" ").splice(0,length).join(" ")}...`;
  }

  export default cutText;