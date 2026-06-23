package com.backend.services;

import com.backend.models.*;
import com.backend.repositories.ListingRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

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
                // 1. Φίλτρο Τοποθεσίας (Ψάχνει σε Πόλη, Περιοχή ή Δήμο)
                .filter(l -> location == null || location.isEmpty() || 
                        l.getCity().equalsIgnoreCase(location) || 
                        l.getArea().equalsIgnoreCase(location) || 
                        l.getMunicipality().equalsIgnoreCase(location))

                // 2. Φίλτρο Τύπου (RENT / BUY)
                .filter(l -> listingType == null || l.getListingType() == listingType)

                // 3. Φίλτρο Δωματίων (Ελέγχει αν είναι Home ή Business που έχουν δωμάτια)
                .filter(l -> {
                    if (rooms == null) return true;
                    if (l instanceof Home) {
                        return ((Home) l).getBedrooms() == rooms;
                    } else if (l instanceof Business) {
                        return ((Business) l).getRooms() == rooms;
                    }
                    return false; // Αν είναι Parking, απορρίπτεται αφού ζητήθηκαν δωμάτια
                })

                // 4. Φίλτρο Έτους Κατασκευής
                .filter(l -> year == null || l.getYear() == year)

                // 5. Φίλτρο Ορόφου
                .filter(l -> floor == null || floor.isEmpty() || l.getFloor().equalsIgnoreCase(floor))

                // 6. Φίλτρο Εμβαδού (Min - Max)
                .filter(l -> sqmMin == null || l.getSize() >= sqmMin)
                .filter(l -> sqmMax == null || l.getSize() <= sqmMax)

                // 7. Φίλτρο Τιμής (Min - Max)
                .filter(l -> priceMin == null || l.getPrice() >= priceMin)
                .filter(l -> priceMax == null || l.getPrice() <= priceMax)

                // 8. Φίλτρο Parking (Αν ο χρήστης θέλει πάρκινγκ, ελέγχει αν η αγγελία είναι τύπου Parking)
                .filter(l -> {
                    if (parking == null || !parking) return true;
                    return l instanceof Parking; // Επιστρέφει true μόνο αν το ακίνητο είναι θέση Parking
                })

                .collect(Collectors.toList());
    }

    // Μέθοδοι καταλόγου από το Class Diagram
    public void addListingToCatalog(Listing listing) {
        listingRepository.save(listing);
    }

    public void removeListingFromCatalog(Listing listing) {
        listingRepository.delete(listing);
    }
}