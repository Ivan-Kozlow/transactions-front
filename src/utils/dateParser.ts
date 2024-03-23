export function parseAndFormatDate(dateString: string): string {
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}
	return new Date(dateString).toLocaleDateString(undefined, options)
}
