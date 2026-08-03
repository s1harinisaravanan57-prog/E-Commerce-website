package com.example.wixclone.controller;

import com.example.wixclone.dto.CheckoutRequest;
import com.example.wixclone.model.OrderItem;
import com.example.wixclone.model.Product;
import com.example.wixclone.model.StoreOrder;
import com.example.wixclone.repository.ProductRepository;
import com.example.wixclone.repository.StoreOrderRepository;
import com.example.wixclone.service.OwnerNotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final ProductRepository products;
    private final StoreOrderRepository orders;
    private final OwnerNotificationService notifications;

    public OrderController(ProductRepository products, StoreOrderRepository orders, OwnerNotificationService notifications) {
        this.products = products; this.orders = orders; this.notifications = notifications;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public Map<String, Object> checkout(@Valid @RequestBody CheckoutRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null || auth.getName().equals("anonymousUser")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Must be logged in to place an order.");
        }

        StoreOrder order = new StoreOrder();
        order.setCustomerName(request.customerName());
        order.setEmail(request.email());
        order.setShippingAddress(request.shippingAddress());
        BigDecimal total = BigDecimal.ZERO;
        for (CheckoutRequest.CheckoutItem line : request.items()) {
            Product product = products.findById(line.productId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "A product in your cart no longer exists."));
            if (product.getStock() == null || product.getStock() < line.quantity()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, product.getName() + " does not have enough stock.");
            product.setStock(product.getStock() - line.quantity());
            order.addItem(new OrderItem(product.getId(), product.getName(), product.getPrice(), line.quantity()));
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(line.quantity())));
        }
        order.setTotal(total);
        StoreOrder saved = orders.save(order);
        notifications.notifyNewOrder(saved);
        return Map.of("id", saved.getId(), "status", saved.getStatus(), "total", saved.getTotal());
    }
}
