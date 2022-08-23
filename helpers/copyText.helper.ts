export class CopyTextHelper {
	static copyText(val) {
		const el = document.createElement('textarea');
		el.value = val;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}
}
