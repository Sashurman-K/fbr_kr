// projects.js
document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Модальные окна
    const projectCardsElements = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close');

    // Открытие модального окна при клике на карточку проекта
    projectCardsElements.forEach((card, index) => {
        card.addEventListener('click', function() {
            const modalId = `modal-project-${index + 1}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
            }
        });
    });

    // Закрытие модального окна
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Восстанавливаем скролл
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Переключение миниатюр в галерее
    const thumbnails = document.querySelectorAll('.modal__thumbnails img');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const mainImage = this.closest('.modal__gallery').querySelector('.modal__main-image img');
            const mainImageSrc = mainImage.getAttribute('src');
            const thumbSrc = this.getAttribute('src');

            // Меняем местами изображения
            mainImage.setAttribute('src', thumbSrc);
            this.setAttribute('src', mainImageSrc);

            // Обновляем активную миниатюру
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
});