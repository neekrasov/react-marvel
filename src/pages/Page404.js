import deadpool from '../img/deadpool.png'
export const Page404 = () => {
    return (
        <>  
                <p style={{color: '#9F0013', textAlign: 'center', fontSize: "50px"}}>PAGE NOT FOUND</p> 
                <br/><br/>
                <p style={{fontSize: "400px", color: '#9F0013'}}>404</p>
            <img className="bg-decoration deadpool" src={deadpool} alt="iron-man"/>
        </>
    )

}