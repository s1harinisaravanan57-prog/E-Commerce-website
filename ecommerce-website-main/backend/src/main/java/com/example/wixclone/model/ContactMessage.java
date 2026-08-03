package com.example.wixclone.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class ContactMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String subject;
    @Column(length = 4000) private String message;
    private Instant createdAt = Instant.now();
    public ContactMessage() {}
    public ContactMessage(String name, String email, String phone, String subject, String message) { this.name=name; this.email=email; this.phone=phone; this.subject=subject; this.message=message; }
    public Long getId() { return id; }
    public String getName() { return name; } public String getEmail() { return email; } public String getPhone() { return phone; } public String getSubject() { return subject; } public String getMessage() { return message; } public Instant getCreatedAt() { return createdAt; }
}
