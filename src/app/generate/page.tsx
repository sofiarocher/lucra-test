"use client"
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import Chat from "../components/chatbox";
import Card from "../components/card-info";
import Prompt from "../components/input-prompt";
import ModalHelp from "../components/help-modal";
import LucraT from "../../../public/lucra-text.png";
import LucraI from "../../../public/lucra-img.png";
import LucraH from "../../../public/lucra-help.png";
import "animate.css";

export default function Generate() {
  const [active, setActive] = useState({ chat: false, modal: false });

  const transitionChat = useTransition(active.chat, {
    from: { opacity: 0, transform: "translateY(-100%)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
    config: { duration: 400 },
  });

  const toggleModal = () => setActive(prev => ({ ...prev, modal: !prev.modal }));
  const handleFocus = () => setActive(prev => ({ ...prev, chat: true }));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 lg:p-0 animate__animated animate__fadeIn">
      {active.modal && <ModalHelp onClose={toggleModal} />}
      {transitionChat((style, item) =>
        item ? (
          <animated.div style={style} className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <Chat title="What do you want to generate?" />
          </animated.div>
        ) : (
          !active.modal && (
            <section className="flex flex-col items-center justify-center lg:gap-20 gap-16 mt-12">
              <p className="sm:text-3xl md:text-4xl lg:text-5xl text-4xl font-bold text-transparent bg-clip-text bg-text-gradient text-center">
                How can Lucra help you today?
              </p>
              <Prompt handleFocus={handleFocus} />
              <div className="flex gap-4 lg:flex-row sm:flex-row flex-col flex-wrap mb-12 lg:w-auto w-full">
                <Card title="Text Generation" image={LucraT} alt="Lucra Text AI Model" />
                <Card title="Image Generation (Oct, 2024)" image={LucraI} alt="Lucra Image AI Model" />
                <Card title="Need Help?" image={LucraH} alt="Lucra Help AI Model" classname="hover:bg-black/10 cursor-pointer" modal={toggleModal} />
              </div>
            </section>
          )
        )
      )}
    </main>
  );
}
