package com.backend.config;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.backend.models.Admin;
import com.backend.models.Business;
import com.backend.models.Buyer;
import com.backend.models.Home;
import com.backend.models.Listing;
import com.backend.models.ListingType;
import com.backend.models.Parking;
import com.backend.models.Seller;
import com.backend.models.Support;
import com.backend.models.User;
import com.backend.repositories.ListingRepository;
import com.backend.repositories.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public DataSeeder(UserRepository userRepository, ListingRepository listingRepository) {
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    @Override
    public void run(String... args) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Seller seller = null;

            // 1. Δημιουργία ή εύρεση Χρηστών
            if (userRepository.count() == 0) {
                Admin admin = new Admin();
                admin.setUserName("admin01");
                admin.setName("Admin");
                admin.setSurname("User");
                admin.setEmail("admin@example.com");
                admin.setPhone("6900000001");
                admin.setPassHash("admin123");
                admin.setRole('A');
                admin.setBirthday(sdf.parse("1990-01-10"));
                admin.setAdminKey("ADMIN-SECRET-001");

                Buyer buyer = new Buyer();
                buyer.setUserName("buyer01");
                buyer.setName("Nikos");
                buyer.setSurname("Papadopoulos");
                buyer.setEmail("buyer@example.com");
                buyer.setPhone("6900000002");
                buyer.setPassHash("buyer123");
                buyer.setRole('B');
                buyer.setBirthday(sdf.parse("1998-05-20"));

                seller = new Seller();
                seller.setUserName("seller01");
                seller.setName("Maria");
                seller.setSurname("Georgiou");
                seller.setEmail("seller@example.com");
                seller.setPhone("6900000003");
                seller.setPassHash("seller123");
                seller.setRole('S');
                seller.setBirthday(sdf.parse("1985-09-15"));
                seller.setTaxId("123456789");
                seller.setiBan("GR1601101250000000012300695");
                seller.setRating(4.8);

                Support support = new Support();
                support.setUserName("support01");
                support.setName("Eleni");
                support.setSurname("Support");
                support.setEmail("support@example.com");
                support.setPhone("6900000004");
                support.setPassHash("support123");
                support.setRole('P');
                support.setBirthday(sdf.parse("1995-03-12"));
                support.setCategory("Technical Support");

                userRepository.save(admin);
                userRepository.save(buyer);
                userRepository.save(seller);
                userRepository.save(support);
            } else {
                User foundUser = userRepository.findAll().stream()
                        .filter(u -> "seller01".equals(u.getUserName()))
                        .findFirst()
                        .orElse(null);
                        
                if (foundUser instanceof Seller) {
                    seller = (Seller) foundUser;
                }
            }

            // 2. Δημιουργία 100 Listings
            if (listingRepository.count() == 0 && seller != null) {
                
                String[] locations = {"Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο", "Λάρισα", "Βόλος", "Ιωάννινα", "Χανιά", "Ρόδος", "Χαλκίδα"};
                ListingType[] filterTypes = {ListingType.RENT, ListingType.BUY};
                String[] categories = {"home", "business", "parking"}; 
                String[] floors = {"Ισόγειο", "1ος", "2ος", "3ος", "4ος"};
                
                Random random = new Random();
                List<Listing> listingsToSave = new ArrayList<>();

                for (int i = 1; i <= 100; i++) {
                    String location = locations[random.nextInt(locations.length)];
                    ListingType filterType = filterTypes[random.nextInt(filterTypes.length)];
                    String category = categories[random.nextInt(categories.length)];
                    
                    Listing listing; 
                    double price = 0;
                    int size = 0;
                    String title = "";
                    String description = "";

                    if ("home".equals(category)) {
                        Home homeListing = new Home();
                        size = 40 + random.nextInt(110);
                        price = (filterType == ListingType.RENT) ? (300 + random.nextInt(700)) : (60000 + random.nextInt(240000));
                        title = location;
                        description = "Προνομιακό ακίνητο, πλήρως ανακαινισμένο, σε ήσυχη γειτονιά.";
                        
                        homeListing.setBedrooms(1 + random.nextInt(3));
                        homeListing.setBathrooms(1 + random.nextInt(1));
                        homeListing.setHeatingType("Αυτόνομη Φυσικού Αερίου");
                        listing = homeListing;
                    } 
                    else if ("business".equals(category)) {
                        Business businessListing = new Business();
                        size = 50 + random.nextInt(250);
                        price = (filterType == ListingType.RENT) ? (600 + random.nextInt(2400)) : (120000 + random.nextInt(480000));
                        title = location;
                        description = "Εξαιρετικός επαγγελματικός χώρος/κατάστημα μεγάλης προβολής.";
                        
                        businessListing.setRooms(2 + random.nextInt(4));
                        businessListing.setBathrooms(1 + random.nextInt(2));
                        businessListing.setHeatingType("Κλιματισμός VRV");
                        listing = businessListing;
                    } 
                    else {
                        Parking parkingListing = new Parking();
                        size = 15 + random.nextInt(15);
                        price = (filterType == ListingType.RENT) ? (50 + random.nextInt(100)) : (12000 + random.nextInt(18000));
                        title = location;
                        description = "Κλειστή και ασφαλής θέση στάθμευσης με εύκολη είσοδο/έξοδο.";
                        
                        parkingListing.setParkingSpots(1);
                        parkingListing.setHeightLimit(220);
                        parkingListing.setWidthLimit(250);
                        listing = parkingListing;
                    }

                    listing.setCity(location);
                    listing.setMunicipality("Δήμος " + location);
                    listing.setListingType(filterType);
                    listing.setTitle(title);
                    listing.setDescription(description);
                    listing.setPrice(price);
                    listing.setSize(size); // size = τ.μ.
                    listing.setFloor(floors[random.nextInt(floors.length)]);
                    listing.setYear(1990 + random.nextInt(34));
                    listing.setHasElevator(random.nextBoolean());
                    listing.setStatus("ACTIVE");
                    listing.setAddress("Κεντρική Οδός " + (1 + random.nextInt(150)));

                    listingsToSave.add(listing);
                }
                listingRepository.saveAll(listingsToSave);
                System.out.println(">>> DATA SEEDING SUCCESSFUL! 100 LISTINGS SAVED! <<<");
            }
        } catch (Exception e) {
            System.err.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.err.println("CRITICAL ERROR IN DATA SEEDER:");
            e.printStackTrace(); 
            System.err.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }
}