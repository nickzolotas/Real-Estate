package com.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.models.Business;
import com.backend.models.Home;
import com.backend.models.Listing;
import com.backend.models.ListingType;
import com.backend.models.Parking;
import com.backend.repositories.ListingRepository;

@Service
public class SearchEngine implements Searchable {

    private final ListingRepository listingRepository;

    public SearchEngine(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    @Override
    public List<Listing> advancedSearch(
            String location, ListingType listingType, Integer rooms, Integer year, String floor,
            Integer sqmMin, Integer sqmMax, Integer priceMin, Integer priceMax, Boolean parking) {

        return listingRepository.findAll().stream()
                // 1. Φίλτρο Τοποθεσίας (Πόλη ή Δήμος)
                .filter(l -> location == null || location.isEmpty() || 
                    (l.getCity() != null && l.getCity().equalsIgnoreCase(location)) || 
                    (l.getMunicipality() != null && l.getMunicipality().equalsIgnoreCase(location)))

                // 2. Φίλτρο Τύπου (RENT / BUY)
                .filter(l -> listingType == null || l.getListingType() == listingType)

                // 3. Φίλτρο Δωματίων
                .filter(l -> {
                    if (rooms == null) return true;
                    if (l instanceof Home) {
                        return ((Home) l).getBedrooms() == rooms;
                    } else if (l instanceof Business) {
                        return ((Business) l).getRooms() == rooms;
                    }
                    return false; 
                })

                // 4. Φίλτρο Έτους Κατασκευής
                .filter(l -> year == null || l.getYear() == year)

                // 5. Φίλτρο Ορόφου
                .filter(l -> floor == null || floor.isEmpty() || 
                    (l.getFloor() != null && l.getFloor().equalsIgnoreCase(floor)))

                // 6. Φίλτρο Εμβαδού (τ.μ.)
                .filter(l -> sqmMin == null || l.getSize() >= sqmMin)
                .filter(l -> sqmMax == null || l.getSize() <= sqmMax)

                // 7. Φίλτρο Τιμής
                .filter(l -> priceMin == null || l.getPrice() >= priceMin)
                .filter(l -> priceMax == null || l.getPrice() <= priceMax)

                // 8. Φίλτρο Αυτοτελούς Θέσης Parking
                .filter(l -> {
                    if (parking == null || !parking) return true;
                    return l instanceof Parking;
                })

                .collect(Collectors.toList());
    }

    public void addListingToCatalog(Listing listing) {
        listingRepository.save(listing);
    }

    public void removeListingFromCatalog(Listing listing) {
        listingRepository.delete(listing);
    }
}