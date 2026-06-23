package com.backend.controllers;

import com.backend.models.User;
import com.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

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
}