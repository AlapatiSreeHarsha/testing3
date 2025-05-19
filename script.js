// Background slider images
const backgroundImages = [
	'https://images.pexels.com/photos/1496372/pexels-photo-1496372.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1039083/pexels-photo-1039083.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
];

let currentImageIndex = 0;
const sliderContainer = document.querySelector('.slider-container');

function changeBackground() {
    const img = new Image();
    img.src = backgroundImages[currentImageIndex];
    img.onload = () => {
        sliderContainer.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    };
}

// Change background every 5 seconds
changeBackground();
setInterval(changeBackground, 5000);

// Form elements
const form = document.getElementById('registrationForm');
const formElements = {
    firstName: document.getElementById('firstName'),
    middleName: document.getElementById('middleName'),
    lastName: document.getElementById('lastName'),
    fullName: document.getElementById('fullName'),
    country: document.getElementById('country'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    dob: document.getElementById('dob'),
    photo: document.getElementById('photo'),
    address: document.getElementById('address'),
    terms: document.getElementById('terms')
};

// Validation patterns
const patterns = {
    name: /^[A-Za-z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: {
        IN: /^\d{10}$/,
        US: /^\d{3}-\d{3}-\d{4}$/
    },
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
};

// Error handling
function showError(element, message, duration = 3000) {
    const errorElement = document.getElementById(`${element.id}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        element.classList.add('error-border');

        setTimeout(() => {
            errorElement.textContent = '';
            element.classList.remove('error-border');
        }, duration);
    }
}

// Name handling
function updateFullName() {
    const names = [
        formElements.firstName.value.trim(),
        formElements.middleName.value.trim(),
        formElements.lastName.value.trim()
    ].filter(Boolean);

    formElements.fullName.value = names.join(' ');
}

[formElements.firstName, formElements.middleName, formElements.lastName].forEach(input => {
    input.addEventListener('input', (e) => {
        const value = e.target.value.trim();

        if (input.required && value.length < 3) {
            showError(input, 'Minimum 3 characters required');
        } else if (!patterns.name.test(value) && value !== '') {
            showError(input, 'Only letters allowed');
            input.value = value.replace(/[^A-Za-z\s]/g, '');
        }

        updateFullName();
    });
});

// Phone number formatting
formElements.country.addEventListener('change', () => {
    formElements.phone.value = '';
    if (formElements.country.value === 'US') {
        formElements.phone.placeholder = 'XXX-XXX-XXXX';
    } else if (formElements.country.value === 'IN') {
        formElements.phone.placeholder = '10 digits';
    }
});

formElements.phone.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, '');

    if (formElements.country.value === 'US') {
        if (value.length <= 10) {
            const parts = [
                value.slice(0, 3),
                value.slice(3, 6),
                value.slice(6, 10)
            ].filter(Boolean);
            formElements.phone.value = parts.join('-');
        }
    } else if (formElements.country.value === 'IN') {
        formElements.phone.value = value.slice(0, 10);
    }
});

// Password handling
const togglePassword = document.getElementById('togglePassword');
togglePassword.addEventListener('click', () => {
    const type = formElements.password.type === 'password' ? 'text' : 'password';
    formElements.password.type = type;
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

formElements.password.addEventListener('input', (e) => {
    const value = e.target.value;
    const strength = {
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[@$!%*?&]/.test(value),
        length: value.length >= 6
    };

    const strengthElement = document.getElementById('passwordStrength');
    const strengthChecks = Object.values(strength).filter(Boolean).length;

    let strengthText = '';
    let strengthColor = '';

    if (strengthChecks <= 2) {
        strengthText = 'Weak';
        strengthColor = '#dc2626';
    } else if (strengthChecks <= 4) {
        strengthText = 'Moderate';
        strengthColor = '#f59e0b';
    } else {
        strengthText = 'Strong';
        strengthColor = '#16a34a';
    }

    strengthElement.textContent = `Password Strength: ${strengthText}`;
    strengthElement.style.color = strengthColor;
});

// Age calculation
formElements.dob.addEventListener('change', () => {
    const birthDate = new Date(formElements.dob.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    document.getElementById('age').textContent = `Age: ${age} years`;
});

// Address handling
formElements.address.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\d/g, '');
});

// Photo validation
formElements.photo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 51200) {
            showError(formElements.photo, 'File size should be less than 50KB');
            formElements.photo.value = '';
        } else {
            const fileName = file.name;
            const fileLabel = formElements.photo.nextElementSibling.querySelector('span');
            fileLabel.textContent = fileName;
        }
    }
});

// Form reset
document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
        form.reset();
        document.getElementById('age').textContent = '';
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('.error-border').forEach(element => {
            element.classList.remove('error-border');
        });
        document.getElementById('passwordStrength').textContent = '';
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate all required fields
    Object.entries(formElements).forEach(([key, element]) => {
        if (element.required && !element.value) {
            showError(element, `${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
            isValid = false;
        }
    });

    // Specific validations
    if (!patterns.name.test(formElements.firstName.value) || formElements.firstName.value.length < 3) {
        showError(formElements.firstName, 'Invalid first name');
        isValid = false;
    }

    if (formElements.middleName.value && !patterns.name.test(formElements.middleName.value)) {
        showError(formElements.middleName, 'Invalid middle name');
        isValid = false;
    }

    if (!patterns.name.test(formElements.lastName.value) || formElements.lastName.value.length < 3) {
        showError(formElements.lastName, 'Invalid last name');
        isValid = false;
    }

    if (!patterns.phone[formElements.country.value]?.test(formElements.phone.value)) {
        showError(formElements.phone, 'Invalid phone number format');
        isValid = false;
    }

    if (!patterns.email.test(formElements.email.value)) {
        showError(formElements.email, 'Invalid email address');
        isValid = false;
    }

    if (!patterns.password.test(formElements.password.value)) {
        showError(formElements.password, 'Password must meet all requirements');
        isValid = false;
    }

    const selectedHobbies = document.querySelectorAll('input[name="hobbies"]:checked');
    if (selectedHobbies.length < 2) {
        showError(document.querySelector('.checkbox-group'), 'Please select at least two hobbies');
        isValid = false;
    }

    if (isValid && confirm('Are you sure you want to submit the form?')) {
        // Form submission logic here
        alert('Form submitted successfully!');
        form.reset();
        document.getElementById('age').textContent = '';
        document.getElementById('passwordStrength').textContent = '';
    }
});
