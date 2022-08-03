export class WindowHelper {
	static toTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
}
