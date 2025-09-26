"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Palette, ImageIcon } from "lucide-react"

type ColorScheme = {
  name: string
  background: string
  cardBg: string
  previewBg: string
  previewCard: string
  accent: string
  text: string
  buttonBg: string
  buttonHover: string
}

type BackgroundImage = {
  name: string
  file: string
  preview: string
}

const colorSchemes: ColorScheme[] = [
  {
    name: "Clásico Rojo",
    background: "from-red-900 via-red-800 to-red-700",
    cardBg: "from-red-600 to-red-800",
    previewBg: "bg-red-700",
    previewCard: "text-white",
    accent: "text-yellow-300",
    text: "text-red-100",
    buttonBg: "bg-yellow-600",
    buttonHover: "hover:bg-yellow-700"
  },
  {
    name: "Océano Azul",
    background: "from-blue-900 via-blue-800 to-blue-700",
    cardBg: "from-blue-600 to-blue-800",
    previewBg: "bg-blue-700",
    previewCard: "text-white",
    accent: "text-cyan-300",
    text: "text-blue-100",
    buttonBg: "bg-cyan-600",
    buttonHover: "hover:bg-cyan-700"
  },
  {
    name: "Bosque Verde",
    background: "from-green-900 via-green-800 to-green-700",
    cardBg: "from-green-600 to-green-800",
    previewBg: "bg-green-700",
    previewCard: "text-white",
    accent: "text-yellow-300",
    text: "text-green-100",
    buttonBg: "bg-yellow-600",
    buttonHover: "hover:bg-yellow-700"
  },
  {
    name: "Púrpura Real",
    background: "from-purple-900 via-purple-800 to-purple-700",
    cardBg: "from-purple-600 to-purple-800",
    previewBg: "bg-purple-700",
    previewCard: "text-white",
    accent: "text-pink-300",
    text: "text-purple-100",
    buttonBg: "bg-pink-600",
    buttonHover: "hover:bg-pink-700"
  },
  {
    name: "Atardecer Naranja",
    background: "from-orange-900 via-orange-800 to-orange-700",
    cardBg: "from-orange-600 to-orange-800",
    previewBg: "bg-orange-700",
    previewCard: "text-white",
    accent: "text-yellow-300",
    text: "text-orange-100",
    buttonBg: "bg-yellow-600",
    buttonHover: "hover:bg-yellow-700"
  },
  {
    name: "Tropical Turquesa",
    background: "from-teal-900 via-teal-800 to-teal-700",
    cardBg: "from-teal-600 to-teal-800",
    previewBg: "bg-teal-700",
    previewCard: "text-white",
    accent: "text-cyan-300",
    text: "text-teal-100",
    buttonBg: "bg-cyan-600",
    buttonHover: "hover:bg-cyan-700"
  },
  {
    name: "Rosa Coral",
    background: "from-rose-900 via-rose-800 to-rose-700",
    cardBg: "from-rose-600 to-rose-800",
    previewBg: "bg-rose-700",
    previewCard: "text-white",
    accent: "text-pink-300",
    text: "text-rose-100",
    buttonBg: "bg-pink-600",
    buttonHover: "hover:bg-pink-700"
  },
  {
    name: "Medianoche Azul",
    background: "from-slate-900 via-slate-800 to-blue-900",
    cardBg: "from-slate-700 to-blue-800",
    previewBg: "bg-slate-800",
    previewCard: "text-white",
    accent: "text-blue-300",
    text: "text-slate-100",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700"
  }
]

const backgroundImages: BackgroundImage[] = [
  { name: "Ninguno", file: "", preview: "gradient" },
  { name: "Diseño 1", file: "bg1.jpg", preview: "/backgrounds/bg1.jpg" },
  { name: "Diseño 2", file: "bg2.jpg", preview: "/backgrounds/bg2.jpg" },
  { name: "Diseño 3", file: "bg3.jpg", preview: "/backgrounds/bg3.jpg" },
  { name: "Diseño 4", file: "bg4.jpg", preview: "/backgrounds/bg4.jpg" },
  { name: "Diseño 5", file: "bg5.jpg", preview: "/backgrounds/bg5.jpg" },
  { name: "Diseño 6", file: "bg6.jpg", preview: "/backgrounds/bg6.jpg" },
  { name: "Diseño 7", file: "bg7.jpg", preview: "/backgrounds/bg7.jpg" },
  { name: "Diseño 8", file: "bg8.jpg", preview: "/backgrounds/bg8.jpg" },
  { name: "Diseño 9", file: "bg9.jpg", preview: "/backgrounds/bg9.jpg" },
  { name: "Diseño 10", file: "bg10.jpg", preview: "/backgrounds/bg10.jpg" },
  { name: "Diseño 11", file: "bg11.jpg", preview: "/backgrounds/bg11.jpg" },
  { name: "Diseño 12", file: "bg12.jpg", preview: "/backgrounds/bg12.jpg" },
  { name: "Diseño 13", file: "bg13.jpg", preview: "/backgrounds/bg13.jpg" }
]

export default function RafflePostCreator() {
  const [title, setTitle] = useState("GRAN RIFA")
  const [subtitle, setSubtitle] = useState("PREMIOS DOBLES")
  const [description, setDescription] = useState("¡Primer número en salir→ GANA 🏆\nÚltimo número en salir→ GANA 🏆")
  const [price, setPrice] = useState("3")
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [selectedColorScheme, setSelectedColorScheme] = useState(0)
  const [selectedBackground, setSelectedBackground] = useState(0)

  const currentScheme = colorSchemes[selectedColorScheme]
  const currentBackground = backgroundImages[selectedBackground]
  const totalNumbers = 32
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1)

  const toggleNumber = (num: number) => {
    setSelectedNumbers(prev =>
      prev.includes(num)
        ? prev.filter(n => n !== num)
        : [...prev, num]
    )
  }

  const generatePost = () => {
    const availableNumbers = numbers.filter(n => !selectedNumbers.includes(n))
    const numbersText = availableNumbers.map(n => String(n).padStart(2, '0')).join(', ')

    return `🎉 ${title} 🎉
⭐ ${subtitle} ⭐

${description}

Números disponibles:
${numbersText}

💰 Solo $${price} por boleto

¡Corre que vuelan los números! 🚀`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePost())
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentScheme.background}`}>
      {/* Mobile-optimized header */}
      <div className="text-center py-4 px-4">
        <h1 className={`text-2xl md:text-4xl font-bold ${currentScheme.accent} mb-1`}>Creador de Posts para Rifas</h1>
        <p className={`text-sm md:text-base ${currentScheme.text}`}>Crea posts atractivos para tus rifas de Facebook</p>
      </div>

      {/* Preview Panel - Full height on mobile, top position */}
      <div className="px-4 mb-6">
        <Card
          className={`${currentBackground.file ? 'relative overflow-hidden' : `bg-gradient-to-br ${currentScheme.cardBg}`} ${currentScheme.previewCard} min-h-[50vh] md:min-h-[40vh]`}
          style={currentBackground.file ? {
            backgroundImage: `url(/backgrounds/${currentBackground.file})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          } : {}}
        >
          <CardHeader className={`pb-3 ${currentBackground.file ? 'bg-white/10 backdrop-blur-sm border-b border-white/20' : ''}`}>
            <CardTitle className={`${currentScheme.accent} text-center text-lg md:text-xl`}>Vista Previa del Post</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className={`${currentBackground.file ? 'bg-white/10 backdrop-blur-sm border border-white/20' : currentScheme.previewBg} rounded-lg p-4 md:p-6 space-y-4 h-full`}>
              <div className="text-center">
                <h2 className={`text-xl md:text-3xl font-bold ${currentScheme.accent} leading-tight`}>🎉 {title} 🎉</h2>
                <h3 className={`text-base md:text-xl ${currentScheme.accent.replace('300', '200')} mt-2`}>⭐ {subtitle} ⭐</h3>
              </div>

              <div className="text-center text-sm md:text-base whitespace-pre-line leading-relaxed">
                {description}
              </div>

              <div className="space-y-2">
                <p className={`${currentScheme.accent} font-semibold text-sm md:text-base`}>Números disponibles:</p>
                <div className="text-xs md:text-sm leading-relaxed break-words">
                  {numbers
                    .filter(n => !selectedNumbers.includes(n))
                    .map(n => String(n).padStart(2, '0'))
                    .join(', ')}
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className={`text-lg md:text-xl font-bold ${currentScheme.accent}`}>💰 Solo ${price} por boleto</p>
                <p className="text-sm md:text-base">¡Corre que vuelan los números! 🚀</p>
              </div>
            </div>

            <div className={`mt-4 ${currentBackground.file ? 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3' : ''}`}>
              <Button
                onClick={copyToClipboard}
                className={`w-full ${currentScheme.buttonBg} ${currentScheme.buttonHover} h-12 text-base font-semibold`}
              >
                <Copy className="w-5 h-5 mr-2" />
                Copiar Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Scheme Picker - Horizontal scroll on mobile */}
      <div className="px-4 mb-6">
        <Card className="bg-white/95 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
              <Palette className="w-5 h-5" />
              Esquema de Colores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
              {colorSchemes.map((scheme, index) => (
                <Button
                  key={index}
                  variant={selectedColorScheme === index ? "default" : "outline"}
                  className={`h-14 min-w-[140px] text-xs flex-shrink-0 md:min-w-0 ${
                    selectedColorScheme === index
                      ? `${currentScheme.buttonBg} ${currentScheme.buttonHover} text-white`
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedColorScheme(index)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${scheme.background} flex-shrink-0`}></div>
                    <span className="whitespace-nowrap">{scheme.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Background Image Picker */}
      <div className="px-4 mb-6">
        <Card className="bg-white/95 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
              <ImageIcon className="w-5 h-5" />
              Fondo del Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
              {backgroundImages.map((background, index) => (
                <Button
                  key={index}
                  variant={selectedBackground === index ? "default" : "outline"}
                  className={`h-20 min-w-[120px] text-xs flex-shrink-0 md:min-w-0 relative overflow-hidden ${
                    selectedBackground === index
                      ? `${currentScheme.buttonBg} ${currentScheme.buttonHover} text-white`
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedBackground(index)}
                >
                  {background.preview === "gradient" ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded bg-gradient-to-br ${currentScheme.background}`}></div>
                      <span className="text-xs">{background.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-8 h-8 rounded bg-cover bg-center border"
                        style={{ backgroundImage: `url(${background.preview})` }}
                      ></div>
                      <span className="text-xs">{background.name}</span>
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Panel - Full width on mobile */}
      <div className="px-4 mb-6">
        <Card className="bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-gray-800 text-lg">Configuración de la Rifa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Título Principal</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="GRAN RIFA"
                className="text-lg font-bold h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Subtítulo</label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="PREMIOS DOBLES"
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Descripción</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción de los premios..."
                rows={4}
                className="text-base"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Precio por Boleto ($)</label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3"
                type="number"
                className="h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Numbers Grid */}
      <div className="px-4 pb-6">
        <Card className="bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-gray-800 text-lg">Seleccionar Números Vendidos</CardTitle>
            <p className="text-sm text-gray-600">Toca los números que ya se han vendido</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
              {numbers.map((num) => (
                <Button
                  key={num}
                  variant={selectedNumbers.includes(num) ? "destructive" : "outline"}
                  className={`aspect-square p-0 text-sm font-bold h-12 w-12 ${
                    selectedNumbers.includes(num)
                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-green-50 hover:bg-green-100 text-green-800 border-green-300"
                  }`}
                  onClick={() => toggleNumber(num)}
                >
                  {String(num).padStart(2, '0')}
                </Button>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="font-medium">Disponible ({numbers.length - selectedNumbers.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <span className="font-medium">Vendido ({selectedNumbers.length})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}