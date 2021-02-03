let obiecteAdaugate = [];

function draw() {
    let str = "";
    let str2 = "";
    for (let i = 0; i < obiecteAdaugate.length; i++) {
        if (obiecteAdaugate[i].action === "marked") {
            str += `<tr>
                  <td  class="markedItem">${obiecteAdaugate[i].item}</td>
                   <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsBuyed('${i}');"></td>
             </tr>`
        }else {
            str += `<tr>
                <td class="onList">${obiecteAdaugate[i].item}</td>
                <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsBuyed(${i});"></td>
           </tr>`
        }
        document.querySelector(".list tbody").innerHTML = str2 + str;
    }
}

function adauga() {
    let item = document.querySelector("[name='item']").value;
    if (item.length !== 0) {
        obiecteAdaugate.push({
            item: item
        })
    }
    document.querySelector(".cell").classList.remove("hidden");
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