// 参照 : https://github.com/spicato-inc/fortenv-script

// import ViewportFixed from '@js/pages/components/ViewportFixed';

// 初期設定
function init() {
	let vw = document.documentElement.clientWidth;

	requestAnimationFrame(() => {
		document.body.classList.remove('preload');
	});

	const resizeObserver = new ResizeObserver(() => {
		if (vw === document.documentElement.clientWidth) {
			return;
		}
		vw = document.documentElement.clientWidth;
		document.documentElement.style.setProperty('--vw', `${vw}px`);
	});
	resizeObserver.observe(document.documentElement);

	document.addEventListener('DOMContentLoaded', () => {});

	window.addEventListener('load', () => {});
}

// libsの読み込み
function loadLibs() {
	document.addEventListener('DOMContentLoaded', () => {
		// viewport固定（フルリキッドの場合はなし）
		// ViewportFixed();
	});

	window.addEventListener('load', () => {});
}

export default function Foundation() {
	init();
	loadLibs();
}
