// Enhanced form validation and functionality for Mingle Partner Onboarding
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('button[type="submit"]');

    // Fetch and populate agencies dropdown
    async function loadAgencies() {
        const agencySelect = document.getElementById('agencyId');
        if (!agencySelect) return;

        try {
            const response = await fetch('https://nemesistech.in/api/v1/agency/get-all-agency');
            const data = await response.json();

            if (data.success && data.data) {
                // Clear existing options except the first one if it's a placeholder
                agencySelect.innerHTML = '<option value="">Select an agency</option>';

                // Add agencies from API
                data.data.forEach(agency => {
                    const option = document.createElement('option');
                    option.value = agency._id;
                    option.textContent = agency.name;
                    agencySelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading agencies:', error);
            // Keep default options if API fails
        }
    }

    // Load agencies on page load
    loadAgencies();

    // Phone number formatting
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');

            // Limit to 10 digits for most countries
            if (value.length > 10) {
                value = value.slice(0, 10);
            }

            e.target.value = value;
        });
    }

    // Language dropdown handling with animations
    const languageDropdownButton = document.getElementById('languageDropdownButton');
    const languageDropdown = document.getElementById('languageDropdown');
    const selectedLanguagesSpan = document.getElementById('selectedLanguages');
    const languageHiddenInput = document.getElementById('language');
    const dropdownArrow = document.getElementById('dropdownArrow');

    if (languageDropdownButton && languageDropdown) {
        const checkboxes = languageDropdown.querySelectorAll('input[type="checkbox"]');

        // Handle checkbox changes with smooth animations
        checkboxes.forEach((checkbox, index) => {
            // Add click handler to the parent div for better UX
            const parentDiv = checkbox.closest('.flex');
            if (parentDiv) {
                parentDiv.addEventListener('click', function (e) {
                    if (e.target !== checkbox) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
            }

            checkbox.addEventListener('change', function () {
                // Add visual feedback
                const parentDiv = this.closest('.flex');
                if (this.checked) {
                    parentDiv.classList.add('bg-primary-100', 'border-primary-200');
                    parentDiv.style.transform = 'scale(1.02)';
                } else {
                    parentDiv.classList.remove('bg-primary-100', 'border-primary-200');
                    parentDiv.style.transform = 'scale(1)';
                }

                // Update selected languages
                const selectedLanguages = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);

                // Update display text with animation
                if (selectedLanguages.length === 0) {
                    selectedLanguagesSpan.textContent = 'Select languages';
                    selectedLanguagesSpan.className = 'text-gray-500';
                    languageDropdownButton.classList.remove('border-primary-300', 'bg-primary-50');
                } else if (selectedLanguages.length === 1) {
                    selectedLanguagesSpan.textContent = selectedLanguages[0];
                    selectedLanguagesSpan.className = 'text-gray-900 font-medium';
                    languageDropdownButton.classList.add('border-primary-300', 'bg-primary-50');
                } else if (selectedLanguages.length <= 3) {
                    selectedLanguagesSpan.textContent = selectedLanguages.join(', ');
                    selectedLanguagesSpan.className = 'text-gray-900 font-medium';
                    languageDropdownButton.classList.add('border-primary-300', 'bg-primary-50');
                } else {
                    selectedLanguagesSpan.textContent = `${selectedLanguages.length} languages selected`;
                    selectedLanguagesSpan.className = 'text-gray-900 font-medium';
                    languageDropdownButton.classList.add('border-primary-300', 'bg-primary-50');
                }

                // Update hidden input
                if (languageHiddenInput) {
                    languageHiddenInput.value = selectedLanguages.join(',');
                }

                // Remove error styling if languages are selected
                if (selectedLanguages.length > 0) {
                    languageDropdownButton.classList.remove('border-red-500');
                }
            });
        });

        // Close dropdown when clicking outside with animation
        document.addEventListener('click', function (event) {
            if (!languageDropdownButton.contains(event.target) && !languageDropdown.contains(event.target)) {
                closeDropdown();
            }
        });

        // Toggle dropdown with smooth animation
        languageDropdownButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (languageDropdown.classList.contains('hidden')) {
                openDropdown();
            } else {
                closeDropdown();
            }
        });

        function openDropdown() {
            languageDropdown.classList.remove('hidden');
            languageDropdown.style.opacity = '0';
            languageDropdown.style.transform = 'translateY(-10px)';
            dropdownArrow.style.transform = 'rotate(180deg)';

            // Animate in
            setTimeout(() => {
                languageDropdown.style.transition = 'all 0.2s ease-out';
                languageDropdown.style.opacity = '1';
                languageDropdown.style.transform = 'translateY(0)';
            }, 10);
        }

        function closeDropdown() {
            languageDropdown.style.transition = 'all 0.2s ease-in';
            languageDropdown.style.opacity = '0';
            languageDropdown.style.transform = 'translateY(-10px)';
            dropdownArrow.style.transform = 'rotate(0deg)';

            setTimeout(() => {
                languageDropdown.classList.add('hidden');
            }, 200);
        }
    }

    // Age validation with smooth feedback
    const ageInput = document.getElementById('age');
    const dobInput = document.getElementById('dob');

    if (ageInput && dobInput) {
        // Auto-calculate age from DOB with animation
        dobInput.addEventListener('change', function () {
            const birthDate = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age >= 18 && age <= 100) {
                ageInput.value = age;
                // Add success animation
                ageInput.style.transform = 'scale(1.02)';
                ageInput.classList.add('border-green-300', 'bg-green-50');
                setTimeout(() => {
                    ageInput.style.transform = 'scale(1)';
                    ageInput.classList.remove('border-green-300', 'bg-green-50');
                }, 300);
            }
        });

        // Validate age input with visual feedback
        ageInput.addEventListener('input', function () {
            const age = parseInt(this.value);
            if (age < 18) {
                this.setCustomValidity('You must be at least 18 years old to register.');
                this.classList.add('border-red-500', 'bg-red-50');
            } else if (age > 100) {
                this.setCustomValidity('Please enter a valid age.');
                this.classList.add('border-red-500', 'bg-red-50');
            } else {
                this.setCustomValidity('');
                this.classList.remove('border-red-500', 'bg-red-50');
                this.classList.add('border-green-300', 'bg-green-50');
                setTimeout(() => {
                    this.classList.remove('border-green-300', 'bg-green-50');
                }, 1000);
            }
        });
    }

    // Enhanced form submission with beautiful loading animation
    if (form && submitBtn) {
        form.addEventListener('submit', function (e) {
            // Special validation for language dropdown
            const languageValue = languageHiddenInput ? languageHiddenInput.value : '';
            if (!languageValue || languageValue.trim() === '') {
                e.preventDefault();
                showNotification('Please select at least one language.', 'error');
                if (languageDropdownButton) {
                    languageDropdownButton.classList.add('border-red-500');
                    languageDropdownButton.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        languageDropdownButton.style.animation = '';
                    }, 500);
                }
                return;
            } else if (languageDropdownButton) {
                languageDropdownButton.classList.remove('border-red-500');
            }

            // Validate other required fields with smooth animations
            const requiredFields = form.querySelectorAll('[required]:not(#language)');
            let isValid = true;

            requiredFields.forEach((field, index) => {
                setTimeout(() => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('border-red-500');
                        field.style.animation = 'shake 0.5s ease-in-out';
                        setTimeout(() => {
                            field.style.animation = '';
                        }, 500);
                    } else {
                        field.classList.remove('border-red-500');
                        field.classList.add('border-green-300');
                        setTimeout(() => {
                            field.classList.remove('border-green-300');
                        }, 1000);
                    }
                }, index * 50); // Stagger the validation animations
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Show beautiful loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating your profile...
                </div>
            `;
            submitBtn.disabled = true;
            submitBtn.classList.add('cursor-not-allowed', 'opacity-75');

            // Re-enable button after timeout in case of error
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('cursor-not-allowed', 'opacity-75');
            }, 15000);
        });
    }

    // Auto-hide alerts with smooth animation
    const alerts = document.querySelectorAll('[class*="bg-red-50"], [class*="bg-green-50"]');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'all 0.5s ease-out';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px) scale(0.95)';
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 8000);
    });

    // Enhanced notification system with beautiful animations
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200';
        const textColor = type === 'error' ? 'text-red-800' : 'text-blue-800';
        const iconColor = type === 'error' ? 'text-red-400' : 'text-blue-400';

        notification.className = `fixed top-4 right-4 p-4 ${bgColor} border-2 rounded-xl shadow-2xl z-50 transition-all duration-500 transform translate-x-full max-w-sm`;
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    ${type === 'error' ?
                '<svg class="h-5 w-5 ' + iconColor + '" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>' :
                '<svg class="h-5 w-5 ' + iconColor + '" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>'
            }
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium ${textColor}">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in with bounce effect
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
        }, 100);

        // Auto remove with smooth animation
        setTimeout(() => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 6000);
    }

    // Mobile responsive enhancements with smooth transitions
    function handleMobileView() {
        const isMobile = window.innerWidth < 768;

        // Adjust dropdown positioning on mobile
        if (languageDropdown && isMobile) {
            languageDropdown.style.position = 'fixed';
            languageDropdown.style.left = '1rem';
            languageDropdown.style.right = '1rem';
            languageDropdown.style.width = 'auto';
            languageDropdown.style.maxHeight = '50vh';
        } else if (languageDropdown) {
            languageDropdown.style.position = 'absolute';
            languageDropdown.style.left = '';
            languageDropdown.style.right = '';
            languageDropdown.style.width = '';
            languageDropdown.style.maxHeight = '16rem';
        }

        // Adjust form animations for mobile
        const animatedElements = document.querySelectorAll('.animate-slide-up');
        if (isMobile) {
            animatedElements.forEach(el => {
                el.style.animationDelay = '0s';
                el.style.animationDuration = '0.3s';
            });
        }
    }

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleMobileView, 100);
    });
    handleMobileView(); // Initial call

    // Initialize form with better UX
    setTimeout(() => {
        // Pre-select English as default language for better UX
        const englishCheckbox = languageDropdown?.querySelector('input[value="English"]');
        if (englishCheckbox && !languageHiddenInput?.value) {
            englishCheckbox.checked = true;
            englishCheckbox.dispatchEvent(new Event('change'));
        }

        // Add focus animations to all inputs
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease-out';
            });

            input.addEventListener('blur', function () {
                this.style.transform = 'scale(1)';
            });
        });
    }, 500);

    // Add shake animation for validation errors
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Add success feedback for form completion
    function showSuccessFeedback() {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        successDiv.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce-in">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Welcome to Mingle!</h3>
                <p class="text-gray-600">Your partner profile is being created...</p>
            </div>
        `;
        document.body.appendChild(successDiv);
    }

    // Show success feedback on form submission
    if (form) {
        form.addEventListener('submit', function () {
            setTimeout(showSuccessFeedback, 1000);
        });
    }
});