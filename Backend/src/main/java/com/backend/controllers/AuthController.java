package com.backend.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.models.Buyer;
import com.backend.models.Seller;
import com.backend.models.User;
import com.backend.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // 1. Ψάχνουμε αν υπάρχει ο χρήστης με αυτό το email στη βάση H2
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Ο χρήστης με αυτό το email δεν βρέθηκε!"));
        }

        User user = userOptional.get();

        // 2. Ελέγχουμε αν ο κωδικός που έδωσε ταιριάζει με αυτόν στη βάση (passHash)
        if (user.getPassHash().equals(password)) {
            // Αν είναι σωστός, επιστρέφουμε τα στοιχεία του χρήστη (εκτός από τον κωδικό!)
            return ResponseEntity.ok(Map.of(
                "message", "Επιτυχής σύνδεση!",
                "userId", user.getId(),
                "userName", user.getUserName(),
                "role", String.valueOf(user.getRole())
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Λάθος κωδικός πρόσβασης!"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerData) {
        String email = registerData.get("email");
        
        // Έλεγχος αν το email χρησιμοποιείται ήδη
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Το e-mail χρησιμοποιείται ήδη!"));
        }

        String role = registerData.getOrDefault("role", "B").trim().toUpperCase();
        if ("S".equals(role)) {
            Seller newSeller = new Seller();
            newSeller.setName(registerData.get("name"));
            newSeller.setSurname(registerData.get("surname"));
            newSeller.setEmail(email);
            newSeller.setPhone(registerData.get("phone"));
            newSeller.setPassHash(registerData.get("password"));
            newSeller.setUserName(registerData.get("userName"));
            newSeller.setRole('S');
            userRepository.save(newSeller);
        } else {
            Buyer newBuyer = new Buyer();
            newBuyer.setName(registerData.get("name"));
            newBuyer.setSurname(registerData.get("surname"));
            newBuyer.setEmail(email);
            newBuyer.setPhone(registerData.get("phone"));
            newBuyer.setPassHash(registerData.get("password")); // Αποθήκευση κωδικού
            newBuyer.setUserName(registerData.get("userName"));
            newBuyer.setRole('B'); // 'B' για Buyer
            userRepository.save(newBuyer);
        }

        return ResponseEntity.ok(Map.of("message", "Ο χρήστης δημιουργήθηκε επιτυχώς!"));
    }
}