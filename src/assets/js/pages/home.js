// css
import gsap from 'gsap';
import '../../css/home.css';

// utils
import Foundation from '../utils/Foundation';
Foundation();
import Ease from '../utils/Ease';

const tikatika = {
	keyframes: {
		0: {
			opacity: 1,
		},
		25: {
			opacity: 0,
		},
		50: {
			opacity: 1,
		},
		75: {
			opacity: 0,
		},
		100: {
			opacity: 1,
		},
	},
	duration: 0.24,
	ease: 'steps(4)',
};

class Loading {
	static loading = document.querySelector('.js-loading');
	static percentNumber = document.querySelector('.js-loading-percent-number');
	static progress = document.querySelector('.js-loading-progress');
	static progressItemList = this.progress.querySelectorAll(
		'.loading__progress_item'
	);

	static init() {
		this.update();
	}

	static update() {
		gsap.to(this.percentNumber, {
			textContent: 100,
			duration: 2.4,
			ease: Ease.DoubleExpoInOut,
			snap: { textContent: 1 },
			onUpdate: () => {
				const percent = parseInt(this.percentNumber.textContent, 10);
				const progressIndex = Math.floor(
					(percent / 100) * this.progressItemList.length
				);

				this.progressItemList.forEach((item) => {
					const id = item.getAttribute('data-id');

					if (id <= progressIndex) {
						gsap.set(item, {
							opacity: 1,
						});
					}
				});
			},

			onComplete: () => {
				Frame.show();
			},
		});
	}
}

class Frame {
	static frame = document.querySelector('.js-frame');
	static frameItemList = this.frame.querySelectorAll('.frame__item');

	static show() {
		gsap.set(this.frameItemList, {
			opacity: 0,
		});
		gsap.set(this.frameItemList[0], {
			x: '35vw',
			y: '20vh',
		});
		gsap.set(this.frameItemList[1], {
			x: '-35vw',
			y: '20vh',
		});
		gsap.set(this.frameItemList[2], {
			x: '-35vw',
			y: '-20vh',
		});
		gsap.set(this.frameItemList[3], {
			x: '35vw',
			y: '-20vh',
		});

		gsap.set(this.frame, {
			y: '-2.4vh',
			opacity: 1,
		});

		const tl = gsap.timeline();

		tl.to(this.frameItemList, {
			opacity: 1,
			duration: 0.4,
			ease: Ease.gleasing,
		});

		tl.to(
			this.frameItemList,
			{
				x: 0,
				y: 0,
				duration: 0.4,
				ease: 'back.out(1.7)',
			},
			'+=0.2'
		);

		tl.to(
			this.frame,
			{
				y: 0,
				duration: 0.4,
				ease: Ease.gleasing,
			},
			'<'
		);

		tl.to(
			Loading.loading,
			{
				opacity: 0,
				duration: 0.24,
				ease: Ease.DoubleSineOut,
				onStart: () => {
					Character.show();
					Focus.lineDraw();
					Focus.cursorDraw();
					Focus.cursorZoomIn();
				},
			},
			'<'
		);
	}

	static tikatika() {
		gsap.to(this.frame, {
			...tikatika,
			repeat: 1,
			repeatDelay: 0.4,
		});
	}
}

class CirclePath {
	static container = document.querySelector('.js-circle-path');
	static ItemList = this.container.querySelectorAll('.circle-path__item');

	static draw() {
		const tl = gsap.timeline({
			onStart: () => {
				gsap.set(this.container, {
					opacity: 1,
				});
			},
		});

		this.ItemList.forEach((item, index) => {
			const path = item.querySelector('path');
			const pathLength = path.getTotalLength();

			gsap.set(path, {
				strokeDasharray: pathLength,
				strokeDashoffset: pathLength,
			});

			tl.to(
				path,
				{
					strokeDashoffset: 0,
					duration: 0.4,
					ease: Ease.gleasing,
				},
				index !== 0 ? '<' : ''
			);
		});
	}
}

class Character {
	static character = document.querySelector('.js-character');
	static head = this.character.querySelector('.js-character-head');
	static face = this.character.querySelector('.js-character-face');
	static eye = this.character.querySelector('.js-character-eye');

	static show() {
		gsap.set(this.character, {
			scale: 0.5,
		});

		const tl = gsap.timeline();

		tl.to(this.character, {
			opacity: 1,
			duration: 0.24,
			ease: Ease.DoubleSineOut,
		});

		tl.to(
			this.character,
			{
				scale: 1.2,
				duration: 0.4,
				ease: 'back.out(1.7)',
				onComplete: () => {
					Frame.tikatika();
				},
			},
			'-=0.12'
		);

		tl.fromTo(
			this.head,
			{
				skewX: 10,
				skewY: -10,
			},
			{
				skewX: -10,
				skewY: 10,
				duration: 0.32,
				ease: 'back.out(1.7)',
			},
			'<'
		);

		tl.fromTo(
			this.face,
			{
				xPercent: 2,
				yPercent: 10,
				skewX: 10,
				skewY: -10,
			},
			{
				xPercent: -2,
				yPercent: -10,
				skewX: -10,
				skewY: 10,
				duration: 0.32,
				ease: Ease.gleasing,
			},
			'<'
		);

		tl.fromTo(
			this.eye,
			{
				xPercent: 8,
				yPercent: 16,
				skewX: 10,
				skewY: -10,
			},
			{
				xPercent: -8,
				yPercent: -16,
				skewX: -10,
				skewY: 10,
				duration: 0.32,
				ease: Ease.gleasing,
				onComplete: () => {
					CirclePath.draw();
				},
			},
			'<'
		);

		tl.to(
			this.character,
			{
				scale: 1,
				duration: 0.32,
				ease: Ease.gleasing,
				onStart: () => {
					Focus.cursorZoomOut();
				},
			},
			'+=0.12'
		);

		tl.to(
			this.head,
			{
				skewX: 0,
				skewY: 0,
				duration: 0.32,
				ease: Ease.gleasing,
			},
			'<'
		);

		tl.to(
			this.face,
			{
				xPercent: 0,
				yPercent: 0,
				skewX: 0,
				skewY: 0,
				duration: 0.32,
				ease: Ease.gleasing,
			},
			'<'
		);

		tl.to(
			this.eye,
			{
				xPercent: 0,
				yPercent: 0,
				skewX: 0,
				skewY: 0,
				duration: 0.32,
				ease: Ease.gleasing,
			},
			'<'
		);
	}
}

class Focus {
	static container = document.querySelector('.js-focus');
	static line = this.container.querySelector('.js-focus-line');
	static cursor = this.container.querySelector('.js-focus-cursor');
	static itemList = this.container.querySelectorAll('.js-focus-item');

	static lineDraw() {
		const lineList = this.line.querySelectorAll('.js-focus-line-item');

		lineList.forEach((line) => {
			const tl = gsap.timeline();

			const lineBase = line.querySelector('.js-focus-line-item-base');
			const lineScaleList = line.querySelectorAll(
				'.js-focus-line-item-scale'
			);
			const lineCircle = line.querySelector('.js-focus-line-item-circle');

			gsap.set(lineBase, {
				scaleX: 0,
				transformOrigin: 'right',
			});

			gsap.set(lineScaleList, {
				x: '2vw',
				scaleY: 0,
				transformOrigin: 'top',
			});

			gsap.set(lineCircle, {
				scale: 0,
				transformOrigin: 'center',
			});

			tl.to(lineBase, {
				scaleX: 1,
				duration: 0.2,
				ease: Ease.gleasing,
			});

			tl.to(
				lineScaleList,
				{
					x: 0,
					scaleY: 1,
					duration: 0.2,
					ease: Ease.gleasing,
					stagger: {
						each: 0.08,
						from: 'end',
					},
				},
				'<'
			);

			tl.to(
				lineCircle,
				{
					scale: 1,
					duration: 0.2,
					ease: Ease.gleasing,
				},
				'-=0.1'
			);
		});

		// 初期表示
		gsap.set(this.container, {
			opacity: 1,
		});
	}

	static cursorDraw() {
		const cursorList = this.cursor.querySelectorAll(
			'.js-focus-cursor-item'
		);

		cursorList.forEach((cursor) => {
			const sub = cursor.querySelector('.js-focus-cursor-item-sub');
			const main = cursor.querySelector('.js-focus-cursor-item-main');
			const long = cursor.querySelector('.js-focus-cursor-item-long');
			const circle1 = cursor.querySelector(
				'.js-focus-cursor-item-circle[data-id="1"]'
			);
			const circle2 = cursor.querySelector(
				'.js-focus-cursor-item-circle[data-id="2"]'
			);

			const subPath = sub.querySelector('path');
			const mainPath = main.querySelector('path');
			const longPath = long.querySelector('path');

			const subLength = subPath.getTotalLength();
			const mainLength = mainPath.getTotalLength();
			const longLength = longPath.getTotalLength();

			gsap.set(subPath, {
				strokeDasharray: subLength,
				strokeDashoffset: subLength,
			});
			gsap.set(mainPath, {
				strokeDasharray: mainLength,
				strokeDashoffset: mainLength,
			});
			gsap.set(longPath, {
				strokeDasharray: longLength,
				strokeDashoffset: longLength,
			});

			gsap.set(circle1, {
				opacity: 0,
			});
			gsap.set(circle2, {
				opacity: 0,
			});

			const tl = gsap.timeline();

			tl.to(subPath, {
				strokeDashoffset: 0,
				duration: 0.4,
				ease: Ease.gleasing,
			});

			tl.to(
				longPath,
				{
					strokeDashoffset: 0,
					duration: 0.4,
					ease: Ease.gleasing,
				},
				'-=0.2'
			);

			tl.to(
				mainPath,
				{
					strokeDashoffset: 0,
					duration: 0.4,
					ease: Ease.gleasing,
				},
				'-=0.2'
			);

			tl.to(
				circle1,
				{
					opacity: 1,
					duration: 0.4,
					ease: Ease.gleasing,
				},
				'-=0.2'
			);

			tl.to(
				circle2,
				{
					opacity: 1,
					duration: 0.4,
					ease: Ease.gleasing,
				},
				'-=0.2'
			);
		});
	}

	static cursorZoomIn() {
		const cursorList = this.cursor.querySelectorAll(
			'.js-focus-cursor-item'
		);

		cursorList.forEach((cursor) => {
			const sub = cursor.querySelector('.js-focus-cursor-item-sub');
			const main = cursor.querySelector('.js-focus-cursor-item-main');
			const long = cursor.querySelector('.js-focus-cursor-item-long');
			const circle1 = cursor.querySelector(
				'.js-focus-cursor-item-circle[data-id="1"]'
			);
			const circle2 = cursor.querySelector(
				'.js-focus-cursor-item-circle[data-id="2"]'
			);

			const tl = gsap.timeline();

			tl.to(sub, {
				x: '-5vw',
				scale: 1.2,
				duration: 0.4,
				ease: 'back.inOut(1.7)',
			});

			tl.to(
				[main, long, circle1, circle2],
				{
					x: '-5vw',
					scale: 1.2,
					duration: 0.4,
					ease: 'back.inOut(1.7)',
				},
				'-=0.2'
			);

			tl.to(
				this.cursor,
				{
					rotate: 45,
					duration: 0.4,
					ease: 'back.inOut(1.7)',
				},
				'<'
			);
		});
	}

	static cursorZoomOut() {
		const cursorList = this.cursor.querySelectorAll(
			'.js-focus-cursor-item'
		);

		cursorList.forEach((cursor) => {
			const sub = cursor.querySelector('.js-focus-cursor-item-sub');
			const main = cursor.querySelector('.js-focus-cursor-item-main');
			const long = cursor.querySelector('.js-focus-cursor-item-long');
			const circle1 = cursor.querySelector(
				'.js-focus-cursor-item-circle[data-id="1"]'
			);
			const circle2 = cursor.querySelector(
				'.js-focus-cursor-item-circle[data-id="2"]'
			);

			const tl = gsap.timeline();

			tl.to(this.cursor, {
				rotate: 0,
				duration: 0.4,
				ease: 'back.inOut(1.7)',
			});

			tl.to([main, long, circle1, circle2], {
				x: '0vw',
				scale: 1,
				duration: 0.4,
				ease: 'back.inOut(1.7)',
			});

			tl.to(
				sub,
				{
					x: '0vw',
					scale: 1,
					duration: 0.4,
					ease: 'back.inOut(1.7)',
				},
				'-=0.2'
			);
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	Loading.init();
});

window.addEventListener('load', () => {});
