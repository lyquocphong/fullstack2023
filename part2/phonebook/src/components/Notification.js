export const Notification = ({ message, isErrorMessage }) => {
    if (message === null) {
        return null
    }

    const style = {
        color: isErrorMessage ? 'red' : 'green',
        fontSize: 14
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}