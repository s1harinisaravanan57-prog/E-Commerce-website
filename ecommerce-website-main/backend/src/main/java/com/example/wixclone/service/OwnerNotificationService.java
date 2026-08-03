package com.example.wixclone.service;

import com.example.wixclone.model.ContactMessage;
import com.example.wixclone.model.OrderItem;
import com.example.wixclone.model.StoreOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OwnerNotificationService {
    private static final Logger log = LoggerFactory.getLogger(OwnerNotificationService.class);
    private final JavaMailSender mailSender;
    private final boolean enabled;
    private final String ownerEmail;
    private final String fromEmail;

    public OwnerNotificationService(JavaMailSender mailSender, @Value("${owner.notification.enabled:false}") boolean enabled, @Value("${owner.notification.email}") String ownerEmail, @Value("${owner.notification.from:}") String fromEmail) {
        this.mailSender = mailSender;
        this.enabled = enabled;
        this.ownerEmail = ownerEmail;
        this.fromEmail = fromEmail;
    }

    public void notifyNewContactMessage(ContactMessage message) {
        send("New Little Nest contact message: " + message.getSubject(), String.format("A customer sent a contact message.\n\nName: %s\nEmail: %s\nPhone: %s\nSubject: %s\n\nMessage:\n%s", message.getName(), message.getEmail(), valueOrNotProvided(message.getPhone()), message.getSubject(), message.getMessage()));
    }

    public void notifyNewOrder(StoreOrder order) {
        String items = order.getItems().stream().map(this::formatItem).reduce("", (current, item) -> current + item + "\n");
        send("New Little Nest order #" + order.getId(), String.format("A new order has been placed.\n\nOrder ID: %s\nCustomer: %s\nEmail: %s\nShipping address: %s\n\nItems:\n%sTotal: $%s\nStatus: %s", order.getId(), order.getCustomerName(), order.getEmail(), order.getShippingAddress(), items, order.getTotal(), order.getStatus()));
    }

    private String formatItem(OrderItem item) { return String.format("- %s x %s at $%s", item.getProductName(), item.getQuantity(), item.getUnitPrice()); }
    private String valueOrNotProvided(String value) { return value == null || value.isBlank() ? "Not provided" : value; }

    private void send(String subject, String body) {
        if (!enabled) { log.info("Owner email notification skipped because OWNER_NOTIFICATION_ENABLED is false."); return; }
        if (fromEmail == null || fromEmail.isBlank()) { log.warn("Owner email notification skipped because MAIL_FROM or SMTP_USERNAME is not set."); return; }
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(ownerEmail);
            mail.setSubject(subject);
            mail.setText(body);
            mailSender.send(mail);
            log.info("Owner notification email accepted by SMTP for {}.", ownerEmail);
        } catch (RuntimeException error) { log.error("Could not send owner notification email.", error); }
    }
}
