package com.example.wixclone.controller;

import com.example.wixclone.dto.AuthResponse;
import com.example.wixclone.dto.LoginRequest;
import com.example.wixclone.dto.RegisterRequest;
import com.example.wixclone.model.User;
import com.example.wixclone.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.wixclone.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) {
        if (req.getUsername() == null || req.getPassword() == null || req.getUsername().trim().isEmpty() || req.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "username and password required"));
        }
        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "username already exists"));
        }
        String hashed = passwordEncoder.encode(req.getPassword());
        User u = new User(req.getUsername(), hashed, req.getEmail());
        userRepository.save(u);
        return ResponseEntity.ok(new AuthResponse(true, "registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        if (req.getUsername() == null || req.getPassword() == null || req.getUsername().trim().isEmpty() || req.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "username and password required"));
        }
        return userRepository.findByUsername(req.getUsername())
            .map(user -> {
                if (passwordEncoder.matches(req.getPassword(), user.getPassword())) {
                    String token = jwtUtil.generateToken(user.getUsername());
                    return ResponseEntity.ok(new AuthResponse(true, "login successful", token));
                } else {
                    return ResponseEntity.status(401).body(new AuthResponse(false, "invalid credentials"));
                }
            })
            .orElseGet(() -> ResponseEntity.status(401).body(new AuthResponse(false, "invalid credentials")));
    }
}
