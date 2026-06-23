package com.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.models.Listing;
import com.backend.models.ListingType;
import com.backend.repositories.ListingRepository;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*") // Επιτρέπει cross-origin αιτήματα
public class SearchListingController {

    private final ListingRepository listingRepository;

    public SearchListingController(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    @PostMapping("/search")
    public List<Listing> searchListings(@RequestBody Map<String, String> filters) {
        String location = filters.getOrDefault("location", "");
        String filterTypeStr = filters.getOrDefault("filterType", "rent");
        
        ListingType type = ListingType.RENT;
        if ("sell".equalsIgnoreCase(filterTypeStr)) {
            type = ListingType.BUY;
        }

        // Φιλτράρισμα στη βάση δεδομένων H2
        return listingRepository.findByCityContainingIgnoreCaseAndListingType(location, type);
    }
}