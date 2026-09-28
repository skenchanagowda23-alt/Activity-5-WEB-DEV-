function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const demoElement = document.getElementById('demo');
    if (demoElement) {
        demoElement.textContent = "Welcome to IPL 2026! The Indian Premier League brings the ultimate T20 cricketing action to your favorite stadiums. Get ready to witness breathtaking matches, star players, and unforgettable moments as the top franchises battle for the ultimate championship.";
    }

    const bookButtons = document.querySelectorAll('#matches table a[href="#booking"]');
    const bookingSection = document.querySelector('#booking');

    bookButtons.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            showToast('Ready to book! Please fill out the form below.');
        });
    });

    const matchSelect = document.getElementById('match');
    const standSelect = document.getElementById('stand');
    const qtyInput = document.getElementById('quantity');
    
    const sumMatch = document.getElementById('sum-match');
    const sumDate = document.getElementById('sum-date');
    const sumVenue = document.getElementById('sum-venue');
    const sumStand = document.getElementById('sum-stand');
    const sumPrice = document.getElementById('sum-price');
    const sumQty = document.getElementById('sum-qty');
    const sumTotal = document.getElementById('sum-total');

    function updateSummary() {
        const selectedMatchOption = matchSelect.options[matchSelect.selectedIndex];
        const selectedStandOption = standSelect.options[standSelect.selectedIndex];
        const qty = parseInt(qtyInput.value) || 1;

        if (matchSelect.value) {
            sumMatch.textContent = selectedMatchOption.value;
            sumDate.textContent = selectedMatchOption.getAttribute('data-date');
            sumVenue.textContent = selectedMatchOption.getAttribute('data-venue');
        } else {
            sumMatch.textContent = '-';
            sumDate.textContent = '-';
            sumVenue.textContent = '-';
        }

        let price = 0;
        if (standSelect.value) {
            sumStand.textContent = selectedStandOption.value;
            price = parseInt(selectedStandOption.getAttribute('data-price'));
            sumPrice.textContent = '₹' + price;
        } else {
            sumStand.textContent = '-';
            sumPrice.textContent = '₹0';
        }

        sumQty.textContent = qty;
        sumTotal.textContent = '₹' + (price * qty);
    }

    matchSelect.addEventListener('change', updateSummary);
    standSelect.addEventListener('change', updateSummary);
    qtyInput.addEventListener('input', updateSummary);
    qtyInput.addEventListener('change', updateSummary);

    const bookingForm = document.getElementById('ticket-form');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Ticket confirmed successfully!');
            bookingForm.reset();
            updateSummary(); 
        });
    }
});
