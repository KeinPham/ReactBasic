$(document).ready(function(){
    const imgSlide = ['./img/Zed.jpg','./img/Lee.jpg','./img/Teemo.jpg','./img/Goku.jpg'];
    let i = 0;
    MainSlide = (param) => {
        $('.slide').attr('src', imgSlide[param]);
    }
    MainSlide(i)
    bntSlider = (thisHtml) => {
        (thisHtml.value === "Next") ? next() : prev();
    };
    next=()=>{
        if( i < imgSlide.length -1){
            i++;
        }else{
            i = 0;
        }
        MainSlide(i)
        isLoaded();
    }
    prev=()=>{
        i--;
            MainSlide(i);
            if(i < 0){
                i = imgSlide.length -1;
                MainSlide(i);
            }
        isLoaded();
    }  
    isLoaded = () => {
        $('#loader').css("display","block");
        $('#main').css("display","none");
        setTimeout(()=>{$('#loader').css("display","none");
        $('#main').css("display","block")},1000);
    }
});

