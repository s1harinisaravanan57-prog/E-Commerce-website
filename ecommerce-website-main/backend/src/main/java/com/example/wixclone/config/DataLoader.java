package com.example.wixclone.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.wixclone.model.Product;
import com.example.wixclone.repository.ProductRepository;
import com.example.wixclone.repository.UserRepository;
import com.example.wixclone.model.User;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner init(ProductRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.saveAll(List.of(
                    new Product("Cloudy Day Mobile", "A dreamy handmade nursery mobile.", new BigDecimal("48.00"), "/pics/Screenshot 2026-08-01 115944.png", 12),
                    new Product("Heirloom Knit Suit", "Soft knit comfort for every day.", new BigDecimal("42.00"), "/pics/Screenshot 2026-08-01 115952.png", 18),
                    new Product("Cuddle Bear", "A forever friend made for tiny hands.", new BigDecimal("28.00"), "/pics/Screenshot 2026-08-01 120010.png", 25),
                    new Product("Oatmeal Rib Romper", "Easy organic cotton essentials.", new BigDecimal("32.00"), "/pics/Screenshot 2026-08-01 120021.png", 20),
                    new Product("Organic Muslin Swaddle", "Breathable softness for cuddles.", new BigDecimal("24.00"), "/pics/Screenshot 2026-08-01 120047.png", 30),
                    new Product("Blush Ribbed Socks", "The sweetest finishing touch.", new BigDecimal("12.00"), "/pics/Screenshot 2026-08-01 120103.png", 40),
                    new Product("Two-Piece Blanket Set", "Double the softness, beautifully wrapped.", new BigDecimal("36.00"), "/pics/Screenshot 2026-08-01 120123.png", 15),
                    new Product("Sage Cotton Bonnet", "A timeless little layer.", new BigDecimal("18.00"), "/pics/Screenshot 2026-08-01 120141.png", 24)
                ));
            }
        };
    }

    // cleanup invalid users that may have been created with empty username/password
    @Bean
    CommandLineRunner cleanupUsers(UserRepository userRepository) {
        return args -> {
            List<User> toRemove = userRepository.findAll().stream()
                .filter(u -> u.getUsername() == null || u.getUsername().trim().isEmpty() || u.getPassword() == null || u.getPassword().trim().isEmpty())
                .collect(Collectors.toList());
            if (!toRemove.isEmpty()) {
                userRepository.deleteAll(toRemove);
                System.out.println("Removed " + toRemove.size() + " invalid user(s) with empty username/password.");
            }
        };
    }
}
