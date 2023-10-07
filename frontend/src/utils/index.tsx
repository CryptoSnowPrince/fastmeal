import { MODE, global } from "@/constants/config";

export function getPresaleStatusInfo() {
    const now = Date.now() / 1000;
    if (now < global.START_TIME) {
        return { mode: MODE.BEFORE_PRESALE, time: global.START_TIME - now };
    }

    if (now < global.END_TIME) {
        return { mode: MODE.ACTIVE_PRESALE, time: global.END_TIME - now };
    }

    if (now < global.END_TIME + global.CLIFF_TIME) {
        return { mode: MODE.CLIFF_DURATION, time: global.END_TIME + global.CLIFF_TIME - now };
    }

    return { mode: MODE.VESTING_DURATION, time: now - (global.END_TIME + global.CLIFF_TIME) };
}

export const displayRemainTime = (seconds: number) => {
    // console.log('DownCounter displayRemainTime: ', seconds)
    if (seconds > 0) {
        // Calculating the days, hours, minutes and seconds left
        const timeDays = Math.floor(seconds / (60 * 60 * 24))
        const timeHours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60))
        const timeMinutes = Math.floor((seconds % (60 * 60)) / 60)
        const timeSeconds = Math.floor(seconds % 60)

        if (timeDays > 0) {
            return `${timeDays}d ${timeHours}h ${timeMinutes}m ${timeSeconds}s`
        } else if (timeHours > 0) {
            return `${timeHours}h ${timeMinutes}m ${timeSeconds}s`
        } else if (timeMinutes > 0) {
            return `${timeMinutes}m ${timeSeconds}s`
        } else if (timeSeconds > 0) {
            return `${timeSeconds}s`
        }
    }

    return `--`
}

export const displayTimeAmount = (seconds: number) => {
    // console.log('displayTimeAmount: ', seconds)
    let retString = "";
    if (seconds > 0) {
        // Calculating the days, hours, minutes and seconds left
        const timeDays = Math.floor(seconds / (60 * 60 * 24))
        const timeHours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60))
        const timeMinutes = Math.floor((seconds % (60 * 60)) / 60)
        const timeSeconds = Math.floor(seconds % 60)

        if (timeDays > 0) {
            retString = `${timeDays} Days`
        }
        if (timeHours > 0) {
            retString = `${retString} ${timeHours} Hours`
        }
        if (timeMinutes > 0) {
            retString = `${retString} ${timeMinutes} Minutes`
        }
        if (timeSeconds > 0) {
            retString = `${retString} ${timeSeconds} Seconds`
        }
        return retString;
    }

    return `--`
}
