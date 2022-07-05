export enum BODY_STATE {
	GRABBING = 'grabbing',
	HIDE_SCROLL = 'hide-scroll'
}

export class BodyStateHelper {
	static add(state: BODY_STATE) {
		document.body.classList.add(state);
	}

	static remove(state: BODY_STATE) {
		document.body.classList.remove(state);
	}
}
