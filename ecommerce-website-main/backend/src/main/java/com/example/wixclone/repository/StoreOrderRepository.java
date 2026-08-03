package com.example.wixclone.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.wixclone.model.StoreOrder;
public interface StoreOrderRepository extends JpaRepository<StoreOrder, Long> {}
