"use client"
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

// 漢字と読み方のデータ
const kanjiData = [
    { kanji: '山', reading: 'やま' },
    { kanji: '川', reading: 'かわ' },
    { kanji: '木', reading: 'き' },
    { kanji: '火', reading: 'ひ' },
    { kanji: '水', reading: 'みず' },
    { kanji: '雨', reading: 'あめ' },
    { kanji: '竹', reading: 'たけ' },
    { kanji: '車', reading: 'くるま' },
    { kanji: '家', reading: 'いえ' },
    { kanji: '今', reading: 'いま' },
    { kanji: '目', reading: 'め' },
    { kanji: '一', reading: 'いち' },
    { kanji: '石', reading: 'いし' },
    { kanji: '神', reading: 'かみ' },
    { kanji: '母', reading: 'はは' },
    { kanji: '父', reading: 'ちち' },
    { kanji: '人', reading: 'ひと' },
    { kanji: '林', reading: 'はやし' },
    { kanji: '森', reading: 'もり' },
    { kanji: '金', reading: 'きん' },
    { kanji: '三', reading: 'さん' },
    { kanji: '右', reading: 'みぎ' },
    { kanji: '左', reading: 'ひだり' },
    { kanji: '上', reading: 'うえ' },
    { kanji: '下', reading: 'した' },
    { kanji: '町', reading: 'まち' },
    { kanji: '田', reading: 'た' },
    { kanji: '畑', reading: 'はたけ' },
    { kanji: '土', reading: 'つち' },
    { kanji: '王', reading: 'おう' },
    { kanji: '玉', reading: 'たま' },
    { kanji: '月', reading: 'つき' },
    { kanji: '日', reading: 'ひ' },
];

const KanjiGame: React.FC = () => {
    const [currentKanji, setCurrentKanji] = useState<{ kanji: string; reading: string } | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 60秒のゲーム時間
    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState<'〇' | '×' | null>(null);
    const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      newQuestion();
    }
  }, [gameStarted, gameOver]);


  const newQuestion = () => {
    const newKanji = kanjiData[Math.floor(Math.random() * kanjiData.length)];
    setCurrentKanji(newKanji);

    const correctAnswer = newKanji.reading;
    const wrongAnswers = kanjiData
      .filter((k) => k.reading !== correctAnswer)
      .map((k) => k.reading)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setOptions([...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random()));
    setResult(null);
  };

  const handleAnswer = (selectedReading: string) => {
    if (currentKanji && selectedReading === currentKanji.reading) {
      setScore((prevScore) => prevScore + 10);
      setResult('〇');
    } else {
      setScore((prevScore) => Math.max(0, prevScore - 5));
      setResult('×');
    }

    setTimeout(newQuestion, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
  };

  if (!gameStarted) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>漢字ゲーム</h1>
        <Button
          variant='contained'
          color='success'
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
          onClick={startGame}
        >
          ゲームスタート
        </Button>
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
  }

  if (gameOver) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>ゲームおわり！</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>スコア: {score}</p>
        <Button
          variant='contained'
          color='primary'
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
          onClick={startGame}
        >
          もう一回やる
        </Button>
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
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>漢字ゲーム</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>スコア: {score}</p>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>残り時間: {timeLeft}秒</p>
      {currentKanji && (
        <>
          <div style={{ fontSize: '6rem', marginBottom: '4rem' }}>{currentKanji.kanji}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {options.map((option, index) => (
              <Button
                key={index}
                variant='contained'
                color='primary'
                style={{
                  fontWeight: 'bold',
                  padding: '1rem 2rem',
                  fontSize: '1.2rem',
                }}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      )}
      { result ? 
        <div style={{ height:'150px', fontSize: '5rem', marginTop: '2rem', color: result === '〇' ? 'green':'red' }}>{result}</div>
        :
        <div style={{ height:'150px'}}></div>
      }
    </div>
  );
};

export default KanjiGame;