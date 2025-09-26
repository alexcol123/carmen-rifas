"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, ChevronDown, ChevronUp, Trash2 } from "lucide-react"

type BackgroundOption = {
  name: string
  type: 'gradient' | 'image'
  file?: string
  preview: string
  gradient?: string
  accent?: string
}

type GlassOption = {
  name: string
  bg: string
  border: string
}

const backgroundOptions: BackgroundOption[] = [
  { name: "Clásico Rojo", type: "gradient", preview: "from-red-600 to-red-800", gradient: "from-red-600 to-red-800", accent: "text-yellow-300" },
  { name: "Océano Azul", type: "gradient", preview: "from-blue-600 to-blue-800", gradient: "from-blue-600 to-blue-800", accent: "text-cyan-300" },
  { name: "Bosque Verde", type: "gradient", preview: "from-green-600 to-green-800", gradient: "from-green-600 to-green-800", accent: "text-yellow-300" },
  { name: "Púrpura Real", type: "gradient", preview: "from-purple-600 to-purple-800", gradient: "from-purple-600 to-purple-800", accent: "text-pink-300" },
  { name: "Atardecer Naranja", type: "gradient", preview: "from-orange-600 to-orange-800", gradient: "from-orange-600 to-orange-800", accent: "text-yellow-300" },
  { name: "Tropical Turquesa", type: "gradient", preview: "from-teal-600 to-teal-800", gradient: "from-teal-600 to-teal-800", accent: "text-cyan-300" },
  { name: "Rosa Coral", type: "gradient", preview: "from-rose-600 to-rose-800", gradient: "from-rose-600 to-rose-800", accent: "text-pink-300" },
  { name: "Medianoche Azul", type: "gradient", preview: "from-slate-700 to-blue-800", gradient: "from-slate-700 to-blue-800", accent: "text-blue-300" },
  { name: "Diseño 1", type: "image", file: "bg1.jpg", preview: "/backgrounds/bg1.jpg", accent: "text-yellow-300" },
  { name: "Diseño 2", type: "image", file: "bg2.jpg", preview: "/backgrounds/bg2.jpg", accent: "text-yellow-300" },
  { name: "Diseño 3", type: "image", file: "bg3.jpg", preview: "/backgrounds/bg3.jpg", accent: "text-yellow-300" },
  { name: "Diseño 4", type: "image", file: "bg4.jpg", preview: "/backgrounds/bg4.jpg", accent: "text-yellow-300" },
  { name: "Diseño 5", type: "image", file: "bg5.jpg", preview: "/backgrounds/bg5.jpg", accent: "text-yellow-300" },
  { name: "Diseño 6", type: "image", file: "bg6.jpg", preview: "/backgrounds/bg6.jpg", accent: "text-yellow-300" },
  { name: "Diseño 7", type: "image", file: "bg7.jpg", preview: "/backgrounds/bg7.jpg", accent: "text-yellow-300" },
  { name: "Diseño 8", type: "image", file: "bg8.jpg", preview: "/backgrounds/bg8.jpg", accent: "text-yellow-300" },
  { name: "Diseño 9", type: "image", file: "bg9.jpg", preview: "/backgrounds/bg9.jpg", accent: "text-yellow-300" },
  { name: "Diseño 10", type: "image", file: "bg10.jpg", preview: "/backgrounds/bg10.jpg", accent: "text-yellow-300" },
  { name: "Diseño 11", type: "image", file: "bg11.jpg", preview: "/backgrounds/bg11.jpg", accent: "text-yellow-300" },
  { name: "Diseño 12", type: "image", file: "bg12.jpg", preview: "/backgrounds/bg12.jpg", accent: "text-yellow-300" },
  { name: "Diseño 13", type: "image", file: "bg13.jpg", preview: "/backgrounds/bg13.jpg", accent: "text-yellow-300" },
  { name: "Diseño 14", type: "image", file: "bg14.jpg", preview: "/backgrounds/bg14.jpg", accent: "text-yellow-300" },
  { name: "Diseño 15", type: "image", file: "bg15.jpg", preview: "/backgrounds/bg15.jpg", accent: "text-yellow-300" },
  { name: "Diseño 16", type: "image", file: "bg16.jpg", preview: "/backgrounds/bg16.jpg", accent: "text-yellow-300" },
  { name: "Diseño 17", type: "image", file: "bg17.jpg", preview: "/backgrounds/bg17.jpg", accent: "text-yellow-300" },
  { name: "Diseño 18", type: "image", file: "bg18.jpg", preview: "/backgrounds/bg18.jpg", accent: "text-yellow-300" },
  { name: "Diseño 19", type: "image", file: "bg19.jpg", preview: "/backgrounds/bg19.jpg", accent: "text-yellow-300" },
  { name: "Diseño 20", type: "image", file: "bg20.jpg", preview: "/backgrounds/bg20.jpg", accent: "text-yellow-300" },
  { name: "Diseño 21", type: "image", file: "bg21.jpg", preview: "/backgrounds/bg21.jpg", accent: "text-yellow-300" },
  { name: "Diseño 22", type: "image", file: "bg22.jpg", preview: "/backgrounds/bg22.jpg", accent: "text-yellow-300" },
  { name: "Diseño 23", type: "image", file: "bg23.jpg", preview: "/backgrounds/bg23.jpg", accent: "text-yellow-300" },
  { name: "Diseño 24", type: "image", file: "bg24.jpg", preview: "/backgrounds/bg24.jpg", accent: "text-yellow-300" },
  { name: "Diseño 25", type: "image", file: "bg25.jpg", preview: "/backgrounds/bg25.jpg", accent: "text-yellow-300" },
  { name: "Diseño 26", type: "image", file: "bg26.jpg", preview: "/backgrounds/bg26.jpg", accent: "text-yellow-300" },
  { name: "Diseño 27", type: "image", file: "bg27.jpg", preview: "/backgrounds/bg27.jpg", accent: "text-yellow-300" },
  { name: "Diseño 28", type: "image", file: "bg28.jpg", preview: "/backgrounds/bg28.jpg", accent: "text-yellow-300" },
  { name: "Diseño 29", type: "image", file: "bg29.jpg", preview: "/backgrounds/bg29.jpg", accent: "text-yellow-300" },
  { name: "Diseño 30", type: "image", file: "bg30.jpg", preview: "/backgrounds/bg30.jpg", accent: "text-yellow-300" }
]

const glassOptions: GlassOption[] = [
  { name: "Claro", bg: "bg-white/10", border: "border-white/20" },
  { name: "Medio", bg: "bg-white/20", border: "border-white/30" },
  { name: "Oscuro", bg: "bg-black/30", border: "border-white/40" },
  { name: "Extra Oscuro", bg: "bg-black/50", border: "border-white/50" }
]

export default function RafflePostCreator() {
  const [title, setTitle] = useState("GRAN RIFA")
  const [subtitle, setSubtitle] = useState("PREMIOS DOBLES")
  const [description, setDescription] = useState("¡Primer número en salir→ GANA 🏆\nÚltimo número en salir→ GANA 🏆")
  const [price, setPrice] = useState("3")
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [selectedBackground, setSelectedBackground] = useState(0)
  const [selectedGlass, setSelectedGlass] = useState(0)
  const [sectionsOpen, setSectionsOpen] = useState({
    background: true,
    config: true,
    numbers: true
  })

  // Load all config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('rifaConfig')
    if (savedConfig) {
      const config = JSON.parse(savedConfig)
      setTitle(config.title || "GRAN RIFA")
      setSubtitle(config.subtitle || "PREMIOS DOBLES")
      setDescription(config.description || "¡Primer número en salir→ GANA 🏆\nÚltimo número en salir→ GANA 🏆")
      setPrice(config.price || "3")
      setSelectedNumbers(config.selectedNumbers || [])
      setSelectedBackground(config.selectedBackground || 0)
      setSelectedGlass(config.selectedGlass || 0)
    }
  }, [])

  // Save all config to localStorage whenever any value changes
  useEffect(() => {
    const config = {
      title,
      subtitle,
      description,
      price,
      selectedNumbers,
      selectedBackground,
      selectedGlass
    }
    localStorage.setItem('rifaConfig', JSON.stringify(config))
  }, [title, subtitle, description, price, selectedNumbers, selectedBackground, selectedGlass])

  const currentBackground = backgroundOptions[selectedBackground]
  const currentGlass = glassOptions[selectedGlass]
  const totalNumbers = 32
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1)

  const toggleNumber = (num: number) => {
    setSelectedNumbers(prev =>
      prev.includes(num)
        ? prev.filter(n => n !== num)
        : [...prev, num]
    )
  }

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const resetAllConfig = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres borrar toda la configuración y empezar una nueva rifa desde cero?\n\nEsta acción no se puede deshacer."
    )

    if (confirmed) {
      // Clear localStorage
      localStorage.removeItem('rifaConfig')

      // Reset all state to defaults
      setTitle("GRAN RIFA")
      setSubtitle("PREMIOS DOBLES")
      setDescription("¡Primer número en salir→ GANA 🏆\nÚltimo número en salir→ GANA 🏆")
      setPrice("3")
      setSelectedNumbers([])
      setSelectedBackground(0)
      setSelectedGlass(0)
      setSectionsOpen({
        background: true,
        config: true,
        numbers: true
      })
    }
  }

  return (
    <div className="min-h-screen bg-black">


      {/* Preview Panel - Full height on mobile, top position */}
      <div className="p-1 mb-1">
        <Card
          className={`relative overflow-hidden text-white h-screen ${currentBackground.type === 'gradient' ? `bg-gradient-to-br ${currentBackground.gradient}` : ''}`}
          style={currentBackground.type === 'image' ? {
            backgroundImage: `url(/backgrounds/${currentBackground.file})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          } : {}}
        >
          <CardContent className="flex-1 h-full p-4">
            <div className={`${currentGlass.bg} backdrop-blur-sm border ${currentGlass.border} rounded-xl p-6 h-full flex flex-col justify-between space-y-6`}>

              {/* Top Section */}
              <div className="text-center">
                <p className={`${currentBackground.accent} font-bold text-lg mb-4`}>Números disponibles:</p>
              </div>

              {/* Main Title Section */}
              <div className="text-center flex-1 flex flex-col justify-center space-y-4">
                <h2 className={`text-4xl md:text-6xl font-black ${currentBackground.accent} leading-tight`}>🎉 {title} 🎉</h2>
                <h3 className={`text-xl md:text-3xl font-bold ${currentBackground.accent?.replace('300', '200')}`}>⭐ {subtitle} ⭐</h3>

                <div className="text-center text-base md:text-xl whitespace-pre-line leading-relaxed font-medium mt-4">
                  {description}
                </div>
              </div>

              {/* Price Section */}
              <div className="text-center">
                <p className={`text-2xl md:text-4xl font-black ${currentBackground.accent} mb-4`}>💰 Solo ${price} por boleto</p>
              </div>

              {/* Numbers Section */}
              <div className="text-center">
                <div className={`${currentGlass.bg} backdrop-blur-sm border ${currentGlass.border} rounded-xl p-4 text-center`}>
                  <div className="text-sm md:text-lg leading-relaxed break-words font-bold">
                    {numbers
                      .filter(n => !selectedNumbers.includes(n))
                      .map(n => String(n).padStart(2, '0'))
                      .join(', ')}
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action */}
              <div className="text-center">
                <p className="text-lg md:text-2xl font-bold">🔥 ¡Corre que vuelan los números! 🚀</p>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Background Options Picker */}
      <div className="px-1 mb-3">
        <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
          <CardHeader
            className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
            onClick={() => toggleSection('background')}
          >
            <CardTitle className="text-white flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Fondo del Post
              </div>
              {sectionsOpen.background ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </CardTitle>
          </CardHeader>
          {sectionsOpen.background && (
            <CardContent className="pt-0 px-3 pb-3">
              <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
                {backgroundOptions.map((background, index) => (
                  <Button
                    key={index}
                    variant={selectedBackground === index ? "default" : "outline"}
                    className={`h-16 min-w-[100px] text-xs flex-shrink-0 md:min-w-0 relative overflow-hidden ${
                      selectedBackground === index
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedBackground(index)}
                  >
                    {background.type === "gradient" ? (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-6 h-6 rounded bg-gradient-to-br ${background.preview}`}></div>
                        <span className="text-xs">{background.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-6 h-6 rounded bg-cover bg-center border"
                          style={{ backgroundImage: `url(${background.preview})` }}
                        ></div>
                        <span className="text-xs">{background.name}</span>
                      </div>
                    )}
                  </Button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-gray-300 mb-3">Transparencia del vidrio:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {glassOptions.map((glass, index) => (
                    <Button
                      key={index}
                      variant={selectedGlass === index ? "default" : "outline"}
                      className={`text-xs whitespace-nowrap ${
                        selectedGlass === index
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedGlass(index)}
                    >
                      {glass.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Configuration Panel - Full width on mobile */}
      <div className="px-1 mb-3">
        <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
          <CardHeader
            className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
            onClick={() => toggleSection('config')}
          >
            <CardTitle className="text-white flex items-center justify-between text-base">
              <span>Configuración de la Rifa</span>
              {sectionsOpen.config ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </CardTitle>
          </CardHeader>
          {sectionsOpen.config && (
            <CardContent className="pt-0 px-3 pb-3 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-300 mb-1 block">Título Principal</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="GRAN RIFA"
                  className="text-sm font-medium h-8 bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 mb-1 block">Subtítulo</label>
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="PREMIOS DOBLES"
                  className="h-8 text-sm bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 mb-1 block">Descripción</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción de los premios..."
                  rows={3}
                  className="text-sm bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 mb-1 block">Precio por Boleto ($)</label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="3"
                  type="number"
                  className="h-8 text-sm bg-white text-gray-900 border-gray-300"
                />
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Numbers Grid */}
      <div className="px-1 pb-3">
        <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
          <CardHeader
            className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
            onClick={() => toggleSection('numbers')}
          >
            <CardTitle className="text-white flex items-center justify-between text-base">
              <div>
                <div>Seleccionar Números Vendidos</div>
                <p className="text-xs text-gray-400 font-normal">Toca los números que ya se han vendido</p>
              </div>
              {sectionsOpen.numbers ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </CardTitle>
          </CardHeader>
          {sectionsOpen.numbers && (
            <CardContent className="pt-0 px-3 pb-3">
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
              {numbers.map((num) => (
                <Button
                  key={num}
                  variant={selectedNumbers.includes(num) ? "destructive" : "outline"}
                  className={`aspect-square p-0 text-xs font-bold h-10 w-10 relative ${
                    selectedNumbers.includes(num)
                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-green-50 hover:bg-green-100 text-green-800 border-green-300"
                  }`}
                  onClick={() => toggleNumber(num)}
                >
                  {selectedNumbers.includes(num) && (
                    <span className="absolute -top-0.5 -right-0.5 text-red-500 text-sm font-bold">×</span>
                  )}
                  {String(num).padStart(2, '0')}
                </Button>
              ))}
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                <span className="font-medium">Disponible ({numbers.length - selectedNumbers.length})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-600 rounded"></div>
                <span className="font-medium">Vendido ({selectedNumbers.length})</span>
              </div>
            </div>
          </CardContent>
          )}
        </Card>
      </div>

      {/* Reset Button */}
      <div className="px-1 pb-4">
        <Button
          onClick={resetAllConfig}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-base border border-red-500"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Borrar Todo y Empezar Nueva Rifa
        </Button>
      </div>
    </div>
  )
}