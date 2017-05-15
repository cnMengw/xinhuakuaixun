var nativeWebview, imm, InputMethodManager;
var initNativeObjects = function() {
	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var Context = plus.android.importClass("android.content.Context");
		InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
		imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	} else {
		nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	}
};
mui.plusReady(function() {
	initNativeObjects();
});

var speech_count = '';
var speech_num = 0;
var sppech,AVSpeechSynthesizer,AVSpeechUtterance,AVSpeechSynthesisVoice,AVSpeechSynthesizerDelegate,voice,utterance;

function speech_Du(speechCount) {
	var red_count = '';

	if(speech_count && speech_count == speechCount) {
		speech_num++;
		if(speech_num % 2 == 1) {
			red_count = '';
			console.log('不读');
		} else {
			speech_num = 0;
			speech_count = speechCount;
			red_count = speech_count;
			console.log('读');
		}
	} else {
		speech_num = 0;
		speech_count = speechCount;
		red_count = speech_count;
		console.log('读');
	}

	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
		SpeechUtility.createUtility(main, "appid=5912d935");
		var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
		var play = SynthesizerPlayer.createSynthesizer(main, null);
		play.startSpeaking(red_count, null);
	} else {
		if(red_count) { 
			console.log('第一次点击');
			//iphone
			AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
			AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
			AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
			AVSpeechSynthesizerDelegate = plus.ios.import("AVSpeechSynthesizerDelegate");
			sppech = new AVSpeechSynthesizer();
			voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
			utterance = AVSpeechUtterance.speechUtteranceWithString(red_count);
			//点击第一次播放
			utterance.setVoice(voice);
			sppech.speakUtterance(utterance);
		} else {
			console.log('第二次点击');
			//停止
			sppech.stopSpeakingAtBoundary(0);
			//暂停
			//sppech.pauseSpeakingAtBoundary(0);
			//继续
			//sppech.continueSpeaking(0);
			console.log('第二次点击结束');
		}
	}
}
