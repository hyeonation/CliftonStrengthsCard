//// preset
var card_type = document.getElementById("type_1");
var card_page = true;
var card_talent = null;

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

    // '테마 조합'이 새롭게 선택되었을 때
    if ((event.target.id == "type_3") && (card_type.id != event.target.id)){
        
        // 이전 활성된 재능 비활성화
        if (card_talent){
            ctrl_talent_btn(card_talent, false);
        }

        // card_talent 빈 배열로 초기화.
        card_talent = [];
    }

    // '테마 조합'이었던 상태에서 다른 타입으로 바뀌었을 때
    else if ((card_type.id == "type_3") && (card_type.id != event.target.id)){

        // 활성화 되었던 재능 비활성화
        var len = card_talent.length;
        for (let i = 0; i < len; i++) {
            ctrl_talent_btn(card_talent[i], false);
        }

        // card_talent 초기화
        card_talent = null;
    }

    // 변수 업데이트
    card_type = event.target;

    // 카드 업데이트
    update_card();

}

//// 재능 선택
function select_talent(event) {

    // '테마 조합'일 때
    if (card_type.id == "type_3") {

        // 선택 이벤트가 배열에 존재할 때
        if (card_talent.includes(event.target)){

            // 기존 있던 이벤트 제거
            card_talent = card_talent.filter((element) => element !== event.target);

            // 선택된 이벤트 비활성화
            ctrl_talent_btn(event.target, false);
        }

        // 선택 이벤트가 배열에 존재하지 않을 때
        else{

            // 재능이 이미 2개 선택된 상태일 때
            if (card_talent.length >= 2){
                
                // 마지막 재능 제거 및 비활성화
                ctrl_talent_btn(card_talent.pop(), false);
            }

            // 배열에 재능 추가
            card_talent.push(event.target);

            // 추가된 재능 활성화
            ctrl_talent_btn(event.target, true);
        }
    }

    // '테마 조합' 아닐 때
    else{

        // 이전 재능 비활성화
        if (card_talent){
            ctrl_talent_btn(card_talent, false);
        }

        // update talent
        card_talent = event.target;
        ctrl_talent_btn(card_talent, true);
    }

    // 카드 업데이트
    update_card();
}

//// 재능 활성화/비활성화 제어
function ctrl_talent_btn(talent_btn, action){

    // 시각적 활성화
    if (action){
        talent_btn.style.color = "white";
        talent_btn.style.backgroundColor = convert_color(talent_btn.name);
    }

    // 시각적 비활성화
    else{
        talent_btn.style.color = talent_btn.style.borderColor;
        talent_btn.style.backgroundColor = "white";
    }
}


//// 이미지 클릭 시 토글
function push_img(event) {

    card_page = !card_page;

    // 카드 업데이트
    update_card();

}

//// 재능 카드 보여주기
function update_card() {

    var img_loc;

    // type_3
    if (card_type.id == "type_3") {

        var file_name = '';
        
        // 2개의 talent가 선택되었을 때
        if (card_talent.length == 2) {
            
            // 문자열 합치기
            file_name += card_talent[0].value.split('_')[1]
            file_name += '_'
            file_name += card_talent[1].value.split('_')[1]
        }

        // 2개 선택이 안 되었을 때
        else{

            // default img
            file_name = 'theme combination default'
        }

        // 경로 생성
        img_loc = 'img/' + card_type.value + '/'
                 + file_name;
    }

    // type_1, type_2
    else{

        // talent 값이 있을 때만
        if (card_talent) {

            // 경로 생성
            img_loc = 'img/' + card_type.value + '/'
            + convert_page(card_page)
            + card_talent.value;
        }

        // talent 값이 없을 때
        else{

            // 경로 생성
            img_loc = 'img/default img';
        }
    }

    // card update
    document.getElementById("card").src = img_loc + ".png";

}

//// convert file loc
function convert_page(card_page) {

    var page_loc;
    var list_page_loc;

    // list_page_loc
    if (card_type.id == "type_1") {
        list_page_loc = ['deep/', 'compare/'];
    }

    else if (card_type.id == "type_2") {
        list_page_loc = ['adj/', 'noun/'];
    }

    else if (card_type.id == "type_3") {
        list_page_loc = ['', ''];
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