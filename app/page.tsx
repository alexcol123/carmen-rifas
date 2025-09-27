"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, ChevronDown, ChevronUp, Trash2, Plus, UserPlus, Edit, CheckCircle, Dice6, RefreshCw, Home, Users, Crown, Hash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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

type SoldNumber = {
  number: number
  name: string
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
  const [footer, setFooter] = useState("🔥 ¡Corre que vuelan los números! 🚀")
  const [totalNumbers, setTotalNumbers] = useState(35)
  const [tempTotalNumbers, setTempTotalNumbers] = useState(35)
  const [soldNumbers, setSoldNumbers] = useState<SoldNumber[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedNumberForName, setSelectedNumberForName] = useState<number | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [showAddMore, setShowAddMore] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<string | null>(null)
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null)
  const [winnerNumber, setWinnerNumber] = useState<number | null>(null)
  const [selectedBackground, setSelectedBackground] = useState(0)
  const [selectedGlass, setSelectedGlass] = useState(0)
  const [sectionsOpen, setSectionsOpen] = useState({
    background: false,
    config: false,
    numbers: false,
    soldNumbers: true
  })
  const [isSpinning, setIsSpinning] = useState(false)
  const [animatedNumber, setAnimatedNumber] = useState<number | null>(null)
  const [activeView, setActiveView] = useState<'rifa' | 'numeros' | 'participantes' | 'ganador'>('rifa')

  // Load all config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('rifaConfig')
    if (savedConfig) {
      const config = JSON.parse(savedConfig)
      setTitle(config.title || "GRAN RIFA")
      setSubtitle(config.subtitle || "PREMIOS DOBLES")
      setDescription(config.description || "¡Primer número en salir→ GANA 🏆\nÚltimo número en salir→ GANA 🏆")
      setPrice(config.price || "3")
      setFooter(config.footer || "🔥 ¡Corre que vuelan los números! 🚀")
      setTotalNumbers(config.totalNumbers || 35)
      setTempTotalNumbers(config.totalNumbers || 35)
      setSoldNumbers(config.soldNumbers || [])
      setWinnerNumber(config.winnerNumber || null)
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
      footer,
      totalNumbers,
      soldNumbers,
      winnerNumber,
      selectedBackground,
      selectedGlass
    }
    localStorage.setItem('rifaConfig', JSON.stringify(config))
  }, [title, subtitle, description, price, footer, totalNumbers, soldNumbers, winnerNumber, selectedBackground, selectedGlass])

  const currentBackground = backgroundOptions[selectedBackground]
  const currentGlass = glassOptions[selectedGlass]
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1)

  const handleUpdateTotalNumbers = () => {
    if (tempTotalNumbers < 10 || tempTotalNumbers > 50 || tempTotalNumbers === 0) {
      alert("El total de números debe estar entre 10 y 50")
      setTempTotalNumbers(totalNumbers) // Reset to current value
      return
    }

    if (tempTotalNumbers === totalNumbers) return

    const confirmed = window.confirm(
      `¿Cambiar el total de números de ${totalNumbers} a ${tempTotalNumbers}?\n\n⚠️ ATENCIÓN: Esto eliminará todos los números vendidos que sean mayores a ${tempTotalNumbers}.\n\nEsta acción no se puede deshacer.`
    )

    if (confirmed) {
      // Remove sold numbers that are greater than the new total
      setSoldNumbers(prev => prev.filter(sold => sold.number <= tempTotalNumbers))
      setTotalNumbers(tempTotalNumbers)
      setShowAddMore(false)
      setCurrentCustomer(null)
      setEditingCustomer(null)
    } else {
      // Reset temp value if cancelled
      setTempTotalNumbers(totalNumbers)
    }
  }

  const handleNumberClick = (num: number) => {
    const soldNumber = soldNumbers.find(sold => sold.number === num)

    // Edit mode: handle adding/removing numbers for specific customer
    if (editingCustomer) {
      if (soldNumber?.name === editingCustomer) {
        // Remove this number from the customer being edited
        removeNumberFromEditingCustomer(num)
      } else if (!soldNumber) {
        // Add this available number to the customer being edited
        addNumberToEditingCustomer(num)
      }
      // Do nothing if number belongs to different customer
      return
    }

    // Add More mode: add numbers to current customer
    if (showAddMore && currentCustomer && !soldNumber) {
      addMoreNumbersForCustomer(num)
      return
    }

    // Normal mode: remove sold number or open dialog for new assignment
    if (soldNumber) {
      // Remove sold number with confirmation
      const confirmed = window.confirm(
        `¿Quitar el número #${String(num).padStart(2, '0')} de ${soldNumber.name}?\n\nEste número volverá a estar disponible.`
      )

      if (confirmed) {
        setSoldNumbers(prev => prev.filter(sold => sold.number !== num))
      }
    } else {
      // Open dialog to assign name
      setSelectedNumberForName(num)
      setDialogOpen(true)
      setCustomerName("")
    }
  }

  const handleAssignName = () => {
    if (selectedNumberForName && customerName.trim()) {
      const newSoldNumber: SoldNumber = {
        number: selectedNumberForName,
        name: customerName.trim()
      }

      setSoldNumbers(prev => [...prev, newSoldNumber])
      setCurrentCustomer(customerName.trim())
      setShowAddMore(true)
      setDialogOpen(false)
      setSelectedNumberForName(null)
      setCustomerName("")
    }
  }

  const addMoreNumbersForCustomer = (num: number) => {
    if (currentCustomer) {
      const newSoldNumber: SoldNumber = {
        number: num,
        name: currentCustomer
      }
      setSoldNumbers(prev => [...prev, newSoldNumber])
    }
  }

  const finishAddingNumbers = () => {
    setShowAddMore(false)
    setCurrentCustomer(null)
  }

  const startEditingCustomer = (customerName: string) => {
    setEditingCustomer(customerName)
    setShowAddMore(false)
    setCurrentCustomer(null)
  }

  const finishEditingCustomer = () => {
    setEditingCustomer(null)
  }

  const addNumberToEditingCustomer = (num: number) => {
    if (editingCustomer) {
      const newSoldNumber: SoldNumber = {
        number: num,
        name: editingCustomer
      }
      setSoldNumbers(prev => [...prev, newSoldNumber])
    }
  }

  const removeNumberFromEditingCustomer = (num: number) => {
    if (editingCustomer) {
      const confirmed = window.confirm(
        `¿Quitar el número #${String(num).padStart(2, '0')} de ${editingCustomer}?\n\nEste número volverá a estar disponible.`
      )

      if (confirmed) {
        setSoldNumbers(prev =>
          prev.filter(sold => !(sold.number === num && sold.name === editingCustomer))
        )
      }
    }
  }

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const pickRandomWinner = () => {
    if (soldNumbers.length === 0) {
      alert('No hay números vendidos para seleccionar un ganador')
      return
    }

    setIsSpinning(true)
    setWinnerNumber(null)

    // Animation sequence
    const animationDuration = 3000 // 3 seconds
    const intervalTime = 100 // Update every 100ms
    const totalIterations = animationDuration / intervalTime

    let currentIteration = 0
    const animationInterval = setInterval(() => {
      // Pick a random sold number for animation
      const randomSoldNumber = soldNumbers[Math.floor(Math.random() * soldNumbers.length)]
      setAnimatedNumber(randomSoldNumber.number)

      currentIteration++

      if (currentIteration >= totalIterations) {
        clearInterval(animationInterval)
        // Pick final winner
        const finalWinner = soldNumbers[Math.floor(Math.random() * soldNumbers.length)]
        setWinnerNumber(finalWinner.number)
        setAnimatedNumber(null)
        setIsSpinning(false)
      }
    }, intervalTime)
  }

  const resetWinner = () => {
    setWinnerNumber(null)
    setAnimatedNumber(null)
    setIsSpinning(false)
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
      setFooter("🔥 ¡Corre que vuelan los números! 🚀")
      setTotalNumbers(35)
      setTempTotalNumbers(35)
      setSoldNumbers([])
      setWinnerNumber(null)
      setCurrentCustomer(null)
      setShowAddMore(false)
      setEditingCustomer(null)
      setSelectedBackground(0)
      setSelectedGlass(0)
      setIsSpinning(false)
      setAnimatedNumber(null)
      setSectionsOpen({
        background: false,
        config: false,
        numbers: false,
        soldNumbers: true
      })
    }
  }

  const customerSummary = soldNumbers.reduce((acc, sold) => {
    if (!acc[sold.name]) {
      acc[sold.name] = []
    }
    acc[sold.name].push(sold.number)
    return acc
  }, {} as Record<string, number[]>)

  const winner = winnerNumber ? soldNumbers.find(sold => sold.number === winnerNumber) : null

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content Area - Full height minus nav */}
      <div className="flex-1 overflow-hidden pb-5">
        {/* View 1: Gran Rifa */}
        {activeView === 'rifa' && (
          <div className="h-full overflow-y-auto pb-5">
            {/* Main Raffle Preview */}
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
                <CardContent className="flex-1 h-full p-5">
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
                          {soldNumbers.length === totalNumbers ? (
                            <span className={`text-xl md:text-3xl ${currentBackground.accent} animate-pulse`}>
                              🔴 RIFA CERRADA
                            </span>
                          ) : (
                            numbers
                              .filter(n => !soldNumbers.some(sold => sold.number === n))
                              .map(n => String(n).padStart(2, '0'))
                              .join(', ')
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Call to Action */}
                    <div className="text-center">
                      <p className="text-lg md:text-2xl font-bold">{footer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Configuration Sections */}
            <div className="px-1 space-y-3 pb-20 mt-8">
              {/* Background Options */}
              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardHeader className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => toggleSection('background')}>
                  <CardTitle className="text-white flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Fondo del Post
                    </div>
                    {sectionsOpen.background ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
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
                            selectedBackground === index ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "hover:bg-gray-100"
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
                              <div className="w-6 h-6 rounded bg-cover bg-center border" style={{ backgroundImage: `url(${background.preview})` }}></div>
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
                              selectedGlass === index ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"
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

              {/* Configuration Panel */}
              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardHeader className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => toggleSection('config')}>
                  <CardTitle className="text-white flex items-center justify-between text-base">
                    <span>Configuración de la Rifa</span>
                    {sectionsOpen.config ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </CardTitle>
                </CardHeader>
                {sectionsOpen.config && (
                  <CardContent className="pt-0 px-3 pb-3 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-300 mb-1 block">Título Principal</label>
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="GRAN RIFA" className="text-sm font-medium h-8 bg-white text-gray-900 border-gray-300" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-300 mb-1 block">Subtítulo</label>
                      <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="PREMIOS DOBLES" className="h-8 text-sm bg-white text-gray-900 border-gray-300" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-300 mb-1 block">Descripción</label>
                      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción de los premios..." rows={3} className="text-sm bg-white text-gray-900 border-gray-300" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-300 mb-1 block">Precio por Boleto ($)</label>
                      <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="3" type="number" className="h-8 text-sm bg-white text-gray-900 border-gray-300" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-300 mb-1 block">Mensaje Final</label>
                      <Input value={footer} onChange={(e) => setFooter(e.target.value)} placeholder="🔥 ¡Corre que vuelan los números! 🚀" className="h-8 text-sm bg-white text-gray-900 border-gray-300" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-300 mb-1 block">Total de Números (10-50)</label>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={tempTotalNumbers === 0 ? '' : tempTotalNumbers}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '') {
                              setTempTotalNumbers(0)
                            } else {
                              const newValue = parseInt(value)
                              if (!isNaN(newValue)) {
                                setTempTotalNumbers(newValue)
                              }
                            }
                          }}
                          type="number"
                          min="10"
                          max="50"
                          className="h-8 text-sm bg-white text-gray-900 border-gray-300 flex-1"
                        />
                        <Button
                          onClick={handleUpdateTotalNumbers}
                          disabled={tempTotalNumbers === totalNumbers || tempTotalNumbers < 10 || tempTotalNumbers > 50 || tempTotalNumbers === 0}
                          className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Actualizar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

            </div>
          </div>
        )}

        {/* View 2: Números */}
        {activeView === 'numeros' && (
          <div className="h-full overflow-y-auto pb-5">
            <div className="px-1 space-y-3 pb-20 pt-4">
              {/* Numbers Grid */}
              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardHeader className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => toggleSection('numbers')}>
                  <CardTitle className="text-white flex items-center justify-between text-base">
                    <div>
                      <div>Seleccionar Números Vendidos</div>
                      <p className="text-xs text-gray-400 font-normal">Toca los números que ya se han vendido</p>
                    </div>
                    {sectionsOpen.numbers ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </CardTitle>
                </CardHeader>
                {sectionsOpen.numbers && (
                  <CardContent className="pt-0 px-3 pb-3">
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                      {numbers.map((num) => (
                        <Button
                          key={num}
                          variant={soldNumbers.some(sold => sold.number === num) ? "destructive" : "outline"}
                          className={`aspect-square p-0 text-xs font-bold h-10 w-10 relative ${
                            (() => {
                              const soldNumber = soldNumbers.find(sold => sold.number === num)
                              const activeCustomer = editingCustomer || currentCustomer

                              if (soldNumber) {
                                if (activeCustomer && soldNumber.name === activeCustomer) {
                                  return "bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold border-2 border-yellow-400 shadow-lg"
                                } else {
                                  return "bg-gray-600 hover:bg-gray-700 text-white"
                                }
                              } else {
                                if (editingCustomer) {
                                  return "bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-300"
                                } else if (showAddMore && currentCustomer) {
                                  return "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-300"
                                } else {
                                  return "bg-green-50 hover:bg-green-100 text-green-800 border-green-300"
                                }
                              }
                            })()
                          }`}
                          onClick={() => handleNumberClick(num)}
                        >
                          {soldNumbers.some(sold => sold.number === num) && (
                            <span className="absolute -top-0.5 -right-0.5 text-red-500 text-sm font-bold">×</span>
                          )}
                          {String(num).padStart(2, '0')}
                        </Button>
                      ))}
                    </div>

                    {/* Status indicators and special modes */}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-white">
                      {editingCustomer ? (
                        <>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded border border-yellow-400"></div>
                            <span className="font-medium">{editingCustomer} ({soldNumbers.filter(s => s.name === editingCustomer).length})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded"></div>
                            <span className="font-medium">Puede agregar ({numbers.length - soldNumbers.length})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-gray-600 rounded"></div>
                            <span className="font-medium">Otros clientes ({soldNumbers.filter(s => s.name !== editingCustomer).length})</span>
                          </div>
                        </>
                      ) : showAddMore && currentCustomer ? (
                        <>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded border border-yellow-400"></div>
                            <span className="font-medium">{currentCustomer} ({soldNumbers.filter(s => s.name === currentCustomer).length})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                            <span className="font-medium">Puede agregar ({numbers.length - soldNumbers.length})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-gray-600 rounded"></div>
                            <span className="font-medium">Otros clientes ({soldNumbers.filter(s => s.name !== currentCustomer).length})</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                            <span className="font-medium">Disponible ({numbers.length - soldNumbers.length})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-gray-600 rounded"></div>
                            <span className="font-medium">Vendido ({soldNumbers.length})</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Special mode notifications */}
                    {showAddMore && currentCustomer && (
                      <div className="mt-4 overflow-hidden rounded-xl">
                        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-xl animate-pulse opacity-90">
                          <div className="bg-white/95 backdrop-blur-sm m-0.5 rounded-lg p-4 border border-amber-300/50 shadow-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-amber-900 font-bold text-base mb-1">Agregando números para:</p>
                                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md">
                                  {currentCustomer}
                                </div>
                              </div>
                              <Button
                                onClick={finishAddingNumbers}
                                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg border border-red-400/50 transition-all duration-200 hover:scale-105"
                              >
                                <CheckCircle className="w-4 h-4 mr-1.5 animate-bounce bg-black rounded-full" />
                                Terminar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {editingCustomer && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-600/80 to-purple-500/80 border-2 border-purple-400 rounded-lg shadow-lg animate-pulse">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-base font-bold text-white drop-shadow-sm">
                            <Edit className="w-5 h-5 inline mr-2 animate-bounce" />
                            ✏️ Editando números de: <span className="text-yellow-200 font-extrabold">{editingCustomer}</span>
                          </p>
                          <Button
                            onClick={finishEditingCustomer}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-4 py-2 shadow-lg animate-pulse"
                          >
                            ✅ Terminar
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Sold Numbers List */}
              {soldNumbers.length > 0 && (
                <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                  <CardHeader className="pb-1 pt-2 px-3 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => toggleSection('soldNumbers')}>
                    <CardTitle className="text-white flex items-center justify-between text-base">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Números Vendidos ({soldNumbers.length})
                      </div>
                      {sectionsOpen.soldNumbers ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </CardTitle>
                  </CardHeader>
                  {sectionsOpen.soldNumbers && (
                    <CardContent className="pt-0 px-3 pb-3">
                      <div className="space-y-2 max-h-64 overflow-y-auto bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600/30">
                        {soldNumbers.sort((a, b) => a.number - b.number).map((sold, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-700/50 p-2 rounded border border-gray-600/30">
                            <div className="flex items-center gap-3">
                              <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2.5rem] text-center">
                                #{String(sold.number).padStart(2, '0')}
                              </span>
                              <button
                                onClick={() => startEditingCustomer(sold.name)}
                                className="text-white font-medium hover:text-blue-300 underline decoration-dotted underline-offset-2 transition-colors capitalize"
                              >
                                {sold.name}
                              </button>
                            </div>
                            <Button
                              onClick={() => {
                                const confirmed = window.confirm(`¿Eliminar el número #${String(sold.number).padStart(2, '0')} de ${sold.name}?\n\nEste número volverá a estar disponible.`)
                                if (confirmed) {
                                  setSoldNumbers(prev => prev.filter(s => s.number !== sold.number))
                                }
                              }}
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 border-red-500/50 hover:bg-red-600 hover:border-red-500"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )}
            </div>
          </div>
        )}

        {/* View 3: Lista de Participantes */}
        {activeView === 'participantes' && soldNumbers.length > 0 && (
          <div className="h-full pb-5">
            <Card
              className={`relative overflow-hidden text-white h-screen ${
                currentBackground.type === 'gradient' ? `bg-gradient-to-br ${currentBackground.gradient}` : ''
              }`}
              style={currentBackground.type === 'image' ? {
                backgroundImage: `url(/backgrounds/${currentBackground.file})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}}
            >
              <CardContent className="flex-1 h-full p-6 flex flex-col">
                <h3 className={`text-2xl md:text-3xl font-bold ${currentBackground.accent} text-center mb-6`}>📋 LISTA DE PARTICIPANTES</h3>
                <div className={`${currentGlass.bg} backdrop-blur-sm border ${currentGlass.border} rounded-xl p-6 flex-1 overflow-y-auto`}>
                  <div className="space-y-1">
                    {Object.entries(customerSummary)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([name, nums], index) => (
                      <div key={name} className="group">
                        <div className="flex items-center py-2 gap-4">
                          <div className="w-1/2">
                            <p className={`text-sm md:text-base font-bold ${currentBackground.accent} text-left capitalize`}>
                              {name}
                            </p>
                          </div>
                          <div className="w-1/2 flex items-center justify-start">
                            <span className={`text-sm md:text-base font-bold ${currentBackground.accent?.replace('300', '200')} font-mono tracking-wider`}>
                              {nums.sort((a, b) => a - b).map(num => String(num).padStart(2, '0')).join(' • ')}
                            </span>
                          </div>
                        </div>
                        {index < Object.entries(customerSummary).length - 1 && (
                          <div className={`border-b ${currentGlass.border} opacity-30 my-0`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View 4: Felicitaciones al Ganador */}
        {activeView === 'ganador' && winnerNumber && winner && (
          <div className="h-full pb-5 overflow-y-auto">
            <Card
              className={`relative overflow-hidden text-white h-screen ${
                currentBackground.type === 'gradient' ? `bg-gradient-to-br ${currentBackground.gradient}` : ''
              }`}
              style={currentBackground.type === 'image' ? {
                backgroundImage: `url(/backgrounds/${currentBackground.file})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}}
            >
              <CardContent className="flex-1 h-full p-8 flex flex-col justify-center">
                <div className={`${currentGlass.bg} backdrop-blur-sm border ${currentGlass.border} rounded-xl p-8 text-center space-y-6`}>
                  <div className="space-y-4">
                    <h2 className={`text-3xl md:text-5xl font-black ${currentBackground.accent} leading-tight`}>
                      🎉 ¡FELICITACIONES! 🎉
                    </h2>
                    <div className="space-y-2">
                      <p className={`text-xl md:text-3xl font-bold ${currentBackground.accent?.replace('300', '200')}`}>
                        Felicitamos a
                      </p>
                      <p className={`text-2xl md:text-4xl font-black ${currentBackground.accent} capitalize`}>
                        {winner.name}
                      </p>
                      <p className={`text-xl md:text-3xl font-bold ${currentBackground.accent?.replace('300', '200')}`}>
                        Ganador(a) de esta semana
                      </p>
                    </div>
                    <div className={`${currentGlass.bg} backdrop-blur-sm border ${currentGlass.border} rounded-xl p-6 inline-block`}>
                      <p className={`text-xl md:text-3xl font-black ${currentBackground.accent}`}>
                        🏆 Número Ganador: #{String(winnerNumber).padStart(2, '0')} 🏆
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-white/20">
                    <p className={`text-lg md:text-2xl font-bold ${currentBackground.accent?.replace('300', '400')}`}>
                      ¡Gracias a todos los participantes!
                    </p>
                    <p className="text-base md:text-xl text-white/90 font-medium">
                      Su apoyo hace posible estos premios increíbles
                    </p>
                    <p className="text-xl md:text-3xl font-bold">
                      🌟 ¡Nos vemos en la próxima rifa! 🌟
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Winner Selection Interface - Always shown after congratulations */}
            <div className="p-4 space-y-6 mt-20">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Cambiar Ganador</h3>
                <p className="text-gray-400 text-sm">Puedes modificar la selección si es necesario</p>
              </div>

              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Selección Aleatoria</label>
                        <Button
                          onClick={pickRandomWinner}
                          disabled={isSpinning}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-10"
                        >
                          {isSpinning ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Sorteando...
                            </>
                          ) : (
                            <>
                              <Dice6 className="w-4 h-4 mr-2" />
                              Sorteo Aleatorio
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Selección Manual</label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            min="1"
                            max={totalNumbers}
                            value={winnerNumber || ''}
                            onChange={(e) => {
                              const num = parseInt(e.target.value)
                              if (!isNaN(num) && num >= 1 && num <= totalNumbers) {
                                setWinnerNumber(num)
                              } else if (e.target.value === '') {
                                setWinnerNumber(null)
                              }
                            }}
                            placeholder={`Número (1-${totalNumbers})`}
                            className="h-10 bg-white text-gray-900 border-gray-300"
                            disabled={isSpinning}
                          />
                          <Button
                            onClick={resetWinner}
                            variant="outline"
                            className="h-10 px-3 border-red-500/50 hover:bg-red-600 hover:border-red-500 text-red-500 hover:text-white"
                            disabled={isSpinning}
                          >
                            Limpiar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {isSpinning && animatedNumber && (
                      <div className="text-center py-6">
                        <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl animate-pulse">
                          <p className="text-sm font-medium mb-2">🎲 Sorteando...</p>
                          <p className="text-3xl font-black">#{String(animatedNumber).padStart(2, '0')}</p>
                        </div>
                      </div>
                    )}

                    {winnerNumber && !isSpinning && (() => {
                      const currentWinner = soldNumbers.find(sold => sold.number === winnerNumber)
                      return currentWinner ? (
                        <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
                          <p className="text-green-300 font-medium mb-2">🎉 Ganador Actual:</p>
                          <p className="text-white font-bold text-lg capitalize">{currentWinner.name}</p>
                          <p className="text-green-200 text-sm">Número #{String(winnerNumber).padStart(2, '0')}</p>
                        </div>
                      ) : (
                        <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
                          <p className="text-red-300 font-medium">❌ Número no vendido</p>
                          <p className="text-red-200 text-sm">El número #{String(winnerNumber).padStart(2, '0')} no está asignado a ningún participante</p>
                        </div>
                      )
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Participants Summary */}
              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Todos los Participantes ({soldNumbers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                    {Object.entries(customerSummary)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([name, nums]) => (
                      <div key={name} className={`p-3 rounded-lg border ${
                        name === winner?.name
                          ? 'bg-yellow-600/30 border-yellow-500/50'
                          : 'bg-gray-700/50 border-gray-600/30'
                      }`}>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            {name === winner?.name && <Crown className="w-4 h-4 text-yellow-400" />}
                            <p className={`font-medium capitalize text-sm ${
                              name === winner?.name ? 'text-yellow-200' : 'text-white'
                            }`}>{name}</p>
                          </div>
                          <p className="text-gray-300 text-xs font-mono">
                            {nums.sort((a, b) => a - b).map(num => `#${String(num).padStart(2, '0')}`).join(' • ')}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {nums.length} número{nums.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty states for views 3 and 4 */}
        {activeView === 'participantes' && soldNumbers.length === 0 && (
          <div className="h-full flex items-center justify-center pb-5">
            <div className="text-center text-gray-400">
              <Users className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No hay participantes</h3>
              <p>Vende algunos números para ver la lista de participantes</p>
            </div>
          </div>
        )}

        {activeView === 'ganador' && soldNumbers.length === 0 && (
          <div className="h-full flex items-center justify-center pb-5">
            <div className="text-center text-gray-400">
              <Crown className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No hay participantes</h3>
              <p>Vende algunos números para poder seleccionar un ganador</p>
            </div>
          </div>
        )}

        {activeView === 'ganador' && soldNumbers.length > 0 && (!winnerNumber || !winner) && (
          <div className="h-full pb-5 p-4">
            <div className="space-y-6">
              <div className="text-center">
                <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h2 className="text-2xl font-bold text-white mb-2">Seleccionar Ganador</h2>
                <p className="text-gray-400">Elige al ganador de la rifa</p>
              </div>

              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Selección Aleatoria</label>
                        <Button
                          onClick={pickRandomWinner}
                          disabled={isSpinning}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-10"
                        >
                          {isSpinning ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Sorteando...
                            </>
                          ) : (
                            <>
                              <Dice6 className="w-4 h-4 mr-2" />
                              Sorteo Aleatorio
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Selección Manual</label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            min="1"
                            max={totalNumbers}
                            value={winnerNumber || ''}
                            onChange={(e) => {
                              const num = parseInt(e.target.value)
                              if (!isNaN(num) && num >= 1 && num <= totalNumbers) {
                                setWinnerNumber(num)
                              } else if (e.target.value === '') {
                                setWinnerNumber(null)
                              }
                            }}
                            placeholder={`Número (1-${totalNumbers})`}
                            className="h-10 bg-white text-gray-900 border-gray-300"
                            disabled={isSpinning}
                          />
                          <Button
                            onClick={resetWinner}
                            variant="outline"
                            className="h-10 px-3 border-red-500/50 hover:bg-red-600 hover:border-red-500 text-red-500 hover:text-white"
                            disabled={isSpinning}
                          >
                            Limpiar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {isSpinning && animatedNumber && (
                      <div className="text-center py-6">
                        <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl animate-pulse">
                          <p className="text-sm font-medium mb-2">🎲 Sorteando...</p>
                          <p className="text-3xl font-black">#{String(animatedNumber).padStart(2, '0')}</p>
                        </div>
                      </div>
                    )}

                    {winnerNumber && !isSpinning && (() => {
                      const winner = soldNumbers.find(sold => sold.number === winnerNumber)
                      return winner ? (
                        <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
                          <p className="text-green-300 font-medium mb-2">🎉 Ganador Encontrado:</p>
                          <p className="text-white font-bold text-lg capitalize">{winner.name}</p>
                          <p className="text-green-200 text-sm">Número #{String(winnerNumber).padStart(2, '0')}</p>
                        </div>
                      ) : (
                        <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
                          <p className="text-red-300 font-medium">❌ Número no vendido</p>
                          <p className="text-red-200 text-sm">El número #{String(winnerNumber).padStart(2, '0')} no está asignado a ningún participante</p>
                        </div>
                      )
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Participants Summary */}
              <Card className="bg-slate-800/80 backdrop-blur border border-slate-600/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participantes ({soldNumbers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                    {Object.entries(customerSummary)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([name, nums]) => (
                      <div key={name} className="bg-gray-700/50 p-3 rounded-lg border border-gray-600/30">
                        <div className="flex flex-col space-y-1">
                          <p className="text-white font-medium capitalize text-sm">{name}</p>
                          <p className="text-gray-300 text-xs font-mono">
                            {nums.sort((a, b) => a - b).map(num => `#${String(num).padStart(2, '0')}`).join(' • ')}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {nums.length} número{nums.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-slate-900 border-t border-slate-700 px-4 py-2">
        <div className="flex justify-around items-center max-w-2xl mx-auto">
          <button
            onClick={() => setActiveView('rifa')}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
              activeView === 'rifa'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Gran Rifa</span>
          </button>

          <button
            onClick={() => setActiveView('numeros')}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
              activeView === 'numeros'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Hash className="w-5 h-5" />
            <span className="text-xs font-medium">Números</span>
          </button>

          <button
            onClick={() => setActiveView('participantes')}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
              activeView === 'participantes'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Participantes</span>
          </button>

          <button
            onClick={() => setActiveView('ganador')}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
              activeView === 'ganador'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs font-medium">Ganador</span>
          </button>

          <button
            onClick={resetAllConfig}
            className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/30"
          >
            <Trash2 className="w-5 h-5" />
            <span className="text-xs font-medium">Borrar</span>
          </button>
        </div>
      </div>

      {/* Name Assignment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-600">
          <DialogHeader>
            <DialogTitle className="text-white">
              Asignar Número #{selectedNumberForName ? String(selectedNumberForName).padStart(2, '0') : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Nombre del Cliente</label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ingresa el nombre completo"
                className="bg-slate-700 border-slate-600 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAssignName()
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-slate-600 text-red-500 hover:bg-slate-700 hover:text-red-400"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAssignName}
              disabled={!customerName.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Asignar Número
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}