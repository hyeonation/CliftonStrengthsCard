//// preset
var card_type = document.getElementById("type_1");
var card_page = true;
var card_talent;

// default : card type 1 
card_type.style.backgroundColor = "black";
card_type.style.color = "white";


//// card type 선택
function select_card_type(event) {

    // 이전 비활성화
    card_type.style.backgroundColor = "white";
    card_type.style.color = "gray";
    card_type.style.borderColor = "gray";

    // 새로 활성화
    event.target.style.backgroundColor = "black";
    event.target.style.color = "white";
    event.target.style.borderColor = "black";

    // 변수 업데이트
    card_type = event.target;

    // 카드 업데이트
    update_card();

}

//// 재능 선택
function select_talent(event) {

    // 이전 재능 비활성화
    if (card_talent){
        card_talent.style.color = card_talent.style.borderColor;
        card_talent.style.backgroundColor = "white";
    }

    // update talent
    card_talent = event.target;
    card_talent.style.color = "white";
    card_talent.style.backgroundColor = convert_color(card_talent.name);

    // 카드 업데이트
    update_card();

}

//// 이미지 클릭 시 토글
function push_img(event) {

    card_page = !card_page;

    // 카드 업데이트
    update_card();

}

//// 재능 카드 보여주기
function update_card() {

    // talent 값이 있을 때만
    if (card_talent) {

        var img_loc = 'img/' + card_type.value + '/'
            + convert_page(card_page) + '/'
            + card_talent.value;

        document.getElementById("card").src = img_loc + ".png";

    }
}

//// convert file loc
function convert_page(card_page) {

    var page_loc;
    var list_page_loc;

    // list_page_loc
    if (card_type.id == "type_1") {
        list_page_loc = ['deep', 'compare'];
    }

    else {
        list_page_loc = ['adj', 'noun'];
    }

    // page_loc
    if (card_page) {
        page_loc = list_page_loc[0];
    }
    else {
        page_loc = list_page_loc[1];
    }

    return page_loc;
}

//// convert color
// javascript 에서는 rgb를 string으로 넣어야 버튼 배경색이 바뀌어서
// 새로 function 정의
function convert_color(name){

    var color;

    if (name == "executing"){
        color = "rgb(138, 43, 226)"
    }
    else if (name == "influencing"){
        color = "rgb(255, 139, 0)"
    }
    else if (name == "relationship"){
        color = "rgb(30, 144, 255)"
    }
    else if (name == "strategy"){
        color = "rgb(0, 153, 0)"
    }
    else {
        color = "rgb(255, 255, 255)"
    }

    return color;

}


//// 버튼에 이벤트 삽입
var buttonEl = document.getElementsByClassName("talent");

// 재능 버튼
var len = buttonEl.length;
for (let i = 0; i < len; i++) {
    buttonEl.item(i).onclick = select_talent;
}

// 카드 타입
var buttonEl = document.getElementsByClassName("card_type");

var len = buttonEl.length;
for (let i = 0; i < len; i++) {
    buttonEl.item(i).onclick = select_card_type;
}

// 재능 카드
document.getElementById("card").onclick = push_img;