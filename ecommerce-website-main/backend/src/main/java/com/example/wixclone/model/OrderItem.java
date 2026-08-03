package com.example.wixclone.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Long productId;
    private String productName;
    private BigDecimal unitPrice;
    private Integer quantity;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "order_id") private StoreOrder order;
    public OrderItem() {}
    public OrderItem(Long productId, String productName, BigDecimal unitPrice, Integer quantity) { this.productId=productId; this.productName=productName; this.unitPrice=unitPrice; this.quantity=quantity; }
    public void setOrder(StoreOrder value) { order=value; }
    public Long getId() { return id; } public Long getProductId() { return productId; } public String getProductName() { return productName; } public BigDecimal getUnitPrice() { return unitPrice; } public Integer getQuantity() { return quantity; }
}
