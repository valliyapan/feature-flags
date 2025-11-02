export default function Stats({ data }) {
    return (
        <div className="stats">
            {
                data && Object.keys(data).length === 3 && (
                    <p>Total flags: {data.total_flags} Enabled flags: {data.enabled_flags} Disabled flags: {data.disabled_flags}</p>
                )
            }
        </div>
    )
}