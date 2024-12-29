let startY = 0;
// (function (d) {
//     var config = {
//         kitId: 'gof2byk',
//         scriptTimeout: 3000,
//         async: true
//     },
//         h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"; }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
// })(document);

$(document).ready(() => {
    $('.modal_wrap').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
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

    const pcSwiper = () => {
        const swiper = new Swiper('.section-pages', {
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
                    // const removeAnimate = ['#p1Video', '.detail_p1', '.title', '.detail_p2', '.title', '.title_p2', '.dimmed_p2', '.title_p3', '.detail_p3', '.title_p4', '.bg_p4', '.visible-roomy'];
                    // removeAnimate.forEach(ele => $(ele).removeClass('animate'));
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
        swiper.slideTo(0);
        $('.depth_1')[0].classList.add('active');
        $('.depth_1')[0].classList.add('point');

        for (let i = 0; i < 8; i++) {
            addPageClick(i, swiper);
        }
    };

    const p2Child1Swiper = () => {
        new Swiper('.nested-swiper-child1', {
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
        new Swiper('.nested-swiper-child2', {
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
                nextEl: '.nested-swiper-child2 .swiper-button-next',
                prevEl: '.nested-swiper-child2 .swiper-button-prev',
            },
            on: {
                init: (swiper) => {
                    $('.progress1').on('click', () => {
                        swiper.slideTo(0);
                    });
                    $('.progress2').on('click', () => {
                        swiper.slideTo(1);
                    });
                    $('.progress3').on('click', () => {
                        swiper.slideTo(2);
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
        new Swiper('.nested-swiper', {
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
        new Swiper('.section-pages', {
            direction: 'vertical',
            slidesPerView: "auto",
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
                enabled: false,
            },
            loop: false,
            freeMode: {
                enabled: false,
                sticky: false,
                momentumBounce: false,
            },
            slideActiveClass: 'animated',
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
        pcSwiper();
        $('.section_main .content .video-open').on('click', () => {
            openVideo("", "../img/page8/p8_pc.mp4");
        });
    
        $('.section_soon .content .item.item1').on('click', () => {
            openVideo("", "../img/page8/p8_pc.mp4");
        });
    } else {
        $('.event_gnb').toggleClass('type_default');
        $('.event_gnb').toggleClass('type_clear');
        mobileSwiper();
        p2Child2Swiper();
        $('.section_main .content .video-open').on('click', () => {
            openVideo("", "../img/page8/p8_m.mp4");
        });
    
        $('.section_soon .content .item.item1').on('click', () => {
            openVideo("", "../img/page8/p8_m.mp4");
        });
    }
    p2Child1Swiper();
    p6Swiper();

    let currentPage = 1;
    const pageSize = 10;
    let data = [{
        name: "英雄造型_坐騎招喚禮物選擇箱",
        count: 188,
    }, {
        name: "閃亮的解除侵襲卷軸選擇箱",
        count: 99,
    }, {
        name: "Lv55英雄防具_飾品選擇箱",
        count: 172,
    }, {
        name: "Lv55英雄特別的強化卷軸選擇箱",
        count: 203,
    }, {
        name: "稀有特別的武器強化卷軸",
        count: 366,
    }, {
        name: "稀有特別的飾品強化卷軸",
        count: 366,
    }, {
        name: "閃亮的解除侵蝕卷軸選擇箱",
        count: 156,
    }, {
        name: "造型召喚最高級禮物(11次)",
        count: 1107,
    }, {
        name: "Lv55英雄武器選擇箱",
        count: 210,
    }, {
        name: "英雄造型_坐騎召喚禮物選擇箱",
        count: 300,
    }, {
        name: "英雄造型_坐騎招喚禮物選擇箱",
        count: 188,
    }, {
        name: "閃亮的解除侵襲卷軸選擇箱",
        count: 99,
    }, {
        name: "Lv55英雄防具_飾品選擇箱",
        count: 172,
    }, {
        name: "Lv55英雄特別的強化卷軸選擇箱",
        count: 203,
    }, {
        name: "稀有特別的武器強化卷軸",
        count: 366,
    }, {
        name: "稀有特別的飾品強化卷軸",
        count: 366,
    }, {
        name: "閃亮的解除侵蝕卷軸選擇箱",
        count: 156,
    }, {
        name: "造型召喚最高級禮物(11次)",
        count: 1107,
    }, {
        name: "Lv55英雄武器選擇箱",
        count: 210,
    }, {
        name: "英雄造型_坐騎召喚禮物選擇箱",
        count: 300,
    }, {
        name: "Lv55英雄武器選擇箱",
        count: 210,
    }, {
        name: "英雄造型_坐騎召喚禮物選擇箱",
        count: 300,
    }, {
        name: "Lv55英雄武器選擇箱",
        count: 210,
    }, {
        name: "英雄造型_坐騎召喚禮物選擇箱",
        count: 300,
    }]
    const totalPages = Math.ceil(data.length / pageSize);

    function renderTable() {
        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;
        const pageData = data.slice(start, end);

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
            `<video class="modal_youtube youtube--2" loop="" autoplay="" playsinline="" controls="" controlslist="nodownload" preload="metadata"><source src=${path}></video>`);
    }
};

function openDialog() {
    $('.modal.type--reward').toggleClass('hide');
    document.getElementById("dialog").style.display = "block";
}

function closeDialog() {
    $('.modal.type--reward').toggleClass('hide');
    document.getElementById("dialog").style.display = "none";
}
