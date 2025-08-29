package com.kekich.productshop.repository;

import com.kekich.productshop.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);  // camelCase как в сущности

    void deleteByProductId(long productId);

    boolean existsByProductId(long productId);
}