let url = "https://agenda-358d7-default-rtdb.europe-west1.firebasedatabase.app/"
let contacte = [];
let indexEditare = -1;

async function getContacte() {
    contacte = await ajax(url);
    if (contacte === null) {
        contacte = [];
    }
    draw();
}
async function ajax(url, method, body) {
  
    let response = await fetch(url + ".json", {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json();

}
function draw() {
    let str = "";
    for (let i = 0; i < contacte.length; i++) {
        str +=
            `<tr>
            <td>${contacte[i].nume}</td>
            <td>${contacte[i].telefon}</td>
            <td>
                <button class="modificare" onclick="modifica(${i});">Modifica</button>
            </td>
            <td>
                <button class="sterge" onclick="sterge(${i})">Sterge</button>
            </td>
        </tr>`;
    }
    document.querySelector(".agenda tbody").innerHTML = str;
}
async function adauga() {
    let nume = document.querySelector("[name='nume']").value;
    let telefon = document.querySelector("[name='telefon']").value;
    await ajax(
        url + contacte.length, 
        "PUT", 
        {
        "nume": nume,
        "telefon": telefon
        
        }),
    await getInregistrari();
  
    document.querySelector("form").reset();
}
function modifica(idx) {
    let contact = contacte[idx];
    document.querySelector("[name='nume']").value = contact.nume;
    document.querySelector("[name='telefon']").value = contact.telefon;
    indexEditare = idx;
}
async function modificaPasul2() {
    if (indexEditare === -1) {
        adauga();
    }
    await ajax(
        url + indexEditare,
        "PUT",
        {
            "nume": document.querySelector("[name='nume']").value,
            "telefon": document.querySelector("[name='telefon']").value,
            
        }
    );
    await getInregistrari();
    document.querySelector("form").reset();
    indexEditare= -1;
}
 async function sterge(idx) {
    if (confirm(`Esti sigur ca vrei sa stergi contactul ${contacte[idx].nume} ?`)) {
        await ajax(url + idx, "DELETE");
        await getContacte();
    }
}

function telInput(elem, event) {
    if (event.keyCode === 13) {
        return modificaPasul2();
    }
}