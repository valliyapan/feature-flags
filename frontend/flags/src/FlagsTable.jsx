import './FlagsTable.css'

export default function FlagsTable({ flags, toggleFlag }) {

    function getTableBody() {
        return (
            <tbody>
                {
                    flags.map((flag) => (
                        <tr key={flag.key}>
                            <td>
                                {
                                    <input type="checkbox" checked={flag.enabled} onChange={() => toggleFlag(flag.key)} />
                                }
                            </td>
                            <td>{flag.key}</td>
                            <td>{flag.name}</td>
                            <td>{flag.owner}</td>
                            <td>{flag.updatedAt}</td>
                        </tr>
                    ))
                }
            </tbody>
        )
    }

    function getTableHeaders() {
        return (
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Updated at</th>
                </tr>
            </thead>
        )
    }

    return (
        <div className="flags-table-container">
            <table className="flags-table">
                {getTableHeaders()}
                {getTableBody()}
            </table>
        </div>
    )
}