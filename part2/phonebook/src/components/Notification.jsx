export const Notification = ( {errorMessage, successMessage} ) => {
    if (errorMessage === null && successMessage === null) {
        return null
    }

    return (
        <div className={errorMessage ? "error" : "success"}>
            {errorMessage ? errorMessage : successMessage}
        </div>
    )
}