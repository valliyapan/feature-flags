import './Error.css'

export default function Error({ message }) {
    return (
        <>
            {
                message && 
                <div className="error-container">
                    <p>Something went wrong. Please retry again.</p>
                </div>
            }
        </>
    )
}