document.addEventListener('DOMContentLoaded', function() {
    const catPhotoForm = document.querySelector('form');
    const catPhotoContainer = document.getElementById('catPhotoContainer');

    
    loadFormData();

    catPhotoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        
        const catPhotoUrl = catPhotoForm.catphotourl.value;
        if (catPhotoUrl) {
            const newCatPhotoContainer = document.createElement('div');
            newCatPhotoContainer.className = 'image-container';
            const newCatPhoto = document.createElement('img');
            newCatPhoto.src = catPhotoUrl;
            newCatPhoto.alt = 'New cat photo';
            newCatPhotoContainer.appendChild(newCatPhoto);
            catPhotoContainer.appendChild(newCatPhotoContainer); // Append new container
            catPhotoContainer.classList.add('show'); // Show the container
            catPhotoForm.reset(); // Reset the form

            
            saveFormData(catPhotoUrl);
        }
    });

    
    function saveFormData(catPhotoUrl) {
        const indoorOutdoor = document.querySelector('input[name="indoor-outdoor"]:checked').value;
        const personality = Array.from(document.querySelectorAll('input[name="personality"]:checked')).map(input => input.value);

        const formData = {
            indoorOutdoor,
            personality,
            catPhotoUrl
        };

        let allFormData = JSON.parse(localStorage.getItem('allCatFormData')) || [];
        allFormData.push(formData);
        localStorage.setItem('allCatFormData', JSON.stringify(allFormData));
    }

    
    function loadFormData() {
        const savedData = JSON.parse(localStorage.getItem('allCatFormData'));
        if (savedData && savedData.length > 0) {
            catPhotoContainer.classList.add('show'); // Show the container if there's saved data
            savedData.forEach(formData => {
                const newCatPhotoContainer = document.createElement('div');
                newCatPhotoContainer.className = 'image-container';
                const newCatPhoto = document.createElement('img');
                newCatPhoto.src = formData.catPhotoUrl;
                newCatPhoto.alt = 'New cat photo';
                newCatPhotoContainer.appendChild(newCatPhoto);
                catPhotoContainer.appendChild(newCatPhotoContainer);

                document.querySelector(`input[name="indoor-outdoor"][value="${formData.indoorOutdoor}"]`).checked = true;
                formData.personality.forEach(value => {
                    document.querySelector(`input[name="personality"][value="${value}"]`).checked = true;
                });
            });
        }
    }
});
