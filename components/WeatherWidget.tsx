'use client'

import { useState, useEffect } from 'react'

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  city: string;
}

interface WeatherWidgetProps {
  className?: string;
}

export default function WeatherWidget({ className = '' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'Totally Awesome',
    icon: '☀️',
    city: 'Cyberspace'
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const weatherConditions = [
    { condition: 'Totally Awesome', icon: '☀️', temp: 75 },
    { condition: 'Radically Cool', icon: '⛅', temp: 68 },
    { condition: 'Tubularly Cloudy', icon: '☁️', temp: 65 },
    { condition: 'Gnarly Rain', icon: '🌧️', temp: 58 },
    { condition: 'Wicked Thunder', icon: '⛈️', temp: 60 },
    { condition: 'Bitchin\' Snow', icon: '❄️', temp: 32 },
    { condition: 'Super Hot', icon: '🔥', temp: 95 },
    { condition: 'Righteous Breeze', icon: '💨', temp: 70 }
  ]

  const cities = ['Cyberspace', 'The Internet', 'Web City', 'Digital Town', 'Pixel Village']

  useEffect(() => {
    // Simulate loading weather data
    const loadWeather = () => {
      setIsLoading(true)
      
      setTimeout(() => {
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
        const randomCity = cities[Math.floor(Math.random() * cities.length)]
        
        if (randomWeather && randomCity) {
          setWeather({
            ...randomWeather,
            temperature: randomWeather.temp + Math.floor(Math.random() * 10) - 5,
            city: randomCity
          })
        }
        setIsLoading(false)
      }, 1000)
    }

    loadWeather()
    // Update weather every 30 seconds
    const interval = setInterval(loadWeather, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const refreshWeather = () => {
    setIsLoading(true)
    setTimeout(() => {
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      const randomCity = cities[Math.floor(Math.random() * cities.length)]
      
      if (randomWeather && randomCity) {
        setWeather({
          ...randomWeather,
          temperature: randomWeather.temp + Math.floor(Math.random() * 10) - 5,
          city: randomCity
        })
      }
      setIsLoading(false)
    }, 500)
  }

  if (isLoading) {
    return (
      <div className={`table-90s ${className}`}>
        <div className="bg-gradient-rainbow p-1">
          <div className="bg-white p-4 text-center">
            <h3 className="font-comic font-bold text-neon-purple text-sm mb-2">
              🌤️ Weather Central 🌤️
            </h3>
            <div className="animate-pulse">
              <div className="text-4xl mb-2">⏳</div>
              <div>Loading weather data...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`table-90s ${className}`}>
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-white p-4 text-center">
          <h3 className="font-comic font-bold text-neon-purple text-sm mb-2">
            🌤️ Weather Central 🌤️
          </h3>
          
          <div className="space-y-2">
            <div className="text-4xl animate-pulse">
              {weather.icon}
            </div>
            
            <div className="text-2xl font-comic font-bold text-neon-orange">
              {weather.temperature}°F
            </div>
            
            <div className="text-sm font-bold text-neon-cyan">
              {weather.condition}
            </div>
            
            <div className="text-xs text-black">
              in {weather.city}
            </div>
            
            <div className="animate-marquee text-xs mt-2">
              <span className="text-neon-pink font-bold">
                ☀️ Have a RADICAL day! ☀️
              </span>
            </div>
          </div>
          
          <button
            onClick={refreshWeather}
            className="btn-90s px-2 py-1 text-xs mt-2"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  )
}