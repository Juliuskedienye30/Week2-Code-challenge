document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const guestList = document.getElementById("guest-list");
  const nameInput = document.getElementById("guest-name");
  const categoryInput = document.getElementById("guest-category");

  let guests = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const category = categoryInput.value;

    if (guests.length >= 10) {
      alert("Guest list is full! Maximum 10 guests allowed.");
      return;
    }

    const guest = {
      name,
      category,
      rsvp: false,
      timestamp: null,
    };

    guests.push(guest);
    renderGuests();
    form.reset();
  });

  function renderGuests() {
    guestList.innerHTML = "";

    guests.forEach((guest, index) => {
      const li = document.createElement("li");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = guest.name;

      const badge = document.createElement("span");
      badge.className = `badge ${guest.category}`;
      badge.textContent = guest.category;

      if (guest.timestamp) {
        const time = document.createElement("span");
        time.className = "timestamp";
        time.textContent = `RSVPed: ${guest.timestamp}`;
        li.appendChild(time);
      }

      const rsvpButton = document.createElement("button");
      rsvpButton.className = `rsvp ${guest.rsvp ? "attending" : "not-attending"}`;
      rsvpButton.textContent = guest.rsvp ? "Attending" : "Not Attending";

      rsvpButton.addEventListener("click", () => {
        guest.rsvp = !guest.rsvp;
        guest.timestamp = guest.rsvp ? new Date().toLocaleString() : null;
        renderGuests();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = " Remove";
      deleteBtn.addEventListener("click", () => {
        guests.splice(index, 1);
        renderGuests();
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = " Edit";
      editBtn.addEventListener("click", () => {
        const newName = prompt("Enter new name:", guest.name);
        if (newName) {
          guest.name = newName;
          renderGuests();
        }
      });

      const actions = document.createElement("div");
      actions.className = "actions";
      actions.append(rsvpButton, editBtn, deleteBtn);

      li.append(nameSpan, badge, actions);

      guestList.appendChild(li);
    });
  }
});
