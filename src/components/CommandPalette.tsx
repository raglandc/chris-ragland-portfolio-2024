"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { createCommands } from "@/lib/commands"

type HistoryEntry = { type: "input" | "output"; text: string }

export default function CommandPalette() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)

  const commands = useMemo(() => createCommands(router), [router])

  const open = useCallback(() => {
    setIsOpen(true)
    setInputValue("")
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setInputValue("")
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        setInputValue("")
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    const handleOpenEvent = () => open()
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("open-command-palette", handleOpenEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("open-command-palette", handleOpenEvent)
    }
  }, [open])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const handleEnter = useCallback(() => {
    if (!inputValue.trim()) return

    const matched = commands.find(
      (c) => c.name === inputValue.trim().toLowerCase()
    )
    const inputEntry: HistoryEntry = { type: "input", text: inputValue }

    if (matched) {
      if (matched.name === "clear") {
        setHistory([])
        setInputValue("")
        return
      }
      const result = matched.action()
      if (result !== null) {
        setHistory((prev) => [
          ...prev,
          inputEntry,
          { type: "output", text: result },
        ])
      } else {
        setHistory((prev) => [...prev, inputEntry])
      }
    } else {
      setHistory((prev) => [
        ...prev,
        inputEntry,
        { type: "output", text: `command not found: ${inputValue}. Type "help" to see available commands.` },
      ])
    }

    setInputValue("")
  }, [inputValue, commands])

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        close()
        return
      }
      if (e.key === "Enter") {
        handleEnter()
        return
      }
    },
    [close, handleEnter]
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          />
          <motion.div
            key="modal"
            drag
            dragMomentum={false}
            dragElastic={0}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl rounded-xl border border-gray-700 overflow-hidden bg-[#0d0d0d] z-[10000]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {/* macOS-style header bar — drag handle */}
            <div className="flex items-center px-4 py-2 border-b border-gray-800 bg-[#1a1a1a] cursor-grab active:cursor-grabbing select-none">
              <div className="flex gap-1.5">
                <div
                  className="w-[10px] h-[10px] rounded-full bg-[#ff5f57] cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); close(); }}
                />
                <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
              </div>
              <span className="flex-1 text-center text-gray-400 text-xs font-mono">
                chris@portfolio ~ %
              </span>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div
                ref={historyRef}
                className="max-h-64 overflow-y-auto px-4 py-2 space-y-1"
              >
                {history.map((entry, i) => (
                  <div
                    key={i}
                    className={`font-mono text-sm whitespace-pre-wrap ${
                      entry.type === "input" ? "text-green-400" : "text-gray-300"
                    }`}
                  >
                    {entry.type === "input" ? `> ${entry.text}` : entry.text}
                  </div>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="flex items-center px-4 py-3 border-t border-gray-800">
              <span className="text-green-400 font-mono text-sm mr-2">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder-gray-600"
                placeholder='type "help" to see commands...'
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
