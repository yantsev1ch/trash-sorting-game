import {useEffect, useState} from 'react';
import WasteItem from './WasteItem/WasteItem.tsx';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import images from '../assets/images';
import TrashBin from './TrashBin';
import {Waste, WasteType} from '../config/types.ts';
import {bins} from '../config/config.ts';

const shuffleArray = <T, >(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};

const Game = () => {
    const [wastes, setWastes] = useState<Waste[]>([]);
    const [feedback, setFeedback] = useState<{ [key in WasteType]?: boolean | null }>({});
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (gameStarted) return;

        setWastes(shuffleArray([
            {id: 'battery', pathname: images.wastes.battery, type: WasteType.Electronic, isCorrect: false},
            {id: 'laptop', pathname: images.wastes.laptop, type: WasteType.Electronic, isCorrect: false},
            {id: 'mobile', pathname: images.wastes.mobile, type: WasteType.Electronic, isCorrect: false},
            {id: 'glassBottle', pathname: images.wastes.glassBottle, type: WasteType.Glass, isCorrect: false},
            {id: 'glassCup', pathname: images.wastes.glassCup, type: WasteType.Glass, isCorrect: false},
            {id: 'sodaBottle', pathname: images.wastes.sodaBottle, type: WasteType.Metal, isCorrect: false},
            {id: 'scissors', pathname: images.wastes.scissors, type: WasteType.Metal, isCorrect: false},
            {id: 'apple', pathname: images.wastes.apple, type: WasteType.Organic, isCorrect: false},
            {id: 'cheese', pathname: images.wastes.cheese, type: WasteType.Organic, isCorrect: false},
            {id: 'notebook', pathname: images.wastes.notebook, type: WasteType.Paper, isCorrect: false},
            {id: 'paperStack', pathname: images.wastes.paperStack, type: WasteType.Paper, isCorrect: false},
            {id: 'plasticBag', pathname: images.wastes.plasticBag, type: WasteType.Plastic, isCorrect: false},
            {id: 'plasticBottle', pathname: images.wastes.plasticBottle, type: WasteType.Plastic, isCorrect: false},
        ]));

        setGameStarted(true);
        setGameOver(false);
    }, [gameStarted]);

    const handleDrop = (bin: Waste) => (item: Waste) => {
        const isCorrect = item.type === bin.type;

        setFeedback((prev) => ({...prev, [bin.type]: isCorrect}));

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
            setFeedback((prev) => ({...prev, [bin.type]: null}));
        }, 1000);
    };

    const restartGame = () => {
        setGameOver(false);
        setGameStarted(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {gameOver && wastes.every((waste) => waste.isCorrect) ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        height: '50vh',
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    <button
                        onClick={restartGame}
                        style={{
                            padding: '10px 20px',
                            fontSize: '18px',
                            width: 250,
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            border: 'none',
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

            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                {bins.map((bin) => (
                    <TrashBin
                        key={bin.id}
                        pathname={bin.pathname}
                        onDrop={handleDrop(bin)}
                        isCorrect={feedback[bin.type] ?? null}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Game;
