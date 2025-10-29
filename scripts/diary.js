// diary.js
document.addEventListener('DOMContentLoaded', function() {
    const diaryForm = document.getElementById('diaryForm');
    const timeline = document.querySelector('.timeline');

    // Обработка отправки формы
    diaryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получаем данные из формы
        const date = document.getElementById('entryDate').value;
        const title = document.getElementById('entryTitle').value;
        const description = document.getElementById('entryDescription').value;
        const status = document.getElementById('entryStatus').value;

        // Форматируем дату
        const formattedDate = formatDate(date);

        // Создаем новую запись
        addTimelineItem(formattedDate, title, description, status);

        // Очищаем форму
        diaryForm.reset();

        // Показываем уведомление
        showNotification('Запись успешно добавлена!');
    });

    // Функция форматирования даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = getMonthName(date.getMonth());
        return `${day} ${month}`;
    }

    // Функция получения названия месяца
    function getMonthName(monthIndex) {
        const months = [
            'янв', 'фев', 'мар', 'апр', 'май', 'июн',
            'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
        ];
        return months[monthIndex];
    }

    // Функция добавления новой записи в таймлайн
    function addTimelineItem(date, title, description, status) {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${status}`;

        // Определяем текст статуса
        let statusText = '';
        let statusClass = '';
        switch(status) {
            case 'completed':
                statusText = '✓ Выполнено';
                statusClass = 'completed';
                break;
            case 'in-progress':
                statusText = 'In progress';
                statusClass = 'in-progress';
                break;
            case 'planned':
                statusText = 'Запланировано';
                statusClass = 'planned';
                break;
        }

        timelineItem.innerHTML = `
            <div class="timeline-date">${date}</div>
            <div class="timeline-content">
                <h3 class="timeline-title">${title}</h3>
                <p class="timeline-description">${description}</p>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
        `;

        // Добавляем запись в начало таймлайна
        timeline.insertBefore(timelineItem, timeline.firstChild);

        // Добавляем анимацию появления
        setTimeout(() => {
            timelineItem.style.opacity = '1';
            timelineItem.style.transform = 'translateY(0)';
        }, 100);
    }

    // Функция показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        // Автоматическое скрытие через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Инициализация даты в форме (текущая дата)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;
});