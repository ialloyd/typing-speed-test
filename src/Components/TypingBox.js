import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { generate } from "random-words";

const TypingBox = () => {

    const inputRef = useRef(null)

    const [wordsArray, setWordsArray] = useState(() => {
        return generate(50);
    })

    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(0)

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(ele => createRef(null))
    }, [wordsArray])

    function handleUserInput(e) {

        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        if (e.keyCode === 32) {

            if (allCurrChars.length <= currCharIndex) {

                allCurrChars[currCharIndex - 1].classList.remove('current-right')

            }
            else {

                allCurrChars[currCharIndex].classList.remove('current')


            }

            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current'
            setCurrWordIndex(currWordIndex + 1)
            setCurrCharIndex(0)
            return;
        }

        if (e.keyCode === 8) {

            if (currCharIndex !== 0) {

                if (allCurrChars.length === currCharIndex) {

                    allCurrChars[currCharIndex - 1].className = 'current'
                    setCurrCharIndex(currCharIndex - 1)
                    return

                }

                allCurrChars[currCharIndex].className = ''
                allCurrChars[currCharIndex - 1].className = 'current'
                setCurrCharIndex(currCharIndex - 1)
            }

            return;
        }

        if (currCharIndex === allCurrChars.length) {

            let newSpan = document.createElement('span')
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right'
            allCurrChars[currCharIndex - 1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan)
            setCurrCharIndex(currCharIndex+1)

            return;


        }

        if (e.key === allCurrChars[currCharIndex].innerText) {

            allCurrChars[currCharIndex].className = 'correct'
        }
        else {

            allCurrChars[currCharIndex].className = 'incorrect'
        }

        if (currCharIndex + 1 === allCurrChars.length) {

            allCurrChars[currCharIndex].className += ' current-right'
        }
        else {

            allCurrChars[currCharIndex + 1].className = 'current'
        }


        setCurrCharIndex(currCharIndex + 1)
    }


    function focusInput() {

        inputRef.current.focus()

    }

    useEffect(() => {

        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = 'current';

    }, [])

    return (
        <div>
            <div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {
                        wordsArray.map((word, index) =>
                            <span className='word' ref={wordsSpanRef[index]}>
                                {word.split('').map(char =>
                                    <span>{char}</span>
                                )}
                            </span>
                        )
                    }
                </div>
            </div>
            <input type='text' className='hidden-input' ref={inputRef} onKeyDown={e => handleUserInput(e)} />
        </div>
    )
}

export default TypingBox