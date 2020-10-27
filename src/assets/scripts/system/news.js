import Swiper from 'swiper';

export default class News {
    init() {
        (new Swiper('.news-container', {
            slidesPerView: 'auto',
            direction: 'vertical',
            loop: true,

            autoplay: {
                delay: 1000 * 10,
            },

            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                renderBullet: function (index, className) {
                    var svg = '<svg class="progress-pagination" width="14" height="14" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="5" stroke="#ffffff" stroke-width="1"/></svg>';
                    return '<button class="' + className + '">' + svg + "</button>";
                }
            }
        })); 
    }
}
