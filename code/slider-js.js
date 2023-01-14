const box = document.querySelector('.slider_box');
const slider = Array.from(box.children);
const button_next = document.querySelector('.slider_button_left');
const button_prev = document.querySelector('.slider_button_right');
const point_nav = document.querySelector('.slider_nav');
const point = Array.from(point_nav.children);

const slide_width = slider[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slide_width * index + 'px';
};
slider.forEach(setSlidePosition);


const slide_move = (box, current_slide, to_slide) => {
    if(to_slide === null) return;
    box.style.transform = 'translateX(-' + to_slide.style.left + ')';
    current_slide.classList.remove('current-slide');
    to_slide.classList.add('current-slide');
}


const update = (current_point, move_point) => {
    if(current_point === null || move_point === null) return;
    current_point.classList.remove('current-slide');
    move_point.classList.add('current-slide');
}


button_prev.addEventListener('click', e => {
    const current_slide = box.querySelector('.current-slide');
    if(current_slide === null) return;
    const slide_prev = current_slide.previousElementSibling;

    const current_point = point_nav.querySelector('.current-slide');
    const prev_point = current_point.previousElementSibling;

    slide_move(box, current_slide, slide_prev);
    update(current_point, prev_point);
});


button_next.addEventListener('click', e => {
    const current_slide = box.querySelector('.current-slide');
    const slide_next = current_slide.nextElementSibling;
    const current_point = point_nav.querySelector('.current-slide');
    const next_point = current_point.nextElementSibling;

    slide_move(box, current_slide, slide_next);
    update(current_point, next_point);
});


point_nav.addEventListener('click', e => {
    const move_point = e.target.closest('button');

    if(!move_point) return;

    const current_slide = box.querySelector('.current-slide');
    const current_point = point_nav.querySelector('.current-slide');
    const move_index = point.findIndex(p => p === move_point);
    const to_slide = slider[move_index];

    slide_move(box, current_slide, to_slide);
    update(current_point, move_point);
})