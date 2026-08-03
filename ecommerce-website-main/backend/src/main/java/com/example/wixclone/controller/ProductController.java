package com.example.wixclone.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import com.example.wixclone.repository.ProductRepository;
import com.example.wixclone.model.Product;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repo;
    public ProductController(ProductRepository repo){ this.repo = repo; }

    @GetMapping
    public List<Product> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
