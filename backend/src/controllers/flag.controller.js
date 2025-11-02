import * as flagDb from '../models/flag.model.js'

export function getFlag(req, res, next) {
    try {
        const searchFlag = req.query.search

        if (!searchFlag) { // return all flags when no search query provided
            const flags = flagDb.getAllFlags()
            return res.status(200).json(flags)
        }

        const flag = flagDb.getFlag(searchFlag)
        res.status(200).json(flag)
    } catch (error) {
        next(error)
    }
}

export function updateFlag(req, res, next) {
    try {
        const flagKey = req.params.key
        const { version } = req.body

        if (!flagKey || !version) {
            return res.status(400).json({ message: 'No flag key or version provided for flag update' })
        }

        const flag = flagDb.toggleFlagStatus(flagKey, version) // returns false if version mismatch
        if (!flag) {
            res.status(409).json({ message: 'Version conflict' })
        } else {
            res.status(200).json(flag)
        }
    } catch (error) {
        next(error)
    }
}

export function getStats(req, res, next) {
    try {
        const flagData = flagDb.getAllFlags()
        const total_flags = flagData.length
        const enabled_flags = flagData.filter(flag => flag.enabled === true).length
        const disabled_flags = total_flags - enabled_flags
        res.status(200).json({
            total_flags,
            enabled_flags,
            disabled_flags
        })
    } catch (error) {
        next(error)
    }
}