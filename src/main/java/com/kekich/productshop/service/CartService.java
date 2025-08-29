package com.kekich.productshop.service;


import com.kekich.productshop.model.Cart;
import com.kekich.productshop.repository.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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



}
