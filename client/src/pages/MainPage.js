import React, { useState, useEffect } from 'react'

export default function MainPage() {
    const fullText = 'Make control under your finances!'
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
        let index = 0

        const intervalId = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText[index])
                index++
            } else {
                clearInterval(intervalId)
            }
        }, 5000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div>
            <h1>{fullText}</h1>
        </div>
    )
}
