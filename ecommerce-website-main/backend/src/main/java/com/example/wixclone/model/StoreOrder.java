package com.example.wixclone.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "store_orders")
public class StoreOrder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String customerName;
    private String email;
    @Column(length = 1000) private String shippingAddress;
    private BigDecimal total;
    private String status = "PLACED";
    private Instant createdAt = Instant.now();
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true) private List<OrderItem> items = new ArrayList<>();
    public void addItem(OrderItem item) { items.add(item); item.setOrder(this); }
    public Long getId() { return id; } public String getCustomerName() { return customerName; } public void setCustomerName(String value) { customerName=value; } public String getEmail() { return email; } public void setEmail(String value) { email=value; } public String getShippingAddress() { return shippingAddress; } public void setShippingAddress(String value) { shippingAddress=value; } public BigDecimal getTotal() { return total; } public void setTotal(BigDecimal value) { total=value; } public String getStatus() { return status; } public Instant getCreatedAt() { return createdAt; } public List<OrderItem> getItems() { return items; }
}
