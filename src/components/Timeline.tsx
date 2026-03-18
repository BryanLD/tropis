import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TimeCounter } from './TimeCounter';

// Mock images since we don't have real ones
const MEMORIES = [
  { id: 1, url: 'https://cdn.discordapp.com/attachments/1468848003904442523/1468849611912384584/image.png?ex=69bc3a8d&is=69bae90d&hm=83249b78f87bc7e8e728fb5934eb5af88e00a2f91d356264d592678393057dd6&', caption: 'FOI UM DOS JOGOS Q MAIS JOGAMOS JUNTOS' },
  { id: 2, url: 'https://cdn.discordapp.com/attachments/1468848003904442523/1468850509912997920/d4b2ca50-9f0b-4c00-ad59-22167058d128.jpg?ex=69bc3b63&is=69bae9e3&hm=c4bc42e70f641ce2301f5176abe73acf49d10bb0c8c325d398365802b8fe27c0&', caption: 'eu amo jogar esses jogos de comida com vc' },
  { id: 3, url: 'https://cdn.discordapp.com/attachments/1468848003904442523/1468850966530101308/0db89fb8-c4a7-4193-90b3-928f15fe205d.jpg?ex=69bc3bd0&is=69baea50&hm=85e24bea67119b5c4f833bcc0b02b6b8b86ae79d0f414a4307c21f3ae1d62e6e&', caption: 'nosso primeiro print nen' },
  { id: 4, url: 'https://cdn.discordapp.com/attachments/1468848003904442523/1468850967750377614/3729780a-79da-49be-99af-c8408e007981.jpg?ex=69bc3bd0&is=69baea50&hm=b7b4282e8658c5220628d21d3457b9053f428210b2b8f55486ab56b905b17a26&', caption: 'sdds do jogo do bob esponja' },
  { id: 5, url: 'https://media.discordapp.net/attachments/1468848003904442523/1468850512139911233/image.png?ex=69bc3b64&is=69bae9e4&hm=cc88a3d6823935993ed55f656463a8289dec8ce98fcc8960da204624a80ca628&=&format=webp&quality=lossless&width=544&height=547', caption: 'a gente ta parecendo um picole' },
  { id: 6, url: 'https://media.discordapp.net/attachments/1468848003904442523/1468848661894266892/image3.jpg?ex=69bc39aa&is=69bae82a&hm=400b2a0982b21e739f1cf8b1af7193b82d2fb5fbea2e57d77247c9a32627c78f&=&format=webp&width=424&height=917', caption: 'ir call com voce é a melhor coisa pra mim' },    
];

const MESSAGES = [
  "eu amo cada detalhe seu",
  "eu espero ser seu pra sempre",
  "mesmo estressada vc continua sendo perfeita",
  "EU AMO MT VOCEEEEEEEEEE",
  "eu te amo minha morceguinha"
];

export default function Timeline() {
  const [started, setStarted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof MEMORIES[0] | null>(null);
  const [revealedMessages, setRevealedMessages] = useState<number[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setStarted(true);
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {
        console.log("Autoplay blocked, user must interact first");
      });
    }
    // Smooth scroll to next section
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  const triggerSurprise = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsGlitching(true);
    
    // Standard heart colors confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff4d4d', '#ffffff']
    });

    // Cactus emojis rising from the bottom
    const cactusConfetti = confetti as any;
    cactusConfetti({
      particleCount: 40,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 1 },
      shapes: ['text'],
      shapeOptions: {
        text: {
          value: ['🌵']
        }
      },
      scalar: 4,
      gravity: 0.8,
      drift: 0,
      ticks: 400
    });

    setTimeout(() => setIsGlitching(false), 2000);
  };

  const toggleMessage = (index: number) => {
    if (!revealedMessages.includes(index)) {
      setRevealedMessages([...revealedMessages, index]);
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className={`relative min-h-screen ${isGlitching ? 'animate-pulse bg-red-900/20' : ''}`}>
      {/* Background Music Player */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 glass p-2 rounded-full">
        <button 
          onClick={() => {
            if (bgMusicRef.current) {
              if (isAudioPlaying) bgMusicRef.current.pause();
              else bgMusicRef.current.play();
              setIsAudioPlaying(!isAudioPlaying);
            }
          }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isAudioPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <Music size={16} className={isAudioPlaying ? 'animate-bounce' : ''} />
        <audio ref={bgMusicRef} loop src="/music.mp3" />
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
              animate={{ 
                y: '-10vh', 
                opacity: [0, 1, 0],
                rotate: 360 
              }}
              transition={{ 
                duration: 5 + Math.random() * 10, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute text-red-500/20"
            >
              <Heart size={24 + Math.random() * 20} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-8xl font-display italic mb-8">
            ois mozi espero que goste
          </h1>
          {!started ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-12 py-4 rounded-full bg-red-500 text-white font-tech uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
            >
              Começar
            </motion.button>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              <span className="text-xs uppercase tracking-widest font-tech">rola pra baixo mozi</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={16} />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-32 pb-32"
        >
          {/* Main Counter */}
          <section className="container mx-auto px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-display mb-8">Estamos juntos há:</h2>
              <TimeCounter startDate={new Date('2026-01-06T15:07:00')} label="Desde o nosso começo" />
            </motion.div>
          </section>

          {/* Memories Section */}
          <section className="container mx-auto px-4">
            <h2 className="text-4xl font-display text-center mb-16 italic">Nossas Memórias</h2>
            <div className="relative h-[600px] md:h-[800px] w-full">
              {MEMORIES.map((img, i) => (
                <motion.div
                  key={img.id}
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  initial={{ 
                    x: Math.random() * 60 - 30 + '%', 
                    y: Math.random() * 60 - 30 + '%',
                    rotate: Math.random() * 20 - 10,
                    opacity: 0
                  }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1, zIndex: 50, rotate: 0 }}
                  onClick={() => setSelectedImage(img)}
                  className="absolute cursor-pointer group"
                  style={{ 
                    left: (i % 3) * 30 + 5 + '%', 
                    top: Math.floor(i / 3) * 40 + 5 + '%' 
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-2xl border-4 border-white/10 w-40 md:w-64 aspect-[3/4]">
                    <img 
                      src={img.url} 
                      alt="Memory" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-xs font-tech">{img.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Audio Surprise */}
          <section className="flex flex-col items-center justify-center py-20 bg-white/5">
            <h2 className="text-2xl font-tech mb-8 uppercase tracking-tighter opacity-50">Curiosidade...</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={triggerSurprise}
              className="group relative"
            >
              <div className="absolute -inset-4 bg-red-500/20 blur-xl rounded-full group-hover:bg-red-500/40 transition-all" />
              <div className="relative px-12 py-6 bg-red-600 rounded-2xl text-2xl font-bold shadow-2xl">
                NÃO APERTA 😡
              </div>
            </motion.button>
            <audio ref={audioRef} src="/surprise.mp3" />
          </section>

          {/* Hidden Messages */}
          <section className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-display text-center mb-12">Mensagens para você...</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {MESSAGES.map((msg, i) => (
                <div key={i} className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleMessage(i)}
                    className={`px-6 py-3 rounded-full font-tech text-sm transition-all ${
                      revealedMessages.includes(i) 
                        ? 'bg-white/10 text-white/40 cursor-default' 
                        : 'bg-white text-black hover:bg-red-50'
                    }`}
                  >
                    {revealedMessages.includes(i) ? 'Lido ✓' : `Mensagem ${i + 1}`}
                  </motion.button>
                  <AnimatePresence>
                    {revealedMessages.includes(i) && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-center font-display italic text-red-400"
                      >
                        "{msg}"
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Birthday Countdown */}
          <section className="container mx-auto px-4 flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display mb-8">Contagem para seu dia:</h2>
              <TimeCounter startDate={new Date('2026-07-28T00:00:00')} label="28 de Julho de 2026" />
            </div>
          </section>

          {/* Final Section */}
          <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-red-950/20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="max-w-3xl space-y-12"
            >
              <div className="flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500"
                >
                  <Heart size={80} fill="currentColor" />
                </motion.div>
              </div>
              
              <p className="text-xl md:text-3xl font-display leading-relaxed italic">
                "amor mesmo isso tudo aqui nao é nem metade doq eu sinto por voce, eu te amo tanto e eu quero continuar sendo seu pelo resto da minha vida, obrigado por estar me aturando á"
              </p>

              <div className="py-8">
                <TimeCounter startDate={new Date('2025-10-26T00:45:00')} label="Tempo que você me atura" />
              </div>

              <p className="text-xl md:text-3xl font-display leading-relaxed italic">
                "eu sempre vou fzr de tudo pra te deixar feliz mesmo q eu nao consiga, quero sempre tentar, espero um dia que aqui esteja o dia do nosso casamento"
              </p>

              <div className="pt-20 opacity-30 font-tech text-xs tracking-widest uppercase">
                Para sempre seu. YAN E MALU
              </div>
            </motion.div>
          </section>
        </motion.div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
            >
              <img 
                src={selectedImage.url} 
                alt="Full Memory" 
                className="w-full h-auto rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="absolute -bottom-12 left-0 right-0 text-center text-2xl font-display italic">
                {selectedImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
