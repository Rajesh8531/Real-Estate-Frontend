import {Listing} from '../features/listing.ts'

export const sorting = (sortingType:string,listings:Listing[])=>{

    switch ( sortingType){
        case ('latest')     : listings = listings.slice().sort((a,b)=>{
                                    return (new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
                                })
                            break

        case ('oldest')     : listings = listings.slice().sort((a,b)=>{
                                    return (new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
                                })
                            break

        case('price_asc')   : listings = listings.slice().sort((a,b)=>{
                                    return ((a.price - a.discountPrice)-(b.price-b.discountPrice))
                                })
                            break

        default             : listings = listings.slice().sort((a,b)=>{
                                        return ((b.price - b.discountPrice)-(a.price-a.discountPrice))
                                    })
                                break
    }

    return listings
}

interface SearchData {
    searchTerm : string,
        type : string,
        offer : boolean,
        parking : boolean,
        furnished : boolean,
        sort : string
}


export const filterListings = (listings:Listing[],searchData:SearchData) => {
    listings = listings.filter(item=>{
        if (searchData.type == 'all'){
            if(searchData.furnished && searchData.parking){
                return item.furnished && item.parkingSpot 
            }
            else if (searchData.furnished){
                return item.furnished 
            }
            else if(searchData.parking){
                return item.parkingSpot 
            }
            return true    
        }
        else{
            if(searchData.furnished && searchData.parking){
                return item.furnished && item.parkingSpot && item.type == searchData.type
            }
            else if (searchData.furnished){
                return item.furnished && item.type == searchData.type
            }
            else if(searchData.parking){
                return item.parkingSpot && item.type == searchData.type
            }
            return item.type == searchData.type
        }
    })

    return listings
}

export const Urls = ['https://firebasestorage.googleapis.com/v0/b/sample-917b6.appspot.com/o/images%2FKH5-lEoTX5yXqusxsx_dC?alt=media&token=faed48e0-0dcf-4596-828f-bf9a7045191a&_gl=1*a835rh*_ga*MTc2NDA3NjM5MC4xNjk3OTA0MTU0*_ga_CW55HF8NVT*MTY5ODIxNzU2NC4xMS4xLjE2OTgyMTc3MzYuMzkuMC4w',
                    'https://firebasestorage.googleapis.com/v0/b/sample-917b6.appspot.com/o/images%2F1QlO8Yk2zaZ7pJCRCAU95?alt=media&token=b8ae9f96-71dd-4c64-bc51-c940d548c781&_gl=1*pu9u0h*_ga*MTc2NDA3NjM5MC4xNjk3OTA0MTU0*_ga_CW55HF8NVT*MTY5ODIxNzU2NC4xMS4xLjE2OTgyMTc1OTkuMjUuMC4w',
                    'https://firebasestorage.googleapis.com/v0/b/sample-917b6.appspot.com/o/images%2FAoC6AX5BDNcZwMnUdC59f?alt=media&token=bfdfa4ba-014d-4461-b04a-844ddaeebc22&_gl=1*ex3526*_ga*MTc2NDA3NjM5MC4xNjk3OTA0MTU0*_ga_CW55HF8NVT*MTY5ODIxNzU2NC4xMS4xLjE2OTgyMTc2NjQuNDkuMC4w',
                    'https://firebasestorage.googleapis.com/v0/b/sample-917b6.appspot.com/o/images%2FvKQ-PNMZDDuvmNSGy5tE6?alt=media&token=dcb7271e-1161-4c71-8973-7b02bd04edc8&_gl=1*1qhw5r2*_ga*MTc2NDA3NjM5MC4xNjk3OTA0MTU0*_ga_CW55HF8NVT*MTY5ODIxNzU2NC4xMS4xLjE2OTgyMTc3MTYuNTkuMC4w',
                    'https://firebasestorage.googleapis.com/v0/b/sample-917b6.appspot.com/o/images%2Fejw2DlZgsabzOsZUY5zAA?alt=media&token=4cca1be6-fdfb-419f-b793-a29d8eef297d&_gl=1*1jupf9x*_ga*MTc2NDA3NjM5MC4xNjk3OTA0MTU0*_ga_CW55HF8NVT*MTY5ODIxNzU2NC4xMS4xLjE2OTgyMTc3NjYuOS4wLjA.'
                    ]