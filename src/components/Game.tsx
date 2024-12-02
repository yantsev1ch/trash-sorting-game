import {useEffect, useState} from 'react';
import WasteItem from './WasteItem/WasteItem.tsx';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import images from '../assets/images';
import TrashBin from './TrashBin';
import {Waste, WasteType} from '../config/types.ts';
import {bins} from '../config/config.ts';
import {preloadImages} from "../config/helpers.ts";
import {Loader} from './Loader/Loader.tsx';
import Confetti from 'react-confetti';

const shuffleArray = <T, >(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};

const Game = () => {
    const [wastes, setWastes] = useState<Waste[]>([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

    useEffect(() => {
        const loadAssets = async () => {
            const urls = [
                ...Object.values(images.wastes),
                ...bins.map((bin) => bin.pathname),
            ];
            try {
                await preloadImages(urls);

                setIsLoading(false);
            } catch (error) {
                console.error('Failed to preload images:', error);
            }
        };

        loadAssets();
    }, []);

    useEffect(() => {
        if (isLoading || gameStarted) return;

        setWastes(shuffleArray([
            {id: 'glassBottle', pathname: images.wastes.glassBottle, type: WasteType.Glass, isCorrect: false},
            {id: 'glassCup', pathname: images.wastes.glassCup, type: WasteType.Glass, isCorrect: false},
            {id: 'glassPlate', pathname: images.wastes.glassPlate, type: WasteType.Glass, isCorrect: false},
            {id: 'glassVase', pathname: images.wastes.glassVase, type: WasteType.Glass, isCorrect: false},
            {id: 'glassTumbler', pathname: images.wastes.glassTumbler, type: WasteType.Glass, isCorrect: false},
            {id: 'organicBroccoli', pathname: images.wastes.organicBroccoli, type: WasteType.Organic, isCorrect: false},
            {id: 'organicApple', pathname: images.wastes.organicApple, type: WasteType.Organic, isCorrect: false},
            {id: 'organicBanana', pathname: images.wastes.organicBanana, type: WasteType.Organic, isCorrect: false},
            {id: 'organicOrange', pathname: images.wastes.organicOrange, type: WasteType.Organic, isCorrect: false},
            {
                id: 'organicStrawberry',
                pathname: images.wastes.organicStrawberry,
                type: WasteType.Organic,
                isCorrect: false
            },
            {id: 'organicCheese', pathname: images.wastes.organicCheese, type: WasteType.Organic, isCorrect: false},
            {
                id: 'organicOrangePeel',
                pathname: images.wastes.organicOrangePeel,
                type: WasteType.Organic,
                isCorrect: false
            },
            {
                id: 'paperCraftPackage2',
                pathname: images.wastes.paperCraftPackage2,
                type: WasteType.Paper,
                isCorrect: false
            },
            {
                id: 'paperCraftPackage1',
                pathname: images.wastes.paperCraftPackage1,
                type: WasteType.Paper,
                isCorrect: false
            },
            {id: 'paperPiece', pathname: images.wastes.paperPiece, type: WasteType.Paper, isCorrect: false},
            {id: 'paperBox', pathname: images.wastes.paperBox, type: WasteType.Paper, isCorrect: false},
            {id: 'paperCraft', pathname: images.wastes.paperCraft, type: WasteType.Paper, isCorrect: false},
            {id: 'plasticShampoo', pathname: images.wastes.plasticShampoo, type: WasteType.Plastic, isCorrect: false},
            {
                id: 'plasticToothbrush',
                pathname: images.wastes.plasticToothbrush,
                type: WasteType.Plastic,
                isCorrect: false
            },
            {id: 'plasticBag', pathname: images.wastes.plasticBag, type: WasteType.Plastic, isCorrect: false},
            {id: 'plasticBottle', pathname: images.wastes.plasticBottle, type: WasteType.Plastic, isCorrect: false},
            {id: 'plasticCola', pathname: images.wastes.plasticCola, type: WasteType.Plastic, isCorrect: false},
            {id: 'plasticSnikers', pathname: images.wastes.plasticSnikers, type: WasteType.Plastic, isCorrect: false},
            {id: 'plasticThumbler', pathname: images.wastes.plasticThumbler, type: WasteType.Plastic, isCorrect: false}
        ]));

        setGameStarted(true);

        setGameOver(false);
    }, [gameStarted, isLoading]);

    const handleDrop = (bin: Waste) => (item: Waste) => {
        const isCorrect = item.type === bin.type;

        setIsCorrectAnswer(isCorrect);

        if (isCorrect) {
            setWastes((prev) =>
                prev.map((waste) =>
                    waste.id === item.id ? {...waste, isCorrect: true} : waste
                )
            );
        }

        if (wastes.every((waste) => waste.isCorrect)) {
            setGameOver(true);
        }

        setTimeout(() => {
            setIsCorrectAnswer(null);
        }, 1000);
    };

    const restartGame = () => {
        setGameOver(false);
        setGameStarted(false);
    };

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    height: '100vh',
                }}
            >
                <Loader/>
            </div>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {gameOver && wastes.every((waste) => waste.isCorrect) ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: '50vh',
                        flexDirection: 'column',
                        position: 'relative',
                        width: '100%'
                    }}
                >
                    <Confetti/>

                    <button
                        onClick={restartGame}
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
                        }}
                    >
                        Играть снова
                    </button>
                </div>
            ) : (
                <div style={{padding: 20, width: '100%'}}>
                    {wastes.map((waste) => (
                        <WasteItem
                            key={waste.id}
                            pathname={waste.pathname}
                            type={waste.type}
                            id={waste.id}
                            styles={{
                                visibility: waste.isCorrect ? 'hidden' : 'visible',
                            }}
                        />
                    ))}
                </div>
            )}

            {isCorrectAnswer !== null && !wastes.every((waste) => waste.isCorrect) && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '124px',
                        color: isCorrectAnswer ? 'green' : 'red',
                    }}
                >
                    {isCorrectAnswer ? '✅' : '❌'}
                </div>
            )}

            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                {bins.map((bin) => (
                    <TrashBin
                        key={bin.id}
                        pathname={bin.pathname}
                        onDrop={handleDrop(bin)}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Game;
