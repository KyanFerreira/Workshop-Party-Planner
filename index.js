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
  renderEvents();
}

render();

async function getEvents() { //[THE GET IS BEING HANDLED HERE]
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
 
    console.log(event.name + ' ' + event.id);
let eventId = event.id;
    const li = document.createElement("li");
    li.innerHTML = `
<h2>${event.name}</h2>
<p> <b>Location: </b> ${event.location}</p>
<p><b>Date: </b>${event.date} </p>
<p><b>Description: </b>${event.description}</p>
<button onclick = "deleteMe(${eventId})">Delete Event </button>
`;

    return li;
  });

  eventList.replaceChildren(...eventsCards);
}

//Add Events [THE POST IS BEING HANDLED HERE]
async function addEvent(event) {
  event.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
    name: addEventForm.name.value,
    description: addEventForm.description.value,
    date: new Date(addEventForm.date.value),
    location: addEventForm.location.value
  
      }),
    });

     if (!response.ok) {
      throw new Error(response);
     }

    render();
  } catch (error) {
    console.error(error);
  }
}

//Delete Events [THE DELETE IS BEING HANDLED HERE]
async function deleteMe(eventId){
  let deleteURL = API_URL + '/' + eventId;
  console.log(deleteURL);
  try {
  await fetch(deleteURL, {
    method: 'DELETE',
  })
  render();
}catch (error) {
  console.error(error);
}
  

}
