"use client"

import { FileText, Clock, Send, PenTool, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react"
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
  const completedSteps = steps.filter(s => s.status === "completed").length
  const progressPercentage = (completedSteps / steps.length) * 100

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-gray-900">Status do Contrato</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {completedSteps}/{steps.length} etapas
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-10 w-0.5 h-12 -translate-x-1/2",
                  step.status === "completed" ? "bg-green-400" : "bg-gray-200"
                )}
              />
            )}

            <div className={cn(
              "flex gap-4 py-3 px-3 rounded-xl transition-colors -mx-1",
              step.status === "current" && "bg-blue-50/50"
            )}>
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all",
                  step.status === "completed" && "bg-green-500 text-white shadow-sm shadow-green-200",
                  step.status === "current" && "bg-blue-500 text-white shadow-sm shadow-blue-200 ring-4 ring-blue-100",
                  step.status === "pending" && "bg-gray-100 text-gray-400 border-2 border-gray-200",
                  step.status === "error" && "bg-red-500 text-white shadow-sm shadow-red-200"
                )}
              >
                <step.icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "font-semibold text-sm",
                      step.status === "completed" && "text-green-700",
                      step.status === "current" && "text-blue-700",
                      step.status === "pending" && "text-gray-400",
                      step.status === "error" && "text-red-700"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.status === "current" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Atual
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-xs mt-0.5 leading-relaxed",
                  step.status === "pending" ? "text-gray-400" : "text-gray-500"
                )}>
                  {step.description}
                </p>
                {step.date && (
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(step.date).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <StatusSummary contract={contract} />
      </div>
    </div>
  )
}

function StatusSummary({ contract }: ContractTimelineProps) {
  const now = new Date()
  const isExpired = contract.valid_until && new Date(contract.valid_until) < now
  const isCancelled = contract.status === "cancelled"
  const isFullySigned = contract.professional_signed_at && contract.patient_signed_at

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-700">Contrato Cancelado</p>
          <p className="text-xs text-red-600">Este contrato não é mais válido</p>
        </div>
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-700">Contrato Expirado</p>
          <p className="text-xs text-amber-600">
            Expirou em {new Date(contract.valid_until!).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    )
  }

  if (isFullySigned) {
    return (
      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-700">Contrato Assinado</p>
          <p className="text-xs text-green-600">Todas as assinaturas foram coletadas</p>
        </div>
      </div>
    )
  }

  // Pending actions
  const pendingActions: string[] = []
  if (!contract.professional_signed_at) pendingActions.push("Assinatura do profissional")
  if (!contract.patient_signed_at) pendingActions.push("Assinatura do paciente")

  return (
    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <ArrowRight className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-sm font-semibold text-blue-700">Próximos Passos</p>
        <ul className="text-xs text-blue-600 mt-1 space-y-0.5">
          {pendingActions.map((action, i) => (
            <li key={i} className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              {action}
            </li>
          ))}
        </ul>
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
    description: "Documento gerado no sistema",
    icon: FileText,
    status: "completed",
    date: contract.created_at,
  }

  // Step 2: Professional signature
  const professionalSignedStep: TimelineStep = {
    id: "professional_signed",
    label: "Assinatura Profissional",
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
          "flex items-center justify-center w-7 h-7 rounded-full",
          statusConfig.bgColor
        )}
      >
        <statusConfig.icon className={cn("w-4 h-4", statusConfig.iconColor)} />
      </div>
      <div>
        <span className={cn("text-sm font-semibold", statusConfig.textColor)}>
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
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      textColor: "text-amber-700",
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
