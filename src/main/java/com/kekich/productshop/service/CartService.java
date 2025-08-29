package com.kekich.productshop.service;

import com.kekich.productshop.model.Cart;
import com.kekich.productshop.repository.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Transactional
    public Cart addCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getCartsByUserId(long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Transactional
    public void deleteCart(long id) {
        cartRepository.deleteByProductId(id);
    }

    public boolean isCartExist(long id) {
        return cartRepository.existsByProductId(id);
    }
}