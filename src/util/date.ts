
export function formatDateStringMMYY(dateString: string) {
    return new Date(Date.parse(dateString)).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });
}
