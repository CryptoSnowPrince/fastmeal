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
