document.addEventListener('DOMContentLoaded', function() {
    // Get the user's preferred language from local storage
    var preferredLanguage = localStorage.getItem('preferredLanguage');
  
    // Function to dynamically translate the page
    function translatePage(selectedLanguage) {
      var translator = new google.translate.TranslateElement({ 
        pageLanguage: 'en', // Set default page language
        includedLanguages: selectedLanguage, 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE 
      }, 'google_translate_element');
      translator.showBanner(false);
    }
  
    // Apply translation based on the user's preference
    if (preferredLanguage) {
      translatePage(preferredLanguage);
    }
  });
  