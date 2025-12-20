"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Plus, Search, Download, Eye } from "lucide-react"
import { getMedicalImages, deleteMedicalImage } from "@/app/actions/medical-images"
import { Input } from "@/components/ui/input"

export default function ImagensPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    setLoading(true)
    const result = await getMedicalImages()
    if (result.success) {
      setImages(result.data)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
      const result = await deleteMedicalImage(id)
      if (result.success) {
        loadImages()
      }
    }
  }

  const filteredImages = images.filter(
    (img) =>
      img.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.exam_type?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ImageIcon className="w-8 h-8" />
            Imagens Médicas
          </h1>
          <p className="text-muted-foreground">Gestão de exames de imagem e laudos</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Upload de Imagem
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Imagens Cadastradas</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Nenhuma imagem encontrada</p>
              </div>
            ) : (
              filteredImages.map((image) => (
                <Card key={image.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        <CardTitle className="text-base">{image.patient_name}</CardTitle>
                      </div>
                      <Badge>{image.exam_type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Data:</span>
                        <span>{new Date(image.exam_date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      {image.findings && <p className="text-xs text-muted-foreground line-clamp-2">{image.findings}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-transparent" variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
