const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const dots = $$('.tab-item')
const slides = $$('.slide-users')
const prevBtn = $('.prev')
const nextBtn = $('.next')
const numberOfSilides = slides.length
var slideNumber = 0
var slideIndex = 0
var taskbar = $('.options');
const skillsSection = $('.skills-section') 
const progressBars = $$('.container-skills-progress-bar') //get thanh kỹ năng,4 thanh

const optionElements = $$('.option-item')
const extendElements = $$('.extend')

optionElements.forEach((option, index) => { 
    const extendElement = extendElements[index]
    option.onclick = function () {
        clickTop() //khi click thanh công cụ thì toạ đỘ scrollY=0 (về ban đầu)

        $('.option-item.active').classList.remove('active') //lớp active này thêm màu vào
        $('.extend.active').classList.remove('active')

        this.classList.add('active')
        extendElement.classList.add('active')
    }
})





function clickTop() {
    document.documentElement.scrollTop = 0;
}

// Skill
function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress; //dataset để get value attribute trong thẻ html.Vd data-name=""
        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`; //lấy progress set cho witdh
        progressBar.style.transition = "all 0.4s linear" ; //di chuyển của thanh progress
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.opacity = 0;
        p.style.width = 0;
        p.style.transition = "all 0.2s linear" ;
    });
}

window.addEventListener('scroll', () => {
    const sectionPositon = skillsSection.getBoundingClientRect().top; //hàm này cung cấp cho  thông tin về kích thước và vị trí của phần tử trong trang web.
                                                                      //skillSection:div chứa các thanh progress
    const screenPositon = window.innerHeight; //chiều cao window

    if(sectionPositon < screenPositon){ //
        showProgress();
    } else {
        hideProgress();
    }
})


window.onscroll = function() { //treo tại chỗ thanh công cụ
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300){
        taskbar.style.position = "fixed";
        taskbar.style.top = 0;
        taskbar.style.width = "163.32px" ;
        taskbar.style.marginTop = "30px" ; //transition thay đỔi ở đây là margin-top.transition xảy ra khi scroll vs dk if else
        taskbar.style.transition = "all 0.2s linear" ;
    } else {
        taskbar.style.position = "static";
        taskbar.style.marginTop = 0 ; //ban đầu của thanh công cụ là static vs margin-top=0,sau scroll dc treo fixed
        taskbar.style.transition = "all 0.2s linear" ;
    }
}

//Ấn vào nút để thay đổi đối tượng slide
dots.forEach((dot, index) => {
    const slide = slides[index]

    dot.onclick = function () {
        $('.tab-item.active').classList.remove('active')
        $('.slide-users.active').classList.remove('active')

        this.classList.add('active')
        slide.classList.add('active')
    }
});
//Next slide
nextBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    dots.forEach((dot) => {
        dot.classList.remove('active');
    });

    slideNumber++;

    if(slideNumber > (numberOfSilides - 1)){
        slideNumber = 0;
    }

    slides[slideNumber].classList.add('active');
    dots[slideNumber].classList.add('active');
});
//Lùi slide
prevBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    dots.forEach((dot) => {
        dot.classList.remove('active');
    });

    slideNumber--;

    if(slideNumber < 0){
        slideNumber = numberOfSilides - 1;
    }

    slides[slideNumber].classList.add('active');
    dots[slideNumber].classList.add('active');
});

//Slide autoplay
var playSlide;

var repeater = () => {
    playSlide = setInterval(() => {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
        dots.forEach((dot) => {
            dot.classList.remove('active');
        });
    
        slideNumber++;
    
        if(slideNumber > (numberOfSilides - 1)){
            slideNumber = 0;
        }
    
        slides[slideNumber].classList.add('active');
        dots[slideNumber].classList.add('active');
    }, 5000);
}

repeater();
