"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FileText, CheckCircle, Clock, X, Trash2, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { createBudget, getBudgets, approveBudget } from "@/app/actions/budgets"
import { getPatientsList } from "@/app/actions/crm"
import { searchTUSS } from "@/lib/tuss-complete"
import { toast } from "sonner"

export default function OrcamentosPage() {
  const [budgets, setBudgets] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Form state
  const [selectedPatient, setSelectedPatient] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [items, setItems] = useState<any[]>([])
  const [paymentType, setPaymentType] = useState("cash")
  const [installments, setInstallments] = useState(1)

  // Item form
  const [tussSearch, setTussSearch] = useState("")
  const [tussResults, setTussResults] = useState<any[]>([])
  const [itemName, setItemName] = useState("")
  const [itemCode, setItemCode] = useState("")
  const [itemQuantity, setItemQuantity] = useState(1)
  const [itemPrice, setItemPrice] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (tussSearch.length >= 3) {
      const results = searchTUSS(tussSearch, 10)
      setTussResults(results)
    } else {
      setTussResults([])
    }
  }, [tussSearch])

  async function loadData() {
    setLoading(true)
    const [budgetsResult, patientsResult] = await Promise.all([getBudgets(), getPatientsList()])

    if (budgetsResult.success) setBudgets(budgetsResult.data || [])
    if (patientsResult.success) setPatients(patientsResult.patients || [])
    setLoading(false)
  }

  function addItem() {
    if (!itemName || itemQuantity <= 0 || itemPrice <= 0) {
      toast.error("Preencha todos os campos do item")
      return
    }

    setItems([
      ...items,
      {
        item_type: "procedure",
        code: itemCode,
        name: itemName,
        quantity: itemQuantity,
        unit_price: itemPrice,
      },
    ])

    // Reset form
    setItemName("")
    setItemCode("")
    setItemQuantity(1)
    setItemPrice(0)
    setTussSearch("")
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    if (!selectedPatient || !title || items.length === 0) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const result = await createBudget({
      patient_id: selectedPatient,
      title,
      description,
      valid_until: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      items,
      payment_type: paymentType,
      installments,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Orçamento criado com sucesso!")
      setIsNewDialogOpen(false)
      resetForm()
      loadData()
    }
  }

  function resetForm() {
    setSelectedPatient("")
    setTitle("")
    setDescription("")
    setValidUntil("")
    setItems([])
    setPaymentType("cash")
    setInstallments(1)
  }

  async function handleApprove(budgetId: string) {
    const result = await approveBudget(budgetId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Orçamento aprovado!")
      loadData()
    }
  }

  const filteredBudgets = budgets.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Orçamentos</h1>
            <p className="text-muted-foreground mt-1">Gerencie orçamentos e propostas de tratamento</p>
          </div>

          <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Orçamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Orçamento</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Dados Básicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Paciente *</Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Título *</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Tratamento Ortodôntico"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o tratamento proposto..."
                    className="rounded-xl min-h-20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Válido até</Label>
                    <Input
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Forma de Pagamento</Label>
                    <Select value={paymentType} onValueChange={setPaymentType}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">À vista</SelectItem>
                        <SelectItem value="installment">Parcelado</SelectItem>
                        <SelectItem value="insurance">Convênio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentType === "installment" && (
                    <div className="space-y-2">
                      <Label>Parcelas</Label>
                      <Input
                        type="number"
                        min={1}
                        max={24}
                        value={installments}
                        onChange={(e) => setInstallments(Number.parseInt(e.target.value))}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>

                {/* Adicionar Itens */}
                <div className="border rounded-2xl p-4 space-y-4">
                  <h3 className="font-semibold">Adicionar Procedimento</h3>

                  <div className="space-y-2">
                    <Label>Buscar TUSS</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={tussSearch}
                        onChange={(e) => setTussSearch(e.target.value)}
                        placeholder="Digite o nome do procedimento..."
                        className="pl-10 rounded-xl"
                      />
                    </div>

                    {tussResults.length > 0 && (
                      <div className="border rounded-xl max-h-40 overflow-y-auto">
                        {tussResults.map((result, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setItemCode(result.code)
                              setItemName(result.description)
                              setTussSearch("")
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-accent text-sm"
                          >
                            <div className="font-medium">{result.code}</div>
                            <div className="text-muted-foreground text-xs">{result.description}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-2 space-y-2">
                      <Label>Nome do Procedimento</Label>
                      <Input
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Nome"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Quantidade</Label>
                      <Input
                        type="number"
                        min={1}
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(Number.parseInt(e.target.value))}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Valor Unitário</Label>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={itemPrice}
                        onChange={(e) => setItemPrice(Number.parseFloat(e.target.value))}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Button onClick={addItem} variant="outline" className="w-full rounded-xl bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>

                {/* Lista de Itens */}
                {items.length > 0 && (
                  <div className="border rounded-2xl p-4 space-y-3">
                    <h3 className="font-semibold">Itens do Orçamento</h3>

                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          {item.code && <div className="text-sm text-muted-foreground">Código: {item.code}</div>}
                          <div className="text-sm">
                            {item.quantity}x R$ {item.unit_price.toFixed(2)} = R${" "}
                            {(item.quantity * item.unit_price).toFixed(2)}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(idx)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-2xl text-primary">R$ {totalAmount.toFixed(2)}</span>
                    </div>

                    {paymentType === "installment" && installments > 1 && (
                      <div className="text-sm text-muted-foreground text-center">
                        {installments}x de R$ {(totalAmount / installments).toFixed(2)}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsNewDialogOpen(false)} className="flex-1 rounded-xl">
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 rounded-xl" disabled={items.length === 0}>
                    Criar Orçamento
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Busca */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar orçamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <Card className="rounded-3xl">
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Carregando...</p>
              </CardContent>
            </Card>
          ) : filteredBudgets.length === 0 ? (
            <Card className="rounded-3xl">
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Nenhum orçamento encontrado</p>
              </CardContent>
            </Card>
          ) : (
            filteredBudgets.map((budget) => (
              <Card key={budget.id} className="rounded-3xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {budget.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Paciente: {budget.patient_name} • {budget.budget_number}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {budget.status === "draft" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm">
                          <Clock className="w-3 h-3" />
                          Pendente
                        </span>
                      )}
                      {budget.status === "approved" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm">
                          <CheckCircle className="w-3 h-3" />
                          Aprovado
                        </span>
                      )}
                      {budget.status === "rejected" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm">
                          <X className="w-3 h-3" />
                          Rejeitado
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budget.description && <p className="text-sm text-muted-foreground">{budget.description}</p>}

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Itens:</span>{" "}
                      <span className="font-medium">{budget.items_count}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total:</span>{" "}
                      <span className="font-bold text-lg text-primary">
                        R$ {Number.parseFloat(budget.final_amount).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Validade:</span>{" "}
                      <span className="font-medium">{new Date(budget.valid_until).toLocaleDateString("pt-BR")}</span>
                    </div>
                    {budget.payment_type === "installment" && budget.installments > 1 && (
                      <div>
                        <span className="text-muted-foreground">Parcelamento:</span>{" "}
                        <span className="font-medium">
                          {budget.installments}x R$ {Number.parseFloat(budget.installment_amount).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {budget.status === "draft" && (
                    <div className="flex gap-3 pt-2">
                      <Button onClick={() => handleApprove(budget.id)} className="rounded-xl">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button variant="outline" className="rounded-xl bg-transparent">
                        <FileText className="w-4 h-4 mr-2" />
                        Visualizar PDF
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
