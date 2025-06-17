"use client"

import { useEffect, useState } from "react"

const companies = [
  { name: "podimo", logo: "podimo" },
  { name: "PAPIER", logo: "PAPIER" },
  { name: "JOHN LEWIS & PARTNERS", logo: "JOHN LEWIS\n& PARTNERS" },
  { name: "outbrain", logo: "outbrain" },
  { name: "heygo", logo: "heygo" },
]

export default function LogoMarquee() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-12">
          The best product-led companies use data.to.design
        </h2>

        <div className="relative overflow-hidden">

          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scroll px-8">
            {/* First set of logos */}
            <div className="flex items-center justify-around min-w-full gap-8 md:gap-16">
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 px-4">
                  <LogoComponent company={company} />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex items-center justify-around min-w-full gap-8 md:gap-16">
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 px-4">
                  <LogoComponent company={company} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

function LogoComponent({ company }: { company: { name: string; logo: string } }) {
  const getLogoStyle = (name: string) => {
    switch (name) {
      case "podimo":
        return "text-2xl font-bold text-gray-800 lowercase"
      case "PAPIER":
        return "text-2xl font-light text-gray-800 tracking-wider"
      case "JOHN LEWIS\n& PARTNERS":
        return "text-lg font-medium text-gray-800 text-center leading-tight"
      case "outbrain":
        return "text-2xl font-semibold text-gray-800 flex items-center"
      case "heygo":
        return "text-2xl font-bold text-gray-800 lowercase"
      default:
        return "text-xl font-medium text-gray-800"
    }
  }

  if (company.name === "outbrain") {
    return (
      <div className={getLogoStyle(company.logo)}>
        <div className="w-6 h-6 bg-gray-800 rounded-full mr-2 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        utbrain
      </div>
    )
  }

  if (company.name === "JOHN LEWIS & PARTNERS") {
    return (
      <div className={getLogoStyle(company.logo)}>
        <div>JOHN LEWIS</div>
        <div>& PARTNERS</div>
      </div>
    )
  }

  return <div className={getLogoStyle(company.logo)}>{company.logo}</div>
}
