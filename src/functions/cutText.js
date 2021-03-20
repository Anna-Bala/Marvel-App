const cutText = (text, length) => {
    console.log(text.split(" ").splice(0,length).length);
    if(text.split(" ").splice(0,length).length < 25) {
        return text
    }
    else return `${text.split(" ").splice(0,length).join(" ")}...`;
  }

  export default cutText;