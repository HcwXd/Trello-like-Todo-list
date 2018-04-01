var listAdder = document.querySelector(".list-adder");
var listAdderWrap = document.querySelector(".list-adder-wrap");

var listGroup = document.querySelector(".list-group");
var listSaver = document.querySelector(".add-btn");
var addInput = document.querySelector(".add-input");
var cancelSaver = document.querySelector(".cancel-btn");

var cardAdder = document.querySelectorAll(".card-adder-wrap");

var addingCard = document.querySelectorAll(".adding-card");
var addCardBtn = document.querySelectorAll(".item-add-btn");
var itemCanceler = document.querySelectorAll(".item-cancel-btn");

var listCardGroup = document.querySelectorAll(".list-card");
var listEdit = document.querySelectorAll(".list-edit");

var listMember = document.querySelectorAll(".list-member");

var listStatus = document.querySelectorAll(".list-status");

var dashboard = document.querySelector(".dashboard");






function showListSaver() {
    listAdderWrap.classList.add("adding")
    listAdder.style.display = "none";
    listSaver.style.display = "inline-block";
    addInput.style.display = "block";
    cancelSaver.style.display = "inline-block";
}

function hideListSaver() {
    listAdderWrap.classList.remove("adding")
    listAdder.style.display = "block";
    listSaver.style.display = "none";
    addInput.style.display = "none";
    cancelSaver.style.display = "none";
}

function addNewList() {
    if (addInput.value != "") {
        var _listWrap = document.createElement("DIV");
        _listWrap.className = "list-wrap";
        var _listContent = document.createElement("DIV");
        _listContent.className = "list-content";

        var _listHeader = document.createElement("DIV");
        _listHeader.className = "list-header";

        var _textArea = document.createElement("TEXTAREA");
        _textArea.innerHTML = addInput.value;

        var _listStatus = document.createElement("DIV");
        _listStatus.className = "list-status";
        _listStatus.innerHTML = "一";


        _listStatus.addEventListener("mouseover", showStatus);
        _listStatus.addEventListener("mouseout", hideStatus);
        _listStatus.addEventListener("click", deleteList);

        var _listCard = document.createElement("DIV");
        _listCard.className = "list-card";

        var _cardAdder = document.createElement("A");
        _cardAdder.className = "card-adder-wrap";
        _cardAdder.innerHTML = "Add a card";
        _cardAdder.addEventListener("click", showCardAdder);

        var _cardAdding = document.createElement("DIV");
        _cardAdding.className = "adding-card";
        var _input = document.createElement("INPUT");
        _input.setAttribute("type", "text");
        _input.setAttribute("placeholder", "Add a card...");
        _input.className = "item-add-input";

        var _addBtn = document.createElement("SPAN");
        _addBtn.innerHTML = "Add";
        _addBtn.className = "item-add-btn";
        _addBtn.addEventListener('click', addNewCard);

        var _cancelBtn = document.createElement("SPAN");
        _cancelBtn.innerHTML = "X";
        _cancelBtn.className = "item-cancel-btn";
        _cancelBtn.addEventListener('click', hideCardAdder);



        //  <div class="list-wrap">
        //       <div class="list-content">
        //         <div class="list-header">
        //           <textarea>Short-term goal</textarea>
        //           <div class="list-status"></div>
        //         </div>
        //         <div class="list-card">
        //           <div class="list-member">
        //             <div class="list-detail">Web Hw1</div>
        //             <div class="list-edit">X</div>
        //           </div>
        //         </div>
        //         <a class="card-adder-wrap">Add a card</a>
        //         <div class="adding-card">
        //           <input type="text" class="item-add-input" placeholder="Add a card...">
        //           <span class="item-add-btn">Add</span>
        //           <span class="item-cancel-btn">X</span>
        //         </div>
        //       </div>
        //     </div>
        _cardAdding.appendChild(_input);
        _cardAdding.appendChild(_addBtn);
        _cardAdding.appendChild(_cancelBtn);
        _listHeader.appendChild(_textArea);
        _listHeader.appendChild(_listStatus);
        _listContent.appendChild(_listHeader);
        _listContent.appendChild(_listCard);
        _listContent.appendChild(_cardAdder);
        _listContent.appendChild(_cardAdding);
        _listWrap.appendChild(_listContent);
        listGroup.appendChild(_listWrap);

        hideListSaver();
    }
    addInput.value = "";

}

function showCardAdder() {
    // console.log(this);

    this.style.display = "none";
    this.nextElementSibling.style.display = "block";

}

function hideCardAdder() {
    this.parentElement.style.display = "none";
    this.parentElement.previousElementSibling.style.display = "block";
}

function addNewCard() {
    if (this.previousElementSibling.value != "") {
        //<div class="list-member">
        //  <div class="list-detail">Web Hw1</div>
        //  <div class="list-edit">X</div>
        //</div>
        var _listMember = document.createElement("DIV");
        _listMember.className = "list-member";
        _listMember.addEventListener("click", labelChecked)
        var _listDetail = document.createElement("DIV");
        _listDetail.className = "list-detail";
        _listDetail.innerHTML = this.previousElementSibling.value;
        var _listEdit = document.createElement("DIV");
        _listEdit.className = "list-edit";
        _listEdit.innerHTML = "X";
        _listEdit.addEventListener("click", deleteCard);

        _listMember.appendChild(_listDetail);
        _listMember.appendChild(_listEdit);

        _listCard = this.parentElement.previousElementSibling.previousElementSibling;

        _listCard.appendChild(_listMember);

        this.parentElement.style.display = "none";
        this.parentElement.previousElementSibling.style.display = "block";
    }
    this.previousElementSibling.value = "";
    updateDashboard();
}

function deleteCard() {
    this.parentElement.remove();
    updateDashboard();
}

function labelChecked() {
    this.firstElementChild.classList.toggle('checked');
    updateDashboard();
}

function showStatus() {
    var cards = this.parentElement.nextElementSibling;
    var uncheckedNumber = cards.getElementsByClassName("list-member").length -
        cards.getElementsByClassName("checked").length;
    var statusShown = document.createElement("DIV");
    statusShown.className = "status-shown";
    statusShown.innerHTML = "Todo: " + uncheckedNumber;
    this.parentElement.appendChild(statusShown);
    this.innerHTML = "X";
}

function hideStatus() {
    this.innerHTML = "一";
    this.parentElement.lastElementChild.remove();
}

function deleteList(params) {
    this.parentElement.parentElement.parentElement.remove();
    updateDashboard();
}




function updateDashboard() {
    var totalTodo = document.getElementsByClassName("list-member").length
    var checkedTodo = document.getElementsByClassName("checked").length;
    dashboard.innerHTML = "Todo: " + (totalTodo - checkedTodo) + "<br>Checked: " + checkedTodo;
}

listAdder.addEventListener('click', showListSaver);
listSaver.addEventListener('click', addNewList);
cancelSaver.addEventListener('click', hideListSaver);

// for (i = 0; i < cardAdder.length; i++) {
//     cardAdder[i].addEventListener('click', showCardAdder);
// }
cardAdder.forEach(adder => adder.addEventListener('click', showCardAdder));
itemCanceler.forEach(canceler => canceler.addEventListener('click', hideCardAdder));
addCardBtn.forEach(add => add.addEventListener('click', addNewCard));
listEdit.forEach(edit => edit.addEventListener("click", deleteCard));
listMember.forEach(member => member.addEventListener("click", labelChecked));
listStatus.forEach(status => status.addEventListener("mouseover", showStatus));
listStatus.forEach(status => status.addEventListener("mouseout", hideStatus));
listStatus.forEach(status => status.addEventListener("click", deleteList));
updateDashboard();