let url = "https://agenda2-d92ce-default-rtdb.europe-west1.firebasedatabase.app/";
let contacte = {};
let indexEditare = -1;

async function getContacte() {
    const response = await fetch(url + ".json");
    contacte = await response.json();
    if (contacte === null) {
        contacte = {};
    }
    draw();
}

function draw() {
    let str = "";
    for (let [i, contact] of Object.entries(contacte)) {
        str +=
            `<tr>
            <td>${contact.nume}</td>
            <td>${contact.telefon}</td>
            <td>
                <button class="modificare" onclick="modifica('${i}');">Edit</button>
            </td>
            <td>
                <button class="sterge" onclick="sterge('${i}')">Delete</button>
            </td>
        </tr>`;
    }
    document.querySelector(".agenda tbody").innerHTML = str;
}
async function adauga() {
    let nume = document.querySelector("#numele").value;
    let telefon = document.querySelector("#telefonul").value;
if(nume.length < 3 || telefon.length < 6){
    alert("The name must contain at least 3 characters. The phone number must contain at least 6 digits!");
    document.querySelector("form").reset();
    return;
}
    const response = await fetch(url+".json", {
        method:"post",
        body: JSON.stringify({
            "nume": nume,
            "telefon": telefon
        }),
        headers: {
          'Content-Type': 'application/json'
        },
    });
    await response.json();
    
    await getContacte();
    document.querySelector("form").reset();
}


function modifica(idx) {
    let contact = contacte[idx];
    document.querySelector("#numele").value = contact.nume;
    document.querySelector("#telefonul").value = contact.telefon;
    indexEditare = idx;
    document.querySelector(".modBtn").classList.remove("hidden");
    document.querySelector(".contactBtn").classList.add("hidden");
}
async function modificaPasul2() {
    if (indexEditare === -1) {
      adauga();
    }else{
    let contact={};
    contact.nume = document.querySelector("[name='nume']").value;
    contact.telefon = document.querySelector("[name='telefon']").value;
    const response = await fetch(url+indexEditare+".json", {
        method:"put",
        body: JSON.stringify(contact),
        headers: {
          'Content-Type': 'application/json'
        },
    });
    await response.json();
    await getContacte();
    document.querySelector("form").reset();
    document.querySelector(".modBtn").classList.add("hidden");
    document.querySelector(".contactBtn").classList.remove("hidden");
    cancel();
}
}

   
function cancel() {
    indexEditare = -1;
    document.querySelector("form").reset();
}
async function sterge(idx) {
    if (confirm(`Are you sure you want to delete the contact ${contacte[idx].nume} ?`)) {
        const response = await fetch(url+idx+".json", {
            method:"delete"
        });
        await response.json();
        
        await getContacte();
    }
    
}
function telInput(elem, event) {
    if (event.keyCode === 13) {
        return modificaPasul2();
    }
}