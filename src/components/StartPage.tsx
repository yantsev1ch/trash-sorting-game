import {useNavigate} from "react-router-dom";

export const StartPage = () => {

    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                height: '100%'
            }}>
            <button onClick={startGame}
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        width: 250,
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        border: 'none',
                        transition: 'background-color 0.3s, color 0.3s',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#c4c0c0';
                        (e.target as HTMLButtonElement).style.color = '#333';
                    }}
                    onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = 'white';
                        (e.target as HTMLButtonElement).style.color = 'black';
                    }}>
                Начать играть
            </button>
            <footer
                style={{
                    position: 'absolute',
                    bottom: 10,
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#000000',
                    width: '100%',
                }}>
                <div>"Мачулищанский детский сад №3"</div>
                <div>Все права защищены. Разработал: <a
                    href="https://t.me/yantsev1ch"
                    target="_blank"
                    rel="noopener noreferrer">@yantsev1ch</a></div>
            </footer>
        </div>
    );
};
