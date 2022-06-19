export interface IGrain {
    name: string
    averageHarvestTime: string
    companyId: number
}

export interface IGrainCompanyLoggedIn {
    name: string
    stock: string
}

export interface IGrainList{
    id?: string,
    grain: string,
    plantedFarm: string
}
