package com.backend.controllers;

import com.backend.models.Listing;
import com.backend.models.ListingType;
import com.backend.services.SearchEngine;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/java/listings")
public class ListingController {

    private final SearchEngine searchEngine;

    public ListingController(SearchEngine searchEngine) {
        this.searchEngine = searchEngine;
    }

    @GetMapping("/search")
    public List<Listing> search(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String listingType,
            @RequestParam(required = false) Integer rooms,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String floor,
            @RequestParam(required = false) Integer sqmMin,
            @RequestParam(required = false) Integer sqmMax,
            @RequestParam(required = false) Integer priceMin,
            @RequestParam(required = false) Integer priceMax,
            @RequestParam(required = false, defaultValue = "false") Boolean parking) {

        // Μετατροπή του String σε Enum με ασφάλεια
        ListingType typeEnum = null;
        if (listingType != null && !listingType.isEmpty()) {
            typeEnum = ListingType.valueOf(listingType.toUpperCase());
        }

        return searchEngine.advancedSearch(
            location, typeEnum, rooms, year, floor, sqmMin, sqmMax, priceMin, priceMax, parking
        );
    }
}