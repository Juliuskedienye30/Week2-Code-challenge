// Get references to form elements and list
const form = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");
const nameInput = document.getElementById("guest-name");
const categoryInput = document.getElementById("guest-category");

// Array to store guest data
let guests = [];

// Listen for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from reloading page

  const name = nameInput.value.trim(); // Get entered name
  const category = categoryInput.value; // Get selected category

  // Limit to 10 guests max
  if (guests.length >= 10) {
    alert("Guest list is full! Maximum 10 guests allowed.");
    return;
  }

  // Create guest object with RSVP as false and no timestamp yet
  const guest = {
    name,              // Guest name
    category,          // Category (Friend/Family/Colleague)
    rsvp: false,       // Default RSVP is false (not attending)
    timestamp: null    // No timestamp initially
  };

  guests.push(guest); // Add guest to the list
  renderGuests();     // Display updated list
  form.reset();       // Clear form inputs
});

// Function to display the guest list
function renderGuests() {
  guestList.innerHTML = ""; // Clear existing list

  guests.forEach((guest, index) => {
    const li = document.createElement("li"); // Create list item

    // Display guest name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = guest.name;

    // Add category badge (color-coded)
    const badge = document.createElement("span");
    badge.className = `badge ${guest.category}`;
    badge.textContent = guest.category;

    // Only show timestamp if guest has RSVPed
    if (guest.timestamp) {
      const time = document.createElement("span");
      time.className = "timestamp";
      time.textContent = `RSVPed: ${guest.timestamp}`;
      li.appendChild(time);
    }

    // RSVP button to toggle attending status
    const rsvpButton = document.createElement("button");
    rsvpButton.className = `rsvp ${guest.rsvp ? "attending" : "not-attending"}`;
    rsvpButton.textContent = guest.rsvp ? "Attending" : "Not Attending";

    // Toggle RSVP and handle timestamp
    rsvpButton.addEventListener("click", () => {
      guest.rsvp = !guest.rsvp;

      if (guest.rsvp && !guest.timestamp) {
        guest.timestamp = new Date().toLocaleString(); // Add timestamp
      } else if (!guest.rsvp) {
        guest.timestamp = null; // Remove timestamp if unchecked
      }

      renderGuests(); // Refresh list
    });

    // Button to delete guest
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = " Remove";
    deleteBtn.addEventListener("click", () => {
      guests.splice(index, 1); // Remove guest by index
      renderGuests();          // Refresh list
    });

    // Button to edit guest name
    const editBtn = document.createElement("button");
    editBtn.textContent = " Edit";
    editBtn.addEventListener("click", () => {
      const newName = prompt("Enter new name:", guest.name);
      if (newName) {
        guest.name = newName; // Update name
        renderGuests();       // Refresh list
      }
    });

    // Action container (RSVP, edit, delete)
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(rsvpButton, editBtn, deleteBtn);

    // Add elements to list item
    li.append(nameSpan, badge, actions);

    // Append list item to guest list
    guestList.appendChild(li);
  });
}
