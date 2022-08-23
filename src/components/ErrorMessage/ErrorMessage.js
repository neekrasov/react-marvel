import gif from './error.gif'
const ErrorMessage = ({style}) => {
    return (
        <>
            <p style={{position: "absolute",top: '15px', color: '#9F0013', textShadow: "1px 0 1px #fff", fontSize: '22px'}}>Element not found, please check if it is correct or try again.</p>
            <img style={style} src={gif} alt="error" />
        </>
    )
}

export default ErrorMessage;