const COHORT = "2405-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#Events");

const addEventForm = document.querySelector("#addEvents");
addEventForm.addEventListener("submit", addEvent);

async function render() {
  await getEvents();
  console.log(state.events);
  console.log(API_URL);
  renderEvents();
}

render();

async function getEvents() {
  // TODO
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
  } catch (error) {
    console.error(error);
  }
}

function renderEvents() {
  if (!state.events.length) {
    artistList.innerHTML = "<li>No events.</li>";
    return;
  }

  const eventsCards = state.events.map((event) => {
    console.log(event.date);
    const li = document.createElement("li");
    li.innerHTML = `
<h2>${event.name}</h2>
<p> ${event.location}</p>
<p>${event.date} </p>
<p>${event.description}</p>
<button> Delete Event </button>
`;
    return li;
  });

  eventList.replaceChildren(...eventsCards);
}

//Add Events
async function addEvent(event) {
  event.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        location: addEventForm.location.value,
        date: addEventForm.date.value,
        description: addEventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create artist");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
