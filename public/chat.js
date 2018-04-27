//connect to server
const socket = io.connect("http://localhost:3000");

//query DOM
const message = document.querySelector('#message'),
	name = document.querySelector('#name'),
	sendBtn = document.getElementById('send'),
	output = document.getElementById('output');

message.onfocus = function(){
	message.className = '';
}
name.onfocus = function(){
	name.className = '';
}
//emit events
sendBtn.addEventListener('click', function(){
	console.log('发送消息');
	const mLen = message.value.length;
	const nLen = name.value.length;
	if(nLen && mLen){
		socket.emit('chat',{
			message: message.value,
			name: name.value
		});
	} else {
		message.className = mLen? '': 'no-empty';
		name.className = nLen? '' : 'no-empty';
	}
});

//listen for events
socket.on('chat', function (data) {
	//html tag encode
	output.innerHTML +='<p><strong>' + data.name +':</strong>'+data.message+'</p>';
});
