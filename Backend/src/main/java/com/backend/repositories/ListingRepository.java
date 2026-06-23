package com.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.models.Listing;
import com.backend.models.ListingType;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByCityContainingIgnoreCaseAndListingType(String city, ListingType listingType);
}