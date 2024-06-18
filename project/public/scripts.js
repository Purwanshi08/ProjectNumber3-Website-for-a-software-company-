document.getElementById('customer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Add code to handle form submission and send data to backend
});

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Add code to handle feedback form submission and send data to backend
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-hidden');
    
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
