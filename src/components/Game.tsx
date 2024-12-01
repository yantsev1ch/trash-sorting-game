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
            {id: 'bulbs', pathname: images.wastes.bulbs, type: WasteType.Electronic, isCorrect: false},
            {id: 'plates', pathname: images.wastes.plates, type: WasteType.Glass, isCorrect: false},
            {id: 'vase', pathname: images.wastes.vase, type: WasteType.Glass, isCorrect: false},
            {id: 'hammer', pathname: images.wastes.hammer, type: WasteType.Metal, isCorrect: false},
            {id: 'keys', pathname: images.wastes.keys, type: WasteType.Metal, isCorrect: false},
            {id: 'spring', pathname: images.wastes.spring, type: WasteType.Metal, isCorrect: false},
            {id: 'broccoli', pathname: images.wastes.broccoli, type: WasteType.Organic, isCorrect: false},
            {id: 'eggs', pathname: images.wastes.eggs, type: WasteType.Organic, isCorrect: false},
            {id: 'sandwiches', pathname: images.wastes.sandwiches, type: WasteType.Organic, isCorrect: false},
            {id: 'books', pathname: images.wastes.books, type: WasteType.Paper, isCorrect: false},
            {id: 'list', pathname: images.wastes.list, type: WasteType.Paper, isCorrect: false},
            {id: 'toiletPaper', pathname: images.wastes.toiletPaper, type: WasteType.Paper, isCorrect: false},
            {id: 'shampoo', pathname: images.wastes.shampoo, type: WasteType.Plastic, isCorrect: false},
            {id: 'yogurt', pathname: images.wastes.yogurt, type: WasteType.Plastic, isCorrect: false},
            {id: 'shovel', pathname: images.wastes.shovel, type: WasteType.Plastic, isCorrect: false},
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
