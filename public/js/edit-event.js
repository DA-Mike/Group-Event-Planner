const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('input[name="event-input"]')
    .value.trim();
  const date = document.querySelector('input[name="event-date"]').value.trim();
  const location = document
    .querySelector('input[name="event-location"]')
    .value.trim();
  const description = document
    .querySelector('textarea[name="event-desc"]')
    .value.trim();
  const inviteEmailsAsString = document
    .querySelector('input[name="invite-email"]')
    .value.trim();

  let inviteEmailsAsArray = [];

  if (inviteEmailsAsString) {
    inviteEmailsAsArray = inviteEmailsAsString.split(" ");
  }

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/event/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      event_id: id,
      event_title: title,
      event_location: location,
      event_date: date,
      event_description: description,
      invite_emails: inviteEmailsAsArray,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".event-container")
  .addEventListener("submit", editFormHandler);
