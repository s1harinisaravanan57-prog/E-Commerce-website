package com.example.wixclone.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.wixclone.model.ContactMessage;
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {}
