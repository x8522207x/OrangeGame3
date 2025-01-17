let startY = 0;

$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    $('.modal_wrap').css('display', 'none');
    $('.dialog').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
        $('.dialog').css('display', '');
    }, 1000);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main");
    });

    $('.modal_close').on('click', () => {
        $('.plate_modal').toggleClass('-active');
        $('.modal.type--youtube').toggleClass('hide');
        $('.modal_box_veil').toggleClass('-hide');
        $('.modal').css('opacity', '0');
        $('.youtube--2').remove();
    });

    $('.prevBtn').on('click', () => {
        prevPage();
    });

    $('.nextBtn').on('click', () => {
        nextPage();
    });

    $('.closeBtn').on('click', () => {
        closeDialog();
    });

    $('.reward_btn').on('click', () => {
        openDialog();
    });

    let pcSwiperPage, p2Child1SwiperPage, p2Child2SwiperPage, p6SwiperPage, mobileSwiperPage;

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            slideActiveClass: 'animated',
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    $('.UNI-footer').clone().appendTo('.section_soon');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('bottom', 0).css('position', 'absolute').css('width', '100%').css('height', 80);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });
                    $('.UNI-footer').css('display', 'none');

                    $('.scroll').on('click', () => {
                        swiper.slideTo(1);
                    });

                    document.querySelectorAll('.swiper-slide-page').forEach(node => {
                        node.addEventListener('wheel', e => {
                            e.stopPropagation();
                            const currentSlide = swiper.slides[swiper.activeIndex];
                            const slideScrollTop = currentSlide.scrollTop;
                            const scrollHeight = currentSlide.scrollHeight;
                            const clientHeight = currentSlide.clientHeight;
                            const isAtTop = slideScrollTop === 0;
                            const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);
                            if (swiper.realIndex === 0) {
                                if (isAtBottom && e.deltaY > 0) {
                                    swiper.slideTo(swiper.realIndex + 1);
                                }
                            } else if ([1, 2, 3, 4, 5, 6].includes(swiper.realIndex)) {
                                if (isAtTop && e.deltaY < 0) {
                                    swiper.slideTo(swiper.realIndex - 1);
                                } else if (isAtBottom && e.deltaY > 0) {
                                    swiper.slideTo(swiper.realIndex + 1);
                                }
                            } else {
                                if (isAtTop && e.deltaY < 0) {
                                    swiper.slideTo(swiper.realIndex - 1);
                                }
                            }
                        }, { passive: true });

                        node.addEventListener('touchmove', function (e) {
                            if ($(window).height() < 911) {
                                handleSmallHeight(swiper, e);
                            } else {
                                swiper.allowTouchMove = true;
                            }
                        }, { passive: true });

                        node.addEventListener('touchstart', function (e) {
                            startY = e.touches[0].clientY;
                        }, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    ['active', 'point'].forEach(cl => ['.depth_1', '.depth_2'].forEach(ele => $(ele).removeClass(cl)));
                    $('.swiper-slide-page').off('scroll');
                    $('.swiper-slide-page').removeClass('scrollable');
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    $('.swiper-slide-page')[swiper.realIndex].classList.add('scrollable');
                    $('.depth_1')[swiper.realIndex].classList.add('active');
                    $('.depth_1')[swiper.realIndex].classList.add('point');
                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 7) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        $('.swiper-slide-page')[0].classList.add('scrollable');
        pcSwiperPage.slideTo(0);
        $('.depth_1')[0].classList.add('active');
        $('.depth_1')[0].classList.add('point');

        for (let i = 0; i < 8; i++) {
            addPageClick(i, pcSwiperPage);
        }
    };

    const p2Child1Swiper = () => {
        p2Child1SwiperPage = new Swiper('.nested-swiper-child1', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: {
                releaseOnEdges: true,
                enabled: false,
            },
            autoHeight: true,
            speed: 1000,
            nested: true,
            loop: true,
            passiveListeners: false,
            allowTouchMove: true,
            navigation: {
                nextEl: '.nested-swiper-child1 .swiper-button-next',
                prevEl: '.nested-swiper-child1 .swiper-button-prev',
            }
        });
    };

    const p2Child2Swiper = () => {
        p2Child2SwiperPage = new Swiper('.nested-swiper-child2', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: {
                releaseOnEdges: true,
                enabled: false,
            },
            autoHeight: true,
            speed: 1000,
            nested: true,
            loop: true,
            passiveListeners: false,
            allowTouchMove: true,
            navigation: {
                nextEl: '.swiper-child2-button-next',
                prevEl: '.swiper-child2-button-prev',
            },
            on: {
                init: (swiper) => {
                    $('.progress1').on('click', () => {
                        swiper.slideToLoop(0);
                    });
                    $('.progress2').on('click', () => {
                        swiper.slideToLoop(1);
                    });
                    $('.progress3').on('click', () => {
                        swiper.slideToLoop(2);
                    });
                },
                slideChange: (swiper) => {
                    $('[class*=progress]').removeClass('active');
                    $(`.progress${swiper.realIndex + 1}`).toggleClass('active');
                }
            }
        });
    };

    const p6Swiper = () => {
        p6SwiperPage = new Swiper('.nested-swiper', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: {
                releaseOnEdges: true,
                enabled: false,
            },
            autoHeight: true,
            speed: 1000,
            nested: true,
            loop: true,
            passiveListeners: false,
            allowTouchMove: true,
            navigation: {
                nextEl: '.nested-swiper .swiper-button-next',
                prevEl: '.nested-swiper .swiper-button-prev',
            }
        });
    };

    const mobileSwiper = () => {
        mobileSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            slidesPerView: "auto",
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
                enabled: false,
            },
            loop: false,
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: false,
            },
            // slideActiveClass: 'animated',
            autoHeight: true,
            speed: 1000,
            passiveListeners: false,
            allowTouchMove: true,
            on: {
                init: (swiper) => {
                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                    });

                    $('.scroll').on('click', () => {
                        swiper.slideTo(1);
                    });
                    $('.UNI-footer').css('display', 'none');
                },
                slideChange: (swiper) => {
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 7) {
                        $('.UNI-footer').css('display', 'block');
                    }
                }
            }
        });
    };

    if ($(window).width() > 768) {
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
        $('.section_main .content .video-open').on('click', () => {
            openVideo("HxC6wECJSCU");
        });

        $('.section_soon .content .item.item1').on('click', () => {
            openVideo("", "img/page8/p8_pc.mp4");
        });
    } else {
        $('.event_gnb').addClass('type_default');
        $('.event_gnb').removeClass('type_clear');
        mobileSwiper();
        p2Child2Swiper();
        $('.section_main .content .video-open').on('click', () => {
            openVideo("HxC6wECJSCU");
        });

        $('.section_soon .content .item.item1').on('click', () => {
            openVideo("", "img/page8/p8_m.mp4");
        });
    }
    p2Child1Swiper();
    p6Swiper();

    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = window.innerHeight + 'px';
        root.style.setProperty('--maxvh', newMaxVh);
        if ($(window).width() > 768) {
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
            if (pcSwiperPage) {
                setTimeout(() => { pcSwiperPage.update(); }, 100);

            } else {
                pcSwiper();
            }
        } else {
            $('.event_gnb').addClass('type_default');
            $('.event_gnb').removeClass('type_clear');
            if (mobileSwiperPage) {
                mobileSwiperPage.update();
            } else {
                mobileSwiper();
            }

            if (p2Child2SwiperPage) {
                p2Child2SwiperPage.update();
            } else {
                p2Child2Swiper();
            }
        }
        // location.reload();
        if (p2Child1SwiperPage) {
            p2Child1SwiperPage.update();
        } else {
            p2Child1Swiper()
        }
        if (p6SwiperPage) {
            p6SwiperPage.update();
        } else {
            p6Swiper();
        }
    }

    let currentPage = 1;
    const pageSize = 10;
    let data = [{
        name: "投票獎勵_造型/坐騎召喚高級禮物(11次)選擇箱",
        count: 1,
    }, {
        name: "投票獎勵_稀有深淵石選擇箱",
        count: 1,
    }, {
        name: "投票獎勵_優質強化卷軸選擇箱",
        count: 10,
    }, {
        name: "成就獎勵_精靈召喚高級禮物(11次)",
        count: 1,
    }, {
        name: "成就獎勵_坐騎召喚高級禮物(11次)",
        count: 1,
    }, {
        name: "成就獎勵_造型召喚高級禮物(11次)",
        count: 1,
    }]
    const totalPages = Math.ceil(data.length / pageSize);

    function renderTable() {
        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;
        const pageData = data.slice(start, end);
        if (currentPage === totalPages) {
            $('.nextBtn').addClass('disabled');
        } else {
            $('.nextBtn').removeClass('disabled')
        }

        if (currentPage === 1) {
            $('.prevBtn').addClass('disabled');
        } else {
            $('.prevBtn').removeClass('disabled')
        }

        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = pageData.map((item) =>
            `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.count}</td>
                </tr>
            ` ).join("");

        renderPagination();
    }

    function renderPagination() {
        const pageNumbersContainer = document.getElementById("page-numbers");
        pageNumbersContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("div");
            pageButton.textContent = i;
            pageButton.className = "page-number";
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.onclick = () => goToPage(i);
            pageNumbersContainer.appendChild(pageButton);
        }
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderTable();
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    }

    // 初始化
    renderTable();
});

const handleSmallHeight = (swiper, event) => {
    swiper.allowTouchMove = true;
    event.stopPropagation();

    const currentY = event.touches[0].clientY;
    let direction = '';
    if (currentY > startY) {
        direction = 'down';  // 向下移动
    } else if (currentY < startY) {
        direction = 'up';    // 向上移动
    }

    const currentSlide = swiper.slides[swiper.activeIndex];
    const slideScrollTop = currentSlide.scrollTop;
    const scrollHeight = currentSlide.scrollHeight;
    const clientHeight = currentSlide.clientHeight;
    const isAtTop = slideScrollTop === 0;
    const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);

    if (isAtTop) {
        if (swiper.realIndex !== 0) {
            if (direction === 'down') {
                swiper.slideTo(swiper.realIndex - 1);
            }
        }
    } else if (isAtBottom) {
        if (direction === 'up') {
            swiper.slideTo(swiper.realIndex + 1);
        }
    }
};

const addPageClick = (index, swiper) => {
    $(`.page_p${index + 1}`).on('click', () => {
        swiper.slideTo(index);
    });
};

const addAnimateClass = (arr) => {
    arr.forEach(ele => $(ele).addClass('animate'));
};

const openVideo = (video, path) => {
    $('.plate_modal').toggleClass('-active');
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--youtube').toggleClass('hide');
    $('.modal_box_veil').toggleClass('-hide');
    if (video) {
        $('.modal_source').append(
            `<iframe width="auto" height="auto" class="modal_youtube youtube--2"
        src="https://www.youtube.com/embed/${video}?si=1_stAmmA1RL7LFrt"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>`);
    } else if (path) {
        $('.modal_source').append(
            `<video class="modal_youtube youtube--2" loop autoplay playsinline controls controlslist="nodownload" preload="metadata"><source src=${path} type="video/mp4"></video>`);
    }
};

function openDialog() {
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--reward').toggleClass('hide');
    document.getElementById("dialog").style.display = "block";
}

function closeDialog() {
    $('.modal.type--reward').toggleClass('hide');
    $('.modal').css('opacity', '0');
    document.getElementById("dialog").style.display = "none";
}
