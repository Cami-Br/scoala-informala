let url = "https://shoppingli-f72f4-default-rtdb.europe-west1.firebasedatabase.app/"
let obiecteAdaugate = [];

async function getObiecteAdaugate() {
    obiecteAdaugate = await ajax(url);
    if (obiecteAdaugate === null) {
        obiecteAdaugate = [];
    }
    draw();
}
async function ajax(url, method, body) {
    let response = await fetch(url + ".json", {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}
async function draw() {
    let str = "";
    let str2 = "";
    for (let i = 0; i < obiecteAdaugate.length; i++) {
        if (obiecteAdaugate[i].action === "marked") {
            str += `<tr>
                  <td  class="markedItem">${obiecteAdaugate[i].item}</td>
                   <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsBuyed('${i}');"></td>
             </tr>`
        }
        else {
            str += `<tr>
                <td class="onList">${obiecteAdaugate[i].item}</td>
                <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsBuyed(${i});"></td>
           </tr>`
        }
        document.querySelector(".list tbody").innerHTML = str2 + str;
    }
}
async function adauga() {
    let item = document.querySelector("[name='item']").value;
    await ajax(
        url + obiecteAdaugate.length,
        "PUT",
        {
            "item": item
        });

    document.querySelector(".cell").classList.remove("hidden");
    await getObiecteAdaugate();
    document.querySelector("form").reset();
    draw();

}
function markAsBuyed(idx) {
    for (let i = 0; i < obiecteAdaugate.length; i++) {
        if (i === idx) {
            obiecteAdaugate[i].action = "marked";
        }
    }
    draw();
}
function compare(a, b) {
    let item1 = a.item.toUpperCase();
    let item2 = b.item.toUpperCase();
    let value = 0;
    if (item1 > item2) {
        value = 1;
    }
    else {
        value = -1;
    }
    return value;
}
function sortAsc() {
    obiecteAdaugate.sort(compare);
    draw();
}
function sortDesc() {
    obiecteAdaugate.sort(compare);
    obiecteAdaugate.reverse();
    draw();
}