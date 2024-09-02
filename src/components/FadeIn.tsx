"use client"
import React, {useRef, useState, useEffect} from 'react'

type FadeInProps = {
    children: React.ReactNode
}

const FadeIn: React.FC<FadeInProps> = ({children}) => {
  const domRef = useRef<HTMLDivElement | null>(null)

  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entires => {
        entires.forEach(entry => setVisible(entry.isIntersecting))
    })

    if (domRef.current) {
        observer.observe(domRef.current)
    }
    return () => {
        if (domRef.current) {
            observer.unobserve(domRef.current)
        }
    }
        
  }, [])

  return (
    <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}
    >
        {children}
    </div>
  )

}

export default FadeIn