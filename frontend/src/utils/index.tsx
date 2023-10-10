import { MODE, global, token } from "@/constants/config";

export function getPresaleStatusInfo() {
    const now = Math.round(Date.now() / 1000);
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
    // console.log('displayRemainTime: ', seconds)
    if (seconds > 0) {
        // Calculating the days, hours, minutes and seconds left
        const timeDays = Math.floor(seconds / (60 * 60 * 24))
        const timeHours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60))
        const timeMinutes = Math.floor((seconds % (60 * 60)) / 60)
        const timeSeconds = Math.floor(seconds % 60)

        if (timeDays > 0) {
            return `${timeDays}D ${timeHours}H ${timeMinutes}M ${timeSeconds}S`
        } else if (timeHours > 0) {
            return `${timeHours}H ${timeMinutes}M ${timeSeconds}S`
        } else if (timeMinutes > 0) {
            return `${timeMinutes}M ${timeSeconds}S`
        } else if (timeSeconds > 0) {
            return `${timeSeconds}S`
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

export function formatNumber(num: number) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    } else {
        return num.toFixed(2);
    }
}

export function isSupportedChain(chain: any) {
    if (!chain) return false

    return global.chainIds.includes(chain.id);
}

export function getWalletWarningMsg(chain: any, address: any) {
    if (!address) {
        return 'Please connect wallet!'
    } else if (!chain) {
        return 'Please connect wallet to Ethereum Mainnet or other supported chain!'
    }
    const isSupported = isSupportedChain(chain);
    if (!isSupported) {
        return 'Please connect wallet to Ethereum Mainnet or other supported chain!'
    }

    return ""
}

export function getPresaleMsg(presaleMode: any) {
    if (!presaleMode) {
        return ""
    }

    if (MODE.BEFORE_PRESALE === presaleMode) {
        return "Coming Soon!"
    }

    if (MODE.ACTIVE_PRESALE === presaleMode) {
        return "Presale is alive!"
    }

    if (MODE.CLIFF_DURATION === presaleMode) {
        return "Vesting Soon!"
    }

    if (MODE.VESTING_DURATION === presaleMode) {
        return "Vesting is alive!"
    }
}

export function getDefaultGas() {
    return 0.02
}

export function getMaxValue(tokenBalance: number, isNative: boolean) {
    if (isNative) {
        const defaultGas = getDefaultGas()
        return tokenBalance - defaultGas
    }

    return tokenBalance
}

export function delayMs(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
        // console.log(`${ms}ms delay...`)
    });
}
