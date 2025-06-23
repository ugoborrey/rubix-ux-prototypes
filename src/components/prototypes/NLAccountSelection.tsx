"use client"

import { useState } from "react"
import { Button } from "makocn"
import { Card, CardContent, CardHeader, CardTitle } from "makocn"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, RadioGroup, RadioGroupItem } from "makocn"
import { Label } from "makocn"
import { AlertBanner } from "makocn"
import { Separator } from "makocn"

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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Maak mijn account
          </h1>
          <Separator width="lg" thickness="thick" />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Account Type Selection */}
          <Card className="bg-white shadow-sm">
            <CardContent className="px-6 py-0">
              <h2 className="text-xl font-semibold mb-4">
                Selecteer uw accounttype
              </h2>
              
              <RadioGroup value={selectedAccountType} onValueChange={handleAccountTypeChange} className="mb-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Existing Customer Option */}
                  <div className="relative">
                    <RadioGroupItem value="existing" id="existing" className="sr-only" />
                    <Label 
                      htmlFor="existing"
                      className={`cursor-pointer p-6 border-2 rounded-lg transition-all duration-200 block ${
                        selectedAccountType === "existing" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-medium leading-6 mb-2">
                            Ik ben al klant bij rubix en wil een webshop login aanmaken
                          </h3>
                          <p className="text-muted-foreground leading-5">
                            Vul onderstaand uw klantnummer en BTW nummer in
                          </p>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedAccountType === "existing" 
                              ? "border-blue-600 bg-blue-700" 
                              : "border-neutral-300"
                          }`}>
                            {selectedAccountType === "existing" && (
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* New Customer Option */}
                  <div className="relative">
                    <RadioGroupItem value="new" id="new" className="sr-only" />
                    <Label 
                      htmlFor="new"
                      className={`cursor-pointer p-6 border-2 rounded-lg transition-all duration-200 block ${
                        selectedAccountType === "new" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="font-medium text-lg leading-6 mb-2">
                            Ik heb geen account bij rubix en betaal direct via ideal of creditcard
                          </h3>
                          <div className="space-y-2 mt-3">
                            <div className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground leading-5">Toegang tot gepersonaliseerde prijzen en voorwaarden</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground leading-5">Geniet van eenvoudig online orderbeheer en -tracering</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground leading-5">Levering uitsluitend aan bedrijven gevestigd in Nederland, wij leveren niet aan particulieren</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedAccountType === "new" 
                              ? "border-blue-600 bg-blue-600" 
                              : "border-slate-300"
                          }`}>
                            {selectedAccountType === "new" && (
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Login Link */}
              <div className="text-right">
                <button className="text-blue-600 hover:text-blue-700 cursor-pointer hover:underline">
                  Je hebt al een webshop login?
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Alert Banner for New Customers */}
          {selectedAccountType === "new" && (
            <div className="animate-in slide-in-from-top-5 duration-300">
              <AlertBanner
                variant="warning"
                icon={<AlertTriangle className="w-5 h-5 text-amber-700" />}
                description="Deze optie is momenteel niet beschikbaar voor klanten uit België en Luxembourg. Neem contact op met uw vestiging"
              />
            </div>
          )}

          {/* Business Details Form for Existing Customers */}
          {selectedAccountType === "existing" && (
            <div className="animate-in slide-in-from-top-5 duration-300 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bedrijfsgegevens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="business-account">
                      Uw bedrijfsrekeningnummer*
                    </Label>
                    <Input
                      id="business-account"
                      type="text"
                      value={businessAccountNumber}
                      onChange={(e) => setBusinessAccountNumber(e.target.value)}
                      className="h-10"
                      placeholder=""
                      helperText="Uw klantnummer vindt u op al uw Rubix-facturen"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="vat-number">
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
              <Card>
                <CardHeader>
                  <CardTitle>Vind uw bedrijf</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="search-company">
                        Zoeken op
                      </Label>
                      <Select value={companyName} onValueChange={setCompanyName}>
                        <SelectTrigger id="search-company" className="w-full">
                          <SelectValue placeholder="BTW-nummer" />
                        </SelectTrigger>
                        <SelectContent className="z-50">
                          <SelectItem value="bedrijfsnaam">Bedrijfsnaam</SelectItem>
                          <SelectItem value="btw-nummer">BTW-nummer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="company-name">
                        Bedrijfsnaam
                      </Label>
                      <Input
                        id="company-name"
                        type="text"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="postcode">
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
              <Button> Kies & ga verder </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default NLAccountSelection 