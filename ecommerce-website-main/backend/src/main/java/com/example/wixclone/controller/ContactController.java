package com.example.wixclone.controller;

import com.example.wixclone.dto.ContactRequest;
import com.example.wixclone.model.ContactMessage;
import com.example.wixclone.repository.ContactMessageRepository;
import com.example.wixclone.service.OwnerNotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactController {
    private final ContactMessageRepository messages;
    private final OwnerNotificationService notifications;
    public ContactController(ContactMessageRepository messages, OwnerNotificationService notifications) { this.messages = messages; this.notifications = notifications; }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> create(@Valid @RequestBody ContactRequest request) {
        ContactMessage saved = messages.save(new ContactMessage(request.name(), request.email(), request.phone(), request.subject(), request.message()));
        notifications.notifyNewContactMessage(saved);
        return Map.of("id", saved.getId(), "message", "Thanks — your message has been received.");
    }
}
