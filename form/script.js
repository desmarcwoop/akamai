document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');
  const steps = document.querySelectorAll('.form-step');
  const progressBar = document.querySelector('.progress');
  const stepIndicators = document.querySelectorAll('.step');
  const confirmation = document.getElementById('confirmation');
  
  let currentStep = 1;
  const totalSteps = steps.length;

  // Update progress bar and step indicators
  const updateProgress = () => {
    const progress = (currentStep - 1) / (totalSteps - 1) * 100;
    progressBar.style.width = `${progress}%`;
    
    stepIndicators.forEach((step, index) => {
      if (index + 1 === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  };

  // Show current step
  const showStep = (step) => {
    steps.forEach(s => s.classList.remove('active'));
    steps[step - 1].classList.add('active');
    currentStep = step;
    updateProgress();
  };

  // Next button click handler
  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    }
  };

  // Previous button click handler
  const handlePrev = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const currentStepElement = steps[step - 1];
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
      if (!field.value) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });

    return isValid;
  };

  // Add event listeners to next buttons
  document.querySelectorAll('.btn-next').forEach(button => {
    button.addEventListener('click', handleNext);
  });

  // Add event listeners to previous buttons
  document.querySelectorAll('.btn-prev').forEach(button => {
    button.addEventListener('click', handlePrev);
  });

  // Helper function to convert File to base64
  const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // Supprime "data:text/plain;base64,"
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };
  

  // Helper function to convert FormData to JSON with base64 images
  const formDataToJSON = async (formData) => {
    const object = {};
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.type.startsWith('image/')) {
          try {
            object[key] = await fileToBase64(value);
          } catch (error) {
            console.error('Error converting file to base64:', error);
            object[key] = 'Error converting file';
          }
        } else {
          object[key] = value.name;
        }
      } else {
        object[key] = value;
      }
    }
    return object;
  };

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const formData = new FormData(form);
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.innerHTML = 'Envoi en cours...';
      form.appendChild(loadingIndicator);
      
      try {
        const jsonData = await formDataToJSON(formData);
        
        const response = await fetch('https://n8n-tgls.onrender.com/webhook/8252df51-59d5-4026-9efb-cf1b13172087', {
          method: 'POST',
          body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Show confirmation message
        form.style.display = 'none';
        confirmation.classList.remove('hidden');
      } catch (error) {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
      } finally {
        loadingIndicator.remove();
      }
    }
  });

  // File input preview
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Remove any existing preview
        const existingPreview = input.parentNode.querySelector('.file-preview');
        if (existingPreview) {
          existingPreview.remove();
        }
        
        // Add new preview
        const preview = document.createElement('div');
        preview.className = 'file-preview';
        preview.textContent = `Fichier sélectionné : ${file.name}`;
        input.parentNode.appendChild(preview);
      }
    });
  });

  // Initialize form
  showStep(1);
});