"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2, User, X, Plus, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchPatients } from "@/app/actions/patients"
import { PatientCreationModal } from "@/components/patient-creation-modal"

interface Patient {
  id: string
  full_name: string
  cpf: string
  phone?: string
  date_of_birth?: string
  email?: string
}

interface PatientSearchSelectProps {
  onPatientSelect: (patient: Patient | null) => void
  selectedPatient: Patient | null
  label?: string
  required?: boolean
  className?: string
  showCreateButton?: boolean
}

export function PatientSearchSelect({
  onPatientSelect,
  selectedPatient,
  label = "Selecionar paciente",
  required = false,
  className,
  showCreateButton = true,
}: PatientSearchSelectProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true)
        setShowResults(true)
        const result = await searchPatients(searchQuery)
        if (result.success) {
          setSearchResults(result.patients || [])
        } else {
          setSearchResults([])
        }
        setIsSearching(false)
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSelectPatient = (patient: Patient) => {
    onPatientSelect(patient)
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  const handleClearPatient = () => {
    onPatientSelect(null)
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  const handlePatientCreated = (patient: Patient) => {
    setShowCreateModal(false)
    onPatientSelect(patient)
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  const handleCreateClick = () => {
    setShowCreateModal(true)
  }

  return (
    <>
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <Label>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          {showCreateButton && !selectedPatient && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCreateClick}
              className="rounded-xl text-xs gap-1"
            >
              <Plus className="h-3 w-3" />
              Criar Paciente
            </Button>
          )}
        </div>

        {!selectedPatient ? (
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou CPF (min. 2 caracteres)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-2xl"
                autoComplete="off"
              />
              {isSearching && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-2xl shadow-lg max-h-64 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {searchResults.map((patient) => (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => handleSelectPatient(patient)}
                      className="w-full text-left p-3 rounded-xl hover:bg-secondary/10 transition-colors"
                    >
                      <p className="font-semibold">{patient.full_name}</p>
                      <p className="text-sm text-muted-foreground">CPF: {patient.cpf}</p>
                      {patient.phone && <p className="text-sm text-muted-foreground">Tel: {patient.phone}</p>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showResults && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
              <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-2xl shadow-lg p-4">
                <div className="text-center text-muted-foreground mb-3">
                  <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum paciente encontrado</p>
                </div>
                {showCreateButton && (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={handleCreateClick}
                    className="w-full rounded-xl gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Criar Novo Paciente
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-secondary/10 rounded-2xl border-2 border-secondary">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-secondary" />
                  <p className="font-semibold text-lg">{selectedPatient.full_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">CPF: {selectedPatient.cpf}</p>
                  {selectedPatient.phone && <p className="text-sm text-muted-foreground">Tel: {selectedPatient.phone}</p>}
                  {selectedPatient.email && (
                    <p className="text-sm text-muted-foreground">Email: {selectedPatient.email}</p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearPatient}
                className="text-muted-foreground hover:text-destructive rounded-full"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <PatientCreationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handlePatientCreated}
        initialName={searchQuery.length >= 2 ? searchQuery : ""}
      />
    </>
  )
}
