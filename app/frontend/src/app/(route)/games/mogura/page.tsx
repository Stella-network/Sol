"use client"

import React, { useState, useEffect } from 'react';
import styles from './MoguraGame.module.css';
import Image from 'next/image';
import { Button } from '@mui/material';

const MoguraPage = (): JSX.Element => {
    const [score, setScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
    const [gameActive, setGameActive] = useState<boolean>(false);

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

    /**
     * ゲームをスタートした時に実行される関数
     * 
     * @return {void}
     */
    const startGame = ():void => {
        setScore(0);
        setTimeLeft(30);
        setMoles(Array(9).fill(false));
        setGameActive(true);
    };

    /**
     * もぐらをたたいた時に実行される関数
     * 
     * @param {number} index 
     * @return {void}
     */
    const hitMole = (index: number):void => {
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
            <h1>もぐらたたきゲーム</h1>
            <div className={styles.scoreTime}>
                <p style={{fontSize: "20px"}}>スコア: {score}</p>
                <p style={{fontSize: "20px"}}>残り時間: {timeLeft}秒</p>
            </div>
            <div className={styles.gameBoard}>
                {moles.map((mole:boolean, index:number) => (
                    <Image
                        src={mole ? '/mole.png' : '/hole.png'}
                        alt={'mole'}
                        width={100}
                        height={100}
                        onClick={() => hitMole(index)}
                    />
                ))}
            </div>
            {!gameActive && (
                <Button
                    variant='contained'
                    color='warning'
                    style={{
                        marginTop: '40px',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        padding: '10px 20px'
                    }}
                    onClick={startGame}
                >
                    ゲームスタート
                </Button>
            )}
            <div
                style={{
                    marginTop: '40px'
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