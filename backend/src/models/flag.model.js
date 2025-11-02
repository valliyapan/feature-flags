const flagData = [
    {
        "key": "checkout_v2",
        "name": "New Checkout Flow",
        "enabled": true,
        "owner": "pm@company.com",
        "updatedAt": "2025-10-29T10:15:000Z",
        "version": 3
    },
    {
        "key": "checkout_v3",
        "name": "New Checkout Flow",
        "enabled": false,
        "owner": "example@company.com",
        "updatedAt": "2025-10-29T10:15:000Z",
        "version": 3
    },
    {
        "key": "fast_search",
        "name": "Fast Search Rollout",
        "enabled": true,
        "owner": "search@corp.com",
        "updatedAt": "2025-10-29T10:15:000Z",
        "version": 3
    },
    {
        "key": "recs_v3",
        "name": "Recommendations Engine v3",
        "enabled": false,
        "owner": "ml@corp.com",
        "updatedAt": "2025-10-29T10:15:000Z",
        "version": 3
    }
]

export function getFlag(key) {
    return flagData.filter(flag => flag.key.toLowerCase().includes(key.toLowerCase()))
}

export function getAllFlags() {
    return flagData
}

export function toggleFlagStatus(key, version) {
    try {
        const flag = getFlag(key)[0]
        console.log('model:', version, flag.version)
        if (version != flag.version) {
            return false
        }
        flag.enabled = !flag.enabled
        flag.version++
        flag.updatedAt = new Date()
        return flag
    } catch (error) {
        return error
    }
}
