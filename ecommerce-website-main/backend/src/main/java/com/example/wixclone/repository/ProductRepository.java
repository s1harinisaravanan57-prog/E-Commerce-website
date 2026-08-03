package com.example.wixclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.wixclone.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
