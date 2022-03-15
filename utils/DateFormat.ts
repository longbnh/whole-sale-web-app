export function DateFormat(date: string) {
    try {
        return new Date(Date.parse(date)).toLocaleDateString('vi-VI', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    }
    catch (error) {
        //TODO handle error here
    }
}