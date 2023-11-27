let header  = document.querySelector("header");
let body = document.body;
let firstScroll = window.scrollY;
window.addEventListener("scroll",()=>
{
    let secondScroll = window.scrollY;
    if(firstScroll != secondScroll)
    {
        header.style.borderBottom="5px solid rgb(100, 48, 143)";
    }
    else
    {
        header.style.borderBottom="0px";
    }
});