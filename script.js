// Регулярний вираз для валідації email
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Отримуємо елементи DOM
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const errorMessage = document.getElementById('errorMessage');
const subscriptionForm = document.getElementById('subscriptionForm');
const successDialog = document.getElementById('successDialog');
const userEmailSpan = document.getElementById('userEmail');
const thanksButton = document.getElementById('thanksButton');

// Функція для валідації email
function validateEmail(email) {
    return emailRegex.test(email);
}

// Функція для показу помилки
function showError() {
    emailInput.classList.add('error');
    errorMessage.classList.add('show');
}

// Функція для приховування помилки
function hideError() {
    emailInput.classList.remove('error');
    errorMessage.classList.remove('show');
}

// Функція для показу success dialog
function showSuccessDialog(email) {
    // Встановлюємо email користувача в повідомлення
    userEmailSpan.textContent = email;
    
    // Приховуємо форму
    subscriptionForm.classList.add('hidden');
    
    // Показуємо dialog
    successDialog.showModal();
}

// Функція для закриття dialog та скидання форми
function closeSuccessDialog() {
    successDialog.close();
    subscriptionForm.classList.remove('hidden');
    emailInput.value = '';
    hideError();
}

// Обробник події submit форми
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Перевірка на порожнє поле
    if (!email) {
        showError();
        return;
    }
    
    // Валідація email
    if (validateEmail(email)) {
        hideError();
        showSuccessDialog(email);
    } else {
        showError();
    }
});

// Обробник події input для приховування помилки під час введення
emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
        const email = emailInput.value.trim();
        if (email && validateEmail(email)) {
            hideError();
        }
    }
});

// Обробник події для кнопки "Thanks!"
thanksButton.addEventListener('click', function() {
    closeSuccessDialog();
});

// Обробник події для закриття dialog при кліку на backdrop
successDialog.addEventListener('click', function(e) {
    if (e.target === successDialog) {
        closeSuccessDialog();
    }
});

// Обробник події для закриття dialog при натисканні Escape
successDialog.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessDialog();
    }
});

