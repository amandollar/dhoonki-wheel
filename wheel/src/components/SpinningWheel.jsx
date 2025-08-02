import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Confetti } from '@/components/magicui/confetti'

const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const wheelRef = useRef(null)

  // Eight shopping sections with different deals and items
  const sections = [
    { name: "50% OFF", icon: "🛍️", color: "#8B4513", description: "Half price on any item!" },
    { name: "Free Shipping", icon: "🚚", color: "#A0522D", description: "Free delivery on your order" },
    { name: "25% OFF", icon: "💰", color: "#CD853F", description: "Quarter off your purchase" },
    { name: "Buy 1 Get 1", icon: "🎁", color: "#D2691E", description: "Get two for the price of one" },
    { name: "10% OFF", icon: "🎯", color: "#B8860B", description: "Small discount on your order" },
    { name: "Free Gift", icon: "🎪", color: "#8B4513", description: "Complimentary gift with purchase" },
    { name: "30% OFF", icon: "💎", color: "#A0522D", description: "Thirty percent off your order" },
    { name: "Cashback", icon: "💳", color: "#CD853F", description: "Get money back on your purchase" }
  ]

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)
    setShowConfetti(false)

    // Random rotation between 1024-9999 degrees like the original
    const minRotation = 1024
    const maxRotation = 9999
    const randomDegrees = Math.floor(Math.random() * (maxRotation - minRotation)) + minRotation
    const finalRotation = rotation + randomDegrees

    setRotation(finalRotation)

    // Calculate result after animation
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360
      const sectionAngle = 360 / sections.length
      const sectionIndex = Math.floor(((360 - normalizedRotation) % 360) / sectionAngle)
      setResult(sections[sectionIndex])
      setIsSpinning(false)
      setShowConfetti(true)
    }, 4000)
  }

  return (
    <MainContainer>
      {showConfetti && (
        <Confetti
          options={{
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B8860B', '#FFD700', '#FFA500', '#FF6347']
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        />
      )}
      
      <WheelContainer>
        <Wheel
          ref={wheelRef}
          style={{ transform: `rotate(${rotation}deg)` }}
          $isSpinning={isSpinning}
        >
          <WheelSection className="span1" $color="#8B4513">
            <SectionContent>🛍️</SectionContent>
          </WheelSection>
          <WheelSection className="span2" $color="#A0522D">
            <SectionContent>🚚</SectionContent>
          </WheelSection>
          <WheelSection className="span3" $color="#CD853F">
            <SectionContent>💰</SectionContent>
          </WheelSection>
          <WheelSection className="span4" $color="#D2691E">
            <SectionContent>🎁</SectionContent>
          </WheelSection>
          <WheelSection className="span5" $color="#B8860B">
            <SectionContent>🎯</SectionContent>
          </WheelSection>
          <WheelSection className="span6" $color="#8B4513">
            <SectionContent>🎪</SectionContent>
          </WheelSection>
          <WheelSection className="span7" $color="#A0522D">
            <SectionContent>💎</SectionContent>
          </WheelSection>
          <WheelSection className="span8" $color="#CD853F">
            <SectionContent>💳</SectionContent>
          </WheelSection>
        </Wheel>
        <SpinButton onClick={spinWheel} disabled={isSpinning}>
          {isSpinning ? "..." : "SPIN"}
        </SpinButton>
        <ArrowPointer />
        <WheelGlow />
      </WheelContainer>

      {result && (
        <ResultModal>
          <ResultOverlay onClick={() => setResult(null)} />
          <ResultContent>
            <ResultIcon>{result.icon}</ResultIcon>
            <ResultText>Congratulations!</ResultText>
            <ResultPrize>You won: {result.name}</ResultPrize>
            <ResultDescription>{result.description}</ResultDescription>
            <ResultButton onClick={() => setResult(null)}>
              Claim Prize
            </ResultButton>
          </ResultContent>
        </ResultModal>
      )}
    </MainContainer>
  )
}

// Styled Components
const MainContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  animation: fadeIn 1s ease 0.3s both;
  
  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }
  
  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 360px) {
    width: 250px;
    height: 250px;
  }
`

const WheelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Wheel = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  border: 10px solid #fff;
  overflow: hidden;
  transition: all ease 4s;
  box-shadow: 0 0 30px rgba(139, 69, 19, 0.1);
  
  @media (max-width: 768px) {
    border: 8px solid #fff;
  }
  
  @media (max-width: 480px) {
    border: 6px solid #fff;
  }
  
  @media (max-width: 360px) {
    border: 4px solid #fff;
  }
  
  ${props => props.$isSpinning && `
    animation: spinGlow 0.5s ease-in-out infinite alternate;
  `}
`

const WheelGlow = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 69, 19, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
`

const WheelSection = styled.span`
  width: 50%;
  height: 50%;
  display: inline-block;
  position: absolute;
  background-color: ${props => props.$color};
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &.span1 {
    clip-path: polygon(0 92%, 100% 50%, 0 8%);
    top: 96px;
    left: 0;
    
    @media (max-width: 768px) {
      top: 84px;
    }
    
    @media (max-width: 480px) {
      top: 72px;
    }
    
    @media (max-width: 360px) {
      top: 60px;
    }
  }

  &.span2 {
    clip-path: polygon(100% 92%, 0 50%, 100% 8%);
    top: 96px;
    right: 0;
    
    @media (max-width: 768px) {
      top: 84px;
    }
    
    @media (max-width: 480px) {
      top: 72px;
    }
    
    @media (max-width: 360px) {
      top: 60px;
    }
  }

  &.span3 {
    clip-path: polygon(50% 0%, 8% 100%, 92% 100%);
    bottom: 0;
    left: 96px;
    
    @media (max-width: 768px) {
      left: 84px;
    }
    
    @media (max-width: 480px) {
      left: 72px;
    }
    
    @media (max-width: 360px) {
      left: 60px;
    }
  }

  &.span4 {
    clip-path: polygon(50% 100%, 92% 0, 8% 0);
    top: 0;
    left: 96px;
    
    @media (max-width: 768px) {
      left: 84px;
    }
    
    @media (max-width: 480px) {
      left: 72px;
    }
    
    @media (max-width: 360px) {
      left: 60px;
    }
  }

  &.span5 {
    clip-path: polygon(0 40%, 100% 0%, 60% 100%);
    bottom: -2px;
    right: 194px;
    
    @media (max-width: 768px) {
      right: 170px;
    }
    
    @media (max-width: 480px) {
      right: 146px;
    }
    
    @media (max-width: 360px) {
      right: 122px;
    }
  }

  &.span6 {
    clip-path: polygon(40% 100%, 0 0%, 100% 40%);
    bottom: -2px;
    left: 194px;
    
    @media (max-width: 768px) {
      left: 170px;
    }
    
    @media (max-width: 480px) {
      left: 146px;
    }
    
    @media (max-width: 360px) {
      left: 122px;
    }
  }

  &.span7 {
    clip-path: polygon(60% 0, 100% 100%, 0 60%);
    top: -2px;
    right: 194px;
    
    @media (max-width: 768px) {
      right: 170px;
    }
    
    @media (max-width: 480px) {
      right: 146px;
    }
    
    @media (max-width: 360px) {
      right: 122px;
    }
  }

  &.span8 {
    clip-path: polygon(0 100%, 100% 60%, 40% 0);
    top: -2px;
    left: 194px;
    
    @media (max-width: 768px) {
      left: 170px;
    }
    
    @media (max-width: 480px) {
      left: 146px;
    }
    
    @media (max-width: 360px) {
      left: 122px;
    }
  }
`

const SectionContent = styled.p`
  width: 50px;
  height: 50px;
  font-size: 45px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  pointer-events: none;
  user-select: none;
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 40px;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 30px;
  }
  
  @media (max-width: 360px) {
    width: 30px;
    height: 30px;
    font-size: 25px;
  }
`

const SpinButton = styled.button`
  position: absolute;
  top: 43%;
  left: 43%;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 3px solid #fff;
  background: linear-gradient(145deg, #8B4513, #A0522D);
  color: #fff;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  animation: pulse 2s infinite;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
    font-size: 14px;
  }
  
  @media (max-width: 360px) {
    width: 45px;
    height: 45px;
    font-size: 12px;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(139, 69, 19, 0.5);
  }

  &:active {
    width: 70px;
    height: 70px;
    font-size: 16px;
    background: linear-gradient(145deg, #A0522D, #CD853F);
    
    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      font-size: 14px;
    }
    
    @media (max-width: 480px) {
      width: 50px;
      height: 50px;
      font-size: 12px;
    }
    
    @media (max-width: 360px) {
      width: 40px;
      height: 40px;
      font-size: 10px;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    animation: none;
  }

  @keyframes pulse {
    0% {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(1.09, 1.09, 1.09);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
`

const ArrowPointer = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid #8B4513;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  z-index: 10;
  animation: bounce 2s infinite;
  
  @media (max-width: 768px) {
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-top: 32px solid #8B4513;
  }
  
  @media (max-width: 480px) {
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 24px solid #8B4513;
  }
  
  @media (max-width: 360px) {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #8B4513;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -35px;
    left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #A0522D;
    
    @media (max-width: 768px) {
      top: -28px;
      left: -8px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 16px solid #A0522D;
    }
    
    @media (max-width: 480px) {
      top: -21px;
      left: -6px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 12px solid #A0522D;
    }
    
    @media (max-width: 360px) {
      top: -17px;
      left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 10px solid #A0522D;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -30px;
    left: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #8B4513;
    
    @media (max-width: 768px) {
      top: -24px;
      left: -4px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 8px solid #8B4513;
    }
    
    @media (max-width: 480px) {
      top: -18px;
      left: -3px;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 6px solid #8B4513;
    }
    
    @media (max-width: 360px) {
      top: -15px;
      left: -2px;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      border-top: 5px solid #8B4513;
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-5px);
    }
    60% {
      transform: translateX(-50%) translateY(-3px);
    }
  }
`

const ResultModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  padding: 1rem;
`

const ResultOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
`

const ResultContent = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
  position: relative;
  max-width: 90%;
  width: 400px;
  border: 2px solid #8B4513;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    padding: 2rem;
    width: 100%;
    max-width: 350px;
  }
  
  @media (max-width: 360px) {
    padding: 1.5rem;
    max-width: 300px;
  }
`

const ResultIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  left: 0;
  right: 0;
  
  @media (max-width: 480px) {
    font-size: 3rem;
  }
  
  @media (max-width: 360px) {
    font-size: 2.5rem;
  }
`

const ResultText = styled.h2`
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.3rem;
  }
`

const ResultPrize = styled.p`
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.1rem;
  }
`

const ResultDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 2rem;
  font-style: italic;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`

const ResultButton = styled.button`
  background: linear-gradient(45deg, #8B4513, #A0522D);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  @media (max-width: 360px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
  }
`

export default SpinningWheel