function draw(){
    let str = "";
    let str2 = `<thead>
                <tr>
                    <th>Item description</th>
                    <th>Action</th>
                </tr>
                </thead>
    `

    for(let i = 0; i < shoppingList.length; i++){
        if(shoppingList[i].action === "marked"){
            str +=`<tr>
                    <td title="itemTitle" class="markedItem">${shoppingList[i].item}</td>
                    <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsbuyed(${i});" onfocus="activeBorder(this);"></td>
                </tr>`
        }else{
            str +=`<tr>
                <td title="itemTitle">${shoppingList[i].item}</td>
                <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsbuyed(${i});" onfocus="activeBorder(this);"></td>
                </tr>`
        }
    document.querySelector("#itemsList").innerHTML = str2 + str;
    }
}

function markAsbuyed(idx){
    for (let i = 0; i < shoppingList.length; i++){
        if(i === idx){
            shoppingList[i].action = "marked"
        }
    }
    draw()
}