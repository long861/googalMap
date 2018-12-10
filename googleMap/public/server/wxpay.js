var md5 = require('md5');
var hmac_sha256 = require("crypto-js/hmac-sha256"); //请自行 npm install crypto-js
 
 
var wxPost = function(postObject, parm, fn){
	//postObject为要提交的微信支付服务器的参数列表，为json格式
	//parm为额外参数列表，包括path（微信支付API子地址，如：/pay/micropay）和sign_typ（参数加密类型，可选“MD5”或“HMAC-SHA256”）
	//fn为调用结束时的回调（无论成功与否都回调，返回的参数是xml格式的）
	var mch_id = "微信支付服务商商户号或普通商户商户号";
	var wkey = "微信支付API密钥或APIv3密钥";
	var keys = Object.keys(postObject).sort();
	var signData = '';
	for(var key of keys){
		if(postObject[key]){
			signData += "&" + key + "=" + postObject[key];
		}
	}
	signData = signData.slice(1) + "&key=" + wkey;
	var sign_type = parm.sign_type || "MD5";
	if(sign_type == "HMAC-SHA256"){
		var sign = hmac_sha256(signData, wkey) + ''; 
		sign = sign.toUpperCase();
	}else{
		var sign = md5(signData).toUpperCase();
	}	
	postObject.sign = sign;
	var postData = '<xml>';
	for(var key in postObject){
		if(postObject[key]){
			postData += '<' + key + '>' + postObject[key] + '</' + key + '>';
		}
	}
	postData += '</xml>';
	var opts = {
		method:'POST',
		hostname:'api.mch.weixin.qq.com',
		port:'443',
		pfx:fs.readFileSync('./cert/' + mch_id + '.pfx'), //对应API证书中的.p12文件，改后缀名即可
		passphrase:mch_id,
		path:parm.path,
		headers:{
			'Content-Type':'application/x-www-form-urlencoded',
			'Content-Length':postData.length
		}
	}
	
	var body = '';
	var rq = https.request(opts,function(rs){
		rs.on('data',function(data){
			body += data;
		})
		rs.on('end', function(){
			if(fn){fn(body)}
		})
	});
	rq.write(postData);
	rq.on('error',function(err){
		if(fn){fn("<return_msg>" + err.message + "</return_msg>")}
	});	
	rq.end();		
}
