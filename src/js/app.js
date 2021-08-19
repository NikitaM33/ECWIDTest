window.addEventListener('load', () => {
    const images = document.querySelectorAll('.main__slider-item img');
    const sliderList = document.querySelector('.main__slider-list');
    const dotsContainer = document.querySelector('.main__slider-dots');
    const burgerMenu = document.querySelector('.menu__burger');
    const menuBody = document.querySelector('.menu__main-menu-body');
    let count = 0,
        dotsCount = 0,
        width,
        dots = '',
        isDots = true;


    // Slider
    let roleSlider = () => {
        if (isDots) {
            images.forEach(() => {
                dots += `
                    <div class="main__slider-dot"></div>
                `;
            
                dotsContainer.innerHTML = dots;
            });
            isDots = false;
        }


        const dot = document.querySelectorAll('.main__slider-dot');

        sliderList.style.transform = 'translate(-' + width * count + 'px)';

        dot.forEach((item, index) => {
            if (index === dotsCount) {
                item.classList.add('main__slider-dot_active');
            } else {
                item.classList.remove('main__slider-dot_active');
            }
        });
    }

    function init() {
        width = document.querySelector('.main__slider').offsetWidth;

        sliderList.style.width = width * images.length + 'px';

        images.forEach((item, index) => {
            item.style.width = width + 'px';
            item.style.height = 'auto';
        });

        roleSlider();
    }

    window.addEventListener('resize', init);

    init();

    document.querySelector('.main__slider-nav-next').addEventListener('click', () => {
        count++;
        dotsCount++;

        if (count > images.length - 1 && dotsCount > images.length - 1) {
            count = 0;
            dotsCount = 0;
        }

        roleSlider();
    });

    document.querySelector('.main__slider-nav-prev').addEventListener('click', () => {
        count--;
        dotsCount--;

        if (count < 0) {
            count = images.length - 1;
            dotsCount = images.length - 1;
        }

        roleSlider();
    });


    // Menu burger
    if (burgerMenu) {
        burgerMenu.addEventListener('click', (e) => {
            document.body.classList.toggle('_lock');
            burgerMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        })
    }
});
