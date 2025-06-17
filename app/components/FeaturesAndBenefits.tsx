"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Benefit {
  text: string;
  highlight?: string;
}

interface FeatureData {
  title: string;
  subtitle: string;
  benefits: Benefit[];
}

const featuresData: FeatureData[] = [
  {
    title: "Fractional HR Solutions",
    subtitle: "Just the right amount of People Ops.",
    benefits: [
      {
        text: "Pay only for what you need to give your spend more focus and impact.",
        highlight: "give your spend more focus and impact.",
      },
      {
        text: "Pull down just-in-time solutions to fill capabilities gaps.",
        highlight: "fill capabilities gaps.",
      },
      {
        text: "Add extra capacity to manage change and drive team productivity.",
        highlight: "manage change and drive team productivity.",
      },
    ],
  },
  {
    title: "Scalable HR Solutions",
    subtitle: "People Ops that evolve with you.",
    benefits: [
      {
        text: "Increase or decrease spend to optimize capabilities at each business stage.",
        highlight: "optimize capabilities at each business stage.",
      },
      {
        text: "Keep workload and resources matched to prevent business disruption and burnout.",
        highlight: "prevent business disruption and burnout.",
      },
      {
        text: "Access real-world experience and proven frameworks to accelerate growth.",
        highlight: "accelerate growth.",
      },
    ],
  },
  {
    title: "Strategic HR Solutions",
    subtitle: "Forward-thinking People Operations.",
    benefits: [
      {
        text: "Align your people strategy with business objectives for maximum impact.",
        highlight: "maximum impact.",
      },
      {
        text: "Build sustainable HR processes that scale with your organization.",
        highlight: "scale with your organization.",
      },
      {
        text: "Transform your workplace culture to attract and retain top talent.",
        highlight: "attract and retain top talent.",
      },
    ],
  },
];

export default function FeaturesAndBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pairRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // Clear any existing ScrollTriggers related to this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          containerRef.current?.contains(trigger.trigger)
        ) {
          trigger.kill();
        }
      });

      // Reset all elements to their initial state before animating
      pairRefs.current.forEach((pairContainer) => {
        if (!pairContainer) return;

        const featureElement = pairContainer.querySelector(".feature-content");
        const benefitItems = pairContainer.querySelectorAll(".benefit-item");

        if (featureElement) {
          gsap.set(featureElement, { opacity: 0, y: -30 });
        }

        benefitItems.forEach((item) => {
          gsap.set(item, { opacity: 0, y: 60, scale: 0.9 });
        });
      });

      pairRefs.current.forEach((pairContainer, index) => {
        if (!pairContainer) return;

        const featureElement = pairContainer.querySelector(".feature-content");
        const benefitsContainer = pairContainer.querySelector(
          ".benefits-container"
        );
        const benefitsContent =
          pairContainer.querySelector(".benefits-content");
        const benefitItems = pairContainer.querySelectorAll(".benefit-item");

        if (!featureElement || !benefitsContent) return;

        // Pin the feature until the benefits content reaches the specified point
        ScrollTrigger.create({
          trigger: benefitsContent,
          start: "top top",
          end: "bottom 35%",
          pin: featureElement,
          pinSpacing: false,
          pinType: "fixed",
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on window resize
        });

        // Animate feature entrance from top
        gsap.to(featureElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pairContainer,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate benefits appearing progressively
        benefitItems.forEach((item, itemIndex) => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [] }
  ); // scope ensures animations only affect this component

  const addToPairRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !pairRefs.current.includes(el)) {
      pairRefs.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className="relative bg-white">
      <div className="pt-0">
        {featuresData.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => addToPairRefs(el, index)}
              className="relative z-10 mb-4"
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Feature Content - Will be pinned */}
                  <div
                    className={`feature-content ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="max-w-lg pt-16">
                      <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#222222] mb-6 leading-tight">
                        <span className="italic text-[#095339]">
                          {feature.title.split(" ")[0]}
                        </span>
                        <br />
                        <span>
                          {feature.title.split(" ").slice(1).join(" ")}
                        </span>
                      </h2>
                      <p className="text-xl lg:text-2xl text-[#222222] font-medium leading-relaxed">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Benefits Container - Controls the pin duration */}
                  <div
                    className={`benefits-container ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="benefits-content bg-[#E4FAEE] rounded-3xl p-12 lg:p-16 xl:p-24 space-y-12 lg:space-y-16">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="benefit-item flex items-start space-x-6"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-[#095339] rounded-full flex items-center justify-center mt-2">
                            <svg
                              className="w-7 h-7 text-[#FAFEFB]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-2xl lg:text-3xl text-[#222222] leading-relaxed font-medium">
                            {benefit.highlight ? (
                              <>
                                {benefit.text
                                  .replace(benefit.highlight, "")
                                  .trim()
                                  .replace(/\.$/, "")}
                                <strong className="text-[#095339] font-bold">
                                  {" " + benefit.highlight}
                                </strong>
                              </>
                            ) : (
                              benefit.text
                            )}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Extra spacing to allow proper scroll duration */}
                    <div className="h-9"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
