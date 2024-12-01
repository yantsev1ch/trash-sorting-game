import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import './App.css'
import Game from "./components/Game.tsx";
import {StartPage} from "./components/StartPage.tsx";
import {useEffect, useState} from "react";
import {Loader} from "./components/Loader/Loader.tsx";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        window.onload = () => setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    height: '100vh'
                }}>
                <Loader/>
            </div>)
    }

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
