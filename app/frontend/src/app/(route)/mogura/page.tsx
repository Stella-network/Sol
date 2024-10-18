"use client"

import React, { useState, useEffect } from 'react';
import styles from './MoguraGame.module.css';

const MoguraPage = (): JSX.Element => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [moles, setMoles] = useState(Array(9).fill(false));
    const [gameActive, setGameActive] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let moleTimer: NodeJS.Timeout;

        if (gameActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            moleTimer = setInterval(() => {
                setMoles((prevMoles) => {
                    const newMoles = [...prevMoles];
                    const randomIndex = Math.floor(Math.random() * 9);
                    newMoles[randomIndex] = true;
                    setTimeout(() => {
                        setMoles((prevMoles) => {
                            const newMoles = [...prevMoles];
                            newMoles[randomIndex] = false;
                            return newMoles;
                        });
                    }, 1000);
                    return newMoles;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
            clearInterval(moleTimer);
        };
    }, [gameActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            setGameActive(false);
        }
    }, [timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setMoles(Array(9).fill(false));
        setGameActive(true);
    };

    const hitMole = (index: number) => {
        if (moles[index] && gameActive) {
            setScore((prevScore) => prevScore + 1);
            setMoles((prevMoles) => {
                const newMoles = [...prevMoles];
                newMoles[index] = false;
                return newMoles;
            });
        }
    };

    return (
        <div className={styles.container}>
            <h1>もぐら叩きゲーム</h1>
            <div className={styles.scoreTime}>
                <p style={{fontSize: "20px"}}>スコア: {score}</p>
                <p style={{fontSize: "20px"}}>残り時間: {timeLeft}秒</p>
            </div>
            <div className={styles.gameBoard}>
                {moles.map((mole, index) => (
                    <div
                        key={index}
                        className={`${styles.hole} ${mole ? styles.mole : ''}`}
                        onClick={() => hitMole(index)}
                    />
                ))}
            </div>
            {!gameActive && (
                <button className={styles.startButton} onClick={startGame}>
                    ゲームスタート
                </button>
            )}
            <div
                style={{
                    marginTop: '20px'
                }}
            >
                <a
                    href={'/'}
                >
                    {`ホームページにもどる`}
                </a>
            </div>
        </div>
    );
};

export default MoguraPage;