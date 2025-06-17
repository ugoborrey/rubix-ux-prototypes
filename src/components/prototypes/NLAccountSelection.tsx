"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import { AlertTriangle, Search, Check, ChevronDown } from "lucide-react"

const NLAccountSelection = () => {
  const [selectedAccountType, setSelectedAccountType] = useState<string>("")
  const [companyName, setCompanyName] = useState<string>("")
  const [businessAccountNumber, setBusinessAccountNumber] = useState<string>("")
  const [vatNumber, setVatNumber] = useState<string>("")
  const [postcode, setPostcode] = useState<string>("")

  const handleAccountTypeChange = (value: string) => {
    setSelectedAccountType(value)
    // Reset form fields when changing account type
    setBusinessAccountNumber("")
    setVatNumber("")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Maak mijn account
          </h1>
          <div className="w-20 h-1 bg-yellow-400"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Account Type Selection */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="px-6 py-0">
              <h2 className="text-xl font-semibold text-slate-700 mb-8">
                Selecteer uw accounttype
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Existing Customer Option */}
                <div 
                  className={`cursor-pointer p-6 border-2 rounded-lg transition-all duration-200 ${
                    selectedAccountType === "existing" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => handleAccountTypeChange("existing")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-slate-900 mb-2">
                        Ik ben al klant bij rubix en wil een webshop login aanmaken
                      </h3>
                      <p className="text-sm text-slate-600">
                        Vul onderstaand uw klantnummer en BTW nummer in
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAccountType === "existing" 
                            ? "border-blue-600 bg-blue-600" 
                            : "border-slate-300"
                        }`}
                      >
                        {selectedAccountType === "existing" && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Customer Option */}
                <div 
                  className={`cursor-pointer p-6 border-2 rounded-lg transition-all duration-200 ${
                    selectedAccountType === "new" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => handleAccountTypeChange("new")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-slate-900 mb-2">
                        Ik heb geen account bij rubix en betaal direct via ideal of creditcard
                      </h3>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700">Toegang tot gepersonaliseerde prijzen en voorwaarden</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700">Geniet van eenvoudig online orderbeheer en -tracering</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700">Levering uitsluitend aan bedrijven gevestigd in Nederland, wij leveren niet aan particulieren</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAccountType === "new" 
                            ? "border-blue-600 bg-blue-600" 
                            : "border-slate-300"
                        }`}
                      >
                        {selectedAccountType === "new" && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-right">
                <button className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer hover:underline">
                  Je hebt al een webshop login?
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Alert Banner for New Customers */}
          {selectedAccountType === "new" && (
            <div className="animate-in slide-in-from-top-5 duration-300">
              <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <strong>Deze optie is momenteel niet beschikbaar voor klanten uit België en Luxembourg.</strong> Neem contact op met uw vestiging
                </div>
              </div>
            </div>
          )}

          {/* Business Details Form for Existing Customers */}
          {selectedAccountType === "existing" && (
            <div className="animate-in slide-in-from-top-5 duration-300 space-y-4">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">Bedrijfsgegevens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-account" className="text-sm font-medium text-slate-700">
                      Uw bedrijfsrekeningnummer*
                    </Label>
                    <Input
                      id="business-account"
                      type="text"
                      value={businessAccountNumber}
                      onChange={(e) => setBusinessAccountNumber(e.target.value)}
                      className="h-10"
                      placeholder=""
                    />
                    <p className="text-xs text-slate-500">
                      Uw klantnummer vindt u op al uw Rubix-facturen
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vat-number" className="text-sm font-medium text-slate-700">
                      BTW nummer (verplicht)
                    </Label>
                    <Input
                      id="vat-number"
                      type="text"
                      value={vatNumber}
                      onChange={(e) => setVatNumber(e.target.value)}
                      className="h-10"
                      placeholder=""
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Doorgaan Button for Existing Customers */}
              <div className="flex justify-end">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer"
                >
                  Doorgaan
                </Button>
              </div>
            </div>
          )}

          {/* Company Search Form for New Customers */}
          {selectedAccountType === "new" && (
            <div className="animate-in slide-in-from-top-5 duration-300">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">Vind uw bedrijf</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search-company" className="text-sm font-medium text-slate-700">
                        Zoeken op
                      </Label>
                      <div className="relative">
                        <Input
                          id="search-company"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Company name"
                          className="h-10 pl-4 pr-10"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-name" className="text-sm font-medium text-slate-700">
                        Bedrijfsnaam
                      </Label>
                      <Input
                        id="company-name"
                        type="text"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="text-sm font-medium text-slate-700">
                        Postcode (optioneel)
                      </Label>
                      <Input
                        id="postcode"
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>Zoek bedrijf</span>
                    </Button>

                    <button className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer hover:underline">
                      Kunt u uw bedrijf niet vinden?
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Kies & ga verder Button for New Customers */}
          {selectedAccountType === "new" && (
            <div className="flex justify-end">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer"
              >
                Kies & ga verder
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default NLAccountSelection 