import gif from './error.gif'
const ErrorMessage = ({style}) => {
    return (
        <img style={style} src={gif} alt="error" />
    )
}

export default ErrorMessage;