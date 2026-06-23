package com.backend.controllers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.models.Business;
import com.backend.models.Home;
import com.backend.models.Listing;
import com.backend.models.ListingType;
import com.backend.models.Parking;
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
        String category = filters.getOrDefault("category", "").trim().toLowerCase();
        String roomsStr = filters.getOrDefault("rooms", "").trim();
        String yearStr = filters.getOrDefault("year", "").trim();
        String floor = filters.getOrDefault("floor", "").trim();
        String sqmMinStr = filters.getOrDefault("sqmMin", "").trim();
        String sqmMaxStr = filters.getOrDefault("sqmMax", "").trim();
        String priceMinStr = filters.getOrDefault("priceMin", "").trim();
        String priceMaxStr = filters.getOrDefault("priceMax", "").trim();
        boolean hasParking = Boolean.parseBoolean(filters.getOrDefault("hasParking", "false"));

        ListingType type = ListingType.RENT;
        if ("sell".equalsIgnoreCase(filterTypeStr)) {
            type = ListingType.BUY;
        }

        List<Listing> results = listingRepository.findByCityContainingIgnoreCaseAndListingType(location, type);

        if (!category.isEmpty()) {
            if ("home".equals(category)) {
                results = results.stream()
                        .filter(listing -> listing instanceof Home)
                        .collect(Collectors.toList());
            } else if ("business".equals(category)) {
                results = results.stream()
                        .filter(listing -> listing instanceof Business)
                        .collect(Collectors.toList());
            } else if ("garage".equals(category) || "parking".equals(category)) {
                results = results.stream()
                        .filter(listing -> listing instanceof Parking)
                        .collect(Collectors.toList());
            }
        }

        return results.stream()
                .filter(listing -> yearStr.isEmpty() || listing.getYear() >= Integer.parseInt(yearStr))
                .filter(listing -> floor.isEmpty() || floor.equals(listing.getFloor()))
                .filter(listing -> roomsStr.isEmpty() || matchesRoomFilter(listing, roomsStr))
                .filter(listing -> sqmMinStr.isEmpty() || listing.getSize() >= Integer.parseInt(sqmMinStr))
                .filter(listing -> sqmMaxStr.isEmpty() || listing.getSize() <= Integer.parseInt(sqmMaxStr))
                .filter(listing -> priceMinStr.isEmpty() || listing.getPrice() >= Double.parseDouble(priceMinStr))
                .filter(listing -> priceMaxStr.isEmpty() || listing.getPrice() <= Double.parseDouble(priceMaxStr))
                .filter(listing -> !hasParking || listing instanceof Parking)
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public Map<String, Object> addListing(@RequestBody Map<String, Object> listingData) {
        String category = ((String) listingData.getOrDefault("category", "home")).trim().toLowerCase();
        String filterTypeStr = ((String) listingData.getOrDefault("filterType", "rent")).trim().toLowerCase();

        Listing listing;
        if ("business".equals(category)) {
            listing = new Business();
        } else if ("garage".equals(category) || "parking".equals(category)) {
            listing = new Parking();
        } else {
            listing = new Home();
        }

        ListingType type = ListingType.RENT;
        if ("sell".equalsIgnoreCase(filterTypeStr)) {
            type = ListingType.BUY;
        }
        listing.setListingType(type);
        listing.setTitle((String) listingData.getOrDefault("title", ""));
        listing.setDescription((String) listingData.getOrDefault("description", ""));
        listing.setAddress((String) listingData.getOrDefault("address", ""));
        listing.setCity((String) listingData.getOrDefault("city", ""));
        listing.setFloor((String) listingData.getOrDefault("floor", ""));
        listing.setStatus((String) listingData.getOrDefault("status", "available"));

        Object priceObj = listingData.get("price");
        if (priceObj != null) {
            listing.setPrice(Double.parseDouble(String.valueOf(priceObj)));
        }

        Object sizeObj = listingData.get("size");
        if (sizeObj != null) {
            listing.setSize(Integer.parseInt(String.valueOf(sizeObj)));
        }

        Object yearObj = listingData.get("year");
        if (yearObj != null && !String.valueOf(yearObj).isEmpty()) {
            listing.setYear(Integer.parseInt(String.valueOf(yearObj)));
        }

        if (listing instanceof Home) {
            Object roomsObj = listingData.get("rooms");
            if (roomsObj != null && !String.valueOf(roomsObj).isEmpty()) {
                ((Home) listing).setBedrooms(Integer.parseInt(String.valueOf(roomsObj)));
            }
        } else if (listing instanceof Business) {
            Object roomsObj = listingData.get("rooms");
            if (roomsObj != null && !String.valueOf(roomsObj).isEmpty()) {
                ((Business) listing).setRooms(Integer.parseInt(String.valueOf(roomsObj)));
            }
        } else if (listing instanceof Parking) {
            Object spotsObj = listingData.get("parkingSpots");
            if (spotsObj != null && !String.valueOf(spotsObj).isEmpty()) {
                ((Parking) listing).setParkingSpots(Integer.parseInt(String.valueOf(spotsObj)));
            }
        }

        listingRepository.save(listing);

        return Map.of(
            "message", "Η αγγελία καταχωρήθηκε με επιτυχία!",
            "id", listing.getId()
        );
    }

    private boolean matchesRoomFilter(Listing listing, String roomsStr) {
        int requested;
        try {
            requested = Integer.parseInt(roomsStr);
        } catch (NumberFormatException e) {
            return true;
        }

        if (listing instanceof Home) {
            return ((Home) listing).getBedrooms() >= requested;
        }
        if (listing instanceof Business) {
            return ((Business) listing).getRooms() >= requested;
        }
        if (listing instanceof Parking) {
            return ((Parking) listing).getParkingSpots() >= requested;
        }
        return true;
    }
}