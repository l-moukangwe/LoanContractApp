// Add an event listener to the form submission
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    // Your form submission logic here
    // For example, display a success message
    document.getElementById("success-message").style.display = "block";
    // Clear the form (optional)
    this.reset();
    // Return false to prevent redirection
    return false;
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbwdh1jXglzfns0mdaP_rDV09NeZ8OwF6OVpDmFv0e0P27noLYL2iFSv13NLbSdty2O0_w/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Submition Success"))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
})


