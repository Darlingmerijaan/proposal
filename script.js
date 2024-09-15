let currentPage = 0;
const pages = document.querySelectorAll('.page');

// Show the specified page and hide others
function showPage(pageNumber) {
    pages.forEach((page, index) => {
        page.style.display = (index === pageNumber) ? 'block' : 'none';
        // Handle page transition
        page.style.transform = (index < pageNumber) ? 'rotateY(-180deg)' : 'rotateY(0deg)';
    });
    currentPage = pageNumber;
}

// Move to the next page
function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

// Move to the previous page
function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

// Return to the first page
function returnToFirstPage() {
    showPage(0);
}

// Send the thoughts via Formspree
function sendMessage() {
    const message = document.getElementById('thoughts').value;

    if (message.trim() === "") {
        alert("Please write something before sending!");
        return;
    }

    fetch('https://formspree.io/f/xovazkyz', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message
        })
    }).then(response => {
        if (response.ok) {
            document.getElementById('response').innerText = "Your thoughts have been sent successfully!";
            document.getElementById('thoughts').value = "";
        } else {
            document.getElementById('response').innerText = "Failed to send your message. Please try again.";
        }
    }).catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = "Failed to send your message. Please check the console for details.";
    });
}

// Initialize the first page
showPage(currentPage);

// Attach event listeners
document.getElementById('sendThoughts').addEventListener('click', sendMessage);
