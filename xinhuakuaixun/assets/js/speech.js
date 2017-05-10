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

var speech_num = 0;
function speech_Du() {
	
	speech_num++;
	
	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
		SpeechUtility.createUtility(main, "appid=你的appid");

		var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
		var play = SynthesizerPlayer.createSynthesizer(main, null);
		play.startSpeaking('但是，金融资本与产业资本往往是相互配合的共同利益者，金融资本养成了短期投机的习惯，而企业又需要融资，因此，上市公司通常都会和一些机构配合进行所谓的市值管理，通过制造一些概念刺激股价，在股价波动中赚取价差。由于产能过剩或市场萎缩，很多企业即使融资后也不会投到既定的项目，而是购买理财或者放贷获取收益', null);
	} else {
		//iphone
		var AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
		var AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
		var AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
		var sppech = new AVSpeechSynthesizer();
		var voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
		var utterance;

		//点击第一次播放

		utterance = AVSpeechUtterance.speechUtteranceWithString('几天发的撒娇');

		playStatus = "play";

		utterance.setVoice(voice);

		sppech.speakUtterance(utterance);

		plus.ios.deleteObject(voice);

		plus.ios.deleteObject(utterance);

		plus.ios.deleteObject(sppech);
	}
}