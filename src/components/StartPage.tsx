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
                        border: 'none'
                    }}>
                Начать играть
            </button>
            <footer
                style={{
                    position: 'absolute',
                    bottom: 10,
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#000000',
                    width: '100%',
                }}>
                © 2024 Детский сад №3, группа 11. Все права защищены. Разработчик: <a href="https://t.me/yantsev1ch"
                                                                                      target="_blank"
                                                                                      rel="noopener noreferrer">@yantsev1ch</a>.
            </footer>
        </div>
    );
};
