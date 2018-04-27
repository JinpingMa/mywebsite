//connect to server
const socket = io.connect("http://localhost:3000");

//query DOM
const message = document.querySelector('#message'),
	name = document.querySelector('#name'),
	sendBtn = document.getElementById('send'),
	output = document.getElementById('output');

message.onfocus = function(){
	message.className = '';
};
name.onfocus = function(){
	name.className = '';
};
//emit events
sendBtn.addEventListener('click', function(){
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
	console.log(htmlEncode(data.message));
	output.innerHTML +='<p><strong>' + htmlEncode(data.name) +':</strong>'+htmlEncode(data.message)+'</p>';
});

// HTML ENCODE
function htmlEncode(str) {
	// console.log(str);
	let s = '';
	if(str.length === 0) return s;
	s = str.replace(/&/g, '&amp;');
	s = s.replace(/</g, '&lt;');
	s = s.replace(/>/g, '&gt;');
	s = s.replace(/ /g, '&nbsp;');
	s = s.replace(/'/g, '&#39;');
	s = s.replace(/"/g, '&quot;');
	s = s.replace(/\n/g, '<br>');
	return s;
	// console.log(s);
}
function htmlDecode(str) {
	let s = '';
	if(str.length === 0) return s;
	s = str.replace(/&amp;/g, '&');
	s = s.replace(/&lt;/g, '<');
	s = s.replace(/&gt;/g, '>');
	s = s.replace(/&nbsp;/g, ' ');
	s = s.replace(/&#39;/g, '\'');
	s = s.replace(/&quot;/g, '\"');
	s = s.replace(/<br>/g, '\n');
	return s;
}