document.addEventListener('DOMContentLoaded', function() {
            const serviceCards = document.querySelectorAll('.service-card');
            const serviceContents = document.querySelectorAll('.service-content');

            // Initially select the first service and show its content
            let selectedService = 'Bedroom';

            // Handle card clicks
            serviceCards.forEach(card => {
                card.addEventListener('click', () => {
                    const service = card.getAttribute('data-service');
                    // If same card clicked again → do nothing (keep it selected)
                    if (selectedService === service) {
                        return;
                    }

                    // Deselect previous
                    const prevCard = document.querySelector(`.service-card[data-service="${selectedService}"]`);
                    if (prevCard) {
                        prevCard.classList.remove('selected');
                        prevCard.style.borderColor = '#e5e7eb';
                        prevCard.style.backgroundColor = '#ffffff';
                    }

                    // Select new
                    card.classList.add('selected');
                    card.style.borderColor = '#2563eb';
                    card.style.backgroundColor = '#f0f9ff';
                    selectedService = service;

                    // Show correct content
                    hideAllContents();
                    const content = document.querySelector(`.service-content[data-service="${service}"]`);
                    console.log(content)
                    if (content) content.classList.remove('hidden');
                });
            });

            // Hide all content sections except the initially selected one
            function hideAllContents() {
            
                serviceContents.forEach(content => {
                    content.classList.add('hidden');
                });
            }
        });