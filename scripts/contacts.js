// contacts.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.modal__close, #closeSuccessModal');

    // Элементы формы
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userMessage = document.getElementById('userMessage');

    // Элементы ошибок
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Кнопка отправки
    const submitBtn = contactForm.querySelector('.contact-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Валидация формы
    function validateForm() {
        let isValid = true;

        // Валидация имени
        if (userName.value.trim() === '') {
            showError(userName, nameError, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (userName.value.trim().length < 2) {
            showError(userName, nameError, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        } else {
            clearError(userName, nameError);
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (userEmail.value.trim() === '') {
            showError(userEmail, emailError, 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!emailRegex.test(userEmail.value.trim())) {
            showError(userEmail, emailError, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            clearError(userEmail, emailError);
        }

        // Валидация сообщения
        if (userMessage.value.trim() === '') {
            showError(userMessage, messageError, 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        } else if (userMessage.value.trim().length < 10) {
            showError(userMessage, messageError, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        } else {
            clearError(userMessage, messageError);
        }

        return isValid;
    }

    // Показать ошибку
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Очистить ошибку
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Показать состояние загрузки
    function showLoading() {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
    }

    // Скрыть состояние загрузки
    function hideLoading() {
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }

    // Открыть модальное окно успеха
    function openSuccessModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Закрыть модальное окно
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Обработка отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            showLoading();

            // Имитация отправки данных на сервер
            setTimeout(() => {
                // Здесь обычно будет AJAX запрос к серверу
                console.log('Данные формы:', {
                    name: userName.value.trim(),
                    email: userEmail.value.trim(),
                    message: userMessage.value.trim()
                });

                hideLoading();
                openSuccessModal();
                contactForm.reset();
            }, 2000);
        }
    });

    // Закрытие модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            closeModal(successModal);
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(successModal);
        }
    });

    // Реальная валидация при вводе
    userName.addEventListener('input', function() {
        if (this.value.trim() !== '' && this.value.trim().length >= 2) {
            clearError(this, nameError);
        }
    });

    userEmail.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() !== '' && emailRegex.test(this.value.trim())) {
            clearError(this, emailError);
        }
    });

    userMessage.addEventListener('input', function() {
        if (this.value.trim() !== '' && this.value.trim().length >= 10) {
            clearError(this, messageError);
        }
    });
});