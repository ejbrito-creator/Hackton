(function() {

    var slidersContainer = document.querySelector('.sliders-container');

    var msNumbers = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--numbers',
        range: [1, 4],
        rangeContent: function (i) {
            return '0' + i;
        },
        style: {
            transform: [{scale: [0.4, 1]}],
            opacity: [0, 1]
        },
        interactive: false
    });

    var titles = [
        'Codigo',
        'Seguridad ',
        'Internet',
        'Robotica'
    ];
    var msTitles = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--titles',
        range: [0, 3],
        rangeContent: function (i) {
            return '<h3>'+ titles[i] +'</h3>';
        },
        vertical: true,
        reverse: true,
        style: {
            opacity: [0, 1]
        },
        interactive: false
    });

    var msLinks = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--links',
        range: [0, 3],
        rangeContent: function (i) {
            // Aquí generamos el enlace con un id específico para cada sección
            return '<a class="ms-slide__link" href="#seccion' + i + '">¡Mas Info!</a>';
        },
        vertical: true,
        interactive: false
    });

    var pagination = document.querySelector('.pagination');
    var paginationItems = [].slice.call(pagination.children);

    var msImages = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--images',
        range: [0, 3],
        rangeContent: function () {
            return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
        },
        sync: [msNumbers, msTitles, msLinks],
        style: {
            '.ms-slide__image': {
                transform: [{scale: [1.5, 1]}]
            }
        },
        change: function(newIndex, oldIndex) {
            if (typeof oldIndex !== 'undefined') {
                paginationItems[oldIndex].classList.remove('pagination__item--active');
            }
            paginationItems[newIndex].classList.add('pagination__item--active');
        }
    });

    pagination.addEventListener('click', function(e) {
        if (e.target.matches('.pagination__button')) {
            var index = paginationItems.indexOf(e.target.parentNode);
            msImages.select(index);
        }
    });

})();


// Función para mostrar un elemento si está cerca de la ventana de visualización
function mostrarSeccion(id) {
    const elemento = document.getElementById(id);
    const posicion = elemento.getBoundingClientRect().top;
    const alturaPantalla = window.innerHeight;

    if (posicion < alturaPantalla) {
        elemento.style.display = "block";
    }
}

// Detectar el desplazamiento y mostrar las secciones dinámicas
window.addEventListener("scroll",() => {
    mostrarSeccion("section-3");
    mostrarSeccion("section-4");
});



(function() {
    // Obtiene el botón
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Muestra el botón cuando el usuario se desplace hacia abajo
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";  // Muestra el botón
        } else {
            scrollToTopBtn.style.display = "none";   // Oculta el botón
        }
    };

    // Desplaza la página hacia arriba cuando se hace clic en el botón
    scrollToTopBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
})();