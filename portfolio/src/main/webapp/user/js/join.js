window.addEventListener("load", function(event){
	//필요한 DOM 객체 가져오기
	var joinform = document.getElementById("joinform");
	var email = document.getElementById("email");
	var pw = document.getElementById("pw");
	var pw1 = document.getElementById("pw1");
	var nickname = document.getElementById("nickname");
	var image = document.getElementById("image");
	
	var img = document.getElementById("img");
	var msg = document.getElementById("msg");
	var emailmsg = document.getElementById("emailmsg");
	var pwmsg = document.getElementById("pwmsg");
	var nicknamemsg = document.getElementById("nicknamemsg");
	
	var joinbtn = document.getElementById("joinbtn");
	var mainbtn = document.getElementById("mainbtn");
	var loginbtn = document.getElementById("loginbtn");
	
	//mainbtn 과 loginbtn을 눌렀을 때 페이지 이동
	mainbtn.addEventListener("click", function(event){
		location.href="../";
	});
	loginbtn.addEventListener("click", function(event){
		location.href="login";
	});
	
	//이미지 미리보기
	image.addEventListener("change", function(event){
		//선택한 파일이 있다면
		if(this.files && this.files[0]){
			//파일 읽기 객체 생성
			var reader = new FileReader();
			//파일 읽기 요청
			reader.readAsDataURL(this.files[0]);
			//자바스크립트에서 파일을 읽는 것은 비동기
			reader.addEventListener("load", function(e){
				img.src = e.target.result;
			});
		}
	});
	
	//회원가입 버튼을 눌렀을 때 처리
	var flag = false;
	joinbtn.addEventListener("click", function(event){
		//서버로 보내기 전에 데이터의 유효성 검사를 수행
		//데이터의 길이 나 형식(정규식)을 검사
		
		//길이를 검사할 때는 좌우 공백을 제거하고 검사를 수행
		if (email.value.trim().length < 1) {
			emailmsg.innerHTML = '이메일은 필수 입력입니다.<br/>';
			flag = true;
		} else {
			var emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
			if (!emailRegExp.test(email.value.trim())) {
					emailmsg.innerHTML = '잘못된 이메일 형식입니다.<br/>';
					flag = true;
			}
		}
		
		if (pw.value.trim().length < 1) {
			pwmsg.innerHTML += '비밀번호는 필수 입력입니다.<br/>';
			flag = true;
		} else {
			var pwRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/;
			if (!pwRegExp.test(pw.value.trim())) {
					pwmsg.innerHTML = '비밀번호는 숫자와 영문 대소문자 그리고 특수문자가 포함되어야 합니다.<br/>';
					flag = true;
			} else {
				if (pw.value.trim() !== pw1.value.trim()) {
					pwmsg.innerHTML += '2개의 비밀번호는 같아야 합니다.<br/>';
					flag = true;
				}
			}
		}
		
		if (nickname.value.trim().length < 1) {
			nicknamemsg.innerHTML += '별명은 필수 입력입니다.<br/>';
			flag = true;
		} else {
			var nicknameRegExp = /^[a-zA-z가-힣0-9]{2,5}$/;
			if (!nicknameRegExp.test(nickname.value.trim())) {
				nicknamemsg.innerHTML = '닉네임은 영문 한글 숫자로 2자 이상 5자 이하이어야 합니다.<br/>';
				flag = true;
			}
		}
		
		if(flag == true){
			return;
		}
		
		//ajax 요청 : join
		var url = "join";
		
		//ajax 객체를 생성
		var request = new XMLHttpRequest();
		
		//요청을 생성
		request.open('post', url, true);
		
		//폼데이터 생성
		var formData = new FormData(joinform);
		
		//요청을 전송
		request.send(formData);
		
		//ajax 요청에 응답이 오면
		request.addEventListener("load", function(e){
			//alert(e.target.responseText);
			
			//결과를 파싱
			var obj = JSON.parse(e.target.responseText);
			
			//결과를 가지고 다음 행동을 작성
			if(obj.result == true){
				location.href = "../";
			}else{
				if(obj.emailcheck == false){
					msg.innerHTML = "사용 불가능한 이메일";
				}
				if(obj.nicknamecheck == false){
					msg.innerHTML = "이미 사용 중인 별명";
				}
			}
		});
		
	});
	
	
});


