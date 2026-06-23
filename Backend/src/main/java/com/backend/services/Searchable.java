package com.backend.services;

import com.backend.models.Listing;
import com.backend.models.ListingType;
import java.util.List;

public interface Searchable {
    List<Listing> advancedSearch(
        String location,
        ListingType listingType,
        Integer rooms,
        Integer year,
        String floor,
        Integer sqmMin,
        Integer sqmMax,
        Integer priceMin,
        Integer priceMax,
        Boolean parking
    );
}