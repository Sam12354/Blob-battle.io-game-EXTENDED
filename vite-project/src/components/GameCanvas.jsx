import { useRef, useEffect } from 'react';
import { feed } from '../utils/feedMass/feed.js';
import { moveCellsTowardMouse } from '../utils/playerCells/moveCells.js';
import { updatePlayerCells } from '../utils/playerCells/updatePlayerCells.js';
import { handleSplit } from '../utils/splitCell/split.js';
import { separateCells } from '../utils/playerCells/separateCells.js'
import { handleFoodCollision } from '../utils/food/handleFoodCollision.js';
import { handleEjectedMassCollision } from '../utils/ejectedMass/handleEjectedMassCollision.js';
import { createFood } from '../utils/food/createFood.js'
import { drawGrid } from '../utils/map/drawGrid.js';
import { useCellMerging } from '../hooks/useCellMerging.js';
import { feedVirusWithEjectedMass } from '../utils/viruses/virusFeedingUtils.js'
import { externalVirusFeeding } from '../utils/viruses/virusExternalFeedingUtils.js';
import { updateVirusPositions } from '../utils/viruses/virusMovementUtils.js';
import { handleVirusPlayerCollision } from '../utils/viruses/virusPlayerCollisionUtils.js';
import { popPlayerByVirus } from '../utils/viruses/popPlayerByVirus.js';
import { drawVirus } from '../utils/viruses/virusDrawUtils.js';
import { drawEjectedMass } from '../utils/ejectedMass/drawEjectedMass.js';
import { drawFood } from '../utils/food/drawFood.js';
import { drawCells } from '../utils/viruses/drawCellsUnderVirus.js';
import { drawViruses } from '../utils/viruses/drawViruses.js';
import { drawCellsAboveVirus } from '../utils/viruses/drawCellsAboveVirus.js';
import { createViruses } from '../utils/viruses/createVirus.js';
import { splitCellsByVirusSize } from '../utils/playerCells/sortCellsByVirusSize.js';
import { updateEjectedMass } from '../utils/ejectedMass/updateEjectedMass.js';


const GameCanvas = () => {

    const virusFeedAmount = 5;
    const virusShootMassThreshold = 150;
    const virusMaxDistance = 500;

    const initialVirusCount = 9;
    const virusRef = useRef(createViruses(initialVirusCount));

    const ejectedMassRef = useRef([]);
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const mapWidth = 5000;
    const mapHeight = 5000;
    const maxSpeed = 5;
    const initialFoodCount = 700;
    const respawnCount = 10;
    const respawnInterval = 4000;
    const mergeDelay = 20000; // 20 seconds before merge allowed


    const radius = (mass) => Math.sqrt(mass) * 5;

    const foodRef = useRef(createFood(initialFoodCount, mapWidth, mapHeight));

    const playerRef = useRef([
        { id: 1, x: 2500, y: 2500, mass: 25, vx: 0, vy: 0, splitTime: Date.now() - mergeDelay }
    ]);

    const { handleCellMerging } = useCellMerging(playerRef, radius);
    const lastMousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });


    useEffect(() => {

        const handleMouseMove = (e) => {
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animationFrameId;

        const respawnIntervalId = setInterval(() => {
            const newFood = createFood(respawnCount, mapWidth, mapHeight);
            foodRef.current = foodRef.current.concat(newFood);
        }, respawnInterval);


        const renderGame = () => {
            // Calculate average X and Y positions of all player cells to find the center point
            const avgX = playerRef.current.reduce((sum, c) => sum + c.x, 0) / playerRef.current.length;
            const avgY = playerRef.current.reduce((sum, c) => sum + c.y, 0) / playerRef.current.length;

            const padding = 800;

            // Calculate how much to shift the camera so the player stays centered on the screen,
            // but clamp the values so the camera doesn't scroll beyond the map boundaries
            const offsetX = clamp(canvas.width / 2 - avgX, canvas.width - mapWidth - padding, padding);
            const offsetY = clamp(canvas.height / 2 - avgY, canvas.height - mapHeight - padding, padding);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            virusRef.current.forEach(virus => {
                drawVirus(ctx, virus);
            });

            ctx.fillStyle = '#fafafa';

            // Draws a solid rectangle as the background
            ctx.fillRect(offsetX, offsetY, mapWidth, mapHeight);

            // Draws grid lines on top to give structure
            drawGrid(ctx, offsetX, offsetY, mapWidth, mapHeight);

            // offsetX - 1000 = start drawing the grid before the window starts (so there are lines off-screen too)
            // mapWidth + 2000 = draw the grid wider than the map (so even when you move, lines are still there)
            // We subtract first to start drawing earlier, and we add after to extend the size beyond the visible area.
            drawGrid(ctx, offsetX - 1000, offsetY - 1000, mapWidth + 2000, mapHeight + 2000);
            // da ima kvadrat4eta na padding

            drawFood(ctx, foodRef.current, offsetX, offsetY);

            virusRef.current.forEach(virus => {
                drawVirus(ctx, {
                    ...virus,
                    x: offsetX + virus.x,
                    y: offsetY + virus.y,
                });
            });

            drawEjectedMass(ctx, ejectedMassRef.current, offsetX, offsetY);

            const { smaller, bigger } = splitCellsByVirusSize(playerRef.current, virusRef.current);

            drawCells(ctx, smaller, offsetX, offsetY); // smaller cells

            drawViruses(ctx, virusRef.current, offsetX, offsetY);

            drawCellsAboveVirus(ctx, bigger, offsetX, offsetY);

        };


        const gameLoop = () => {

            updatePlayerCells(playerRef.current, clamp, mapWidth, mapHeight);
            separateCells(playerRef, radius, clamp, mapWidth, mapHeight);
            moveCellsTowardMouse(canvasRef.current, playerRef, mouseRef, maxSpeed);

            updateEjectedMass(ejectedMassRef.current, clamp, mapWidth, mapHeight);

            handleEjectedMassCollision(ejectedMassRef, playerRef, radius);
            handleFoodCollision(foodRef, playerRef, radius);

            externalVirusFeeding({
                virusRef,
                virusFeedAmount,
                virusShootMassThreshold,
                radius,
            });

            updateVirusPositions({
                virusRef,
                radius,
                mapWidth,
                mapHeight,
                virusMaxDistance,
            });

            feedVirusWithEjectedMass({
                playerRef,
                ejectedMassRef,
                virusRef,
                virusFeedAmount,
                radius,
            });

            handleVirusPlayerCollision({
                playerRef,
                virusRef,
                radius,
                popPlayerByVirus, 
            });

            handleCellMerging();
            renderGame();
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleKeyDown = (e) => {
            if (e.code === 'Space') handleSplit(playerRef, mouseRef, canvasRef.current, radius, mergeDelay);
            if (e.code === 'KeyW') feed(lastMousePos.current, canvasRef.current, playerRef, ejectedMassRef, radius);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationFrameId);
            clearInterval(respawnIntervalId);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'block',
                backgroundColor: '#fafafa',
                cursor: 'default',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1,
            }}
        />
    );
};

// 'value' is the current number to keep within the range defined by 'min' and 'max'
// In the game, it could be a player's x or y position to prevent going outside the map boundaries

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

export default GameCanvas;