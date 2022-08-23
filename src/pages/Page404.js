import deadpool from '../img/deadpool.png'
export const Page404 = () => {
    return (
        <>  
                <p style={{color: '#9F0013', textAlign: 'center', fontSize: "50px", textShadow: "15px 0 15px #000"}}>PAGE NOT FOUND</p> 
                <br/><br/>
                <p style={{fontSize: "400px", color: '#9F0013', textShadow: "15px 0 15px #000"}}>404</p>
            <img className="bg-decoration deadpool" src={deadpool} alt="iron-man"/>
        </>
    )

}