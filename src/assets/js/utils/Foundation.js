// 初期設定
function init() {
	document.addEventListener('DOMContentLoaded', () => {
		requestAnimationFrame(() => {
			document.body.classList.remove('preload');
		});
	});

	window.addEventListener('load', () => {});
}

// libsの読み込み
function loadLibs() {
	document.addEventListener('DOMContentLoaded', () => {});

	window.addEventListener('load', () => {});
}

export default function Foundation() {
	init();
	loadLibs();
}
