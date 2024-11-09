const carousel=document.querySelector('.carousel');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const paginationChangers=document.querySelector(".pagination-changers");
const carouselProgress=document.querySelector("#carousel-progress");
const container=document.querySelector('.pagination-buttons');
let slides=[];
let interval=null;
let intervalTiming=5000;
let syncTiming=100;
let currentSlideIndex=0;
let progress=0;
let progressInterval=null;
let buttons = [];

function pushSlides(){
    for(let i=1;i<=8;i++)
    {
        const slide=document.createElement('div');
        slide.classList.add('slide');
        const image=document.createElement('img');
        image.src=`https://picsum.photos/seed/mySlide0${i+1}/1080/720`;
        image.alt=`slide0${i+1}`;
        slide.append(image);
        carousel.append(slide);
    }

}

function addPagination(){
    for(let i=0;i<8;i++){
        const newpage= document.createElement("div");
        newpage.classList.add("btn");
        container.append(newpage);
        buttons.push(newpage);

    }
}
function setActive(){
    buttons.forEach(e=>{
        e.classList.remove("active");
    })
    buttons[currentSlideIndex].classList.add('active');
}

function setSlides(){
    slides=document.querySelectorAll('.slide');
    slides.forEach((slide,index)=>{
        slide.style.transform=`translateX(${(index-currentSlideIndex)*100}%)`;
    });
    setActive();
    resetInterval();
}
function prevSlide(){
    currentSlideIndex=(currentSlideIndex-1+slides.length)%slides.length;
    setSlides();
}
function nextSlide(){
    currentSlideIndex=(currentSlideIndex+1)%slides.length;
    setSlides();
}
function syncProgress(){
    progress+=syncTiming;
    carouselProgress.style.width=`${Number((progress/intervalTiming)*100)}%`;
}
function attachEventListeners(){
    buttons.forEach((btn,ind)=>{
        btn.addEventListener("click",e=>{
            currentSlideIndex=ind;
            setSlides();

        });
    });
    prev.addEventListener("click",prevSlide);
    next.addEventListener("click",nextSlide);
    window.addEventListener("keydown",(event)=>{
        if(event.key==="ArrowLeft")
            prevSlide();
        else if(event.key==="ArrowRight")
            nextSlide();  
    });
    paginationChangers.addEventListener("mouseenter",()=>{
        progress=0;
        clearInterval(interval);
        clearInterval(progressInterval);
    });
    paginationChangers.addEventListener("mouseout",()=>{
        resetInterval();
    });
}

// Remove event listeners when the page is unloaded -- Cleanup
window.addEventListener("unload",()=>{
    prev.removeEventListener("click",prevSlide);
    next.removeEventListener("click",nextSlide);
    window.removeEventListener("keydown",(event)=>{
        if(event.key==="ArrowLeft")
            prevSlide();
        else if(event.key==="ArrowRight")
            nextSlide();
            
    });
})

function resetInterval(){
    progress=0;
    clearInterval(interval);
    clearInterval(progressInterval);
    interval=setInterval(nextSlide,intervalTiming);
    progressInterval=setInterval(syncProgress,syncTiming);
    setActive(); 
}

function startApp(){
    pushSlides();
    addPagination();
    setSlides();
    attachEventListeners();
    resetInterval();
    setActive();
    // interval=setInterval(nextSlide,intervalTiming); //automatic slider
    // progressInterval=setInterval(syncProgress,syncTiming);
}

startApp();