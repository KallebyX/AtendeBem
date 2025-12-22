"use client"

import { FileText, Clock, Send, PenTool, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContractTimelineProps {
  contract: {
    status: string
    created_at: string
    professional_signed_at?: string
    patient_signed_at?: string
    valid_until?: string
  }
}

type TimelineStep = {
  id: string
  label: string
  description: string
  icon: React.ElementType
  status: "completed" | "current" | "pending" | "error"
  date?: string
}

export function ContractTimeline({ contract }: ContractTimelineProps) {
  const steps: TimelineStep[] = getTimelineSteps(contract)

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Status do Contrato</h3>

      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4 pb-6 last:pb-0">
            {/* Line connector */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute w-0.5 h-[calc(100%-2rem)] left-[15px] top-8",
                  step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                )}
                style={{ top: `${index * 80 + 32}px`, height: "48px" }}
              />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                step.status === "completed" && "bg-green-500 text-white",
                step.status === "current" && "bg-blue-500 text-white animate-pulse",
                step.status === "pending" && "bg-gray-200 text-gray-400",
                step.status === "error" && "bg-red-500 text-white"
              )}
            >
              <step.icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-medium text-sm",
                    step.status === "completed" && "text-green-700",
                    step.status === "current" && "text-blue-700",
                    step.status === "pending" && "text-gray-400",
                    step.status === "error" && "text-red-700"
                  )}
                >
                  {step.label}
                </span>
                {step.status === "current" && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                    Atual
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              {step.date && (
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(step.date).toLocaleString("pt-BR")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getTimelineSteps(contract: ContractTimelineProps["contract"]): TimelineStep[] {
  const now = new Date()
  const isExpired = contract.valid_until && new Date(contract.valid_until) < now
  const isCancelled = contract.status === "cancelled"

  // Step 1: Created
  const createdStep: TimelineStep = {
    id: "created",
    label: "Contrato Criado",
    description: "Contrato foi criado no sistema",
    icon: FileText,
    status: "completed",
    date: contract.created_at,
  }

  // Step 2: Professional signature
  const professionalSignedStep: TimelineStep = {
    id: "professional_signed",
    label: "Assinatura do Profissional",
    description: contract.professional_signed_at
      ? "Profissional assinou o contrato"
      : "Aguardando assinatura do profissional",
    icon: PenTool,
    status: contract.professional_signed_at
      ? "completed"
      : contract.status === "draft"
      ? "current"
      : "pending",
    date: contract.professional_signed_at,
  }

  // Step 3: Sent to patient (pending_signature status)
  const sentToPatientStep: TimelineStep = {
    id: "sent_to_patient",
    label: "Enviado ao Paciente",
    description:
      contract.status === "pending_signature" || contract.patient_signed_at
        ? "Contrato enviado para assinatura"
        : "Aguardando envio ao paciente",
    icon: Send,
    status:
      contract.status === "pending_signature"
        ? "current"
        : contract.patient_signed_at
        ? "completed"
        : "pending",
  }

  // Step 4: Patient signature
  const patientSignedStep: TimelineStep = {
    id: "patient_signed",
    label: "Assinatura do Paciente",
    description: contract.patient_signed_at
      ? "Paciente assinou o contrato"
      : "Aguardando assinatura do paciente",
    icon: PenTool,
    status: contract.patient_signed_at ? "completed" : "pending",
    date: contract.patient_signed_at,
  }

  // Step 5: Completed
  const completedStep: TimelineStep = {
    id: "completed",
    label: "Contrato Finalizado",
    description: isCancelled
      ? "Contrato foi cancelado"
      : isExpired
      ? "Contrato expirado"
      : contract.status === "signed"
      ? "Todas as assinaturas coletadas"
      : "Aguardando finalização",
    icon: isCancelled ? XCircle : isExpired ? AlertTriangle : CheckCircle,
    status: isCancelled
      ? "error"
      : isExpired
      ? "error"
      : contract.status === "signed"
      ? "completed"
      : "pending",
  }

  return [createdStep, professionalSignedStep, sentToPatientStep, patientSignedStep, completedStep]
}

// Compact version for card display
export function ContractTimelineCompact({ contract }: ContractTimelineProps) {
  const statusConfig = getStatusConfig(contract.status, contract.valid_until)

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full",
          statusConfig.bgColor
        )}
      >
        <statusConfig.icon className={cn("w-3.5 h-3.5", statusConfig.iconColor)} />
      </div>
      <div>
        <span className={cn("text-sm font-medium", statusConfig.textColor)}>
          {statusConfig.label}
        </span>
      </div>
    </div>
  )
}

function getStatusConfig(status: string, validUntil?: string) {
  const now = new Date()
  const isExpired = validUntil && new Date(validUntil) < now

  if (isExpired) {
    return {
      label: "Expirado",
      icon: AlertTriangle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-700",
    }
  }

  switch (status) {
    case "draft":
      return {
        label: "Rascunho",
        icon: FileText,
        bgColor: "bg-gray-100",
        iconColor: "text-gray-600",
        textColor: "text-gray-700",
      }
    case "pending_signature":
      return {
        label: "Pendente",
        icon: Clock,
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
        textColor: "text-yellow-700",
      }
    case "signed":
      return {
        label: "Assinado",
        icon: CheckCircle,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        textColor: "text-green-700",
      }
    case "cancelled":
      return {
        label: "Cancelado",
        icon: XCircle,
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
        textColor: "text-red-700",
      }
    default:
      return {
        label: status,
        icon: FileText,
        bgColor: "bg-gray-100",
        iconColor: "text-gray-600",
        textColor: "text-gray-700",
      }
  }
}
