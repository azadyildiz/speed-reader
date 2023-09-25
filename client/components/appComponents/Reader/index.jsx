'use client';
import { useState, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { updateFiles } from '@/utils/api/file';

export default function Reader({ file, token }) {
  const router = useRouter();

  const { handleSubmit, control } = useForm();

  const [wordsPerMinute, setWordsPerMinute] = useState(file.wordsPerMinute);
  const [isPlaying, setIsPlaying] = useState(false);

  const [wordIndex, setWordIndex] = useState(file.wordIndex);
  const [currentWord, setCurrentWord] = useState(file.words[wordIndex]);

  useEffect(() => {
    let frameId;
    let lastRenderTime = 0;
    const targetFrameRate = 60000 / wordsPerMinute;

    const updateWordIndex = (timestamp) => {
      if (timestamp - lastRenderTime >= targetFrameRate) {
        setWordIndex((prev) => prev + 1);
        lastRenderTime = timestamp;
      }
      frameId = requestAnimationFrame(updateWordIndex);
    };

    if (isPlaying) {
      frameId = requestAnimationFrame(updateWordIndex);
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isPlaying]);

  useEffect(() => {
    setCurrentWord(file.words[wordIndex]);
  }, [wordIndex]);

  const validateWordsPerMinute = (value) => {
    const minValue = 50;
    const maxValue = 1000;
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      return 'Please enter a valid number.';
    }

    if (numericValue < minValue || numericValue > maxValue) {
      return `The words per minute value must be between ${minValue} and ${maxValue}.`;
    }

    return true;
  };

  const handlePlayButton = (data) => {
    setIsPlaying(true);
    setWordsPerMinute(parseInt(data.wordsPerMinute));
  };

  const handlePauseButton = (e) => {
    e.preventDefault();
    setIsPlaying(false);
  };

  const handleGoPrevButton = (e) => {
    e.preventDefault();
    setWordIndex((prev) => {
      if (prev < 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const handleGoNextButton = (e) => {
    e.preventDefault();
    setWordIndex((prev) => {
      if (prev === file.fileWordsLength - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const handleExitButton = async () => {
    var data = { wordIndex, wordsPerMinute };
    await updateFiles({ token, fileId: file.id, data })
      .then((res) => {
        router.push('/app');
        router.refresh();
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (
    <div id="appContainer" className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 md:px-8 calculated-app-height">
      <div className="w-full">
        <button onClick={handleExitButton} className="button-dark mb-8">
          Save & Exit
        </button>
        <h2 className="my-4 text-center text-brand-color break-words">{file.fileName}</h2>
      </div>
      <h2 className=" w-full text-center my-4 text-3xl sm:text-4xl tracking-wide break-words">{currentWord}</h2>
      <div>
        <form onSubmit={handleSubmit(handlePlayButton)}>
          <h3 className="my-4 tracking-wide text-center">
            {wordIndex} / {file.fileWordsLength}
          </h3>
          <div id="wpmWrapper" className="flex flex-col justify-center items-center my-2">
            <Controller
              name="wordsPerMinute"
              control={control}
              defaultValue={file.wordsPerMinute}
              rules={{ validate: validateWordsPerMinute }} // Kuralları belirtin
              render={({ field, fieldState }) => (
                <>
                  <p className="text-red-500 h-12 sm:h-6 mb-2">{fieldState.error && fieldState.error.message}</p>
                  <label htmlFor="wordsPerMinute" className="text-base text-dark-color mb-2">
                    Words Per Minute
                  </label>
                  <input {...field} id="wordsPerMinute" className={`text-base border border-dark-color p-2 text-center w-16 ${isPlaying ? 'opacity-80' : ''}`} type="number" disabled={isPlaying} />
                </>
              )}
            />
          </div>
          <div id="buttonWrapper" className="flex justify-center items-center my-4">
            <button disabled={wordIndex === 0 || isPlaying} id="goPrevButton" onClick={handleGoPrevButton} title="goPrevButton" className={`bg-dark-color p-3 rounded-full hover-effect flex justify-center items-center mr-2 ${wordIndex === 0 || isPlaying ? 'opacity-80' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} className="w-6 h-6 stroke-light-color fill-light-color">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
              </svg>
            </button>

            {isPlaying ? (
              <button type="button" onClick={handlePauseButton} id="pauseButton" title="pauseButton" className="bg-dark-color p-4 rounded-full hover-effect flex justify-center items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} className="w-12 h-12 stroke-light-color fill-light-color">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              </button>
            ) : (
              <button type="submit" id="playButton" title="playButton" className="bg-dark-color p-4 rounded-full hover-effect flex justify-center items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} className="w-12 h-12 stroke-light-color fill-light-color">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </button>
            )}

            <button disabled={wordIndex === file.fileWordsLength - 1 || isPlaying} id="goNextButton" onClick={handleGoNextButton} title="goNextButton" className={`bg-dark-color p-3 rounded-full hover-effect flex justify-center items-center mr-2 ${wordIndex === file.fileWordsLength - 1 || isPlaying ? 'opacity-80' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} className="w-6 h-6 stroke-light-color fill-light-color">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
