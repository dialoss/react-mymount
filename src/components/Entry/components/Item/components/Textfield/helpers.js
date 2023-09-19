function setHTMLFromDelta(textBlock) {
    var tempCont = document.createElement("div");
    let dataJson = textBlock.getAttribute("data-json");
    (new Quill(tempCont)).setContents(JSON.parse(dataJson).ops);
    let htmlText = tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    tempCont.remove();
    textBlock.innerHTML = htmlText;
}