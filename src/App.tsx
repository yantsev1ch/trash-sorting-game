import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import './App.css'
import Game from "./components/Game.tsx";
import {StartPage} from "./components/StartPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartPage/>,
    },
    {
        path: "/game",
        element: <Game/>,
    },
    {
        path: "*",
        element: <Navigate to="/"/>
    },
]);

const App = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh'
        }}>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;
