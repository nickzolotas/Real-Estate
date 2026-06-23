package com.backend.config;

import com.backend.models.*;
import com.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() > 0) {
            return;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

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

        Seller seller = new Seller();
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
    }
}