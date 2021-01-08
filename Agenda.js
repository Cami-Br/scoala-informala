let contacte = [];
let indexEditare = -1;
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
function adauga() {
    let nume = document.querySelector("[name='nume']").value;
    let telefon = document.querySelector("[name='telefon']").value;
    contacte.push({
        "nume": nume,
        "telefon": telefon
    });
    document.querySelector(".agenda").classList.remove("hidden");
    draw();
    document.querySelector("form").reset();
}
function modifica(idx) {
    let contact = contacte[idx];
    document.querySelector("[name='nume']").value = contact.nume;
    document.querySelector("[name='telefon']").value = contact.telefon;
    indexEditare = idx;
}
function modificaPasul2() {
    if (indexEditare === -1) {
        adauga();
    }
    let contact = contacte[indexEditare];
    contact.nume = document.querySelector("[name='nume']").value;
    contact.telefon = document.querySelector("[name='telefon']").value;
    draw();
    document.querySelector("form").reset();
    indexEditare= -1;
}
function sterge(idx) {
    if (confirm(`Esti sigur ca vrei sa stergi contactul ${contacte[idx].nume} ?`)) {
        contacte.splice(idx, 1);
        draw();
    }
}

function telInput(elem, event) {
    if (event.keyCode === 13) {
        return modificaPasul2();
    }
}


