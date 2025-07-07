export function scrollToBottom(elt: HTMLElement) {
	elt.scrollTo({
		top: elt.scrollHeight,
		left: 0,
		behavior: 'smooth'
	});
}
