"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { NavigationHeader } from "@/components/navigation-header"
import { PatientSearchSelect } from "@/components/patient-search-select"
import { ImageIcon, Plus, Search, Download, Eye, Upload, X, Trash2 } from "lucide-react"
import { getMedicalImages, deleteMedicalImage, uploadMedicalImage } from "@/app/actions/medical-images"
import { toast } from "sonner"

const EXAM_TYPES = [
  "Raio-X",
  "Tomografia",
  "Ressonancia Magnetica",
  "Ultrassonografia",
  "Mamografia",
  "Densitometria Ossea",
  "Ecocardiograma",
  "Eletrocardiograma",
  "Endoscopia",
  "Colonoscopia",
  "Cintilografia",
  "Outro"
]

export default function ImagensPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [uploading, setUploading] = useState(false)

  const [uploadData, setUploadData] = useState({
    patient: null as any,
    exam_type: "",
    exam_date: new Date().toISOString().split("T")[0],
    findings: "",
    notes: "",
    file: null as File | null
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    setLoading(true)
    const result = await getMedicalImages()
    if (result.success) {
      setImages(result.data || [])
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
      const result = await deleteMedicalImage(id)
      if (result.success) {
        toast.success("Imagem excluida com sucesso")
        loadImages()
      } else {
        toast.error(result.error || "Erro ao excluir imagem")
      }
    }
  }

  async function handleUpload() {
    if (!uploadData.patient) {
      toast.error("Selecione um paciente")
      return
    }
    if (!uploadData.exam_type) {
      toast.error("Selecione o tipo de exame")
      return
    }
    if (!uploadData.file) {
      toast.error("Selecione um arquivo de imagem")
      return
    }

    setUploading(true)

    const formData = new FormData()
    formData.append("file", uploadData.file)
    formData.append("patient_id", uploadData.patient.id)
    formData.append("exam_type", uploadData.exam_type)
    formData.append("exam_date", uploadData.exam_date)
    formData.append("findings", uploadData.findings)
    formData.append("notes", uploadData.notes)

    const result = await uploadMedicalImage(formData)

    if (result.success) {
      toast.success("Imagem enviada com sucesso!")
      setShowUploadModal(false)
      setUploadData({
        patient: null,
        exam_type: "",
        exam_date: new Date().toISOString().split("T")[0],
        findings: "",
        notes: "",
        file: null
      })
      loadImages()
    } else {
      toast.error(result.error || "Erro ao enviar imagem")
    }

    setUploading(false)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/") && !file.type.includes("dicom")) {
        toast.error("Por favor, selecione um arquivo de imagem valido")
        return
      }
      setUploadData({ ...uploadData, file })
    }
  }

  function handleViewImage(image: any) {
    setSelectedImage(image)
    setShowViewModal(true)
  }

  const filteredImages = images.filter(
    (img) =>
      img.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.exam_type?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ImageIcon className="w-8 h-8" />
              Imagens Medicas
            </h1>
            <p className="text-muted-foreground">Gestao de exames de imagem e laudos</p>
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Upload de Imagem
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Imagens Cadastradas ({filteredImages.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar paciente ou exame..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Nenhuma imagem encontrada</p>
                    <Button variant="outline" className="mt-4" onClick={() => setShowUploadModal(true)}>
                      <Upload className="w-4 h-4 mr-2" />
                      Fazer primeiro upload
                    </Button>
                  </div>
                ) : (
                  filteredImages.map((image) => (
                    <Card key={image.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            <CardTitle className="text-base">{image.patient_name}</CardTitle>
                          </div>
                          <Badge>{image.exam_type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                          className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleViewImage(image)}
                        >
                          {image.image_url ? (
                            <img src={image.image_url} alt={image.exam_type} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Data:</span>
                            <span>{new Date(image.exam_date).toLocaleDateString("pt-BR")}</span>
                          </div>
                          {image.findings && <p className="text-xs text-muted-foreground line-clamp-2">{image.findings}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" variant="outline" size="sm" onClick={() => handleViewImage(image)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(image.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Upload */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload de Imagem Medica
              </DialogTitle>
              <DialogDescription>
                Envie uma imagem de exame para o prontuario do paciente
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Paciente *</Label>
                <PatientSearchSelect
                  onPatientSelect={(p) => setUploadData({ ...uploadData, patient: p })}
                  selectedPatient={uploadData.patient}
                  required
                />
              </div>

              <div>
                <Label>Tipo de Exame *</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={uploadData.exam_type}
                  onChange={(e) => setUploadData({ ...uploadData, exam_type: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {EXAM_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Data do Exame *</Label>
                <Input
                  type="date"
                  value={uploadData.exam_date}
                  onChange={(e) => setUploadData({ ...uploadData, exam_date: e.target.value })}
                />
              </div>

              <div>
                <Label>Arquivo de Imagem *</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadData.file ? (
                    <div className="flex items-center justify-center gap-2">
                      <ImageIcon className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{uploadData.file.name}</p>
                        <p className="text-xs text-muted-foreground">{(uploadData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setUploadData({ ...uploadData, file: null }) }}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Clique para selecionar ou arraste o arquivo</p>
                      <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, DICOM ate 50MB</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.dcm"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <Label>Achados / Laudo</Label>
                <Textarea
                  value={uploadData.findings}
                  onChange={(e) => setUploadData({ ...uploadData, findings: e.target.value })}
                  placeholder="Descricao dos achados do exame..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Observacoes</Label>
                <Textarea
                  value={uploadData.notes}
                  onChange={(e) => setUploadData({ ...uploadData, notes: e.target.value })}
                  placeholder="Observacoes adicionais..."
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowUploadModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleUpload} disabled={uploading} className="flex-1">
                  {uploading ? "Enviando..." : "Enviar Imagem"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Visualizacao */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {selectedImage?.exam_type} - {selectedImage?.patient_name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                {selectedImage?.image_url ? (
                  <img src={selectedImage.image_url} alt={selectedImage.exam_type} className="max-w-full max-h-full object-contain" />
                ) : (
                  <ImageIcon className="w-24 h-24 text-gray-600" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Paciente</Label>
                  <p className="font-medium">{selectedImage?.patient_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Data do Exame</Label>
                  <p className="font-medium">{selectedImage?.exam_date ? new Date(selectedImage.exam_date).toLocaleDateString("pt-BR") : "-"}</p>
                </div>
                {selectedImage?.findings && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Achados / Laudo</Label>
                    <p>{selectedImage.findings}</p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
