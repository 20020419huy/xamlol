let slides = document.querySelectorAll('.slide');
let current_slide = 0
let slide_chose_deafult_x = document.querySelector('.slide-control-chose').offsetLeft
let slide_chose_deafult_y = document.querySelector('.slide-control-chose').offsetTop
let mouse_coordinate_x = 0
let mouse_coordinate_y = 0
for(let slide of slides) {
    let slide_chose = slide.querySelector('.slide-control-chose')
    let slides_option = slide.querySelectorAll('.slide-control-option')
    
    slide_chose.ontouchstart = function(e) {
        mouse_coordinate_x = e.touches[0].clientX
        mouse_coordinate_y = e.touches[0].clientY
    }

    slide_chose.ontouchmove = function(e) {
        slide_chose.style.top = slide_chose_deafult_y + e.touches[0].clientY - mouse_coordinate_y + 'px'
        slide_chose.style.left = slide_chose_deafult_x + e.touches[0].clientX - mouse_coordinate_x + 'px'
        if(!checkCollision(slide_chose, slides_option[1])) {
            slides_option[1].classList.add('fade-out')
            slide_chose.querySelector('p').innerText = 'hộp kia cơ :('
        } else {
            slides_option[1].classList.remove('fade-out')
            slide_chose.querySelector('p').innerText = 'thả vô hộp'
        }
        if(!checkCollision(slide_chose, slides_option[0])) {
            slide_chose.querySelector('p').innerText = 'hihi đúng rồi '
        }
    }

    slide_chose.ontouchend = function(e) {
        slides_option[1].classList.remove('fade-out')
        slide_chose.querySelector('p').innerText = 'thả vô hộp'
        if(!checkCollision(slide_chose, slides_option[0])) {
            slides[current_slide].classList.add('slide-out')
            setTimeout(()=> {
                slides[current_slide].classList.remove('active')
                current_slide++;
            }, 1000)
            slides[current_slide + 1].classList.add('slide-in')
            slides[current_slide + 1].classList.add('active')
        }
        slide_chose.style.top = slide_chose_deafult_y + 'px'
        slide_chose.style.left = slide_chose_deafult_x + 'px'
    }
}

function checkCollision(element1, element2) {
    let position1 = element1.getBoundingClientRect()
    let position2 = element2.getBoundingClientRect()
    return position1.x + position1.width < position2.x
     || position1.y + position1.height < position2.y 
     || position1.x > position2.x + position2.width
     || position1.y > position2.y + position2.height
}
