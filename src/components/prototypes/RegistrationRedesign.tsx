"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CheckCircle,
  Building2,
  Users,
  CreditCard,
  FileText,
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Star,
  Zap,
  ArrowLeft,
  Info,
} from "lucide-react"

// Types
interface SearchForm {
  companyName: string
  department: string
}

interface Company {
  id: number
  name: string
  address: string
  siret: string
  activity: string
}

interface Step1Props {
  selectedOption: string
  setSelectedOption: (option: string) => void
  showDetails: boolean
  animateIn: boolean
  setCurrentStep: (step: number) => void
  detailsRef: React.RefObject<HTMLDivElement | null>
}

interface Step2DiscoveryProps {
  searchForm: SearchForm
  setSearchForm: React.Dispatch<React.SetStateAction<SearchForm>>
  searchResults: Company[]
  setSearchResults: React.Dispatch<React.SetStateAction<Company[]>>
  selectedCompany: Company | null
  setSelectedCompany: React.Dispatch<React.SetStateAction<Company | null>>
  isSearching: boolean
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
  hasSearched: boolean
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentStep: (step: number) => void
}

interface Step2ExistingProps {
  setCurrentStep: (step: number) => void
}

// Step1 Component
const Step1 = ({ selectedOption, setSelectedOption, showDetails, animateIn, setCurrentStep, detailsRef }: Step1Props) => {
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)

    // Scroll vers les détails après un petit délai pour laisser l'animation se déclencher
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 400) // Délai légèrement plus long que l'animation showDetails (300ms)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div
        className={`max-w-5xl w-full transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Bienvenue chez Rubix
          </Badge>

          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Créons ensemble votre
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              espace MyRubix
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Commençons par mieux vous connaître</p>
        </div>

        {/* Question centrale */}
        <div className="text-center mb-8">
          <Card className="inline-block max-w-2xl shadow-xl border-slate-200">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl text-slate-900">
                Votre entreprise collabore-t-elle déjà avec Rubix ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant={selectedOption === "discovery" ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleOptionSelect("discovery")}
                  className={`group relative px-8 py-6 h-auto flex items-center justify-center space-x-3 transition-all duration-300 ${
                    selectedOption === "discovery"
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105"
                      : "border-slate-300 hover:border-blue-300 hover:bg-blue-50 text-slate-700"
                  }`}
                >
                  <Building2
                    className={`w-5 h-5 transition-transform ${selectedOption === "discovery" ? "scale-110" : "group-hover:scale-110"}`}
                  />
                  <span className="font-medium">Non, première fois</span>
                  {selectedOption === "discovery" && <CheckCircle className="w-5 h-5" />}
                </Button>

                <Button
                  variant={selectedOption === "existing" ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleOptionSelect("existing")}
                  className={`group relative px-8 py-6 h-auto flex items-center justify-center space-x-3 transition-all duration-300 ${
                    selectedOption === "existing"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                      : "border-slate-300 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700"
                  }`}
                >
                  <ShieldCheck
                    className={`w-5 h-5 transition-transform ${selectedOption === "existing" ? "scale-110" : "group-hover:scale-110"}`}
                  />
                  <span className="font-medium">Oui, déjà cliente</span>
                  {selectedOption === "existing" && <CheckCircle className="w-5 h-5" />}
                </Button>
              </div>

              {/* Ajouter le lien de connexion ici */}
              <div className="text-center mt-6 pt-4 border-t border-slate-200">
                <Button variant="link" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Déjà un accès web? Se connecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détails révélés avec ref pour le scroll */}
        {showDetails && (
          <div
            ref={detailsRef}
            className={`transition-all duration-700 transform ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {selectedOption === "discovery" && (
              <div className="max-w-4xl mx-auto">
                <Card className="shadow-xl border-slate-200">
                  <CardHeader className="text-center pb-6">
                    <div className="mb-4">
                      <Badge className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-medium">
                        <Zap className="w-4 h-4 mr-2" />
                        Compte Découverte
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-slate-900">Parfait ! Découvrons Rubix ensemble</CardTitle>
                    <CardDescription className="text-slate-600 text-base">
                      Votre compte évolue avec votre relation commerciale
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Avantages immédiats */}
                      <Card className="border-slate-200 bg-slate-50">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center text-slate-900">
                            <Star className="w-5 h-5 mr-2" style={{ color: "#FFD700" }} />
                            Dès aujourd&apos;hui
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm text-slate-700">Catalogue complet accessible</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm text-slate-700">Commande en ligne simplifiée</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <span className="text-sm text-slate-700">Paiement sécurisé par carte</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Évolution future */}
                      <Card className="border-slate-200 bg-slate-50">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center text-slate-900">
                            <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                            Évolution possible
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            <span className="text-sm text-slate-700">Tarifs négociés personnalisés</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-purple-500" />
                            <span className="text-sm text-slate-700">Paiement sur compte client</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-purple-500" />
                            <span className="text-sm text-slate-700">Gestion multi-utilisateurs</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm">
                      <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-slate-700">
                                              <strong>L&apos;évolution vers un compte client</strong> se fait naturellement selon votre volume
                       d&apos;activité, vos besoins et nos critères commerciaux. Pour plus d&apos;informations, contactez-nous à l&apos;adresse <a href="mailto:contact@rubix.fr" className="text-blue-600 hover:text-blue-700">contact@rubix.fr</a>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={() => setCurrentStep(2)}
                        size="lg"
                        className="px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span>Créer mon compte découverte</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedOption === "existing" && (
              <div className="max-w-4xl mx-auto">
                <Card className="shadow-xl border-slate-200">
                  <CardHeader className="text-center pb-6">
                    <div className="mb-4">
                      <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 font-medium">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Client Établi
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-slate-900">Excellent ! Créons votre espace en ligne</CardTitle>
                    <CardDescription className="text-slate-600 text-base">
                      Rattachement à votre compte client Rubix existant
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <Card className="bg-emerald-50 border-emerald-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center text-emerald-900">
                          <Star className="w-5 h-5 mr-2" style={{ color: "#FFD700" }} />
                          Vos avantages client
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm text-emerald-800"><strong>Catalogue personnalisé</strong> - Bénéficiez de vos tarifs négociés et catalogues sur-mesure</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm text-emerald-800"><strong>Paiement sur compte</strong> - Réglez vos commandes selon vos conditions de paiement</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                                                          <span className="text-sm text-emerald-800"><strong>Gestion collaborative</strong> - Gérez vos équipes avec workflows d&apos;approbation et droits d&apos;accès</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm text-emerald-800"><strong>Espace documentaire centralisé</strong> - Accédez à toutes vos factures, devis et bons de livraison</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
                      <FileText className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-amber-800">
                        <span className="font-bold">Information requise :</span> vous aurez besoin de votre <span className="font-bold">numéro de compte client Rubix</span> (visible sur vos factures) pour finaliser le rattachement.
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={() => setCurrentStep(2)}
                        size="lg"
                        className="px-8 py-6 h-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span>Créer mon espace en ligne</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Step2Discovery Component
const Step2Discovery = ({
  searchForm,
  setSearchForm,
  searchResults,
  setSearchResults,
  selectedCompany,
  setSelectedCompany,
  isSearching,
  setIsSearching,
  hasSearched,
  setHasSearched,
  setCurrentStep,
}: Step2DiscoveryProps) => {
  const handleSearch = async () => {
    if (!searchForm.companyName.trim() || !searchForm.department.trim()) {
      return
    }

    setIsSearching(true)
    setHasSearched(false)

    // Simulation d'appel API - remplacer par votre vraie API CreditSafe
    setTimeout(() => {
      const mockResults: Company[] = [
        {
          id: 1,
          name: searchForm.companyName.toUpperCase() + " SAS",
          address: "123 Rue de la République, 75001 Paris",
          siret: "12345678901234",
          activity: "Commerce de détail",
        },
        {
          id: 2,
          name: searchForm.companyName.toUpperCase() + " SARL",
          address:
            "456 Avenue des Champs, " +
            searchForm.department +
            "000 " +
            (searchForm.department === "75" ? "Paris" : "Lyon"),
          siret: "98765432109876",
          activity: "Services aux entreprises",
        },
        {
          id: 3,
          name: "GROUPE " + searchForm.companyName.toUpperCase(),
          address:
            "789 Boulevard Central, " +
            searchForm.department +
            "100 " +
            (searchForm.department === "69" ? "Lyon" : "Marseille"),
          siret: "11223344556677",
          activity: "Industrie manufacturière",
        },
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
      setHasSearched(true)
    }, 1500)
  }

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company)
  }

  const handleInputChange = useCallback(
    (field: keyof SearchForm, value: string) => {
      setSearchForm((prev) => ({
        ...prev,
        [field]: value,
      }))

      // Reset search when inputs change
      if (hasSearched) {
        setHasSearched(false)
        setSearchResults([])
        setSelectedCompany(null)
      }
    },
    [hasSearched, setSearchForm, setHasSearched, setSearchResults, setSelectedCompany],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <Card className="shadow-xl border-slate-200">
          <CardHeader>
            <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
              <Badge className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-medium">
                Compte Découverte
              </Badge>
              <ArrowRight className="w-4 h-4" />
              <span>Informations entreprise</span>
            </div>
            <CardTitle className="text-3xl text-slate-900">Parlez-nous de votre entreprise</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Formulaire de recherche */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-search" className="text-slate-700 font-medium">
                    Nom de votre entreprise <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      id="company-search"
                      type="text"
                      placeholder="Nom de l&apos;entreprise..."
                      value={searchForm.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="pl-11 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-700 font-medium">
                    Département <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="Ex: 75, 69, 13..."
                    value={searchForm.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSearch}
                  disabled={!searchForm.companyName.trim() || !searchForm.department.trim() || isSearching}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Recherche en cours...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Rechercher
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Résultats de recherche */}
            {hasSearched && searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Sélectionnez votre entreprise ({searchResults.length} résultats trouvés)
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {searchResults.map((company) => (
                      <Card
                        key={company.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedCompany?.id === company.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                        }`}
                        onClick={() => handleCompanySelect(company)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-1">{company.name}</h4>
                              <p className="text-sm text-slate-600 mb-1">{company.address}</p>
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span>SIRET: {company.siret}</span>
                                <span>•</span>
                                <span>{company.activity}</span>
                              </div>
                            </div>
                            {selectedCompany?.id === company.id && (
                              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 ml-3" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lien si l'utilisateur ne trouve pas son entreprise */}
            {hasSearched && searchResults.length > 0 && (
              <div className="text-center pt-4 border-t border-slate-200">
                <Button variant="link" className="text-slate-600 hover:text-blue-600 transition-colors text-sm">
                  Vous ne trouvez pas votre société ?
                </Button>
              </div>
            )}

            {/* Message si aucun résultat */}
            {hasSearched && searchResults.length === 0 && (
              <div className="border-t pt-6">
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm mb-4">
                  <div className="text-amber-800">
                    <span className="font-bold">Aucune entreprise trouvée</span> avec ces critères. Vérifiez l&apos;orthographe du nom ou
                    essayez avec un département différent.
                  </div>
                </div>

                <div className="text-center">
                  <Button variant="link" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Vous ne trouvez pas votre société ?
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <Button
                disabled={!selectedCompany}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Step2Existing Component
const Step2Existing = ({ setCurrentStep }: Step2ExistingProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
    <div className="max-w-2xl w-full">
      <Card className="shadow-xl border-slate-200">
        <CardHeader>
          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
            <Badge className="bg-emerald-100 text-emerald-800 px-3 py-1 font-medium">Client Établi</Badge>
            <ArrowRight className="w-4 h-4" />
            <span>Rattachement compte</span>
          </div>
          <CardTitle className="text-3xl text-slate-900">Rattachement à votre compte</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="account-number" className="text-slate-700 font-medium">
              Numéro de compte client <span className="text-red-500">*</span>
            </Label>
            <Input
              id="account-number"
              type="text"
              placeholder="Ex: 123456"
              className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <p className="text-xs text-slate-500">Disponible sur toutes vos factures Rubix</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siret" className="text-slate-700 font-medium">
              SIRET entreprise <span className="text-red-500">*</span>
            </Label>
            <Input
              id="siret"
              type="text"
              placeholder="14 chiffres"
              className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <Button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg">
              Vérifier et continuer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Main Component
const RegistrationRedesign = () => {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [animateIn, setAnimateIn] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [searchForm, setSearchForm] = useState<SearchForm>({
    companyName: "",
    department: "",
  })

  // Ref pour le scroll vers les détails
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedOption) {
      setTimeout(() => setShowDetails(true), 300)
    } else {
      setShowDetails(false)
    }
  }, [selectedOption])

  useEffect(() => {
    setAnimateIn(true)
  }, [])

  if (currentStep === 1) {
    return (
      <Step1
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        showDetails={showDetails}
        animateIn={animateIn}
        setCurrentStep={setCurrentStep}
        detailsRef={detailsRef}
      />
    )
  } else if (currentStep === 2 && selectedOption === "discovery") {
    return (
      <Step2Discovery
        searchForm={searchForm}
        setSearchForm={setSearchForm}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        hasSearched={hasSearched}
        setHasSearched={setHasSearched}
        setCurrentStep={setCurrentStep}
      />
    )
  } else {
    return <Step2Existing setCurrentStep={setCurrentStep} />
  }
}

export default RegistrationRedesign 